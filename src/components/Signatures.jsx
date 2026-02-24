import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signatures.css';

const Signatures = () => {
    const [content, setContent] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`)
            .then(res => {
                if (res.data) setContent(res.data);
            })
            .catch(err => console.error("Failed to load signatures content", err));
    }, []);

    return (
        <section className="signatures-section">
            <div className="signatures-container">
                {/* Cocktails Column */}
                <div className="signature-category">
                    <h3 className="category-title">{content.cocktailsTitle || 'SIGNATURE COCKTAILS'}</h3>
                    <div className="signature-grid">
                        <div className="signature-card">
                            <div className="card-image-wrapper">
                                <img src={content.cocktail1Image || "/assets/tropical_cocktail.png"} alt="Sunset Lover" />
                            </div>
                            <div className="card-details">
                                <h4>{content.cocktail1Title || 'Sunset Lover'}</h4>
                                <p>{content.cocktail1Desc || 'Gin, Aperol, Limette, Minze'}</p>
                            </div>
                        </div>
                        <div className="signature-card">
                            <div className="card-image-wrapper">
                                <img src={content.cocktail2Image || "/assets/green_smoothie.png"} alt="Green Detox" />
                            </div>
                            <div className="card-details">
                                <h4>{content.cocktail2Title || 'Green Detox'}</h4>
                                <p>{content.cocktail2Desc || 'Spinat, Apfel, Kiwi, Minze'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="signature-divider"></div>

                {/* Foods Column */}
                <div className="signature-category">
                    <h3 className="category-title">{content.dishesTitle || 'SIGNATURE GERICHTE'}</h3>
                    <div className="signature-grid">
                        <div className="signature-card">
                            <div className="card-image-wrapper">
                                <img src={content.dish1Image || "/assets/gourmet_pinsa.png"} alt="Gourmet Pinsa" />
                            </div>
                            <div className="card-details">
                                <h4>{content.dish1Title || 'Gourmet Pinsa'}</h4>
                                <p>{content.dish1Desc || 'Prosciutto, Rucola, Kirschtomaten'}</p>
                            </div>
                        </div>
                        <div className="signature-card">
                            <div className="card-image-wrapper">
                                <img src={content.dish2Image || "/assets/tropical_salad.png"} alt="Summer Bowl" />
                            </div>
                            <div className="card-details">
                                <h4>{content.dish2Title || 'Summer Bowl'}</h4>
                                <p>{content.dish2Desc || 'Mango, Avocado, Garnelen, Limette'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="deco-element deco-island">
                <img src="/assets/palm_island_sketch.png" alt="" />
            </div>
            <div className="deco-element deco-pizza">
                <img src="/assets/pizza_sketch.png" alt="" />
            </div>
            <div className="deco-element deco-cocktail">
                <img src="/assets/cocktail_sketch.png" alt="" />
            </div>
        </section>
    );
};

export default Signatures;
