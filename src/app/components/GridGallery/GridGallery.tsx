'use client'
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

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
          <img src={item._embedded['wp:featuredmedia'][0].source_url} />
          <div className='modal-text' dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
        </div>
      </div>
    </div>
  );
};

export type SingleCategory = {
  name: string;
  id: number;
}
export interface GridGallertProps {
  nfts?: any[];
  handleLoadMore: () => void;
  handleCheckBox: (item: SingleCategory) => void;
  categories: SingleCategory[]
  activeCat: number[]
}

const GridGallery: React.FC<GridGallertProps> = ({ nfts, categories, activeCat, handleLoadMore, handleCheckBox }) => {
  const [openModal, setOpenModal] = useState(-1);

  const handleNext = () => {
    if (openModal < nfts.length - 1) setOpenModal((prev) => prev + 1);
  }
  const handlePrev = () => {
    if (openModal === 0) return
    if (openModal >= 0) setOpenModal((prev) => prev - 1);
  }

  const handleOnClose = () => {
    document.body.classList.remove('no-scroll');
    setOpenModal(-1)

  }
  const handleOpenModal = (index: number) => {
    document.body.classList.add('no-scroll');
    setOpenModal(index);
  }

  const renderCategories = () => {
    if (!categories) return null;
    return (
      categories.map(item => {
        return (
          <div className='category-check-box' key={item.name}>
            <p className='checkbox-label'>{item.name}</p>
            <span className="checkbox-custom"></span>

            <input
              className='checkbox'
              type='checkbox'
              value={item.id}
              checked={activeCat.includes(item.id)}
              onChange={() => handleCheckBox(item)}
            />
          </div>
        )
      })
    )
  }

  return (
    <>
      <div className='gird-filter-container'>
        <div className='categories-checkboxes'>
          {renderCategories()}
        </div>
        <div className="image-grid-container" id="gallery" >
          {nfts.length < 1 &&
            <div className='no-results'> No results! </div>
          }
          {nfts?.map((src, index) => {
            return (
              <div className="grid-item" key={index}>
                <img onClick={() => handleOpenModal(index)} src={src?._embedded["wp:featuredmedia"][0]?.source_url} alt={src?._embedded["wp:featuredmedia"][0].alt_text} />
              </div>
            )
          })}
        </div>
      </div>
      <button className='load-more' onClick={handleLoadMore}>
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
