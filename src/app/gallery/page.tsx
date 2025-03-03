'use client'
import { useEffect, useState } from "react";
import SearchBar from "../components/elements/search-bar/SearchBar";
import Hero from "../components/hero/Hero";
import { Footer } from "../components/Footer/Footer";
import { useCmsClient } from "../client/restClient/cmsClient";
import GridGallery, { SingleCategory } from "../components/GridGallery/GridGallery";
import './styles.css'


export default function Gallery() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState([]);

  const cmsClient = useCmsClient();

  const handleCategoryChanges = (currentCategory: SingleCategory) => {
    if (activeCat.includes(currentCategory.id)) {
      setActiveCat(activeCat.filter((id) => id !== currentCategory.id))
    } else {
      setActiveCat([...activeCat, currentCategory.id])
    }
  }
  useEffect(() => {
    handleOnSubmit()
  }
    , [activeCat])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  const handleOnSubmit = async () => {

    const activeQuery = query && `&search=${query}`;
    const activeCategories = activeCat.length && `categories=${activeCat.join(',')}`;
    const queryString = [
      activeQuery,
      activeCategories,
      '_embed',
    ].filter(Boolean).join('&');

    const result = await cmsClient.get(`aldarian_nft/?${queryString}`);
    setData(result);
  }


  const handleLoadMore = async () => {
    const next = (data.length / 2) + 1;
    const res = await cmsClient.get(`aldarian_nft/?per_page=2&page=${next}&_embed`)
    setData([...data, ...res])
  }

  const fetchData = async () => {
    const catPromise = cmsClient.get(`categories`)
    const itemsPrimise = cmsClient.get(`aldarian_nft/?per_page=2&page=1&_embed`);
    try {
      const [cat, data] = await Promise.all([catPromise, itemsPrimise])
      console.log('data', data)
      setCategories(cat);
      setData(data)
    } catch (error) {
      console.log("Init data fetching Error", error)
    }
  }

  useEffect(() => {
    fetchData();

  }, []);

  return (
    <div className='main-wrapper gallery-page'>
      <Hero />
      <SearchBar value={query} onChange={handleOnChange} onSubmit={handleOnSubmit} />
      {data && <GridGallery
        activeCat={activeCat}
        nfts={data}
        handleLoadMore={handleLoadMore}
        categories={categories}
        handleCheckBox={handleCategoryChanges}
      />
      }
      <Footer />
    </div>
  )
}