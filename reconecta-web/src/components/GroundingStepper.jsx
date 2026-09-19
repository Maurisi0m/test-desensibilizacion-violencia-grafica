import React, { useState } from 'react';

const STEPS = [
  {
    num: 5,
    title: 'Mira a tu alrededor: Nombra 5 cosas que puedes VER',
    desc: 'Observa texturas, colores o sombras en tu habitación (p. ej., una lámpara, tus zapatos, una planta, una ventana, tu cuaderno).',
    placeholder: 'Escribe 5 cosas que ves en este instante...'
  },
  {
    num: 4,
    title: 'Siente con tu cuerpo: Nombra 4 cosas que puedes TOCAR',
    desc: 'La tela de tu camiseta, el tacto frío del piso, la textura de la mesa, el peso de tu teléfono en tus manos.',
    placeholder: '4 sensaciones táctiles presentes...'
  },
  {
    num: 3,
    title: 'Escucha con atención: Nombra 3 SONIDOS reales',
    desc: 'El motor de un auto lejano, el viento en la ventana, el zumbido del refrigerador o tu propia respiración.',
    placeholder: '3 sonidos que percibes...'
  },
  {
    num: 2,
    title: 'Respira hondo: Nombra 2 OLORES que percibas o recuerdes',
    desc: 'El aroma del café, tu perfume, jabón o el aire fresco al abrir la ventana.',
    placeholder: '2 olores agradables...'
  },
  {
    num: 1,
    title: 'Di en voz alta o escribe: 1 cualidad valiosa sobre TI',
    desc: 'Por ejemplo: "Soy una persona sensible", "Valoro la vida", "Merezco paz mental".',
    placeholder: 'Tu fortaleza o valor personal...'
  }
];

export default function GroundingStepper({ setView }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <section style={{ maxWidth: '680px', margin: '40px auto 30px' }}>
      <div style={{ textAlign: 'left', marginBottom: '24px' }}>
        <div className="section-tag" style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.85rem' }}>
          Técnica Cognitiva de Anclaje
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '6px 0 10px' }}>
          Paso 2: Reconexión Sensorial 5-4-3-2-1
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Cuando vemos una imagen de impacto, nuestra mente se queda atrapada en la pantalla. Esta técnica redirige la atención de tu cerebro hacia tu entorno físico real.
        </p>
      </div>

      {!isComplete ? (
        STEPS.map((step, idx) => {
          const isActive = idx === currentStep;
          if (idx > currentStep) return null;

          return (
            <div
              key={step.num}
              className={`grounding-step-card ${isActive ? 'active' : ''}`}
              style={{ opacity: isActive ? 1 : 0.6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'var(--accent-cyan)', color: 'var(--text-inverse)',
                  fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {step.num}
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#FFFFFF' }}>{step.title}</div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{step.desc}</p>
              
              {isActive && (
                <>
                  <input
                    type="text"
                    className="grounding-input"
                    placeholder={step.placeholder}
                    value={answers[step.num] || ''}
                    onChange={(e) => setAnswers({ ...answers, [step.num]: e.target.value })}
                  />
                  <button
                    className="btn-primary"
                    style={{ marginTop: '14px', padding: '8px 18px', fontSize: '0.88rem' }}
                    onClick={handleNext}
                  >
                    {idx === STEPS.length - 1 ? 'Finalizar Anclaje ✓' : 'Siguiente Paso →'}
                  </button>
                </>
              )}
            </div>
          );
        })
      ) : (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '14px',
          padding: '28px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✨</div>
          <h3 style={{ color: '#34D399', fontSize: '1.35rem', marginBottom: '8px', fontWeight: 800 }}>
            ¡Tu mente ha regresado al presente!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 18px' }}>
            El video violento fue solo luz en una pantalla; no está ocurriendo en tu habitación ni pone en riesgo tu seguridad física en este instante. Toma un vaso con agua fresca y date un descanso de las pantallas.
          </p>
          <button className="btn-secondary" onClick={() => setView('guides')}>
            🛡️ Configurar mis redes para no volver a ver esto
          </button>
        </div>
      )}
    </section>
  );
}
