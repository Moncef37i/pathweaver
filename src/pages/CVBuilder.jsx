import React, { useState, useRef } from 'react';
import {
  User, Mail, Phone, MapPin, Globe, Briefcase,
  GraduationCap, Code, ChevronDown, ChevronUp, Download,
  Copy, Check, Eye, Edit3, Plus, X, ExternalLink
} from 'lucide-react';
import { user, skills, projects } from '../data/mockData';
import { useNotification } from '../context/NotificationContext';
import './CVBuilder.css';

const Section = ({ title, icon: Icon, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="cv-section">
      <button className="cv-section-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="cv-section-title">
          {Icon && <Icon size={18} />}
          {title}
        </span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && <div className="cv-section-body">{children}</div>}
    </div>
  );
};

export default function CVBuilder() {
  const { addToast } = useNotification();
  const [copied, setCopied] = useState(false);
  const [cvData, setCvData] = useState({
    personal: {
      name: user?.name || 'Souilah Moncef',
      title: user?.title || 'Full Stack Developer',
      email: 'souilahmoncef99@gmail.com',
      phone: '0673940984',
      location: 'Bab Ezzouar, Algeria',
      linkedin: 'https://www.linkedin.com/in/moncef-souilah/',
      github: 'https://github.com/Moncef37i',
      website: 'https://moncef37i.github.io/portfolio/',
    },
    summary: 'Passionate Full Stack Developer from Algeria with expertise in React, Node.js, and modern web technologies. I love building scalable, user-friendly applications and constantly learning new technologies.',
    selectedSkills: skills.slice(0, 8).map(s => s.id),
    experience: [
      {
        id: 1,
        company: 'Freelance',
        role: 'Full Stack Developer',
        startDate: 'Jan 2024',
        endDate: 'Present',
        description: 'Designed and built multiple web applications for clients including portfolio websites, management systems, and e-commerce platforms using React, Node.js, and PostgreSQL.',
      },
    ],
    education: [
      {
        id: 1,
        degree: 'Computer Science / Software Engineering',
        school: 'University of Sciences and Technology Houari Boumediene (USTHB)',
        year: '2021 - 2024',
        gpa: '3.5',
      },
    ],
    selectedProjects: projects.slice(0, 3).map(p => p.id),
  });

  const update = (section, key, value) => {
    setCvData(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  };

  const toggleSkill = (id) => {
    setCvData(prev => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(id)
        ? prev.selectedSkills.filter(s => s !== id)
        : [...prev.selectedSkills, id],
    }));
  };

  const toggleProject = (id) => {
    setCvData(prev => ({
      ...prev,
      selectedProjects: prev.selectedProjects.includes(id)
        ? prev.selectedProjects.filter(p => p !== id)
        : [...prev.selectedProjects, id],
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), company: '', role: '', startDate: '', endDate: '', description: '' }],
    }));
  };

  const updateExp = (id, key, val) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [key]: val } : e),
    }));
  };

  const removeExp = (id) => {
    setCvData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/portfolio`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      addToast('Portfolio link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    addToast('Preparing your PDF...', 'info');
    setTimeout(() => {
      // Print the preview panel
      const previewEl = document.getElementById('cv-preview');
      if (previewEl) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
          <html>
            <head>
              <title>${cvData.personal.name} - CV</title>
              <style>
                body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 2rem; color: #111; }
                h1 { font-size: 2rem; margin-bottom: 0.2rem; }
                h2 { font-size: 1rem; color: #555; margin: 0 0 0.5rem; }
                .contact { display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.85rem; color: #555; margin-bottom: 1.5rem; }
                .section-title { font-size: 1rem; font-weight: 700; border-bottom: 2px solid #7C3AED; padding-bottom: 4px; margin: 1.2rem 0 0.6rem; color: #111; }
                .summary { color: #444; line-height: 1.6; }
                .exp-item { margin-bottom: 1rem; }
                .exp-header { display: flex; justify-content: space-between; }
                .exp-role { font-weight: 600; }
                .exp-company { color: #555; }
                .exp-date { font-size: 0.8rem; color: #888; }
                .skills-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
                .skill-chip { background: #f3f0ff; color: #7C3AED; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
                .proj-item { margin-bottom: 0.8rem; }
                .proj-title { font-weight: 600; }
                .proj-desc { color: #555; font-size: 0.85rem; }
              </style>
            </head>
            <body>
              <h1>${cvData.personal.name}</h1>
              <h2>${cvData.personal.title}</h2>
              <div class="contact">
                ${cvData.personal.email ? `<span>📧 ${cvData.personal.email}</span>` : ''}
                ${cvData.personal.phone ? `<span>📞 ${cvData.personal.phone}</span>` : ''}
                ${cvData.personal.location ? `<span>📍 ${cvData.personal.location}</span>` : ''}
                ${cvData.personal.github ? `<span>GitHub: ${cvData.personal.github}</span>` : ''}
                ${cvData.personal.linkedin ? `<span>LinkedIn: ${cvData.personal.linkedin}</span>` : ''}
                ${cvData.personal.website ? `<span>Portfolio: ${cvData.personal.website}</span>` : ''}
              </div>
              ${cvData.summary ? `<div class="section-title">SUMMARY</div><div class="summary">${cvData.summary}</div>` : ''}
              ${cvData.experience.length > 0 ? `
                <div class="section-title">EXPERIENCE</div>
                ${cvData.experience.map(e => `
                  <div class="exp-item">
                    <div class="exp-header">
                      <div><span class="exp-role">${e.role}</span> — <span class="exp-company">${e.company}</span></div>
                      <span class="exp-date">${e.startDate} – ${e.endDate}</span>
                    </div>
                    <p style="color:#555;font-size:0.85rem;margin:0.3rem 0 0">${e.description}</p>
                  </div>
                `).join('')}
              ` : ''}
              ${cvData.selectedSkills.length > 0 ? `
                <div class="section-title">SKILLS</div>
                <div class="skills-list">
                  ${skills.filter(s => cvData.selectedSkills.includes(s.id)).map(s => `<span class="skill-chip">${s.name}</span>`).join('')}
                </div>
              ` : ''}
              ${cvData.selectedProjects.length > 0 ? `
                <div class="section-title">PROJECTS</div>
                ${projects.filter(p => cvData.selectedProjects.includes(p.id)).map(p => `
                  <div class="proj-item">
                    <div class="proj-title">${p.title}</div>
                    <div class="proj-desc">${p.description}</div>
                    <div style="font-size:0.75rem;color:#888">${(p.technologies || []).join(', ')}</div>
                  </div>
                `).join('')}
              ` : ''}
              ${cvData.education.length > 0 ? `
                <div class="section-title">EDUCATION</div>
                ${cvData.education.map(e => `
                  <div class="exp-item">
                    <div class="exp-header">
                      <div><span class="exp-role">${e.degree}</span> — <span class="exp-company">${e.school}</span></div>
                      <span class="exp-date">${e.year}</span>
                    </div>
                  </div>
                `).join('')}
              ` : ''}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
      }
      addToast('CV opened for printing / saving as PDF!', 'success');
    }, 1200);
  };

  const selectedSkillsList = skills.filter(s => cvData.selectedSkills.includes(s.id));
  const selectedProjectsList = projects.filter(p => cvData.selectedProjects.includes(p.id));

  return (
    <div className="cv-builder-container">
      {/* Left Panel - Editor */}
      <div className="cv-editor">
        <div className="cv-editor-header">
          <h2><Edit3 size={20} /> CV Editor</h2>
          <p>Edit your info on the left and see the live preview on the right</p>
        </div>

        <Section title="Personal Information" icon={User} defaultOpen={true}>
          <div className="cv-fields-grid">
            <div className="cv-field">
              <label>Full Name</label>
              <input value={cvData.personal.name} onChange={e => update('personal', 'name', e.target.value)} placeholder="Your Name" />
            </div>
            <div className="cv-field">
              <label>Professional Title</label>
              <input value={cvData.personal.title} onChange={e => update('personal', 'title', e.target.value)} placeholder="e.g., Full Stack Developer" />
            </div>
            <div className="cv-field">
              <label><Mail size={14} /> Email</label>
              <input value={cvData.personal.email} onChange={e => update('personal', 'email', e.target.value)} placeholder="your@email.com" type="email" />
            </div>
            <div className="cv-field">
              <label><Phone size={14} /> Phone</label>
              <input value={cvData.personal.phone} onChange={e => update('personal', 'phone', e.target.value)} placeholder="+213 xxx xxx xxx" />
            </div>
            <div className="cv-field full-width">
              <label><MapPin size={14} /> Location</label>
              <input value={cvData.personal.location} onChange={e => update('personal', 'location', e.target.value)} placeholder="City, Country" />
            </div>
            <div className="cv-field full-width">
              <label>GitHub URL</label>
              <input value={cvData.personal.github} onChange={e => update('personal', 'github', e.target.value)} placeholder="https://github.com/..." />
            </div>
            <div className="cv-field full-width">
              <label>LinkedIn URL</label>
              <input value={cvData.personal.linkedin} onChange={e => update('personal', 'linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="cv-field full-width">
              <label><Globe size={14} /> Portfolio / Website</label>
              <input value={cvData.personal.website} onChange={e => update('personal', 'website', e.target.value)} placeholder="https://yoursite.com" />
            </div>
          </div>
        </Section>

        <Section title="Professional Summary" icon={Edit3}>
          <textarea
            value={cvData.summary}
            onChange={e => setCvData(prev => ({ ...prev, summary: e.target.value }))}
            rows={5}
            placeholder="Write a brief summary about yourself..."
            className="cv-textarea"
          />
        </Section>

        <Section title="Experience" icon={Briefcase}>
          {cvData.experience.map(exp => (
            <div key={exp.id} className="cv-exp-item">
              <div className="cv-exp-header">
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{exp.role || 'New Position'} {exp.company ? `@ ${exp.company}` : ''}</span>
                <button onClick={() => removeExp(exp.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16} /></button>
              </div>
              <div className="cv-fields-grid">
                <div className="cv-field">
                  <label>Job Title</label>
                  <input value={exp.role} onChange={e => updateExp(exp.id, 'role', e.target.value)} placeholder="Full Stack Developer" />
                </div>
                <div className="cv-field">
                  <label>Company</label>
                  <input value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} placeholder="Company Name" />
                </div>
                <div className="cv-field">
                  <label>Start Date</label>
                  <input value={exp.startDate} onChange={e => updateExp(exp.id, 'startDate', e.target.value)} placeholder="Jan 2024" />
                </div>
                <div className="cv-field">
                  <label>End Date</label>
                  <input value={exp.endDate} onChange={e => updateExp(exp.id, 'endDate', e.target.value)} placeholder="Present" />
                </div>
                <div className="cv-field full-width">
                  <label>Description</label>
                  <textarea value={exp.description} onChange={e => updateExp(exp.id, 'description', e.target.value)} rows={3} className="cv-textarea" placeholder="What did you accomplish?" />
                </div>
              </div>
            </div>
          ))}
          <button className="cv-add-btn" onClick={addExperience}><Plus size={16} /> Add Experience</button>
        </Section>

        <Section title="Education" icon={GraduationCap}>
          {cvData.education.map((edu, i) => (
            <div key={edu.id} className="cv-fields-grid" style={{ marginBottom: '1rem' }}>
              <div className="cv-field">
                <label>Degree / Field</label>
                <input value={edu.degree} onChange={e => {
                  const updated = [...cvData.education];
                  updated[i].degree = e.target.value;
                  setCvData(prev => ({ ...prev, education: updated }));
                }} placeholder="Computer Science" />
              </div>
              <div className="cv-field">
                <label>School / University</label>
                <input value={edu.school} onChange={e => {
                  const updated = [...cvData.education];
                  updated[i].school = e.target.value;
                  setCvData(prev => ({ ...prev, education: updated }));
                }} placeholder="University Name" />
              </div>
              <div className="cv-field">
                <label>Year</label>
                <input value={edu.year} onChange={e => {
                  const updated = [...cvData.education];
                  updated[i].year = e.target.value;
                  setCvData(prev => ({ ...prev, education: updated }));
                }} placeholder="2021 - 2024" />
              </div>
              <div className="cv-field">
                <label>GPA (optional)</label>
                <input value={edu.gpa} onChange={e => {
                  const updated = [...cvData.education];
                  updated[i].gpa = e.target.value;
                  setCvData(prev => ({ ...prev, education: updated }));
                }} placeholder="3.5" />
              </div>
            </div>
          ))}
        </Section>

        <Section title="Skills" icon={Code}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>Click to toggle skills on/off in your CV</p>
          <div className="cv-skills-picker">
            {skills.map(skill => (
              <button
                key={skill.id}
                className={`cv-skill-chip ${cvData.selectedSkills.includes(skill.id) ? 'selected' : ''}`}
                onClick={() => toggleSkill(skill.id)}
                style={cvData.selectedSkills.includes(skill.id) ? { borderColor: skill.color, background: `${skill.color}20`, color: skill.color } : {}}
              >
                {skill.icon} {skill.name}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Projects" icon={Code}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>Select projects to include in your CV</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {projects.map(proj => (
              <div key={proj.id} className={`cv-proj-toggle ${cvData.selectedProjects.includes(proj.id) ? 'selected' : ''}`} onClick={() => toggleProject(proj.id)}>
                <span style={{ fontSize: '1.2rem' }}>{proj.image}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{proj.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{(proj.technologies || []).slice(0, 3).join(', ')}</div>
                </div>
                <div className="toggle-check">
                  {cvData.selectedProjects.includes(proj.id) && <Check size={14} />}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="cv-preview-panel">
        <div className="preview-actions">
          <button className="action-btn secondary" onClick={handleCopyLink}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <button className="action-btn primary" onClick={handleDownload}>
            <Download size={18} /> Download PDF
          </button>
        </div>

        <div className="cv-preview-card" id="cv-preview">
          {/* Header */}
          <div className="cv-prev-header">
            <div className="cv-prev-avatar">{cvData.personal.name?.charAt(0) || 'M'}</div>
            <div className="cv-prev-name-block">
              <h1 className="cv-prev-name">{cvData.personal.name || 'Your Name'}</h1>
              <h2 className="cv-prev-title">{cvData.personal.title || 'Professional Title'}</h2>
            </div>
          </div>

          {/* Contact */}
          <div className="cv-prev-contact">
            {cvData.personal.email && <span>📧 {cvData.personal.email}</span>}
            {cvData.personal.phone && <span>📞 {cvData.personal.phone}</span>}
            {cvData.personal.location && <span>📍 {cvData.personal.location}</span>}
            {cvData.personal.github && (
              <a href={cvData.personal.github} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                <span>🔗 GitHub</span>
              </a>
            )}
            {cvData.personal.linkedin && (
              <a href={cvData.personal.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                <span>💼 LinkedIn</span>
              </a>
            )}
            {cvData.personal.website && (
              <a href={cvData.personal.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                <span>🌐 Portfolio</span>
              </a>
            )}
          </div>

          {/* Summary */}
          {cvData.summary && (
            <>
              <div className="cv-prev-section-title">SUMMARY</div>
              <p className="cv-prev-text">{cvData.summary}</p>
            </>
          )}

          {/* Experience */}
          {cvData.experience.length > 0 && cvData.experience.some(e => e.role) && (
            <>
              <div className="cv-prev-section-title">EXPERIENCE</div>
              {cvData.experience.filter(e => e.role).map(exp => (
                <div key={exp.id} className="cv-prev-exp">
                  <div className="cv-prev-exp-header">
                    <div>
                      <span className="cv-prev-role">{exp.role}</span>
                      {exp.company && <span className="cv-prev-company"> — {exp.company}</span>}
                    </div>
                    <span className="cv-prev-date">{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</span>
                  </div>
                  {exp.description && <p className="cv-prev-desc">{exp.description}</p>}
                </div>
              ))}
            </>
          )}

          {/* Skills */}
          {selectedSkillsList.length > 0 && (
            <>
              <div className="cv-prev-section-title">SKILLS</div>
              <div className="cv-prev-skills">
                {selectedSkillsList.map(skill => (
                  <span key={skill.id} className="cv-prev-skill-chip">{skill.name}</span>
                ))}
              </div>
            </>
          )}

          {/* Projects */}
          {selectedProjectsList.length > 0 && (
            <>
              <div className="cv-prev-section-title">PROJECTS</div>
              {selectedProjectsList.map(proj => (
                <div key={proj.id} className="cv-prev-exp">
                  <div className="cv-prev-exp-header">
                    <span className="cv-prev-role">{proj.image} {proj.title}</span>
                    <span className="cv-prev-date">{proj.startDate}</span>
                  </div>
                  <p className="cv-prev-desc">{proj.description}</p>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                    {(proj.technologies || []).map((t, i) => (
                      <span key={i} style={{ fontSize: '0.65rem', background: 'rgba(124,58,237,0.1)', color: '#7C3AED', padding: '0.1rem 0.4rem', borderRadius: '10px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Education */}
          {cvData.education.length > 0 && cvData.education.some(e => e.degree) && (
            <>
              <div className="cv-prev-section-title">EDUCATION</div>
              {cvData.education.filter(e => e.degree).map((edu, i) => (
                <div key={i} className="cv-prev-exp">
                  <div className="cv-prev-exp-header">
                    <div>
                      <span className="cv-prev-role">{edu.degree}</span>
                      {edu.school && <span className="cv-prev-company"> — {edu.school}</span>}
                    </div>
                    <span className="cv-prev-date">{edu.year}</span>
                  </div>
                  {edu.gpa && <p className="cv-prev-desc">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
