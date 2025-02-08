'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { TextComponent } from "./components/TextComponent";
import './styles/main.css'
import FullSlider from "./components/FullSlider";
import Hero from "./components/hero/Hero";
import ParallaxSection from "./components/ParalaxSection/ParalaxSection";
import GridGallery from "./components/GridGallery/GridGallery";
import AnimatedText from "./components/Animate/AnimatedText";

import { useState } from "react";
import { Footer } from "./components/Footer/Footer";
export default function Home() {

  const [heightValue, setHeightValue] = useState<number>(0);

  const handleFooterHeight = (height: number) => {
    setHeightValue(height);
  };
  console.log('heightValue', heightValue);
  return (
    <>
      <div className={'main-wrapper'}>
        <Hero />
        <FullSlider />
        <ParallaxSection />
        {/* <TextComponent /> */}
        <AnimatedText />
        <GridGallery />
        <Footer />
        {/* <FooterCurtain /> */}
      </div>
    </>
  );
}
