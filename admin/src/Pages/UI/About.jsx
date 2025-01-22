import React from "react";
import AboutHero from "../../components/about/aboutHero";
import AboutFeatures from "../../components/about/AboutFeatures";

const About = () => {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutFeatures />
    </div>
  );
};

export default About;
