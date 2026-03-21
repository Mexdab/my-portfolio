'use client';

import { services } from '@/data/projects';
import { useState, useEffect, useRef } from 'react';

const techStack = [
    'Next.js', 'React', 'JavaScript', 'TypeScript',
    'Node.js', 'Python', 'Java', 'HTML5',
    'CSS3', 'Tailwind', 'MongoDB', 'Git',
];

export default function Services() {
    const [visibleCards, setVisibleCards] = useState(new Set());
    const [headerVisible, setHeaderVisible] = useState(false);
    const [marqueeVisible, setMarqueeVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    const cardRefs = useRef([]);
    const mobileCardRefs = useRef([]);
    const headerRef = useRef(null);
    const marqueeRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Header Animation
    useEffect(() => {
        if (!mounted || !headerRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => setHeaderVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        obs.observe(headerRef.current);
        return () => obs.disconnect();
    }, [mounted]);

    // Marquee Animation
    useEffect(() => {
        if (!mounted || !marqueeRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => setMarqueeVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );
        obs.observe(marqueeRef.current);
        return () => obs.disconnect();
    }, [mounted]);

    // Desktop Cards Stagger
    useEffect(() => {
        if (!mounted) return;
        const observers = cardRefs.current.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleCards((prev) => new Set([...prev, `d${i}`]));
                        }, i * 120);
                    } else {
                        setVisibleCards((prev) => {
                            const next = new Set(prev);
                            next.delete(`d${i}`);
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
    }, [mounted]);

    // Mobile Cards Stagger
    useEffect(() => {
        if (!mounted) return;
        const observers = mobileCardRefs.current.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleCards((prev) => new Set([...prev, `m${i}`]));
                        }, i * 120);
                    } else {
                        setVisibleCards((prev) => {
                            const next = new Set(prev);
                            next.delete(`m${i}`);
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
    }, [mounted]);

    if (!mounted) return (
        <section id="services" style={{ minHeight: '100vh', backgroundColor: '#0a0a0f' }} />
    );

    return (
        <section
            id="services"
            style={{
                minHeight: '100vh',
                padding: '7rem 5%',
                background: '#0a0a0f',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Glows */}
            <div style={{
                position: 'absolute', bottom: '10%', right: '-5%',
                width: '450px', height: '450px',
                background: 'radial-gradient(circle, rgba(170,255,0,0.05) 0%, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', top: '5%', left: '-5%',
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(170,255,0,0.03) 0%, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none',
            }} />

            {/* Header */}
            <div ref={headerRef}>
                <p style={{
                    textAlign: 'center', marginBottom: '1rem',
                    fontFamily: 'Outfit, sans-serif', color: '#aaff00',
                    letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.75rem',
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.6s ease',
                }}>
                    What I Do
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
                    My <span style={{ color: '#aaff00' }}>Services</span>
                </h2>

                <p style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '1rem',
                    color: '#9090a8', textAlign: 'center',
                    maxWidth: '480px', margin: '0 auto 5rem', lineHeight: 1.8,
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.6s ease 0.2s',
                }}>
                    Everything you need to launch, grow, and maintain a powerful online presence.
                </p>
            </div>

            {/* DESKTOP GRID */}
            <div
                className="services-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    maxWidth: '1100px',
                    margin: '0 auto 6rem',
                }}
            >
                {services.map((s, i) => {
                    const isVisible = visibleCards.has(`d${i}`);
                    return (
                        <div
                            key={s.id}
                            ref={(el) => (cardRefs.current[i] = el)}
                            style={{
                                background: 'rgba(22,22,31,0.8)',
                                border: '1px solid rgba(170,255,0,0.08)',
                                borderRadius: '1.8rem',
                                padding: '2.5rem 2rem',
                                position: 'relative',
                                overflow: 'hidden',
                                cursor: 'default',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(170,255,0,0.3)';
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 60px rgba(170,255,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(170,255,0,0.08)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '1rem',
                                background: 'rgba(170,255,0,0.08)',
                                border: '1px solid rgba(170,255,0,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.8rem', marginBottom: '1.5rem',
                            }}>
                                {s.icon}
                            </div>
                            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.8rem' }}>
                                {s.title}
                            </h3>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.92rem', color: '#9090a8', lineHeight: 1.8 }}>
                                {s.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* MOBILE VIEW */}
            <div className="services-mobile" style={{ display: 'none', marginBottom: '3rem' }}>
                {services.map((s, i) => {
                    const isVisible = visibleCards.has(`m${i}`);
                    return (
                        <div
                            key={s.id}
                            ref={(el) => (mobileCardRefs.current[i] = el)}
                            style={{
                                background: 'rgba(22,22,31,0.9)',
                                border: '1px solid rgba(170,255,0,0.12)',
                                borderRadius: '1.5rem',
                                padding: '1.8rem',
                                marginBottom: '1rem',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0)' : (i % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)'),
                                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ fontSize: '1.5rem', color: '#aaff00' }}>{s.icon}</div>
                                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#f0f0f0' }}>{s.title}</h3>
                            </div>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', color: '#9090a8', lineHeight: 1.7 }}>{s.description}</p>
                        </div>
                    );
                })}
                <a
                    href="#contact"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '0.5rem', fontFamily: 'Outfit, sans-serif', fontSize: '1rem',
                        fontWeight: 600, color: '#0a0a0f', background: '#aaff00',
                        padding: '1rem 2rem', borderRadius: '100px', textDecoration: 'none',
                        marginTop: '1.5rem', width: '100%', transition: 'all 0.3s ease',
                    }}
                >
                    Hire Me &rarr;
                </a>
            </div>

            {/* Tech Stack Marquee */}
            <div ref={marqueeRef} style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <p style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem',
                    color: '#9090a8', letterSpacing: '0.3em',
                    textTransform: 'uppercase', textAlign: 'center',
                    marginBottom: '2rem',
                    opacity: marqueeVisible ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                }}>
                    Technologies I Work With
                </p>

                <div style={{
                    overflow: 'hidden', position: 'relative',
                    maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
                    opacity: marqueeVisible ? 1 : 0,
                    transform: marqueeVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.8s ease 0.2s',
                }}>
                    <div style={{ display: 'flex', gap: '1.5rem', animation: 'marquee 25s linear infinite', width: 'max-content' }}>
                        {[...techStack, ...techStack].map((tech, i) => (
                            <span key={i} style={{
                                fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                                color: '#aaff00', background: 'rgba(170,255,0,0.04)',
                                border: '1px solid rgba(170,255,0,0.2)',
                                borderRadius: '100px', padding: '0.5rem 1.2rem',
                                whiteSpace: 'nowrap', letterSpacing: '0.05em',
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @media (max-width: 768px) {
                    .services-grid { display: none !important; }
                    .services-mobile { display: block !important; }
                }
                @media (min-width: 769px) and (max-width: 1024px) {
                    .services-grid { grid-template-columns: 1fr 1fr !important; }
                }
            `}</style>
        </section>
    );
}