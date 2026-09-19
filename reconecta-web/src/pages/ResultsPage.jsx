import React from 'react';

export default function ResultsPage({ result, setView }) {
  if (!result) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>No hay resultados disponibles</h2>
        <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => setView('test')}>
          Realizar el Test →
        </button>
      </div>
    );
  }

  const getSeverityColor = (level) => {
    switch (level) {
      case 'Bajo': return '#10B981';
      case 'Medio-Bajo': return '#F59E0B';
      case 'Alto': return '#F97316';
      default: return '#EF4444';
    }
  };

  const badgeColor = getSeverityColor(result.severity_level);

  const downloadReport = () => {
    const reportText = `===================================================================
DICTAMEN DE EVALUACIÓN PSICOMÉTRICA (ED-CVG ONLINE)
Plataforma ReConecta Web Fullstack (React + SQLite)
===================================================================
Fecha: ${new Date(result.evaluated_at || Date.now()).toLocaleString()}
Participante: ${result.alias} | Edad: ${result.age} años (${result.cohort})
ID de Registro en Base de Datos: #${result.id || 'N/A'}
-------------------------------------------------------------------
ÍNDICE GLOBAL DE DESENSIBILIZACIÓN (IGD): ${result.global_index}%
Nivel Diagnóstico: ${result.severity_title} [${result.severity_level}]

DESGLOSE POR SUBESCALAS:
- Exposición Algorítmica Indirecta (EA-I): ${result.passive_index}%
- Búsqueda Activa e Intencional (BA-C): ${result.active_index}%
- Embotamiento Fisiológico / Corporal (RF-E): ${result.physiological_index}%
- Normalización Cognitiva y Desconexión (NC-D): ${result.cognitive_index}%

ANÁLISIS DE CONSUMO DIFERENCIAL:
${result.diff_analysis}

CONSTRUCTOS COGNITIVOS IDENTIFICADOS:
${(result.constructs || []).map(c => '• ' + c).join('\n')}

INTERVENCIONES CLÍNICAS (TCC):
${(result.interventions || []).map(i => '• ' + i).join('\n')}
===================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte_ED-CVG_${result.alias.replace(/\s+/g, '_')}_ID${result.id || '0'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '70px', maxWidth: '840px' }}>
      <div className="question-box">
        {/* Header Badge & Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="badge-tag" style={{
            background: `${badgeColor}22`,
            color: badgeColor,
            borderColor: badgeColor,
            fontWeight: 800
          }}>
            NIVEL {result.severity_level?.toUpperCase()}
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '12px 0 6px' }}>
            IGD: <span className="gradient-text">{result.global_index}%</span>
          </h1>

          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
            {result.severity_title}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', maxWidth: '640px', margin: '0 auto' }}>
            {result.summary}
          </p>

          <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
            ✓ Registrado en la base de datos con folio #{result.id || 'Local'} para {result.alias} ({result.age} años)
          </div>
        </div>

        {/* 4 Subscales Grid */}
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
          📊 Desglose por Subescalas Psicométricas
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              <span>📱 Exposición Pasiva (EA-I)</span>
              <span style={{ color: '#38BDF8', fontWeight: 700 }}>{result.passive_index}%</span>
            </div>
            <div style={{ background: '#1E293B', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${result.passive_index}%`, background: '#38BDF8', transition: 'width 0.5s ease' }}></div>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              <span>🔍 Búsqueda Activa (BA-C)</span>
              <span style={{ color: '#F472B6', fontWeight: 700 }}>{result.active_index}%</span>
            </div>
            <div style={{ background: '#1E293B', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${result.active_index}%`, background: '#F472B6', transition: 'width 0.5s ease' }}></div>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              <span>🫀 Embotamiento Físico (RF-E)</span>
              <span style={{ color: '#A78BFA', fontWeight: 700 }}>{result.physiological_index}%</span>
            </div>
            <div style={{ background: '#1E293B', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${result.physiological_index}%`, background: '#A78BFA', transition: 'width 0.5s ease' }}></div>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>
              <span>🧠 Normalización Moral (NC-D)</span>
              <span style={{ color: '#34D399', fontWeight: 700 }}>{result.cognitive_index}%</span>
            </div>
            <div style={{ background: '#1E293B', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${result.cognitive_index}%`, background: '#34D399', transition: 'width 0.5s ease' }}></div>
            </div>
          </div>
        </div>

        {/* Differential Consumption */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '12px',
          padding: '18px',
          marginBottom: '26px'
        }}>
          <div style={{ fontWeight: 700, color: '#A5B4FC', fontSize: '0.95rem', marginBottom: '6px' }}>
            ⚖️ Análisis de Consumo Diferencial (Algoritmo vs. Búsqueda)
          </div>
          <p style={{ color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: 1.5 }}>
            {result.diff_analysis}
          </p>
        </div>

        {/* Cognitive Constructs */}
        {result.constructs && result.constructs.length > 0 && (
          <div style={{ marginBottom: '26px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px' }}>
              🔬 Constructos Psicológicos Cognitivos Identificados
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {result.constructs.map((c, i) => (
                <div key={i} style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  lineHeight: 1.5
                }}>
                  ⚡ {c}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interventions */}
        {result.interventions && result.interventions.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '12px' }}>
              🛡️ Intervenciones Recomendadas (Terapia Cognitivo-Conductual)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {result.interventions.map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  color: 'var(--text-main)'
                }}>
                  🌱 {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={downloadReport}>
            📥 Descargar Dictamen (.TXT)
          </button>
          <button className="btn-secondary" onClick={() => setView('history')}>
            📋 Ver Registro Histórico
          </button>
          <button className="btn-secondary" onClick={() => setView('guides')}>
            🛡️ Blindar Redes
          </button>
          <button className="btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => setView('test')}>
            🔄 Repetir Test
          </button>
        </div>
      </div>
    </div>
  );
}
