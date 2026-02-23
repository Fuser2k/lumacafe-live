import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Instagram, Facebook, MapPin, Phone } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
    const [content, setContent] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`)
            .then(res => {
                if (res.data) setContent(res.data);
            })
            .catch(err => console.error("Failed to load contact content", err));
    }, []);

    const formatAddress = (addr) => {
        if (!addr) return <>Strandbadstraße 16<br />3400 Klosterneuburg, Österreich</>;
        // Split by comma if convenient, or just display as is
        return addr;
    };

    return (
        <section className="contact-section">
            <div className="contact-container">
                <div className="contact-item">
                    <div className="icon-circle">
                        <MapPin size={24} color="var(--color-primary)" />
                    </div>
                    <h3>ADRESSE</h3>
                    <p>{content.contactAddress || 'Strandbadstraße 16, 3400 Klosterneuburg, Österreich'}</p>
                </div>

                <div className="contact-item">
                    <div className="icon-circle">
                        <Phone size={24} color="var(--color-primary)" />
                    </div>
                    <h3>TELEFON</h3>
                    <p><a href={`tel:${(content.contactPhone || '+43 2243 32240').replace(/\s+/g, '')}`}>{content.contactPhone || '+43 2243 32240'}</a></p>
                </div>

                <div className="contact-item">
                    <div className="icon-circle">
                        <Instagram size={24} color="var(--color-primary)" />
                    </div>
                    <h3>SOCIAL MEDIA</h3>
                    <div className="social-links">
                        <a href={content.contactInstagramLink || "https://www.instagram.com/luceamare.cafe/"} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            Instagram
                        </a>
                        <span className="separator">•</span>
                        <a href={content.contactTiktokLink || "https://www.tiktok.com/@luceamare.cafe"} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                            TikTok
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
