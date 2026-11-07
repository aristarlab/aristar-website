---
paths:
  - "app/**"
  - "components/**"
  - "*.html"
  - "styles/**"
  - "public/**"
---
# 웹 프론트엔드 규칙

## 디자인 토큰 (CEO 확정 2026-11-06 — 임의 변경 금지)

근거: `docs/decisions/2026-11-06-visual-direction-index.md`

```
--ink      #0F1C24   제목·본문        (17.33:1 on white)
--ink-mid  #45575F   보조 텍스트       ( 7.55:1 on white)
--hairline #94A3AB   선 전용           ( 2.60:1 — 텍스트 금지)
--paper    #F4F6F6   면
--page     #FFFFFF   바탕
--signal   #2E6354   링크·포커스·상태  ( 6.93:1 on white)
--measure  540px     본문 측정폭
```

- `--hairline`은 본문 대비 기준에 미달한다. **선과 구분자에만 쓴다. 텍스트 색으로 쓰지 않는다.**
- 서체 2종: **고운바탕**(Gowun Batang — 성명문·사업명) + **IBM Plex Sans KR**(본문·UI). 두 서체가 회사의 두 축(조용함 / 소프트웨어)을 담는다. 서체를 바꾸거나 추가하지 않는다.
- 본문: 17px / `line-height: 1.6` / `letter-spacing: 0`. **자간에 음수값을 쓰지 않는다** (44px 상한 스케일에서 필요한 구간이 없다). 예외는 성명문 `-0.01em`.
- 한국어 조판: `word-break: keep-all`, `overflow-wrap: break-word`를 항상 적용한다. 레거시 `word-break: break-word`는 `overflow-wrap`을 덮어쓰므로 쓰지 않는다.
- `ch` 단위로 본문 폭을 설계하지 않는다. 한글 전각과 맞지 않는다. px/rem을 쓴다.
- `text-wrap: balance`/`pretty`를 자동 줄바꿈에 쓰지 않는다. 한국어 동작 근거가 없다. 중요한 줄바꿈은 수동으로 고정한다.
- **라운드는 상호작용 표면에만 쓴다.** 라운드값이 "누를 수 있음"을 뜻하게 한다. 모든 블록에 같은 값을 돌리지 않는다.
- **비트리거 모션을 쓰지 않는다.** 스크롤 등장 효과를 넣지 않는다. 사용자 동작에 답하는 전환만 둔다.
- 색을 새로 만들지 말고 위 토큰을 쓴다. 토큰 추가는 전략기획(브랜드팀) 승인 사항이다.
- 약관·개인정보 페이지는 아직 이전 시각 언어(베이지 + Fraunces)를 쓴다. **후속 과제로 위 토큰에 맞춰야 한다.** 본문 내용은 법무 검토를 거쳤으므로 스타일만 교체한다.

## 구조

- Next.js App Router. 페이지는 서버 컴포넌트가 기본. `"use client"`는 상호작용이 실제로 필요한 컴포넌트에만 붙인다.
- 공용 UI는 `components/`, 페이지 전용 컴포넌트는 해당 라우트 폴더 안에 둔다.
- 외부 의존성은 Google Fonts만 유지한다. UI 라이브러리를 새로 들이기 전 IT 본부장 승인을 받는다.

## 접근성·품질 (검수 기준)

- 모든 이미지·장식 SVG에 `alt` 또는 `aria-label`/`aria-hidden`을 지정한다.
- 포커스 링을 제거하지 않는다 (`:focus-visible` 2px `--signal`, `outline-offset: 4px`).
- 본문 대비비 4.5:1 이상.
- 모바일 360px부터 데스크톱까지 가로 스크롤이 생기지 않아야 한다.
- 시맨틱 태그(`header/main/section/article/footer`)와 `<h1>` 1개 원칙을 지킨다.

## 금지

- 회사 정보(주소·사업자번호·메일·설립일)를 하드코딩으로 흩뿌리지 않는다. `lib/company.ts` 한 곳에서 가져온다.
- 실제 수치·실적·사용자 수를 추측해서 적지 않는다.
- 운영 중인 `index.html` / `privacy.html` / `terms.html`을 Next.js 전환 검증 전에 삭제하지 않는다.

## 레퍼런스

해외 유명 사이트 UI/UX 참고 기준은 `.claude/rules/frontend/design-reference.md`를 따른다. 패턴만 참고하고 자산·카피·코드는 복제하지 않는다.
