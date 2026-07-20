import React, { useState } from 'react';
import { Sparkles, Trophy, Flame, Target, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievements, stats, user } from '../data/mockData';
import './Achievements.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const Achievements = () => {
  const [filter, setFilter] = useState('All');

  const earnedAchievements = achievements.filter(a => a.earned);
  const totalXP = earnedAchievements.reduce((acc, a) => acc + a.xp, 0);
  const currentLevel = Math.floor(totalXP / 1000) + 1;
  const nextLevelXP = currentLevel * 1000;
  const progressPercent = Math.min(((totalXP % 1000) / 1000) * 100, 100); 
  const rank = "Senior Developer"; 

  const handleFilter = (type) => {
    setFilter(type);
  };

  const getFilteredAchievements = () => {
    let filtered = achievements;
    if (filter === 'Earned') filtered = filtered.filter(a => a.earned);
    if (filter === 'Not Earned') filtered = filtered.filter(a => !a.earned);
    if (['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].includes(filter)) {
      filtered = filtered.filter(a => a.rarity === filter);
    }
    return filtered;
  };

  return (
    <motion.div 
      className="achievements-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 1. XP/Level Banner */}
      <motion.div variants={itemVariants} className="xp-banner glass-panel">
        <div className="xp-banner-content">
          <div className="level-info">
            <h2>Level {currentLevel} - {rank}</h2>
            <div className="total-xp">
              <Sparkles className="sparkle-icon" size={24} />
              <span>{totalXP.toLocaleString()} XP</span>
            </div>
          </div>
          <div className="xp-progress-container">
            <div className="xp-progress-bar">
              <div className="xp-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="xp-text">
              {(totalXP % 1000).toLocaleString()} / 1,000 XP to Level {currentLevel + 1}
            </div>
          </div>
        </div>
        <div className="animated-sparkles">
          <div className="sparkle s1"></div>
          <div className="sparkle s2"></div>
          <div className="sparkle s3"></div>
          <div className="sparkle s4"></div>
          <div className="sparkle s5"></div>
        </div>
      </motion.div>

      {/* 2. Stats Row */}
      <div className="stats-row">
        <div className="stat-card glass-panel">
          <Trophy className="stat-icon earned-icon" size={28} />
          <div className="stat-info">
            <h3>{earnedAchievements.length}</h3>
            <p>Earned Badges</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <Sparkles className="stat-icon xp-icon" size={28} />
          <div className="stat-info">
            <h3>{totalXP.toLocaleString()}</h3>
            <p>Total XP</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <Flame className="stat-icon streak-icon" size={28} />
          <div className="stat-info">
            <h3>{user.streak} Days</h3>
            <p>Current Streak</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <Target className="stat-icon rank-icon" size={28} />
          <div className="stat-info">
            <h3>{rank}</h3>
            <p>Current Rank</p>
          </div>
        </div>
      </div>

      {/* 3. Filter tabs */}
      <div className="filter-tabs">
        {['All', 'Earned', 'Not Earned', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].map(f => (
          <button 
            key={f} 
            className={`filter-btn ${filter === f ? 'active' : ''} ${['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].includes(f) ? `rarity-${f.toLowerCase()}` : ''}`}
            onClick={() => handleFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 4. Achievement Cards Grid */}
      <motion.div variants={containerVariants} className="achievements-grid">
        <AnimatePresence>
          {getFilteredAchievements().map(achievement => (
            <motion.div 
              layout
              key={achievement.id} 
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={achievement.earned ? { scale: 1.05, rotate: [0, -2, 2, -2, 0], transition: { duration: 0.3 } } : { scale: 1.02 }}
              className={`achievement-card glass-panel ${achievement.earned ? 'earned' : 'locked'} rarity-${achievement.rarity.toLowerCase()}`}
            >
              {!achievement.earned && (
                <div className="locked-overlay">
                  <Lock size={32} />
                  <span>Locked</span>
                </div>
              )}
              <div className="card-header">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="xp-badge">+{achievement.xp} XP</div>
              </div>
              <div className="card-body">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
              <div className="card-footer">
                <span className={`rarity-badge ${achievement.rarity.toLowerCase()}`}>
                  {achievement.rarity}
                </span>
                {achievement.earned && <span className="date-earned">{achievement.date}</span>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 6. Recent Achievements timeline */}
      <motion.div variants={itemVariants} className="recent-achievements glass-panel">
        <h3>Recent Achievements</h3>
        <div className="timeline">
          {earnedAchievements.slice(0, 3).map((a, i) => (
            <motion.div 
              key={a.id} 
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <div className="timeline-icon">{a.icon}</div>
              <div className="timeline-content">
                <h4>{a.title}</h4>
                <p>Earned {a.xp} XP</p>
                <span className="timeline-date">{a.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Achievements;
