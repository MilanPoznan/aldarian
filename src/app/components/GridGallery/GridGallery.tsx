'use client'
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

const text: { title: string; description: string }[] = [
  {
    title: "Eldrin Mosswhisper",
    description: `Ha ha ha, in shadows you crawl, the crazy dwarf laughs, your pride will fall!
    You try that, and it didn’t work, now you sing our song, what a desperate quirk!
    Ding, dong, ding, your mask won’t stay, people see lies, they’re clearing the way.
    Don’t bother to fix it, it’s all in vain, the dwarf dances wild in your shameful refrain!
    And please, don’t copy with your bad lore,
    The songs of the dwarf close that door! Ha ha ha!`
  },
  {
    title: "Luna Frost",
    description: `With her flowing white hair and wolf pelt cloak, Luna Frost moves like a whisper beneath the moonlight, 
    her crimson eyes glowing with an otherworldly allure. She draws power from the lunar tides, her beauty as cold and mesmerizing as a winter’s night.`
  },
  {
    title: "Dornir Frostbane",
    description: `His beard, a river, gold and long, whispers of battles, fierce and strong.
    His helm adorned with horns of might, a shadow looms in frozen light.
    
    Through endless snows his footsteps fade, a ghost of war, in ice arrayed.
    His blade cuts deep, his soul stands tall, the northwind sings—he heeds its call.`
  },
  {
    title: "Thalgrion",
    description: `His face, adorned with cracks of light, tells tales of ages, bold and bright.
    His armor gleams, forged in the sun, while celestial embers from him run.
    
    His word is law, his heart a flame, before him gods and mortals wane.
    Bearer of fate, through time’s decree, Eryndor walks—his judgment free.`
  },
  {
    title: "Nyxara the Moonborn",
    description: `With the grace of night, she takes her flight, her form like an owl, in the silver light.
    Long ears, sharp as the forest’s call, her eyes, deep pools, where shadows fall.
    Upon her shoulders, two owls perch still, a druid of the night, with ancient will.
    She moves in silence, a whisper of air, a guardian of darkness, with secrets to share.`
  },
  {
    title: "Xyphoros, the Ashen Titan",
    description: `From cinder’s birth and ember’s cry, he walks where gods and mortals die.
    His veins aglow with molten wrath, a war-born shade on ruin’s path.
    
    No chains may bind, no blade may break, the doom he brings—the world shall quake.
    Through fire and dust his legend spreads, Xyphoros comes where battle treads.`
  },
  {
    title: "Sylvaris, the Verdant Revenant",
    description: `Through death he walks, yet life remains, roots entwined in shattered veins.
    A whisper lost in forest deep, where silent souls and shadows creep.
    
    The earth still calls, the vines still bind, his fate with nature’s wrath aligned.
    A guardian lost, yet never gone—Sylvaris roams, the dusk his dawn.`
  },
  {
    title: "Aurion",
    description: `From a cosmic rift, the warrior fell, guided by fate where stars rebel.
    He walked a path with no return, where light fades and shadows burn.
    
    His blade cuts through the endless night, in cosmic silence, his soul takes flight.
    The stars whisper his name in time, a warrior eternal, in the infinite climb.`
  },
  {
    title: "Sylvarn, the Fungal Sage",
    description: `In the twilight of the mystical forest, he watches,
    The ancient guardian with skin of deep blue.
    Bound by magic, his power hatches, a force eternal, both fierce and true.`
  },
  {
    title: "Vaelion, the Dawnforged Sentinel",
    description: `In the twilight, where shadows hark. An elven warrior with eyes that spark.
    With armor gleaming, his fate is stark. Guardian eternal, lighting the dark.`
  },
  {
    title: "Ashforge",
    description: `Upon his helm, the embers gleam, forged in war, a molten dream.
    A titan clad in smoke and pain, his fury bound in steel and flame.
    
    His blazing sight, a judgment cast, a warrior of the ages past.`
  },
  {
    title: "Eldrin, the Wanderer of Twilight",
    description: `His gaze, like tempests, dark and deep, holds echoes of the oaths they keep.
    His cloak of dusk, with embered thread, whispers the names of those long dead.
    
    Through shattered realms, where echoes cry, his steps remain, though kings may die.
    A fate untamed, a soul unchained, Eldrin walks—his past unnamed.`
  }
];


// Register the ScrollTrigger plugin with gsap
gsap.registerPlugin(ScrollTrigger);


type SingleItem = {
  title: string;
  description: string;
  images: string;

}

type ModalProps = {
  activeIndex: number;
  item: SingleItem;
  totalItems: number;
  onClose: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}
const Modal = ({ activeIndex, item, totalItems, handleNext, handlePrev, onClose }: ModalProps) => {

  const { title, description, images } = item;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-navigation">
          <span onClick={handlePrev} className={`slider-btn slider-btn--left ${activeIndex === 0 ? 'slider-btn--disabled' : ''}`}>
            <i className='bx bx-chevron-left'></i>
          </span>
          <span onClick={handleNext} className={`slider-btn slider-btn--right ${activeIndex === totalItems - 1 ? 'slider-btn--disabled' : ''}`}>
            <i className='bx bx-chevron-right'></i>
          </span>
        </div>
        <span className="close" onClick={onClose}>+</span>
        <h2 className="modal-title">{title}</h2>
        <div>
          <img src={images} alt={title} />
          <p className='modal-text'>{description}</p>

        </div>
      </div>
    </div>
  );
};

const GridGallery: React.FC = () => {
  // Create a ref for the grid container
  const gridRef = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState(-1);

  const handleNext = () => {
    if (openModal < images.length - 1) setOpenModal((prev) => prev + 1);
  }
  const handlePrev = () => {
    if (openModal === 0) return
    if (openModal >= 0) setOpenModal((prev) => prev - 1);
  }
  // Create an array of 16 image URLs using picsum.photos (you can replace these with your own images)
  // const images = ['images/'];
  const images = Array.from({ length: 12 }, (_, i) => { return { title: text[i].title, description: text[i].description, images: `images/grid-${i + 1}.webp` } });
  console.log('images', images)
  useEffect(() => {
    if (gridRef.current) {
      // Animate all .grid-item elements inside the grid container
      gsap.fromTo(
        gridRef.current.querySelectorAll('.grid-item'),
        { opacity: 0, y: 50 }, // Start state: hidden and slightly shifted down
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2, // Delay of 0.2s between each item’s animation
          scrollTrigger: {
            trigger: gridRef.current, // When this element enters the viewport...
            start: 'top 80%',         // ...start the animation when the top of the grid is 80% down the viewport.
            toggleActions: 'play none none none',
            // Uncomment the next line to see markers for debugging:
            // markers: true,
          },
        }
      );
    }
  }, []);

  const handleOnClose = () => {
    document.body.classList.remove('no-scroll');
    setOpenModal(-1)

  }
  const handleOpenModal = (index: number) => {
    document.body.classList.add('no-scroll');
    setOpenModal(index);
  }
  return (
    <>
      <div className="image-grid-container" id="gallery" ref={gridRef}>
        {images.map((src, index) => (
          <div className="grid-item" key={index}>
            <img onClick={() => handleOpenModal(index)} src={src.images} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      {openModal >= 0 && <Modal totalItems={images.length} activeIndex={openModal} handleNext={handleNext} handlePrev={handlePrev} item={images[openModal]} onClose={handleOnClose} />}
    </>
  );
};

export default GridGallery;
