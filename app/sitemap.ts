import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://gigcalcapp.com', // 님의 사이트 주소
      lastModified: new Date(),      // 언제 수정됐는지 (자동으로 오늘 날짜)
      changeFrequency: 'daily',      // 얼마나 자주 바뀌는지 (매일)
      priority: 1,                   // 중요도 (1이 최고점)
    },
    // 나중에 페이지가 늘어나면 여기에 더 추가하면 됩니다.
  ]
}