import React from "react";
import Wrapper from "../src/components/Wrapper/Wrapper";
import Header from "../src/components/sections/Header/Header";
import Features from "../src/components/sections/Features/Features";
import Portfolio from "../src/components/sections/Portfolio/Portfolio";

const Index = () => {
  return (
    <Wrapper>
      <Header />
      <Features />
      <Portfolio />
    </Wrapper>
  );
};

export default Index;
