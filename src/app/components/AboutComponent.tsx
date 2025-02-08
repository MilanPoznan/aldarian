'use client';
import React from 'react';
// import Image from 'next/image';
import '../styles/about.css';
import { useState } from 'react';

/**
 * A simple mini-slider of 4 images plus text about us.
 * Desktop layout: images on the left (40%), text on the right (60%).
 * Mobile layout: text first full width, slider below it full width.
 */
const AboutSection: React.FC = () => {

  const images = [
    '/images/slide-2.png',
    '/images/slide-1.png',
    '/images/slide-3.jpg',
  ];
  // Track which slide is currently active
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handlers for next / previous
  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <section className="">
      <div className="aboutSection">
        {/* Text Container */}
        <div className="textContainer">
          <h2 className='textTitle'>What is Adrian</h2>
          <p className='textContent'>
            Aldarian is a realm where imagination transcends boundaries, a place where the impossible becomes reality. Shrouded in the golden mists of eternal dawn, its landscapes are as diverse as the tales woven within them—emerald forests whispering ancient secrets, crystalline mountains housing forgotten gods, and endless oceans hiding the ruins of civilizations long lost to time. The very air pulses with magic, drawing from the StarSun, the celestial beacon that radiates life and binds the worlds fates together.
          </p>
        </div>

        <div className='sliderContainer'>
          <button className="prevBtn" onClick={handlePrev}>
            ‹
          </button>

          <div className="sliderWrapper">
            <div className="slider">
              {images.map((src, idx) => (

                <div key={idx} className="slideItem"
                  style={{
                    backgroundImage: `url(${src})`,
                    width: 'calc(100% + 1rem)',
                    height: '100%',
                    left: `calc(${currentSlide * -100}% + ${currentSlide * -1}rem)`,
                  }}>
                </div>
              ))}
            </div>
          </div>

          <button className="nextBtn" onClick={handleNext}>
            ›
          </button>
        </div>
      </div>
    </section >
  );
};

export default AboutSection;