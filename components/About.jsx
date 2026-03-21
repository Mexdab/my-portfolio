'use client';

import { skills, stats } from '@/data/projects';
import { useState, useEffect, useRef } from 'react';

export default function About() {
    const [barsVisible, setBarsVisible] = useState(false);
    const [counters, setCounters] = useState({});
    const [activeSkill, setActiveSkill] = useState(null);
    const [visibleItems, setVisibleItems] = useState(new Set());
    const [sectionVisible, setSectionVisible] = useState(false);

    // Desktop animation states
    const [headerVisible, setHeaderVisible] = useState(false);
    const [leftVisible, setLeftVisible] = useState(false);
    const [rightVisible, setRightVisible] = useState(false);
    const [desktopStatsVisible, setDesktopStatsVisible] = useState(new Set());
    const [desktopSkillsVisible, setDesktopSkillsVisible] = useState(new Set());

    const sectionRef = useRef(null);
    const skillRefs = useRef([]);
    const statRefs = useRef([]);
    const headerRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const desktopStatRefs = useRef([]);
    const desktopSkillRefs = useRef([]);

    // Section — mobile triggers and Counter Logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSectionVisible(true);
                    setBarsVisible(true);
                    stats.forEach((s) => {
                        const num = parseInt(s.value);
                        if (!isNaN(num)) {
                            let start = 0;
                            const step = Math.ceil(num / 40);
                            const interval = setInterval(() => {
                                start += step;
                                if (start >= num) {
                                    start = num;
                                    clearInterval(interval);
                                }
                                setCounters((prev) => ({ ...prev, [s.label]: start }));
                            }, 30);
                        }
                    });
                } else {
                    setSectionVisible(false);
                    setBarsVisible(false);
                    setCounters({});
                    setVisibleItems(new Set());
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Desktop header observer
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => setHeaderVisible(e.isIntersecting), { threshold: 0.3 }
        );
        if (headerRef.current) obs.observe(headerRef.current);
        return () => obs.disconnect();
    }, []);

    // Desktop left column observer
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => setLeftVisible(e.isIntersecting), { threshold: 0.15 }
        );
        if (leftRef.current) obs.observe(leftRef.current);
        return () => obs.disconnect();
    }, []);

    // Desktop right column observer
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => setRightVisible(e.isIntersecting), { threshold: 0.15 }
        );
        if (rightRef.current) obs.observe(rightRef.current);
        return () => obs.disconnect();
    }, []);

    // Desktop stats stagger
    useEffect(() => {
        const currentStatRefs = desktopStatRefs.current;
        const observers = currentStatRefs.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setDesktopStatsVisible((prev) => new Set([...prev, i]));
                        }, i * 100);
                    } else {
                        setDesktopStatsVisible((prev) => {
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
    }, []);

    // Desktop skills stagger
    useEffect(() => {
        const currentSkillRefs = desktopSkillRefs.current;
        const observers = currentSkillRefs.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setDesktopSkillsVisible((prev) => new Set([...prev, i]));
                        }, i * 80);
                    } else {
                        setDesktopSkillsVisible((prev) => {
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
    }, []);

    // Mobile skill cards
    useEffect(() => {
        const currentRefs = skillRefs.current;
        const observers = currentRefs.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleItems((prev) => new Set([...prev, `skill-${i}`]));
                        }, i * 80);
                    } else {
                        setVisibleItems((prev) => {
                            const next = new Set(prev);
                            next.delete(`skill-${i}`);
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
    }, []);

    // Mobile stat cards
    useEffect(() => {
        const currentRefs = statRefs.current;
        const observers = currentRefs.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setVisibleItems((prev) => new Set([...prev, `stat-${i}`]));
                        }, i * 100);
                    } else {
                        setVisibleItems((prev) => {
                            const next = new Set(prev);
                            next.delete(`stat-${i}`);
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
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{
                minHeight: '100vh',
                padding: '7rem 5%',
                background: '#111118',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Accents */}
            <div style={{
                position: 'absolute', top: '10%', left: '-10%',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(170,255,0,0.05) 0%, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '5%', right: '-10%',
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(170,255,0,0.04) 0%, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none',
            }} />

            {/* Header */}
            <div ref={headerRef}>
                <p style={{
                    textAlign: 'center', marginBottom: '1rem',
                    fontFamily: 'Outfit, sans-serif', color: '#aaff00',
                    letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem',
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.6s ease',
                }}>
                    Who I Am
                </p>
                <h2 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 800, textAlign: 'center', color: '#f0f0f0',
                    letterSpacing: '-0.03em', marginBottom: '5rem',
                    opacity: headerVisible ? 1 : 0,
                    transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
                    transition: 'all 0.6s ease 0.1s',
                }}>
                    About <span style={{ color: '#aaff00' }}>Me</span>
                </h2>
            </div>

            {/* ── DESKTOP GRID ── */}
            <div
                className="about-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center',
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}
            >
                {/* Left Column */}
                <div
                    ref={leftRef}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        opacity: leftVisible ? 1 : 0,
                        transform: leftVisible ? 'translateX(0)' : 'translateX(-50px)',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                >
                    <div style={{
                        position: 'relative', borderRadius: '2rem',
                        background: 'rgba(22,22,31,0.8)',
                        border: '1px solid rgba(170,255,0,0.1)',
                        padding: '3rem 2rem', textAlign: 'center', isolation: 'isolate',
                    }}>
                        <div style={{
                            width: '140px', height: '140px', borderRadius: '50%',
                            overflow: 'hidden', boxShadow: '0 0 50px rgba(170,255,0,0.25)',
                            border: '3px solid #aaff00', margin: '0 auto 1.5rem',
                            isolation: 'isolate', transform: 'translateZ(0)',
                        }}>
                            <img src="/profile.png" alt="Janarthan" width={140} height={140}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#f0f0f0' }}>
                            Janarthan S K
                        </p>
                        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', color: '#9090a8', marginTop: '0.3rem' }}>
                            Full-Stack Developer · India
                        </p>
                        <div style={{
                            position: 'absolute', top: 0, right: 0,
                            width: '80px', height: '80px',
                            background: 'rgba(170,255,0,0.05)',
                            borderRadius: '0 2rem 0 100%',
                        }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {stats.map((s, i) => {
                            const num = parseInt(s.value);
                            const display = !isNaN(num)
                                ? (counters[s.label] ?? 0) + (s.value.includes('+') ? '+' : '')
                                : s.value;
                            const isVisible = desktopStatsVisible.has(i);
                            return (
                                <div
                                    key={s.label}
                                    ref={(el) => (desktopStatRefs.current[i] = el)}
                                    style={{
                                        background: 'rgba(22,22,31,0.8)',
                                        border: '1px solid rgba(170,255,0,0.08)',
                                        borderRadius: '1.2rem', padding: '1.5rem',
                                        textAlign: 'center', transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(170,255,0,0.3)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(170,255,0,0.08)')}
                                >
                                    <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, color: '#aaff00', lineHeight: 1 }}>
                                        {display}
                                    </p>
                                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.8rem', color: '#9090a8', marginTop: '0.4rem' }}>
                                        {s.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Column */}
                <div
                    ref={rightRef}
                    style={{
                        display: 'flex', flexDirection: 'column', gap: '2rem',
                        opacity: rightVisible ? 1 : 0,
                        transform: rightVisible ? 'translateX(0)' : 'translateX(50px)',
                        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                    }}
                >
                    <div>
                        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 700, color: '#f0f0f0', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            I design and build full-stack web applications.
                        </h3>
                        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', color: '#9090a8', lineHeight: 1.9, marginBottom: '1rem' }}>
                            I&apos;m a full-stack developer focused on building scalable,
                            user-focused applications with clean and efficient solutions.
                            I work across both frontend and backend, creating systems that
                            combine strong logic and structured data handling.
                        </p>
                    </div>

                    <div>
                        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '1.2rem' }}>
                            Technical Skills
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {skills.map((skill, i) => {
                                const isVisible = desktopSkillsVisible.has(i);
                                return (
                                    <div
                                        key={skill.name}
                                        ref={(el) => (desktopSkillRefs.current[i] = el)}
                                        style={{
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                                            transition: `opacity 0.4s ease, transform 0.4s ease`,
                                            transitionDelay: `${i * 0.06}s`,
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.88rem', color: '#f0f0f0', fontWeight: 500 }}>{skill.name}</span>
                                            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.82rem', color: '#aaff00', fontWeight: 600 }}>{skill.level}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%',
                                                width: barsVisible ? `${skill.level}%` : '0%',
                                                background: 'linear-gradient(90deg, #aaff00, #7acc00)',
                                                borderRadius: '100px',
                                                boxShadow: '0 0 10px rgba(170,255,0,0.5)',
                                                transition: 'width 1.5s ease',
                                            }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <a
                        href="#contact"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', fontWeight: 600,
                            color: '#0a0a0f', background: '#aaff00', padding: '0.85rem 2rem',
                            borderRadius: '100px', textDecoration: 'none',
                            boxShadow: '0 0 30px #aaff0044', transition: 'all 0.3s ease',
                            alignSelf: 'flex-start',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 50px #aaff0088';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 30px #aaff0044';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Let&apos;s Work Together &rarr;
                    </a>
                </div>
            </div>

            {/* ── MOBILE LAYOUT ── */}
            <div className="mobile-about" style={{ display: 'none' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #16161f, #1a1a28)',
                    border: '1px solid rgba(170,255,0,0.2)',
                    borderRadius: '2rem', padding: '2rem',
                    textAlign: 'center', position: 'relative',
                    overflow: 'hidden', marginBottom: '1.5rem',
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}>
                    <div style={{
                        width: '110px', height: '110px', borderRadius: '50%',
                        overflow: 'hidden', border: '3px solid #aaff00', margin: '0 auto 1rem',
                        boxShadow: sectionVisible ? '0 0 40px rgba(170,255,0,0.4)' : '0 0 0px rgba(170,255,0,0)',
                        isolation: 'isolate', transform: 'translateZ(0)', position: 'relative',
                        transition: 'box-shadow 1s ease 0.3s',
                    }}>
                        <img src="/profile.png" alt="Janarthan" width={110} height={110}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#f0f0f0' }}>Janarthan S K</p>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', color: '#9090a8', marginTop: '0.3rem', marginBottom: '1rem' }}>Full-Stack Developer</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(170,255,0,0.08)', border: '1px solid rgba(170,255,0,0.2)', borderRadius: '100px', padding: '0.4rem 1rem' }}>
                        <span style={{ width: '6px', height: '6px', background: '#aaff00', borderRadius: '50%', boxShadow: '0 0 8px #aaff00', animation: 'pulseGlow 2s ease-in-out infinite', display: 'inline-block' }} />
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', color: '#aaff00', fontWeight: 500 }}>Open for work</span>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(22,22,31,0.8)', border: '1px solid rgba(170,255,0,0.08)',
                    borderRadius: '1.5rem', padding: '1.5rem', marginBottom: '1.5rem',
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? 'translateX(0)' : 'translateX(40px)',
                    transition: 'all 0.7s ease 0.2s',
                }}>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.8rem' }}>
                        I design and build full-stack web applications.
                    </h3>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.92rem', color: '#9090a8', lineHeight: 1.9 }}>
                        I&apos;m a full-stack developer focused on building scalable, user-focused applications. I work across both frontend and backend, creating systems that combine strong logic and structured data handling.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
                    {stats.map((s, i) => {
                        const num = parseInt(s.value);
                        const display = !isNaN(num) ? (counters[s.label] ?? 0) + (s.value.includes('+') ? '+' : '') : s.value;
                        const isVisible = visibleItems.has(`stat-${i}`);
                        return (
                            <div key={s.label} ref={(el) => (statRefs.current[i] = el)} style={{
                                background: 'rgba(22,22,31,0.9)', border: '1px solid rgba(170,255,0,0.12)',
                                borderRadius: '1.2rem', padding: '1.2rem', textAlign: 'center',
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}>
                                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#aaff00', lineHeight: 1 }}>{display}</p>
                                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', color: '#9090a8', marginTop: '0.4rem' }}>{s.label}</p>
                            </div>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                    {skills.map((skill, i) => {
                        const isActive = activeSkill === skill.name;
                        const isVisible = visibleItems.has(`skill-${i}`);
                        return (
                            <div key={skill.name} ref={(el) => (skillRefs.current[i] = el)}
                                onClick={() => setActiveSkill(isActive ? null : skill.name)}
                                style={{
                                    background: isActive ? 'rgba(170,255,0,0.08)' : 'rgba(22,22,31,0.9)',
                                    border: `1px solid ${isActive ? 'rgba(170,255,0,0.4)' : 'rgba(170,255,0,0.1)'}`,
                                    borderRadius: '1rem', padding: '1rem 1.2rem',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
                                    transition: 'all 0.4s ease',
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', color: '#f0f0f0', fontWeight: 600 }}>{skill.name}</span>
                                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#aaff00', fontSize: '0.78rem' }}>{skill.level}%</span>
                                </div>
                                <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%', width: barsVisible ? `${skill.level}%` : '0%',
                                        background: isActive ? 'linear-gradient(90deg, #aaff00, #ffffff)' : 'linear-gradient(90deg, #aaff00, #7acc00)',
                                        borderRadius: '100px', transition: 'width 1.5s ease',
                                    }} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <a href="#contact" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 600,
                    color: '#0a0a0f', background: '#aaff00', padding: '1rem 2rem',
                    borderRadius: '100px', textDecoration: 'none', width: '100%',
                    boxShadow: '0 0 30px #aaff0055',
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.3s ease 0.3s',
                }}>
                    Let&apos;s Work Together &rarr;
                </a>
            </div>

            <style>{`
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 6px #aaff00; }
                    50% { box-shadow: 0 0 16px #aaff00, 0 0 30px #aaff0066; }
                }
                @media (max-width: 768px) {
                    .about-grid   { display: none !important; }
                    .mobile-about { display: block !important; }
                }
            `}</style>
        </section>
    );
}