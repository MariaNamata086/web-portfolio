import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#14100A',
          color: '#F8F2E7',
          fontSize: 118,
          fontWeight: 700,
          letterSpacing: '-0.05em',
        }}
      >
        m<span style={{ color: '#FF7A45' }}>.</span>
      </div>
    ),
    size,
  );
}
