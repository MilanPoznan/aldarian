'use client'
import { useEffect, useState } from "react";
import SearchBar from "../components/elements/search-bar/SearchBar";
import Hero from "../components/hero/Hero";
import { Footer } from "../components/Footer/Footer";
import { useCmsClient } from "../client/restClient/cmsClient";


/**
 * TODO RASA 
 * Setovati na render komponente inicijalne podatke u state 
 * -  Na search dohvatiti podatke sa servera => handleOnSubmit
 * -- i setovati ih u state  
 * - Na load more dohvatiti podatke handleLoadMore
 * -- I setovati ih u state
 * Sve podatke iz state proslediti komponenti GalleryPageComponent
 * 
 * 
 * Grid Galery - prikazati trenutnu datu
 * -- Na klik item otvoriti modal ( Pogledati primer u GridGallery.tsx )
 */

export default function Gallery() {
  const [query, setQuery] = useState('');

  const cmsClient = useCmsClient();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }
  const handleOnSubmit = async () => {
    console.log('query SUBMIT', query)
    const result = await cmsClient.get(`?search=${query}`);
  }

  const initialQuery = async () => {
    const res = await cmsClient.get(`?per_page=2`);
    console.log('REST RES', res)
  }
  const handleLoadMore = async () => {
    //Load more
  }
  useEffect(() => {
    const x = initialQuery()
  }, [])

  return (
    <div className={'main-wrapper '}>
      <Hero />
      <SearchBar value={query} onChange={handleOnChange} onSubmit={handleOnSubmit} />

      <Footer />

    </div>
  )
}