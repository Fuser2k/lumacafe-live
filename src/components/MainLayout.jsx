
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import CookieBanner from './CookieBanner';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <CookieBanner />
        </>
    );
};

export default MainLayout;
