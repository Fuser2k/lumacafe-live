import React from 'react';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import Signatures from '../components/Signatures';
import GoogleReviews from '../components/GoogleReviews';



import PinsaCocktailSection from '../components/PinsaCocktailSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import ScrollShowcase from '../components/ScrollShowcase';



const HomePage = () => {
    return (
        <>
            <Hero />
            <VideoSection />
            <Signatures />
            <GoogleReviews />

            <ScrollShowcase />
            <PinsaCocktailSection />
            <AboutSection />
            <ContactSection />


        </>
    );
};

export default HomePage;
