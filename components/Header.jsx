'use client';

import { useState, useEffect } from 'react';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active link on scroll logic
            const sections = document.querySelectorAll('section[id]');
            sections.forEach((sec) => {
                const top = window.scrollY;
                const offset = sec.offsetTop - 200;
                const height = sec.offsetHeight;
                if (top >= offset && top < offset + height) {
                    setActiveLink('#' + sec.getAttribute('id'));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href) => {
        setActiveLink(href);
        setMenuOpen(false);
    };

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                padding: scrolled ? '1rem 5%' : '1.5rem 5%',
                background: scrolled
                    ? 'rgba(10, 10, 15, 0.85)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled
                    ? '1px solid rgba(170, 255, 0, 0.08)'
                    : '1px solid transparent',
                transition: 'all 0.4s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            {/* Logo */}
            <a
                href="#home"
                onClick={() => handleNavClick('#home')}
                style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#f0f0f0',
                    letterSpacing: '-0.02em',
                    textDecoration: 'none',
                }}
            >
                Janarthan<span style={{ color: '#aaff00' }}>.</span>
            </a>

            {/* Desktop Nav */}
            <nav
                style={{
                    display: 'flex',
                    gap: '2.5rem',
                    alignItems: 'center',
                }}
                className="desktop-nav"
            >
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => handleNavClick(link.href)}
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: activeLink === link.href ? '#aaff00' : '#9090a8',
                            textDecoration: 'none',
                            letterSpacing: '0.05em',
                            transition: 'color 0.3s ease',
                            position: 'relative',
                        }}
                        onMouseEnter={(e) => {
                            if (activeLink !== link.href)
                                e.currentTarget.style.color = '#f0f0f0';
                        }}
                        onMouseLeave={(e) => {
                            if (activeLink !== link.href)
                                e.currentTarget.style.color = '#9090a8';
                        }}
                    >
                        {link.label}
                        {activeLink === link.href && (
                            <span
                                style={{
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '4px',
                                    height: '4px',
                                    background: '#aaff00',
                                    borderRadius: '50%',
                                }}
                            />
                        )}
                    </a>
                ))}

                {/* Hire Me Button */}
                <a
                    href="#contact"
                    onClick={() => handleNavClick('#contact')}
                    style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#0a0a0f',
                        background: '#aaff00',
                        padding: '0.55rem 1.4rem',
                        borderRadius: '100px',
                        textDecoration: 'none',
                        letterSpacing: '0.05em',
                        boxShadow: '0 0 20px #aaff0055',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 40px #aaff0099';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 20px #aaff0055';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Hire Me
                </a>
            </nav>

            {/* Mobile Hamburger */}
            <button
                suppressHydrationWarning
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    flexDirection: 'column',
                    gap: '5px',
                }}
                className="hamburger"
                aria-label="Toggle menu"
            >
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        style={{
                            display: 'block',
                            width: '24px',
                            height: '2px',
                            background: '#aaff00',
                            borderRadius: '2px',
                            transition: 'all 0.3s ease',
                            transform:
                                menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                                    : menuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                                        : 'none',
                            opacity: menuOpen && i === 1 ? 0 : 1,
                        }}
                    />
                ))}
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        background: 'rgba(10, 10, 15, 0.97)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '1px solid rgba(170,255,0,0.08)',
                        padding: '2rem 5%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => handleNavClick(link.href)}
                            style={{
                                fontFamily: 'Syne, sans-serif',
                                fontSize: '1.4rem',
                                fontWeight: 700,
                                color: activeLink === link.href ? '#aaff00' : '#f0f0f0',
                                textDecoration: 'none',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}

            {/* Responsive Styles */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
        </header>
    );
}