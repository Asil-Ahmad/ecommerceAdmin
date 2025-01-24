import React from "react";
import AboutHero from "../../components/about/aboutHero";
import AboutFeatures from "../../components/about/AboutFeatures";
import AboutPage3 from "../../components/about/aboutPage3";

const About = () => {
  return (
    <div className='flex flex-col'>
      <AboutHero />
      <AboutFeatures />
      <AboutPage3 />
    </div>
  );
};

export default About;
