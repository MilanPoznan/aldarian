import { SingleNFTCategory } from '@/app/client/types/types';
import React, { useState } from 'react'
import { useModalNavigation } from '@/app/hooks/useModalNavigation';
import './styles.css'
import GalleryModal from '../GalleryModal/GalleryModal';
export interface GalleryPageComponentProps {
  nfts?: any[];
  handleLoadMore: () => void;
  handleCheckBox: (item: SingleNFTCategory) => void;
  categories: SingleNFTCategory[]
  activeCat: number[]
}
const GalleryPageComponent = ({ nfts, categories, activeCat, handleLoadMore, handleCheckBox }) => {

  const [openCategory, setopenCategory] = useState(false)
  const { openModal, handleNext, handlePrev, handleOnClose, handleOpenModal } =
    useModalNavigation(nfts.length);

  const renderCategories = (openCategory) => {
    if (!categories) return null;
    return (
      <div className={`main-galery__categories ${openCategory ? 'main-galery__categories--open' : ''}`}>
        {categories.map(item => {
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
        })}
      </div>
    )
  }
  const renderNfts = () => {
    if (!nfts) return null;
    return (
      nfts.map((nft, index) => {
        return (
          <div
            style={{ backgroundImage: `url(${nft._embedded['wp:featuredmedia'][0].source_url})` }}
            className='main-galery__single' key={index} onClick={() => handleOpenModal(index)}>
            {/* <img src={nft._embedded['wp:featuredmedia'][0].source_url} /> */}
            {/* <h2>{nft.title.rendered}</h2> */}
          </div>
        )
      })
    )
  }
  const handleOnCategoryClick = () => {
    setopenCategory(!openCategory)
  }
  return (
    <div className="main-galery">
      <button onClick={handleOnCategoryClick}>Open categories</button>
      {renderCategories(openCategory)}
      <div className="main-galery__wrapper">
        <div className="main-galery__content">{renderNfts()}</div>
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
    </div>
  )
}

export default GalleryPageComponent