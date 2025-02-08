'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollTextSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Array of sentences to display
  const sentences = [
    "Welcome to the amazing world",
    "Where magic just starts",
    "Discover the beauty within",
    "Embrace the unexpected",
    "And let your journey begin"
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Select all text elements within the section
    const texts = sectionRef.current.querySelectorAll('.scroll-text');

    // Initialize all texts: first one visible, the rest hidden.
    texts.forEach((text, index) => {
      gsap.set(text, { opacity: index === 0 ? 1 : 0 });
    });

    /*
      Create a timeline that will drive the transitions.
      The 'end' value defines how much scroll is needed to complete all transitions.
      Adjust it based on the number of sentences and desired pacing.
    */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",         // When the section reaches the top of the viewport
        end: "+=1000",            // Adjust this value so the section stays pinned for the whole animation
        scrub: true,              // Tie timeline progress to scroll progress
        pin: true,                // Pin the section in place until the timeline is complete
        // markers: true,         // Uncomment to visualize the trigger area during development
      },
    });

    // Build the timeline: fade out the current text and fade in the next one
    // Each transition here lasts 0.5 units (adjust as needed)
    tl.to(texts[0], { opacity: 0, duration: 0.5 })
      .fromTo(texts[1], { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .to(texts[1], { opacity: 0, duration: 0.5 })
      .fromTo(texts[2], { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .to(texts[2], { opacity: 0, duration: 0.5 })
      .fromTo(texts[3], { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .to(texts[3], { opacity: 0, duration: 0.5 })
      .fromTo(texts[4], { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }, []);

  return (
    <section className="scroll-text-section" ref={sectionRef}>
      {sentences.map((sentence, index) => (
        <h2 className="scroll-text" key={index}>
          {sentence}
        </h2>
      ))}
    </section>
  );
};

export default ScrollTextSection;
