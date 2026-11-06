#!/usr/bin/env python3
"""PreToolUse(Bash): 회사 메일 수신을 끊거나 운영 리소스를 삭제하는 명령을 차단한다.

exit 2 = 도구 실행 차단 + stderr를 Claude에게 전달.
"""
import json
import re
import sys


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0

    cmd = (payload.get("tool_input") or {}).get("command") or ""
    low = cmd.lower()

    mutating = re.search(
        r"(change-resource-record-sets|delete-resource-record-set|route53\s+change|dnsmgmt)", low
    )
    touches_mx = re.search(r"(^|[^a-z])mx([^a-z]|$)|type\W{0,3}mx", low)

    if mutating and touches_mx:
        sys.stderr.write(
            "차단: MX 레코드를 변경하는 DNS 명령입니다. support@aristar.io 메일 수신이 "
            "끊깁니다 (.claude/rules/infra/aws.md). MX를 제외한 A/CNAME 변경만 수행하고, "
            "MX 변경이 꼭 필요하면 CEO 승인을 먼저 받으세요.\n"
        )
        return 2

    destructive = re.search(
        r"(terraform\s+destroy|cdk\s+destroy|amplify\s+delete-app|amplify\s+delete-branch"
        r"|delete-hosted-zone|s3\s+rb\b)",
        low,
    )
    if destructive:
        sys.stderr.write(
            "차단: 운영 리소스를 삭제하는 명령입니다. CEO 승인 없이 실행할 수 없습니다 "
            "(.claude/rules/infra/aws.md). 실행할 명령과 영향 범위를 보고해 승인을 받으세요.\n"
        )
        return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())
