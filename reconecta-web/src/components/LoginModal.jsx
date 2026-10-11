import React, { useState } from 'react';
import { IconShield, IconAlertCircle, IconArrowRight } from './Icons';

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
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px'
    }}>
      <div style={{
        background: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '420px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconShield size={20} color="#38bdf8" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Acceso a Investigación
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Cerrar (X)
          </button>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '20px' }}>
          Módulo restringido para el equipo de investigación escolar. Permite auditar respuestas, consultar análisis grupal y exportar a SPSS.
        </p>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#fca5a5',
            fontSize: '0.84rem',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <IconAlertCircle size={16} color="#ef4444" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
              Usuario de Investigación
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            <span>{loading ? 'Verificando...' : 'Entrar al Panel de Investigación'}</span>
            <IconArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
