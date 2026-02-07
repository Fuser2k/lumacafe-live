import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutSection.css';

const AboutSection = () => {
    const [content, setContent] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`)
            .then(res => {
                if (res.data) setContent(res.data);
            })
            .catch(err => console.error("Failed to load about content", err));
    }, []);

    return (
        <section className="about-section">
            <div className="about-container">
                <div className="about-text">
                    <h2>{content.aboutTitle || 'Über uns – Luma Café'}</h2>
                    <p>{content.aboutText1 || 'Das Luma Café verbindet italienische Pinsa-Tradition mit moderner Cocktailkultur. Bei uns trifft leichter Genuss auf entspannte Atmosphäre.'}</p>
                    <p>{content.aboutText2 || 'Unsere Pinsa wird nach original römischem Rezept zubereitet – außen knusprig, innen luftig und besonders bekömmlich. Sorgfältig ausgewählte Zutaten und eine lange Teigführung sorgen für echten Geschmack und hohe Qualität.'}</p>
                    <p>{content.aboutText3 || 'Dazu servieren wir kreative Cocktails und klassische Aperitivo-Drinks, perfekt abgestimmt auf unsere Küche. Jeder Besuch im Luma ist eine kleine Auszeit – ob für einen entspannten Abend, ein Treffen mit Freunden oder einen Aperitivo nach dem Alltag.'}</p>
                    <p>{content.aboutText4 || 'Luma Café steht für Genuss, Qualität und das Gefühl von Sommer – das ganze Jahr über.'}</p>
                </div>
                <div className="about-image">
                    <img src="/assets/about-interior.png" alt="Luma Cafe Interior" />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
