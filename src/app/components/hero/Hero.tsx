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
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="https://t.co/CtcYYwZbXd" target="_blank" >
              <i className="bx bxl-discord"></i>
            </a>
            <a href="https://x.com/Cryptobu_ll" target="_blank" >
              <i className="bx bxl-twitter"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderBanner;
