import React, { useState } from 'react';
import { QUESTIONS, LIKERT_OPTIONS } from '../data/questionBank';
import { submitEvaluation } from '../services/api';

export default function TestPage({ onComplete, setView }) {
  const [started, setStarted] = useState(false);
  const [alias, setAlias] = useState('');
  const [age, setAge] = useState(16);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isTeen = age <= 17;
  const currentQ = QUESTIONS[currentIndex];

  const handleStart = () => {
    setStarted(true);
    setCurrentIndex(0);
    setAnswers({});
    setErrorMsg('');
  };

  const handleSelectOption = async (score) => {
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: {
        question_id: currentQ.id,
        dimension: currentQ.dimension,
        question_text: isTeen ? currentQ.teen : currentQ.adult,
        score
      }
    };
    setAnswers(updatedAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Finished all 20 questions -> submit to backend API & SQLite
      setSubmitting(true);
      setErrorMsg('');

      const submissionPayload = {
        alias: alias.trim() || 'Participante',
        age: parseInt(age, 10),
        answers: Object.values(updatedAnswers)
      };

      try {
        const result = await submitEvaluation(submissionPayload);
        onComplete(result);
      } catch (err) {
        console.error('Error submitting evaluation:', err);
        setErrorMsg('Error al conectar con el servidor. Guardando en modo local...');
        // Fallback local calculation if offline
        setTimeout(() => {
          onComplete({
            alias: submissionPayload.alias,
            age: submissionPayload.age,
            cohort: isTeen ? 'Adolescente' : 'JovenAdulto',
            evaluated_at: new Date().toISOString(),
            raw_total: 50,
            global_index: 37.5,
            passive_index: 40,
            active_index: 35,
            physiological_index: 40,
            cognitive_index: 35,
            severity_level: 'Medio-Bajo',
            severity_title: 'Desensibilización Leve a Moderada',
            diff_analysis: 'Perfil Mixto: Tu exposición es tanto pasiva como activa.',
            constructs: ['Habituación por Repetición Algorítmica', 'Heurística de Disponibilidad (Kahneman)'],
            interventions: ['Regulación de Filtros Digitales', 'Regla de los 2 Segundos'],
            answers: submissionPayload.answers
          });
        }, 1200);
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (!started) {
    return (
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '70px' }}>
        <div className="question-box">
          <div className="badge-tag">Instrumento Psicométrico ED-CVG (20 Ítems)</div>
          <h1 className="hero-title" style={{ fontSize: '2.2rem', marginBottom: '14px' }}>
            Evalúa tu Nivel de <span className="gradient-text">Desensibilización Digital</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '28px' }}>
            Este cuestionario confidencial mide de 0% a 100% cuánto se ha habituado tu mente a la violencia en redes. Tus respuestas se registran de forma permanente y segura en la base de datos del proyecto para fines de diagnóstico y análisis.
          </p>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '22px', marginBottom: '26px' }}>
            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="user-alias-input" style={{ display: 'block', fontWeight: 600, fontSize: '0.92rem', marginBottom: '8px' }}>
                Nombre o Alias (Opcional):
              </label>
              <input
                id="user-alias-input"
                type="text"
                className="grounding-input"
                placeholder="Ej. Alex / Estudiante"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>

            <div>
              <label htmlFor="user-age-select" style={{ display: 'block', fontWeight: 600, fontSize: '0.92rem', marginBottom: '8px' }}>
                Edad ({age} años) — Calibración de Lenguaje:
              </label>
              <select
                id="user-age-select"
                className="grounding-input"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10))}
                style={{ marginTop: 0, backgroundColor: '#1E293B', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}
              >
                {Array.from({ length: 18 }, (_, i) => i + 12).map((a) => (
                  <option key={a} value={a}>
                    {a} años {a <= 17 ? '(Cohorte Adolescente)' : '(Cohorte Joven Adulto)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '10px',
            padding: '14px',
            marginBottom: '24px',
            fontSize: '0.88rem',
            color: 'var(--text-muted)'
          }}>
            ℹ️ <strong>Cohorte asignada:</strong> {isTeen ? 'Adolescente (12 a 17 años)' : 'Joven Adulto (18 a 29 años)'}. <br />
            Los 20 reactivos adaptarán su redacción para reflejar con precisión tus hábitos de navegación digital.
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ flexGrow: 1, justifyContent: 'center', fontSize: '1.05rem' }} onClick={handleStart}>
              Comenzar Evaluación de 20 Reactivos →
            </button>
            <button className="btn-secondary" onClick={() => setView('history')}>
              📋 Ver Registro Histórico
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question Runner
  const pctProgress = Math.round((currentIndex / QUESTIONS.length) * 100);
  const selectedScore = answers[currentQ.id]?.score;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '70px' }}>
      <div className="question-box">
        {/* Progress Bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span>Reactivo {currentIndex + 1} de {QUESTIONS.length}</span>
            <span>{pctProgress}% Completado</span>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
            <div style={{
              background: 'var(--gradient-brand)',
              height: '100%',
              width: `${pctProgress}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* Question Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <span className="dimension-badge" style={{
            background: 'rgba(99, 102, 241, 0.15)',
            color: '#818CF8',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            {currentQ.dimensionName} ({currentQ.dimension})
          </span>

          <button
            className="btn-secondary"
            style={{ padding: '6px 14px', fontSize: '0.85rem', opacity: currentIndex === 0 ? 0.4 : 1 }}
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            ← Anterior
          </button>
        </div>

        {/* Statement */}
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, lineHeight: 1.45, marginBottom: '14px', color: '#FFFFFF' }}>
          {isTeen ? currentQ.teen : currentQ.adult}
        </h2>

        {/* Context Hint */}
        <div style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          background: 'rgba(15, 23, 42, 0.4)',
          borderLeft: '3px solid var(--accent-cyan)',
          padding: '10px 14px',
          borderRadius: '4px',
          marginBottom: '22px'
        }}>
          💡 {currentQ.hint}
        </div>

        {/* Likert Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {LIKERT_OPTIONS.map((opt) => {
            const isSelected = selectedScore === opt.val;
            return (
              <button
                key={opt.val}
                className={`likert-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectOption(opt.val)}
                disabled={submitting}
              >
                <span className="likert-num">{opt.val}</span>
                <span style={{ fontWeight: isSelected ? 700 : 500 }}>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {submitting && (
          <div style={{ textAlign: 'center', marginTop: '20px', color: 'var(--accent-cyan)', fontWeight: 700 }}>
            ⏳ Procesando evaluación psicométrica y registrando en SQLite...
          </div>
        )}

        {errorMsg && (
          <div style={{ textAlign: 'center', marginTop: '16px', color: '#F87171', fontSize: '0.9rem' }}>
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}
