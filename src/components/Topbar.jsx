import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, Flame, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import './Topbar.css';

const pageTitles = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back 👋' },
  '/roadmaps': { title: 'Learning Roadmaps', subtitle: 'Choose your path and track your progress' },
  '/skills': { title: 'Skills', subtitle: 'Track and manage your technical skills' },
  '/projects': { title: 'Projects', subtitle: 'Manage and showcase your work' },
  '/goals': { title: 'Goals', subtitle: 'Set, track, and achieve your learning objectives' },
  '/planner': { title: 'Learning Planner', subtitle: 'Organize your weekly study schedule' },
  '/analytics': { title: 'Analytics', subtitle: 'Visualize your learning journey' },
  '/cv-builder': { title: 'CV Builder', subtitle: 'Create a professional developer resume' },
  '/portfolio': { title: 'Portfolio Builder', subtitle: 'Showcase your work to the world' },
  '/interview': { title: 'Interview Practice', subtitle: 'Prepare for your next technical interview' },
  '/achievements': { title: 'Achievements', subtitle: 'Your earned badges and milestones' },
  '/profile': { title: 'Profile', subtitle: 'Manage your developer profile' },
};

// All searchable items across the site
const SEARCH_INDEX = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊', category: 'Pages' },
  { label: 'My Skills', path: '/skills', icon: '⚡', category: 'Pages' },
  { label: 'Projects', path: '/projects', icon: '💼', category: 'Pages' },
  { label: 'Goals', path: '/goals', icon: '🎯', category: 'Pages' },
  { label: 'Learning Planner', path: '/planner', icon: '📅', category: 'Pages' },
  { label: 'Roadmaps', path: '/roadmaps', icon: '🗺️', category: 'Pages' },
  { label: 'Analytics', path: '/analytics', icon: '📈', category: 'Pages' },
  { label: 'CV Builder', path: '/cv-builder', icon: '📄', category: 'Pages' },
  { label: 'Portfolio Builder', path: '/portfolio', icon: '🌐', category: 'Pages' },
  { label: 'Interview Practice', path: '/interview', icon: '🎤', category: 'Pages' },
  { label: 'Achievements', path: '/achievements', icon: '🏆', category: 'Pages' },
  { label: 'Profile', path: '/profile', icon: '👤', category: 'Pages' },
  { label: 'Pricing', path: '/pricing', icon: '💳', category: 'Pages' },
  { label: 'About', path: '/about', icon: 'ℹ️', category: 'Pages' },
  { label: 'Help Center', path: '/help', icon: '❓', category: 'Pages' },
  { label: 'Community', path: '/community', icon: '👥', category: 'Pages' },
  // User info
  { label: 'Souilah Moncef', path: '/profile', icon: '👤', category: 'Profile' },
  { label: 'Moncef', path: '/profile', icon: '👤', category: 'Profile' },
  { label: 'Souilah', path: '/profile', icon: '👤', category: 'Profile' },
  { label: 'Algeria', path: '/profile', icon: '📍', category: 'Profile' },
  { label: 'Bab Ezzouar', path: '/profile', icon: '📍', category: 'Profile' },
  // Skills
  { label: 'React', path: '/skills', icon: '⚛️', category: 'Skills' },
  { label: 'TypeScript', path: '/skills', icon: '📘', category: 'Skills' },
  { label: 'Node.js', path: '/skills', icon: '🟢', category: 'Skills' },
  { label: 'CSS / Tailwind', path: '/skills', icon: '🎨', category: 'Skills' },
  { label: 'Python', path: '/skills', icon: '🐍', category: 'Skills' },
  { label: 'Docker', path: '/skills', icon: '🐳', category: 'Skills' },
  { label: 'PostgreSQL', path: '/skills', icon: '🐘', category: 'Skills' },
  { label: 'MongoDB', path: '/skills', icon: '🍃', category: 'Skills' },
  { label: 'AWS', path: '/skills', icon: '☁️', category: 'Skills' },
  { label: 'Git', path: '/skills', icon: '📋', category: 'Skills' },
  { label: 'Next.js', path: '/skills', icon: '▲', category: 'Skills' },
  { label: 'GraphQL', path: '/skills', icon: '◈', category: 'Skills' },
  { label: 'Figma', path: '/skills', icon: '🎯', category: 'Skills' },
  // Projects
  { label: 'Portfolio Website', path: '/projects', icon: '🌐', category: 'Projects' },
  { label: 'PathWeaver', path: '/projects', icon: '⚡', category: 'Projects' },
  { label: 'E-Commerce Platform', path: '/projects', icon: '🛒', category: 'Projects' },
  { label: 'AI Chat Application', path: '/projects', icon: '🤖', category: 'Projects' },
  { label: 'Weather Dashboard', path: '/projects', icon: '🌤️', category: 'Projects' },
];

