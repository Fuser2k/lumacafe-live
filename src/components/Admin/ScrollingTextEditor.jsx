
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Type, Save } from 'lucide-react';

const ScrollingTextEditor = ({ token }) => {
    const [scrollingText, setScrollingText] = useState('');
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`);
                setScrollingText(res.data.scrollingText || '');
            } catch (error) {
                console.error("Failed to load content", error);
                setStatus('Failed to load current text.');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const handleSave = async () => {
        setStatus('Saving...');
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/content`, { scrollingText }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setStatus('Success! Text updated.');
            // Clear status after 3 seconds
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error("Save Error Details:", error);
            const msg = error.response?.data?.error || error.message || "Unknown error";
            setStatus(`Failed to save text: ${msg}`);
        }
    };

    return (
        <div style={{ padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginTop: '30px' }}>
            <h2 style={{ marginBottom: '20px', color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Type size={24} color="#3BB6D8" />
                Scrolling Header Text
            </h2>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold' }}>
                    Banner Text (Repeated)
                </label>
                <textarea
                    value={scrollingText}
                    onChange={(e) => setScrollingText(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        minHeight: '100px',
                        fontSize: '1rem',
                        fontFamily: 'monospace',
                        resize: 'vertical'
                    }}
                    placeholder="Enter the text to scroll in the header..."
                />
                <small style={{ color: '#888', display: 'block', marginTop: '5px' }}>
                    Tip: Use dots (•) or separators between phrases. The text will automatically repeat.
                </small>
            </div>

            {/* Preview Section */}
            <div style={{ marginBottom: '20px', padding: '15px', background: '#f1f1f1', borderRadius: '8px' }}>
                <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#555' }}>Preview:</h4>
                <div style={{
                    background: '#3BB6D8',
                    color: '#FFDE59',
                    padding: '10px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    fontWeight: 'bold',
                    borderRadius: '4px',
                    fontFamily: "'Oswald', sans-serif" // Match site font if possible
                }}>
                    {(scrollingText + " ").repeat(10)}
                </div>
            </div>

            <button
                onClick={handleSave}
                disabled={loading}
                style={{
                    padding: '12px 24px',
                    background: '#3BB6D8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'wait' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <Save size={18} /> Save Text
            </button>

            {status && (
                <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    borderRadius: '6px',
                    background: status.includes('Failed') ? '#fee2e2' : '#dcfce7',
                    color: status.includes('Failed') ? '#dc2626' : '#166534',
                    fontWeight: '500'
                }}>
                    {status}
                </div>
            )}
        </div>
    );
};

export default ScrollingTextEditor;
