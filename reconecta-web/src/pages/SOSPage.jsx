import React from 'react';
import SOSBreathing from '../components/SOSBreathing';
import GroundingStepper from '../components/GroundingStepper';
import CrisisBanner from '../components/CrisisBanner';

export default function SOSPage({ setView }) {
  return (
    <div className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 20px' }}>
        <div className="badge-tag" style={{ background: 'rgba(244, 63, 94, 0.15)', borderColor: 'rgba(244, 63, 94, 0.35)', color: '#FB7185' }}>
          🚨 Intervención Inmediata de Crisis Emocional
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.3rem' }}>
          Si acabas de ver algo perturbador, <br />
          <span className="gradient-text">estás en un lugar seguro.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Sentir asco, taquicardia, miedo o temblores en las manos <strong>no te hace débil</strong>: es la prueba biológica de que tu empatía y tu instinto de supervivencia están vivos. Vamos a calmar a tu sistema nervioso paso a paso.
        </p>
      </div>

      <SOSBreathing />
      <GroundingStepper setView={setView} />
      <CrisisBanner />
    </div>
  );
}
