import React, { useState, useMemo } from 'react';
import { Search, Plus, X, Star, BookOpen, ExternalLink, ChevronRight, ArrowLeft } from 'lucide-react';
import { skills as initialSkills } from '../data/mockData';
import './Skills.css';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Design'];

const LEVEL_COLORS = {
  Advanced: '#8b5cf6',
  Intermediate: '#3b82f6',
  Beginner: '#f59e0b',
};

const ICONS = ['⚛️', '📘', '🟢', '🎨', '🐍', '🐘', '🐳', '◈', '▲', '🍃', '⚡', '☁️', '📋', '🎯', '💚', '🚀', '🔥', '💡', '🌐', '🔧'];

const Skills = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skills, setSkills] = useState(initialSkills);

  // Add skill form state
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Frontend',
    level: 'Beginner',
    progress: 0,
    icon: '⚡',
    description: '',
  });

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, skills]);

  const stats = useMemo(() => ({
    total: skills.length,
    advanced: skills.filter(s => s.level === 'Advanced').length,
    intermediate: skills.filter(s => s.level === 'Intermediate').length,
    beginner: skills.filter(s => s.level === 'Beginner').length,
  }), [skills]);

  const handleAddSkill = (e) => {
    e.preventDefault();
    const skill = {
      id: Date.now(),
      name: newSkill.name,
      category: newSkill.category,
      level: newSkill.level,
      progress: parseInt(newSkill.progress),
      icon: newSkill.icon,
      color: LEVEL_COLORS[newSkill.level] || '#8b5cf6',
      description: newSkill.description || `Learning ${newSkill.name}`,
      resources: [],
      yearsExp: 0,
    };
    setSkills(prev => [...prev, skill]);
    setIsAddModalOpen(false);
    setNewSkill({ name: '', category: 'Frontend', level: 'Beginner', progress: 0, icon: '⚡', description: '' });
  };

  return (
    <div className="skills-page">
      <div className="skills-header">
        <div>
          <h1>My Skills</h1>
          <p>Track your technical expertise and learning progress</p>
        </div>
        <button className="add-skill-btn" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={20} />
          <span>Add New Skill</span>
        </button>
      </div>

      <div className="skills-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Skills</div>
        </div>
        <div className="stat-card">
          <div className="stat-value advanced">{stats.advanced}</div>
          <div className="stat-label">Advanced</div>
        </div>
        <div className="stat-card">
          <div className="stat-value intermediate">{stats.intermediate}</div>
          <div className="stat-label">Intermediate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value beginner">{stats.beginner}</div>
          <div className="stat-label">Beginner</div>
        </div>
      </div>

      <div className="skills-controls">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-grid">
        {filteredSkills.length > 0 ? (
          filteredSkills.map(skill => (
            <div className="skill-card" key={skill.id} style={{ '--skill-color': skill.color }}>
              <div className="skill-card-top">
                <div className="skill-icon" style={{ backgroundColor: `${skill.color}20` }}>
                  {skill.icon}
                </div>
                <div className="skill-info">
                  <h3>{skill.name}</h3>
                  <div className="skill-tags">
                    <span className={`level-badge ${skill.level.toLowerCase()}`}>{skill.level}</span>
                    <span className="category-tag">{skill.category}</span>
                  </div>
                </div>
                <div className="circular-progress">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                      className="circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray={`${skill.progress}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="percentage">{skill.progress}%</span>
                </div>
              </div>
              <div className="linear-progress">
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${skill.progress}%` }}></div>
                </div>
              </div>
              <div className="skill-card-hover">
                <button className="view-details-btn" onClick={() => setSelectedSkill(skill)}>
                  View Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-skills-found">
            <p>No skills found matching your search.</p>
          </div>
        )}
      </div>

      {/* Skill Details Modal */}
      {selectedSkill && (
        <div className="modal-overlay" onClick={() => setSelectedSkill(null)}>
          <div className="modal-content skill-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{selectedSkill.icon}</div>
                <div>
                  <h2 style={{ margin: 0 }}>{selectedSkill.name}</h2>
                  <div className="skill-tags" style={{ marginTop: '0.3rem' }}>
                    <span className={`level-badge ${selectedSkill.level.toLowerCase()}`}>{selectedSkill.level}</span>
                    <span className="category-tag">{selectedSkill.category}</span>
                  </div>
                </div>
              </div>
              <button className="close-btn" onClick={() => setSelectedSkill(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="skill-detail-body">
              {/* Progress */}
              <div className="detail-section">
                <h4><Star size={16} /> Progress</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <div className="progress-bar-bg" style={{ flex: 1, height: '12px', borderRadius: '6px' }}>
                    <div className="progress-bar-fill" style={{ width: `${selectedSkill.progress}%`, height: '100%', background: `linear-gradient(90deg, ${selectedSkill.color}, #8b5cf6)`, borderRadius: '6px', transition: 'width 0.5s ease' }}></div>
                  </div>
                  <span style={{ color: selectedSkill.color, fontWeight: 700, fontSize: '1.2rem' }}>{selectedSkill.progress}%</span>
                </div>
              </div>

              {/* Description */}
              {selectedSkill.description && (
                <div className="detail-section">
                  <h4><BookOpen size={16} /> About this Skill</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.4rem' }}>{selectedSkill.description}</p>
                </div>
              )}

              {/* Experience */}
              <div className="detail-section">
                <h4>📅 Experience</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                  {selectedSkill.yearsExp >= 1
                    ? `${selectedSkill.yearsExp} year${selectedSkill.yearsExp > 1 ? 's' : ''} of experience`
                    : selectedSkill.yearsExp > 0
                    ? `${Math.round(selectedSkill.yearsExp * 12)} months of experience`
                    : 'Just getting started'}
                </p>
              </div>

              {/* Resources */}
              {selectedSkill.resources && selectedSkill.resources.length > 0 && (
                <div className="detail-section">
                  <h4><ExternalLink size={16} /> Learning Resources</h4>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedSkill.resources.map((res, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', padding: '0.4rem 0.6rem', background: 'var(--bg-hover)', borderRadius: '6px' }}>
                        <span style={{ color: selectedSkill.color }}>→</span> {res}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                  <ArrowLeft size={20} />
                </button>
                <h2 style={{ margin: 0 }}>Add New Skill</h2>
              </div>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <form className="add-skill-form" onSubmit={handleAddSkill}>
              <div className="form-group">
                <label>Skill Name *</label>
                <input
                  type="text"
                  placeholder="e.g., GraphQL"
                  value={newSkill.name}
                  onChange={e => setNewSkill(p => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Icon</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.3rem' }}>
                  {ICONS.map(icon => (
                    <button
                      type="button"
                      key={icon}
                      onClick={() => setNewSkill(p => ({ ...p, icon }))}
                      style={{
                        fontSize: '1.3rem', padding: '0.3rem 0.5rem',
                        borderRadius: '6px', cursor: 'pointer',
                        border: newSkill.icon === icon ? '2px solid var(--purple-primary)' : '2px solid transparent',
                        background: newSkill.icon === icon ? 'rgba(139,92,246,0.2)' : 'var(--bg-hover)',
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Category *</label>
                  <select value={newSkill.category} onChange={e => setNewSkill(p => ({ ...p, category: e.target.value }))} required>
                    {CATEGORIES.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Level *</label>
                  <select value={newSkill.level} onChange={e => setNewSkill(p => ({ ...p, level: e.target.value }))} required>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Progress: {newSkill.progress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.progress}
                  onChange={e => setNewSkill(p => ({ ...p, progress: e.target.value }))}
                  style={{ width: '100%', accentColor: 'var(--purple-primary)' }}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="What have you learned? What are you working on?"
                  value={newSkill.description}
                  onChange={e => setNewSkill(p => ({ ...p, description: e.target.value }))}
                  rows={3}
                  style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', resize: 'vertical' }}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Add Skill</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
