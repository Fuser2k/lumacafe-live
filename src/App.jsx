import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes with Header & Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Route>

          {/* Admin Route without Header & Footer */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
