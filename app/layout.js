import './globals.css';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Assistant from '@/components/Assistant';

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
  title: 'Skinovia — Advanced Anti-Aging Skincare | Dubai, UAE',
  description:
    'Luxury anti-aging skincare and beauty-tech for visibly firmer, luminous, rejuvenated skin. Dermatologist-grade formulas, delivered next day across the UAE.',
  keywords: ['skincare Dubai', 'anti-aging UAE', 'luxury skincare UAE', 'lash serum Dubai', 'rejuvenation skincare', 'Skinovia'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://skinovia.ae',
    siteName: 'Skinovia',
    locale: 'en_AE',
    title: 'Skinovia — Advanced Anti-Aging Skincare',
    description: 'Luxury anti-aging skincare and beauty-tech, delivered next day across the UAE.',
    images: [{ url: HERO_OG, width: 1200, height: 630, alt: 'Skinovia — advanced anti-aging skincare' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skinovia — Advanced Anti-Aging Skincare',
    description: 'Luxury anti-aging skincare, delivered next day across the UAE.',
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
  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
  sameAs: ['https://www.instagram.com/skinovia', 'https://www.tiktok.com/@skinovia']
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
        <Nav />
        {children}
        <Footer />
        <WhatsAppButton />
        <Assistant />
      </body>
    </html>
  );
}
