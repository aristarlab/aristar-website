import type { Metadata } from "next";
import { company } from "@/lib/company";
import "./globals.css";

export const metadata: Metadata = {
  title: "AristarLab — 시끄러운 일상을 위한 조용한 소프트웨어",
  description:
    "AristarLab은 서울의 소프트웨어 스튜디오로, 지능형 모바일 앱과 자동화 시스템을 만듭니다.",
  metadataBase: new URL(`https://${company.domain}`),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: `https://${company.domain}/`,
    title: "AristarLab — 시끄러운 일상을 위한 조용한 소프트웨어",
    description:
      "서울에서 모바일 앱과 자동화 제품을 만듭니다. 언어, 학습, 자동화가 만나는 지점에서 일합니다.",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
