import React, { useState } from 'react';
import { Target, CheckCircle, Clock, AlertTriangle, Plus, Edit2, Trash2, Calendar, MoreVertical, X, ArrowLeft } from 'lucide-react';
import { goals as initialGoals } from '../data/mockData';
import { useNotification } from '../context/NotificationContext';
import './Goals.css';

const Goals = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useNotification();

  // Use a fixed today date as requested
  const today = new Date('2026-07-20T00:00:00');

  const getDaysRemaining = (deadline) => {
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Stats
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.completed).length;
  const inProgressGoals = totalGoals - completedGoals;
  const overdueGoals = goals.filter((g) => !g.completed && getDaysRemaining(g.deadline) < 0).length;

  const filters = ['All', 'Active', 'Completed', 'Learning', 'Project', 'Certification', 'Community'];

  const filteredGoals = goals.filter((g) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !g.completed;
    if (filter === 'Completed') return g.completed;
    return g.category === filter;
  });

  const toggleComplete = (id) => {
    let completedState = false;
    setGoals(
      goals.map((g) => {
        if (g.id === id) {
          completedState = !g.completed;
          return { ...g, completed: !g.completed, progress: !g.completed ? 100 : g.progress };
        }
        return g;
      })
    );
    if (completedState) {
      addToast('Goal marked as completed! 🎉', 'success');
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
    addToast('Goal deleted', 'info');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'var(--danger-color, #ef4444)';
      case 'Medium':
        return 'var(--warning-color, #f59e0b)';
      case 'Low':
      default:
        return 'var(--text-muted, #9ca3af)';
    }
  };

  const getDeadlineColorClass = (days) => {
    if (days < 0) return 'deadline-overdue';
    if (days < 7) return 'deadline-danger';
    if (days < 30) return 'deadline-warning';
    return 'deadline-safe';
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <div>
          <h1>My Goals</h1>
          <p className="subtitle">Track your targets and deadlines</p>
        </div>
        <button className="btn-primary add-goal-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: 'var(--purple-primary)' }}>
            <Target size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Goals</h3>
            <p className="stat-value">{totalGoals}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-value">{completedGoals}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>In Progress</h3>
            <p className="stat-value">{inProgressGoals}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="stat-info">
            <h3>Overdue</h3>
            <p className="stat-value">{overdueGoals}</p>
          </div>
        </div>
      </div>

      <div className="filter-tabs">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="goals-list">
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal) => {
            const daysRemaining = getDaysRemaining(goal.deadline);
            const isCompleted = goal.completed;
            const priorityColor = getPriorityColor(goal.priority);
            const deadlineClass = getDeadlineColorClass(daysRemaining);

            return (
              <div
                key={goal.id}
                className={`goal-card ${isCompleted ? 'goal-completed' : ''}`}
                style={{ borderLeftColor: priorityColor }}
              >
                <div className="goal-card-main">
                  <div className="goal-title-area">
                    <button
                      className={`complete-toggle ${isCompleted ? 'checked' : ''}`}
                      onClick={() => toggleComplete(goal.id)}
                    >
                      {isCompleted && <CheckCircle size={20} />}
                      {!isCompleted && <div className="circle-empty" />}
                    </button>
                    <div>
                      <h3 className="goal-title">{goal.title}</h3>
                      <p className="goal-description">{goal.description}</p>
                    </div>
                  </div>

                  <div className="goal-meta">
                    <span className="badge category-badge">{goal.category}</span>
                    <span
                      className="badge priority-badge"
                      style={{ backgroundColor: `${priorityColor}20`, color: priorityColor }}
                    >
                      {goal.priority}
                    </span>
                  </div>
                </div>

                <div className="goal-card-details">
                  <div className="goal-progress-section">
                    <div className="progress-info">
                      <span>Progress</span>
                      <span>{isCompleted ? 100 : goal.progress}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${isCompleted ? 100 : goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="goal-deadline-section">
                    <div className={`deadline-info ${isCompleted ? '' : deadlineClass}`}>
                      <Calendar size={16} />
                      <span>{goal.deadline}</span>
                    </div>
                    {!isCompleted && (
                      <span className={`countdown ${deadlineClass}`}>
                        {daysRemaining < 0
                          ? `${Math.abs(daysRemaining)} days overdue`
                          : `${daysRemaining} days left`}
                      </span>
                    )}
                  </div>

                  <div className="goal-actions">
                    <button className="action-btn edit-btn">
                      <Edit2 size={18} />
                    </button>
                    <button className="action-btn delete-btn" onClick={() => deleteGoal(goal.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <Target size={48} className="empty-icon" />
            <h3>No goals found</h3>
            <p>You don't have any goals matching this filter.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
                  <ArrowLeft size={20} />
                </button>
                <h2 style={{ margin: 0 }}>Add New Goal</h2>
              </div>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="E.g., Master React Hooks" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Briefly describe your goal..." rows={3}></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select>
                    <option>Learning</option>
                    <option>Project</option>
                    <option>Certification</option>
                    <option>Community</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input type="date" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => { setIsModalOpen(false); addToast('Goal saved successfully!', 'success'); }}>
                Save Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
