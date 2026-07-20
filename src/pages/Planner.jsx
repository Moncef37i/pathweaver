import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock, Check, ArrowLeft } from 'lucide-react';
import { user } from '../data/mockData';
import './Planner.css';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TASK_TYPES = ['Learning', 'Project', 'Practice', 'Review'];
const TYPE_COLORS = {
  Learning: '#8b5cf6',
  Project: '#3b82f6',
  Practice: '#f59e0b',
  Review: '#6b7280',
};

// Get Monday of the week containing `date`
function getMondayOf(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date) {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function isSameDay(a, b) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

const TODAY = new Date(2026, 6, 20); // 20 Jul 2026

const generateWeekDays = (monday) => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

const initialTasks = {
  '2026-07-14': [
    { id: 1, title: 'React Advanced Patterns', time: '09:00', duration: '1.5h', type: 'Learning', completed: true },
    { id: 2, title: 'TypeScript Practice', time: '14:00', duration: '1h', type: 'Practice', completed: true },
  ],
  '2026-07-15': [
    { id: 3, title: 'Build E-Commerce Cart', time: '10:00', duration: '2h', type: 'Project', completed: true },
    { id: 4, title: 'Code Review Session', time: '15:00', duration: '1h', type: 'Review', completed: false },
  ],
  '2026-07-16': [
    { id: 5, title: 'Node.js REST APIs', time: '09:00', duration: '2h', type: 'Learning', completed: false },
    { id: 6, title: 'Portfolio Updates', time: '13:00', duration: '1.5h', type: 'Project', completed: false },
  ],
  '2026-07-17': [
    { id: 7, title: 'PostgreSQL Deep Dive', time: '10:00', duration: '1.5h', type: 'Learning', completed: false },
    { id: 8, title: 'Practice Interview Questions', time: '16:00', duration: '1h', type: 'Practice', completed: false },
  ],
  '2026-07-18': [
    { id: 9, title: 'Docker Fundamentals', time: '09:00', duration: '2h', type: 'Learning', completed: false },
    { id: 10, title: 'Weekly Review & Planning', time: '14:00', duration: '1h', type: 'Review', completed: false },
  ],
  '2026-07-19': [
    { id: 11, title: 'Open Source Contribution', time: '10:00', duration: '3h', type: 'Project', completed: false },
  ],
  '2026-07-20': [
    { id: 12, title: 'Rest & Light Reading', time: '11:00', duration: '1h', type: 'Learning', completed: false },
  ],
};

function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function Planner() {
  const [weekStart, setWeekStart] = useState(getMondayOf(TODAY));
  const [tasks, setTasks] = useState(initialTasks);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addDate, setAddDate] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', time: '09:00', duration: '1h', type: 'Learning' });

  const weekDays = generateWeekDays(weekStart);
  const weekEnd = weekDays[weekDays.length - 1];

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };

  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const goToToday = () => setWeekStart(getMondayOf(TODAY));

  const toggleTask = (dateKey, taskId) => {
    setTasks(prev => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).map(t => t.id === taskId ? { ...t, completed: !t.completed } : t),
    }));
  };

  const deleteTask = (dateKey, taskId) => {
    setTasks(prev => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter(t => t.id !== taskId),
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const key = toKey(addDate);
    const task = { ...newTask, id: Date.now(), completed: false };
    setTasks(prev => ({ ...prev, [key]: [...(prev[key] || []), task] }));
    setIsAddOpen(false);
    setNewTask({ title: '', time: '09:00', duration: '1h', type: 'Learning' });
  };

  const openAdd = (date) => {
    setAddDate(date);
    setIsAddOpen(true);
  };

  // Weekly stats
  const allTasks = weekDays.flatMap(d => tasks[toKey(d)] || []);
  const completedCount = allTasks.filter(t => t.completed).length;
  const totalCount = allTasks.length;
  const totalHours = allTasks.reduce((sum, t) => {
    const match = t.duration.match(/(\d+(\.\d+)?)/);
    return sum + (match ? parseFloat(match[1]) : 0);
  }, 0);

  // Today's tasks
  const todayKey = toKey(TODAY);
  const todayTasks = tasks[todayKey] || [];

  return (
    <div className="planner-page">
      {/* Streak Banner */}
      <div className="streak-banner glass-panel">
        <div className="streak-info">
          <span className="streak-flames">🔥🔥🔥</span>
          <div>
            <div className="streak-value">{user?.streak || 23} Day Streak!</div>
            <div className="streak-sub">Keep it up, Moncef! You're on fire 🔥</div>
          </div>
        </div>
        <div className="streak-dots">
          {Array.from({ length: 14 }, (_, i) => {
            const d = new Date(TODAY);
            d.setDate(d.getDate() - 13 + i);
            return (
              <div key={i} className="streak-dot-wrapper">
                <div className={`streak-dot ${i >= 14 - (user?.streak || 23) ? 'active' : ''}`} />
                <span className="streak-dot-label">{d.getDate()}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Week Navigation */}
      <div className="week-nav glass-panel">
        <button className="week-btn" onClick={prevWeek}>
          <ChevronLeft size={20} />
        </button>
        <div className="week-info">
          <h2>{formatDate(weekStart)} — {formatDate(weekEnd)}</h2>
          <button className="today-btn" onClick={goToToday}>Today</button>
        </div>
        <button className="week-btn" onClick={nextWeek}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Weekly Stats */}
      <div className="week-stats">
        <div className="wstat-card glass-panel">
          <div className="wstat-value">{totalHours.toFixed(1)}h</div>
          <div className="wstat-label">Total Hours</div>
        </div>
        <div className="wstat-card glass-panel">
          <div className="wstat-value">{totalCount}</div>
          <div className="wstat-label">Sessions</div>
        </div>
        <div className="wstat-card glass-panel">
          <div className="wstat-value">{completedCount}</div>
          <div className="wstat-label">Completed</div>
        </div>
        <div className="wstat-card glass-panel">
          <div className="wstat-value">{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</div>
          <div className="wstat-label">Completion Rate</div>
        </div>
      </div>

      <div className="planner-layout">
        {/* Calendar Grid */}
        <div className="calendar-grid glass-panel">
          <div className="calendar-header">
            {weekDays.map((day, i) => {
              const isToday = isSameDay(day, TODAY);
              return (
                <div key={i} className={`day-header ${isToday ? 'today' : ''}`}>
                  <span className="day-name">{SHORT_DAYS[day.getDay()]}</span>
                  <span className={`day-num ${isToday ? 'today-num' : ''}`}>{day.getDate()}</span>
                  <button className="add-session-btn" onClick={() => openAdd(day)}>
                    <Plus size={12} />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="calendar-body">
            {weekDays.map((day, i) => {
              const key = toKey(day);
              const dayTasks = tasks[key] || [];
              const isToday = isSameDay(day, TODAY);
              return (
                <div key={i} className={`day-column ${isToday ? 'today-column' : ''}`}>
                  {dayTasks.length === 0 && (
                    <div className="empty-day" onClick={() => openAdd(day)}>
                      <Plus size={16} />
                    </div>
                  )}
                  {dayTasks.map(task => (
                    <div
                      key={task.id}
                      className={`task-card ${task.completed ? 'completed' : ''}`}
                      style={{ borderLeft: `3px solid ${TYPE_COLORS[task.type] || '#8b5cf6'}` }}
                    >
                      <div className="task-header">
                        <span className="task-time">{task.time}</span>
                        <div className="task-actions">
                          <button
                            className={`check-btn ${task.completed ? 'checked' : ''}`}
                            onClick={() => toggleTask(key, task.id)}
                          >
                            {task.completed ? <Check size={10} /> : '○'}
                          </button>
                          <button className="del-btn" onClick={() => deleteTask(key, task.id)}>
                            <X size={10} />
                          </button>
                        </div>
                      </div>
                      <div className="task-title">{task.title}</div>
                      <div className="task-meta">
                        <span className="task-type-badge" style={{ background: `${TYPE_COLORS[task.type]}20`, color: TYPE_COLORS[task.type] }}>
                          {task.type}
                        </span>
                        <span className="task-duration"><Clock size={10} /> {task.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Focus Sidebar */}
        <div className="today-focus glass-panel">
          <h3>📌 Today's Focus</h3>
          <div className="today-date">
            {TODAY.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          {todayTasks.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem 0' }}>
              No sessions today. Add one!
            </div>
          ) : (
            <div className="today-tasks">
              {todayTasks.map(task => (
                <div key={task.id} className={`today-task ${task.completed ? 'done' : ''}`}>
                  <div className="today-task-dot" style={{ background: TYPE_COLORS[task.type] }} />
                  <div>
                    <div className="today-task-title">{task.title}</div>
                    <div className="today-task-time">{task.time} · {task.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button className="add-today-btn" onClick={() => openAdd(TODAY)}>
            <Plus size={16} /> Add Session
          </button>
        </div>
      </div>

      {/* Add Session Modal */}
      {isAddOpen && (
        <div className="modal-overlay" onClick={() => setIsAddOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <button type="button" onClick={() => setIsAddOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                  <ArrowLeft size={20} />
                </button>
                <h2 style={{ margin: 0 }}>Add Session — {addDate && addDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}</h2>
              </div>
              <button className="close-btn" onClick={() => setIsAddOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label>Session Title *</label>
                <input type="text" placeholder="e.g., React Hooks Deep Dive" value={newTask.title} onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" value={newTask.time} onChange={e => setNewTask(p => ({ ...p, time: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <select value={newTask.duration} onChange={e => setNewTask(p => ({ ...p, duration: e.target.value }))}>
                    {['30min', '1h', '1.5h', '2h', '2.5h', '3h', '4h'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Type</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                  {TASK_TYPES.map(type => (
                    <button type="button" key={type} onClick={() => setNewTask(p => ({ ...p, type }))}
                      style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', cursor: 'pointer', border: `2px solid ${newTask.type === type ? TYPE_COLORS[type] : 'transparent'}`, background: newTask.type === type ? `${TYPE_COLORS[type]}20` : 'var(--bg-hover)', color: newTask.type === type ? TYPE_COLORS[type] : 'var(--text-secondary)' }}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsAddOpen(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Add Session</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
