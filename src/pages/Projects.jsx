import React, { useState } from 'react';
import { Plus, GitBranch, ExternalLink, Calendar, CheckCircle, Clock, Layout, X, ArrowLeft } from 'lucide-react';
import { projects as initialProjects } from '../data/mockData';
import './Projects.css';

const COLORS = ['#7C3AED', '#059669', '#2563EB', '#DC2626', '#0891B2', '#F59E0B', '#EC4899', '#8B5CF6'];
const STATUS_OPTIONS = ['Planning', 'In Progress', 'Completed'];
const TECH_OPTIONS = ['React', 'Vue.js', 'Angular', 'Next.js', 'Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'TypeScript', 'JavaScript', 'Docker', 'AWS', 'Firebase', 'Stripe', 'GraphQL', 'REST API'];

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projectsList, setProjectsList] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'Planning',
    progress: 0,
    color: '#7C3AED',
    image: '🚀',
    github: '',
    demo: '',
    technologies: [],
    startDate: '2026-07-20',
  });
  const [techInput, setTechInput] = useState('');

  const safeProjects = projectsList || [];

  const stats = {
    total: safeProjects.length,
    completed: safeProjects.filter(p => p.status === 'Completed').length,
    inProgress: safeProjects.filter(p => p.status === 'In Progress').length,
    planning: safeProjects.filter(p => p.status === 'Planning').length
  };

  const filteredProjects = safeProjects.filter(p => filter === 'All' || p.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-progress';
      case 'Planning': return 'status-planning';
      default: return '';
    }
  };

  const handleAddTech = (tech) => {
    if (!newProject.technologies.includes(tech)) {
      setNewProject(p => ({ ...p, technologies: [...p.technologies, tech] }));
    }
    setTechInput('');
  };

  const handleRemoveTech = (tech) => {
    setNewProject(p => ({ ...p, technologies: p.technologies.filter(t => t !== tech) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const proj = {
      ...newProject,
      id: Date.now(),
      progress: parseInt(newProject.progress),
      github: newProject.github || null,
      demo: newProject.demo || null,
    };
    setProjectsList(prev => [...prev, proj]);
    setIsModalOpen(false);
    setNewProject({ title: '', description: '', status: 'Planning', progress: 0, color: '#7C3AED', image: '🚀', github: '', demo: '', technologies: [], startDate: '2026-07-20' });
  };

  const EMOJIS = ['🚀', '🌐', '🍽️', '⚡', '🛒', '🤖', '🌤️', '💡', '📊', '🔧', '🎯', '💎'];

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div className="header-content">
          <h1>Projects</h1>
          <p>Manage and track your portfolio projects</p>
        </div>
        <button className="new-project-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      <div className="projects-stats">
        <div className="stat-card">
          <div className="stat-icon-wrapper total"><Layout size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Projects</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper completed"><CheckCircle size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{stats.completed}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper progress"><Clock size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{stats.inProgress}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper planning"><Calendar size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Planning</span>
            <span className="stat-value">{stats.planning}</span>
          </div>
        </div>
      </div>

      <div className="projects-filters">
        {['All', 'In Progress', 'Completed', 'Planning'].map(tab => (
          <button
            key={tab}
            className={`filter-tab ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div className="project-card" key={project.id}>
            <div
              className="project-banner"
              style={{ background: project.color || 'var(--gradient-primary)' }}
            >
              <div className="project-icon">{project.image || project.icon || '🚀'}</div>
              <div className={`project-status-badge ${getStatusColor(project.status)}`}>
                {project.status}
              </div>
            </div>

            <div className="project-content">
              <h3>{project.title}</h3>
              <p className="project-desc">{project.description}</p>

              <div className="project-tags">
                {(project.technologies || project.tech || []).slice(0, 4).map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-progress-section">
                <div className="progress-header">
                  <span>Progress</span>
                  <span>{project.progress || 0}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${project.progress || 0}%`,
                      background: project.color || 'var(--purple-primary)'
                    }}
                  ></div>
                </div>
              </div>

              <div className="project-footer">
                <div className="project-date">
                  <Calendar size={14} />
                  <span>{project.startDate || 'No date'}</span>
                </div>

                <div className="project-actions">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="icon-btn" title="GitHub Repository">
                      <GitBranch size={18} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="demo-btn">
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <Layout size={48} className="empty-icon" />
            <h3>No projects found</h3>
            <p>Try changing your filter or create a new project.</p>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                  <ArrowLeft size={20} />
                </button>
                <h2 style={{ margin: 0 }}>New Project</h2>
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label>Project Name *</label>
                <input type="text" placeholder="My Awesome Project" value={newProject.title} onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="What does this project do?" value={newProject.description} onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))} rows={3} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-hover)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', resize: 'vertical' }} />
              </div>

              {/* Emoji picker */}
              <div className="form-group">
                <label>Icon</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.3rem' }}>
                  {EMOJIS.map(em => (
                    <button type="button" key={em} onClick={() => setNewProject(p => ({ ...p, image: em }))}
                      style={{ fontSize: '1.3rem', padding: '0.3rem 0.5rem', borderRadius: '6px', cursor: 'pointer', border: newProject.image === em ? '2px solid var(--purple-primary)' : '2px solid transparent', background: newProject.image === em ? 'rgba(139,92,246,0.2)' : 'var(--bg-hover)' }}>
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color picker */}
              <div className="form-group">
                <label>Color</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                  {COLORS.map(c => (
                    <button type="button" key={c} onClick={() => setNewProject(p => ({ ...p, color: c }))}
                      style={{ width: '30px', height: '30px', borderRadius: '50%', background: c, border: newProject.color === c ? '3px solid white' : '3px solid transparent', cursor: 'pointer' }} />
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Status</label>
                  <select value={newProject.status} onChange={e => setNewProject(p => ({ ...p, status: e.target.value }))}>
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Progress: {newProject.progress}%</label>
                  <input type="range" min="0" max="100" value={newProject.progress} onChange={e => setNewProject(p => ({ ...p, progress: e.target.value }))} style={{ width: '100%', accentColor: 'var(--purple-primary)', marginTop: '0.5rem' }} />
                </div>
              </div>

              {/* Technologies */}
              <div className="form-group">
                <label>Technologies</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  {newProject.technologies.map(tech => (
                    <span key={tech} style={{ background: 'rgba(139,92,246,0.2)', color: 'var(--purple-primary)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {tech}
                      <button type="button" onClick={() => handleRemoveTech(tech)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {TECH_OPTIONS.filter(t => !newProject.technologies.includes(t)).slice(0, 10).map(tech => (
                    <button type="button" key={tech} onClick={() => handleAddTech(tech)}
                      style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      + {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input type="url" placeholder="https://github.com/..." value={newProject.github} onChange={e => setNewProject(p => ({ ...p, github: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Demo URL</label>
                  <input type="url" placeholder="https://..." value={newProject.demo} onChange={e => setNewProject(p => ({ ...p, demo: e.target.value }))} />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
