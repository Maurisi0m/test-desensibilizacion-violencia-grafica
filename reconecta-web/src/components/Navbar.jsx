import React, { useState } from 'react';
import { IconBarChart, IconBookOpen, IconUser, IconMenu, IconX } from './Icons';

export default function Navbar({ currentView, setView, isAuthenticated, onOpenLogin, onLogout, authUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  const handleOpenLogin = () => {
    onOpenLogin();
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar" style={{
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #EDE4F8',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(124, 58, 237, 0.05)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        maxWidth: '1220px',
        margin: '0 auto',
        gap: '12px'
      }}>
        {/* Brand / Título de la Web */}
        <div 
          onClick={() => handleNav('test')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ 
              fontWeight: 800, 
              fontSize: '1.12rem', 
              color: '#1E1B4B', 
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
              }}>
                Redes & Violencia
              </span>
            </div>
            {/* Subtítulo responsive: completo en desktop, sintético en móvil */}
            <div className="nav-subtitle-full" style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Exposición a Contenido Violento Gráfico en Redes Sociales • La Salle Pachuca
            </div>
            <div className="nav-subtitle-short" style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 600 }}>
              La Salle Pachuca
            </div>
          </div>
        </div>

        {/* Lado Derecho Desktop (oculto en móvil) */}
        <div className="nav-desktop-menu">
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => handleNav('test')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: currentView === 'test' ? '#F3E8FF' : 'transparent',
                color: currentView === 'test' ? '#7C3AED' : '#475569',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Cuestionario (42 Ítems)</span>
            </button>

            {/* Panel de Investigación solo visible si está autenticado */}
            {isAuthenticated && (
              <button
                onClick={() => handleNav('admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: currentView === 'admin' ? '#F3E8FF' : 'transparent',
                  color: currentView === 'admin' ? '#7C3AED' : '#475569',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconBarChart size={16} color={currentView === 'admin' ? '#7C3AED' : '#475569'} />
                <span>Panel de Investigación</span>
              </button>
            )}

            <button
              onClick={() => handleNav('references')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: currentView === 'references' ? '#F3E8FF' : 'transparent',
                color: currentView === 'references' ? '#7C3AED' : '#475569',
                transition: 'all 0.2s ease'
              }}
            >
              <IconBookOpen size={16} color={currentView === 'references' ? '#7C3AED' : '#475569'} />
              <span>Marco Teórico APA 7</span>
            </button>

            {/* Botón Acceso Investigadores / Cerrar Sesión con icono de persona */}
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px', paddingLeft: '10px', borderLeft: '1px solid #EDE4F8' }}>
                <span style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.8rem', 
                  color: '#7C3AED', 
                  fontWeight: 700,
                  background: '#F3E8FF',
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  <IconUser size={13} color="#7C3AED" />
                  {authUser}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '6px 12px',
                    background: '#FFFFFF',
                    color: '#64748B',
                    border: '1px solid #EDE4F8',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button
                onClick={handleOpenLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 15px',
                  background: '#7C3AED',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginLeft: '8px',
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                <IconUser size={15} color="#FFFFFF" />
                <span>Acceso Investigadores</span>
              </button>
            )}
          </nav>

          {/* Logo Oficial de La Salle en Desktop */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '12px',
            borderLeft: '1px solid #EDE4F8'
          }}>
            <img 
              src="/lasalle-logo.png" 
              alt="Logo La Salle" 
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Lado Derecho Móvil: Logo compacto + Botón hamburguesa */}
        <div className="nav-mobile-controls">
          <img 
            src="/lasalle-logo.png" 
            alt="Logo La Salle" 
            style={{
              height: '32px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
          <button
            type="button"
            className="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              border: '1px solid #DDD6FE',
              background: mobileMenuOpen ? '#F3E8FF' : '#F8FAFC',
              color: '#7C3AED',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <IconX size={20} color="#7C3AED" /> : <IconMenu size={20} color="#7C3AED" />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="nav-mobile-drawer" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '14px 16px 18px',
          background: '#FFFFFF',
          borderTop: '1px solid #F1F5F9',
          borderBottom: '2px solid #EDE4F8',
          boxShadow: '0 12px 24px rgba(124, 58, 237, 0.08)'
        }}>
          <button
            onClick={() => handleNav('test')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: currentView === 'test' ? '#F3E8FF' : '#F8FAFC',
              color: currentView === 'test' ? '#7C3AED' : '#334155',
              textAlign: 'left'
            }}
          >
            <span>Cuestionario Principal</span>
            <span style={{ fontSize: '0.74rem', background: '#DDD6FE', color: '#5B21B6', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>42 Ítems</span>
          </button>

          <button
            onClick={() => handleNav('references')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: currentView === 'references' ? '#F3E8FF' : '#F8FAFC',
              color: currentView === 'references' ? '#7C3AED' : '#334155',
              textAlign: 'left'
            }}
          >
            <IconBookOpen size={18} color={currentView === 'references' ? '#7C3AED' : '#64748B'} />
            <span>Marco Teórico APA 7</span>
          </button>

          {isAuthenticated && (
            <button
              onClick={() => handleNav('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: currentView === 'admin' ? '#F3E8FF' : '#F8FAFC',
                color: currentView === 'admin' ? '#7C3AED' : '#334155',
                textAlign: 'left'
              }}
            >
              <IconBarChart size={18} color={currentView === 'admin' ? '#7C3AED' : '#64748B'} />
              <span>Panel de Investigación (Admin)</span>
            </button>
          )}

          <div style={{ marginTop: '6px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <span style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.84rem', 
                  color: '#7C3AED', 
                  fontWeight: 700,
                  background: '#F3E8FF',
                  padding: '6px 12px',
                  borderRadius: '8px'
                }}>
                  <IconUser size={15} color="#7C3AED" />
                  {authUser}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '8px 14px',
                    background: '#FFFFFF',
                    color: '#EF4444',
                    border: '1px solid #FEE2E2',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button
                onClick={handleOpenLogin}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '11px',
                  background: '#7C3AED',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(124, 58, 237, 0.25)'
                }}
              >
                <IconUser size={16} color="#FFFFFF" />
                <span>Acceso Investigadores</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

