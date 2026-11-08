import { company } from "@/lib/company";
import { services } from "@/lib/services";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <div className="wrap">
        <SiteHeader />

        <section id="top" className="statement">
          <h1>
            시끄러운 일상을 위한
            <br />
            조용한 소프트웨어
          </h1>
          <p className="lede">
            서울에서 모바일 앱과 자동화 제품을 만듭니다. 언어, 학습, 자동화가
            만나는 지점에서 일합니다.
          </p>
          <div className="jump">
            {services.map((service) => (
              <a key={service.slug} href={`#${service.slug}`}>
                {service.name}
              </a>
            ))}
          </div>
        </section>
      </div>

      <main className="wrap">
        <div className="index">
          {services.map((service) => (
            <article className="row" id={service.slug} key={service.slug}>
              <p className="status">{service.stage}</p>
              <div>
                <h2>{service.name}</h2>
                <p className="desc">{service.summary}</p>
                <a className="more" href={`/${service.slug}`}>
                  자세히 보기
                </a>

                {service.slug === "esay-memory-eng" && (
                  <div className="card" aria-hidden="true">
                    <p className="w">ephemeral</p>
                    <p className="m">아주 잠깐 머무는, 덧없는</p>
                    <p className="pick">
                      <span>다시 볼게요</span>
                      <span className="on">기억났어요</span>
                    </p>
                  </div>
                )}

                {service.steps && (
                  <ol className="steps">
                    {service.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                )}

                {service.loopNote && (
                  <p className="loop">{service.loopNote}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        <section className="about" id="about">
          <p>사용자의 주의와 시간을 존중하는 소프트웨어를 만듭니다.</p>
          <dl className="facts">
            <div>
              <dt>설립</dt>
              <dd>{company.foundedAt}</dd>
            </div>
            <div>
              <dt>위치</dt>
              <dd>{company.region}</dd>
            </div>
            <div>
              <dt>분야</dt>
              <dd>모바일 · 자동화</dd>
            </div>
            <div>
              <dt>사업자등록번호</dt>
              <dd>{company.registrationNumber}</dd>
            </div>
          </dl>
        </section>

        <section className="contact" id="contact">
          <h2>보내주신 메시지는 모두 읽고 있습니다.</h2>
          <a className="mail" href={`mailto:${company.email}`}>
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
