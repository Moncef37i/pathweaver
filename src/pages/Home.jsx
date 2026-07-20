import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  BarChart2,
  Map,
  Briefcase,
  FileText,
  Target,
  Award,
  GitBranch,
  ExternalLink,
  Link2,
  ArrowRight,
  PlayCircle
} from 'lucide-react';
import { testimonials } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  // Use mock testimonials if imported, otherwise provide safe fallbacks
  const displayTestimonials = testimonials?.length > 0 ? testimonials.slice(0, 4) : [
    { id: 1, text: "PathWeaver helped me land my dream job in tech! The roadmaps are incredibly accurate.", author: "Sarah J.", role: "Frontend Developer" },
    { id: 2, text: "I tracked all my learning progress here and built an amazing portfolio seamlessly.", author: "Michael T.", role: "Fullstack Engineer" },
    { id: 3, text: "The clearest path from beginner to pro I've ever seen. Highly recommended.", author: "Elena R.", role: "Data Scientist" },
    { id: 4, text: "Setting goals and hitting achievements kept me motivated the entire year.", author: "David K.", role: "UI/UX Designer" },
  ];

  return (
    <div className="home-page">
      {/* Background Elements */}
      <div className="home-bg-grid" />
      <div className="home-orb orb-1" />
      <div className="home-orb orb-2" />

      {/* Navigation */}
      <nav className="home-nav">
        <Link to="/" className="nav-logo">
          <Zap size={24} color="#a855f7" fill="#a855f7" />
          PathWeaver
        </Link>
        <div className="nav-links">
          <a href="#features">Features</a>
          <Link to="/roadmaps">Roadmaps</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="nav-actions">
          {user ? (
            <Link to="/dashboard" className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--purple-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold' }}>
                {user.avatar || 'U'}
              </div>
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn-ghost">Sign In</Link>
          )}
          <Link to={user ? "/dashboard" : "/login"} className="btn-primary">Get Started Free</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="home-section hero-section">
        <div className="hero-badge">
          🚀 New: AI-powered roadmaps
        </div>
        <h1 className="hero-title">
          Build Your Skills.<br />
          Track Your Progress.<br />
          <span className="text-gradient">Get Hired.</span>
        </h1>
        <p className="hero-subtitle">
          The ultimate platform for developers to map their career journey, build standout portfolios, and track learning progress all in one place.
        </p>
        
        <div className="hero-ctas">
          <Link to={user ? "/dashboard" : "/login"} className="btn-primary btn-large">
            Start for Free <ArrowRight size={20} />
          </Link>
          <button className="btn-large btn-outline">
            <PlayCircle size={20} /> View Demo
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">10K+</span>
            <span className="stat-label">Developers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">500+</span>
            <span className="stat-label">Skills</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">50+</span>
            <span className="stat-label">Roadmaps</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">95%</span>
            <span className="stat-label">Job Success</span>
          </div>
        </div>

        {/* Dashboard Floating Art */}
        <div className="dashboard-preview">
          <div className="dashboard-inner">
            <div className="dash-sidebar">
              <div className="dash-skeleton-text active" />
              <div className="dash-skeleton-text" />
              <div className="dash-skeleton-text" />
              <div className="dash-skeleton-text short" />
              <div style={{ marginTop: 'auto' }}>
                <div className="dash-skeleton-text" />
              </div>
            </div>
            <div className="dash-main">
              <div className="dash-header" />
              <div className="dash-grid">
                <div className="dash-card">
                  <div className="dash-skeleton-text active" style={{ width: '40%' }} />
                  <div>
                    <div className="dash-skeleton-text short" />
                    <div className="dash-bar"><div className="dash-bar-fill" /></div>
                  </div>
                  <div>
                    <div className="dash-skeleton-text short" />
                    <div className="dash-bar"><div className="dash-bar-fill purple" /></div>
                  </div>
                </div>
                <div className="dash-card">
                  <div className="dash-skeleton-text active" style={{ width: '60%' }} />
                  <div className="dash-skeleton-text" />
                  <div className="dash-skeleton-text" />
                  <div className="dash-skeleton-text short" />
                  <div className="dash-bar" style={{ marginTop: 'auto' }}><div className="dash-bar-fill blue" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="home-section">
        <div className="features-header">
          <h2>Everything you need to succeed</h2>
          <p>Powerful tools designed specifically for modern developers.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><BarChart2 size={28} /></div>
            <h3 className="feature-title">Progress Tracking</h3>
            <p className="feature-desc">Visualize your learning journey with detailed analytics and completion metrics across all your skills.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Map size={28} /></div>
            <h3 className="feature-title">Career Roadmaps</h3>
            <p className="feature-desc">Follow structured, industry-standard paths for Frontend, Backend, DevOps, and more to reach your goals faster.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Briefcase size={28} /></div>
            <h3 className="feature-title">Portfolio Builder</h3>
            <p className="feature-desc">Automatically generate a stunning portfolio based on your completed skills and projects.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><FileText size={28} /></div>
            <h3 className="feature-title">CV Builder</h3>
            <p className="feature-desc">Export professional resumes tailored to the specific roles you're applying for with one click.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Target size={28} /></div>
            <h3 className="feature-title">Goal Setting</h3>
            <p className="feature-desc">Set custom milestones and deadlines to keep yourself accountable and maintain a steady learning pace.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Award size={28} /></div>
            <h3 className="feature-title">Achievements</h3>
            <p className="feature-desc">Earn badges and certificates as you master new technologies and complete challenging roadmaps.</p>
          </div>
        </div>
      </section>

      {/* Big Stats */}
      <section className="home-section">
        <div className="big-stats-container">
          <div>
            <div className="big-stat-val text-gradient">2M+</div>
            <div className="big-stat-label">Skills Tracked</div>
          </div>
          <div>
            <div className="big-stat-val text-gradient">50k</div>
            <div className="big-stat-label">Active Users</div>
          </div>
          <div>
            <div className="big-stat-val text-gradient">99%</div>
            <div className="big-stat-label">Satisfaction</div>
          </div>
          <div>
            <div className="big-stat-val text-gradient">150+</div>
            <div className="big-stat-label">Countries</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-section testimonials-section">
        <div className="features-header">
          <h2>Loved by developers worldwide</h2>
          <p>See what our community has to say about PathWeaver.</p>
        </div>
        <div className="testimonials-grid">
          {displayTestimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.content || testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.avatar || (testimonial.name || testimonial.author || 'U').charAt(0)}
                </div>
                <div className="author-info">
                  <h4>{testimonial.name || testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="home-section">
        <div className="cta-banner">
          <h2>Ready to forge your future?</h2>
          <p>Join thousands of developers who are advancing their careers with PathWeaver today.</p>
          <div className="cta-buttons">
            <Link to={user ? "/dashboard" : "/login"} className="btn-primary btn-large">Get Started for Free</Link>
            <Link to="/pricing" className="btn-large btn-outline">View Pricing</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <Zap size={24} color="#a855f7" fill="#a855f7" />
              PathWeaver
            </Link>
            <p>Empowering the next generation of developers to build, track, and showcase their skills to the world.</p>
          </div>
          <div>
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/roadmaps">Roadmaps</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/changelog">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/documentation">Documentation</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/help">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PathWeaver Inc. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><ExternalLink size={20} /></a>
            <a href="#" aria-label="Github"><GitBranch size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Link2 size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
