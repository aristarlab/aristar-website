---
description: GitHub Pages 정적 사이트를 Next.js + AWS Amplify 동적 사이트로 단계적으로 전환한다
argument-hint: [단계 번호 또는 범위]
---

# 정적 → 동적 전환

단계: $ARGUMENTS (비어 있으면 현재 상태를 확인해 다음 단계부터)

주관은 IT본부(`it-lead`). 협조: 정보보호(`security-lead`), 경영지원(`finance-team` 비용, `legal-team` 약관 경로).
규칙은 `.claude/rules/infra/aws.md`, `.claude/rules/frontend/web.md`, `.claude/rules/frontend/design-reference.md`.

## 전제 (CEO 결정, 2026-11-06)

Next.js 15 App Router + TypeScript, AWS Amplify Hosting, 리전 `ap-northeast-2`.

## 단계

**1. 현황 고정**
현재 운영 파일을 목록화하고 각 URL의 역할을 기록한다. `index.html`, `privacy.html`, `terms.html`, `app-ads.txt`, `CNAME`.
`privacy.html`·`terms.html`은 Google Play Console에 등록된 URL이고 `app-ads.txt`는 AdMob이 참조한다. **URL이 바뀌면 외부 심사가 깨진다.**

**2. Next.js 스캐폴드**
`npm` 프로젝트 초기화, App Router, TypeScript, ESLint. `lib/company.ts`에 회사 정보를 한 곳으로 모은다.
`package.json` 스크립트: `dev`, `build`, `lint`, `typecheck`, `test`.

**3. 기존 페이지 이식**
메인·약관·개인정보를 디자인 토큰 그대로 이식한다. 디자인 개선은 `/design-bench` 명세가 확정된 뒤 별도 단계로 한다.

**4. URL 호환 레이어**
`/privacy.html`, `/terms.html`, `/app-ads.txt`가 **같은 경로로 계속 200 응답**해야 한다. `public/`에 두거나 리라이트로 처리한다. 301로 경로를 바꾸지 않는다.

**5. 서비스 소개 라우트**
`/esay-memory-eng`, `/content-automation`, `/algo-trading`. 각 페이지는 `/service-page` 규격을 따른다.

**6. Amplify 스테이징**
`develop` 브랜치 → Amplify 기본 도메인에 배포. 전 라우트 200, HTTPS, 모바일 확인.

**7. 운영 전환**
롤백 절차를 문서에 먼저 적는다. 그 다음 `aristar.io` 도메인을 Amplify로 연결한다.
**MX 레코드는 건드리지 않는다.** A/CNAME만 Amplify가 요구하는 값으로 변경한다.

**8. 정리**
전환 안정화 확인 후 GitHub Pages 설정과 `CNAME` 파일을 정리한다. 확인 전에는 삭제하지 않는다.

## 각 단계 검수 기준

- `npm run build` / `lint` / `typecheck` 통과
- 기존 4개 URL 접근 가능
- 360px 가로 스크롤 없음
- 보안 헤더 적용 (CSP, HSTS, nosniff, Referrer-Policy, X-Frame-Options)
- 회사 정보가 `lib/company.ts` 단일 출처

## 승인 필요 (실행 전 CEO 보고)

운영 DNS 변경, GitHub Pages 비활성화, 기존 정적 파일 삭제, 월 비용이 늘어나는 AWS 구성.

## 산출물

단계별 기록은 `docs/reports/`, 롤백 절차는 `docs/plans/`에 남긴다.
