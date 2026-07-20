import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  BookOpen, Clock, Award, TrendingUp,
  PlayCircle, CheckCircle, Code, ChevronRight
} from 'lucide-react';
import './Dashboard.css';
import {
  user, stats, recentActivity, activityData, skills, projects
} from '../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activityPeriod, setActivityPeriod] = useState('thisWeek');
  const chartData = activityData[activityPeriod] || activityData.thisWeek;

  return (
    <div className="dashboard-container fade-in">
      {/* Welcome Banner */}
      <section className="welcome-banner glass-panel">
        <div className="welcome-content">
          <div className="welcome-avatar-container">
            <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
            <div className="streak-badge">🔥 {user?.streak || 5} Day Streak</div>
          </div>
          <div className="welcome-text">
            <h1>Welcome back, {user?.name?.split(' ')[1] || 'Developer'}! 👋</h1>
            <p>You're making great progress. Keep up the good work!</p>
            <div className="quick-stats-row">
              <span className="quick-stat"><BookOpen size={16}/> {stats?.skillsLearned || 24} Skills</span>
              <span className="quick-stat"><Code size={16}/> {stats?.projectsCompleted || 8} Projects</span>
              <span className="quick-stat"><Clock size={16}/> {stats?.learningHours || 342} Hours</span>
            </div>
          </div>
          <div className="progress-circle-container">
            <svg className="progress-ring" width="120" height="120">
              <circle className="progress-ring-circle-bg" stroke="var(--border)" strokeWidth="8" fill="transparent" r="50" cx="60" cy="60"/>
              <circle className="progress-ring-circle" stroke="var(--purple-primary)" strokeWidth="8" fill="transparent" r="50" cx="60" cy="60" style={{ strokeDasharray: '314 314', strokeDashoffset: 314 - (314 * (user?.overallProgress || 68)) / 100 }}/>
            </svg>
            <div className="progress-text">
              <span className="percentage">{user?.overallProgress || 68}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper purple-gradient">
            <BookOpen size={24} color="#fff" />
          </div>
          <div className="stat-info">
            <h3>Skills Learned</h3>
            <div className="stat-value-row">
              <span className="stat-value">{stats?.skillsLearned || 24}</span>
              <span className="trend-badge positive"><TrendingUp size={14}/> 12%</span>
            </div>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper blue-gradient">
            <Code size={24} color="#fff" />
          </div>
          <div className="stat-info">
            <h3>Projects Completed</h3>
            <div className="stat-value-row">
              <span className="stat-value">{stats?.projectsCompleted || 8}</span>
              <span className="trend-badge positive"><TrendingUp size={14}/> 2</span>
            </div>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper green-gradient">
            <Clock size={24} color="#fff" />
          </div>
          <div className="stat-info">
            <h3>Learning Hours</h3>
            <div className="stat-value-row">
              <span className="stat-value">{stats?.learningHours || 342}</span>
              <span className="trend-badge positive"><TrendingUp size={14}/> 8h</span>
            </div>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper orange-gradient">
            <Award size={24} color="#fff" />
          </div>
          <div className="stat-info">
            <h3>Roadmaps Done</h3>
            <div className="stat-value-row">
              <span className="stat-value">{stats?.roadmapsCompleted || 2}</span>
              <span className="trend-badge neutral"><CheckCircle size={14}/></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="main-content-grid">
        <div className="left-column">
          {/* Activity Chart */}
          <section className="chart-section glass-panel">
            <div className="section-header">
              <h2>Learning Activity</h2>
              <select
                className="chart-select"
                value={activityPeriod}
                onChange={e => setActivityPeriod(e.target.value)}
              >
                <option value="thisWeek">This Week</option>
                <option value="lastWeek">Last Week</option>
              </select>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)'}} />
                  <Tooltip
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff'}}
                    formatter={(value, name) => [`${value}h`, 'Hours']}
                    labelFormatter={(label, payload) => payload?.[0]?.payload?.day || label}
                  />
                  <Bar dataKey="hours" fill="var(--purple-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Active Projects */}
          <section className="projects-section glass-panel">
            <div className="section-header">
              <h2>Active Projects</h2>
              <button className="view-all-btn" onClick={() => navigate('/projects')}>
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="projects-list">
              {(projects || []).filter(p => p.status === 'In Progress').slice(0, 3).map((project, idx) => (
                <div key={idx} className="project-card">
                  <div className="project-icon" style={{backgroundColor: project.color || 'var(--bg-hover)'}}>
                    <span style={{fontSize: '1.2rem'}}>{project.image}</span>
                  </div>
                  <div className="project-details">
                    <h4>{project.title}</h4>
                    <p>{project.technologies ? project.technologies[0] : 'React'}</p>
                    <div className="project-progress-bar">
                      <div className="project-progress-fill" style={{width: `${project.progress}%`, backgroundColor: project.color || 'var(--purple-primary)'}}></div>
                    </div>
                  </div>
                  <div className="project-progress-text">{project.progress}%</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="right-column">
          {/* Skills Overview */}
          <section className="skills-section glass-panel">
            <div className="section-header">
              <h2>Top Skills</h2>
              <button className="view-all-btn" onClick={() => navigate('/skills')}>
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="skills-list">
              {(skills || []).slice(0, 6).map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">
                      <span className="skill-dot" style={{backgroundColor: skill.color || 'var(--purple-primary)'}}></span>
                      {skill.name}
                    </span>
                    <span className="skill-level">{skill.progress}%</span>
                  </div>
                  <div className="skill-progress-bar">
                    <div className="skill-progress-fill" style={{width: `${skill.progress}%`, backgroundColor: skill.color || 'var(--purple-primary)'}}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="activity-section glass-panel">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="timeline">
              {(recentActivity || []).map((activity, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-icon">
                    {activity.type === 'course' ? <PlayCircle size={16} /> :
                     activity.type === 'project' ? <Code size={16} /> :
                     <Award size={16} />}
                  </div>
                  <div className="timeline-content">
                    <p className="activity-title">{activity.action}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
