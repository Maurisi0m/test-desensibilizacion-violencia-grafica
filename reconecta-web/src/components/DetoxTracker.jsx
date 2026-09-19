import React, { useState, useEffect } from 'react';

const DETOX_KEY = 'reconecta_detox_state_react_v1';

const DAYS = [
  {
    day: 1,
    title: 'Silencia 5 palabras clave de morbo',
    desc: 'Entra a TikTok, Instagram o X y bloquea términos como gore, accidente, pelea o balacera. Cierra la puerta a las recomendaciones directas.'
  },
  {
    day: 2,
    title: 'Aplica la "Regla de los 2 Segundos"',
    desc: 'Si en tu feed aparece una riña o un video con sangre, desliza inmediatamente sin mirar los comentarios. Si no te quedas 2 segundos, el algoritmo sabrá que no quieres ver eso.'
  },
  {
    day: 3,
    title: 'Resetea tu feed Para Ti o Explorar',
    desc: 'Usa el botón oficial de "Actualizar feed Para Ti" en TikTok o marca 3 videos sanos de música, ciencia o comedia con "Me gusta" para recalibrar tus recomendaciones.'
  },
  {
    day: 4,
    title: 'Sal de canales o chats grupales de shock',
    desc: 'Si estás en algún canal de Telegram o grupo de WhatsApp donde mandan stickers cruentos o videos de accidentes, salte y bórralo. No normalices el dolor ajeno como chiste.'
  },
  {
    day: 5,
    title: 'Noche libre de pantallas 30 min antes de dormir',
    desc: 'Ver estímulos violentos antes de dormir altera la fase REM del sueño e incrementa la ansiedad matutina. Cambia la pantalla por un podcast tranquilo, música o un libro.'
  },
  {
    day: 6,
    title: 'Desactiva la reproducción automática (Autoplay)',
    desc: 'En la configuración de X, Facebook o WhatsApp, desactiva la reproducción automática de videos. Tú debes decidir qué video se reproduce, no la aplicación.'
  },
  {
    day: 7,
    title: 'Reconexión Empática en el Mundo Real',
    desc: 'Haz un gesto intencional de bondad o escucha activa hacia un amigo, familiar o mascota. La empatía es un músculo neurológico que se reactiva con el contacto humano genuino.'
  }
];

export default function DetoxTracker({ setView }) {
  const [completedState, setCompletedState] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DETOX_KEY);
      if (saved) setCompletedState(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const toggleDay = (day) => {
    const next = { ...completedState, [day]: !completedState[day] };
    setCompletedState(next);
    try {
      localStorage.setItem(DETOX_KEY, JSON.stringify(next));
    } catch (e) {}
  };

  const resetAll = () => {
    if (window.confirm('¿Deseas reiniciar el progreso del reto de 7 días?')) {
      setCompletedState({});
      localStorage.removeItem(DETOX_KEY);
    }
  };

  const completedCount = DAYS.filter(d => !!completedState[d.day]).length;
  const pct = Math.round((completedCount / DAYS.length) * 100);

  return (
    <div className="container" style={{ paddingTop: '30px', paddingBottom: '60px', maxWidth: '780px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="badge-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.35)', color: '#34D399' }}>
          🌱 Hábitos Reversibles de Salud Emocional
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.3rem' }}>
          Reto Detox de 7 Días: <br />
          <span className="gradient-text">Recupera tu Sensibilidad</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          No necesitas eliminar tus redes sociales ni aislarte del mundo. Solo necesitas una pequeña acción consciente cada día para enseñarle a tu cerebro y a tus algoritmos quién tiene el control.
        </p>
      </div>

      {/* Progress Card */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '22px',
        marginBottom: '26px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF' }}>
            {pct}% completado ({completedCount} de 7 días)
          </span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.9rem' }}>
            {completedCount === 7 ? '🏆 ¡Reto Superado!' : `${completedCount} días activos`}
          </span>
        </div>
        <div style={{ background: '#1E293B', height: '10px', borderRadius: '9999px', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{
            background: 'linear-gradient(90deg, #10B981, #06B6D4)',
            height: '100%',
            width: `${pct}%`,
            transition: 'width 0.4s ease'
          }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-faint)' }}>Tu progreso se guarda automáticamente en este navegador</span>
          <button onClick={resetAll} style={{ background: 'transparent', border: 'none', color: '#F87171', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}>
            Reiniciar Reto
          </button>
        </div>
      </div>

      {/* Congrats Card */}
      {completedCount === 7 && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '14px',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏆</div>
          <h3 style={{ color: '#34D399', fontSize: '1.3rem', marginBottom: '8px', fontWeight: 800 }}>
            ¡Completaste los 7 días del Reto Detox!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 16px' }}>
            Has roto el bucle de recompensa de shock. Tu sistema simpático se ha relajado y tus feeds de redes son ahora un espacio más seguro. ¡Vuelve a hacer el test ED-CVG para comparar tus resultados!
          </p>
          <button className="btn-primary" style={{ background: 'var(--accent-emerald)' }} onClick={() => setView('test')}>
            📊 Medir mi progreso en el Test ED-CVG →
          </button>
        </div>
      )}

      {/* Days List */}
      <div>
        {DAYS.map((item) => {
          const isDone = !!completedState[item.day];
          return (
            <div
              key={item.day}
              onClick={() => toggleDay(item.day)}
              style={{
                background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
                border: `1px solid ${isDone ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)'}`,
                borderRadius: '12px',
                padding: '18px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                border: `2px solid ${isDone ? '#10B981' : 'var(--border-bright)'}`,
                background: isDone ? '#10B981' : 'transparent',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: '2px', fontWeight: 800, fontSize: '0.85rem'
              }}>
                {isDone ? '✓' : ''}
              </div>
              <div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                    DÍA {item.day}
                  </span>
                  <h3 style={{
                    fontSize: '1.05rem', fontWeight: 700,
                    textDecoration: isDone ? 'line-through' : 'none',
                    color: isDone ? 'var(--text-faint)' : 'var(--text-main)'
                  }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
