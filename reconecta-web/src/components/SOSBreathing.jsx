import React, { useState, useEffect, useRef } from 'react';

const PHASES = [
  { name: 'Inhala por la nariz...', duration: 4, className: 'breathe-inhale', freq: 330 },
  { name: 'Sostén el aire con calma...', duration: 7, className: 'breathe-hold', freq: 440 },
  { name: 'Exhala suave por la boca...', duration: 8, className: 'breathe-exhale', freq: 260 }
];

export default function SOSBreathing() {
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycle, setCycle] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  const playTone = (freq) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  };

  const startBreathing = () => {
    setIsActive(true);
    setIsComplete(false);
    setCycle(1);
    setPhaseIndex(0);
    setSecondsLeft(PHASES[0].duration);
    playTone(PHASES[0].freq);
  };

  const stopBreathing = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPhaseIndex(0);
    setSecondsLeft(4);
  };

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        // Transition to next phase
        setPhaseIndex((currPhase) => {
          const nextPhase = currPhase + 1;
          if (nextPhase >= PHASES.length) {
            setCycle((c) => {
              if (c >= 4) {
                // Completed 4 cycles
                setIsActive(false);
                setIsComplete(true);
                clearInterval(intervalRef.current);
                return c;
              }
              return c + 1;
            });
            playTone(PHASES[0].freq);
            return 0;
          }
          playTone(PHASES[nextPhase].freq);
          return nextPhase;
        });

        return PHASES[(phaseIndex + 1) % PHASES.length].duration;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive, phaseIndex]);

  const currentPhase = PHASES[phaseIndex];

  return (
    <section className="breathing-box">
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>Paso 1: Respiración Vagal 4-7-8</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
        Esta técnica desacelera tu frecuencia cardíaca y modula el nervio vago para neutralizar la adrenalina de shock.
      </p>

      <div className="circle-wrapper">
        <div className="breathing-ring"></div>
        <div className={`breathing-orb ${isActive ? currentPhase.className : ''}`}>
          {isActive ? `${secondsLeft}s` : '4-7-8'}
        </div>
      </div>

      <div className="timer-label" style={{ minHeight: '40px' }}>
        {isActive ? `${secondsLeft}s` : (isComplete ? '✨ Sesión Completada' : 'Listo')}
      </div>

      <div className="timer-instruction" style={{ minHeight: '30px' }}>
        {isActive
          ? currentPhase.name
          : (isComplete ? '¡Excelente trabajo! Tu sistema nervioso ha disminuido su nivel de alerta.' : 'Presiona Iniciar para sincronizar tu respiración.')}
      </div>

      {isActive && (
        <div style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', marginBottom: '20px' }}>
          Ciclo: {cycle} de 4
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
        {!isActive ? (
          <button className="btn-primary" style={{ background: 'var(--gradient-sos)' }} onClick={startBreathing}>
            ▶ Iniciar Respiración
          </button>
        ) : (
          <button className="btn-secondary" onClick={stopBreathing}>
            ⏹ Detener
          </button>
        )}
      </div>
    </section>
  );
}
