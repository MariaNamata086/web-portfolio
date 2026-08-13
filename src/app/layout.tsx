import type { Metadata } from 'next';
import { Bricolage_Grotesque, Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import ChatLauncher from '@/components/chat/ChatLauncher';
import { site } from '@/lib/site';
import './globals.css';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument-sans', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-instrument-serif', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_GB',
  },
  twitter: { card: 'summary_large_image' },
};

// Before paint, so the theme does not flash.
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',s||(d?'dark':'light'));}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${bricolage.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}>
        <a href='#main' className='skip-link'>
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id='main'>{children}</main>
        <Footer />
        <ChatLauncher />
      </body>
    </html>
  );
}
