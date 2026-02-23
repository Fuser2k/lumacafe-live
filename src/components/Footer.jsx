import React from 'react';
import { Instagram, MapPin, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const [content, setContent] = React.useState({});

    React.useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL || ''}/api/content`)
            .then(res => res.json())
            .then(data => setContent(data))
            .catch(err => console.error("Failed to load footer content", err));
    }, []);

    return (
        <footer className="site-footer">
            <div className="footer-logo">
                <h2>LUMA</h2>
            </div>
            <div className="footer-content">
                <div className="footer-section">
                    <p>Folge uns auf Instagram:</p>
                    <p>
                        <Instagram size={18} />
                        <strong>
                            <a href={content.contactInstagramLink || "https://www.instagram.com/luceamare.cafe/"} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                {content.contactInstagram || '@luceamare.cafe'}
                            </a>
                        </strong>
                    </p>
                </div>

                <div className="footer-section center">
                    <p><Mail size={18} /> {content.contactEmail || 'web@luma.cafe'}</p>
                    <p><Phone size={18} /> {content.contactPhone || '+43 2243 32240'}</p>
                    <p>{content.contactAddress || 'Strandbadstraße 16, 3400 Klosterneuburg, Österreich'}</p>
                </div>

                <div className="footer-section right">
                    <p className="prosecco-note">{content.footerNote || '*Gratis Prosecco einmal pro Frühstück, bis 11 Uhr.'}</p>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="legal-links">
                    <a href="/impressum" style={{ margin: '0 1rem' }}>Impressum</a>
                    <a href="/datenschutz" style={{ margin: '0 1rem' }}>Datenschutzerklärung</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
