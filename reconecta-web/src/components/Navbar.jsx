import React from 'react';
import { IconClipboard, IconBarChart, IconBookOpen, IconShield } from './Icons';

export default function Navbar({ currentView, setView, isAuthenticated, onOpenLogin, onLogout, authUser }) {
  return (
    <header className="navbar" style={{
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1e293b',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Brand */}
        <div 
          onClick={() => setView('test')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #0284c7, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <IconClipboard size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Investigación Escolar
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
              Exposición a Violencia Gráfica y Desensibilización
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setView('test')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: currentView === 'test' ? '#1e293b' : 'transparent',
              color: currentView === 'test' ? '#38bdf8' : '#94a3b8',
              borderBottom: currentView === 'test' ? '2px solid #38bdf8' : '2px solid transparent'
            }}
          >
            <IconClipboard size={16} />
            <span>Cuestionario (42 Reactivos)</span>
          </button>

          {/* Panel de Investigación solo visible / accesible si está autenticado */}
          {isAuthenticated && (
            <button
              onClick={() => setView('admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: currentView === 'admin' ? '#1e293b' : 'transparent',
                color: currentView === 'admin' ? '#38bdf8' : '#94a3b8',
                borderBottom: currentView === 'admin' ? '2px solid #38bdf8' : '2px solid transparent'
              }}
            >
              <IconBarChart size={16} />
              <span>Panel de Investigación Grupal</span>
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
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              background: currentView === 'references' ? '#1e293b' : 'transparent',
              color: currentView === 'references' ? '#38bdf8' : '#94a3b8',
              borderBottom: currentView === 'references' ? '2px solid #38bdf8' : '2px solid transparent'
            }}
          >
            <IconBookOpen size={16} />
            <span>Marco Teórico APA 7</span>
          </button>

          {/* Botón Iniciar Sesión / Cerrar Sesión */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px', paddingLeft: '8px', borderLeft: '1px solid #334155' }}>
              <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>
                {authUser}
              </span>
              <button
                onClick={onLogout}
                style={{
                  padding: '6px 12px',
                  background: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
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
                padding: '6px 14px',
                background: 'rgba(56, 189, 248, 0.1)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginLeft: '8px'
              }}
            >
              <IconShield size={14} color="#38bdf8" />
              <span>Acceso Investigadores</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