export default function Topbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications, markNotificationsRead } = useNotification();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef(null);

  const page = pageTitles[location.pathname] || { title: 'PathWeaver', subtitle: '' };
  const hasUnread = notifications.some(n => !n.read);

  const toggleNotifs = () => {
    if (!showNotifs && hasUnread) markNotificationsRead();
    setShowNotifs(!showNotifs);
    setShowSearch(false);
  };

  const openSearch = () => {
    setShowSearch(true);
    setSearchQuery('');
    setSearchResults(SEARCH_INDEX.slice(0, 6));
    setSelectedIndex(0);
    setTimeout(() => searchRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleSearchInput = (val) => {
    setSearchQuery(val);
    setSelectedIndex(0);
    if (!val.trim()) {
      setSearchResults(SEARCH_INDEX.slice(0, 6));
      return;
    }
    const q = val.toLowerCase();
    const results = SEARCH_INDEX.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
    setSearchResults(results.slice(0, 8));
  };

  const handleSelect = (item) => {
    navigate(item.path);
    closeSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
      handleSelect(searchResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  };

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!showSearch) return;
    const handler = (e) => {
      if (!e.target.closest('.search-popup')) closeSearch();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showSearch]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <button className="hamburger-btn" onClick={onMenuClick}>
            <Menu size={20} />
          </button>
          <div>
            <div className="topbar-title">{page.title}</div>
            <div className="topbar-subtitle">
              {location.pathname === '/dashboard' && user
                ? `Welcome back, ${user.name.split(' ')[1] || user.name.split(' ')[0]}! 👋`
                : page.subtitle}
            </div>
          </div>
        </div>

        <div className="topbar-right">
          {/* Search Button */}
          <button
            className="topbar-search-btn"
            onClick={openSearch}
            title="Search (Ctrl+K)"
          >
            <Search size={15} />
            <span>Search...</span>
            <kbd>Ctrl+K</kbd>
          </button>

          {/* Streak */}
          {user && (
            <div className="streak-pill" title={`🔥 ${user.streak || 23}-day streak!`}>
              <Flame size={16} color="#f59e0b" />
              <span className="streak-num">{user.streak || 23}</span>
            </div>
          )}

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button className="topbar-btn" onClick={toggleNotifs}>
              <Bell size={18} />
              {hasUnread && <span className="topbar-notif-dot" />}
            </button>

            {showNotifs && (
              <div className="notifications-dropdown">
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--text-primary)' }}>Notifications</h4>
                {notifications.length === 0 ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>No notifications</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {notifications.map(n => (
                      <div key={n.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? 'transparent' : 'var(--purple-primary)', marginTop: 6, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: '0.85rem', margin: 0, color: n.read ? 'var(--text-secondary)' : '#fff' }}>{n.message}</p>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Avatar */}
          <button className="topbar-avatar" onClick={() => navigate('/profile')} title="View Profile">
            {user ? user.avatar : 'U'}
          </button>
        </div>
      </header>

      {/* Global Search Popup */}
      {showSearch && (
        <div className="search-overlay">
          <div className="search-popup">
            <div className="search-input-row">
              <Search size={18} className="search-icon-in" />
              <input
                ref={searchRef}
                className="search-input"
                placeholder="Search anything — pages, skills, projects..."
                value={searchQuery}
                onChange={e => handleSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              <button className="search-close-btn" onClick={closeSearch}>
                <X size={18} />
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="search-results">
                {searchResults.map((item, i) => (
                  <div
                    key={i}
                    className={`search-result-item ${selectedIndex === i ? 'selected' : ''}`}
                    onMouseEnter={() => setSelectedIndex(i)}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="result-icon">{item.icon}</span>
                    <div className="result-label">
                      <span>{item.label}</span>
                      <span className="result-category">{item.category}</span>
                    </div>
                    <ChevronRight size={14} className="result-arrow" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="search-empty">
                <p>No results for "{searchQuery}"</p>
              </div>
            )}

            <div className="search-footer">
              <span><kbd>↑↓</kbd> to navigate</span>
              <span><kbd>Enter</kbd> to select</span>
              <span><kbd>Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
