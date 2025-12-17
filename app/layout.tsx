import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // 구글 광고 스크립트용

const inter = Inter({ subsets: ['latin'] });

// 사이트 정보 (SEO 최적화: 구글 검색에 예쁘게 나오도록 수정함)
export const metadata: Metadata = {
  title: 'GigCalc - Driver Profit & Tax Calculator',
  description:
    'Calculate real hourly wages, tax deductions (IRS mileage), and safe spending limits for Uber, DoorDash, and Gig workers.',
  keywords:
    'Uber eats calculator, DoorDash profit calculator, gig worker tax shield, IRS mileage deduction 2024',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 구글 애드센스 (Google AdSense) 코드 */}
        {/* 아래 ca-pub-0000... 부분을 본인의 애드센스 ID로 바꾸세요! */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9757952393788382"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
