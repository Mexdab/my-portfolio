'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
    const taglineRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const words = ['Full Stack Developer', 'Web Application Architect', 'UI Craftsman', 'Problem Solver'];
        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let timer;

        const type = () => {
            const current = words[wordIndex];
            const el = taglineRef.current;
            if (!el) return;

            if (!deleting) {
                el.textContent = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) {
                    deleting = true;
                    timer = setTimeout(type, 1800);
                    return;
                }
            } else {
                el.textContent = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }
            timer = setTimeout(type, deleting ? 60 : 100);
        };

        timer = setTimeout(type, 500);
        return () => clearTimeout(timer);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) return (
        <section id="home" style={{ minHeight: '100vh', backgroundColor: '#0a0a0f' }} />
    );

    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 5%',
                paddingTop: '6rem',
                position: 'relative',
                overflow: 'hidden',
                gap: '2rem',
                backgroundColor: '#0a0a0f',
            }}
        >
            {/* Background Grid */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(170,255,0,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(170,255,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px', zIndex: 0,
            }} />

            {/* Glow Blob */}
            <div style={{
                position: 'absolute', top: '20%', right: '15%',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(170,255,0,0.07) 0%, transparent 70%)',
                borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
            }} />

            {/* Left Content */}
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '620px' }}>

                {/* Available Tag */}
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    background: 'rgba(170,255,0,0.06)',
                    border: '1px solid rgba(170,255,0,0.15)',
                    borderRadius: '100px', padding: '0.35rem 1rem', marginBottom: '2rem',
                }}>
                    <span style={{
                        width: '6px', height: '6px', background: '#aaff00',
                        borderRadius: '50%', display: 'inline-block',
                        boxShadow: '0 0 8px #aaff00',
                        animation: 'pulse 2s ease-in-out infinite',
                    }} />
                    <span style={{
                        fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem',
                        color: '#aaff00', letterSpacing: '0.2em',
                        textTransform: 'uppercase', fontWeight: 500,
                    }}>
                        Available for work
                    </span>
                </div>

                {/* Name */}
                <h1 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                    fontWeight: 800, lineHeight: 1,
                    letterSpacing: '-0.03em', color: '#f0f0f0', marginBottom: '0.5rem',
                }}>
                    Hi, I&apos;m{' '}
                    <span style={{ color: 'transparent', WebkitTextStroke: '2px #aaff00' }}>
                        Jana
                    </span>
                    <span style={{ color: '#aaff00' }}>.</span>
                </h1>

                {/* Typewriter */}
                <h2 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
                    fontWeight: 600, color: '#9090a8',
                    marginBottom: '1.5rem', minHeight: '3rem', letterSpacing: '-0.02em',
                }}>
                    I&apos;m a{' '}
                    <span ref={taglineRef} style={{ color: '#aaff00' }} />
                    <span style={{
                        display: 'inline-block', width: '3px', height: '1em',
                        background: '#aaff00', marginLeft: '3px',
                        verticalAlign: 'middle',
                        animation: 'blink 1s step-end infinite',
                    }} />
                </h2>

                {/* Description */}
                <p style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                    color: '#9090a8', lineHeight: 1.8,
                    maxWidth: '480px', marginBottom: '2.5rem',
                }}>
                    Specializing in building full-stack web applications and high-performance digital systems. I turn complex requirements into seamless, scalable solutions.
                </p>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a
                        href="#portfolio"
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '0.95rem', fontWeight: 600,
                            color: '#0a0a0f', background: '#aaff00',
                            padding: '0.85rem 2rem', borderRadius: '100px',
                            textDecoration: 'none',
                            boxShadow: '0 0 30px #aaff0055',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.03em',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 50px #aaff0099';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 30px #aaff0055';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        View My Work &rarr;
                    </a>

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '0.95rem', fontWeight: 600,
                            color: '#aaff00', background: 'transparent',
                            padding: '0.85rem 2rem', borderRadius: '100px',
                            textDecoration: 'none',
                            border: '1px solid rgba(170,255,0,0.3)',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.03em',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(170,255,0,0.08)';
                            e.currentTarget.style.borderColor = '#aaff00';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'rgba(170,255,0,0.3)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Download CV
                    </a>
                </div>
            </div>

            {/* Right — Floating Card */}
            <div
                style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}
                className="hero-card-wrap"
            >
                <div style={{
                    width: '320px', height: '420px', borderRadius: '2rem',
                    background: '#16161f',
                    border: '1px solid rgba(170,255,0,0.12)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '1.5rem',
                    animation: 'heroFloat 6s ease-in-out infinite',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(170,255,0,0.05)',
                }}>
                    {/* ✅ Crystal Clear Photo Fix */}
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: '0 0 40px rgba(170,255,0,0.3)',
                        border: '3px solid #aaff00',
                        flexShrink: 0, isolation: 'isolate', transform: 'translateZ(0)',
                    }}>
                        <img
                            src="/profile.png"
                            alt="Janarthan S K"
                            style={{
                                width: '100%', height: '100%',
                                objectFit: 'cover', display: 'block',
                                transform: 'scale(1.02) translateZ(0)',
                                imageRendering: 'auto'
                            }}
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#f0f0f0' }}>
                            Janarthan S K
                        </p>
                        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', color: '#9090a8', marginTop: '0.2rem' }}>
                            Full-Stack Developer
                        </p>
                    </div>

                    {/* Skill Pills */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', padding: '0 1rem' }}>
                        {['Next.js', 'React', 'Node.js', 'Python'].map((skill) => (
                            <span key={skill} style={{
                                fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem',
                                color: '#aaff00', background: 'rgba(170,255,0,0.08)',
                                border: '1px solid rgba(170,255,0,0.2)',
                                borderRadius: '100px', padding: '0.25rem 0.75rem', fontWeight: 500,
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* Status */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(170,255,0,0.05)',
                        border: '1px solid rgba(170,255,0,0.1)',
                        borderRadius: '100px', padding: '0.4rem 1rem',
                    }}>
                        <span style={{
                            width: '6px', height: '6px', background: '#aaff00',
                            borderRadius: '50%', boxShadow: '0 0 6px #aaff00',
                            animation: 'pulse 2s ease-in-out infinite',
                        }} />
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', color: '#aaff00' }}>
                            Open to opportunities
                        </span>
                    </div>
                </div>

                {/* Badge — top right */}
                <div style={{
                    position: 'absolute', top: '-1rem', right: '-1rem',
                    background: '#aaff00', borderRadius: '1rem',
                    padding: '0.6rem 1rem',
                    boxShadow: '0 0 30px #aaff0066',
                    animation: 'heroFloat 4s ease-in-out infinite reverse',
                }}>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.7rem', fontWeight: 800, color: '#0a0a0f', margin: 0 }}>
                        5+ Projects
                    </p>
                </div>

                {/* Badge — bottom left */}
                <div style={{
                    position: 'absolute', bottom: '-1rem', left: '-1rem',
                    background: 'rgba(22,22,31,0.95)',
                    border: '1px solid rgba(170,255,0,0.2)',
                    borderRadius: '1rem', padding: '0.6rem 1rem',
                    animation: 'heroFloat 5s ease-in-out infinite',
                }}>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#aaff00', margin: 0 }}>
                        2+ Years Exp.
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="scroll-indicator"
                style={{
                    position: 'absolute', bottom: '2rem', left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '0.5rem', zIndex: 1,
                }}
            >
                <span style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem',
                    color: '#3a3a4a', letterSpacing: '0.2em', textTransform: 'uppercase',
                }}>
                    Scroll
                </span>
                <div style={{
                    width: '1px', height: '50px',
                    background: 'linear-gradient(to bottom, #aaff00, transparent)',
                    animation: 'scrollLine 2s ease-in-out infinite',
                }} />
            </div>

            <style>{`
                @keyframes heroFloat {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-16px); }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 6px #aaff00; }
                    50%       { box-shadow: 0 0 20px #aaff00; }
                }
                @keyframes scrollLine {
                    0%   { transform: scaleY(0); transform-origin: top; }
                    50%  { transform: scaleY(1); transform-origin: top; }
                    51%  { transform: scaleY(1); transform-origin: bottom; }
                    100% { transform: scaleY(0); transform-origin: bottom; }
                }
                @media (max-width: 900px) {
                    .hero-card-wrap   { display: none !important; }
                    .scroll-indicator { display: none !important; }
                }
            `}</style>
        </section>
    );
}