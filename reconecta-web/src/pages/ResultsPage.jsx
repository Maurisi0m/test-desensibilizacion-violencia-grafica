import React from 'react';
import { IconClipboard, IconDownload, IconArrowLeft, IconShield, IconFileText } from '../components/Icons';

export default function ResultsPage({ result, onBackToTest }) {
  if (!result || !result.blocks) {
    return (
      <div className="container" style={{ maxWidth: '800px', padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8' }}>No se ha cargado ningún resultado de evaluación.</p>
        <button onClick={onBackToTest} className="btn-primary" style={{ marginTop: '16px' }}>
          Volver al Cuestionario
        </button>
      </div>
    );
  }

  const p = result.participant || {};
  const c = result.central_score || {};
  const b = result.blocks || {};
  const subs = result.subdimensions || {};
  const profile = result.profile || {};
  const expComp = result.exposure_comparison || {};

  const downloadTextReport = () => {
    const lines = [
      '========================================================================',
      'INFORME INDIVIDUAL DE INVESTIGACIÓN ESCOLAR',
      'Exposición a Contenido Gráfico Violento y Desensibilización',
      '========================================================================',
      `Fecha de Registro: ${new Date(p.evaluated_at || Date.now()).toLocaleString()}`,
      `Participante / Código: ${p.alias}`,
      `Edad: ${p.age} años | Sexo/Género: ${p.gender}`,
      `Nivel Escolar: ${p.school_grade} | Tiempo en Pantallas: ${p.screen_hours}`,
      '------------------------------------------------------------------------',
      '1. AVISO METODOLÓGICO Y ÉTICO:',
      'Este informe describe indicadores autoinformados con fines académicos',
      'e investigativos escolares. NO CONSTITUYE UN DIAGNÓSTICO CLÍNICO,',
      'PSIQUIÁTRICO NI MÉDICO. Las puntuaciones expresan la posición relativa',
      'de las respuestas dentro del rango de medición posible (0.0% a 100.0%).',
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
    <div className="container" style={{ maxWidth: '920px', padding: '30px 20px 80px' }}>
      <div style={{
        background: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        padding: '36px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>

        {/* Aviso Ético Obligatorio */}
        <div style={{
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '26px',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start'
        }}>
          <div style={{ minWidth: '22px', marginTop: '2px' }}>
            <IconShield size={20} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '0.86rem', color: '#bae6fd', lineHeight: 1.55 }}>
            <strong>Aviso de Rigor Metodológico:</strong> Este informe describe indicadores autoinformados obtenidos mediante un cuestionario no experimental. <strong>No constituye una evaluación clínica ni un diagnóstico psicológico formal</strong>. Las puntuaciones representan la posición relativa de las respuestas dentro del rango de medición (0 a 100%) y no deben interpretarse como medidas fisiológicas directas de desensibilización ni como tipos fijos de personalidad.
          </div>
        </div>

        {/* Encabezado y Metadatos */}
        <div style={{ borderBottom: '1px solid #1f2937', paddingBottom: '22px', marginBottom: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px' }}>
                Informe Individual de Investigación Escolar
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
                Instrumento de 42 reactivos con foco central en contenido gráfico violento y habituación
              </p>
            </div>
            <button
              onClick={downloadTextReport}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                background: '#1e293b',
                color: '#38bdf8',
                border: '1px solid #334155',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <IconDownload size={16} color="#38bdf8" />
              <span>Descargar Informe (.txt)</span>
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginTop: '18px',
            background: '#1e293b',
            padding: '14px 18px',
            borderRadius: '10px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Participante</div>
              <div style={{ fontSize: '0.92rem', color: '#f1f5f9', fontWeight: 600 }}>{p.alias}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Edad y Sexo</div>
              <div style={{ fontSize: '0.92rem', color: '#f1f5f9', fontWeight: 600 }}>{p.age} años ({p.gender})</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Nivel Escolar</div>
              <div style={{ fontSize: '0.92rem', color: '#f1f5f9', fontWeight: 600 }}>{p.school_grade}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Tiempo en Redes</div>
              <div style={{ fontSize: '0.92rem', color: '#f1f5f9', fontWeight: 600 }}>{p.screen_hours}</div>
            </div>
          </div>
        </div>

        {/* HERO CARD: VARIABLE CENTRAL (DESENSIBILIZACIÓN Y HABITUACIÓN) */}
        <div style={{
          background: 'radial-gradient(circle at center, rgba(2, 132, 199, 0.15) 0%, rgba(17, 24, 39, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '16px',
          padding: '28px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'inline-block',
            padding: '4px 14px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '9999px',
            color: '#38bdf8',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}>
            Variable Central de Investigación
          </div>

          <div style={{ fontSize: '3.6rem', fontWeight: 900, color: '#38bdf8', margin: '4px 0' }}>
            {c.index?.toFixed(1)}%
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px' }}>
            Índice Global de Desensibilización y Habituación a Violencia Gráfica
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', maxWidth: '680px', margin: '0 auto 16px', lineHeight: 1.5 }}>
            Calculado exclusivamente sobre los 12 reactivos del Bloque 2 (atenuación de náuseas, acostumbramiento a ver sangre y diversión al atestiguar violencia física).
          </p>

          <div style={{ display: 'inline-flex', gap: '16px', background: '#1e293b', padding: '8px 18px', borderRadius: '8px', fontSize: '0.8rem', color: '#94a3b8' }}>
            <span>Suma Bruta: <strong style={{ color: '#f8fafc' }}>{c.sum} / 60</strong></span>
            <span>•</span>
            <span>Media: <strong style={{ color: '#f8fafc' }}>{c.mean?.toFixed(2)} / 5.00</strong></span>
            <span>•</span>
            <span>Escala: <strong style={{ color: '#38bdf8' }}>0.0% a 100.0%</strong></span>
          </div>
        </div>

        {/* GRID DE LAS 4 VARIABLES COMPLEMENTARIAS (ESTILO HERO DE LA APP ORIGINAL) */}
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 14px' }}>
          Puntuaciones por Bloque Temático (0% a 100%)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '30px' }}>
          
          {/* Bloque 1: Exposición */}
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>
              Bloque 1 ({b.EXP?.k} reactivos)
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>
              Exposición a Violencia Gráfica
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginBottom: '8px' }}>
              {b.EXP?.index?.toFixed(1)}%
            </div>
            <div style={{ background: '#0f172a', height: '8px', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ width: `${b.EXP?.index}%`, height: '100%', background: '#38bdf8' }} />
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Media: {b.EXP?.mean?.toFixed(2)} | Suma: {b.EXP?.sum}
            </div>
          </div>

          {/* Bloque 3: Normalización */}
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>
              Bloque 3 ({b.NOR?.k} reactivos)
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>
              Normalización de Violencia Gráfica
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginBottom: '8px' }}>
              {b.NOR?.index?.toFixed(1)}%
            </div>
            <div style={{ background: '#0f172a', height: '8px', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ width: `${b.NOR?.index}%`, height: '100%', background: '#f59e0b' }} />
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Media: {b.NOR?.mean?.toFixed(2)} | Suma: {b.NOR?.sum}
            </div>
          </div>

          {/* Bloque 4: Agresividad */}
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>
              Bloque 4 ({b.AGR?.k} reactivos)
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>
              Agresividad Autoinformada
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f43f5e', marginBottom: '8px' }}>
              {b.AGR?.index?.toFixed(1)}%
            </div>
            <div style={{ background: '#0f172a', height: '8px', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ width: `${b.AGR?.index}%`, height: '100%', background: '#f43f5e' }} />
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Media: {b.AGR?.mean?.toFixed(2)} | Suma: {b.AGR?.sum}
            </div>
          </div>

          {/* Bloque 5: Relaciones Interpersonales */}
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>
              Bloque 5 ({b.REL?.k} reactivos)
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>
              Relaciones Interpersonales
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginBottom: '8px' }}>
              {b.REL?.index?.toFixed(1)}%
            </div>
            <div style={{ background: '#0f172a', height: '8px', borderRadius: '9999px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ width: `${b.REL?.index}%`, height: '100%', background: '#10b981' }} />
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Media: {b.REL?.mean?.toFixed(2)} | Suma: {b.REL?.sum}
            </div>
          </div>
        </div>

        {/* COMPARACIÓN DE EXPOSICIÓN: INCIDENTAL VS BÚSQUEDA INTENCIONAL */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid #1f2937',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '28px'
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 10px' }}>
            Comparación de Exposición a Violencia Gráfica: Incidental vs. Búsqueda Intencional
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div style={{ background: '#1e293b', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Exposición Incidental (Aparición no solicitada en feeds)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8' }}>
                {subs.EXP_INC?.index.toFixed(1)}%
              </div>
            </div>
            <div style={{ background: '#1e293b', padding: '14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Búsqueda Intencional (Búsqueda voluntaria de gore/heridas)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>
                {subs.EXP_ACT?.index.toFixed(1)}%
              </div>
            </div>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
            {expComp.interpretation}
          </p>
        </div>

        {/* PERFIL EXPLORATORIO */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.5)',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '22px',
          marginBottom: '30px'
        }}>
          <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#38bdf8', fontWeight: 700, marginBottom: '4px' }}>
            Perfil Interpretativo Exploratorio
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
            {profile.name}
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
            {profile.description}
          </p>
          <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
            * Esta descripción resume un patrón de respuestas autoinformadas y no constituye una categoría clínica ni un tipo de personalidad.
          </div>
        </div>

        {/* RELACIÓN DESCRIPTIVA ENTRE VARIABLES */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.3)',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 12px' }}>
            Relación Descriptiva entre Variables de la Investigación
          </h3>
          <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {result.descriptive_association}
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={onBackToTest}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              background: '#1e293b',
              color: '#cbd5e1',
              border: '1px solid #334155',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <IconArrowLeft size={16} />
            <span>Realizar Otra Evaluación</span>
          </button>

          <button
            onClick={downloadTextReport}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <IconDownload size={16} />
            <span>Guardar Informe</span>
          </button>
        </div>
      </div>
    </div>
  );
}
