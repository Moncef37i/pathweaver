import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  skills as initialSkills,
  projects as initialProjects,
  goals as initialGoals,
  user as defaultUser,
} from '../data/mockData';

const STORAGE_KEY = 'pathweaver_app_data';

const defaultCvData = {
  personal: {
    name: defaultUser.name,
    title: defaultUser.title,
    email: defaultUser.email,
    phone: defaultUser.phone,
    location: defaultUser.location,
    website: defaultUser.website,
    linkedin: defaultUser.linkedin,
    github: defaultUser.github,
    portfolio: defaultUser.portfolio,
  },
  summary: defaultUser.bio,
  selectedSkills: initialSkills.slice(0, 8).map((s) => s.name),
  experience: [
    {
      id: 1,
      company: 'Freelance / Personal Projects',
      role: 'Full Stack Developer',
      startDate: 'Jan 2024',
      endDate: 'Present',
      description:
        'Building web applications with React, Node.js, and modern tooling. Created PathWeaver and personal portfolio projects.',
    },
  ],
  education: [
    {
      id: 1,
      school: 'University of Algiers',
      degree: 'Computer Science',
      year: '2020 - 2024',
      gpa: '3.7',
    },
  ],
  selectedProjects: initialProjects.slice(0, 3).map((p) => p.id),
};

function loadStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const stored = loadStored();

  const [skillsList, setSkillsList] = useState(stored?.skills ?? initialSkills);
  const [projectsList, setProjectsList] = useState(stored?.projects ?? initialProjects);
  const [goalsList, setGoalsList] = useState(stored?.goals ?? initialGoals);
  const [cvData, setCvData] = useState(stored?.cvData ?? defaultCvData);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        skills: skillsList,
        projects: projectsList,
        goals: goalsList,
        cvData,
      })
    );
  }, [skillsList, projectsList, goalsList, cvData]);

  const addSkill = useCallback((skill) => {
    setSkillsList((prev) => [...prev, { ...skill, id: Date.now() }]);
  }, []);

  const addProject = useCallback((project) => {
    setProjectsList((prev) => [...prev, { ...project, id: Date.now() }]);
  }, []);

  const addGoal = useCallback((goal) => {
    setGoalsList((prev) => [...prev, { ...goal, id: Date.now() }]);
  }, []);

  const updateGoals = useCallback((updater) => {
    setGoalsList(updater);
  }, []);

  const stats = {
    skillsLearned: skillsList.length,
    projectsCompleted: projectsList.filter((p) => p.status === 'Completed').length,
    learningHours: 342,
    roadmapsCompleted: 2,
  };

  return (
    <AppDataContext.Provider
      value={{
        skills: skillsList,
        projects: projectsList,
        goals: goalsList,
        cvData,
        setCvData,
        addSkill,
        addProject,
        addGoal,
        updateGoals,
        stats,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}
