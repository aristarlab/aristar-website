/**
 * 사업 정보 단일 출처. `CLAUDE.md`의 사업 표와 정확히 일치해야 한다.
 * 슬러그는 URL·메일 라벨·문서에서 동일하게 쓴다.
 */
export type Service = {
  slug: string;
  name: string;
  stage: string;
  summary: string;
  steps?: string[];
  loopNote?: string;
};

export const services: Service[] = [
  {
    slug: "esay-memory-eng",
    name: "esay memory eng",
    stage: "출시 준비 중",
    summary:
      "내 기억 곡선에 맞춰 주는 영어 단어 앱. 잊어버릴 때쯤 다시 보여줍니다.",
  },
  {
    slug: "content-automation",
    name: "콘텐츠 자동화",
    stage: "사내 운영",
    summary:
      "영상 콘텐츠를 대규모로 제작하는 멀티 에이전트 파이프라인. 사내에서 운영하고 있습니다.",
    steps: ["소재 입력", "에이전트 처리", "합성", "출력"],
  },
  {
    slug: "algo-trading",
    name: "알고리즘 트레이딩",
    stage: "연구 개발",
    summary:
      "MetaTrader 5 기반의 리서치 중심 시스템 전략. 아직 연구 단계입니다.",
    steps: ["전략 설계", "백테스트", "검증"],
    loopNote: "검증 결과를 설계로 되돌려 반복합니다.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
