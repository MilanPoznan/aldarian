'use client'
import React, { useEffect, useRef } from "react";
import imagesLoaded from "imagesloaded";
import Image from "next/image";
import '../styles/full-slider.css';
/**
 * -------------------------------------------------
 * ------------------ Utilities --------------------
 * -------------------------------------------------
 */

// Simple ID generator for the Raf callbacks
let count = 0;
const genId = (): string => (count++).toString();

// Lerping
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

class Vec2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  lerp(v: Vec2, t: number) {
    this.x = lerp(this.x, v.x, t);
    this.y = lerp(this.y, v.y, t);
  }
}

// RequestAnimationFrame controller
type RafCallback = {
  callback: (args: { id: string }) => void;
  id: string;
};

class Raf {
  private rafId = 0;
  private callbacks: RafCallback[] = [];

  constructor() {
    this.raf = this.raf.bind(this);
    this.start();
  }

  private raf() {
    this.callbacks.forEach(({ callback, id }) => callback({ id }));
    this.rafId = requestAnimationFrame(this.raf);
  }

  start() {
    this.raf();
  }

  stop() {
    cancelAnimationFrame(this.rafId);
  }

  add(callback: (args: { id: string }) => void, id?: string) {
    this.callbacks.push({ callback, id: id ?? genId() });
  }

  remove(id: string) {
    this.callbacks = this.callbacks.filter((cb) => cb.id !== id);
  }
}

/**
 * Tilt effect
 */
