import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#333',
            color: '#fff',
            padding: '15px',
            textAlign: 'center',
            zIndex: 9999,
            fontSize: '0.9rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.2)'
        }}>
            <span>
                Wir verwenden Cookies, um Ihnen das beste Nutzererlebnis zu bieten. Durch die Nutzung unserer Seite stimmen Sie dem zu.
                <a href="/datenschutz" style={{ color: '#3BB6D8', marginLeft: '5px', textDecoration: 'underline' }}>Mehr erfahren</a>.
            </span>
            <button
                onClick={acceptCookies}
                style={{
                    backgroundColor: '#3BB6D8',
                    color: 'white',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Akzeptieren
            </button>
        </div>
    );
};

export default CookieBanner;
