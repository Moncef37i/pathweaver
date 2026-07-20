import React, { useState } from 'react';
import { Map, BookOpen, Clock, CheckCircle, Target, ArrowRight, X, Lock, RefreshCw } from 'lucide-react';
import { roadmaps } from '../data/mockData';
import './Roadmaps.css';

const CircularProgress = ({ progress, color }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-container" style={{ width: 64, height: 64 }}>
      <svg width="64" height="64">
        <circle
          cx="32" cy="32" r={radius}
          stroke="var(--border)"
          strokeWidth="5" fill="none"
        />
        <circle
          cx="32" cy="32" r={radius}
          stroke={color}
          strokeWidth="5" fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div className="circular-progress-text">{progress}%</div>
    </div>
  );
};

const Roadmaps = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const totalRoadmaps = roadmaps.length;
  const completedRoadmaps = roadmaps.filter(r => r.progress === 100).length;
  const inProgressRoadmaps = roadmaps.filter(r => r.progress > 0 && r.progress < 100).length;

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'DevOps', 'Design'];

  const filteredRoadmaps = activeFilter === 'All' 
    ? roadmaps 
    : roadmaps.filter(r => r.title.includes(activeFilter) || (activeFilter === 'Design' && r.title.includes('UI/UX')));

  const handleOpenModal = (roadmap) => {
    setSelectedRoadmap(roadmap);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedRoadmap(null);
    document.body.style.overflow = 'auto';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={16} color="#10b981" />;
      case 'in-progress': return <RefreshCw size={16} color="#f59e0b" />;
      case 'locked': return <Lock size={16} color="#64748b" />;
      default: return null;
    }
  };

  return (
    <div className="roadmaps-page">
      <div className="roadmaps-header">
        <h1>Learning Roadmaps</h1>
        <p className="roadmaps-subtitle">Follow structured paths to master new roles and technologies.</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)' }}>
            <Map size={24} />
          </div>
          <div className="stat-info">
            <h3>{totalRoadmaps}</h3>
            <p>Available Paths</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>{completedRoadmaps}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>
            <Target size={24} />
          </div>
          <div className="stat-info">
            <h3>{inProgressRoadmaps}</h3>
            <p>In Progress</p>
          </div>
        </div>
      </div>

      <div className="filter-tabs">
        {categories.map(category => (
          <button 
            key={category}
            className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="roadmaps-grid">
        {filteredRoadmaps.map((roadmap) => (
          <div key={roadmap.id} className="roadmap-card">
            <div className="roadmap-card-bg-glow" style={{ background: roadmap.color }}></div>
            
            <div className="roadmap-card-header">
              <div className="roadmap-title-group">
                <div className="roadmap-icon">{roadmap.icon}</div>
                <div>
                  <h2>{roadmap.title}</h2>
                  <span>{roadmap.completedSkills} / {roadmap.totalSkills} Skills Completed</span>
                </div>
              </div>
              <CircularProgress progress={roadmap.progress} color={roadmap.color} />
            </div>

            <p className="roadmap-description">{roadmap.description}</p>

            <div className="roadmap-skills-preview">
              <div className="skills-preview-title">Up Next</div>
              <div className="skills-badges">
                {roadmap.skills.slice(0, 4).map((skill, idx) => (
                  <span key={idx} className={`skill-badge ${skill.status}`}>
                    {getStatusIcon(skill.status)}
                    {skill.name}
                  </span>
                ))}
                {roadmap.skills.length > 4 && (
                  <span className="skill-badge locked">+{roadmap.skills.length - 4} more</span>
                )}
              </div>
            </div>

            <button 
              className="roadmap-action" 
              style={{ background: roadmap.progress > 0 ? roadmap.color : 'rgba(255,255,255,0.1)', color: 'white' }}
              onClick={() => handleOpenModal(roadmap)}
            >
              {roadmap.progress > 0 ? 'Continue Roadmap' : 'Start Roadmap'}
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>

      {selectedRoadmap && (
        <div className="roadmap-modal-overlay" onClick={handleCloseModal}>
          <div className="roadmap-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-bg" style={{ background: `linear-gradient(135deg, ${selectedRoadmap.color}, transparent)` }}></div>
              <button className="modal-close" onClick={handleCloseModal}><X size={20} /></button>
              
              <div className="modal-icon">{selectedRoadmap.icon}</div>
              <div className="modal-title-content">
                <h2>{selectedRoadmap.title}</h2>
                <div style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  {selectedRoadmap.completedSkills} of {selectedRoadmap.totalSkills} skills completed
                </div>
                <div className="modal-progress-bar">
                  <div 
                    className="modal-progress-fill" 
                    style={{ width: `${selectedRoadmap.progress}%`, background: selectedRoadmap.color }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="modal-body">
              {Object.entries(
                selectedRoadmap.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {})
              ).map(([category, skills]) => {
                const completedInCategory = skills.filter(s => s.status === 'completed').length;
                const categoryProgress = Math.round((completedInCategory / skills.length) * 100);

                return (
                  <div key={category} className="category-section">
                    <div className="category-header">
                      <h3>{category}</h3>
                      <div className="category-progress">
                        <span>{completedInCategory}/{skills.length}</span>
                        <div className="mini-progress-bar">
                          <div 
                            className="mini-progress-fill" 
                            style={{ width: `${categoryProgress}%`, background: selectedRoadmap.color }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="skills-list">
                      {skills.map((skill, idx) => (
                        <div key={idx} className="skill-item">
                          <div className="skill-status-icon">
                            {getStatusIcon(skill.status)}
                          </div>
                          <span className="skill-name">{skill.name}</span>
                          <span className={`skill-status-text ${skill.status}`}>
                            {skill.status.replace('-', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmaps;
