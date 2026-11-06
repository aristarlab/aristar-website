# 커밋·브랜치 규칙

## 브랜치

- `main`은 운영 배포 브랜치다. 직접 커밋·푸시하지 않는다.
- 작업 브랜치: `<타입>/<범위>-<요약>` — 예 `feat/web-esay-memory-eng-page`
- 범위 접두어: `web`(웹사이트) `voc`(메일 운영) `infra`(AWS) `docs`(문서) `ops`(운영)

## 커밋 메시지

```
<타입>: <한국어 요약 50자 이내>

<왜 바꿨는지 1~3줄. 무엇을 바꿨는지는 diff가 말한다.>
```

타입: `feat` `fix` `refactor` `style` `docs` `chore` `perf` `test` `security`

- 한 커밋에 한 가지 변경만 담는다.
- 커밋·푸시는 CEO가 요청할 때만 한다. 요청 없이 커밋하지 않는다.
- 커밋 메시지 끝에 다음 한 줄을 붙인다.

```
Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
```

## 커밋하면 안 되는 것

- 고객 메일 본문, 이름, 연락처 등 개인정보
- `.env*`, AWS 키, Google OAuth 클라이언트 시크릿, 토큰 파일
- `node_modules/`, `.next/`, 빌드 산출물
- `CLAUDE.local.md`, `.claude/settings.local.json`

## PR

본부장 검수를 통과한 변경만 PR로 올린다. PR 본문: 목적 / 변경 요약 / 검증 방법 / 영향 범위.
