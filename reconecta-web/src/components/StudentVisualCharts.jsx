import React from 'react';

export default function StudentVisualCharts({ blocks = {}, centralScore = {}, exposureComp = {}, answers = [] }) {
  const desScore = centralScore?.index ?? blocks.DES?.index ?? 0;
  const expScore = blocks.EXP?.index ?? 0;
  const norScore = blocks.NOR?.index ?? 0;
  const agrScore = blocks.AGR?.index ?? 0;
  const relScore = blocks.REL?.index ?? 0;

  // Cálculo de incidental vs intencional
  const incidentalScore = exposureComp?.incidental_index ?? 0;
  const intentionalScore = exposureComp?.intentional_index ?? 0;

  const dims = [
    { code: 'B2', label: 'Desensibilización (Central)', val: desScore, color: '#7C3AED', isCentral: true },
    { code: 'B1', label: 'Exposición a Violencia', val: expScore, color: '#6366F1', isCentral: false },
    { code: 'B3', label: 'Normalización y Memes', val: norScore, color: '#8B5CF6', isCentral: false },
    { code: 'B4', label: 'Reactividad Agresiva', val: agrScore, color: '#EC4899', isCentral: false },
    { code: 'B5', label: 'Relaciones Interpersonales', val: relScore, color: '#10B981', isCentral: false }
  ];

  // Nivel de desensibilización
  let desCategory = 'Sensibilidad Preservada';
  let desCategoryDesc = 'Mantiene respuestas viscerales típicas de rechazo y aversión somática.';
  let desColor = '#15803D';
  let desBg = '#DCFCE7';

  if (desScore >= 67) {
    desCategory = 'Desensibilización Marcada';
    desCategoryDesc = 'Presenta habituación afectiva severa; ausencia de aversión o búsqueda de morbo.';
    desColor = '#B91C1C';
    desBg = '#FEE2E2';
  } else if (desScore >= 34) {
    desCategory = 'Habituación Incipiente / Moderada';
    desCategoryDesc = 'Tolerancia afectiva parcial; puede presenciar material gráfico sin malestar evidente.';
    desColor = '#B45309';
    desBg = '#FEF3C7';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '28px' }}>
      
      {/* TARJETA 1: COMPARATIVA GRÁFICA DE LAS 5 DIMENSIONES */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EDE4F8',
        borderRadius: '20px',
        padding: '24px 28px',
        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
              Perfil Gráfico de Puntuaciones por Dimensión
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.82rem', margin: 0 }}>
              Comparativa porcentual sobre escala estandarizada de 0.0% a 100.0%
            </p>
          </div>
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            padding: '3px 10px',
            borderRadius: '6px',
            background: '#F3E8FF',
            color: '#7C3AED',
            textTransform: 'uppercase'
          }}>
            Evaluación Cuantitativa
          </span>
        </div>

        {/* Barras de Medición Gráfica */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {dims.map(d => (
            <div key={d.code} style={{
              background: d.isCentral ? '#FAF5FF' : '#FAF8FE',
              border: '1px solid',
              borderColor: d.isCentral ? '#C4B5FD' : '#EDE4F8',
              borderRadius: '12px',
              padding: '12px 16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: d.color,
                    color: '#FFFFFF'
                  }}>
                    {d.code}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: d.isCentral ? 800 : 700, color: '#1E1B4B' }}>
                    {d.label}
                  </span>
                  {d.isCentral && (
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#7C3AED', background: '#FFFFFF', padding: '1px 6px', borderRadius: '4px', border: '1px solid #DDD6FE' }}>
                      Variable Central
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '1.05rem', fontWeight: 900, color: d.color }}>
                  {d.val.toFixed(1)}%
                </span>
              </div>

              {/* Barra SVG/CSS */}
              <div style={{ width: '100%', height: d.isCentral ? '10px' : '8px', background: '#E9D5FF', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.min(100, Math.max(0, d.val))}%`,
                  height: '100%',
                  background: d.isCentral 
                    ? 'linear-gradient(90deg, #7C3AED, #6366F1)' 
                    : d.color,
                  borderRadius: '9999px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FILA DE 2 GRÁFICOS: MEDIDOR DE DESENSIBILIZACIÓN + COMPARATIVA INCIDENTAL VS INTENCIONAL */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* GRÁFICO 2: TERMÓMETRO / SEMÁFORO DE NIVEL DE DESENSIBILIZACIÓN */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #EDE4F8',
          borderRadius: '20px',
          padding: '24px 26px',
          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
        }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
            Escala de Habituación Somática (Variable Central)
          </h4>
          <p style={{ color: '#6B7280', fontSize: '0.8rem', margin: '0 0 16px' }}>
            Posicionamiento en los 3 rangos psicométricos de la EDV adaptada
          </p>

          {/* Medidor visual con 3 zonas */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              height: '16px',
              borderRadius: '9999px',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
            }}>
              <div style={{ width: '33.3%', background: '#22C55E' }} title="Bajo (<34%)" />
              <div style={{ width: '33.3%', background: '#F59E0B' }} title="Moderado (34-66%)" />
              <div style={{ width: '33.4%', background: '#EF4444' }} title="Alto (>=67%)" />
            </div>

            {/* Marcador posicional */}
            <div style={{
              position: 'absolute',
              left: `${Math.min(98, Math.max(2, desScore))}%`,
              top: '-6px',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: '#1E1B4B',
                border: '3px solid #FFFFFF',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
              }} />
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 900,
                color: '#1E1B4B',
                marginTop: '4px',
                whiteSpace: 'nowrap',
                background: '#FFFFFF',
                padding: '1px 5px',
                borderRadius: '4px',
                border: '1px solid #E5E7EB'
              }}>
                {desScore.toFixed(1)}%
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#6B7280', marginBottom: '16px' }}>
            <span>0% Sensible</span>
            <span>34% Tolerancia</span>
            <span>67% Desensibilizado</span>
            <span>100%</span>
          </div>

          {/* Tarjeta del Nivel Resultante */}
          <div style={{ background: desBg, border: '1px solid', borderColor: desColor, borderRadius: '12px', padding: '12px 14px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.86rem', color: desColor, marginBottom: '2px' }}>
              {desCategory}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#374151', lineHeight: 1.4 }}>
              {desCategoryDesc}
            </div>
          </div>
        </div>

        {/* GRÁFICO 3: CONSUMO INCIDENTAL VS BÚSQUEDA ACTIVA */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #EDE4F8',
          borderRadius: '20px',
          padding: '24px 26px',
          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
        }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
            Patrón de Exposición: Feed vs. Búsqueda Deliberada
          </h4>
          <p style={{ color: '#6B7280', fontSize: '0.8rem', margin: '0 0 16px' }}>
            Diferenciación entre algoritmo involuntario y morbo voluntario
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
            {/* Incidental */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: '#1E1B4B' }}>Exposición Incidental (Feed/Algoritmo)</span>
                <span style={{ fontWeight: 900, color: '#7C3AED' }}>{incidentalScore.toFixed(1)}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#EDE4F8', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, Math.max(0, incidentalScore))}%`, height: '100%', background: '#7C3AED', borderRadius: '9999px' }} />
              </div>
            </div>

            {/* Deliberada */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: '#1E1B4B' }}>Búsqueda Activa (Canales/Morbo)</span>
                <span style={{ fontWeight: 900, color: '#EC4899' }}>{intentionalScore.toFixed(1)}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#EDE4F8', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, Math.max(0, intentionalScore))}%`, height: '100%', background: '#EC4899', borderRadius: '9999px' }} />
              </div>
            </div>
          </div>

          <div style={{ background: '#FAF8FE', border: '1px solid #EDE4F8', borderRadius: '10px', padding: '10px 12px', fontSize: '0.78rem', color: '#4B5563', lineHeight: 1.45 }}>
            <strong>Interpretación:</strong> {exposureComp?.interpretation || (
              incidentalScore > intentionalScore 
                ? 'El participante se expone mayormente por la dinámica de recomendación de las plataformas sin planearlo activamente.'
                : 'El participante busca deliberadamente contenido violento por curiosidad o canales específicos.'
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
