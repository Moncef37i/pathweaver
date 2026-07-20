import React, { useState } from 'react';
import {
  MapPin, Calendar, GitBranch, Link2, Globe,
  Edit3, Clock, Briefcase, Award, Zap, Mail, Phone,
  Target, Activity, ExternalLink, Star, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { user, stats, skills, projects, achievements } from '../data/mockData';
import './Profile.css';

const RARITY_COLORS = {
  Common: '#6b7280',
  Uncommon: '#10b981',
  Rare: '#3b82f6',
  Epic: '#8b5cf6',
  Legendary: '#f59e0b',
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'activity', label: 'Activity' },
  ];

  const skillChartData = skills.slice(0, 6).map(skill => ({
    name: skill.name,
    progress: skill.progress,
    color: skill.color,
  }));

  const recentActivity = [
    { icon: '⚛️', text: 'Advanced React progress to 85%', time: '2 hours ago', color: '#61DAFB' },
    { icon: '⚡', text: 'Updated PathWeaver project to 72%', time: '5 hours ago', color: '#7C3AED' },
    { icon: '🎯', text: 'Achieved TypeScript milestone (70%)', time: '1 day ago', color: '#3178C6' },
    { icon: '⚡', text: 'Earned "Speed Learner" badge', time: '2 days ago', color: '#f59e0b' },
    { icon: '✅', text: 'Completed REST API Design in Backend roadmap', time: '3 days ago', color: '#10b981' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="overview-grid"
          >
            <motion.div 
              className="card"
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.2)' }}
            >
              <h3 className="card-title"><Target size={20} /> Overall Progress</h3>
              <div className="radial-chart-container">
                <div className="radial-circle">
                  <svg viewBox="0 0 180 180">
                    <defs>
                      <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <circle className="radial-bg" cx="90" cy="90" r="75" />
                    <motion.circle
                      className="radial-progress"
                      cx="90" cy="90" r="75"
                      initial={{ strokeDashoffset: 2 * Math.PI * 75 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 75 * (1 - 0.68) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      style={{ strokeDasharray: 2 * Math.PI * 75 }}
                    />
                  </svg>
                  <div className="radial-text">
                    <motion.div 
                      className="radial-value"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >68%</motion.div>
                    <div className="radial-label">Overall</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="card"
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)' }}
            >
              <h3 className="card-title"><Zap size={20} /> Top Skills</h3>
              <div style={{ height: '220px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillChartData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} width={80} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ background: '#1f2937', border: 'none', borderRadius: '8px', color: '#f3f4f6' }}
                      formatter={(value) => [`${value}%`, 'Progress']}
                    />
                    <Bar dataKey="progress" radius={[0, 4, 4, 0]} barSize={14}>
                      {skillChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || '#8b5cf6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div 
            key="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            <h3 className="card-title"><Zap size={20} /> All Skills ({skills.length})</h3>
            <div className="skills-grid">
              {skills.map((skill, idx) => (
                <motion.div 
                  key={idx} 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="skill-header">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                      <span style={{ fontSize: '0.7rem', background: `${skill.color}20`, color: skill.color, padding: '0.1rem 0.4rem', borderRadius: '10px' }}>{skill.level}</span>
                    </span>
                    <span className="skill-level">{skill.progress}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <motion.div 
                      className="skill-bar-fill" 
                      style={{ background: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'projects':
        return (
          <motion.div 
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            <h3 className="card-title"><Briefcase size={20} /> Projects ({projects.length})</h3>
            <div className="projects-grid">
              {projects.map((project, idx) => (
                <motion.div 
                  key={idx} 
                  className="project-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5, boxShadow: `0 10px 30px ${project.color}30` }}
                >
                  <div className="project-header" style={{ borderLeft: `4px solid ${project.color}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.3rem' }}>{project.image}</span>
                      <div>
                        <div className="project-title">{project.title}</div>
                        <span style={{ fontSize: '0.7rem', background: project.status === 'Completed' ? 'rgba(16,185,129,0.15)' : project.status === 'In Progress' ? 'rgba(59,130,246,0.15)' : 'rgba(107,114,128,0.15)', color: project.status === 'Completed' ? '#10b981' : project.status === 'In Progress' ? '#3b82f6' : '#6b7280', padding: '0.1rem 0.5rem', borderRadius: '10px' }}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {project.github && (
                        <motion.a whileHover={{ scale: 1.1 }} href={project.github} target="_blank" rel="noopener noreferrer" className="icon-btn" style={{ width: '30px', height: '30px' }}>
                          <GitBranch size={14} />
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a whileHover={{ scale: 1.1 }} href={project.demo} target="_blank" rel="noopener noreferrer" className="icon-btn" style={{ width: '30px', height: '30px' }}>
                          <ExternalLink size={14} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  <div className="project-desc">{project.description}</div>
                  <div className="project-tech">
                    {(project.technologies || []).map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  {project.progress < 100 && (
                    <div style={{ marginTop: '0.6rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                        <span>Progress</span><span>{project.progress}%</span>
                      </div>
                      <div style={{ background: 'var(--bg-hover)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                        <motion.div 
                          style={{ height: '100%', background: project.color, borderRadius: '4px' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'achievements':
        return (
          <motion.div 
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            <h3 className="card-title"><Award size={20} /> Achievements ({achievements.filter(a => a.earned).length}/{achievements.length})</h3>
            <div className="achievements-grid">
              {achievements.map((ach, idx) => (
                <motion.div 
                  key={idx} 
                  className={`achievement-card ${!ach.earned ? 'locked' : ''}`} 
                  title={ach.description}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={ach.earned ? { scale: 1.05, rotate: [0, -5, 5, -5, 0] } : {}}
                >
                  <div className="achievement-icon" style={{ opacity: ach.earned ? 1 : 0.4 }}>{ach.icon}</div>
                  <div className="achievement-title">{ach.title}</div>
                  <div className="achievement-date" style={{ color: RARITY_COLORS[ach.rarity] }}>{ach.rarity}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    {ach.earned ? `✓ ${ach.date}` : '🔒 Locked'}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#f59e0b' }}>+{ach.xp} XP</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'activity':
        return (
          <motion.div 
            key="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            <h3 className="card-title"><Activity size={20} /> Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {recentActivity.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', padding: '0.8rem', borderRadius: '10px', background: 'var(--bg-hover)' }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.text}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'SM';

  return (
    <div className="profile-page">
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'transparent', 
          border: 'none', 
          padding: '0 0 1rem 0', 
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          width: 'fit-content',
          fontSize: '0.9rem',
          fontWeight: 500,
          transition: 'color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <ArrowLeft size={16} /> Back
      </button>
      <div className="profile-header-card">
        <div className="profile-cover"></div>
        <div className="profile-header-content">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-actions">
              {user?.github && (
                <a href={user.github} target="_blank" rel="noopener noreferrer" className="icon-btn" title="GitHub">
                  <GitBranch size={18} />
                </a>
              )}
              {user?.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" title="LinkedIn">
                  <Link2 size={18} />
                </a>
              )}
              {user?.website && (
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="icon-btn" title="Portfolio">
                  <Globe size={18} />
                </a>
              )}
              <button className="btn btn-secondary">
                <Edit3 size={16} /> Edit Profile
              </button>
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-name-row">
              <h1 className="profile-name">{user?.name || 'Souilah Moncef'}</h1>
              <span className="badge badge-pro">🚀 Developer</span>
            </div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{user?.title}</h2>

            <div className="profile-meta">
              <div className="meta-item"><MapPin size={14} /> {user?.location || 'Bab Ezzouar, Algeria'}</div>
              <div className="meta-item"><Calendar size={14} /> Joined {user?.joinDate}</div>
              {user?.email && <div className="meta-item"><Mail size={14} /> {user.email}</div>}
              {user?.phone && <div className="meta-item"><Phone size={14} /> {user.phone}</div>}
            </div>

            <p className="profile-bio">{user?.bio}</p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
              {user?.github && (
                <a href={user.github} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', padding: '0.3rem 0.7rem', borderRadius: '20px', background: 'var(--bg-hover)', border: '1px solid var(--border)' }}>
                  <GitBranch size={13} /> GitHub
                </a>
              )}
              {user?.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', padding: '0.3rem 0.7rem', borderRadius: '20px', background: 'var(--bg-hover)', border: '1px solid var(--border)' }}>
                  <Link2 size={13} /> LinkedIn
                </a>
              )}
              {user?.website && (
                <a href={user.website} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', padding: '0.3rem 0.7rem', borderRadius: '20px', background: 'var(--bg-hover)', border: '1px solid var(--border)' }}>
                  <Globe size={13} /> Portfolio
                </a>
              )}
            </div>
          </div>

          <div className="profile-stats-row">
            <div className="stat-item">
              <div className="stat-icon"><Clock size={22} /></div>
              <div className="stat-details">
                <span className="stat-value">{stats?.learningHours || 0}h</span>
                <span className="stat-label">Learning Hours</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><Briefcase size={22} /></div>
              <div className="stat-details">
                <span className="stat-value">{projects?.length || 0}</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><Zap size={22} /></div>
              <div className="stat-details">
                <span className="stat-value">{skills?.length || 0}</span>
                <span className="stat-label">Skills</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><Award size={22} /></div>
              <div className="stat-details">
                <span className="stat-value">{achievements?.filter(a => a.earned).length || 0}</span>
                <span className="stat-label">Badges Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
          </div>
        </div>

        <div className="sidebar">
          <div className="card level-card">
            <div className="level-badge">Lv.23</div>
            <div className="level-title">Intermediate Dev</div>
            <div className="level-xp">3,450 / 5,000 XP</div>
            <div className="xp-bar">
              <div className="xp-fill" style={{ width: '69%' }}></div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>1,550 XP to next level</p>
          </div>

          <div className="card streak-card">
            <div className="streak-icon">🔥</div>
            <div className="streak-info">
              <span className="streak-value">{user?.streak || 23} Days</span>
              <span className="streak-label">Current Learning Streak</span>
            </div>
          </div>

          <div className="card" style={{ padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.8rem', fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Star size={16} color="#f59e0b" /> Recent Badges
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {achievements.filter(a => a.earned).slice(0, 5).map((ach, i) => (
                <div key={i} title={`${ach.title}: ${ach.description}`}
                  style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', cursor: 'pointer', border: `1px solid ${RARITY_COLORS[ach.rarity]}40` }}>
                  {ach.icon}
                </div>
              ))}
            </div>
          </div>

          <div className="card goal-card">
            <div className="goal-header">
              <h3 className="card-title" style={{ margin: 0 }}><Target size={18} /> Next Goal</h3>
              <span className="goal-progress">80%</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.5rem 0' }}>
              Master React Advanced Patterns
            </p>
            <div className="skill-bar-bg" style={{ marginTop: '0.5rem' }}>
              <div className="skill-bar-fill" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
