import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { NotificationProvider } from './context/NotificationContext';
import Toast from './components/Toast';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import About from './pages/About';
import HelpCenter from './pages/HelpCenter';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import Roadmaps from './pages/Roadmaps';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Goals from './pages/Goals';
import Planner from './pages/Planner';
import Analytics from './pages/Analytics';
import CVBuilder from './pages/CVBuilder';
import Portfolio from './pages/Portfolio';
import Interview from './pages/Interview';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter basename="/pathweaver">
      <AuthProvider>
        <AppDataProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/community" element={<Community />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/cv-builder" element={<CVBuilder />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/interview" element={<Interview />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
          <Toast />
        </NotificationProvider>
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
