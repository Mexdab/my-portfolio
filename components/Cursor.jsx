'use client';

import { useEffect } from 'react';

export default function Cursor() {
    useEffect(() => {
        // ✅ Don't run on touch/mobile devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let rafId;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update dot position immediately for responsiveness
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
            dot.style.opacity = '1';
            ring.style.opacity = '0.6';
        };

        const animate = () => {
            // Smooth easing for the ring
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';

            // ✅ FIX: Pass the 'animate' function to loop, not the rafId
            rafId = requestAnimationFrame(animate);
        };

        // Start the loop
        rafId = requestAnimationFrame(animate);
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // Handle Hover States
        const interactives = document.querySelectorAll('a, button');

        const handleMouseEnter = () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1.8)';
            ring.style.opacity = '1';
            ring.style.borderColor = '#aaff00';
        };

        const handleMouseLeave = () => {
            ring.style.transform = 'translate(-50%, -50%) scale(1)';
            ring.style.opacity = '0.6';
            ring.style.borderColor = ''; // Resets to CSS default
        };

        interactives.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return null;
}