'use client';

import { useEffect, useState } from 'react';

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/Mexdab',
        icon: (
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/janarthan-s-k-4838ab283',
        icon: (
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/janarthansk/?hl=en',
        icon: (
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
        ),
    },
];

export default function SocialSidebar() {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            setVisible(window.scrollY > heroHeight * 0.6);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) return null;

    return (
        <div
            style={{
                position: 'fixed',
                left: '1.5rem',
                top: '50%',
                transform: visible
                    ? 'translateY(-50%) translateX(0)'
                    : 'translateY(-50%) translateX(-80px)',
                opacity: visible ? 1 : 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.8rem',
                zIndex: 900,
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                pointerEvents: visible ? 'all' : 'none',
            }}
            className="social-sidebar"
        >
            {/* Top decorative line */}
            <div
                style={{
                    width: '1px',
                    height: '60px',
                    background: 'linear-gradient(to bottom, transparent, rgba(170,255,0,0.8))',
                }}
            />

            {/* Social Links */}
            {socials.map((s) => (
                <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{
                        width: '38px',
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f0f0f0',
                        background: 'rgba(170,255,0,0.08)',
                        border: '1px solid rgba(170,255,0,0.5)',
                        borderRadius: '0.6rem',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                        const target = e.currentTarget;
                        target.style.color = '#0a0a0f';
                        target.style.background = '#aaff00';
                        target.style.borderColor = '#aaff00';
                        target.style.transform = 'translateX(4px)';
                        target.style.boxShadow = '0 0 20px #aaff0066';
                    }}
                    onMouseLeave={(e) => {
                        const target = e.currentTarget;
                        target.style.color = '#f0f0f0';
                        target.style.background = 'rgba(170,255,0,0.08)';
                        target.style.borderColor = 'rgba(170,255,0,0.5)';
                        target.style.transform = 'translateX(0)';
                        target.style.boxShadow = 'none';
                    }}
                >
                    {s.icon}
                </a>
            ))}

            {/* Bottom decorative line */}
            <div
                style={{
                    width: '1px',
                    height: '60px',
                    background: 'linear-gradient(to bottom, rgba(170,255,0,0.8), transparent)',
                }}
            />

            {/* Hide on mobile devices */}
            <style>{`
                @media (max-width: 768px) {
                    .social-sidebar { display: none !important; }
                }
            `}</style>
        </div>
    );
}