
import React, { useState } from 'react';
import Login from '../components/Admin/Login';
import PdfUploader from '../components/Admin/PdfUploader';
import ScrollingTextEditor from '../components/Admin/ScrollingTextEditor';
import SiteContentEditor from '../components/Admin/SiteContentEditor';

const AdminPage = () => {
    const [token, setToken] = useState(localStorage.getItem('adminToken'));

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
    };

    if (!token) {
        return <Login onLoginSuccess={(t) => setToken(t)} />;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    style={{ background: '#333', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </div>

            <PdfUploader token={token} />

            <ScrollingTextEditor token={token} />

            <SiteContentEditor token={token} />

            <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px', color: '#666' }}>
                <p><strong>Note:</strong> Menu content editing is currently disabled. Use the PDF uploader above to update the menu file.</p>
            </div>
        </div>
    );
};

export default AdminPage;
