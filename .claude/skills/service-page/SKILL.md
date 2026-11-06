---
description: 신규 또는 기존 사업의 서비스 소개 페이지(/슬러그)를 규격에 맞게 추가·갱신한다
argument-hint: <슬러그> [서비스명]
---

# 서비스 소개 페이지 작업

대상: $ARGUMENTS

주관은 IT본부(`it-lead`), 카피는 마케팅(`content-marketing-team`), 시각 자산은 컨텐츠본부(`content-studio-team`)다.
규격은 `.claude/rules/frontend/service-pages.md`, 디자인은 `web.md` + `design-reference.md`.

## 1. 슬러그 확인

`CLAUDE.md`의 사업 표를 먼저 확인한다.
- 표에 있으면 그 슬러그를 그대로 쓴다.
- 표에 없는 신규 사업이면 **CEO 승인 사항**이다. 슬러그·서비스명·상태를 제안하고 승인받은 뒤 `CLAUDE.md` 표와 `ops/voc/taxonomy.yml`을 **함께** 갱신한다.

슬러그 규칙: 소문자, 하이픈 구분, 단일 경로 세그먼트. URL은 `/<슬러그>`.

## 2. 내용 준비 (동시 진행)

- 카피: 히어로 한 줄, 문제·해법, 기능 3~6개, FAQ — 과장·미검증 수치 금지
- 메타데이터: `title` = `<서비스명> — AristarLab`, `description` 한국어 80~120자, OG, canonical `https://aristar.io/<슬러그>`
- 시각 자산: 스크린샷 또는 다이어그램. 없으면 해당 섹션을 **비워두지 말고 제거**한다.

## 3. 구현

섹션 순서: 히어로(상태 배지) → 문제·해법 → 핵심 기능 → 시각 자산 → FAQ(선택) → 문의 CTA.

문의 CTA는 VOC 자동 분류를 전제로 제목 태그를 넣는다.

```
mailto:support@aristar.io?subject=[<슬러그>] 문의
```

미출시 제품에는 다운로드 버튼을 넣지 않는다. 상태 배지 + "출시 알림 받기"로 대체한다.

## 4. 검수 (하나라도 실패하면 반려)

- `npm run build` / `lint` / `typecheck` 통과
- 360px에서 가로 스크롤 없음
- 메타데이터 4종(title/description/OG/canonical) 존재
- `mailto` 제목 태그가 슬러그와 일치
- 회사 정보가 `lib/company.ts`에서 옴
- 사이트맵에 새 경로 포함

## 5. 마무리

`sitemap.xml` 갱신, 메인 페이지 제품 섹션에서 해당 페이지로 링크 연결, `docs/reports/`에 산출물 기록.
