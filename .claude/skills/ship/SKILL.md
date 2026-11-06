---
description: 검수를 거친 변경을 브랜치·PR·배포 순서로 안전하게 내보낸다
disable-model-invocation: true
argument-hint: [배포 대상 설명]
---

# 배포

대상: $ARGUMENTS

!`git status --short && echo "--- branch ---" && git branch --show-current && echo "--- recent ---" && git log --oneline -5`

CEO만 호출할 수 있다. 아래를 순서대로, 건너뛰지 말고 수행한다.

## 1. 사전 점검

- 현재 브랜치가 `main`이면 작업 브랜치를 먼저 만든다. `main`에 직접 커밋·푸시하지 않는다.
- 변경 내용을 `git diff`로 직접 읽는다. 의도하지 않은 파일이 섞였는지 확인한다.
- 커밋해서는 안 되는 것이 섞였는지 확인한다: `.env*`, AWS 키, OAuth 시크릿, 고객 개인정보, `node_modules/`, `.next/`.

## 2. 검증 (실패하면 중단)

```bash
npm run lint
npm run typecheck
npm run build
```

스크립트가 아직 없는 단계면 그 사실을 보고하고 수동 확인 항목을 적는다. 없는 걸 있는 것처럼 통과했다고 쓰지 않는다.

## 3. 호환 확인

`/privacy.html`, `/terms.html`, `/app-ads.txt` 경로가 유지되는지 확인한다. 외부(Google Play·AdMob)가 참조 중이다.

## 4. 커밋

`.claude/rules/general/commit.md` 형식을 따른다. 한 커밋에 한 가지 변경.

## 5. PR

본문: 목적 / 변경 요약 / 검증 방법과 결과 / 영향 범위 / 롤백 방법.
본부장 검수를 통과한 변경만 올린다.

## 6. 배포

- `develop` 병합 → Amplify 스테이징 자동 배포 → 전 라우트 확인
- 스테이징 확인 후 `main` 병합 → 운영 배포
- 배포 후 `https://aristar.io` 주요 경로를 실제로 확인한다

## 7. 보고

배포 결과, 확인한 URL, 롤백 방법을 `docs/reports/`에 기록한다.

## 중단 조건

검증 실패, 의도하지 않은 파일 포함, 시크릿 발견, 운영 DNS 변경이 필요한 경우 → **중단하고 CEO에게 보고**한다.
