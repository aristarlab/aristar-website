import { company } from "@/lib/company";

/** 메인 페이지와 서비스 소개 페이지가 공유하는 푸터. */
export default function SiteFooter() {
  return (
    <footer>
      <span>© 2026 {company.legalName}</span>
      <span className="foot-links">
        <a href="/privacy.html">개인정보 처리방침</a>
        <a href="/terms.html">이용약관</a>
      </span>
    </footer>
  );
}