function tilt(
  node: HTMLElement,
  options?: {
    trigger?: HTMLElement;
    target?: HTMLElement | HTMLElement[];
  }
) {
  let { trigger, target } = resolveOptions(node, options);

  let lerpAmount = 0.06;
  const rotDeg = {
    current: new Vec2(),
    target: new Vec2(),
  };
  const bgPos = {
    current: new Vec2(),
    target: new Vec2(),
  };

  let rafId = "";

  function ticker({ id }: { id: string }) {
    rafId = id;
    rotDeg.current.lerp(rotDeg.target, lerpAmount);
    bgPos.current.lerp(bgPos.target, lerpAmount);

    // Apply CSS variables to all target elements
    for (const el of target) {
      el.style.setProperty("--rotX", `${rotDeg.current.y.toFixed(2)}deg`);
      el.style.setProperty("--rotY", `${rotDeg.current.x.toFixed(2)}deg`);
      el.style.setProperty("--bgPosX", `${bgPos.current.x.toFixed(2)}%`);
      el.style.setProperty("--bgPosY", `${bgPos.current.y.toFixed(2)}%`);
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    // offsetX/offsetY relative to the element that triggered the event
    const { offsetX, offsetY } = e;
    lerpAmount = 0.1;

    for (const el of target) {
      const ox = (offsetX - el.clientWidth * 0.5) / (Math.PI * 3);
      const oy = -(offsetY - el.clientHeight * 0.5) / (Math.PI * 4);

      rotDeg.target.set(ox, oy);
      bgPos.target.set(-ox * 0.3, oy * 0.3);
    }
  };

  const onMouseLeave = () => {
    lerpAmount = 0.06;
    rotDeg.target.set(0, 0);
    bgPos.target.set(0, 0);
  };

  const addListeners = () => {
    trigger.addEventListener("mousemove", onMouseMove);
    trigger.addEventListener("mouseleave", onMouseLeave);
  };

  const removeListeners = () => {
    trigger.removeEventListener("mousemove", onMouseMove);
    trigger.removeEventListener("mouseleave", onMouseLeave);
  };

  const init = () => {
    addListeners();
    globalRaf.add(ticker);
  };

  const destroy = () => {
    removeListeners();
    globalRaf.remove(rafId);
  };

  init();

  // Allow external updates
  return { destroy };
}

function resolveOptions(
  node: HTMLElement,
  options?: {
    trigger?: HTMLElement;
    target?: HTMLElement | HTMLElement[];
  }
) {
  const trigger = options?.trigger ?? node;
  let target: HTMLElement[] = [];
  if (!options?.target) {
    target = [node];
  } else {
    target = Array.isArray(options.target)
      ? options.target
      : [options.target];
  }
  return { trigger, target };
}

/**
 * -----------------------------------------------------
 * Global (shared) Raf instance to replicate the old JS
 * -----------------------------------------------------
 */

let globalRaf: Raf | null = null;

if (typeof window !== "undefined") {
  globalRaf = new Raf();
}


/**
 * The main React component
 */
const FullSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globalRaf) return;

    setup();

    return () => {
      globalRaf?.stop();
    };
  }, []);



  /**
   * Sets up the loading progress, then calls `init` when everything is ready
   */
  function setup() {
    const loaderText = document.querySelector<HTMLElement>(".loader__text");
    const images = [...document.querySelectorAll<HTMLImageElement>("img")];
    const totalImages = images.length;
    let loadedImages = 0;

    const progress = {
      current: 0,
      target: 0,
    };

    // track loading each image
    images.forEach((image) => {
      imagesLoaded(image, (instance) => {
        //@ts-ignore
        if (instance.isComplete) {
          loadedImages++;
          progress.target = loadedImages / totalImages;
        }
      });
    });

    // Use raf to lerp progress display
    globalRaf.add(function updateLoading({ id }) {
      progress.current = lerp(progress.current, progress.target, 0.06);
      const progressPercent = Math.round(progress.current * 100);

      if (loaderText) {
        loaderText.textContent = `${progressPercent}%`;
      }

      // When fully loaded, init the rest & remove this callback
      if (progressPercent === 100) {
        init();
        globalRaf.remove(id);
      }
    });
  }

  /**
   * Called once the images are fully loaded
   */
  function init() {
    const loader = document.querySelector<HTMLElement>(".loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
    }

    // set up tilt on each slide + its info
    const slides = [...document.querySelectorAll<HTMLElement>(".slide")];
    const slidesInfo = [...document.querySelectorAll<HTMLElement>(".slide-info")];

    slides.forEach((slide, i) => {
      const slideInner = slide.querySelector<HTMLElement>(".slide__inner");
      const slideInfoInner =
        slidesInfo[i].querySelector<HTMLElement>(".slide-info__inner");
      if (slideInner && slideInfoInner) {
        tilt(slide, { target: [slideInner, slideInfoInner] });
      } else if (slideInner) {
        tilt(slide, { target: slideInner });
      }
    });

    const btnPrev = document.querySelector<HTMLElement>(".slider--btn__prev");
    const btnNext = document.querySelector<HTMLElement>(".slider--btn__next");

    // set up next/prev events
    if (btnPrev) btnPrev.addEventListener("click", change(-1));
    if (btnNext) btnNext.addEventListener("click", change(1));
  }

  /**
   * Change slides
   */
  function change(direction: number) {
    return () => {
      const current = {
        slide: document.querySelector<HTMLElement>(".slide[data-current]"),
        slideInfo: document.querySelector<HTMLElement>(".slide-info[data-current]"),
        slideBg: document.querySelector<HTMLElement>(".slide__bg[data-current]"),
      };
      const previous = {
        slide: document.querySelector<HTMLElement>(".slide[data-previous]"),
        slideInfo: document.querySelector<HTMLElement>(".slide-info[data-previous]"),
        slideBg: document.querySelector<HTMLElement>(".slide__bg[data-previous]"),
      };
      const next = {
        slide: document.querySelector<HTMLElement>(".slide[data-next]"),
        slideInfo: document.querySelector<HTMLElement>(".slide-info[data-next]"),
        slideBg: document.querySelector<HTMLElement>(".slide__bg[data-next]"),
      };

      // remove attributes
      Object.values(current).forEach((el) => el?.removeAttribute("data-current"));
      Object.values(previous).forEach((el) => el?.removeAttribute("data-previous"));
      Object.values(next).forEach((el) => el?.removeAttribute("data-next"));

      let c = current;
      let p = previous;
      let n = next;

      if (direction === 1) {
        // rotate forward
        const temp = c;
        c = n;
        n = p;
        p = temp;

        if (c.slide) c.slide.style.zIndex = "20";
        if (p.slide) p.slide.style.zIndex = "30";
        if (n.slide) n.slide.style.zIndex = "10";
      } else {
        // rotate backward
        const temp = c;
        c = p;
        p = n;
        n = temp;

        if (c.slide) c.slide.style.zIndex = "20";
        if (p.slide) p.slide.style.zIndex = "10";
        if (n.slide) n.slide.style.zIndex = "30";
      }

      // re-assign attributes
      Object.values(c).forEach((el) => el?.setAttribute("data-current", ""));
      Object.values(p).forEach((el) => el?.setAttribute("data-previous", ""));
      Object.values(n).forEach((el) => el?.setAttribute("data-next", ""));
    };
  }

  /**
   * Return the JSX structure
   * Note: Some attributes are used purely for the existing JS query logic
   */
  return (
    <div ref={containerRef}>
      <div className="slider">
        <button className="slider--btn slider--btn__prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="slides__wrapper">
          <div className="slides">
            {/* --- Slide 1 --- */}
            <div className="slide" data-current="true">
              <div className="slide__inner">
                <div className="slide--image__wrapper">
                  <Image
                    src="/images/slider-1.webp"
                    alt="slide 1"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </div>
              </div>
            </div>
            <div
              className="slide__bg"
              style={
                {
                  "--bg":
                    "url(/images/slider-1.webp)",
                  "--dir": 0,
                } as React.CSSProperties
              }
              data-current="true"
            />

            {/* --- Slide 2 --- */}
            <div className="slide" data-next="true">
              <div className="slide__inner">
                <div className="slide--image__wrapper">
                  <Image
                    src="/images/slider-2.webp"
                    alt="slide 1"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </div>
              </div>
            </div>
            <div
              className="slide__bg"
              style={
                {
                  "--bg":
                    "url(/images/slider-2.webp)",
                  "--dir": 1,
                } as React.CSSProperties
              }
              data-next="true"
            >
            </div>

            {/* --- Slide 3 --- */}
            <div className="slide" data-previous="true">
              <div className="slide__inner">
                <div className="slide--image__wrapper">
                  <Image
                    src="/images/slider-3.webp"
                    alt="slide 3"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </div>
              </div>
            </div>
            <div
              className="slide__bg"
              style={
                {
                  "--bg":
                    "url(/images/slider-3.webp)",
                  "--dir": -1,
                } as React.CSSProperties
              }
              data-previous="true"
            />
          </div>

          {/* --- Slide infos --- */}
          <div className="slides--infos">
            {/* Info 1 */}
            <div className="slide-info" data-current="">
              <div className="slide-info__inner">
                <div className="slide-info--text__wrapper">
                  <div data-title className="slide-info--text">
                    <span>Aelora </span>
                  </div>
                  <div data-subtitle className="slide-info--text">
                    <span>Owlcrest</span>
                  </div>
                  <div data-description className="slide-info--text">
                    <span>The mountains are calling</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info 2 */}
            <div className="slide-info" data-next="">
              <div className="slide-info__inner">
                <div className="slide-info--text__wrapper">
                  <div data-title className="slide-info--text">
                    <span>Mirmod  Ashborne </span>
                  </div>
                  <div data-subtitle className="slide-info--text">
                    {/* <span>Peru</span> */}
                  </div>
                  <div data-description className="slide-info--text">
                    <span>Adventure is never far away</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info 3 */}
            <div className="slide-info" data-previous="">
              <div className="slide-info__inner">
                <div className="slide-info--text__wrapper">
                  <div data-title className="slide-info--text">
                    <span>Baldric Sunforge</span>
                  </div>
                  <div data-subtitle className="slide-info--text">
                    <span>France</span>
                  </div>
                  <div data-description className="slide-info--text">
                    <span>Let your dreams come true</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="slider--btn slider--btn__next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* <div className="loader">
        <span className="loader__text">0%</span>
      </div> */}

      {/* <div className="support">
        <a href="https://twitter.com/DevLoop01" target="_blank" rel="noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
        </a>
        <a
          href="https://github.com/devloop01/voyage-slider"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </div> */}
    </div>
  );
};

export default FullSlider;
