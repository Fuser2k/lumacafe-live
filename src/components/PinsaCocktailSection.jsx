import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PinsaCocktailSection.css';

const PinsaCocktailSection = () => {
    const [content, setContent] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`)
            .then(res => {
                if (res.data) setContent(res.data);
            })
            .catch(err => console.error("Failed to load pinsa content", err));
    }, []);

    return (
        <section className="pinsa-cocktail-section">
            <div className="deco-element deco-left"></div>
            <div className="deco-element deco-right"></div>

            <div className="pinsa-cocktail-container">
                <div className="section-header-styled">
                    <h2>{content.pinsaCocktailTitle || 'Wo Pinsa auf Cocktails trifft'}</h2>
                    <p>{content.pinsaCocktailDescription || 'Erleben Sie die perfekte Harmonie aus knuspriger, luftiger Pinsa und unseren handgemixten Signature Cocktails. Ein Genuss für alle Sinne.'}</p>
                </div>

                <div className="visual-showcase">
                    <div className="image-card card-small">
                        <img src={content.pinsaImage || "/assets/pinsa.png"} alt="Gourmet Pinsa" />
                        <div className="image-caption">
                            <h3>{content.pinsaCaption || 'Handgemachte Pinsa'}</h3>
                        </div>
                    </div>

                    <div className="image-card card-large">
                        <img src={content.comboImage || "/assets/pinsa_cocktail_combo.png"} alt="Pinsa & Cocktail" />
                        <div className="image-caption">
                            <h3>{content.comboCaption || 'Das perfekte Duo'}</h3>
                        </div>
                    </div>

                    <div className="image-card card-small">
                        <img src={content.cocktailImage || "/assets/cocktail.png"} alt="Tropical Cocktail" />
                        <div className="image-caption">
                            <h3>{content.cocktailCaption || 'Signature Cocktails'}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PinsaCocktailSection;
