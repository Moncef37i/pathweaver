import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { interviewQuestions } from '../data/mockData';
import { Clock, Play, CheckCircle, Star, ChevronDown, ChevronUp, Lightbulb, X, Check } from 'lucide-react';
import './Interview.css';

const categoryMap = {
  'Frontend': 'Frontend',
  'Backend': 'Backend',
  'Full Stack': 'FullStack',
  'HR': 'HR'
};

const tipsMap = {
  'Frontend': "Focus on UI/UX, browser APIs, and state management. Be ready to discuss performance optimizations.",
  'Backend': "Emphasize scalability, database design, and API security. Know your system architecture deeply.",
  'Full Stack': "Showcase your ability to connect the dots between the client and server. Discuss end-to-end solutions.",
  'HR': "Be authentic. Use the STAR method (Situation, Task, Action, Result) for behavioral questions."
};

const Interview = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  
  // Initialize answered state from mockData
  const [answeredState, setAnsweredState] = useState(() => {
    const initial = {};
    Object.values(interviewQuestions).forEach(category => {
      category.forEach(q => {
        if (q.answered) initial[q.id] = true;
      });
    });
    return initial;
  });

  const [bookmarked, setBookmarked] = useState({});
  const [expanded, setExpanded] = useState({});
  const [userAnswers, setUserAnswers] = useState({});

  const [isMockMode, setIsMockMode] = useState(false);
  const [mockIndex, setMockIndex] = useState(0);
  const [mockTimeRemaining, setMockTimeRemaining] = useState(300); // 5 minutes

  const currentCategoryKey = categoryMap[activeTab];
  const questions = interviewQuestions[currentCategoryKey] || [];

  useEffect(() => {
    let timer;
    if (isMockMode && mockTimeRemaining > 0) {
      timer = setInterval(() => {
        setMockTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (mockTimeRemaining === 0 && isMockMode) {
      // Auto-advance or just stop. For now, just sit at 0
    }
    return () => clearInterval(timer);
  }, [isMockMode, mockTimeRemaining]);

  const toggleAnswered = (id) => setAnsweredState(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleBookmark = (id) => setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  const handleAnswerChange = (id, value) => setUserAnswers(prev => ({ ...prev, [id]: value }));

  const startMockInterview = () => {
    setIsMockMode(true);
    setMockIndex(0);
    setMockTimeRemaining(300);
  };

  const nextMockQuestion = () => {
    if (mockIndex < questions.length - 1) {
      setMockIndex(mockIndex + 1);
      setMockTimeRemaining(300);
    } else {
      endMockInterview();
    }
  };

  const endMockInterview = () => {
    setIsMockMode(false);
    setMockTimeRemaining(300);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = questions.filter(q => answeredState[q.id]).length;
  const totalCount = questions.length;
  const remainingCount = totalCount - answeredCount;
  const completionPercentage = totalCount === 0 ? 0 : Math.round((answeredCount / totalCount) * 100);

  if (isMockMode) {
    const currentQ = questions[mockIndex];
    return (
      <motion.div 
        className="mock-interview-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="mock-container"
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="mock-header">
            <div className="mock-progress-text">Question {mockIndex + 1} of {totalCount}</div>
            <div className={`mock-timer ${mockTimeRemaining < 60 ? 'urgent' : ''}`}>
              <Clock size={24} />
              <span>{formatTime(mockTimeRemaining)}</span>
            </div>
            <button onClick={endMockInterview} className="btn btn-secondary mock-end-btn">
              <X size={18} /> End Session
            </button>
          </div>
          
          <div className="mock-card card">
            <AnimatePresence mode="wait">
              <motion.div 
                key={mockIndex}
                className="mock-card-content"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mock-tags">
                  <span className={`badge badge-${currentQ.difficulty.toLowerCase() === 'easy' ? 'green' : currentQ.difficulty.toLowerCase() === 'medium' ? 'yellow' : 'red'}`}>
                    {currentQ.difficulty}
                  </span>
                  <span className="badge badge-gray">{currentQ.topic}</span>
                </div>
                
                <h2 className="mock-question">{currentQ.question}</h2>
                
                <textarea 
                  className="mock-textarea"
                  placeholder="Type your answer here or practice speaking out loud..."
                  value={userAnswers[currentQ.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="mock-actions">
              <button className="btn btn-primary" onClick={nextMockQuestion}>
                {mockIndex === totalCount - 1 ? 'Finish Interview' : 'Next Question'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="page-content interview-page">
      <div className="section-header">
        <div>
          <h1>Interview Practice</h1>
          <p>Prepare for your next role with curated questions.</p>
        </div>
        <button className="btn btn-primary" onClick={startMockInterview}>
          <Play size={18} /> Start Mock Interview
        </button>
      </div>

      <div className="tabs interview-tabs">
        {Object.keys(categoryMap).map(cat => (
          <button 
            key={cat} 
            className={`tab ${activeTab === cat ? 'active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat} <span className="tab-count">{interviewQuestions[categoryMap[cat]].length}</span>
          </button>
        ))}
      </div>

      <div className="tips-panel">
        <div className="tips-icon-wrapper">
          <Lightbulb size={24} />
        </div>
        <div className="tips-content">
          <strong>Pro Tip ({activeTab}):</strong> {tipsMap[activeTab]}
        </div>
      </div>

      <div className="progress-banner card">
        <div className="progress-banner-info">
          <div className="stat-group">
            <span className="stat-value">{answeredCount}</span>
            <span className="stat-label">Answered</span>
          </div>
          <div className="stat-group">
            <span className="stat-value">{remainingCount}</span>
            <span className="stat-label">Remaining</span>
          </div>
        </div>
        <div className="progress-banner-bar">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
          </div>
        </div>
        <div className="progress-banner-pct">
          {completionPercentage}% Completion
        </div>
      </div>

      <motion.div layout className="grid-auto questions-grid">
        <AnimatePresence>
          {questions.map((q, idx) => (
            <motion.div 
              key={q.id} 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
              className={`card question-card ${answeredState[q.id] ? 'is-answered' : ''}`}
            >
              <div className="question-header">
                <div className="question-tags">
                  <span className={`badge badge-${q.difficulty.toLowerCase() === 'easy' ? 'green' : q.difficulty.toLowerCase() === 'medium' ? 'yellow' : 'red'}`}>
                    {q.difficulty}
                  </span>
                  <span className="badge badge-gray">{q.topic}</span>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  className={`bookmark-btn ${bookmarked[q.id] ? 'bookmarked' : ''}`}
                  onClick={() => toggleBookmark(q.id)}
                  title="Bookmark Question"
                >
                  <Star size={18} fill={bookmarked[q.id] ? "currentColor" : "none"} />
                </motion.button>
              </div>

              <h3 className="question-title">{q.question}</h3>

              <div className="question-actions">
                <button className="btn-ghost toggle-answer" onClick={() => toggleExpand(q.id)}>
                  {expanded[q.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  {expanded[q.id] ? 'Hide Answer' : 'Show Answer'}
                </button>
                
                <button 
                  className={`btn-ghost mark-answered ${answeredState[q.id] ? 'active' : ''}`}
                  onClick={() => toggleAnswered(q.id)}
                >
                  {answeredState[q.id] ? <CheckCircle size={16} /> : <Check size={16} />}
                  {answeredState[q.id] ? 'Answered' : 'Mark Answered'}
                </button>
              </div>

              <AnimatePresence>
                {expanded[q.id] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="answer-section"
                    style={{ overflow: 'hidden' }}
                  >
                    <label>Your Answer</label>
                    <textarea 
                      className="input"
                      placeholder="Type your practice answer here..."
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      rows={4}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Interview;
