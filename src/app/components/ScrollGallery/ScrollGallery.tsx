'use client'; // If you're using the Next.js App Router and want a Client Component

import React, { useEffect, useRef, useState } from 'react';
import { Pane } from 'tweakpane';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './styles.css'
type StaggerOptions = 'range' | 'timing';

interface Config {
  theme: 'system' | 'light' | 'dark';
  enhanced: boolean;
  stick: boolean;
  layers: boolean;
  center: boolean;
  stagger: StaggerOptions;
}

// Example Next.js page/component
export default function ScrollPlaybook() {
  // Local references for controlling timelines (if needed)
  const scalerTlRef = useRef<gsap.core.Timeline | null>(null);
  const layersTlRef = useRef<gsap.core.Timeline | null>(null);
  const paneRef = useRef<Pane | null>(null);

  // Our config object:
  const [config, setConfig] = useState<Config>({
    theme: 'system',
    enhanced: true,
    stick: true,
    layers: true,
    center: true,
    stagger: 'range',
  });

  // Check if the browser supports native scroll animations
  const hasScrollSupport = false;

  // Setup GSAP's ScrollTrigger plugin if needed
  if (!hasScrollSupport) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Equivalent to your "update" function
  const updateStylesAndTimelines = React.useCallback(() => {
    // Update data attributes on <html> for styling
    document.documentElement.dataset.theme = config.theme;
    document.documentElement.dataset.enhanced = String(config.enhanced);
    document.documentElement.dataset.stick = String(config.stick);
    document.documentElement.dataset.center = String(config.center);
    document.documentElement.dataset.layers = String(config.layers);
    document.documentElement.dataset.stagger = config.stagger;

    // If "enhanced" is true but the browser does NOT support native scroll timeline,
    // we manually create GSAP timelines
    if (config.enhanced && !hasScrollSupport) {
      // SCALER TL
      scalerTlRef.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: 'main section:first-of-type',
            start: 'top -10%',
            end: 'bottom 80%',
            scrub: true,
          },
        })
        .from(
          '.scaler img',
          {
            height: window.innerHeight - 32,
            ease: 'power1.inOut',
          },
          0
        )
        .from(
          '.scaler img',
          {
            width: window.innerWidth - 32,
            ease: 'power2.inOut',
          },
          0
        );

      // LAYERS TL
      layersTlRef.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: '.title-section',
            start: 'top -40%',
            end: 'bottom bottom',
            scrub: true,
          },
        })
        // layer 1
        .from(
          '.layer:nth-of-type(1)',
          {
            opacity: 0,
            ease: 'sine.out',
          },
          0
        )
        .from(
          '.layer:nth-of-type(1)',
          {
            scale: 0,
            ease: 'power1.inOut',
          },
          0
        )
        // layer 2
        .from(
          '.layer:nth-of-type(2)',
          {
            opacity: 0,
            ease: 'sine.out',
          },
          0
        )
        .from(
          '.layer:nth-of-type(2)',
          {
            scale: 0,
            ease: 'power3.inOut',
          },
          0
        )
        // layer 3
        .from(
          '.layer:nth-of-type(3)',
          {
            opacity: 0,
            ease: 'sine.out',
          },
          0
        )
        .from(
          '.layer:nth-of-type(3)',
          {
            scale: 0,
            ease: 'power4.inOut',
          },
          0
        );
    } else {
      // If not "enhanced" or we have native scroll support, kill existing GSAP if any
      // and reset inline styles
      if (scalerTlRef.current) {
        scalerTlRef.current.kill();
        scalerTlRef.current = null;
      }
      if (layersTlRef.current) {
        layersTlRef.current.kill();
        layersTlRef.current = null;
      }
      gsap.set(['.scaler img', '.layer'], {
        clearProps: 'all',
      });
    }

    // If we *do* have native scroll support, we can show or hide some UI controls, etc.
    if (paneRef.current && hasScrollSupport) {
      //@ts-ignore
      // const { hidden: layersHidden } = paneRef.current?.controller?.views[1] || {};
      // This part depends on how Tweakpane organizes controllers
      // Usually you'd do something like:
      // paneRef.current?.addBinding(...).hidden = ...
      // But the internal indexing can differ. Just adapt as necessary.
    }
  }, [config, hasScrollSupport]);


  useEffect(() => {
    updateStylesAndTimelines();
  }, [config, updateStylesAndTimelines]);

  // Render the HTML as JSX
  return (
    <div className="main-grid">


      <div className="content-wrap">
        <div>
          <h1 className="fluid title-section">
            let&apos;s
            <br />
            scroll.
          </h1>
        </div>
        <section>
          <div className="content grid-section">
            <div className="grid">
              {/* LAYER 1 */}
              <div className="layer">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1556304044-0699e31c6a34?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
              </div>

              {/* LAYER 2 */}
              <div className="layer">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://plus.unsplash.com/premium_photo-1706078438060-d76ced26d8d5?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
              </div>

              {/* LAYER 3 */}
              <div className="layer">
                <div>
                  <img
                    src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60"
                    alt=""
                  />
                </div>
              </div>

              {/* SCALER */}
              <div className="scaler">
                <img
                  src="https://assets.codepen.io/605876/model-shades.jpg?format=auto&quality=100"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        <section className='last-section'>
          <h2 className="fluid">fin.</h2>
        </section>


      </div>
    </div>
  );
}
