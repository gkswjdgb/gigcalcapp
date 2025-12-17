import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

// [1] 브랜드 설정 (제목 & 파란색 'A' 아이콘)
export const metadata: Metadata = {
  title: 'GigCalc - Driver Profit & Tax', 
  description: 'Maximize earnings for Uber & DoorDash drivers. Calculate real hourly wage, taxes, and savings instantly.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%232563eb%22/><text x=%2250%22 y=%2270%22 font-family=%22Arial, sans-serif%22 font-weight=%22bold%22 font-size=%2270%22 text-anchor=%22middle%22 fill=%22white%22>A</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <head> 태그를 삭제하고, 스크립트를 body 안으로 옮겼습니다. 구글이 더 잘 찾습니다. */}
      <body className={inter.className}>
        
        {/* [2] 구글 애드센스 (광고) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9757952393788382"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* [3] 구글 애널리틱스 (분석) */}
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