import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = ({ onOpenMenu }) => {
    const navigate = useNavigate();
    const [scrollingText, setScrollingText] = useState('LUMA CAFE • AUHOF CENTER • ALWAYS SUMMER • ');
    const containerRef = useRef(null);
    const innerRef = useRef(null);
    const offsetRef = useRef(0);
    const rafRef = useRef(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`)
            .then(res => {
                if (res.data.scrollingText) {
                    setScrollingText(res.data.scrollingText);
                }
            })
            .catch(err => console.error("Failed to load header text", err));
    }, []);

    // Extract unique segment
    const raw = scrollingText.trim().replace(/[•\s]+$/, '');
    const parts = raw.split('•').map(s => s.trim()).filter(Boolean);
    const seen = new Set();
    const uniqueParts = [];
    for (const part of parts) {
        if (!seen.has(part)) {
            seen.add(part);
            uniqueParts.push(part);
        }
    }
    const baseText = uniqueParts.join(' • ') + ' • ';

    // JavaScript-driven marquee animation (bypasses mobile Safari GPU compositing limits)
    const animate = useCallback(() => {
        if (!innerRef.current) return;
        const speed = 1; // pixels per frame
        offsetRef.current -= speed;

        // Get the width of the first copy (half of total content)
        const totalWidth = innerRef.current.scrollWidth / 2;
        if (totalWidth > 0 && Math.abs(offsetRef.current) >= totalWidth) {
            offsetRef.current = 0;
        }

        innerRef.current.style.transform = `translateX(${offsetRef.current}px)`;
        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [animate]);

    return (
        <header className="site-header">
            <div className="scrolling-text-container" ref={containerRef} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <div className="scrolling-text" ref={innerRef}>
                    <span>{baseText}{baseText}{baseText}</span>
                    <span>{baseText}{baseText}{baseText}</span>
                </div>
            </div>
            <nav className="nav-actions">


            </nav>
        </header>
    );
};

export default Header;
