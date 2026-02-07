
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // I will create this

const Login = ({ onLoginSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/login`, { password });
            const { accessToken } = response.data;

            // Save token
            localStorage.setItem('adminToken', accessToken);
            onLoginSuccess(accessToken);
        } catch (err) {
            let errorMsg = "Login Failed";
            if (err.response && err.response.data && err.response.data.error) {
                // Backend provided specific error (e.g. rate limit)
                errorMsg = err.response.data.error;
            } else if (err.message) {
                errorMsg = err.message;
            }
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Checking...' : 'Login'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Login;
