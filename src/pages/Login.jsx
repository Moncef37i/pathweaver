import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, GitBranch, ArrowRight, Lock } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    login({ name: 'Souilah Moncef', email: 'souilah@example.com', avatar: 'SM' });
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-gradient-blob blob-1"></div>
        <div className="login-gradient-blob blob-2"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon"></div>
            <h2>PathWeaver</h2>
          </div>
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue building your skills.</p>
        </div>

        <div className="login-oauth">
          <button className="oauth-btn" onClick={handleLogin}>
            <Mail size={20} />
            Continue with Google
          </button>
          <button className="oauth-btn" onClick={handleLogin}>
            <GitBranch size={20} />
            Continue with GitHub
          </button>
        </div>

        <div className="login-divider">
          <span>Or continue with email</span>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock size={16} className="password-icon" />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-submit-btn">
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}
