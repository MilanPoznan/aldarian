
"use client"
import React, { useState, useEffect } from 'react'
import CtaShuffle from './CtaShuffle'

/**
 * SiteLoadingAnimation component
 * 
 * @param {Boolean} isAnimated 
 * 
 * @returns {JSX Element}
 */
export default function SiteLoadingAnimation({ isAnimated }: { isAnimated: boolean }) {

  const [showShuffleElement, setShowShuffleElement] = useState(false)

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowShuffleElement(true)
    }, 800)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`page-loading-animation ${isAnimated ? 'page-loading-animation--move' : ''}`}>
      {showShuffleElement &&
        <CtaShuffle
          value="Aldrian"
          isPageLoadingAnimation={true}
          showShuffleElement={showShuffleElement}
        />
      }
    </div>
  )
}
