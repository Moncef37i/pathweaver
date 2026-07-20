import { useState } from 'react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { analyticsData, skillGrowthData, skills } from '../data/mockData';
import { TrendingUp, Clock, Target, Zap, Award, Brain, ChevronUp } from 'lucide-react';
import './Analytics.css';

const periods = ['Last 7 Days', 'Last Month', 'Last 3 Months', 'Last Year'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-label">{label}</div>
        {payload.map((p, i) => (
          <div key={i} className="chart-tooltip-item" style={{ color: p.color }}>
            <span>{p.name}: </span>
            <strong>{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const categoryData = Object.entries(
  skills.reduce((acc, s) => { acc[s.category] = (acc[s.category] || 0) + 1; return acc; }, {})
).map(([name, value]) => ({ name, value }));

const PIE_COLORS = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

const milestones = [
  { text: 'Reached Advanced level in React', date: 'Feb 2024', icon: '⚛️' },
  { text: 'Completed 100 learning hours milestone', date: 'Feb 2024', icon: '⏰' },
  { text: 'Earned Speed Learner badge', date: 'Mar 2024', icon: '⚡' },
  { text: 'Completed Frontend Roadmap 72%', date: 'Apr 2024', icon: '🎨' },
  { text: 'Started DevOps journey', date: 'May 2024', icon: '🔧' },
  { text: 'Passed 300 total learning hours', date: 'Jun 2024', icon: '🏆' },
];

export default function Analytics() {
  const [period, setPeriod] = useState('Last Month');
  const data = analyticsData[period] || analyticsData['Last Month'];

  const kpiCards = [
    { label: 'Total Hours', value: data.totalHours, unit: 'hrs', icon: Clock, color: '#8b5cf6', trend: `+${Math.round(data.totalHours * 0.12)}` },
    { label: 'Skills Mastered', value: data.skillsMastered, unit: '', icon: Brain, color: '#3b82f6', trend: '+3' },
    { label: 'Goals Completed', value: data.goalsCompleted, unit: '', icon: Target, color: '#10b981', trend: '+1' },
    { label: 'Avg Daily Hours', value: data.avgDailyHours, unit: 'hrs/day', icon: Zap, color: '#f59e0b', trend: '+0.5' },
  ];

  return (
    <div className="analytics-page page-enter">
      {/* Period Selector */}
      <div className="analytics-header">
        <div className="tabs">
          {periods.map(p => (
            <button key={p} className={`tab ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="analytics-kpi-grid">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="analytics-kpi-card stat-card" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="kpi-top">
                <div className="kpi-icon" style={{ background: `${card.color}20`, color: card.color }}>
                  <Icon size={20} />
                </div>
                <div className="kpi-trend">
                  <ChevronUp size={12} color="#10b981" />
                  <span style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>{card.trend}</span>
                </div>
              </div>
              <div className="kpi-value" style={{ color: card.color }}>{card.value}<span className="kpi-unit">{card.unit}</span></div>
              <div className="kpi-label">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="analytics-charts">
        {/* Dynamic chart based on period */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>📈 Learning Hours — {period}</h3>
            <span className="badge badge-purple">{data.chart.length} data points</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data.chart}>
              <defs>
                <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="hours" name="Hours" stroke="#8b5cf6" strokeWidth={2} fill="url(#hoursGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Growth */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>🚀 Skill Growth</h3>
            <span className="badge badge-blue">By Domain</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={skillGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '12px', color: 'var(--text-muted)' }} />
              <Line type="monotone" dataKey="frontend" name="Frontend" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="backend" name="Backend" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="devops" name="DevOps" stroke="#06b6d4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills by Category Pie */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>🏷️ Skills by Category</h3>
          </div>
          <div className="pie-wrapper">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {categoryData.map((cat, i) => (
                <div key={i} className="pie-legend-item">
                  <span className="pie-dot" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span>{cat.name}</span>
                  <span className="pie-count">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="chart-card insights-card">
          <div className="chart-header">
            <h3>💡 Learning Insights</h3>
          </div>
          <div className="insights-list">
            <div className="insight-item">
              <div className="insight-icon" style={{ background: 'rgba(139,92,246,0.15)' }}>🎯</div>
              <div>
                <div className="insight-title">Top Category</div>
                <div className="insight-value">Frontend (6 skills)</div>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon" style={{ background: 'rgba(59,130,246,0.15)' }}>📅</div>
              <div>
                <div className="insight-title">Most Active Day</div>
                <div className="insight-value">Friday (5.0 hrs avg)</div>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>🔥</div>
              <div>
                <div className="insight-title">Current Streak</div>
                <div className="insight-value">23 days 🔥</div>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>⚡</div>
              <div>
                <div className="insight-title">Recommendation</div>
                <div className="insight-value">Focus on TypeScript</div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="chart-card milestones-card">
          <div className="chart-header">
            <h3>🏆 Recent Milestones</h3>
          </div>
          <div className="milestones-timeline">
            {milestones.map((m, i) => (
              <div key={i} className="milestone-item">
                <div className="milestone-line" />
                <div className="milestone-dot">{m.icon}</div>
                <div className="milestone-content">
                  <div className="milestone-text">{m.text}</div>
                  <div className="milestone-date">{m.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
