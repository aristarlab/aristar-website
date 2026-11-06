# Claude Code 조직 체계 구축

- 일자: 2026-11-06
- 지시자: CEO
- 주관: 비서실장 (직접 수행 — CEO 결정)
- 결론: CEO–비서실장–7본부–14팀 구조를 `.claude/`에 구축 완료. 보호 훅 12건 검증 통과(오탐 0).

## 한 것

### 1. 로컬 저장소 최신화
- `https://github.com/aristarlab/aristar-website.git`을 로컬 `/Users/kyongheekeum/webpagefiles`에 연결
- 기존 로컬 4개 파일은 원격 HEAD(`2c438e2`)와 내용 동일 → 손실 없이 git 이력 부착
- 누락되어 있던 `CNAME`, `app-ads.txt` 복원

### 2. 지침 체계
- `CLAUDE.md` (75줄) — 회사 사실, 사업 3개 표, 스택, 조직 운영 원칙, 상시 금지사항
- `CLAUDE.local.md` — CEO 개인 메모 (git 추적 제외)
- `.claude/rules/` 9개
  - 상시 로드 2개: `general/org-protocol.md`(업무 7단계), `general/commit.md`
  - 경로 조건부 7개: frontend 3, backend 1, infra 1, voc 1, security 1

### 3. 에이전트 21개
- 본부장 7: `mgmt-support-lead` `voc-lead` `strategy-lead` `marketing-lead` `it-lead` `content-lead` `security-lead` (model: opus, 팀원 분배·검수 담당)
- 팀 14: 재무 법무 고객지원 사업전략 브랜드 리서치 콘텐츠 그로스 백엔드 프론트엔드 인프라 컨텐츠1 앱보안 클라우드보안 (model: sonnet)
- 읽기 전용 3개(`research-team` `appsec-team` `cloudsec-team`)는 `tools`에서 Edit/Write를 제거해 **구조적으로** 수정 차단
- description 총 558토큰 — 경고 한도 15,000토큰 대비 여유

### 4. 스킬 7개
`/ceo-directive` `/voc-triage` `/service-page` `/design-bench` `/web-modernize` `/ship`(CEO 전용) `/report`

### 5. 강제 장치 (`settings.json` + 훅)
- 조회성 git·npm·aws 명령 allow / 커밋·푸시·AWS 변경·운영 파일 수정은 ask / 강제 푸시·운영 삭제·시크릿 읽기·메일 원본 접근은 deny
- `PreToolUse` 훅: **MX 레코드 변경과 운영 리소스 삭제 명령을 차단** (메일 수신 중단 방지)
- `PostToolUse` 훅: 작성 파일의 AWS 키·OAuth 시크릿·GitHub 토큰, `ops/voc/` 내 개인정보 탐지

### 6. VOC 분류 기반
- `ops/voc/taxonomy.yml` — 사업 3개 + 미분류, 유형 8종, 상태 4종, SLA, 라우팅·키워드 규칙의 **단일 출처**
- `ops/voc/inbox/`는 `.gitignore` 처리 (메일 원본 커밋 불가)

### 7. 문서 체계
`docs/decisions/` `docs/reports/` `docs/plans/` + `docs/README.md`. CEO 결정 1건 기록.

## 안 한 것과 이유

- **Next.js 전환 구현** — 이번 지시는 조직 체계 구축이었다. 전환은 `/web-modernize` 8단계 절차로 분리했고, IT본부 주관으로 별도 착수해야 한다.
- **Gmail 라벨 실제 생성** — 분류 기준은 확정했으나 메일박스에 라벨을 만드는 것은 운영 변경이다. CEO 승인 후 `/voc-triage`로 진행한다.
- **git 커밋·푸시** — 커밋 규칙상 CEO 요청 시에만 한다. 현재 전부 미추적 상태로 남겨두었다.
- **`.mcp.json` 서버 등록** — Gmail·Drive는 claude.ai 커넥터로 이미 연결되어 있어 프로젝트 MCP 서버가 불필요하다. 빈 구조만 두었다.

## 검증 결과

| 항목 | 결과 |
|---|---|
| 훅 테스트 12건 (MX 차단, A레코드 허용, destroy 차단, 시크릿 탐지, 오탐 확인) | 전부 통과, 실패 0 |
| JSON 유효성 (`settings.json`, `settings.local.json`, `.mcp.json`) | 통과 |
| 에이전트 21개 프론트매터 (`name` = 파일명, `description` 존재) | 이상 없음 |
| 규칙 9개 `paths` 파싱 | 상시 2 / 조건부 7 정상 |
| 스킬 7개 `description` | 전부 존재, `/ship`은 CEO 전용 플래그 확인 |
| `.gitignore` 제외 확인 (`CLAUDE.local.md`, `settings.local.json`, `ops/voc/inbox/`, `.env`) | 전부 제외됨 |
| `npm run build` 등 | **미실행** — Next.js 전환 전이라 스크립트가 존재하지 않음 |

## 다음 할 일 (CEO 결정 대기)

1. `/design-bench` — 해외 레퍼런스 UI/UX 벤치마킹 명세 수립 (전략기획 주관)
2. `/web-modernize 2` — Next.js 스캐폴드 착수 (IT 주관)
3. `/voc-triage` — Gmail 라벨 생성 및 기존 메일 1차 분류 (VOC 주관)

## 산출물

- `CLAUDE.md`, `CLAUDE.local.md`, `.gitignore`, `.mcp.json`, `.worktreeinclude`
- `.claude/` — `settings.json`, `settings.local.json`, `rules/`(9), `agents/`(21), `skills/`(7), `hooks/`(2), `output-styles/`(1)
- `ops/voc/taxonomy.yml`, `ops/voc/templates/README.md`
- `docs/README.md`, `docs/decisions/2026-11-06-web-stack-and-mail-platform.md`, 본 보고서
