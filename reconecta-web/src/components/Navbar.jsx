import React from 'react';
import { IconBarChart, IconBookOpen, IconUser, IconCheckCircle } from './Icons';

export default function Navbar({ currentView, setView, isAuthenticated, onOpenLogin, onLogout, authUser }) {
  return (
    <header className="navbar" style={{
      background: 'rgba(255, 255, 255, 0.96)',
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
        padding: '12px 20px',
        maxWidth: '1220px',
        margin: '0 auto',
        gap: '16px'
      }}>
        {/* Brand / Título de la Web */}
        <div 
          onClick={() => setView('test')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div>
            <div style={{ 
              fontWeight: 800, 
              fontSize: '1.18rem', 
              color: '#1E1B4B', 
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
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
            <div style={{ fontSize: '0.76rem', color: '#6B7280', fontWeight: 500 }}>
              Exposición a Contenido Violento Gráfico en Redes Sociales • La Salle Pachuca
            </div>
          </div>
        </div>

        {/* Navigation Tabs y Lado Derecho */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setView('test')}
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
                onClick={() => setView('admin')}
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
              onClick={() => setView('references')}
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
                  onClick={onLogout}
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
                onClick={onOpenLogin}
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

          {/* Logo Oficial de La Salle en la Esquina Superior Derecha */}
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
                height: '42px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
