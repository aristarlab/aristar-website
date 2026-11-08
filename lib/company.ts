/**
 * 회사 정보 단일 출처.
 * 값 변경은 CEO 승인 사항이며, 변경 시 `docs/decisions/`에 기록한다.
 * 다른 곳에서 이 값을 하드코딩하지 않는다. (`.claude/rules/frontend/web.md`)
 */
export const company = {
  legalName: "AristarLab",
  registrationNumber: "389-88-03801",
  foundedAt: "2026년 4월",
  address: "서울특별시 강남구 압구정로 306",
  region: "서울 강남구",
  businessHours: "평일 10:00–19:00",
  email: "support@aristar.io",
  domain: "aristar.io",
} as const;
