import React from 'react';
import './VideoSection.css';

const VideoSection = () => {
    return (
        <section className="video-section">
            <video
                className="fullscreen-video"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/assets/lumakafevideo3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="video-overlay"></div>
        </section>
    );
};

export default VideoSection;
