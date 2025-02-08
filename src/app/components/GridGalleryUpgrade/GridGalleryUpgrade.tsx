import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const HeroToGridTransition: React.FC = () => {
  // Refs for the overall container, the hero image, its destination placeholder, and the grid container.
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroPlaceholderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Create an array of images for the other grid items (we’ll have a total of 16 items, including the hero)
  const otherImages = Array.from({ length: 15 }, (_, i) => `https://picsum.photos/seed/${i + 100}/300/200`);

  useEffect(() => {
    if (!containerRef.current || !heroImgRef.current || !heroPlaceholderRef.current) return;

    // Get bounding rectangles for the hero image and its grid destination (the placeholder)
    // Note: getBoundingClientRect() returns values relative to the viewport.
    const heroRect = heroImgRef.current.getBoundingClientRect();
    const placeholderRect = heroPlaceholderRef.current.getBoundingClientRect();

    // Calculate the difference in position (dx, dy) between the hero image and its placeholder.
    // These values will be used to animate the hero image into place.
    const dx = placeholderRect.left - heroRect.left + 200;
    const dy = placeholderRect.top - heroRect.top + 200;

    // The placeholder’s dimensions represent the final size for the hero image.
    const targetWidth = placeholderRect.width;
    const targetHeight = placeholderRect.height;

    // Create a GSAP timeline that is scrubbed by scrolling.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500', // adjust this scroll distance to control the animation’s duration relative to scroll
        scrub: true,
        // markers: true, // Uncomment to see visual markers during development
      }
    });

    // Animate the hero image’s position and size so that it lands on the placeholder.
    tl.to(heroImgRef.current, {
      x: dx,
      y: dy,
      width: targetWidth,
      height: targetHeight,
      ease: 'none'
    });

    // Simultaneously (or overlapping), fade in the other grid items.
    if (gridRef.current) {
      tl.fromTo(
        gridRef.current.querySelectorAll('.grid-item:not(.hero-placeholder)'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, ease: 'none', duration: 0.5 },
        0 // start at the beginning of the timeline
      );
    }
  }, []);

  return (
    <div className="hero-grid-container" ref={containerRef}>
      {/* The hero image is rendered once, absolutely positioned so it can be animated freely */}
      <img
        ref={heroImgRef}
        src="https://picsum.photos/id/1018/1200/600"
        alt="Hero"
        className="hero-image"
      />

      {/* The grid container */}
      <div className="grid-container" ref={gridRef}>
        {/* The placeholder grid cell for the hero image.
            Its dimensions represent the final size & position for the hero image. */}
        <div className="grid-item hero-placeholder" ref={heroPlaceholderRef}></div>
        {/* Render the other grid items */}
        {otherImages.map((src, index) => (
          <div className="grid-item" key={index}>
            <img src={src} alt={`Grid ${index + 2}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroToGridTransition;
