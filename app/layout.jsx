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
            © {new Date().getFullYear()} — Designed & Developed by{' '}
            <span style={{ color: '#aaff00', fontWeight: 600 }}>Janarthan S K</span>
          </p>
          <p style={{ color: '#3a3a4a', fontSize: '0.8rem', fontFamily: 'Outfit, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Digital Experience Engineer · Available for Worldwide Collaboration
          </p>
        </footer>

      </body>
    </html>
  );
}