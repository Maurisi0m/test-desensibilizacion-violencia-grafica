import React, { useState } from 'react';
import { QUESTIONS_42, LIKERT_OPTIONS, BLOCKS } from '../data/questionBank';
import { IconCheckCircle, IconArrowRight, IconArrowLeft, IconAlertCircle, IconFileText } from '../components/Icons';

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

  // VISTA 1: BIENVENIDA Y CONSENTIMIENTO (ESTILO MORADITO CLARO CON BLANCO)
  if (step === 'welcome') {
    return (
      <div className="container" style={{ maxWidth: '820px', padding: '36px 20px 80px' }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #EDE4F8',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 12px 35px -8px rgba(124, 58, 237, 0.10)'
        }}>
          {/* Cabecera con Logo de La Salle en la Esquina Superior Derecha */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '20px' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: '#F3E8FF',
                border: '1px solid #DDD6FE',
                borderRadius: '9999px',
                color: '#7C3AED',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '14px'
              }}>
                <span>Exposición al Contenido Violento Gráfico en las Redes Sociales</span>
              </div>
              <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 10px', lineHeight: 1.25 }}>
                Desensibilización a Contenido Gráfico Violento
              </h1>
              <p style={{ color: '#4B5563', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
                Evaluación cuantitativa sobre la frecuencia de exposición incidental y búsqueda activa de publicaciones con violencia gráfica en medios digitales, y la respuesta afectiva observada en adolescentes.
              </p>
            </div>

            <img 
              src="/lasalle-logo.png" 
              alt="Logo La Salle" 
              style={{
                height: '64px',
                width: 'auto',
                objectFit: 'contain',
                flexShrink: 0
              }}
            />
          </div>

          {/* Ficha de Autores e Investigación */}
          <div style={{
            background: 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)',
            border: '1px solid #DDD6FE',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Equipo de Investigación • Metodología de la Investigación
              </span>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#6B7280', background: '#FFFFFF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #EDE4F8' }}>
                La Salle Pachuca (Campus La Luz)
              </span>
            </div>
            <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1E1B4B' }}>
              Alan David Cortés Hernández • Raúl Gabriel García Márquez • Daniel Rodríguez García • Mauro Ortiz Juárez
            </div>
            <div style={{ fontSize: '0.8rem', color: '#5B21B6', fontWeight: 500 }}>
              Alumnos de 5to semestre de bachillerato • Colegio La Salle Pachuca
            </div>
          </div>

          {/* Definición Operacional y Marco Ético */}
          <div style={{
            background: '#FAF8FE',
            border: '1px solid #EDE4F8',
            borderRadius: '16px',
            padding: '22px',
            marginBottom: '26px'
          }}>
            <h2 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Definición Operacional y Compromiso Ético</span>
            </h2>
            <div style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 10px 0' }}>
                <strong style={{ color: '#1E1B4B' }}>Contenido gráfico violento:</strong> Se refiere operacionalmente a publicaciones, fotografías o videos reales que muestran <em>sangre visible, heridas físicas severas, fracturas expuestas, mutilaciones o muertes violentas</em>. Se distingue claramente de discusiones verbales, desacuerdos de opinión o insultos sin representación visual de daño físico.
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li><strong style={{ color: '#1E1B4B' }}>Anónimo y confidencial:</strong> No se solicitan nombres reales ni información privada de contacto.</li>
                <li><strong style={{ color: '#1E1B4B' }}>Carácter no clínico:</strong> Este instrumento no emite diagnósticos médicos ni psicológicos; describe indicadores exploratorios autoinformados con fines académicos.</li>
                <li><strong style={{ color: '#1E1B4B' }}>Extensión:</strong> Contiene 42 reactivos estructurados en 5 bloques temáticos (tiempo estimado: 5 a 7 minutos).</li>
              </ul>
            </div>
          </div>

          {/* Datos sociodemográficos */}
          <div style={{ marginBottom: '26px' }}>
            <h2 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 16px' }}>
              Datos Sociodemográficos
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Alias o Código de Participante (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Alumno-12"
                  value={participant.alias}
                  onChange={e => setParticipant({ ...participant, alias: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#FAF8FE',
                    border: '1px solid #E9D5FF',
                    borderRadius: '10px',
                    color: '#1E1B4B',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
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
                    padding: '11px 14px',
                    background: '#FAF8FE',
                    border: '1px solid #E9D5FF',
                    borderRadius: '10px',
                    color: '#1E1B4B',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Sexo / Género
                </label>
                <select
                  value={participant.gender}
                  onChange={e => setParticipant({ ...participant, gender: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#FAF8FE',
                    border: '1px solid #E9D5FF',
                    borderRadius: '10px',
                    color: '#1E1B4B',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro</option>
                  <option value="Prefiero no decir">Prefiero no decir</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Grado Escolar
                </label>
                <select
                  value={participant.school_grade}
                  onChange={e => setParticipant({ ...participant, school_grade: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#FAF8FE',
                    border: '1px solid #E9D5FF',
                    borderRadius: '10px',
                    color: '#1E1B4B',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Secundaria">Secundaria (1º, 2º o 3º)</option>
                  <option value="Preparatoria">Preparatoria / Bachillerato</option>
                  <option value="Otro">Otro nivel académico</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Tiempo diario en redes sociales
                </label>
                <select
                  value={participant.screen_hours}
                  onChange={e => setParticipant({ ...participant, screen_hours: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    background: '#FAF8FE',
                    border: '1px solid #E9D5FF',
                    borderRadius: '10px',
                    color: '#1E1B4B',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box'
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

          {/* Consentimiento informado con Checkbox */}
          <div style={{
            background: '#F5F1FC',
            border: '1px solid #E9D5FF',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '26px'
          }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={e => setConsentAccepted(e.target.checked)}
                style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: '#7C3AED', cursor: 'pointer' }}
              />
              <span style={{ color: '#1E1B4B', fontSize: '0.88rem', lineHeight: 1.5, fontWeight: 600 }}>
                He leído la definición operacional, confirmo que mi participación es voluntaria y acepto responder de manera sincera este instrumento anónimo sobre exposición a violencia gráfica.
              </span>
            </label>
          </div>

          {errorMsg && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '10px',
              padding: '12px 16px',
              color: '#B91C1C',
              fontSize: '0.88rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <IconAlertCircle size={18} color="#B91C1C" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            onClick={handleStartSurvey}
            style={{
              width: '100%',
              padding: '15px 24px',
              background: '#7C3AED',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.02rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 6px 20px rgba(124, 58, 237, 0.28)',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Iniciar Cuestionario (42 Reactivos)</span>
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // VISTA 2: RESPONDER CUESTIONARIO POR BLOQUES
  if (step === 'survey') {
    return (
      <div className="container" style={{ maxWidth: '840px', padding: '30px 20px 80px' }}>
        {/* Barra Superior con Logo y Progreso */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #EDE4F8',
          borderRadius: '18px',
          padding: '18px 24px',
          marginBottom: '24px',
          boxShadow: '0 4px 16px rgba(124, 58, 237, 0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase' }}>
                Progreso General
              </span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E1B4B' }}>
                {totalAnswered} de 42 reactivos completados ({progressPercent}%)
              </div>
            </div>
            <img 
              src="/lasalle-logo.png" 
              alt="La Salle" 
              style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* Barra de Progreso Moradita */}
          <div style={{ width: '100%', height: '8px', background: '#F3E8FF', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
              transition: 'width 0.3s ease'
            }} />
          </div>

          {/* Stepper de Bloques */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
            {BLOCKS.map((b, idx) => {
              const complete = isBlockComplete(b.id);
              const isCurrent = idx === currentBlockIndex;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setCurrentBlockIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: isCurrent ? 800 : 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: isCurrent ? '#7C3AED' : (complete ? '#DDD6FE' : '#EDE4F8'),
                    background: isCurrent ? '#F3E8FF' : (complete ? '#FAF8FE' : '#FFFFFF'),
                    color: isCurrent ? '#7C3AED' : (complete ? '#6B7280' : '#9CA3AF'),
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {complete && <IconCheckCircle size={12} color="#059669" />}
                  <span>Bloque {b.id}: {b.shortName || b.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bloque Actual */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #EDE4F8',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '26px',
          boxShadow: '0 8px 30px rgba(124, 58, 237, 0.08)'
        }}>
          <div style={{
            borderBottom: '1px solid #EDE4F8',
            paddingBottom: '18px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 10px',
              borderRadius: '6px',
              background: currentBlock.isCentral ? '#EDE9FE' : '#F3E8FF',
              color: '#7C3AED',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              Bloque {currentBlock.id} de 5 {currentBlock.isCentral && '— Variable Central'}
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 8px' }}>
              {currentBlock.title}
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
              {currentBlock.description}
            </p>
          </div>

          {/* Lista de Reactivos del Bloque */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            {blockQuestions.map((q, qIndex) => {
              const selectedScore = answers[q.id];

              return (
                <div
                  key={q.id}
                  style={{
                    background: '#FAF8FE',
                    border: '1px solid',
                    borderColor: selectedScore !== undefined ? '#DDD6FE' : '#EDE4F8',
                    borderRadius: '16px',
                    padding: '22px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                    <span style={{
                      minWidth: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: selectedScore !== undefined ? '#7C3AED' : '#EDE4F8',
                      color: selectedScore !== undefined ? '#FFFFFF' : '#7C3AED',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {q.id}
                    </span>
                    <p style={{
                      color: '#1E1B4B',
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      {q.text}
                    </p>
                  </div>

                  {/* Opciones Likert de 5 puntos */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '8px'
                  }}>
                    {LIKERT_OPTIONS.map(opt => {
                      const isSelected = selectedScore === opt.value;

                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleScoreChange(q.id, opt.value)}
                          style={{
                            padding: '10px 8px',
                            borderRadius: '10px',
                            border: '1px solid',
                            borderColor: isSelected ? '#7C3AED' : '#EDE4F8',
                            background: isSelected ? '#F3E8FF' : '#FFFFFF',
                            color: isSelected ? '#7C3AED' : '#4B5563',
                            fontWeight: isSelected ? 800 : 500,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: isSelected ? '0 2px 10px rgba(124, 58, 237, 0.2)' : 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: isSelected ? '#7C3AED' : '#F5F3FF',
                            color: isSelected ? '#FFFFFF' : '#7C3AED',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {opt.value}
                          </span>
                          <span style={{ textAlign: 'center', lineHeight: 1.2 }}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navegación entre Bloques */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #EDE4F8'
          }}>
            <button
              onClick={handlePrevBlock}
              disabled={currentBlockIndex === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: '#FFFFFF',
                color: currentBlockIndex === 0 ? '#D1D5DB' : '#4B5563',
                border: '1px solid #EDE4F8',
                borderRadius: '10px',
                fontSize: '0.88rem',
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
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 22px',
                background: '#7C3AED',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
              }}
            >
              <span>{currentBlockIndex === BLOCKS.length - 1 ? 'Revisar y Enviar' : 'Siguiente Bloque'}</span>
              <IconArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VISTA 3: REVISIÓN FINAL Y ENVÍO
  return (
    <div className="container" style={{ maxWidth: '820px', padding: '36px 20px 80px' }}>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EDE4F8',
        borderRadius: '24px',
        padding: '36px',
        boxShadow: '0 12px 35px -8px rgba(124, 58, 237, 0.10)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase' }}>
              Verificación Final
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E1B4B', margin: '4px 0 8px' }}>
              Revisión de Respuestas
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', margin: 0 }}>
              Verifica que hayas completado los 5 bloques antes de generar tu informe individual descriptivo.
            </p>
          </div>
          <img src="/lasalle-logo.png" alt="La Salle" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Resumen por Bloques */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '26px' }}>
          {BLOCKS.map(b => {
            const bQuestions = QUESTIONS_42.filter(q => q.blockId === b.id);
            const answeredInBlock = bQuestions.filter(q => answers[q.id] !== undefined).length;
            const complete = answeredInBlock === bQuestions.length;

            return (
              <div
                key={b.id}
                style={{
                  background: complete ? '#F5F3FF' : '#FEF2F2',
                  border: '1px solid',
                  borderColor: complete ? '#DDD6FE' : '#FCA5A5',
                  borderRadius: '12px',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: complete ? '#7C3AED' : '#B91C1C' }}>
                    Bloque {b.id}
                  </span>
                  {complete ? <IconCheckCircle size={16} color="#059669" /> : <IconAlertCircle size={16} color="#B91C1C" />}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1E1B4B', marginBottom: '4px' }}>
                  {b.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                  {answeredInBlock} de {bQuestions.length} respondidos
                </div>
              </div>
            );
          })}
        </div>

        {errorMsg && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#B91C1C',
            fontSize: '0.88rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <IconAlertCircle size={18} color="#B91C1C" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '20px' }}>
          <button
            onClick={() => setStep('survey')}
            style={{
              padding: '12px 20px',
              background: '#FFFFFF',
              color: '#4B5563',
              border: '1px solid #EDE4F8',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ← Volver al Cuestionario
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || totalAnswered < 42}
            style={{
              padding: '14px 28px',
              background: totalAnswered < 42 ? '#9CA3AF' : '#7C3AED',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 800,
              cursor: totalAnswered < 42 || isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 6px 20px rgba(124, 58, 237, 0.3)'
            }}
          >
            <span>{isSubmitting ? 'Procesando evaluación...' : 'Finalizar y Ver Mis Resultados'}</span>
            <IconCheckCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
