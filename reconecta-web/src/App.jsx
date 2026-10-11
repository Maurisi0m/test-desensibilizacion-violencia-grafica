import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ReferencesPage from './pages/ReferencesPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Verificar token guardado al iniciar
  useEffect(() => {
    const token = localStorage.getItem('researchAuthToken');
    const user = localStorage.getItem('researchAuthUser');
    if (token) {
      fetch('/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.authenticated) {
            setIsAuthenticated(true);
            setAuthUser(data.username || user || 'equiposalle');
          } else {
            localStorage.removeItem('researchAuthToken');
            localStorage.removeItem('researchAuthUser');
            setIsAuthenticated(false);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, []);

  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash === 'admin' && !localStorage.getItem('researchAuthToken')) {
      return 'test';
    }
    return ['test', 'results', 'admin', 'references'].includes(hash) ? hash : 'test';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash === 'admin' && !isAuthenticated) {
        setIsLoginModalOpen(true);
        setCurrentView('test');
        window.location.hash = 'test';
        return;
      }
      if (['test', 'results', 'admin', 'references'].includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [isAuthenticated]);

  const changeView = (view) => {
    if (view === 'admin' && !isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    window.location.hash = view;
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestComplete = (result) => {
    setLatestResult(result);
    changeView('results');
  };

  const handleLoginSuccess = (username) => {
    setIsAuthenticated(true);
    setAuthUser(username);
    changeView('admin');
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('researchAuthToken');
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      }).catch(() => {});
    }
    localStorage.removeItem('researchAuthToken');
    localStorage.removeItem('researchAuthUser');
    setIsAuthenticated(false);
    setAuthUser('');
    changeView('test');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0b0f19', color: '#f8fafc' }}>
      <Navbar
        currentView={currentView}
        setView={changeView}
        isAuthenticated={isAuthenticated}
        authUser={authUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <main style={{ flexGrow: 1 }}>
        {currentView === 'test' && (
          <TestPage onComplete={handleTestComplete} />
        )}
        {currentView === 'results' && (
          <ResultsPage result={latestResult} onBackToTest={() => changeView('test')} />
        )}
        {currentView === 'admin' && isAuthenticated && (
          <AdminDashboardPage
            onViewIndividual={(item) => {
              setLatestResult(item);
              changeView('results');
            }}
            onRequireLogin={() => {
              setIsAuthenticated(false);
              setIsLoginModalOpen(true);
            }}
          />
        )}
        {currentView === 'references' && (
          <ReferencesPage />
        )}
      </main>

      <footer style={{
        background: '#090d16',
        borderTop: '1px solid #1e293b',
        padding: '24px 20px',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: '#64748b'
      }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 6px 0', fontWeight: 600, color: '#94a3b8' }}>
            Investigación Escolar Cuantitativa: Exposición a Violencia Gráfica y Desensibilización
          </p>
          <p style={{ margin: 0, fontSize: '0.78rem' }}>
            Instrumento de 42 reactivos. Variable Central: Desensibilización y Habituación (Bloque 2).
            Acceso público para responder el cuestionario. Panel administrativo restringido para el equipo de investigación.
          </p>
        </div>
      </footer>
    </div>
  );
}
