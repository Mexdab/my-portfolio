'use client';

import { useState, useEffect, useRef } from 'react';

const contactLinks = [
    {
        label: 'Email',
        value: 'janarthansk@gmail.com',
        href: 'https://mail.google.com/mail/?view=cm&to=janarthansk@gmail.com',
        icon: '✉',
    },
    {
        label: 'LinkedIn',
        value: 'linkedin.com/in/janarthan-s-k',
        href: 'https://www.linkedin.com/in/janarthan-s-k-4838ab283',
        icon: '↗',
    },
    {
        label: 'GitHub',
        value: 'github.com/Mexdab',
        href: 'https://github.com/Mexdab',
        icon: '↗',
    },
];

const mobileSocialIcons = [
    {
        label: 'GitHub',
        href: 'https://github.com/Mexdab',
        icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/janarthan-s-k-4838ab283',
        icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/janarthansk/?hl=en',
        icon: (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
        ),
    },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [focused, setFocused] = useState(null);

    const [headerVisible, setHeaderVisible] = useState(false);
    const [leftVisible, setLeftVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [socialsVisible, setSocialsVisible] = useState(false);
    const [visibleLinks, setVisibleLinks] = useState(new Set());

    const headerRef = useRef(null);
    const leftRef = useRef(null);
    const formRef = useRef(null);
    const socialsRef = useRef(null);
    const linkRefs = useRef([]);

    useEffect(() => {
        const headerObs = new IntersectionObserver(([e]) => setHeaderVisible(e.isIntersecting), { threshold: 0.3 });
        if (headerRef.current) headerObs.observe(headerRef.current);

        const leftObs = new IntersectionObserver(([e]) => setLeftVisible(e.isIntersecting), { threshold: 0.2 });
        if (leftRef.current) leftObs.observe(leftRef.current);

        const formObs = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.2 });
        if (formRef.current) formObs.observe(formRef.current);

        const socialsObs = new IntersectionObserver(([e]) => setSocialsVisible(e.isIntersecting), { threshold: 0.3 });
        if (socialsRef.current) socialsObs.observe(socialsRef.current);

        return () => {
            headerObs.disconnect();
            leftObs.disconnect();
            formObs.disconnect();
            socialsObs.disconnect();
        };
    }, []);

    useEffect(() => {
        const currentRefs = linkRefs.current;
        const observers = currentRefs.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) {
                    setTimeout(() => setVisibleLinks((prev) => new Set([...prev, i])), i * 120);
                } else {
                    setVisibleLinks((prev) => {
                        const next = new Set(prev);
                        next.delete(i);
                        return next;
                    });
                }
            }, { threshold: 0.1 });
            obs.observe(ref);
            return obs;
        });
        return () => observers.forEach((o) => o?.disconnect());
    }, []);

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 4000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 4000);
            }
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const inputStyle = (field) => ({
        width: '100%',
        padding: '1rem 1.2rem',
        background: focused === field ? 'rgba(170,255,0,0.04)' : 'rgba(22,22,31,0.8)',
        border: `1px solid ${focused === field ? 'rgba(170,255,0,0.35)' : 'rgba(170,255,0,0.08)'}`,
        borderRadius: '0.9rem',
        fontFamily: 'Outfit, sans-serif',
        fontSize: '0.95rem',
        color: '#f0f0f0',
        outline: 'none',
        transition: 'all 0.3s ease',
        resize: 'none',
    });

    return (
        <section id="contact" style={{ minHeight: '100vh', padding: '7rem 5%', background: '#0a0a0f', position: 'relative', overflow: 'hidden' }}>
            {/* Background Glow */}
            <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(170,255,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div ref={headerRef}>
                <p style={{ textAlign: 'center', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif', color: '#aaff00', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.6s ease' }}>Get In Touch</p>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, textAlign: 'center', color: '#f0f0f0', letterSpacing: '-0.03em', marginBottom: '1rem', opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.6s ease 0.1s' }}>Contact <span style={{ color: '#aaff00' }}>Me</span></h2>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', color: '#9090a8', textAlign: 'center', maxWidth: '480px', margin: '0 auto 5rem', lineHeight: 1.8, opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.6s ease 0.2s' }}>Have a project in mind or just want to say hello? My inbox is always open — I&apos;ll get back to you fast.</p>
            </div>

            <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3rem', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* Left Side Info */}
                <div ref={leftRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', opacity: leftVisible ? 1 : 0, transform: leftVisible ? 'translateX(0)' : 'translateX(-40px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                    <div style={{ background: 'rgba(170,255,0,0.04)', border: '1px solid rgba(170,255,0,0.15)', borderRadius: '1.5rem', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                            <span style={{ width: '8px', height: '8px', background: '#aaff00', borderRadius: '50%', boxShadow: '0 0 10px #aaff00', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem', color: '#aaff00', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>Available Now</span>
                        </div>
                        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#f0f0f0', lineHeight: 1.4 }}>Open to freelance & full-time opportunities</p>
                    </div>

                    {contactLinks.map((c, i) => (
                        <a
                            key={c.label}
                            ref={(el) => (linkRefs.current[i] = el)}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                background: 'rgba(22,22,31,0.8)', border: '1px solid rgba(170,255,0,0.08)',
                                borderRadius: '1.2rem', padding: '1.2rem 1.5rem', textDecoration: 'none',
                                gap: '1rem', opacity: visibleLinks.has(i) ? 1 : 0,
                                transform: visibleLinks.has(i) ? 'translateX(0)' : 'translateX(-30px)',
                                transition: 'opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(170,255,0,0.3)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(170,255,0,0.08)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                        >
                            <div>
                                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', color: '#9090a8', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.label}</p>
                                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', color: '#f0f0f0', fontWeight: 500 }}>{c.value}</p>
                            </div>
                            <span style={{ color: '#aaff00', fontSize: '1.2rem' }}>{c.icon}</span>
                        </a>
                    ))}
                </div>

                {/* Mobile Section Header */}
                <div className="mobile-form-header" style={{ display: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0 1.5rem' }}>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(170,255,0,0.4))' }} />
                        <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#aaff00', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>✉ Message Me</span>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(170,255,0,0.4))' }} />
                    </div>
                </div>

                {/* Form Section */}
                <div ref={formRef} style={{ background: 'rgba(22,22,31,0.8)', border: '1px solid rgba(170,255,0,0.08)', borderRadius: '2rem', padding: '2.5rem', opacity: formVisible ? 1 : 0, transform: formVisible ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem', color: '#9090a8', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Name</label>
                                <input suppressHydrationWarning type="text" name="name" value={form.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} placeholder="Your name" style={inputStyle('name')} required />
                            </div>
                            <div>
                                <label style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem', color: '#9090a8', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
                                <input suppressHydrationWarning type="email" name="email" value={form.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} placeholder="your@email.com" style={inputStyle('email')} required />
                            </div>
                        </div>
                        <div>
                            <label style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem', color: '#9090a8', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Subject</label>
                            <input suppressHydrationWarning type="text" name="subject" value={form.subject} onChange={handleChange} onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} placeholder="What's this about?" style={inputStyle('subject')} />
                        </div>
                        <div>
                            <label style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem', color: '#9090a8', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Message</label>
                            <textarea suppressHydrationWarning name="message" value={form.message} onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} placeholder="Tell me about your project..." rows={6} style={inputStyle('message')} required />
                        </div>
                        <button
                            suppressHydrationWarning
                            type="submit"
                            disabled={status === 'sending'}
                            style={{
                                width: '100%', padding: '1rem', borderRadius: '0.9rem',
                                background: status === 'success' ? 'rgba(170,255,0,0.15)' : status === 'error' ? 'rgba(255,80,80,0.15)' : '#aaff00',
                                border: status === 'success' ? '1px solid rgba(170,255,0,0.4)' : status === 'error' ? '1px solid rgba(255,80,80,0.4)' : 'none',
                                fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700,
                                color: status === 'success' ? '#aaff00' : status === 'error' ? '#ff6060' : '#0a0a0f',
                                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease', letterSpacing: '0.05em',
                                boxShadow: status === 'idle' ? '0 0 30px #aaff0044' : 'none',
                                opacity: status === 'sending' ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => { if (status === 'idle') { e.currentTarget.style.boxShadow = '0 0 50px #aaff0088'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                            onMouseLeave={(e) => { if (status === 'idle') { e.currentTarget.style.boxShadow = '0 0 30px #aaff0044'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                        >
                            {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : status === 'error' ? '✗ Something went wrong' : 'Send Message →'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Mobile Social Bar */}
            <div ref={socialsRef} className="mobile-socials-bar" style={{ display: 'none', marginTop: '2.5rem', opacity: socialsVisible ? 1 : 0, transform: socialsVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.6s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(170,255,0,0.3))' }} />
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#9090a8', whiteSpace: 'nowrap', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Find Me On</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(170,255,0,0.3))' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem' }}>
                    {mobileSocialIcons.map((s, i) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={s.label}
                            style={{
                                width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#f0f0f0', background: 'rgba(170,255,0,0.08)', border: '1px solid rgba(170,255,0,0.5)',
                                borderRadius: '0.8rem', textDecoration: 'none', transition: 'all 0.3s ease',
                                opacity: socialsVisible ? 1 : 0,
                                transform: socialsVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                                transitionDelay: `${i * 0.1}s`
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#0a0a0f';
                                e.currentTarget.style.background = '#aaff00';
                                e.currentTarget.style.borderColor = '#aaff00';
                                e.currentTarget.style.boxShadow = '0 0 20px #aaff0066';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#f0f0f0';
                                e.currentTarget.style.background = 'rgba(170,255,0,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(170,255,0,0.5)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 6px #aaff00; }
                    50% { box-shadow: 0 0 16px #aaff00, 0 0 30px #aaff0066; }
                }
                @media (max-width: 768px) {
                    .contact-grid { grid-template-columns: 1fr !important; }
                    .form-row { grid-template-columns: 1fr !important; }
                    .mobile-form-header { display: block !important; }
                    .mobile-socials-bar { display: block !important; }
                }
            `}</style>
        </section>
    );
}