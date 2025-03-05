import { SingleNFTItem } from '@/app/client/types/types'
import React from 'react'

type ModalProps = {
  activeIndex: number;
  item: SingleNFTItem;
  totalItems: number;
  onClose: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export const GalleryModal = ({ activeIndex, item, totalItems, handleNext, handlePrev, onClose }: ModalProps) => {

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


export default GalleryModal