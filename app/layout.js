import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Assistant from '@/components/Assistant';
import Analytics from '@/components/Analytics';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap'
});
const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap'
});

const HERO_OG =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3EQeR6AMjc6LGT7xL4cimnNPhHk/hf_20260620_073656_19ceddb9-f3af-4fdf-95a4-280441143ac5.png';

export const metadata = {
  metadataBase: new URL('https://skinovia.ae'),
  title: 'Skinovia — Curated Beauty, Delivered Fast | Dubai, UAE',
  description:
    'A curated multi-brand beauty house in the UAE — hand-picked skincare, hair, make-up and beauty-tech, authentic and sealed, delivered fast across the Emirates. VAT included.',
  keywords: ['beauty UAE', 'skincare Dubai', 'makeup Dubai', 'beauty devices UAE', 'fast beauty delivery UAE', 'Skinovia'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://skinovia.ae',
    siteName: 'Skinovia',
    locale: 'en_AE',
    title: 'Skinovia — Curated Beauty, Delivered Fast',
    description: 'Hand-picked skincare, hair, make-up and beauty-tech — authentic, sealed and delivered fast across the UAE.',
    images: [{ url: HERO_OG, width: 1200, height: 630, alt: 'Skinovia — curated beauty house, UAE' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skinovia — Curated Beauty, Delivered Fast',
    description: 'Hand-picked beauty from the brands we trust — delivered fast across the UAE.',
    images: [HERO_OG]
  }
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Skinovia',
  url: 'https://skinovia.ae',
  legalName: 'Opera Engineering FZ-LLC',
  email: 'admin@skinovia.ae',
  telephone: '+971543481109',
  address: { '@type': 'PostalAddress', streetAddress: "FXMB0229 Compass Building, Al Shuhada' Road", addressLocality: 'Ras Al Khaimah', addressRegion: 'Ras Al Khaimah', addressCountry: 'AE' },
  sameAs: ['https://www.instagram.com/skinovia.skincare', 'https://www.tiktok.com/@skinovia']
};
const siteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Skinovia',
  url: 'https://skinovia.ae'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
        <Analytics />
        <Nav />
        {children}
        <Footer />
        <WhatsAppButton />
        <Assistant />
      </body>
    </html>
  );
}
