import type { Metadata } from "next";
import { company } from "@/lib/company";
import { getService } from "@/lib/services";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SLUG = "content-automation";

export async function generateMetadata(): Promise<Metadata> {
  const service = getService(SLUG);
  const title = `${service?.name ?? SLUG} — AristarLab`;
  const description =
    "콘텐츠 자동화는 소재 입력부터 합성, 출력까지 영상 제작 과정을 멀티 에이전트 파이프라인으로 연결한 시스템입니다. AristarLab이 사내에서 직접 운영하며 반복 가능한 구조로 콘텐츠를 만듭니다.";
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
  "소재 입력": "영상 제작에 쓸 소재를 시스템에 입력하는 단계입니다.",
  "에이전트 처리": "입력된 소재를 멀티 에이전트가 처리하는 단계입니다.",
  "합성": "처리된 결과를 영상으로 합성하는 단계입니다.",
  "출력": "완성된 영상을 출력하는 단계입니다.",
};

export default function ContentAutomationPage() {
  const service = getService(SLUG);
  const name = service?.name ?? "콘텐츠 자동화";
  const stage = service?.stage ?? "사내 운영";
  const steps = service?.steps ?? [];

  return (
    <>
      <div className="wrap">
        <SiteHeader basePath="/" contactHref="#contact" />

        <section className="statement">
          <h1>{name}</h1>
          <p className="lede">영상 콘텐츠를 대규모로 제작하는 멀티 에이전트 파이프라인</p>
          <p className="status">{stage}</p>
        </section>
      </div>

      <main className="wrap">
        <section className="problem">
          <h2 className="section-title">문제와 해법</h2>
          <p>
            영상 콘텐츠를 사람이 하나씩 만들면 소재 수집부터 출력까지 각
            단계가 반복 작업이 많아 제작 속도를 늘리기 어렵습니다.
          </p>
          <p>
            콘텐츠 자동화는 소재 입력, 에이전트 처리, 합성, 출력 네 단계를
            에이전트 파이프라인으로 연결해 사내에서 운영하고 있습니다.
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
          <h2 className="section-title">처리 단계</h2>
          <ol className="steps">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="contact" id="contact">
          <h2>궁금한 점이 있으신가요?</h2>
          <a
            className="mail"
            href="mailto:support@aristar.io?subject=%5Bcontent-automation%5D%20%EB%AC%B8%EC%9D%98"
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
