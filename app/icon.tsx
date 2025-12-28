import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 22,
          background: '#2563EB', // Blue-600 (우리 앱 테마색)
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px', // 둥근 모서리 (앱 아이콘 느낌)
          fontWeight: 900,     // 아주 두꺼운 글씨
          fontFamily: 'sans-serif',
        }}
      >
        $
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}