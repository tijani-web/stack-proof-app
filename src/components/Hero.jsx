import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroChallenge from './HeroChallenge';
import { FaUnlock } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Layout from './Layout';
import Footer from './Footer';

const Hero = () => {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.to('.ball-1', {
      x: 60,
      y: -30,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.ball-2', {
      x: -40,
      y: 25,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

  return (
    <>
      <div className="hero" ref={containerRef}>
        <div className="ball ball-1"></div>
        <div className="hero-content">
          <h1>Prove your skills beyond the resume</h1>
          <p>
            Your experience matters — but your ability to build matters more.
            Start with a challenge tailored just for you.
          </p>
          <div className="hero-cta">
            <NavLink to="/language-selector" className="btn-primary">Try Free Challenge <FaUnlock className='icon'/> </NavLink>
          </div>
        </div>
        <div className="ball ball-2"></div>
      </div>
      <HeroChallenge/>

      <Footer/>
      </>

    
  );
};

export default Hero;
