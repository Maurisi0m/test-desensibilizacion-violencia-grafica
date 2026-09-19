import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import SOSPage from './pages/SOSPage';
import GuidesPage from './pages/GuidesPage';
import DetoxPage from './pages/DetoxPage';

export default function App() {
  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '').trim();
    return ['home', 'test', 'results', 'history', 'sos', 'guides', 'detox'].includes(hash) ? hash : 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (['home', 'test', 'results', 'history', 'sos', 'guides', 'detox'].includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const changeView = (view) => {
    window.location.hash = view;
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestComplete = (result) => {
    setLatestResult(result);
    changeView('results');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar currentView={currentView} setView={changeView} />

      <main style={{ flexGrow: 1 }}>
        {currentView === 'home' && <HomePage setView={changeView} />}
        {currentView === 'test' && <TestPage onComplete={handleTestComplete} setView={changeView} />}
        {currentView === 'results' && <ResultsPage result={latestResult} setView={changeView} />}
        {currentView === 'history' && <HistoryPage setView={changeView} />}
        {currentView === 'sos' && <SOSPage setView={changeView} />}
        {currentView === 'guides' && <GuidesPage setView={changeView} />}
        {currentView === 'detox' && <DetoxPage setView={changeView} />}
      </main>

      <footer className="footer">
        <div className="container">
          <p style={{ marginBottom: '6px' }}>
            ReConecta Web © 2026 — Plataforma de Concientización y Salud Mental para Jóvenes.
          </p>
          <p style={{ color: 'var(--text-faint)', fontSize: '0.8rem' }}>
            Basado en el instrumento psicométrico ED-CVG y Terapia Cognitivo-Conductual (TCC). Base de datos SQLite integrada.
          </p>
        </div>
      </footer>
    </div>
  );
}
