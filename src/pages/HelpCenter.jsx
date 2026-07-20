import React, { useState } from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { question: 'How do I track a new skill?', answer: 'Navigate to the Dashboard and click the "Add Skill" button. You can then select from predefined skills or create a custom one.' },
    { question: 'Can I export my portfolio?', answer: 'Yes, go to the Portfolio Builder section and click the "Export PDF" or "Share Link" button at the top right.' },
    { question: 'How do I change my subscription plan?', answer: 'Go to Settings > Billing. From there, you can view your current plan and upgrade or downgrade as needed.' },
    { question: 'Are my roadmaps public?', answer: 'By default, roadmaps are private. You can change the visibility settings in the Roadmap editor to share them with the community.' }
  ];

  const categories = [
    { icon: '🚀', title: 'Getting Started', desc: 'Basics on how to use PathWeaver' },
    { icon: '⚙️', title: 'Account Settings', desc: 'Manage your profile and preferences' },
    { icon: '💳', title: 'Billing', desc: 'Invoices, plans, and payments' },
    { icon: '🗺️', title: 'Roadmaps', desc: 'Creating and managing learning paths' }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="help-container">
      <header className="help-hero">
        <h1>How can we help you?</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for articles, tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </header>

      <section className="help-categories">
        {categories.map((cat, idx) => (
          <div key={idx} className="category-card">
            <div className="category-icon">{cat.icon}</div>
            <h3>{cat.title}</h3>
            <p>{cat.desc}</p>
          </div>
        ))}
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(idx)}>
                <h3>{faq.question}</h3>
                <span className="faq-toggle">{activeFaq === idx ? '−' : '+'}</span>
              </div>
              {activeFaq === idx && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="contact-support">
        <div className="contact-card">
          <h2>Still need help?</h2>
          <p>Our support team is always ready to assist you.</p>
          <button className="contact-btn">Contact Support</button>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
