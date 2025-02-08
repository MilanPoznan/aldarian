import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";
const PhotoGrid: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const size = Math.max(window.innerWidth, window.innerHeight);

      // Create timeline for scroll-driven animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".grid-container",
          start: "top top",
          end: () => window.innerHeight * 4,
          scrub: true,
          pin: ".grid",
          anticipatePin: 1,
        },
      });

      tl.set(".gridBlock:not(.centerBlock)", { autoAlpha: 0 })
        .to(".gridBlock:not(.centerBlock)", { duration: 0.1, autoAlpha: 1 }, 0.001)
        .from(".gridLayer", {
          scale: 3.3333,
          ease: "none",
        });

      // Set random background images for blocks
      gsap.set(".gridBlock", {
        backgroundImage: (i: number) =>
          `url(https://picsum.photos/${size}/${size}?random=${i})`,
      });

      // Load one large image for the center block, fade it in on load
      const bigImg = new Image();
      bigImg.addEventListener("load", () => {
        gsap.to(".centerPiece .gridBlock", { autoAlpha: 1, duration: 0.5 });
      });
      bigImg.src = `https://picsum.photos/${size}/${size}?random=50`;
    }
  }, []);

  return (
    <div>
      <h1 className="header-section">Scroll down to see a photo gallery being revealed</h1>

      <div className="grid-container">
        <div className="grid">
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer centerPiece">
            <div className="gridBlock centerBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock">
              <a href="https://greensock.com" target="_blank" rel="noreferrer"></a>
            </div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
        </div>
      </div>

      <h1 className="header-section" style={{ marginTop: 0 }}>
        Some additional content
      </h1>
    </div>
  );
};

export default PhotoGrid;
