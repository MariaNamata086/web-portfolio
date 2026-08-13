import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 70,
          background: '#F8F2E7',
          color: '#14100A',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 19, letterSpacing: 2, textTransform: 'uppercase', color: '#C2401A' }}>
          <span>maria namata</span>
          <span>marianamata.dev</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 82, lineHeight: 1, fontWeight: 800, letterSpacing: '-0.045em', maxWidth: 900 }}>
            I build the websites people actually use.
          </div>
          <div style={{ fontSize: 28, color: '#4E4535', marginTop: 26 }}>
            Front-end developer, Kampala. React, Next.js, TypeScript.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 19, letterSpacing: 2, textTransform: 'uppercase', color: '#6E6250' }}>
          <span>Open to remote work</span>
          <span>UTC+3</span>
        </div>
      </div>
    ),
    size,
  );
}
