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

    // Ensure text always ends with a separator
    const baseText = scrollingText.trim().replace(/[•\s]+$/, '') + ' • ';

    return (
        <header className="site-header">
            <div className="scrolling-text-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <div className="scrolling-text">
                    <span>{baseText}</span>
                    <span>{baseText}</span>
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
