import React from 'react';
import './AboutUs.css';
import Layout from '../components/Layout';

const AboutUs = () => {
  return (
    <Layout>
      <div className="about-page">
        <section className="about-hero">
          <div className="hero-content">
            <h1>Empowering developers, one challenge at a time,</h1>
            <p>Fuel your growth with curated coding challenges and level up your skills the fun way.</p>
          <a href="https://github.com/tijani-web" target="_blank" rel="noopener noreferrer">
            <button className="about-btn"><i className="fab fa-github"></i> GitHub</button>
          </a>
        </div>
      </section>

      <section className="info-cards">
        <div className="card glass-card">
          <h3>🧑‍💻 Practice</h3>
          <p>Sharpen your coding skills through real-world tasks across all difficulty levels.</p>
        </div>
        <div className="card glass-card">
          <h3>📈 Progress</h3>
          <p>Track your performance, earn XP, and grow steadily with every challenge you complete.</p>
        </div>
        <div className="card glass-card">
          <h3>💡 Purpose</h3>
          <p>Build a portfolio, gain confidence, and prepare for job-ready developer opportunities.</p>
        </div>
      </section>

      <section className="built-by glass-card">
        {/* <img src="/avatar.png" alt="Basit Tijani" className="profile-pic" /> */}
        <div>
          <h4>Built by Basit Tijani</h4>
          <p>
            On a mission to make learning to code delightful. A self-taught developer with a passion for clean UI, helpful tools, and creative dev communities.
          </p>
        </div>
      </section>
    </div>
  </Layout>
  );
};

export default AboutUs;
