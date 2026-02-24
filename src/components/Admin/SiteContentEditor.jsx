
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { defaultImpressum, defaultDatenschutz } from './defaultLegalContent';
import RichTextEditor from './RichTextEditor';
import { Type, Save, Layout, FileText, AlignLeft, Coffee, Scale } from 'lucide-react';
import ImageUploader from './ImageUploader';

const InputField = ({ label, value, onChange, type = 'text', help, maxLength }) => (
    <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold', fontSize: '0.9rem' }}>
            {label}
        </label>
        {help && <small style={{ display: 'block', color: '#888', marginBottom: '8px' }}>{help}</small>}

        {type === 'richtext' ? (
            <RichTextEditor value={value} onChange={onChange} />
        ) : type === 'textarea' ? (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength || 1000}
                style={{
                    width: '100%', padding: '10px', borderRadius: '6px',
                    border: '1px solid #ddd', minHeight: '80px', fontFamily: 'inherit'
                }}
            />
        ) : (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength || 255}
                style={{
                    width: '100%', padding: '10px', borderRadius: '6px',
                    border: '1px solid #ddd'
                }}
            />
        )}
    </div>
);

const SiteContentEditor = ({ token }) => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [activeTab, setActiveTab] = useState('hero');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/content`);
                // Ensure legal texts have defaults if missing
                const data = res.data || {};
                if (!data.impressumText) data.impressumText = defaultImpressum;
                if (!data.datenschutzText) data.datenschutzText = defaultDatenschutz;
                setContent(data);
            } catch (error) {
                console.error("Failed to load content", error);
                setStatus('Failed to load current content.');
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const handleChange = (key, value) => {
        setContent(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setStatus('Saving...');
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/content`, content, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setStatus('Success! Content updated.');
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error("Save Error:", error);
            const msg = error.response?.data?.error || error.message || "Unknown error";
            setStatus(`Failed to save: ${msg}`);
        }
    };

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: <Layout size={18} /> },
        { id: 'signatures', label: 'Signatures', icon: <Coffee size={18} /> },
        { id: 'pinsa', label: 'Pinsa & Cocktails', icon: <AlignLeft size={18} /> },
        { id: 'about', label: 'About Us', icon: <FileText size={18} /> },
        { id: 'legal', label: 'Legal Pages', icon: <Scale size={18} /> },
        { id: 'contact', label: 'Contact & Footer', icon: <FileText size={18} /> },
    ];

    if (loading) return <p>Loading content editor...</p>;

    return (
        <div style={{ padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginTop: '30px' }}>
            <h2 style={{ marginBottom: '20px', color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Type size={24} color="#3BB6D8" />
                Edit Site Text
            </h2>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '10px 15px',
                            background: activeTab === tab.id ? '#3BB6D8' : '#f1f1f1',
                            color: activeTab === tab.id ? 'white' : '#555',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '500'
                        }}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Form Content */}
            <div style={{ background: '#f9fafb', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>

                {activeTab === 'hero' && (
                    <>
                        <h3 style={{ marginTop: 0, color: '#333' }}>Hero Section</h3>
                        <InputField label="Title" value={content.heroTitle || ''} onChange={(v) => handleChange('heroTitle', v)} />
                        <InputField label="Subtitle" value={content.heroSubtitle || ''} onChange={(v) => handleChange('heroSubtitle', v)} />
                        <InputField label="Description" value={content.heroDescription || ''} onChange={(v) => handleChange('heroDescription', v)} type="textarea" />
                        <InputField label="Button Text" value={content.heroButtonText || ''} onChange={(v) => handleChange('heroButtonText', v)} />
                    </>
                )}

                {activeTab === 'signatures' && (
                    <>
                        <h3 style={{ marginTop: 0, color: '#333' }}>Signatures Section</h3>
                        <InputField label="Cocktails Area Title" value={content.cocktailsTitle || ''} onChange={(v) => handleChange('cocktailsTitle', v)} />

                        <h4 style={{ color: '#555', marginTop: '15px' }}>Cocktail 1 (Left)</h4>
                        <InputField label="Name" value={content.cocktail1Title || ''} onChange={(v) => handleChange('cocktail1Title', v)} />
                        <InputField label="Ingredients" value={content.cocktail1Desc || ''} onChange={(v) => handleChange('cocktail1Desc', v)} />
                        <ImageUploader
                            slot="cocktail1"
                            currentImage={content.cocktail1Image}
                            fallback="/assets/tropical_cocktail.png"
                            token={token}
                            onUploaded={(url) => handleChange('cocktail1Image', url)}
                        />

                        <h4 style={{ color: '#555', marginTop: '15px' }}>Cocktail 2 (Right)</h4>
                        <InputField label="Name" value={content.cocktail2Title || ''} onChange={(v) => handleChange('cocktail2Title', v)} />
                        <InputField label="Ingredients" value={content.cocktail2Desc || ''} onChange={(v) => handleChange('cocktail2Desc', v)} />
                        <ImageUploader
                            slot="cocktail2"
                            currentImage={content.cocktail2Image}
                            fallback="/assets/green_smoothie.png"
                            token={token}
                            onUploaded={(url) => handleChange('cocktail2Image', url)}
                        />

                        <hr style={{ margin: '20px 0', borderColor: '#eee' }} />

                        <InputField label="Dishes Area Title" value={content.dishesTitle || ''} onChange={(v) => handleChange('dishesTitle', v)} />

                        <h4 style={{ color: '#555', marginTop: '15px' }}>Dish 1 (Left)</h4>
                        <InputField label="Name" value={content.dish1Title || ''} onChange={(v) => handleChange('dish1Title', v)} />
                        <InputField label="Description" value={content.dish1Desc || ''} onChange={(v) => handleChange('dish1Desc', v)} />
                        <ImageUploader
                            slot="dish1"
                            currentImage={content.dish1Image}
                            fallback="/assets/gourmet_pinsa.png"
                            token={token}
                            onUploaded={(url) => handleChange('dish1Image', url)}
                        />

                        <h4 style={{ color: '#555', marginTop: '15px' }}>Dish 2 (Right)</h4>
                        <InputField label="Name" value={content.dish2Title || ''} onChange={(v) => handleChange('dish2Title', v)} />
                        <InputField label="Description" value={content.dish2Desc || ''} onChange={(v) => handleChange('dish2Desc', v)} />
                        <ImageUploader
                            slot="dish2"
                            currentImage={content.dish2Image}
                            fallback="/assets/tropical_salad.png"
                            token={token}
                            onUploaded={(url) => handleChange('dish2Image', url)}
                        />
                    </>
                )}

                {activeTab === 'pinsa' && (
                    <>
                        <h3 style={{ marginTop: 0, color: '#333' }}>Pinsa & Cocktails Section</h3>
                        <InputField label="Section Title" value={content.pinsaCocktailTitle || ''} onChange={(v) => handleChange('pinsaCocktailTitle', v)} />
                        <InputField label="Section Description" value={content.pinsaCocktailDescription || ''} onChange={(v) => handleChange('pinsaCocktailDescription', v)} type="textarea" />

                        <h4 style={{ color: '#555', marginTop: '15px' }}>Image 1 — Pinsa (Left)</h4>
                        <ImageUploader
                            slot="pinsa"
                            currentImage={content.pinsaImage}
                            fallback="/assets/pinsa.png"
                            token={token}
                            onUploaded={(url) => handleChange('pinsaImage', url)}
                        />
                        <InputField label="Caption" value={content.pinsaCaption || ''} onChange={(v) => handleChange('pinsaCaption', v)} />

                        <h4 style={{ color: '#555', marginTop: '15px' }}>Image 2 — Combo (Center)</h4>
                        <ImageUploader
                            slot="combo"
                            currentImage={content.comboImage}
                            fallback="/assets/pinsa_cocktail_combo.png"
                            token={token}
                            onUploaded={(url) => handleChange('comboImage', url)}
                        />
                        <InputField label="Caption" value={content.comboCaption || ''} onChange={(v) => handleChange('comboCaption', v)} />

                        <h4 style={{ color: '#555', marginTop: '15px' }}>Image 3 — Cocktail (Right)</h4>
                        <ImageUploader
                            slot="cocktail"
                            currentImage={content.cocktailImage}
                            fallback="/assets/cocktail.png"
                            token={token}
                            onUploaded={(url) => handleChange('cocktailImage', url)}
                        />
                        <InputField label="Caption" value={content.cocktailCaption || ''} onChange={(v) => handleChange('cocktailCaption', v)} />
                    </>
                )}

                {activeTab === 'about' && (
                    <>
                        <h3 style={{ marginTop: 0, color: '#333' }}>About Us Section</h3>
                        <InputField label="Title" value={content.aboutTitle || ''} onChange={(v) => handleChange('aboutTitle', v)} />
                        <InputField label="Paragraph 1" value={content.aboutText1 || ''} onChange={(v) => handleChange('aboutText1', v)} type="textarea" />
                        <InputField label="Paragraph 2" value={content.aboutText2 || ''} onChange={(v) => handleChange('aboutText2', v)} type="textarea" />
                        <InputField label="Paragraph 3" value={content.aboutText3 || ''} onChange={(v) => handleChange('aboutText3', v)} type="textarea" />
                        <InputField label="Paragraph 4" value={content.aboutText4 || ''} onChange={(v) => handleChange('aboutText4', v)} type="textarea" />

                        <h4 style={{ color: '#555', marginTop: '15px' }}>Section Image</h4>
                        <ImageUploader
                            slot="about"
                            currentImage={content.aboutImage}
                            fallback="/assets/about-interior.png"
                            token={token}
                            onUploaded={(url) => handleChange('aboutImage', url)}
                        />
                    </>
                )}

                {activeTab === 'legal' && (
                    <>
                        <h3 style={{ marginBottom: '15px', color: '#333' }}>Legal Pages Content</h3>
                        <p style={{ marginBottom: '20px', color: '#666', fontSize: '0.9rem' }}>
                            Use the visual editor below to update text, headings, and lists. No HTML knowledge required.
                        </p>

                        <InputField
                            label="Impressum Content"
                            value={content.impressumText || ''}
                            onChange={(v) => handleChange('impressumText', v)}
                            type="richtext"
                            help="Edit the content for the Impressum page."
                        />

                        <div style={{ height: '40px', borderTop: '1px dashed #ddd', margin: '30px 0' }}></div>

                        <InputField
                            label="Datenschutzerklärung Content"
                            value={content.datenschutzText || ''}
                            onChange={(v) => handleChange('datenschutzText', v)}
                            type="richtext"
                            help="Edit the content for the Privacy Policy page."
                        />
                    </>
                )}

                {activeTab === 'contact' && (
                    <>
                        <h3 style={{ marginTop: 0, color: '#333' }}>Contact & Footer</h3>
                        <InputField label="Address" value={content.contactAddress || ''} onChange={(v) => handleChange('contactAddress', v)} />
                        <InputField label="Phone" value={content.contactPhone || ''} onChange={(v) => handleChange('contactPhone', v)} />
                        <InputField label="Email" value={content.contactEmail || ''} onChange={(v) => handleChange('contactEmail', v)} />
                        <InputField label="Instagram Handle (e.g. #luma.cafe)" value={content.contactInstagram || ''} onChange={(v) => handleChange('contactInstagram', v)} />
                        <InputField label="Instagram Link" value={content.contactInstagramLink || ''} onChange={(v) => handleChange('contactInstagramLink', v)} />
                        <InputField label="TikTok Link" value={content.contactTiktokLink || ''} onChange={(v) => handleChange('contactTiktokLink', v)} />
                        <InputField label="Footer Note (Bottom Right)" value={content.footerNote || ''} onChange={(v) => handleChange('footerNote', v)} />
                    </>
                )}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                    onClick={handleSave}
                    style={{
                        padding: '12px 24px',
                        background: '#3BB6D8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <Save size={18} /> Save All Changes
                </button>

                {status && (
                    <span style={{
                        color: status.includes('Failed') ? '#dc2626' : '#166534',
                        fontWeight: '500'
                    }}>
                        {status}
                    </span>
                )}
            </div>
        </div>
    );
};

export default SiteContentEditor;
