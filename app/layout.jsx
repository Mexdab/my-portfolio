import './globals.css';
import Header from '@/components/Header';
import Cursor from '@/components/Cursor';
import SocialSidebar from '@/components/SocialSidebar';

export const metadata = {
  title: 'Janarthan | Web Developer',
  description:
    'Portfolio of Janarthan — a passionate web developer crafting modern, responsive, and high-performance websites using Next.js, React, and more.',
  keywords: [
    'Janarthan',
    'Web Developer',
    'Next.js Developer',
    'React Developer',
    'Portfolio',
    'Frontend Developer',
    'India',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  authors: [{ name: 'Janarthan' }],
  creator: 'Janarthan',
  openGraph: {
    title: 'Janarthan | Web Developer',
    description: 'Crafting modern and responsive websites that bring ideas to life.',
    url: 'https://janarthan.dev',
    siteName: 'Janarthan Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Janarthan | Web Developer',
    description: 'Crafting modern and responsive websites that bring ideas to life.',
    creator: '@janarthan',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grain">

        {/* ✅ Fix scroll restoration — always open at top */}
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = 'manual'; window.scrollTo(0, 0);`,
          }}
        />

        {/* Custom Cursor Elements */}
        <div className="cursor-dot" id="cursor-dot" />
        <div className="cursor-ring" id="cursor-ring" />

        {/* Cursor Logic */}
        <Cursor />

        {/* Header */}
        <Header />

        {/* Fixed Social Sidebar */}
        <SocialSidebar />

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer
          style={{
            background: '#111118',
            borderTop: '1px solid rgba(170,255,0,0.08)',
            padding: '2rem 5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ color: '#9090a8', fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif' }}>
            © 2026 — Designed & Developed by{' '}
            <span style={{ color: '#aaff00', fontWeight: 600 }}>Janarthan S K</span>
          </p>
          <p style={{
            color: '#3a3a4a', fontSize: '0.8rem',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Digital Experience Engineer · Available for Worldwide Collaboration
          </p>
        </footer>

      </body>
    </html>
  );
}