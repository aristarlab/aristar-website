---
paths:
  - "app/api/**"
  - "lib/auth/**"
  - "lib/server/**"
  - "middleware.ts"
  - "infra/**"
---
# 보안 규칙 (애플리케이션·클라우드 공통)

## 항상 점검

- 입력 검증 누락 (Zod 미적용 핸들러)
- 인증·인가 누락 (특히 쓰기 엔드포인트, 관리자 경로)
- 하드코딩된 시크릿·토큰·키
- SSRF: 사용자 입력 URL로 서버가 요청하지 않는다. 허용 목록만 허용.
- 인젝션: 문자열 연결로 쿼리·셸 명령을 만들지 않는다. 파라미터 바인딩을 쓴다.
- XSS: `dangerouslySetInnerHTML` 사용 금지. 불가피하면 정화 후 사용하고 근거를 주석으로 남긴다.
- 과도한 응답: 내부 ID·스택·환경변수를 응답에 담지 않는다.

## 보안 헤더 (Next.js 전환 시 필수)

`Content-Security-Policy`(인라인 스크립트 금지, `fonts.googleapis.com`·`fonts.gstatic.com` 허용), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`.

## 클라우드

- IAM은 최소 권한. 와일드카드 `"Action": "*"` 금지.
- S3 버킷 퍼블릭 접근 차단 기본. 공개가 필요하면 CloudFront 경유.
- 시크릿은 AWS Secrets Manager 또는 Amplify 환경변수에 둔다. 코드·저장소에 두지 않는다.
- CI 인증은 장기 액세스 키 대신 GitHub OIDC 역할을 쓴다.
- 로그에 개인정보·토큰이 남지 않는지 확인한다.

## 보고 형식

발견 사항은 다음으로 쓴다: **대상 파일:줄 / 문제 / 실제 공격 시나리오 / 수정안 / 심각도(높음·중간·낮음)**.
"혹시 모르니 고치자"는 올리지 않는다. 악용 경로를 설명할 수 있는 것만 보고한다.
