import React, { useState } from 'react';
import { 
  LayoutTemplate, Palette, Share2, Copy, ExternalLink, 
  Settings2, GripVertical, Rocket, Moon, Sun, Check,
  MonitorSmartphone, LayoutGrid, Image as ImageIcon
} from 'lucide-react';
import { user, skills, projects, achievements } from '../data/mockData';
import './Portfolio.css';

const TEMPLATES = [
  { id: 'minimal', name: 'Minimal', previewClass: 'prev-minimal' },
  { id: 'modern', name: 'Modern', previewClass: 'prev-modern' },
  { id: 'creative', name: 'Creative', previewClass: 'prev-creative' },
  { id: 'developer', name: 'Developer', previewClass: 'prev-developer' },
];

const COLORS = [
  { id: 'purple', value: 'var(--purple-primary)' },
  { id: 'blue', value: '#3b82f6' },
  { id: 'emerald', value: '#10b981' },
  { id: 'rose', value: '#f43f5e' }
];

export default function Portfolio() {
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [activeColor, setActiveColor] = useState('purple');
  const [toggles, setToggles] = useState({
    skills: true,
    projects: true,
    contact: true,
    darkMode: true
  });
  const [copied, setCopied] = useState(false);

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="portfolio-builder">
      {/* Header section */}
      <div className="pb-header">
        <div>
          <h1 className="pb-title">Portfolio Builder</h1>
          <p className="pb-subtitle">Customize and deploy your personal portfolio</p>
        </div>
        
        <div className="pb-actions">
          <div className="url-bar">
            <span className="url-text">pathweaver.io/p/alex-johnson</span>
            <button className="icon-btn" onClick={handleCopy} title="Copy URL">
              {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
            </button>
            <button className="icon-btn" title="Open in new tab">
              <ExternalLink size={16} />
            </button>
          </div>
          
          <button className="btn-secondary">
            <Share2 size={16} />
            Share
          </button>
          <button className="btn-primary gradient-btn">
            <Rocket size={16} />
            Deploy Portfolio
          </button>
        </div>
      </div>

      {/* Templates Selector */}
      <div className="templates-section">
        <h3 className="section-heading">
          <LayoutTemplate size={18} />
          Select Template
        </h3>
        <div className="templates-grid">
          {TEMPLATES.map(tpl => (
            <div 
              key={tpl.id} 
              className={`template-card ${activeTemplate === tpl.id ? 'active' : ''}`}
              onClick={() => setActiveTemplate(tpl.id)}
            >
              <div className={`template-preview-box ${tpl.previewClass}`}>
                {/* CSS Art representation of the template */}
                <div className="tp-header"></div>
                <div className="tp-body">
                  <div className="tp-block"></div>
                  <div className="tp-block sm"></div>
                </div>
              </div>
              <span className="template-name">{tpl.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="builder-layout">
        
        {/* Left: Customization Panel */}
        <div className="customization-panel card-glass">
          <div className="panel-header">
            <Settings2 size={18} />
            <h2>Customization</h2>
          </div>

          <div className="custom-section">
            <label className="custom-label">
              <Palette size={16} /> Color Scheme
            </label>
            <div className="color-picker">
              {COLORS.map(color => (
                <button
                  key={color.id}
                  className={`color-circle ${activeColor === color.id ? 'active' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setActiveColor(color.id)}
                />
              ))}
            </div>
          </div>

          <div className="custom-section">
            <label className="custom-label">
              <MonitorSmartphone size={16} /> Appearance
            </label>
            <div className="toggle-row">
              <span>Dark Mode</span>
              <button 
                className={`toggle-switch ${toggles.darkMode ? 'on' : 'off'}`}
                onClick={() => handleToggle('darkMode')}
              >
                <div className="toggle-thumb">
                  {toggles.darkMode ? <Moon size={12} /> : <Sun size={12} color="#000" />}
                </div>
              </button>
            </div>
          </div>

          <div className="custom-section">
            <label className="custom-label">
              <LayoutGrid size={16} /> Visible Sections
            </label>
            <div className="toggle-row">
              <span>Skills & Expertise</span>
              <button className={`toggle-switch ${toggles.skills ? 'on' : 'off'}`} onClick={() => handleToggle('skills')}>
                <div className="toggle-thumb"></div>
              </button>
            </div>
            <div className="toggle-row">
              <span>Featured Projects</span>
              <button className={`toggle-switch ${toggles.projects ? 'on' : 'off'}`} onClick={() => handleToggle('projects')}>
                <div className="toggle-thumb"></div>
              </button>
            </div>
            <div className="toggle-row">
              <span>Contact Information</span>
              <button className={`toggle-switch ${toggles.contact ? 'on' : 'off'}`} onClick={() => handleToggle('contact')}>
                <div className="toggle-thumb"></div>
              </button>
            </div>
          </div>

          <div className="custom-section">
            <label className="custom-label">
              <LayoutTemplate size={16} /> Section Order
            </label>
            <div className="reorder-list">
              <div className="reorder-item">
                <GripVertical size={16} className="drag-handle" /> Hero Profile
              </div>
              <div className="reorder-item">
                <GripVertical size={16} className="drag-handle" /> Skills & Expertise
              </div>
              <div className="reorder-item">
                <GripVertical size={16} className="drag-handle" /> Featured Projects
              </div>
              <div className="reorder-item">
                <GripVertical size={16} className="drag-handle" /> Contact
              </div>
            </div>
          </div>

        </div>

        {/* Right: Live Preview Panel */}
        <div className="preview-panel">
          <div className="browser-mockup">
            <div className="browser-header">
              <div className="browser-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-url">pathweaver.io/p/alex-johnson</div>
            </div>
            
            <div className={`browser-content ${toggles.darkMode ? 'theme-dark' : 'theme-light'}`}>
              <div className={`preview-canvas tpl-${activeTemplate}`} style={{ '--theme-color': COLORS.find(c => c.id === activeColor)?.value }}>
                
                {/* Preview: Hero Section */}
                <div className="prev-section prev-hero">
                  <div className="prev-avatar">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <h1 className="prev-name">{user?.name || 'Alex Johnson'}</h1>
                  <h3 className="prev-title">{user?.title || 'Full Stack Developer'}</h3>
                  <p className="prev-bio">Passionate developer building modern web applications with a focus on user experience and scalable architecture.</p>
                  <div className="prev-socials">
                    <button className="prev-btn-primary">Hire Me</button>
                    <button className="prev-btn-outline">View Resume</button>
                  </div>
                </div>

                {/* Preview: Skills */}
                {toggles.skills && (
                  <div className="prev-section prev-skills">
                    <h2 className="prev-heading">Technical Skills</h2>
                    <div className="prev-skills-grid">
                      {skills?.slice(0, 6).map((skill, idx) => (
                        <div key={idx} className="prev-skill-badge">
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview: Projects */}
                {toggles.projects && (
                  <div className="prev-section prev-projects">
                    <h2 className="prev-heading">Featured Projects</h2>
                    <div className="prev-projects-grid">
                      {projects?.slice(0, 2).map((proj, idx) => (
                        <div key={idx} className="prev-project-card">
                          <div className="prev-project-img">
                            <ImageIcon size={24} className="img-placeholder" />
                          </div>
                          <div className="prev-project-info">
                            <h4>{proj.title}</h4>
                            <p>{proj.description.substring(0, 50)}...</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview: Contact */}
                {toggles.contact && (
                  <div className="prev-section prev-contact">
                    <h2 className="prev-heading">Get In Touch</h2>
                    <div className="prev-contact-box">
                      <p>hello@example.com</p>
                      <button className="prev-btn-primary">Send Message</button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
