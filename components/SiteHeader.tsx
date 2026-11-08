import { company } from "@/lib/company";

/**
 * 메인 페이지와 서비스 소개 페이지가 공유하는 마스트헤드.
 *
 * - `basePath`: 로고("회사명")와 "회사" 링크에 적용된다. 서비스 페이지에는
 *   `#about` 섹션이 없으므로 `basePath="/"`를 넘겨 홈페이지 앵커로 보낸다.
 *   홈페이지는 기본값(빈 문자열)을 써서 같은 페이지 안에서 스크롤한다.
 * - `contactHref`: "문의" 링크 전용. 기본값은 `${basePath}#contact`이지만,
 *   서비스 페이지는 자체 `id="contact"` CTA(사업 태그가 붙은 mailto)가 있으므로
 *   `contactHref="#contact"`를 명시로 넘겨 **현재 페이지 안에서** 스크롤하게 한다.
 *   여기로 이동해야 VOC 자동 분류 전제(사업 태그 붙은 CTA 노출)가 깨지지 않는다.
 */
export default function SiteHeader({
  basePath = "",
  contactHref,
}: {
  basePath?: string;
  contactHref?: string;
}) {
  const contact = contactHref ?? `${basePath}#contact`;
  return (
    <div className="masthead">
      <a className="name" href={`${basePath}#top`}>
        {company.legalName}
      </a>
      <nav>
        <a href={`${basePath}#about`}>회사</a>
        <a href={contact}>문의</a>
      </nav>
    </div>
  );
}
