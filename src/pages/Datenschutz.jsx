import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Datenschutz = () => {
    const [content, setContent] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`)
            .then(res => {
                if (res.data) setContent(res.data);
            })
            .catch(err => console.error("Failed to load content for Datenschutz", err));
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
            {content.datenschutzText ? (
                <div dangerouslySetInnerHTML={{ __html: content.datenschutzText }} />
            ) : (
                <p>Loading Datenschutzerklärung...</p>
            )}
        </div>
    );
};

export default Datenschutz;
