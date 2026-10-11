import React, { useState } from 'react';
import { DIMENSION_DETAILS } from '../data/dimensionExplanations';
import { IconCheckCircle } from './Icons';

export default function DimensionExplanationCard({ dimKey, score = 0, mean = null, defaultOpen = false, isHero = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const info = DIMENSION_DETAILS[dimKey];

  if (!info) return null;

  const validScore = Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0;

  // Clasificación de color e intensidad
  let levelText = 'Sensibilidad Conservada';
  let levelColor = '#15803D';
  let levelBg = '#DCFCE7';

  if (validScore >= 67) {
    levelText = 'Nivel Alto / Habituación Marcada';
    levelColor = '#B91C1C';
    levelBg = '#FEE2E2';
  } else if (validScore >= 34) {
    levelText = 'Nivel Moderado / Tolerancia Incipiente';
    levelColor = '#B45309';
    levelBg = '#FEF3C7';
  }

  return (
    <div style={{
      background: isHero ? 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 50%, #EDE9FE 100%)' : '#FFFFFF',
      border: isHero ? '2px solid #C4B5FD' : '1px solid #EDE4F8',
      borderRadius: '18px',
      padding: isHero ? '24px 26px' : '20px 22px',
      boxShadow: isHero ? '0 8px 25px rgba(124, 58, 237, 0.08)' : '0 4px 16px rgba(124, 58, 237, 0.04)',
      transition: 'all 0.2s ease',
      marginBottom: '16px'
    }}>
      {/* Cabecera de la Dimensión */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
        <div style={{ flex: '1 1 240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <span style={{
              display: 'inline-block',
              padding: '3px 8px',
              borderRadius: '6px',
              background: info.isCentral ? '#7C3AED' : '#F3E8FF',
              color: info.isCentral ? '#FFFFFF' : '#7C3AED',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase'
            }}>
              {info.code} • {info.tag}
            </span>
            <span style={{
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '6px',
              background: levelBg,
              color: levelColor,
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              {levelText}
            </span>
          </div>

          <h3 style={{ fontSize: isHero ? '1.25rem' : '1.08rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
            {info.name}
          </h3>
          <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
            Evaluado con {info.itemsCount} reactivos Likert {mean !== null ? `(Media individual: ${mean.toFixed(2)} de 5.00)` : ''}
          </div>
        </div>

        {/* Puntuación Porcentual Hero */}
        <div style={{
          background: '#FFFFFF',
          border: isHero ? '2px solid #8B5CF6' : '1.5px solid #DDD6FE',
          borderRadius: '14px',
          padding: '8px 20px',
          textAlign: 'center',
          boxShadow: '0 4px 14px rgba(124, 58, 237, 0.12)'
        }}>
          <div style={{ fontSize: isHero ? '2.2rem' : '1.8rem', fontWeight: 900, color: '#7C3AED', lineHeight: 1 }}>
            {validScore.toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6B7280', marginTop: '3px', textTransform: 'uppercase' }}>
            Escala 0% a 100%
          </div>
        </div>
      </div>

      {/* Barra Visual de Rango Porcentual */}
      <div style={{ width: '100%', height: isHero ? '10px' : '8px', background: '#EDE4F8', borderRadius: '9999px', overflow: 'hidden', marginBottom: '14px' }}>
        <div style={{
          width: `${validScore}%`,
          height: '100%',
          background: info.isCentral 
            ? 'linear-gradient(90deg, #7C3AED, #6366F1)' 
            : `linear-gradient(90deg, ${info.color}, #C084FC)`,
          borderRadius: '9999px',
          transition: 'width 0.4s ease'
        }} />
      </div>

      {/* Botón para desplegar / ocultar fundamentación metodológica */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '8px 12px',
          background: isOpen ? '#FAF8FE' : '#F9F5FF',
          border: '1px solid #EDE4F8',
          borderRadius: '10px',
          color: '#7C3AED',
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.15s ease'
        }}
      >
        <span>
          {isOpen ? 'Ocultar fundamentación y utilidad metodológica' : 'Ver qué mide, en qué se basa y para qué sirve (alumno e investigadores)'}
        </span>
        <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* CUADRO EXPLICATIVO DE 4 PUNTOS (QUÉ MIDE, EN QUÉ SE BASA, ALUMNO, INVESTIGADORES) */}
      {isOpen && (
        <div style={{
          marginTop: '14px',
          padding: '18px 20px',
          background: '#FAF8FE',
          border: '1px solid #E9D5FF',
          borderRadius: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '0.83rem',
          lineHeight: 1.55
        }}>
          {/* 1. QUÉ ES Y QUÉ MIDE */}
          <div>
            <div style={{ fontWeight: 800, color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7C3AED' }} />
              ¿Qué es y qué mide este porcentaje?
            </div>
            <p style={{ margin: 0, color: '#4B5563', paddingLeft: '12px' }}>
              {info.whatIs}
            </p>
          </div>

          {/* 2. EN QUÉ SE BASA */}
          <div>
            <div style={{ fontWeight: 800, color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366F1' }} />
              ¿En qué marco científico y psicométrico se basa?
            </div>
            <p style={{ margin: 0, color: '#4B5563', paddingLeft: '12px' }}>
              {info.foundation}
            </p>
          </div>

          {/* 3. PARA QUÉ SIRVE AL ESTUDIANTE */}
          <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '10px', border: '1px solid #EDE4F8' }}>
            <div style={{ fontWeight: 800, color: '#5B21B6', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <IconCheckCircle size={14} color="#7C3AED" />
              ¿Para qué te sirve a ti como estudiante?
            </div>
            <p style={{ margin: 0, color: '#374151' }}>
              {info.studentUtility}
            </p>
          </div>

          {/* 4. PARA QUÉ SIRVE AL EQUIPO DE INVESTIGACIÓN */}
          <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '10px', border: '1px solid #EDE4F8' }}>
            <div style={{ fontWeight: 800, color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{ color: '#7C3AED', fontWeight: 900 }}>[Investigación]</span>
              ¿Para qué nos sirve al equipo de investigación?
            </div>
            <p style={{ margin: 0, color: '#374151' }}>
              {info.researcherUtility}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
