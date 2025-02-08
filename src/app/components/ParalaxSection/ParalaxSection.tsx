import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ParallaxWelcome: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate the background for parallax effect.
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        // Move the background upward by 20% of its height over the scroll duration.
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top bottom", // when the top of the background hits the bottom of the viewport
          end: "bottom top",   // when the bottom of the background hits the top of the viewport
          scrub: true,
          // markers: true, // Uncomment for debugging trigger positions.
        },
      });
    }

    // Animate the title: fade in and slight upward movement.
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%", // when title comes into view
            end: "bottom top",
            scrub: true,
            // markers: true, // Uncomment for debugging trigger positions.
          },
        }
      );
    }
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%", // when title comes into view
            end: "bottom top",
            scrub: true,
            // markers: true, // Uncomment for debugging trigger positions.
          },
        }
      );
    }
  }, []);

  return (
    <div className="parallax-container">
      {/* Background Layer */}

      <div
        className="parallax-background"
        ref={bgRef}
      >
        <Image
          src="/background-2.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Content Layer */}
      <div className="parallax-content">
        <h1 ref={titleRef}>Discover The Aldarian World</h1>
        <h3 ref={textRef}>Let’s dive into the waking dreamscape of the World of Aldarian</h3>
      </div>
    </div>
  );
};

export default ParallaxWelcome;
