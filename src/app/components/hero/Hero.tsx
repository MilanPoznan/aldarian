import React, { useEffect, useRef } from "react";
import Image from "next/image";
import './styles.css'

const HeaderBanner: React.FC = () => {
  // We'll use refs instead of document.getElementById for best React practice
  const navbarMenuRef = useRef<HTMLDivElement | null>(null);
  const burgerMenuRef = useRef<HTMLDivElement | null>(null);
  const headerMenuRef = useRef<HTMLElement | null>(null);



  function scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }


  function smoothScrollTo(elementId: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    e.preventDefault();

    const target = document.getElementById(elementId);
    const headerOffset = 80

    if (!target) {
      console.warn(`Element with ID "${elementId}" not found.`);
      return;
    }

    let y: number = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  }


  useEffect(() => {
    const navbarMenu = navbarMenuRef.current;
    const burgerMenu = burgerMenuRef.current;
    const headerMenu = headerMenuRef.current;

    // If these don't exist, bail out
    if (!navbarMenu || !burgerMenu || !headerMenu) return;

    // Burger click toggles "is-active" on both burger icon and navbar menu
    const handleBurgerClick = () => {
      burgerMenu.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
    };
    burgerMenu.addEventListener("click", handleBurgerClick);

    // Close menu on click of each .menu-link
    const menuLinks = navbarMenu.querySelectorAll(".menu-link");
    const handleLinkClick = () => {
      burgerMenu.classList.remove("is-active");
      navbarMenu.classList.remove("is-active");
    };
    menuLinks.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    // Change header background on scroll
    const handleScroll = () => {
      if (window.scrollY >= 85) {
        headerMenu.classList.add("on-scroll");
      } else {
        headerMenu.classList.remove("on-scroll");
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Fixed Navbar on window resize
    const handleResize = () => {
      if (window.innerWidth > 768) {
        if (navbarMenu.classList.contains("is-active")) {
          navbarMenu.classList.remove("is-active");
        }
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup event listeners when component unmounts
    return () => {
      burgerMenu.removeEventListener("click", handleBurgerClick);
      menuLinks.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Header Section */}
      <header className="header" id="header" ref={headerMenuRef}>
        <nav className="navbar container">
          <a href="#" className="brand" onClick={scrollToTop}>
            <img src="/logo.png" alt="Aldarians" />
          </a>
          <div className="burger" id="burger" ref={burgerMenuRef}>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
          <div className="menu" id="menu" ref={navbarMenuRef}>
            <div className="menu-inner">
              <div className="menu-item">
                <a href="#" className="menu-link" onClick={(e) => smoothScrollTo("about", e)}>
                  About us
                </a>
              </div>
              <div className="menu-item">
                <a href="#" className="menu-link" onClick={(e) => smoothScrollTo("gallery", e)}>
                  Collection
                </a>
              </div>
              {/* <div className="menu-item">
                <a href="#" className="menu-link">
                  Product
                </a>
              </div>
              <div className="menu-item">
                <a href="#" className="menu-link">
                  Support
                </a>
              </div> */}
            </div>
          </div>
          <a href="https://t.co/CtcYYwZbXd" target='_blank' className='header-socials'>
            <i className="bx bxl-discord"></i>
          </a>
        </nav>
      </header>

      {/* Main Section */}
      <section className="section banner banner-section">
        <div className="container banner-column">
          {/* <img src="https://i.ibb.co/vB5LTFG/Headphone.png" className="banner-image" /> */}
          <Image
            src="/images/hero-image.webp"
            alt="Next.js logo"
            width={400}
            height={400}
            layout="responsive"
            objectFit="contain"
            quality={100}
            className="banner-image"
          />
          <div className="banner-inner">
            <h1 className="heading-xl">Welcome Aldarians</h1>
            <p className="paragraph">
              The World of Aldarian, where everything is possible, all imagination comes to reality, and it's only a matter of how strongly you believe!
            </p>
          </div>
          <div className="banner-links">

            <a href="https://x.com/thealdarian" target="_blank" >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-5">
                <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
              </svg>
            </a>
            <a href="https://t.co/CtcYYwZbXd" target="_blank" >
              <i className="bx bxl-discord"></i>
            </a>
            <a href="https://drip.haus/aldarian" target="_blank" >
              {/* <i className="bx bxl-twitter"></i> */}
              <Image
                style={{ borderRadius: '50%' }}
                src="/drip-logo.jpg"
                alt="drip"
                width={24}
                height={24}
                quality={100}
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderBanner;
