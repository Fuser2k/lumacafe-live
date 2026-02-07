
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, FileText, Upload, RefreshCw } from 'lucide-react';

const PdfUploader = ({ token }) => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');
    const [currentPdf, setCurrentPdf] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchPdfStatus = async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/menu-status`);
            console.log("PDF Status Response:", res.data);
            setCurrentPdf(res.data);
        } catch (error) {
            console.error("Failed to fetch PDF status", error);
            setErrorMsg("Connection Error: " + (error.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPdfStatus();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setStatus('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('Uploading...');
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/upload-pdf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setStatus('Success! PDF updated.');
            setFile(null);
            document.getElementById('pdf-input').value = "";
            fetchPdfStatus();
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.error || error.message;
            setStatus(`Failed to upload PDF: ${errorMsg}`);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete the current menu?")) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL || ''}/api/menu-pdf`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setStatus('Menu PDF deleted.');
            fetchPdfStatus();
        } catch (error) {
            setStatus('Failed to delete PDF.');
        }
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div style={{ padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginBottom: '20px', color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={24} color="#3BB6D8" />
                Menu PDF Management
            </h2>

            {/* Current File Status */}
            <div style={{ marginBottom: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                <h4 style={{ marginTop: 0, color: '#555' }}>Current Menu File</h4>

                {loading ? (
                    <p style={{ color: '#888' }}>Checking status...</p>
                ) : errorMsg ? (
                    <p style={{ color: 'red' }}>{errorMsg}</p>
                ) : currentPdf?.exists ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                                <span style={{ fontWeight: 'bold', color: '#28a745' }}>● Active</span>
                                <a href={`${import.meta.env.VITE_API_URL || ''}/uploads/menu.pdf`} target="_blank" rel="noopener noreferrer" style={{ color: '#3BB6D8', textDecoration: 'none', fontWeight: '500' }}>
                                    View Current PDF
                                </a>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                Size: {formatSize(currentPdf.size)} <br />
                                Last Updated: {new Date(currentPdf.lastModified).toLocaleString()}
                            </div>
                        </div>
                        <button
                            onClick={handleDelete}
                            style={{
                                padding: '8px 12px',
                                background: '#fee2e2',
                                color: '#dc2626',
                                border: '1px solid #fecaca',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                fontSize: '0.9rem'
                            }}
                        >
                            <Trash2 size={16} /> Delete Menu
                        </button>
                    </div>
                ) : (
                    <div style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>No menu uploaded yet. The "Check Menu" button on home page won't work.</span>
                    </div>
                )}
            </div>

            {/* Upload Section */}
            <div>
                <h4 style={{ marginTop: 0, color: '#555', marginBottom: '15px' }}>Upload New Menu</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    {/* Styled File Input */}
                    <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                        <input
                            id="pdf-input"
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <label
                            htmlFor="pdf-input"
                            style={{
                                display: 'inline-block',
                                padding: '10px 20px',
                                border: '2px dashed #3BB6D8',
                                borderRadius: '8px',
                                color: '#3BB6D8',
                                cursor: 'pointer',
                                textAlign: 'center',
                                background: '#f0f9ff',
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        >
                            {file ? (
                                <span style={{ fontWeight: 'bold' }}>Selected: {file.name}</span>
                            ) : (
                                <span>Click to Select PDF File</span>
                            )}
                        </label>
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled={!file}
                        style={{
                            padding: '12px 24px',
                            background: file ? '#3BB6D8' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: file ? 'pointer' : 'not-allowed',
                            fontSize: '1rem',
                            fontWeight: '600',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background 0.2s'
                        }}
                    >
                        <Upload size={18} /> {status === 'Uploading...' ? 'Uploading...' : 'Upload & Publish'}
                    </button>
                </div>

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
        </div>
    );
};

export default PdfUploader;
