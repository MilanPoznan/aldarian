'use client'
import { useEffect, useState } from "react";
import SearchBar from "../components/elements/search-bar/SearchBar";
import Hero from "../components/hero/Hero";
import { Footer } from "../components/Footer/Footer";
import { useCmsClient } from "../client/restClient/cmsClient";
import GridGallery from "../components/GridGallery/GridGallery";
import CmsClient from "../providers/restProvider";
import './styles.css'

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
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const cmsClient = useCmsClient();

  const cmsClientAllCategories = new CmsClient("http://admin.thealdarian.com/wp-json/wp/v2");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  const handleOnSubmit = async () => {

    const result = await cmsClient.get(`?search=${query}&_embed`);
    setData(result);
  }

  const initialQuery = async () => {
    const res = await cmsClient.get(`?per_page=2&page=1&_embed`);
    setData(res);
  }

  const handleLoadMore = async () => {
    //Load more
    const next = (data.length / 2 ) + 1;
    const res = await cmsClient.get(`?per_page=2&page=${next}&_embed`)
    setData([...data, ...res])
  }

  const handleCheckBox = async (id: number) => {
    const res = await cmsClient.get(`?categories=${id}&_embed`)
    setData(res);
  }

  useEffect(() => {
    const allCategories = async () => {
      const res = await cmsClientAllCategories.get(`categories`);
      setCategories(res);
    }

    initialQuery();
    allCategories();

  }, [])
 
  return (
    <div className='main-wrapper gallery-page'>
      <Hero />
      <SearchBar value={query} onChange={handleOnChange} onSubmit={handleOnSubmit} />
      <GridGallery 
        nfts={data} 
        handleLoadMore={handleLoadMore} 
        categories={categories} 
        handleCheckBox={handleCheckBox}
        initialQuery={initialQuery}/>
      <Footer />
    </div>
  )
}