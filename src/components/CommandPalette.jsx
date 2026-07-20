import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Layout, BookOpen, Map, Briefcase, Target, Calendar,
  BarChart2, FileText, Globe, MessageSquare, Award, User,
  HelpCircle, Users, ChevronRight, Code2, Zap,
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { user } from '../data/mockData';
import './CommandPalette.css';

const pages = [
  { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: Layout, keywords: 'home overview' },
  { id: 'skills', name: 'Skills', path: '/skills', icon: BookOpen, keywords: 'learn technology' },
  { id: 'roadmaps', name: 'Roadmaps', path: '/roadmaps', icon: Map, keywords: 'path learning' },
  { id: 'projects', name: 'Projects', path: '/projects', icon: Briefcase, keywords: 'portfolio work' },
  { id: 'goals', name: 'Goals', path: '/goals', icon: Target, keywords: 'objectives targets' },
  { id: 'planner', name: 'Learning Planner', path: '/planner', icon: Calendar, keywords: 'schedule calendar' },
  { id: 'analytics', name: 'Analytics', path: '/analytics', icon: BarChart2, keywords: 'stats charts' },
  { id: 'cv-builder', name: 'CV Builder', path: '/cv-builder', icon: FileText, keywords: 'resume cv' },
  { id: 'portfolio', name: 'Portfolio Builder', path: '/portfolio', icon: Globe, keywords: 'showcase website' },
  { id: 'interview', name: 'Interview Practice', path: '/interview', icon: MessageSquare, keywords: 'questions mock' },
  { id: 'achievements', name: 'Achievements', path: '/achievements', icon: Award, keywords: 'badges xp' },
  { id: 'profile', name: 'Profile', path: '/profile', icon: User, keywords: 'account moncef souilah' },
  { id: 'help', name: 'Help Center', path: '/help', icon: HelpCircle, keywords: 'support faq' },
  { id: 'community', name: 'Community', path: '/community', icon: Users, keywords: 'forum discuss' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const { skills, projects, goals } = useAppData();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose?.();
      }
      if (e.key === 'Escape' && isOpen) onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return pages.map((p) => ({ ...p, type: 'page', label: p.name, sublabel: 'Page' }));
    }

    const results = [];

    pages.forEach((page) => {
      const haystack = `${page.name} ${page.keywords}`.toLowerCase();
      if (haystack.includes(q)) {
        results.push({ ...page, type: 'page', label: page.name, sublabel: 'Page' });
      }
    });

    if (user.name.toLowerCase().includes(q) || 'moncef'.includes(q) && q.includes('mon')) {
      results.push({
        id: 'profile-user',
        type: 'profile',
        label: user.name,
        sublabel: 'Your Profile',
        path: '/profile',
        icon: User,
      });
    }
    if (user.name.toLowerCase().includes(q) || q.includes('moncef') || q.includes('souilah')) {
      if (!results.find((r) => r.id === 'profile-user')) {
        results.push({
          id: 'profile-user',
          type: 'profile',
          label: user.name,
          sublabel: 'Your Profile',
          path: '/profile',
          icon: User,
        });
      }
    }

    skills.forEach((skill) => {
      if (skill.name.toLowerCase().includes(q) || skill.category.toLowerCase().includes(q)) {
        results.push({
          id: `skill-${skill.id}`,
          type: 'skill',
          label: skill.name,
          sublabel: `${skill.category} · ${skill.level}`,
          path: '/skills',
          icon: Code2,
        });
      }
    });

    projects.forEach((project) => {
      const tech = (project.technologies || []).join(' ').toLowerCase();
      if (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        tech.includes(q)
      ) {
        results.push({
          id: `project-${project.id}`,
          type: 'project',
          label: project.title,
          sublabel: project.status,
          path: '/projects',
          icon: Briefcase,
        });
      }
    });

    goals.forEach((goal) => {
      if (goal.title.toLowerCase().includes(q) || goal.description.toLowerCase().includes(q)) {
        results.push({
          id: `goal-${goal.id}`,
          type: 'goal',
          label: goal.title,
          sublabel: goal.category,
          path: '/goals',
          icon: Target,
        });
      }
    });

    return results;
  }, [query, skills, projects, goals]);

  useEffect(() => setSelectedIndex(0), [query]);

  const handleSelect = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(searchResults[selectedIndex].path);
    }
  };

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex + 1];
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette-container" onClick={(e) => e.stopPropagation()}>
        <div className="command-palette-header">
          <Search className="search-icon" size={20} />
          <input
            ref={inputRef}
            type="text"
            className="command-palette-input"
            placeholder="Search skills, projects, goals, pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <div className="keyboard-shortcuts">
            <kbd>ESC</kbd> to close
          </div>
        </div>

        <div className="command-palette-body">
          {searchResults.length > 0 ? (
            <div className="command-palette-list" ref={listRef}>
              <div className="list-group-label">
                {query ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}` : 'Pages & Content'}
              </div>
              {searchResults.map((item, index) => {
                const Icon = item.icon || Zap;
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    className={`command-palette-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelect(item.path)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="item-icon">
                      <Icon size={18} />
                    </div>
                    <div className="item-content">
                      <span className="item-name">{item.label}</span>
                      <span className="item-sublabel">{item.sublabel}</span>
                    </div>
                    {isSelected && (
                      <div className="item-action">
                        <span>Go to</span>
                        <ChevronRight size={16} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="command-palette-empty">
              <div className="empty-icon-wrapper">
                <Search size={32} />
              </div>
              <p>No results for &quot;{query}&quot;</p>
              <span>Try searching skills, projects, or page names</span>
            </div>
          )}
        </div>

        <div className="command-palette-footer">
          <div className="footer-shortcuts">
            <div className="shortcut">
              <kbd>↑</kbd> <kbd>↓</kbd> <span>Navigate</span>
            </div>
            <div className="shortcut">
              <kbd>↵</kbd> <span>Open</span>
            </div>
          </div>
          <div className="footer-brand">PathWeaver Search</div>
        </div>
      </div>
    </div>
  );
}
