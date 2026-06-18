import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopBar from '../components/TopBar';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { StructuredData } from '../components/StructuredData';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZA Traders',
  url: 'https://zatraders.com',
  logo: 'https://zatraders.com/logo.png',
  description: 'Premium quality printed tags, woven labels, and patches.',
  sameAs: [
    'https://www.facebook.com/zatraders',
    'https://www.instagram.com/zatraders',
  ]
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZA Traders - Premium Printed Tags & Woven Labels',
  description: 'Elevate your brand with ZA Traders. We provide premium quality printed tags, woven labels, leather patches, and custom packaging solutions globally.',
  metadataBase: new URL('https://zatraders.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZA Traders - Custom Labels & Patches',
    description: 'Elevate your brand with premium quality printed tags, woven labels, and patches.',
    url: 'https://zatraders.com',
    siteName: 'ZA Traders',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ZA Traders Premium Labels',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZA Traders - Custom Labels & Patches',
    description: 'Elevate your brand with premium quality printed tags, woven labels, and patches.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <StructuredData data={organizationSchema} />
      </head>
      <body className={inter.className}>
        <TopBar />
        <NavBar />
        <main style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
