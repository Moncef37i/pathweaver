import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Zap } from 'lucide-react';
import './Pricing.css';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Free',
      description: 'Perfect for getting started and organizing your learning journey.',
      price: 0,
      features: [
        'Up to 3 Skill Paths',
        'Basic progress tracking',
        'Community access',
        'Standard templates',
      ],
      notIncluded: ['Custom certificates', 'AI recommendations', 'Advanced analytics'],
      buttonText: 'Get Started',
      buttonVariant: 'outline'
    },
    {
      name: 'Pro',
      description: 'The ultimate toolkit for dedicated learners and professionals.',
      price: isAnnual ? 12 : 15,
      highlight: true,
      badge: 'Most Popular',
      features: [
        'Unlimited Skill Paths',
        'Advanced progress analytics',
        'AI-powered recommendations',
        'Premium CV Builder templates',
        'Priority support',
        'Custom certificates'
      ],
      notIncluded: [],
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'primary'
    },
    {
      name: 'Enterprise',
      description: 'For teams and organizations looking to upskill together.',
      price: isAnnual ? 49 : 59,
      features: [
        'Everything in Pro',
        'Team management',
        'Custom learning tracks',
        'SSO Integration',
        'Dedicated success manager',
        'API Access'
      ],
      notIncluded: [],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline'
    }
  ];

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Simple, transparent pricing</h1>
        <p>Choose the perfect plan to accelerate your learning and career growth.</p>
        
        <div className="billing-toggle">
          <span className={!isAnnual ? 'active' : ''}>Monthly</span>
          <button 
            className={`toggle-switch ${isAnnual ? 'annual' : 'monthly'}`}
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <div className="toggle-thumb"></div>
          </button>
          <span className={isAnnual ? 'active' : ''}>
            Annually <span className="save-badge">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="pricing-grid">
        {tiers.map((tier, index) => (
          <div key={index} className={`pricing-card ${tier.highlight ? 'highlight' : ''}`}>
            {tier.badge && <div className="pricing-badge">{tier.badge}</div>}
            
            <div className="tier-header">
              <h3>{tier.name}</h3>
              <p>{tier.description}</p>
            </div>

            <div className="tier-price">
              <span className="currency">$</span>
              <span className="amount">{tier.price}</span>
              <span className="period">/mo</span>
            </div>
            
            {isAnnual && tier.price > 0 && (
              <div className="annual-billing-text">Billed ${tier.price * 12} annually</div>
            )}

            <button className={`tier-btn ${tier.buttonVariant}`}>
              {tier.buttonText}
              {tier.highlight && <Zap size={16} className="btn-icon" />}
            </button>

            <div className="tier-features">
              <p className="features-title">What's included</p>
              <ul>
                {tier.features.map((feature, idx) => (
                  <li key={`feature-${idx}`} className="included">
                    <Check size={18} className="feature-icon check" />
                    <span>{feature}</span>
                  </li>
                ))}
                {tier.notIncluded.map((feature, idx) => (
                  <li key={`not-included-${idx}`} className="not-included">
                    <X size={18} className="feature-icon x" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pricing-faq-cta">
        <h2>Have questions?</h2>
        <p>Our team is here to help you choose the right plan for your needs.</p>
        <Link to="/contact" className="contact-link">Contact Support</Link>
      </div>
    </div>
  );
}
