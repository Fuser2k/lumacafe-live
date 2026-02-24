import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Upload, Image as ImageIcon } from 'lucide-react';

const ImageUploader = ({ slot, currentImage, fallback, token, onUploaded }) => {
    const fileRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const displayImage = preview || currentImage || fallback;

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show local preview immediately
        setPreview(URL.createObjectURL(file));
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('slot', slot);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL || ''}/api/upload-image`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            onUploaded(res.data.imageUrl);
        } catch (err) {
            console.error('Image upload failed:', err);
            alert('Resim yüklenemedi: ' + (err.response?.data?.error || err.message));
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            margin: '10px 0 20px 0',
            padding: '12px',
            background: '#f0f4f8',
            borderRadius: '8px',
            border: '1px dashed #ccc'
        }}>
            <img
                src={displayImage}
                alt={slot}
                style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid #3BB6D8'
                }}
            />
            <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>
                    <ImageIcon size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {currentImage ? 'Resim yüklendi ✓' : 'Varsayılan resim kullanılıyor'}
                </p>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                />
                <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    style={{
                        marginTop: '6px',
                        padding: '6px 14px',
                        background: uploading ? '#aaa' : '#3BB6D8',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: uploading ? 'wait' : 'pointer',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <Upload size={14} />
                    {uploading ? 'Yükleniyor...' : 'Resim Yükle'}
                </button>
            </div>
        </div>
    );
};

export default ImageUploader;
