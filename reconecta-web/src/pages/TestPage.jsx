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

  // VISTA 1: BIENVENIDA, DATOS DEL USUARIO Y CONSENTIMIENTO
  if (step === 'welcome') {
    return (
      <div className="test-wrapper">
        <div className="test-card-panel">
          {/* Hero Inmersivo de Pantalla Completa */}
          <div className="test-hero-container">
            <div className="test-hero-top">
              <div style={{ flex: 1 }}></div>
              <img 
                src="/lasalle-logo.png" 
                alt="Logo La Salle" 
                className="test-logo-img"
              />
            </div>

            <h1 className="test-title-hook">
              <span className="test-hero-line-main">
                ¿Sigues siendo sensible?
              </span>
              <span className="test-title-sub-gradient">
                O ¿el algoritmo normalizó la violencia en tu pantalla?
              </span>
            </h1>

            <p className="test-subtitle-hero">
              Al scrollear en TikTok, X o Instagram te topas con peleas, accidentes o videos fuertes sin previo aviso. Descubre con qué facilidad tu cerebro se acostumbró a ignorarlos y obtén tu perfil de sensibilidad y empatía digital en tiempo real.
            </p>
          </div>

          {/* Tarjetas Inmersivas de Curiosidad: ¿Cuál es tu reacción habitual? */}
          <div className="hook-cards-grid">
            <div className="hook-cards-mobile-header">
              Reacciones comunes ante contenido fuerte en pantalla
            </div>
            <div className="hook-card">
              <div className="hook-card-tag hook-tag-cyan">Reacción 1</div>
              <h3 className="hook-card-title">Alerta Emocional</h3>
              <p className="hook-card-desc">
                ¿Apartas la mirada o sientes escalofríos al ver heridas o accidentes graves en tu feed?
              </p>
            </div>

            <div className="hook-card">
              <div className="hook-card-tag hook-tag-purple">Reacción 2</div>
              <h3 className="hook-card-title">Curiosidad Fría</h3>
              <p className="hook-card-desc">
                ¿Miras fijamente unos segundos antes de scrollear sin sentir que te perturbe o afecte el día?
              </p>
            </div>

            <div className="hook-card">
              <div className="hook-card-tag hook-tag-rose">Reacción 3</div>
              <h3 className="hook-card-title">Habituación Total</h3>
              <p className="hook-card-desc">
                ¿Ya no sientes nada porque consideras que "en internet se ve de todo"?
              </p>
            </div>
          </div>

          {/* SECCIÓN PRINCIPAL ARRIBA: DATOS DEL PARTICIPANTE Y BOTÓN DE INICIO */}
          <div className="test-form-box">
            <div style={{ borderBottom: '1px solid #EDE4F8', paddingBottom: '14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Paso 1 de 2 • Cuestionario Anónimo
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E1B4B', margin: '4px 0 6px' }}>
                Datos para Iniciar el Test
              </h2>
              <p style={{ color: '#6B7280', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                Son 42 preguntas sencillas y toma entre 4 y 6 minutos. Por favor completa estos datos antes de comenzar (no te pediremos tu nombre real):
              </p>
            </div>

            {/* Grid adaptado para celular y tablet */}
            <div className="test-form-grid">
              <div>
                <label className="test-label">
                  Alias o Apodo (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Alumno-12 (o déjalo en blanco)"
                  value={participant.alias}
                  onChange={e => setParticipant({ ...participant, alias: e.target.value })}
                  className="test-input-control"
                />
                <span style={{ fontSize: '0.74rem', color: '#9CA3AF', marginTop: '4px', display: 'block' }}>
                  Solo para que reconozcas tu reporte final
                </span>
              </div>

              <div>
                <label className="test-label">
                  Edad (Años cumplidos)
                </label>
                <input
                  type="number"
                  min="12"
                  max="19"
                  value={participant.age}
                  onChange={e => setParticipant({ ...participant, age: parseInt(e.target.value, 10) || 15 })}
                  className="test-input-control"
                />
              </div>

              <div>
                <label className="test-label">
                  Sexo / Género
                </label>
                <select
                  value={participant.gender}
                  onChange={e => setParticipant({ ...participant, gender: e.target.value })}
                  className="test-input-control"
                >
                  <option value="Femenino">Femenino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Otro">Otro</option>
                  <option value="Prefiero no decir">Prefiero no decir</option>
                </select>
              </div>

              <div>
                <label className="test-label">
                  Grado Escolar
                </label>
                <select
                  value={participant.school_grade}
                  onChange={e => setParticipant({ ...participant, school_grade: e.target.value })}
                  className="test-input-control"
                >
                  <option value="Secundaria">Secundaria (1º, 2º o 3º)</option>
                  <option value="Preparatoria">Preparatoria / Bachillerato</option>
                  <option value="Otro">Otro nivel académico</option>
                </select>
              </div>

              <div className="test-field-full">
                <label className="test-label">
                  Tiempo diario que pasas en redes sociales
                </label>
                <select
                  value={participant.screen_hours}
                  onChange={e => setParticipant({ ...participant, screen_hours: e.target.value })}
                  className="test-input-control"
                >
                  <option value="Menos de 2 horas">Menos de 2 horas al día</option>
                  <option value="2 a 4 horas">2 a 4 horas al día</option>
                  <option value="4 a 6 horas">4 a 6 horas al día</option>
                  <option value="Más de 6 horas">Más de 6 horas al día</option>
                </select>
              </div>
            </div>

            {/* Consentimiento informado con Checkbox */}
            <div className="test-consent-box">
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={e => setConsentAccepted(e.target.checked)}
                  style={{ width: '22px', height: '22px', marginTop: '2px', accentColor: '#7C3AED', cursor: 'pointer', flexShrink: 0 }}
                />
                <span style={{ color: '#1E1B4B', fontSize: '0.88rem', lineHeight: 1.5, fontWeight: 600 }}>
                  Acepto participar voluntariamente y responder de forma sincera. Entiendo que este cuestionario es 100% anónimo y se utilizará únicamente para nuestra investigación escolar de Metodología de la Investigación.
                </span>
              </label>
            </div>

            {errorMsg && (
              <div style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#B91C1C',
                fontSize: '0.88rem',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <IconAlertCircle size={18} color="#B91C1C" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Botón Grande de Iniciar el Cuestionario */}
            <button
              onClick={handleStartSurvey}
              className="test-btn-start"
            >
              <span>DESCUBRIR MI NIVEL DE SENSIBILIDAD</span>
              <IconArrowRight size={20} />
            </button>
          </div>

          {/* SECCIÓN INFORMATIVA Y ÉTICA ABAJO (EXPLICACIÓN CLARA SIN TECNICISMOS) */}
          <div className="test-info-accordion">
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>¿De qué trata este estudio y qué información analizamos?</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#4B5563', fontSize: '0.88rem', lineHeight: 1.6 }}>
              <div style={{ background: '#FFFFFF', padding: '14px 16px', borderRadius: '12px', border: '1px solid #EDE4F8' }}>
                <strong style={{ color: '#1E1B4B', display: 'block', marginBottom: '4px' }}>
                  ¿Qué consideramos contenido violento gráfico?
                </strong>
                <span>
                  Nos referimos a fotos o videos reales donde se ven accidentes fuertes de tránsito, caídas graves, personas con heridas o sangre visible, asaltos con armas o peleas físicas reales que aparecen en plataformas como TikTok, Instagram, X (Twitter), Facebook o chats grupales.
                  <br />
                  <em style={{ color: '#7C3AED' }}>No incluye:</em> discusiones de palabras, comentarios de odio sin video, ni películas o videojuegos de ficción.
                </span>
              </div>

              <div style={{ background: '#FFFFFF', padding: '14px 16px', borderRadius: '12px', border: '1px solid #EDE4F8' }}>
                <strong style={{ color: '#1E1B4B', display: 'block', marginBottom: '4px' }}>
                  ¿Qué mide este cuestionario?
                </strong>
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  <li><strong>Frecuencia:</strong> Si estos videos te aparecen por sorpresa en tu feed o si alguna vez los has buscado por curiosidad.</li>
                  <li><strong>Reacción física y emocional:</strong> Si al verlos sientes impresión (náuseas, taquicardia) o si sientes que poco a poco te has acostumbrado a verlos.</li>
                  <li><strong>Opinión sobre el contenido:</strong> Si te parece común que circulen estos videos y si compartes memes o stickers al respecto.</li>
                  <li><strong>Convivencia diaria:</strong> Cómo manejas desacuerdos cotidianos y tu cercanía cuando alguien necesita apoyo.</li>
                </ul>
              </div>

              <div style={{ background: '#FFFFFF', padding: '14px 16px', borderRadius: '12px', border: '1px solid #EDE4F8' }}>
                <strong style={{ color: '#1E1B4B', display: 'block', marginBottom: '4px' }}>
                  Privacidad y Compromiso Ético
                </strong>
                <span>
                  Tu participación es libre y anónima. No guardamos correos ni contraseñas. Este cuestionario tiene un fin estrictamente educativo y escolar para nuestra materia de investigación, por lo que no representa una evaluación médica ni psicológica.
                </span>
              </div>
            </div>
          </div>

          {/* Social Proof y Estadísticas Rápidas de la Muestra (Al final) */}
          <div className="hook-stats-bar">
            <div className="hook-stat-item">
              <span className="hook-stat-number">42</span>
              <span className="hook-stat-label">Reactivos Rápidos</span>
            </div>
            <div className="hook-stat-divider"></div>
            <div className="hook-stat-item">
              <span className="hook-stat-number">~4 min</span>
              <span className="hook-stat-label">Duración Promedio</span>
            </div>
            <div className="hook-stat-divider"></div>
            <div className="hook-stat-item">
              <span className="hook-stat-number">+40</span>
              <span className="hook-stat-label">Alumnos Evaluados</span>
            </div>
            <div className="hook-stat-divider"></div>
            <div className="hook-stat-item">
              <span className="hook-stat-number">100%</span>
              <span className="hook-stat-label">Sin Nombres Reales</span>
            </div>
          </div>

          {/* Ficha Institucional de Respaldo Académico La Salle (Al final) */}
          <div className="test-authors-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Investigación Científica • Metodología de la Investigación
              </span>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#6B7280', background: '#FFFFFF', padding: '3px 10px', borderRadius: '6px', border: '1px solid #EDE4F8' }}>
                Colegio La Salle Pachuca (Campus La Luz)
              </span>
            </div>
            <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#1E1B4B', marginTop: '4px' }}>
              Alan David Cortés Hernández • Raúl Gabriel García Márquez • Daniel Rodríguez García • Mauro Ortiz Juárez
            </div>
            <div style={{ fontSize: '0.82rem', color: '#5B21B6', fontWeight: 500, marginTop: '2px' }}>
              Alumnos de 5to semestre de bachillerato • Estudio con fines psicométricos y de divulgación escolar
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VISTA 2: RESPONDER CUESTIONARIO POR BLOQUES
  if (step === 'survey') {
    return (
      <div className="test-wrapper">
        {/* Barra Superior con Logo y Progreso */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #EDE4F8',
          borderRadius: '18px',
          padding: '16px 20px',
          marginBottom: '20px',
          boxShadow: '0 4px 16px rgba(124, 58, 237, 0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase' }}>
                Progreso General
              </span>
              <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#1E1B4B' }}>
                {totalAnswered} de 42 preguntas respondidas ({progressPercent}%)
              </div>
            </div>
            <img 
              src="/lasalle-logo.png" 
              alt="La Salle" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
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
          <div style={{ display: 'flex', gap: '8px', marginTop: '14px', overflowX: 'auto', paddingBottom: '4px', WebkitOverflowScrolling: 'touch' }}>
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
        <div className="test-card-panel" style={{ marginBottom: '24px' }}>
          <div style={{
            borderBottom: '1px solid #EDE4F8',
            paddingBottom: '16px',
            marginBottom: '22px'
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
              Bloque {currentBlock.id} de 5 {currentBlock.isCentral && '— Sección Principal'}
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 6px' }}>
              {currentBlock.title}
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
              {currentBlock.description}
            </p>
          </div>

          {/* Lista de Preguntas del Bloque */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {blockQuestions.map((q) => {
              const selectedScore = answers[q.id];

              return (
                <div
                  key={q.id}
                  style={{
                    background: '#FAF8FE',
                    border: '1px solid',
                    borderColor: selectedScore !== undefined ? '#DDD6FE' : '#EDE4F8',
                    borderRadius: '16px',
                    padding: '18px 16px',
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
                      fontSize: '0.96rem',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      {q.text}
                    </p>
                  </div>

                  {/* Opciones Likert responsivas */}
                  <div className="likert-grid">
                    {LIKERT_OPTIONS.map(opt => {
                      const optVal = opt.value !== undefined ? opt.value : opt.val;
                      const isSelected = selectedScore === optVal;

                      return (
                        <button
                          key={optVal}
                          type="button"
                          onClick={() => handleScoreChange(q.id, optVal)}
                          className={`likert-btn ${isSelected ? 'selected' : ''}`}
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
                            {optVal}
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
            marginTop: '28px',
            paddingTop: '18px',
            borderTop: '1px solid #EDE4F8',
            flexWrap: 'wrap',
            gap: '12px'
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
    <div className="test-wrapper">
      <div className="test-card-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase' }}>
              Paso Final • Verificación
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E1B4B', margin: '4px 0 6px' }}>
              Revisión de Respuestas
            </h1>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', margin: 0 }}>
              Verifica que hayas respondido las 42 preguntas antes de generar tu reporte individual.
            </p>
          </div>
          <img src="/lasalle-logo.png" alt="La Salle" style={{ height: '46px', width: 'auto', objectFit: 'contain' }} />
        </div>

        {/* Resumen por Bloques */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
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
                  padding: '14px 16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: complete ? '#7C3AED' : '#B91C1C' }}>
                    Bloque {b.id}
                  </span>
                  {complete ? <IconCheckCircle size={16} color="#059669" /> : <IconAlertCircle size={16} color="#B91C1C" />}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E1B4B', marginBottom: '4px' }}>
                  {b.shortName || b.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                  {answeredInBlock} de {bQuestions.length} respondidas
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

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', marginTop: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setStep('survey')}
            style={{
              padding: '12px 20px',
              background: '#FFFFFF',
              color: '#4B5563',
              border: '1px solid #EDE4F8',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ← Volver a las Preguntas
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || totalAnswered < 42}
            style={{
              padding: '14px 26px',
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
            <span>{isSubmitting ? 'Guardando evaluación...' : 'Finalizar y Ver Mis Resultados'}</span>
            <IconCheckCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
