import React, { useState } from 'react';
import { QUESTIONS_42, LIKERT_OPTIONS, BLOCKS } from '../data/questionBank';
import { IconClipboard, IconShield, IconCheckCircle, IconArrowRight, IconArrowLeft, IconAlertCircle, IconFileText } from '../components/Icons';

export default function TestPage({ onComplete }) {
  const [step, setStep] = useState('welcome'); // 'welcome' | 'survey' | 'review'

  const [participant, setParticipant] = useState({
    alias: '',
    age: 15,
    gender: 'Femenino',
    school_grade: 'Secundaria',
    screen_hours: '2 a 4 horas'
  });
  const [consentAccepted, setConsentAccepted] = useState(false);

  const [answers, setAnswers] = useState({});
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentBlock = BLOCKS[currentBlockIndex];
  const blockQuestions = QUESTIONS_42.filter(q => q.blockId === currentBlock.id);

  const totalAnswered = Object.keys(answers).length;
  const progressPercent = Math.round((totalAnswered / 42) * 100);

  const handleScoreChange = (qId, score) => {
    setAnswers(prev => ({ ...prev, [qId]: score }));
  };

  const handleStartSurvey = () => {
    if (!consentAccepted) {
      setErrorMsg('Debes aceptar el consentimiento informado para poder participar.');
      return;
    }
    setErrorMsg('');
    setStep('survey');
  };

  const isBlockComplete = (bId) => {
    const bQuestions = QUESTIONS_42.filter(q => q.blockId === bId);
    return bQuestions.every(q => answers[q.id] !== undefined);
  };

  const handleNextBlock = () => {
    if (currentBlockIndex < BLOCKS.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevBlock = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (totalAnswered < 42) {
      setErrorMsg('Faltan reactivos por contestar. Debes responder los 42 ítems del cuestionario.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const formattedAnswers = QUESTIONS_42.map(q => ({
      question_id: q.id,
      block_id: q.blockId,
      dimension: q.dimension,
      question_text: q.text,
      score: answers[q.id] || 1
    }));

    try {
      const res = await fetch('/api/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participant: {
            ...participant,
            alias: participant.alias.trim() || `Estudiante-${Math.floor(1000 + Math.random() * 9000)}`
          },
          answers: formattedAnswers
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error al guardar la evaluación');
      }

      const data = await res.json();
      setIsSubmitting(false);
      onComplete(data);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Error de conexión con el servidor.');
    }
  };

  // VISTA 1: BIENVENIDA Y CONSENTIMIENTO
  if (step === 'welcome') {
    return (
      <div className="container" style={{ maxWidth: '780px', padding: '40px 20px 80px' }}>
        <div style={{
          background: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '9999px',
              color: '#38bdf8',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              <IconShield size={14} color="#38bdf8" />
              Investigación Escolar Cuantitativa
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 12px' }}>
              Exposición a Contenido Gráfico Violento y Desensibilización
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
              Estudio sobre la frecuencia con la que adolescentes se exponen o buscan publicaciones y videos con sangre, heridas graves o muerte violenta, y la reacción afectiva ante este material.
            </p>
          </div>

          {/* Definición Operacional y Marco Ético */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '26px'
          }}>
            <h2 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#e2e8f0', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconShield size={18} color="#38bdf8" />
              Definición Operacional y Marco Ético
            </h2>
            <div style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Contenido gráfico violento:</strong> Se refiere específicamente a videos o imágenes reales que muestran <em>sangre, heridas físicas graves, fracturas expuestas, mutilaciones o muertes violentas</em>. Se distingue claramente de simples discusiones verbales, peleas escolares sin daño físico grave o insultos.
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li><strong>Anónimo y confidencial:</strong> No se solicitan nombres reales ni contraseñas.</li>
                <li><strong>No es una evaluación clínica:</strong> No emite diagnósticos médicos ni psicológicos; describe indicadores exploratorios autoinformados.</li>
                <li><strong>Estructura:</strong> Exactamente 42 reactivos organizados en 5 bloques temáticos (5 a 7 minutos).</li>
              </ul>
            </div>
          </div>

          {/* Datos sociodemográficos */}
          <div style={{ marginBottom: '26px' }}>
            <h2 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#e2e8f0', margin: '0 0 16px' }}>
              Datos Sociodemográficos
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Alias / Código de Participante (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Estudiante-01"
                  value={participant.alias}
                  onChange={e => setParticipant({ ...participant, alias: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Edad (Años cumplidos)
                </label>
                <input
                  type="number"
                  min="12"
                  max="19"
                  value={participant.age}
                  onChange={e => setParticipant({ ...participant, age: parseInt(e.target.value, 10) || 15 })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Sexo / Género
                </label>
                <select
                  value={participant.gender}
                  onChange={e => setParticipant({ ...participant, gender: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro</option>
                  <option value="Prefiero no decir">Prefiero no decir</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Nivel Escolar
                </label>
                <select
                  value={participant.school_grade}
                  onChange={e => setParticipant({ ...participant, school_grade: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="Secundaria">Secundaria</option>
                  <option value="Preparatoria / Bachillerato">Preparatoria / Bachillerato</option>
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '6px' }}>
                  Tiempo aproximado diario en redes sociales y videos
                </label>
                <select
                  value={participant.screen_hours}
                  onChange={e => setParticipant({ ...participant, screen_hours: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="Menos de 2 horas">Menos de 2 horas al día</option>
                  <option value="2 a 4 horas">2 a 4 horas al día</option>
                  <option value="4 a 6 horas">4 a 6 horas al día</option>
                  <option value="Más de 6 horas">Más de 6 horas al día</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consentimiento */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '16px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid #334155',
            borderRadius: '10px',
            marginBottom: '24px'
          }}>
            <input
              type="checkbox"
              id="consent"
              checked={consentAccepted}
              onChange={e => setConsentAccepted(e.target.checked)}
              style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#0284c7', cursor: 'pointer' }}
            />
            <label htmlFor="consent" style={{ fontSize: '0.88rem', color: '#cbd5e1', cursor: 'pointer', lineHeight: 1.5 }}>
              Comprendo los objetivos de la investigación y acepto participar de forma voluntaria y anónima, respondiendo considerando mis experiencias de las últimas cuatro semanas.
            </label>
          </div>

          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#fca5a5',
              fontSize: '0.88rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <IconAlertCircle size={18} color="#ef4444" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleStartSurvey}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)'
              }}
            >
              <span>Comenzar Cuestionario (42 Reactivos)</span>
              <IconArrowRight size={18} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VISTA 2: CUESTIONARIO EN 5 BLOQUES
  if (step === 'survey') {
    return (
      <div className="container" style={{ maxWidth: '860px', padding: '30px 20px 80px' }}>
        {/* Barra de progreso general */}
        <div style={{
          background: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#94a3b8' }}>
              Progreso General: <span style={{ color: '#f8fafc' }}>{totalAnswered} de 42 reactivos respondidos</span>
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8' }}>
              {progressPercent}%
            </div>
          </div>
          <div style={{ background: '#1e293b', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #0284c7, #38bdf8)',
              transition: 'width 0.25s ease'
            }} />
          </div>

          {/* Navegación por los 5 bloques */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginTop: '16px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}>
            {BLOCKS.map((b, idx) => {
              const active = idx === currentBlockIndex;
              const complete = isBlockComplete(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => setCurrentBlockIndex(idx)}
                  style={{
                    flex: '1 1 auto',
                    minWidth: '140px',
                    padding: '8px 10px',
                    background: active ? '#1e293b' : 'rgba(15, 23, 42, 0.6)',
                    border: active ? '1px solid #38bdf8' : '1px solid #334155',
                    borderRadius: '8px',
                    color: active ? '#38bdf8' : complete ? '#10b981' : '#94a3b8',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>Bloque {b.id} ({b.itemCount})</span>
                  {complete && <IconCheckCircle size={14} color="#10b981" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Encabezado del bloque actual */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700 }}>
              Bloque {currentBlock.id} de 5
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px' }}>
            {currentBlock.title}
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: '0 0 8px 0', lineHeight: 1.5 }}>
            {currentBlock.purpose}
          </p>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
            * Considera tus reacciones en las <strong>últimas 4 semanas</strong>.
          </div>
        </div>

        {/* Lista de reactivos del bloque */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
          {blockQuestions.map(q => {
            const currentScore = answers[q.id];
            const isAnswered = currentScore !== undefined;

            return (
              <div
                key={q.id}
                style={{
                  background: '#111827',
                  border: isAnswered ? '1px solid #334155' : '1px solid #1f2937',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isAnswered ? 'rgba(56, 189, 248, 0.15)' : '#1e293b',
                    color: isAnswered ? '#38bdf8' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.88rem'
                  }}>
                    {q.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.98rem', fontWeight: 600, color: '#f1f5f9', lineHeight: 1.5 }}>
                      {q.text}
                    </div>
                    {q.guidance && (
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                        {q.guidance}
                      </div>
                    )}
                  </div>
                </div>

                {/* Opciones Likert */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '8px'
                }}>
                  {LIKERT_OPTIONS.map(opt => {
                    const selected = currentScore === opt.val;
                    return (
                      <button
                        key={opt.val}
                        onClick={() => handleScoreChange(q.id, opt.val)}
                        style={{
                          padding: '10px 8px',
                          borderRadius: '8px',
                          border: selected ? '2px solid #38bdf8' : '1px solid #1e293b',
                          background: selected ? 'rgba(56, 189, 248, 0.12)' : '#0f172a',
                          color: selected ? '#f8fafc' : '#94a3b8',
                          fontSize: '0.82rem',
                          fontWeight: selected ? 700 : 500,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: selected ? '#38bdf8' : '#64748b' }}>
                          Nivel {opt.val}
                        </span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Botones de navegación */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handlePrevBlock}
            disabled={currentBlockIndex === 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              background: '#1e293b',
              color: currentBlockIndex === 0 ? '#475569' : '#cbd5e1',
              border: '1px solid #334155',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: currentBlockIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <IconArrowLeft size={16} />
            <span>Bloque Anterior</span>
          </button>

          <button
            onClick={handleNextBlock}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 22px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
            }}
          >
            <span>{currentBlockIndex === BLOCKS.length - 1 ? 'Revisar Respuestas' : 'Siguiente Bloque'}</span>
            <IconArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // VISTA 3: REVISIÓN DE LOS 42 REACTIVOS
  return (
    <div className="container" style={{ maxWidth: '860px', padding: '30px 20px 80px' }}>
      <div style={{
        background: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <IconFileText size={22} color="#38bdf8" />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Revisión Previa al Envío (42 Reactivos)
          </h2>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
          Verifica tus respuestas a los 42 reactivos antes de confirmar el envío. Si deseas cambiar alguna opción, puedes hacer clic directamente en los botones de puntuación.
        </p>

        {totalAnswered < 42 && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#fcd34d',
            fontSize: '0.88rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <IconAlertCircle size={18} color="#f59e0b" />
            <span>Faltan reactivos por contestar ({totalAnswered} de 42). Debes responder todas las preguntas para enviar.</span>
          </div>
        )}

        <div style={{
          maxHeight: '480px',
          overflowY: 'auto',
          border: '1px solid #1e293b',
          borderRadius: '10px',
          marginBottom: '26px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', width: '45px' }}>#</th>
                <th style={{ padding: '10px 12px', width: '90px' }}>Bloque</th>
                <th style={{ padding: '10px 12px' }}>Reactivo</th>
                <th style={{ padding: '10px 12px', width: '170px', textAlign: 'center' }}>Respuesta</th>
              </tr>
            </thead>
            <tbody>
              {QUESTIONS_42.map(q => {
                const score = answers[q.id];
                return (
                  <tr key={q.id} style={{ borderBottom: '1px solid #1e293b' }}>
                    <td style={{ padding: '10px 12px', color: '#64748b', fontWeight: 700 }}>
                      {q.id}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#38bdf8', fontSize: '0.76rem', fontWeight: 600 }}>
                      Bloque {q.blockId}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>
                      {q.text}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '4px' }}>
                        {[1, 2, 3, 4, 5].map(val => (
                          <button
                            key={val}
                            onClick={() => handleScoreChange(q.id, val)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '4px',
                              border: score === val ? '1px solid #38bdf8' : '1px solid #334155',
                              background: score === val ? '#0284c7' : '#0f172a',
                              color: score === val ? '#ffffff' : '#94a3b8',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#fca5a5',
            fontSize: '0.88rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <IconAlertCircle size={18} color="#ef4444" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setStep('survey')}
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
            <span>Regresar a Modificar</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || totalAnswered < 42}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              background: totalAnswered < 42 ? '#475569' : 'linear-gradient(135deg, #10b981, #059669)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: totalAnswered < 42 ? 'not-allowed' : 'pointer',
              boxShadow: totalAnswered < 42 ? 'none' : '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}
          >
            <IconCheckCircle size={18} color="#ffffff" />
            <span>{isSubmitting ? 'Procesando Envío...' : 'Confirmar y Enviar Cuestionario'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
