import React from 'react';

export default function HeroSection({ setView }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="badge-tag">
          <span className="badge-dot"></span>
          Salud Mental & Bienestar Digital para Jóvenes (12-29 años)
        </div>

        <h1 className="hero-title">
          ¿Tus redes te están haciendo <br />
          <span className="gradient-text">insensible a la violencia?</span>
        </h1>

        <p className="hero-description">
          Videos de peleas escolares, balaceras o accidentes fatales aparecen en tus Reels o grupos de chat. Descubre qué le hace el morbo digital a tu cerebro, cómo proteger tu empatía y cómo limpiar tus algoritmos.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => setView('test')}>
            <span>📝</span> Realizar Test ED-CVG Online
          </button>
          <button className="btn-sos-nav" style={{ padding: '13px 24px', fontSize: '0.98rem' }} onClick={() => setView('sos')}>
            <span>🚨</span> Vi algo feo: Primeros Auxilios
          </button>
          <button className="btn-secondary" onClick={() => setView('history')}>
            <span>📋</span> Ver Registro de Encuestas
          </button>
        </div>
      </div>
    </section>
  );
}
