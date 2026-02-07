import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hero.css';


const Hero = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`)
            .then(res => {
                if (res.data) setContent(res.data);
            })
            .catch(err => console.error("Failed to load hero content", err));
    }, []);

    return (
        <section className="hero-section">
            <div className="sun-graphic"></div>
            <div className="palm-overlay"></div>

            <div className="hero-content">
                <h2 className="brand-name">LUMA</h2>
                <h1 className="hero-title">{content.heroTitle || 'always summer'}</h1>
                <div className="hero-description">
                    <h3>{content.heroSubtitle || 'Kaffee, Pinsa und jede Menge Sommer.'}</h3>
                    <p>{content.heroDescription || 'Entdecken Sie ab sofort neben weiteren Köstlichkeiten auch entspannte Sommer-Vibes bei uns im Auhofcenter.'}</p>
                </div>
                <button
                    className="cta-button"
                    onClick={() => window.open(`${import.meta.env.VITE_API_URL || ''}/uploads/menu.pdf`, '_blank')}
                >
                    {content.heroButtonText || 'CHECK THE MENU'}
                </button>
            </div>



        </section>
    );
};

export default Hero;
