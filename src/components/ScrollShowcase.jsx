import React, { useEffect, useRef } from 'react';
import './ScrollShowcase.css';

const ScrollShowcase = () => {
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (img1Ref.current) {
                // Rotate clockwise
                img1Ref.current.style.transform = `rotate(${scrollY * 0.15}deg)`;
            }
            if (img2Ref.current) {
                // Rotate counter-clockwise
                img2Ref.current.style.transform = `rotate(-${scrollY * 0.15}deg)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call to set position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="scroll-showcase">
            <h2 className="showcase-slogan">Mit Liebe handgemacht</h2>
            <div className="showcase-images">
                <div className="showcase-item">
                    <img
                        ref={img1Ref}
                        src="/assets/pinssa.png"
                        alt="Delicious Pinsa"
                        className="rotating-img"
                    />
                    <p className="img-desc">Knusprige Pinsa</p>
                </div>
                <div className="showcase-item">
                    <img
                        ref={img2Ref}
                        src="/assets/makaron.png"
                        alt="Frische Pasta"
                        className="rotating-img"
                    />
                    <p className="img-desc">Frische Pasta</p>
                </div>
            </div>
        </section>
    );
};

export default ScrollShowcase;
