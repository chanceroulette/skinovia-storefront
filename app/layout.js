import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Skinovia — Mapped by light, renewed by laser',
  description: 'Advanced light & laser dermatology and longevity skincare, calibrated for the modern complexion. Dubai, UAE.',
  metadataBase: new URL('https://skinovia.ae'),
  openGraph: {
    title: 'Skinovia',
    description: 'Advanced light & laser skincare. Dubai, UAE.',
    type: 'website'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
