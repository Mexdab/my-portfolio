'use client';

import { useState, useEffect, useRef } from 'react';
import { projects } from '@/data/projects';

export default function Portfolio() {
    const [hovered, setHovered] = useState(null);
    const [visibleRows, setVisibleRows] = useState(new Set());
    const [visibleMobile, setVisibleMobile] = useState(new Set());
    const [headerVisible, setHeaderVisible] = useState(false);
    const [ctaVisible, setCtaVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    const rowRefs = useRef([]);
    const mobileRowRefs = useRef([]);
    const headerRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => { setMounted(true); }, []);

    // Header Observer
    useEffect(() => {
        if (!mounted || !headerRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => setHeaderVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        obs.observe(headerRef.current);
        return () => obs.disconnect();
    }, [mounted]);

    // CTA Observer
    useEffect(() => {
        if (!mounted || !ctaRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => setCtaVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        obs.observe(ctaRef.current);
        return () => obs.disconnect();
    }, [mounted]);

    // Desktop Rows Observer
    useEffect(() => {
        if (!mounted) return;
        // Logic fix for React Hook consistency: always use the same dependency array structure
        const observers = rowRefs.current.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleRows((prev) => new Set([...prev, i]));
                        }, i * 100);
                    } else {
                        setVisibleRows((prev) => {
                            const next = new Set(prev);
                            next.delete(i);
                            return next;
                        });
                    }
                },
                { threshold: 0.1 }
            );
            obs.observe(ref);
            return obs;
        });
        return () => observers.forEach((o) => o?.disconnect());
    }, [mounted, projects]); // Use 'projects' to keep dependency array size constant

    // Mobile Rows Observer
    useEffect(() => {
        if (!mounted) return;
        const observers = mobileRowRefs.current.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleMobile((prev) => new Set([...prev, i]));
                        }, i * 120);
                    } else {
                        setVisibleMobile((prev) => {
                            const next = new Set(prev);
                            next.delete(i);
                            return next;
                        });
                    }
                },
                { threshold: 0.1 }
            );
            obs.observe(ref);
            return obs;
        });
        return () => observers.forEach((o) => o?.disconnect());
    }, [mounted, projects]); // Use 'projects' to keep dependency array size constant

    if (!mounted) return (
        <section id="portfolio" style={{ minHeight: '100vh', backgroundColor: '#111118' }} />
    );

    return (
        <section
            id="portfolio"
            style={{
                minHeight: '100vh',
                padding: '7rem 5%',
                background: '#111118',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Glow */}
            <div style={{
                position: 'absolute', top: '20%', left: '50%',
                transform: 'translateX(-50%)',
                width: '600px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(170,255,0,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Header */}
            <div ref={headerRef}>
                <p style={{
                    textAlign: 'center', marginBottom: '1rem',
                    fontFamily: 'Outfit, sans-serif', color: '#aaff00',
                    textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem',
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.6s ease',
                }}>
                    My Work
                </p>
                <h2 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 800, textAlign: 'center', color: '#f0f0f0',
                    letterSpacing: '-0.03em', marginBottom: '1rem',
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.6s ease 0.1s',
                }}>
                    Latest <span style={{ color: '#aaff00' }}>Projects</span>
                </h2>
                <p style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '1rem',
                    color: '#9090a8', textAlign: 'center',
                    maxWidth: '480px', margin: '0 auto 5rem', lineHeight: 1.8,
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.6s ease 0.2s',
                }}>
                    A selection of projects I&apos;ve built — each crafted with
                    attention to detail and purpose.
                </p>
            </div>

            {/* ── DESKTOP ROWS ── */}
            <div
                className="portfolio-desktop"
                style={{
                    maxWidth: '1100px', margin: '0 auto',
                    display: 'flex', flexDirection: 'column', gap: '1.5rem',
                }}
            >
                {projects.map((project, i) => {
                    const isVisible = visibleRows.has(i);
                    return (
                        <div
                            key={project.id}
                            ref={(el) => (rowRefs.current[i] = el)}
                            onMouseEnter={() => setHovered(project.id)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '80px 1fr auto',
                                alignItems: 'center', gap: '2rem',
                                background: hovered === project.id
                                    ? 'rgba(22,22,31,1)' : 'rgba(22,22,31,0.5)',
                                border: `1px solid ${hovered === project.id
                                    ? 'rgba(170,255,0,0.25)' : 'rgba(170,255,0,0.06)'}`,
                                borderRadius: '1.5rem', padding: '1.8rem 2rem',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible
                                    ? 'translateX(0)'
                                    : i % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)',
                                transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.35s ease, border-color 0.35s ease',
                                position: 'relative',
                            }}
                        >
                            <div style={{
                                fontFamily: 'Syne, sans-serif', fontSize: '2.8rem', fontWeight: 800,
                                color: hovered === project.id ? '#aaff00' : 'rgba(170,255,0,0.12)',
                                lineHeight: 1, transition: 'color 0.35s ease', userSelect: 'none',
                            }}>
                                {String(i + 1).padStart(2, '0')}
                            </div>
                            <div>
                                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', color: '#aaff00', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
                                    {project.tag}
                                </span>
                                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#f0f0f0', margin: '0.3rem 0 0.6rem' }}>
                                    {project.title}
                                </h3>
                                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', color: '#9090a8', lineHeight: 1.7, maxWidth: '560px' }}>
                                    {project.description}
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end', flexShrink: 0 }}>
                                <a href={project.link} target="_blank" rel="noopener noreferrer"
                                    style={{
                                        fontFamily: 'Outfit, sans-serif', fontSize: '0.82rem',
                                        fontWeight: 600, color: '#0a0a0f', background: '#aaff00',
                                        padding: '0.5rem 1.2rem', borderRadius: '100px',
                                        textDecoration: 'none', whiteSpace: 'nowrap',
                                        boxShadow: hovered === project.id ? '0 0 30px #aaff0066' : 'none',
                                        transition: 'all 0.3s ease',
                                    }}>
                                    Live ↗
                                </a>
                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                    style={{
                                        fontFamily: 'Outfit, sans-serif', fontSize: '0.82rem',
                                        fontWeight: 500, color: '#9090a8', background: 'transparent',
                                        padding: '0.5rem 1.2rem', borderRadius: '100px',
                                        textDecoration: 'none', border: '1px solid rgba(170,255,0,0.15)',
                                        whiteSpace: 'nowrap', transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#aaff00';
                                        e.currentTarget.style.borderColor = 'rgba(170,255,0,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#9090a8';
                                        e.currentTarget.style.borderColor = 'rgba(170,255,0,0.15)';
                                    }}
                                >
                                    GitHub ↗
                                </a>
                            </div>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: isVisible ? '100%' : '0%', background: 'linear-gradient(to bottom, #aaff00, transparent)', transition: 'height 0.8s ease 0.2s' }} />
                        </div>
                    );
                })}
            </div>

            {/* ── MOBILE CARDS ── */}
            <div
                className="portfolio-mobile"
                style={{
                    display: 'none', maxWidth: '600px',
                    margin: '0 auto', flexDirection: 'column', gap: '1.2rem',
                }}
            >
                {projects.map((project, i) => {
                    const isVisible = visibleMobile.has(i);
                    return (
                        <div
                            key={project.id}
                            ref={(el) => (mobileRowRefs.current[i] = el)}
                            style={{
                                background: 'rgba(22,22,31,0.9)',
                                border: '1px solid rgba(170,255,0,0.1)',
                                borderRadius: '1.5rem', padding: '1.5rem',
                                position: 'relative', overflow: 'hidden',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                <span style={{
                                    fontFamily: 'Outfit, sans-serif', fontSize: '0.68rem', color: '#aaff00',
                                    letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(170,255,0,0.08)',
                                    border: '1px solid rgba(170,255,0,0.15)', padding: '0.25rem 0.8rem', borderRadius: '100px',
                                    flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 'calc(100% - 60px)'
                                }}>
                                    {project.tag}
                                </span>
                                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: 'rgba(170,255,0,0.12)', lineHeight: 1 }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.6rem' }}>{project.title}</h3>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.88rem', color: '#9090a8', lineHeight: 1.7, marginBottom: '1.2rem' }}>{project.description}</p>
                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ flex: 1, fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#0a0a0f', background: '#aaff00', padding: '0.65rem 1rem', borderRadius: '100px', textDecoration: 'none', textAlign: 'center', boxShadow: '0 0 20px #aaff0044' }}>Live ↗</a>
                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                    style={{
                                        flex: 1, fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem',
                                        fontWeight: 500, color: '#aaff00', background: 'transparent',
                                        padding: '0.65rem 1rem', borderRadius: '100px',
                                        textDecoration: 'none', border: '1px solid rgba(170,255,0,0.3)',
                                        textAlign: 'center', transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#ffffff';
                                        e.currentTarget.style.borderColor = '#aaff00';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#aaff00';
                                        e.currentTarget.style.borderColor = 'rgba(170,255,0,0.3)';
                                    }}
                                >
                                    GitHub ↗
                                </a>
                            </div>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: isVisible ? '100%' : '0%', background: 'linear-gradient(to bottom, #aaff00, transparent)', transition: 'height 0.8s ease 0.2s' }} />
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            <div
                ref={ctaRef}
                style={{
                    textAlign: 'center', marginTop: '4rem',
                    opacity: ctaVisible ? 1 : 0,
                    transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.7s ease',
                }}
            >
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', color: '#9090a8', marginBottom: '1.5rem' }}>Want to see more or collaborate on something?</p>
                <a
                    href="#contact"
                    style={{
                        fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', fontWeight: 600,
                        color: '#aaff00', background: 'transparent', padding: '0.85rem 2.2rem',
                        borderRadius: '100px', textDecoration: 'none', border: '1px solid rgba(170,255,0,0.3)',
                        transition: 'all 0.3s ease', display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(170,255,0,0.08)';
                        e.currentTarget.style.borderColor = '#aaff00';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 0 30px #aaff0044';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(170,255,0,0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    Let&apos;s Build Something →
                </a>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .portfolio-desktop { display: none !important; }
                    .portfolio-mobile  { display: flex !important; }
                }
            `}</style>
        </section>
    );
}