---
paths:
  - "app/(services)/**"
  - "content/services/**"
  - "lib/services*"
---
# 서비스 소개 페이지 규칙

URL은 `/<슬러그>` 단일 세그먼트다. 슬러그는 `CLAUDE.md`의 사업 표와 **반드시 일치**해야 한다.
현재 슬러그: `esay-memory-eng`, `content-automation`, `algo-trading`.

## 메타데이터 (필수)

각 서비스 라우트는 `generateMetadata`로 다음을 내보낸다.
- `title`: `<서비스명> — AristarLab`
- `description`: 한국어 80~120자, 과장·미검증 수치 없음
- `openGraph`: title, description, url(`https://aristar.io/<슬러그>`), image
- `alternates.canonical`: `https://aristar.io/<슬러그>`

## 섹션 순서 (표준 골격)

1. 히어로 — 한 줄 가치 제안 + 상태 배지(출시 준비 중 / 운영 중 / 연구 개발)
2. 문제와 해법 — 2~3 문단
3. 핵심 기능 — 3~6개 타일
4. 스크린샷 또는 다이어그램 (없으면 섹션을 비우지 말고 제거)
5. FAQ (선택)
6. 문의 CTA — `support@aristar.io`, 문의 유형에 사업 슬러그를 담는다

## 문의 연결 (VOC 연계 — 중요)

CTA의 메일 링크는 제목에 사업 식별자를 넣어 VOC 분류가 자동으로 되게 한다.

```
mailto:support@aristar.io?subject=[esay-memory-eng] 문의
```

슬러그 표기를 바꾸면 메일 분류 규칙(`ops/voc/taxonomy.yml`)도 같이 바꿔야 한다. 한쪽만 바꾸지 않는다.

## 상태 표기

출시되지 않은 제품에 "다운로드" 버튼을 넣지 않는다. 상태 배지와 "출시 알림 받기"로 대체한다.
