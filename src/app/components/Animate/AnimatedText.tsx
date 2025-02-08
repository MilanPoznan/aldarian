import React, { useEffect, useRef } from 'react';
import './styles.css';

interface SpanizeProps {
  text: string;
  baseDelay?: number; // delay (in seconds) per letter increment
  offset?: number;    // additional delay offset for the entire text block
}

/**
 * Spanize
 * Splits the given text into individual <span> elements, assigning each an inline
 * animation delay based on its index plus an optional offset.
 */
const Spanize: React.FC<SpanizeProps> = ({ text, baseDelay = 0.05, offset = 0 }) => {
  return (
    <>
      {text.split(' ').map((char, index) => (
        <span
          key={index}
          style={{ animationDelay: `${(index + 1) * baseDelay + offset}s` }}
        >
          {char + ' '}
        </span>
      ))}
    </>
  );
};

const AnimatedText: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Use IntersectionObserver to add "animate" class when the section enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 } // Adjust threshold as needed
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const title = "Aldarian";
  const text1 =
    "Aldarian NFT project that blends art and community, focusing on rewarding holders. Aldarian NFT owners can vote on which new artwork they want to get every week. This dynamic process ensures that each community member actively participates in the evolution of the collection.";
  const text2 =
    "Learning with AI: Aldarian goes beyond just art. We are launching an educational initiative that will include workshops on how to create art using AI. Our goal is to enable community members to develop their creative skills and discover how to use AI.";
  const text3 =
    "IRL Art: In addition to the digital collection, Aldarian NFT holders will have the chance to enjoy physical artworks. Art from the digital world can be transformed into tangible formats of the holder’s choice, creating a direct link between the digital and real worlds.";

  return (
    <section className="mast" id="about" ref={sectionRef}>
      <div className="mast__header">
        <h1 className="mast__title js-spanize">
          <Spanize text={title} />
        </h1>
        <hr className="sep" />
        {/* Notice the additional offset for each paragraph */}
        <p className="mast__text js-spanize">
          <Spanize text={text1} offset={0.5} />
        </p>
        <p className="mast__text js-spanize">
          <Spanize text={text2} offset={3.5} />
        </p>
        <p className="mast__text js-spanize">
          <Spanize text={text3} offset={5.0} />
        </p>
      </div>
    </section>
  );
};

export default AnimatedText;
