'use client'
import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import Image from "next/image";

export const Footer = () => {
  // const [heightValue, setHeightValue] = useState()

  const footerHeight = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  return (
    <footer className="footer" ref={footerHeight}>
      <div className="footer-wrapper">
        <div className='footer-socials'>
          <a href="https://t.co/CtcYYwZbXd" target='_blank' className='footer-social' title="">
            <i className="bx bxl-discord"></i>
          </a>

          <a href="https://x.com/thealdarian" target="_blank" className='footer-social'>
            <i className="bx bxl-twitter"></i>
          </a>
        </div>
        <h1>Join Aldarian</h1>
      </div>
      <span className="footer__back"
        role="button"
        onClick={scrollToTop}
      >
        BACK TO TOP
      </span>

      {/* <FooterCopyright copyright={copyrightField} /> */}
    </footer>
  )
}