import React from 'react';

export default function CrisisBanner() {
  return (
    <div className="container">
      <div className="crisis-footer-banner">
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px', color: '#FFFFFF' }}>
            ¿Sientes angustia, miedo o necesitas hablar con alguien?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Líneas psicológicas oficiales, gratuitas, confidenciales y atendidas por especialistas las 24 horas.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="tel:8009112000" className="phone-pill">
            <span>📞</span> Línea de la Vida: 800 911 2000
          </a>
          <a href="tel:5555335533" className="phone-pill" style={{ background: '#6366F1' }}>
            <span>💬</span> Consejo Ciudadano: 55 5533 5533
          </a>
        </div>
      </div>
    </div>
  );
}
