import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script' // 스크립트 도구

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GigCalc - Driver Profit & Tax Calculator',
  description: 'Calculate real hourly wages, tax deductions (IRS mileage), and safe spending limits for Uber, DoorDash, and Gig workers.',
  keywords: 'Uber eats calculator, DoorDash profit calculator, gig worker tax shield, IRS mileage deduction 2024',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* --- [1] 구글 애드센스 (돈 벌기) --- */}
        {/* client=ca-pub-0000... 여기에 본인 애드센스 ID가 들어가 있어야 합니다 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9757952393788382"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      
      <body className={inter.className}>
        
        {/* --- [2] 구글 애널리틱스 (데이터 분석) --- */}
        {/* G-XXXXXXXXXX 부분을 님의 측정 ID로 바꾸세요! */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-TM3Y6G8QEN`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TM3Y6G8QEN');
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}