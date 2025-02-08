'use client'
import React, { useEffect } from 'react';
import './styles.css';
import FullSlider from '../FullSlider';
/**
 * A single component that replicates the HTML structure 
 * and JavaScript functionality from your snippet, 
 * without Bootstrap. 
 *
 * Make sure to import the custom CSS (see below).
 */
const AppDemo = () => {
  useEffect(() => {
    // ---- Custom Cursor Effect ----
    const cursor = document.getElementById('cursor');
    const cursor2 = document.getElementById('cursor2');
    const cursor3 = document.getElementById('cursor3');

    // Move the three cursors
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (cursor) {
        cursor.style.left = clientX + 'px';
        cursor.style.top = clientY + 'px';
      }
      if (cursor2) {
        cursor2.style.left = clientX + 'px';
        cursor2.style.top = clientY + 'px';
      }
      if (cursor3) {
        cursor3.style.left = clientX + 'px';
        cursor3.style.top = clientY + 'px';
      }
    };

    document.body.addEventListener('mousemove', handleMouseMove);

    // Hover effect: enlarge cursors
    const hoverTargets = document.querySelectorAll('.hover-target');
    const addHover = () => {
      if (cursor2) cursor2.classList.add('hover');
      if (cursor3) cursor3.classList.add('hover');
    };
    const removeHover = () => {
      if (cursor2) cursor2.classList.remove('hover');
      if (cursor3) cursor3.classList.remove('hover');
    };

    hoverTargets.forEach((target) => {
      target.addEventListener('mouseover', addHover);
      target.addEventListener('mouseout', removeHover);
    });

    // ---- Overlay/Section Toggling ----
    // We toggle classes on <body>, just like your jQuery snippet.

    const body = document.body;

    // about
    const aboutText = document.querySelector('.about-text');
    const aboutClose = document.querySelector('.about-close');
    aboutText?.addEventListener('click', () => {
      body.classList.add('about-on');
    });
    aboutClose?.addEventListener('click', () => {
      body.classList.remove('about-on');
    });

    // contact
    const contactText = document.querySelector('.contact-text');
    const contactClose = document.querySelector('.contact-close');
    contactText?.addEventListener('click', () => {
      body.classList.add('contact-on');
    });
    contactClose?.addEventListener('click', () => {
      body.classList.remove('contact-on');
    });

    // travel
    const travelSpan = document.querySelector('.travel');
    const travelClose = document.querySelector('.travel-close');
    travelSpan?.addEventListener('click', () => {
      body.classList.add('travel-on');
    });
    travelClose?.addEventListener('click', () => {
      body.classList.remove('travel-on');
    });

    // wildlife
    const wildlifeSpan = document.querySelector('.wildlife');
    const wildlifeClose = document.querySelector('.wildlife-close');
    wildlifeSpan?.addEventListener('click', () => {
      body.classList.add('wildlife-on');
    });
    wildlifeClose?.addEventListener('click', () => {
      body.classList.remove('wildlife-on');
    });

    // nature
    const natureSpan = document.querySelector('.nature');
    const natureClose = document.querySelector('.nature-close');
    natureSpan?.addEventListener('click', () => {
      body.classList.add('nature-on');
    });
    natureClose?.addEventListener('click', () => {
      body.classList.remove('nature-on');
    });

    // Cleanup on unmount
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);

      hoverTargets.forEach((target) => {
        target.removeEventListener('mouseover', addHover);
        target.removeEventListener('mouseout', removeHover);
      });
      aboutText?.removeEventListener('click', () => { });
      aboutClose?.removeEventListener('click', () => { });
      contactText?.removeEventListener('click', () => { });
      contactClose?.removeEventListener('click', () => { });
      travelSpan?.removeEventListener('click', () => { });
      travelClose?.removeEventListener('click', () => { });
      wildlifeSpan?.removeEventListener('click', () => { });
      wildlifeClose?.removeEventListener('click', () => { });
      natureSpan?.removeEventListener('click', () => { });
      natureClose?.removeEventListener('click', () => { });
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="about-text hover-target">about</div>
        <div className="contact-text hover-target">contact</div>
        <div className="section-center">
          <div className="container-fluid">
            <div className="row justify-content-center text-center">
              <div className="col-12">
                <h1>
                  Christian
                  <br />
                  Arete
                </h1>
              </div>
              <div className="col-12 mb-2">
                <div className="dancing">
                  <span>photography</span>
                </div>
              </div>
              <div className="col-12">
                <p>
                  <span className="travel hover-target">travel</span>
                  <span className="wildlife hover-target">wildlife</span>
                  <span className="nature hover-target">nature</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="about-close hover-target"></div>
        <div className="section-center">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-12">
                <img
                  src="https://assets.codepen.io/1462889/photographer.jpeg"
                  alt=""
                />
              </div>
              <div className="col-lg-8 mt-3">
                <p className="mb-1">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo.
                </p>
              </div>
              <div className="col-12">
                <p className="mb-0">
                  <span>Christian Arete</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <div className="contact-close hover-target"></div>
        <div className="section-center">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-12">
                <a href="#" className="hover-target">
                  arete@photography.com
                </a>
              </div>
              <div className="col-12 social mt-4">
                <a href="#" className="hover-target">
                  instagram
                </a>
                <a href="#" className="hover-target">
                  flickr
                </a>
                <a href="#" className="hover-target">
                  facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Section */}
      <div className="travel-section">
        <div className="travel-close hover-target"></div>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <h3>Slider</h3>
            </div>
            <div className="col-12 mt-3">
            </div>
            <div className="col-12">
              <p>
                focal length: 22.5mm
                <br />
                aperture: ƒ/5.6
                <br />
                exposure time: 1/1000
                <br />
                ISO: 80
              </p>
            </div>

            <FullSlider />
          </div>
        </div>
      </div>

      {/* Wildlife Section */}
      <div className="wildlife-section">
        <div className="wildlife-close hover-target"></div>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <h3>wildlife</h3>
            </div>
            <div className="col-12 mt-3">
              <p>
                <span>Canon PowerShot S95</span>
              </p>
            </div>
            <div className="col-12">
              <p>
                focal length: 22.5mm
                <br />
                aperture: ƒ/5.6
                <br />
                exposure time: 1/1000
                <br />
                ISO: 80
              </p>
            </div>
            {/* 12 images */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <img
                  src="https://assets.codepen.io/1462889/photo-p.jpg"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nature Section */}
      <div className="nature-section">
        <div className="nature-close hover-target"></div>
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <h3>nature</h3>
            </div>
            <div className="col-12 mt-3">
              <p>
                <span>Canon PowerShot S95</span>
              </p>
            </div>
            <div className="col-12">
              <p>
                focal length: 22.5mm
                <br />
                aperture: ƒ/5.6
                <br />
                exposure time: 1/1000
                <br />
                ISO: 80
              </p>
            </div>
            {/* 12 images */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <img
                  src="https://assets.codepen.io/1462889/photo-p.jpg"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cursor Elements */}
      <div className="cursor" id="cursor"></div>
      <div className="cursor2" id="cursor2"></div>
      <div className="cursor3" id="cursor3"></div>

      {/* External Link */}
      <a
        href="https://front.codes/"
        className="logo hover-target"
        target="_blank"
        rel="noreferrer"
      >
        <img src="https://assets.codepen.io/1462889/fcy.png" alt="" />
      </a>
    </>
  );
};

export default AppDemo;
