'use client'
import { useEffect, useState } from "react";
import SearchBar from "../components/elements/search-bar/SearchBar";
import Hero from "../components/hero/Hero";
import { Footer } from "../components/Footer/Footer";
import { useCmsClient } from "../client/restClient/cmsClient";

export default function Gallery() {
  const [query, setQuery] = useState('');

  const cmsClient = useCmsClient();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }
  const handleOnSubmit = async () => {
    console.log('query SUBMIT', query)
    const result = await cmsClient.get(`?search=${query}`);
    console.log('REST SEARCH RES', result)
  }

  const testClient = async () => {
    const res = await cmsClient.get(``);
    console.log('REST RES', res)
  }
  useEffect(() => {
    const x = testClient()
  }, [])
  return (
    <div className={'main-wrapper '}>
      <Hero />
      <SearchBar value={query} onChange={handleOnChange} onSubmit={handleOnSubmit} />

      <Footer />

    </div>
  )
}