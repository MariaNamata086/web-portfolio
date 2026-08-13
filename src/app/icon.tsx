import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
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
          fontSize: 42,
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
