---
paths:
  - "infra/**"
  - "amplify.yml"
  - "amplify/**"
  - ".github/workflows/**"
---
# AWS·배포 규칙

## 구성 (확정)

- 호스팅: **AWS Amplify Hosting** (Next.js 15 App Router SSR)
- 도메인: `aristar.io` — DNS는 가비아에 있다. Amplify 도메인 연결 시 요구하는 레코드만 추가한다.
- 브랜치 매핑: `main` → production, `develop` → staging

## 절대 금지

- **MX 레코드 변경·삭제 금지.** 회사 메일(support@aristar.io) 수신이 끊긴다.
- 운영 도메인의 A/CNAME을 검증 없이 교체하지 않는다. 전환은 Amplify 스테이징에서 동작 확인 후 진행한다.
- 운영 리소스 삭제(`terraform destroy`, `cdk destroy`, `aws amplify delete-*`)는 CEO 승인 없이 실행하지 않는다.
- 자격증명을 커밋하지 않는다. 로컬은 AWS 프로파일, CI는 OIDC 역할을 쓴다.

## 전환 순서 (정적 → 동적)

1. Next.js 앱을 스테이징 브랜치에 배포해 Amplify 기본 도메인에서 검증
2. 기존 정적 경로 호환 확인: `/privacy.html`, `/terms.html`, `/app-ads.txt`는 **같은 URL로 계속 응답**해야 한다 (Google Play·AdMob이 참조 중)
3. `CNAME`·GitHub Pages 설정은 전환 완료 확인 후 정리
4. 롤백 경로를 문서화한 뒤 운영 도메인 전환

## 검수 기준

- `npm run build` 성공
- 스테이징에서 전 라우트 200 응답, HTTPS 정상
- `/privacy.html`, `/terms.html`, `/app-ads.txt` 접근 가능
- 리전은 `ap-northeast-2`(서울) 기준
