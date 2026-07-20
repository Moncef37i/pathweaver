import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PageBackButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)} 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        background: 'transparent', 
        border: 'none', 
        padding: '0 0 1.5rem 0', 
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        width: 'fit-content',
        fontSize: '0.9rem',
        fontWeight: 500,
        transition: 'color 0.2s ease',
        marginTop: '1rem'
      }}
      onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
      onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
      aria-label="Go Back"
    >
      <ArrowLeft size={16} /> Back
    </button>
  );
}
