import React, { useEffect, useRef } from 'react';
import './FooterCurtain.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const FooterCurtain = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Animate the wrapper from hidden (opacity 0) to visible (opacity 1)
    gsap.fromTo(
      wrapperRef.current,
      { autoAlpha: 0 }, // autoAlpha controls both opacity and visibility
      {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, []);

  return (
    <div className="page-wrapper" ref={wrapperRef}>
      <div className="curtain-content">
        <div className='curtain-footer-socials'>
          <a href="https://t.co/CtcYYwZbXd" target='_blank' className='footer-social' title="">
            <i className="bx bxl-discord"></i>
          </a>

          <a href="https://x.com/thealdarian" target="_blank" className='footer-social'>
            <i className="bx bxl-twitter"></i>
          </a>
        </div>
      </div>
      <div className="curtain-footer">

        <div className='curtain-content-image'>
          <Image
            src="/images/footer-logo.png"
            alt="slide 1"
            layout="fill"
            objectFit="cover"
            quality={100}
          />

        </div>

      </div>
    </div>
  );
};

export default FooterCurtain;