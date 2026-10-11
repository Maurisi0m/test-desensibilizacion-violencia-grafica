import React, { useState } from 'react';
import { IconUser, IconAlertCircle, IconArrowRight } from './Icons';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('equiposalle');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Credenciales no válidas.');
      }

      localStorage.setItem('researchAuthToken', data.token);
      localStorage.setItem('researchAuthUser', data.username);
      setLoading(false);
      onLoginSuccess(data.username);
      onClose();
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Error al iniciar sesión.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(30, 27, 75, 0.45)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px'
    }}>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EDE4F8',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '430px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#F3E8FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <IconUser size={18} color="#7C3AED" />
            </div>
            <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: '#1E1B4B', margin: 0 }}>
              Acceso a Investigación
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#F5F3FF',
              border: 'none',
              color: '#6B7280',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        <p style={{ color: '#6B7280', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '22px' }}>
          Módulo restringido para el equipo de investigación La Salle. Permite auditar respuestas, consultar análisis individual/grupal y exportar datos a SPSS.
        </p>

        {errorMsg && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '10px',
            padding: '10px 14px',
            color: '#B91C1C',
            fontSize: '0.84rem',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <IconAlertCircle size={16} color="#B91C1C" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Usuario de Investigación:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="equiposalle"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                background: '#FAF8FE',
                border: '1px solid #E9D5FF',
                borderRadius: '10px',
                color: '#1E1B4B',
                fontSize: '0.92rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                background: '#FAF8FE',
                border: '1px solid #E9D5FF',
                borderRadius: '10px',
                color: '#1E1B4B',
                fontSize: '0.92rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              background: '#7C3AED',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.94rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)',
              transition: 'all 0.2s'
            }}
          >
            <span>{loading ? 'Verificando...' : 'Iniciar Sesión'}</span>
            <IconArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
