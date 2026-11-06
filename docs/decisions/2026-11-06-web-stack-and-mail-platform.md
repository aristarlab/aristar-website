# 결정: 웹사이트 스택과 메일 분류 기반

- 일자: 2026-11-06
- 결정자: CEO
- 상태: 확정
- 주관: 비서실장 (조직 체계 구축), 이후 실행 주관은 IT본부

## 배경

aristar.io는 GitHub Pages 기반 정적 사이트다. 다음 세 가지가 필요해졌다.

1. 사업별 소개 페이지(`/<서비스명>`)를 추가하고 디자인·기능을 지속적으로 최신화해야 한다.
2. 정적 구조로는 문의 처리·동적 콘텐츠를 담을 수 없어 동적 사이트로 전환하고 AWS에서 배포해야 한다.
3. support@aristar.io로 들어오는 고객 메일을 사업별로 분류·관리해야 한다.

## 선택지와 결정

### 1. 이번 조직 체계 구축 작업의 수행 방식

| 선택지 | 장점 | 단점 |
|---|---|---|
| **비서실장 직접 수행 (결정)** | 에이전트가 아직 없는 상태에서 가장 빠름. 체계 자체를 만드는 일이라 일관성 확보 | 비서실장 작업량 집중 |
| IT본부 위임 | 역할 분담 | 위임 대상 에이전트가 존재하지 않아 선후가 뒤바뀜 |

**결정: 비서실장 직접 수행.**

### 2. 정적 → 동적 전환 스택

| 선택지 | 장점 | 단점 |
|---|---|---|
| **Next.js 15 App Router + AWS Amplify Hosting (결정)** | 파일 기반 라우팅이 `/<슬러그>` 규칙과 바로 맞음. SSR·CDN·도메인·HTTPS를 Amplify가 처리해 인프라 운영 부담 최소 | Amplify 제약에 따라감 |
| Next.js + AWS CDK (CloudFront+Lambda) | 전 구성 IaC화, 세밀한 제어 | 초기 구축·운영 난이도 높음. 현재 인력 규모에 과함 |
| Astro SSR + Lambda | 정적 성능 최상, 번들 가벼움 | 향후 로그인·대시보드 등 동적 확장 시 선택지 좁음 |

**결정: Next.js 15 (App Router, TypeScript) + AWS Amplify Hosting, 리전 `ap-northeast-2`.**

### 3. 사업별 메일 분류 기반

| 선택지 | 장점 | 단점 |
|---|---|---|
| **Google Workspace + Gmail API (결정)** | 라벨 기반 분류를 즉시 시작 가능. 사람이 메일박스 UI에서 직접 검수·수정 가능 | 라벨 체계 관리 필요 |
| AWS SES 수신 + Lambda | 웹 문의 폼과 통합해 완전 자동화 | 메일박스 UI가 없어 수동 확인이 불편. 구축 기간 소요 |
| 현 포워딩 유지 + 규칙 문서화 | 비용 0 | 자동화 없음 |

**결정: Google Workspace + Gmail API. 라벨 체계로 분류하고 기준은 `ops/voc/taxonomy.yml` 단일 출처로 관리.**

### 4. 웹사이트 재구성의 디자인 방향 (CEO 추가 지시)

해외 유명 웹사이트의 UI/UX를 참고해 재구성한다. 단, **패턴 수준 참고로 한정**하고 카피·이미지·아이콘·폰트 파일·CSS·코드 복제와 상표적 요소 모방은 금지한다.
기준 문서: `.claude/rules/frontend/design-reference.md`, 절차: `/design-bench`.

## 영향

- 전환 중 `aristar.io` 가동을 멈추지 않는다. 기존 정적 파일은 검증 완료까지 삭제하지 않는다.
- `/privacy.html`, `/terms.html`, `/app-ads.txt`는 **같은 URL로 계속 응답해야 한다.** Google Play Console과 AdMob이 참조 중이다.
- 운영 DNS의 **MX 레코드는 변경하지 않는다.** 회사 메일 수신이 끊긴다. PreToolUse 훅으로 기술적으로 차단했다.
- 월 비용이 증가한다 (Amplify Hosting + Google Workspace). 재무팀이 전환 단계에서 추정한다.

## 관련 문서

- 조직 운영 절차: `.claude/rules/general/org-protocol.md`
- 전환 절차: `.claude/skills/web-modernize/SKILL.md`
- 메일 운영: `.claude/rules/voc/mail-ops.md`
- 구축 보고: `docs/reports/2026-11-06-claude-org-setup.md`
