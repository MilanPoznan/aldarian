'use client'
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import GalleryModal from '../GalleryModal/GalleryModal';
import { SingleNFTCategory, SingleNFTItem } from '@/app/client/types/types';
import { useModalNavigation } from '@/app/hooks/useModalNavigation';

gsap.registerPlugin(ScrollTrigger);

type ModalProps = {
  activeIndex: number;
  item: SingleNFTItem;
  totalItems: number;
  onClose: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}


export interface GridGallertProps {
  nfts?: any[];
  handleLoadMore: () => void;
  handleCheckBox: (item: SingleNFTCategory) => void;
  categories: SingleNFTCategory[]
  activeCat: number[]
}

const GridGallery: React.FC<GridGallertProps> = ({ nfts, categories, activeCat, handleLoadMore, handleCheckBox }) => {
  const { openModal, handleNext, handlePrev, handleOnClose, handleOpenModal } =
    useModalNavigation(nfts.length);

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
        <GalleryModal
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
