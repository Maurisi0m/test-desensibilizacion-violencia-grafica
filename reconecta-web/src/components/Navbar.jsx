import React, { useState } from 'react';

export default function Navbar({ currentView, setView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (view) => {
    setView(view);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <div className="brand-logo" onClick={() => handleNav('home')}>
          <div className="brand-icon">🧠</div>
          <div className="brand-text">Re<span>Conecta</span></div>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <button className={`nav-btn ${currentView === 'home' ? 'active' : ''}`} onClick={() => handleNav('home')}>
              Inicio
            </button>
          </li>
          <li>
            <button className={`nav-btn ${currentView === 'test' ? 'active' : ''}`} onClick={() => handleNav('test')}>
              Test Psicológico
            </button>
          </li>
          <li>
            <button className={`nav-btn ${currentView === 'history' ? 'active' : ''}`} onClick={() => handleNav('history')}>
              📋 Registro Histórico
            </button>
          </li>
          <li>
            <button className={`nav-btn ${currentView === 'sos' ? 'active' : ''}`} onClick={() => handleNav('sos')}>
              Primeros Auxilios
            </button>
          </li>
          <li>
            <button className={`nav-btn ${currentView === 'guides' ? 'active' : ''}`} onClick={() => handleNav('guides')}>
              Blindar Redes
            </button>
          </li>
          <li>
            <button className={`nav-btn ${currentView === 'detox' ? 'active' : ''}`} onClick={() => handleNav('detox')}>
              Reto 7 Días
            </button>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-sos-nav" onClick={() => handleNav('sos')}>
            <span>🚨</span> SOS
          </button>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
