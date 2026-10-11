import React from 'react';
import { IconDownload, IconArrowLeft, IconFileText, IconCheckCircle } from '../components/Icons';
import DimensionExplanationCard from '../components/DimensionExplanationCard';
import StudentVisualCharts from '../components/StudentVisualCharts';

export default function ResultsPage({ result, onBackToTest }) {
  if (!result || !result.blocks) {
    return (
      <div className="container" style={{ maxWidth: '800px', padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: '#6B7280' }}>No se ha cargado ningún resultado de evaluación.</p>
        <button onClick={onBackToTest} style={{
          marginTop: '16px',
          padding: '10px 20px',
          background: '#7C3AED',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 700,
          cursor: 'pointer'
        }}>
          Volver al Cuestionario
        </button>
      </div>
    );
  }

  const p = result.participant || {};
  const c = result.central_score || {};
  const b = result.blocks || {};
  const profile = result.profile || {};
  const expComp = result.exposure_comparison || {};

  const downloadTextReport = () => {
    const lines = [
      '========================================================================',
      'INFORME INDIVIDUAL DE INVESTIGACIÓN ESCOLAR',
      'Desensibilización a Contenido Gráfico Violento y Convivencia',
      'COLEGIO / UNIVERSIDAD LA SALLE',
      '========================================================================',
      `Fecha de Registro: ${new Date(p.evaluated_at || Date.now()).toLocaleString()}`,
      `Participante / Código: ${p.alias}`,
      `Edad: ${p.age} años | Sexo/Género: ${p.gender}`,
      `Nivel Escolar: ${p.school_grade} | Tiempo en Pantallas: ${p.screen_hours}`,
      '------------------------------------------------------------------------',
      '1. AVISO METODOLÓGICO Y ÉTICO:',
      'Este informe describe indicadores autoinformados con fines académicos',
      'e investigativos. NO CONSTITUYE UN DIAGNÓSTICO CLÍNICO, PSIQUIÁTRICO',
      'NI MÉDICO. Las puntuaciones expresan la posición relativa de las respuestas',
      'dentro del rango de medición posible (0.0% a 100.0%).',
      '------------------------------------------------------------------------',
      '2. VARIABLE CENTRAL DE LA INVESTIGACIÓN:',
      `Índice Global de Desensibilización y Habituación a Violencia Gráfica: ${c.index?.toFixed(1)}%`,
      `(Calculado a partir de los 12 reactivos del Bloque 2: Suma = ${c.sum} / 60 | Media = ${c.mean?.toFixed(2)} / 5.00)`,
      '------------------------------------------------------------------------',
      '3. PUNTUACIONES POR BLOQUE TEMÁTICO (0% A 100%):',
      `• Bloque 1 - Exposición a Violencia Gráfica (10 reactivos): ${b.EXP?.index?.toFixed(1)}%`,
      `• Bloque 2 - Desensibilización y Habituación (12 reactivos): ${b.DES?.index?.toFixed(1)}% [Variable Central]`,
      `• Bloque 3 - Normalización de Violencia Gráfica (6 reactivos): ${b.NOR?.index?.toFixed(1)}%`,
      `• Bloque 4 - Agresividad Autoinformada (8 reactivos): ${b.AGR?.index?.toFixed(1)}%`,
      `• Bloque 5 - Relaciones Interpersonales (6 reactivos): ${b.REL?.index?.toFixed(1)}%`,
      '------------------------------------------------------------------------',
      '4. COMPARACIÓN DE EXPOSICIÓN (INCIDENTAL VS. BÚSQUEDA INTENCIONAL):',
      `Diferencia (Búsqueda Intencional - Incidental): ${expComp.difference > 0 ? '+' : ''}${expComp.difference}%`,
      `Interpretación: ${expComp.interpretation}`,
      '------------------------------------------------------------------------',
      '5. PERFIL EXPLORATORIO:',
      `Patrón Asignado: ${profile.name}`,
      `Descripción: ${profile.description}`,
      '------------------------------------------------------------------------',
      '6. RELACIÓN DESCRIPTIVA ENTRE VARIABLES:',
      result.descriptive_association || 'Sin datos adicionales.',
      '------------------------------------------------------------------------',
      '7. LÍMITES DE INTERPRETACIÓN:',
      '- Un cuestionario de autoinforme mide respuestas declaradas; no determina',
      '  directamente reactividad somatosensorial en laboratorio ni actividad cerebral.',
      '- El diseño transversal no demuestra relaciones de causa y efecto.',
      '========================================================================'
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Informe_Investigacion_${p.alias.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container" style={{ maxWidth: '940px', padding: '36px 20px 80px' }}>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EDE4F8',
        borderRadius: '24px',
        padding: '38px',
        boxShadow: '0 12px 35px -8px rgba(124, 58, 237, 0.10)'
      }}>

        {/* Encabezado con Logo La Salle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '20px' }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '9999px',
              background: '#F3E8FF',
              color: '#7C3AED',
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              Informe Individual Descriptivo
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 6px' }}>
              Resultados de Evaluación
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.92rem', margin: 0 }}>
              Código de participante: <strong style={{ color: '#1E1B4B' }}>{p.alias}</strong> ({p.age} años, {p.gender}, {p.school_grade})
            </p>
          </div>

          <img 
            src="/lasalle-logo.png" 
            alt="Logo La Salle" 
            style={{
              height: '60px',
              width: 'auto',
              objectFit: 'contain',
              flexShrink: 0
            }}
          />
        </div>

        {/* Aviso Ético Obligatorio */}
        <div style={{
          background: '#F5F1FC',
          border: '1px solid #E9D5FF',
          borderRadius: '14px',
          padding: '16px 20px',
          marginBottom: '28px'
        }}>
          <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#5B21B6', marginBottom: '4px' }}>
            Aviso Metodológico y Ético (No Clínico)
          </div>
          <p style={{ color: '#4B5563', fontSize: '0.84rem', lineHeight: 1.55, margin: 0 }}>
            Este informe describe indicadores autoinformados con fines exclusivamente académicos y descriptivos. <strong>No constituye un diagnóstico clínico, médico ni psicológico</strong>. Las puntuaciones señalan la posición relativa de las respuestas en una escala porcentual estandarizada de 0.0% a 100.0%.
          </p>
        </div>

        {/* GRÁFICOS RELEVANTES INDIVIDUALES */}
        <StudentVisualCharts
          blocks={b}
          centralScore={c}
          exposureComp={expComp}
          answers={result.answers || []}
        />

        {/* SECCIÓN DETALLADA: PUNTUACIONES Y FUNDAMENTACIÓN POR DIMENSIÓN */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
              Fundamentación Metodológica y Utilidad de cada Dimensión
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: 0 }}>
              Desglose detallado sobre qué mide cada porcentaje, su sustento teórico y su propósito tanto para ti como estudiante como para el equipo de investigación.
            </p>
          </div>

          {/* 1. VARIABLE CENTRAL (BLOQUE 2: DESENSIBILIZACIÓN) */}
          <DimensionExplanationCard
            dimKey="DES"
            score={c.index ?? b.DES?.index ?? 0}
            mean={c.mean ?? b.DES?.mean ?? null}
            defaultOpen={true}
            isHero={true}
          />

          {/* 2. BLOQUE 1: EXPOSICIÓN */}
          <DimensionExplanationCard
            dimKey="EXP"
            score={b.EXP?.index ?? 0}
            mean={b.EXP?.mean ?? null}
            defaultOpen={false}
          />

          {/* 3. BLOQUE 3: NORMALIZACIÓN */}
          <DimensionExplanationCard
            dimKey="NOR"
            score={b.NOR?.index ?? 0}
            mean={b.NOR?.mean ?? null}
            defaultOpen={false}
          />

          {/* 4. BLOQUE 4: AGRESIVIDAD */}
          <DimensionExplanationCard
            dimKey="AGR"
            score={b.AGR?.index ?? 0}
            mean={b.AGR?.mean ?? null}
            defaultOpen={false}
          />

          {/* 5. BLOQUE 5: RELACIONES INTERPERSONALES */}
          <DimensionExplanationCard
            dimKey="REL"
            score={b.REL?.index ?? 0}
            mean={b.REL?.mean ?? null}
            defaultOpen={false}
          />
        </div>

        {/* PERFIL EXPLORATORIO Y NARRATIVA */}
        <div style={{
          background: '#FAF8FE',
          border: '1px solid #EDE4F8',
          borderRadius: '16px',
          padding: '22px',
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 6px' }}>
            Perfil Interpretativo Observado: {profile.name}
          </h3>
          <p style={{ color: '#4B5563', fontSize: '0.88rem', lineHeight: 1.55, margin: '0 0 14px' }}>
            {profile.description}
          </p>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EDE4F8',
            borderRadius: '10px',
            padding: '14px',
            color: '#6B7280',
            fontSize: '0.84rem',
            lineHeight: 1.5
          }}>
            <strong>Asociación observada:</strong> {result.descriptive_association || 'Sin datos adicionales.'}
          </div>
        </div>

        {/* ACCIONES INFERIORES */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <button
            onClick={onBackToTest}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 20px',
              background: '#FFFFFF',
              color: '#4B5563',
              border: '1px solid #EDE4F8',
              borderRadius: '10px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <IconArrowLeft size={16} />
            <span>Volver al Inicio</span>
          </button>

          <button
            onClick={downloadTextReport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: '#7C3AED',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.28)'
            }}
          >
            <IconDownload size={16} />
            <span>Descargar Informe Individual (.TXT)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
