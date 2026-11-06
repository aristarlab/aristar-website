---
paths:
  - "app/**"
  - "components/**"
  - "*.html"
  - "styles/**"
  - "public/**"
---
# 웹 프론트엔드 규칙

## 디자인 토큰 (기존 사이트에서 승계 — 임의 변경 금지)

```
--bg #ffffff   --surface #f5f5f7   --line #d2d2d7   --line-soft #e5e5ea
--ink #1d1d1f  --body #424245      --muted #6e6e73  --subtle #86868b
--accent #0066cc
```

- 본문 폰트 `Noto Sans KR`. 약관 페이지는 Fraunces + JetBrains Mono 톤을 유지한다.
- 한국어 조판: `word-break: keep-all`, `overflow-wrap: break-word`를 항상 적용한다.
- 라운드: 타일 24px, 버튼 999px(pill).
- 색을 새로 만들지 말고 위 토큰을 쓴다. 토큰 추가는 전략기획(브랜드팀) 승인 사항이다.

## 구조

- Next.js App Router. 페이지는 서버 컴포넌트가 기본. `"use client"`는 상호작용이 실제로 필요한 컴포넌트에만 붙인다.
- 공용 UI는 `components/`, 페이지 전용 컴포넌트는 해당 라우트 폴더 안에 둔다.
- 외부 의존성은 Google Fonts만 유지한다. UI 라이브러리를 새로 들이기 전 IT 본부장 승인을 받는다.

## 접근성·품질 (검수 기준)

- 모든 이미지·장식 SVG에 `alt` 또는 `aria-label`/`aria-hidden`을 지정한다.
- 포커스 링을 제거하지 않는다 (`:focus-visible` 3px `--accent`).
- 본문 대비비 4.5:1 이상.
- 모바일 360px부터 데스크톱까지 가로 스크롤이 생기지 않아야 한다.
- 시맨틱 태그(`header/main/section/article/footer`)와 `<h1>` 1개 원칙을 지킨다.

## 금지

- 회사 정보(주소·사업자번호·메일·설립일)를 하드코딩으로 흩뿌리지 않는다. `lib/company.ts` 한 곳에서 가져온다.
- 실제 수치·실적·사용자 수를 추측해서 적지 않는다.
- 운영 중인 `index.html` / `privacy.html` / `terms.html`을 Next.js 전환 검증 전에 삭제하지 않는다.

## 레퍼런스

해외 유명 사이트 UI/UX 참고 기준은 `.claude/rules/frontend/design-reference.md`를 따른다. 패턴만 참고하고 자산·카피·코드는 복제하지 않는다.
