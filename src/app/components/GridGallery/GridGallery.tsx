'use client'
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

// Register the ScrollTrigger plugin with gsap
gsap.registerPlugin(ScrollTrigger);


type SingleItem = {
  title: {
    rendered: string
  }
 content: {
  rendered: string
 }
  _embedded: {
    'wp:featuredmedia': {
      source_url: string
    }[]
  }

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
        <h2 className="modal-title">{item.title.rendered}</h2>
        <div>
          <img src={item._embedded['wp:featuredmedia'][0].source_url}  />
          <div className='modal-text' dangerouslySetInnerHTML={{ __html: item.content.rendered }}/>
        </div>
      </div>
    </div>
  );
};

export interface GridGallertProps {
  nfts?: any[];
  handleLoadMore: () => void;
  handleCheckBox: (id: number) => void;
  initialQuery: () => void;
  categories: {
    name: string;
    id: number;
  }[]
}

const GridGallery: React.FC<GridGallertProps> = ({nfts ,categories, handleLoadMore, handleCheckBox, initialQuery}) => {
  // Create a ref for the grid container
  const gridRef = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const handleNext = () => {
    if (openModal < nfts.length - 1) setOpenModal((prev) => prev + 1);
  }
  const handlePrev = () => {
    if (openModal === 0) return
    if (openModal >= 0) setOpenModal((prev) => prev - 1);
  }
  // Create an array of 16 image URLs using picsum.photos (you can replace these with your own images)
  // const images = ['images/'];

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

  useEffect(() => {
    if(selectedCategory) {
      handleCheckBox(selectedCategory)
    }
    else {
      initialQuery();
    }
  }, [selectedCategory])

  const handleOnClose = () => {
    document.body.classList.remove('no-scroll');
    setOpenModal(-1)

  }
  const handleOpenModal = (index: number) => {
    document.body.classList.add('no-scroll');
    setOpenModal(index);
  }

  const handlerCheckBox = (id: number) => {
    if(id === selectedCategory){
      setSelectedCategory(null);
   }
   else {
    setSelectedCategory(id);
   }
  }

  return (
    <>
      <div className='gird-filter-container'>
        <div className='categories-checkboxes'>
          {categories.map(item => {
            return (
              <div className='category-check-box' key={item.name}>
                <p className='checkbox-label'>{item.name}</p>
                <span className="checkbox-custom"></span>

                <input 
                  className='checkbox'
                  type='checkbox'
                  checked={selectedCategory === item.id}
                  onChange={() => handlerCheckBox(item.id)}
                  />
              </div>
            )
          })}
        </div>
        <div className="image-grid-container" id="gallery" ref={gridRef}>
          {nfts.length < 1 && 
            <div className='no-results'> No results! </div>
          }
          {nfts.map((src, index) => {
            return (
              <div className="grid-item" key={index}>
                <img onClick={() => handleOpenModal(index)} src={src?._embedded["wp:featuredmedia"][0]?.source_url} alt={src?._embedded["wp:featuredmedia"][0].alt_text} />
              </div>
            )
          })}
        </div>
      </div>
      <button className='load-more' disabled={selectedCategory ? true : false} onClick={handleLoadMore}>
        Load more
      </button>
      {openModal >= 0 && 
        <Modal 
          totalItems={nfts.length} 
          activeIndex={openModal} 
          handleNext={handleNext}
          handlePrev={handlePrev} 
          item={nfts[openModal]} 
          onClose={handleOnClose} 
        />
      }
    </>
  );
};

export default GridGallery;
