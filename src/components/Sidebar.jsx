import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Map, Code2, FolderGit2, Target, CalendarDays,
  BarChart3, FileText, Globe, MessageSquare, Trophy, User,
  Zap, ChevronRight, Settings, LogOut
} from 'lucide-react';
import { user } from '../data/mockData';
import '../styles/layout.css';

const navItems = [
  { label: 'MAIN', type: 'section' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/roadmaps', icon: Map, label: 'Roadmaps', badge: '5' },
  { to: '/skills', icon: Code2, label: 'Skills' },
  { to: '/projects', icon: FolderGit2, label: 'Projects' },

  { label: 'GROWTH', type: 'section' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/planner', icon: CalendarDays, label: 'Learning Planner' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },

  { label: 'CAREER', type: 'section' },
  { to: '/cv-builder', icon: FileText, label: 'CV Builder' },
  { to: '/portfolio', icon: Globe, label: 'Portfolio Builder' },
  { to: '/interview', icon: MessageSquare, label: 'Interview Practice' },
  { to: '/achievements', icon: Trophy, label: 'Achievements', badge: '3' },

  { label: 'ACCOUNT', type: 'section' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">⚡</div>
          <div>
            <div className="sidebar-logo-text">PathWeaver</div>
            <div className="sidebar-logo-tagline">Track. Build. Get Hired.</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, i) => {
            if (item.type === 'section') {
              return <div key={i} className="nav-section-label">{item.label}</div>;
            }
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="nav-item-icon"><Icon size={16} /></span>
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="avatar avatar-sm">{user.avatar}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-role">{user.title}</div>
            </div>
            <ChevronRight size={14} color="var(--text-muted)" />
          </div>
        </div>
      </aside>
    </>
  );
}
