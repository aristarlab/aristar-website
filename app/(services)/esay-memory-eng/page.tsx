import type { Metadata } from "next";
import { company } from "@/lib/company";
import { getService } from "@/lib/services";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SLUG = "esay-memory-eng";

export async function generateMetadata(): Promise<Metadata> {
  const service = getService(SLUG);
  const title = `${service?.name ?? SLUG} — AristarLab`;
  const description =
    "esay memory eng는 외운 단어를 잊어버릴 때쯤 다시 보여주는 영어 단어 학습 앱입니다. 복습 시점을 기억 곡선에 맞춰 자동으로 조정하며, 현재 출시를 준비하고 있습니다.";
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

export default function EsayMemoryEngPage() {
  const service = getService(SLUG);
  const name = service?.name ?? "esay memory eng";
  const stage = service?.stage ?? "출시 준비 중";

  return (
    <>
      <div className="wrap">
        <SiteHeader basePath="/" contactHref="#contact" />

        <section className="statement">
          <h1>{name}</h1>
          <p className="lede">
            내 기억 곡선에 맞춰 주는 영어 단어 앱.
            <br />
            잊어버릴 때쯤 다시 보여줍니다.
          </p>
          <p className="status">{stage}</p>
          <a
            className="mail"
            href="mailto:support@aristar.io?subject=%5Besay-memory-eng%5D%20%EC%B6%9C%EC%8B%9C%20%EC%95%8C%EB%A6%BC%20%EC%8B%A0%EC%B2%AD"
          >
            출시 알림 받기
          </a>
        </section>
      </div>

      <main className="wrap">
        <section className="problem">
          <h2 className="section-title">문제와 해법</h2>
          <p>
            단어는 외운 직후가 아니라 시간이 지나 다시 떠올리는 연습을 할 때
            기억에 더 오래 남는다고 알려져 있습니다. 그런데 대부분의 단어
            암기 방식은 외운 순서나 무작위로만 단어를 반복해 보여줄 뿐,
            &quot;언제 다시 보여줘야 하는지&quot;를 사용자 개인의 기억
            상태에 맞추지 않습니다.
          </p>
          <p>
            esay memory eng는 각 단어를 사용자가 &quot;기억났어요&quot;로
            넘겼는지 &quot;다시 볼게요&quot;로 넘겼는지를 기준으로 그 단어가
            다시 노출되는 시점을 조정해, 잊어버릴 때쯤 다시 보여주는 방식으로
            복습 주기를 기억 곡선에 맞춥니다.
          </p>
        </section>

        <section className="features">
          <h2 className="section-title">핵심 기능</h2>
          <div className="feature-grid">
            <div>
              <h3>망각 곡선 기반 재노출</h3>
              <p>
                외운 시점이 아니라 잊어버릴 시점에 맞춰 단어를 다시
                보여줍니다.
              </p>
            </div>
            <div>
              <h3>카드 뒤집기 방식 복습</h3>
              <p>
                단어와 뜻을 카드로 보고 &quot;기억났어요&quot;·&quot;다시
                볼게요&quot; 중 하나를 선택해 복습 상태를 기록합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="visual">
          <h2 className="section-title">화면</h2>
          <div className="card" aria-hidden="true">
            <p className="w">ephemeral</p>
            <p className="m">아주 잠깐 머무는, 덧없는</p>
            <p className="pick">
              <span>다시 볼게요</span>
              <span className="on">기억났어요</span>
            </p>
          </div>
        </section>

        <section className="contact" id="contact">
          <h2>출시 알림을 받아보시겠어요?</h2>
          <a
            className="mail"
            href="mailto:support@aristar.io?subject=%5Besay-memory-eng%5D%20%EB%AC%B8%EC%9D%98"
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
