import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-hero">
        <h1 className="about-title">About <span className="highlight">PathWeaver</span></h1>
        <p className="about-subtitle">Empowering developers to track their growth, build roadmaps, and land their dream jobs.</p>
      </header>

      <section className="about-section">
        <div className="about-content-block">
          <h2>Our Story</h2>
          <p>
            PathWeaver was born out of a simple observation: developers are constantly learning, but tracking that learning in a meaningful way is hard. We wanted a tool that not only records what we've learned but helps us plan what to learn next to reach our career goals.
          </p>
        </div>
        <div className="about-content-block">
          <h2>Our Mission</h2>
          <p>
            To provide the ultimate command center for developer careers. We bridge the gap between learning and getting hired by making skill tracking actionable and visible.
          </p>
        </div>
      </section>

      <section className="about-values">
        <h2>Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🚀</div>
            <h3>Continuous Growth</h3>
            <p>We believe learning never stops. We build tools that encourage and reward consistent progress.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">شف</div>
            <h3>Transparency</h3>
            <p>Clear goals, clear progress. We help developers see exactly where they stand and where to go.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Community First</h3>
            <p>We grow better together. PathWeaver is built for the developer community, guided by their feedback.</p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="team-card">
              <div className="team-avatar-placeholder"></div>
              <h3>Team Member {member}</h3>
              <p className="team-role">Role</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
