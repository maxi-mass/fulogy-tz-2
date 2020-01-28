import React from "react";
import Wrapper from "../src/components/Wrapper/Wrapper";
import Header from "../src/components/sections/Header/Header";
import Features from "../src/components/sections/Features/Features";
import Portfolio from "../src/components/sections/Portfolio/Portfolio";
import Slider from "../src/components/sections/Slider/Slider";
import AboutPrice from "../src/components/sections/AboutPrice/AboutPrice";
import LampConstructor from "../src/components/sections/LampConstructor/LampConstructor";

const Index = () => {
  return (
    <Wrapper>
      <Header />
      <Features />
      <Portfolio />
      <Slider />
      <AboutPrice />
      <LampConstructor />
    </Wrapper>
  );
};

export default Index;
