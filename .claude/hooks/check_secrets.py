#!/usr/bin/env python3
"""PostToolUse(Edit|Write): 방금 쓴 파일의 시크릿·개인정보 유입을 잡아 경고한다."""
import json
import os
import re
import sys

SECRET_PATTERNS = [
    (r"AKIA[0-9A-Z]{16}", "AWS 액세스 키 ID"),
    (r"ASIA[0-9A-Z]{16}", "AWS 임시 액세스 키 ID"),
    (r"aws_secret_access_key\s*=\s*\S+", "AWS 시크릿 액세스 키"),
    (r"-----BEGIN [A-Z ]*PRIVATE KEY-----", "프라이빗 키"),
    (r"ya29\.[0-9A-Za-z_-]{20,}", "Google OAuth 액세스 토큰"),
    (r"GOCSPX-[0-9A-Za-z_-]{10,}", "Google OAuth 클라이언트 시크릿"),
    (r"gh[pousr]_[0-9A-Za-z]{30,}", "GitHub 토큰"),
    (r"sk-[0-9A-Za-z]{20,}", "API 시크릿 키"),
    (r"NEXT_PUBLIC_[A-Z0-9_]*(?:SECRET|TOKEN|PASSWORD|PRIVATE)", "NEXT_PUBLIC_ 접두어에 담긴 민감값"),
]


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0

    path = (payload.get("tool_input") or {}).get("file_path") or ""
    if not path or not os.path.isfile(path):
        return 0
    try:
        if os.path.getsize(path) > 2_000_000:
            return 0
        text = open(path, encoding="utf-8", errors="ignore").read()
    except Exception:
        return 0

    # 훅 자신과 규칙 문서는 패턴을 예시로 담고 있으므로 제외한다.
    norm = path.replace("\\", "/")
    if "/.claude/hooks/" in norm or norm.endswith(".claude/hooks/check_secrets.py"):
        return 0

    hits = [label for pat, label in SECRET_PATTERNS if re.search(pat, text)]

    if "/ops/voc/" in norm:
        if re.search(r"(^|\D)01[016-9]-?\d{3,4}-?\d{4}(\D|$)", text):
            hits.append("전화번호(ops/voc 저장 금지)")
        mails = [
            m
            for m in re.findall(r"[0-9A-Za-z._%+-]+@[0-9A-Za-z.-]+\.[A-Za-z]{2,}", text)
            if not m.endswith("aristar.io") and "example" not in m.lower()
        ]
        if mails:
            hits.append("외부 메일 주소(ops/voc 저장 금지)")

    if hits:
        sys.stderr.write(
            "경고: %s 에서 다음이 발견되었습니다 — %s. 커밋 전에 제거하세요. "
            "시크릿은 환경변수로, 고객 정보는 집계로만 다룹니다 "
            "(.claude/rules/general/commit.md, .claude/rules/voc/mail-ops.md).\n"
            % (path, ", ".join(sorted(set(hits))))
        )
        return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())
