'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

// Register the ScrollTrigger plugin with gsap
gsap.registerPlugin(ScrollTrigger);

const GridGallery: React.FC = () => {
  // Create a ref for the grid container
  const gridRef = useRef<HTMLDivElement>(null);

  // Create an array of 16 image URLs using picsum.photos (you can replace these with your own images)
  // const images = ['images/'];
  const images = Array.from({ length: 12 }, (_, i) => `images/grid-${i + 1}.webp`);

  useEffect(() => {
    if (gridRef.current) {
      // Animate all .grid-item elements inside the grid container
      gsap.fromTo(
        gridRef.current.querySelectorAll('.grid-item'),
        { opacity: 0, y: 50 }, // Start state: hidden and slightly shifted down
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2, // Delay of 0.2s between each item’s animation
          scrollTrigger: {
            trigger: gridRef.current, // When this element enters the viewport...
            start: 'top 80%',         // ...start the animation when the top of the grid is 80% down the viewport.
            toggleActions: 'play none none none',
            // Uncomment the next line to see markers for debugging:
            // markers: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="image-grid-container" id="gallery" ref={gridRef}>
      {images.map((src, index) => (
        <div className="grid-item" key={index}>
          <img src={src} alt={`Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default GridGallery;
