import type { Metadata } from "next";
import { company } from "@/lib/company";
import { getService } from "@/lib/services";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SLUG = "algo-trading";

export async function generateMetadata(): Promise<Metadata> {
  const service = getService(SLUG);
  const title = `${service?.name ?? SLUG} — AristarLab`;
  const description =
    "알고리즘 트레이딩은 MetaTrader 5를 기반으로 전략 설계와 백테스트, 검증을 반복하는 리서치 중심 시스템 전략입니다. 아직 연구 개발 단계이며 실거래 성과는 공개하지 않습니다.";
  const url = `https://${company.domain}/${SLUG}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}

const FEATURE_COPY: Record<string, string> = {
  "전략 설계": "매매 규칙과 가정을 세우는 단계입니다.",
  "백테스트": "과거 시장 데이터로 전략을 검증하는 단계입니다.",
  "검증": "백테스트 결과를 점검하고 전략 설계로 되돌리는 단계입니다.",
};

export default function AlgoTradingPage() {
  const service = getService(SLUG);
  const name = service?.name ?? "알고리즘 트레이딩";
  const stage = service?.stage ?? "연구 개발";
  const steps = service?.steps ?? [];
  const loopNote = service?.loopNote;

  return (
    <>
      <div className="wrap">
        <SiteHeader basePath="/" contactHref="#contact" />

        <section className="statement">
          <h1>{name}</h1>
          <p className="lede">MetaTrader 5 기반의 리서치 중심 시스템 전략</p>
          <p className="status">{stage}</p>
        </section>
      </div>

      <main className="wrap">
        <section className="problem">
          <h2 className="section-title">문제와 해법</h2>
          <p>
            자동화된 매매 전략은 설계 단계에서 세운 가정이 실제 시장
            데이터에서 그대로 맞아떨어지지 않는 경우가 많아 반복적인 검증
            과정이 필요합니다.
          </p>
          <p>
            알고리즘 트레이딩은 전략 설계, 백테스트, 검증 세 단계를 거치고,
            검증 결과를 다시 설계로 되돌려 반복하는 구조로 연구를 진행하고
            있습니다. 아직 연구 단계이며 실거래 성과는 공개하지 않습니다.
          </p>
        </section>

        <section className="features">
          <h2 className="section-title">핵심 기능</h2>
          <div className="feature-grid">
            {steps.map((step) => (
              <div key={step}>
                <h3>{step}</h3>
                <p>{FEATURE_COPY[step] ?? step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="visual">
          <h2 className="section-title">연구 단계</h2>
          <ol className="steps">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {loopNote && <p className="loop">{loopNote}</p>}
        </section>

        <section className="contact" id="contact">
          <h2>궁금한 점이 있으신가요?</h2>
          <a
            className="mail"
            href="mailto:support@aristar.io?subject=%5Balgo-trading%5D%20%EB%AC%B8%EC%9D%98"
          >
            {company.email}
          </a>
          <p className="hours">
            {company.address}
            <br />
            {company.businessHours}
          </p>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
