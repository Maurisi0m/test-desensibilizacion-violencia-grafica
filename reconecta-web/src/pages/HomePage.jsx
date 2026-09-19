import React from 'react';
import HeroSection from '../components/HeroSection';
import CrisisBanner from '../components/CrisisBanner';

export default function HomePage({ setView }) {
  return (
    <div>
      <HeroSection setView={setView} />

      {/* Stats banner */}
      <div className="container">
        <div className="stats-banner">
          <div className="stat-item">
            <div className="stat-icon-wrap">⚡</div>
            <div>
              <div className="stat-num">82%</div>
              <div className="stat-label">de jóvenes ven violencia involuntaria en feeds semanales</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrap">🫀</div>
            <div>
              <div className="stat-num">-40%</div>
              <div className="stat-label">reducción del reflejo de sobresalto por habituación</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-wrap">🛡️</div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">reversible con higiene algorítmica y reconexión empática</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '34px' }}>
          <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Herramientas Gratuitas y Anónimas
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '6px 0 10px' }}>
            ¿Cómo te ayuda ReConecta hoy?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Diseñado con psicología cognitiva y neurociencia afectiva para acompañarte sin juzgarte.
          </p>
        </div>

        <div className="cards-grid">
          <div className="feature-card" onClick={() => setView('sos')}>
            <div className="card-icon" style={{ background: 'rgba(244, 63, 94, 0.15)', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#FB7185' }}>🚨</div>
            <h3 className="card-title">Botón SOS: Primeros Auxilios</h3>
            <p className="card-desc">
              ¿Acabas de toparte con un video perturbador o sangriento? Usa nuestra respiración guiada 4-7-8 y la técnica 5-4-3-2-1 para calmar tu sistema nervioso ahora.
            </p>
            <div className="card-action">Entrar a Primeros Auxilios →</div>
          </div>

          <div className="feature-card" onClick={() => setView('test')}>
            <div className="card-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#818CF8' }}>📊</div>
            <h3 className="card-title">Test Científico ED-CVG</h3>
            <p className="card-desc">
              20 preguntas adaptadas a tu edad (12-17 o 18-29) para medir con precisión cuánta insensibilidad has acumulado, distinguiendo si proviene del algoritmo o de tu búsqueda voluntaria.
            </p>
            <div className="card-action">Iniciar Evaluación (3 min) →</div>
          </div>

          <div className="feature-card" onClick={() => setView('guides')}>
            <div className="card-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', borderColor: 'rgba(6, 182, 212, 0.3)', color: '#38BDF8' }}>🛡️</div>
            <h3 className="card-title">Blindaje de Algoritmos</h3>
            <p className="card-desc">
              Tutoriales con capturas paso a paso para silenciar palabras clave tóxicas, desactivar la reproducción automática y resetear recomendaciones en TikTok, IG, X y Telegram.
            </p>
            <div className="card-action">Ver Guías de Configuración →</div>
          </div>

          <div className="feature-card" onClick={() => setView('detox')}>
            <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#34D399' }}>🌱</div>
            <h3 className="card-title">Reto Detox de 7 Días</h3>
            <p className="card-desc">
              Una meta diaria sencilla para deshabituar tu cerebro del morbo digital, recuperar el sueño reparador y ejercitar la empatía real sin necesidad de borrar tus redes.
            </p>
            <div className="card-action">Comenzar Reto Gratuito →</div>
          </div>
        </div>
      </div>

      {/* Mythbusting awareness */}
      <div className="container">
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '20px',
          padding: '36px',
          marginBottom: '40px'
        }}>
          <div style={{ textAlign: 'left', marginBottom: '24px' }}>
            <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Concientización Psicológica
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '6px 0 8px' }}>
              Mitos vs. Realidades del Morbo Digital
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Lo que la industria de las redes no te cuenta sobre el consumo de violencia gráfica.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
              <div style={{ color: '#F87171', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>❌ MITO POPULAR</div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '10px' }}>
                "Ver videos de peleas o accidentes me hace más maduro, fuerte y resistente para el mundo real."
              </div>
              <div style={{ color: '#34D399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>✓ EVIDENCIA CIENTÍFICA</div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                No te hace más fuerte: produce <strong>embotamiento afectivo</strong>. Tu amígdala se adormece para protegerse, lo que disminuye tu capacidad para conectar emocionalmente con tus amigos y familia.
              </div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '14px', padding: '18px' }}>
              <div style={{ color: '#F87171', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>❌ MITO POPULAR</div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '10px' }}>
                "Solo es curiosidad humana natural, a todo el mundo le gusta ver cosas prohibidas."
              </div>
              <div style={{ color: '#34D399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>✓ EVIDENCIA CIENTÍFICA</div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                El algoritmo monetiza tu curiosidad mediante picos de adrenalina y dopamina de shock. Cada segundo que miras un video violento, el sistema te recomienda 5 más similares.
              </div>
            </div>
          </div>
        </div>
      </div>

      <CrisisBanner />
    </div>
  );
}
