import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

const Header = ({ onOpenMenu }) => {
    const navigate = useNavigate();
    const [scrollingText, setScrollingText] = useState('LUMA CAFE • AUHOF CENTER • ALWAYS SUMMER • ');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`)
            .then(res => {
                if (res.data.scrollingText) {
                    setScrollingText(res.data.scrollingText);
                }
            })
            .catch(err => console.error("Failed to load header text", err));
    }, []);

    // Extract only the unique segment (remove duplicate repeats from admin input)
    const raw = scrollingText.trim().replace(/[•\s]+$/, '');
    // Split by bullet separator and find unique items
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

    return (
        <header className="site-header">
            <div className="scrolling-text-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <div className="scrolling-text">
                    <span>{baseText}</span>
                    <span>{baseText}</span>
                </div>
            </div>
            <nav className="nav-actions">


            </nav>
        </header>
    );
};

export default Header;
