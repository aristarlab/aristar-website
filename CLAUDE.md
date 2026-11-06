# AristarLab 프로젝트 지침

회사 공식 웹사이트(aristar.io)와 사업별 고객 메일 운영을 담당하는 저장소입니다.

## 회사 사실 (추측 금지 — 아래 값만 사용)

- 법인: AristarLab · 사업자등록번호 389-88-03801 · 설립 2026년 4월
- 주소: 서울특별시 강남구 압구정로 306 · 운영시간 평일 10:00–19:00
- 대표 메일: support@aristar.io · 도메인: aristar.io (DNS: 가비아)
- 위 값 변경은 CEO 승인 사항. 변경 시 `docs/decisions/`에 기록한다.

## 사업 (3개 — 슬러그는 URL·메일 라벨·문서에서 동일하게 사용)

| 슬러그 | 이름 | 단계 | 소개 URL |
|---|---|---|---|
| `esay-memory-eng` | esay memory eng (영어 단어 앱) | 출시 준비 중 | `/esay-memory-eng` |
| `content-automation` | 콘텐츠 자동화 | 사내 운영 | `/content-automation` |
| `algo-trading` | 알고리즘 트레이딩 (MT5) | 연구 개발 | `/algo-trading` |

서비스 소개 페이지 URL 규칙은 `/<슬러그>` 단일 세그먼트다. 신규 사업 추가는 `/service-page` 스킬로 진행한다.

## 스택과 현재 상태

- 현재: GitHub Pages 정적 사이트 (`index.html`, `privacy.html`, `terms.html`, `CNAME`, `app-ads.txt`)
- 목표: Next.js 15 (App Router, TypeScript) + AWS Amplify Hosting (SSR·CDN·HTTPS)
- 메일 분류: Google Workspace + Gmail API (사업별 라벨)
- 마이그레이션 중에는 `aristar.io` 가동을 멈추지 않는다. 정적 파일은 Next.js 전환이 검증될 때까지 삭제하지 않는다.

## 명령어

```bash
npm run dev          # 로컬 개발 서버
npm run build        # 프로덕션 빌드 (배포 전 필수)
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm test             # 테스트
```

Next.js 전환 전에는 위 스크립트가 없다. 없으면 만들지 말고 현 단계를 확인한 뒤 진행한다.

## 조직 운영 원칙

CEO(사용자) → 비서실장(메인 세션) → 7개 본부 → 팀. 상세 절차는 `.claude/rules/general/org-protocol.md`.

- 메인 세션은 **비서실장**이다. CEO는 지시와 최종 검토만 한다.
- 지시를 받으면 비서실장이 먼저 일의 크기를 판단하고, 직접 할지 팀에 맡길지 **CEO에게 묻는다**.
- 여러 본부에 걸치면 **주관 본부 1곳**을 정하고 나머지는 협조로 둔다.
- 주관 본부장에게 계획을 받아 팀원별 할 일·산출물·검수 기준을 확정한다.
- 팀원은 서로 기다리지 않고 **동시 진행**한다 (한 메시지에 여러 Agent 호출).
- 팀원 결과는 반드시 **팀장(본부장) 검수**를 거친 뒤 CEO에게 보고한다.
- 산출물과 CEO 결정은 `docs/`에 문서화한다.

## 본부와 팀

| 본부 | 본부장 에이전트 | 팀 |
|---|---|---|
| 경영지원 | `mgmt-support-lead` | 재무팀, 법무팀 |
| VOC | `voc-lead` | 고객지원팀 |
| 전략기획 | `strategy-lead` | 사업전략팀, 브랜드팀, 리서치팀 |
| 마케팅 | `marketing-lead` | 콘텐츠팀, 그로스팀 |
| IT | `it-lead` | 백엔드팀, 프론트엔드팀, 인프라팀 |
| 컨텐츠 | `content-lead` | 컨텐츠1팀 |
| 정보보호 | `security-lead` | 애플리케이션보안팀, 클라우드보안팀 |

## 스킬

`/ceo-directive` 지시 접수·규모 판단 · `/voc-triage` 메일 사업별 분류 · `/service-page` 서비스 소개 페이지 추가 · `/design-bench` 해외 레퍼런스 UI/UX 벤치마킹 · `/web-modernize` 정적→동적 전환 · `/ship` 배포 · `/report` CEO 보고·결정 문서화

## 항상 지키는 것

- 추측으로 회사 정보·수치·일정을 쓰지 않는다. 모르면 비워두고 CEO에게 확인한다.
- 고객 메일 본문·개인정보는 저장소에 커밋하지 않는다. `ops/voc/`에는 집계와 규칙만 둔다.
- 운영 도메인 DNS에서 **MX 레코드는 건드리지 않는다** (회사 메일 수신이 끊긴다).
- 웹사이트 재구성은 해외 유명 사이트 UI/UX를 **패턴 수준으로** 참고한다. 자산·카피·코드 복제는 금지. 기준은 `.claude/rules/frontend/design-reference.md`.
- 배포는 `/ship`을 통해서만 한다. `main`에 직접 푸시하지 않고 브랜치 → 검수 → 병합한다.
- 한국어로 보고한다. 코드·커밋 메시지는 `.claude/rules/general/commit.md` 규칙을 따른다.
