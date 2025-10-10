import React from 'react';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Services from './Services';
import WhyUs from './WhyUs';
import Stats from './Stats';
import Contact from './Contact';
import ErrorBoundary from './ErrorBoundary';

const HomePage: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <AboutUs />
      <ErrorBoundary>
        <Services />
      </ErrorBoundary>
      <WhyUs />
      <Stats />
      <Contact />
    </>
  );
};

export default HomePage;