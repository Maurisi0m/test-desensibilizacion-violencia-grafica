import React, { useState } from 'react';

const KEYWORDS = 'gore, balacera, linchamiento, choque mortal, atropellado, pelea callejera, ejecución, desmembrado, sangre, sicarios, asalto a mano armada, herido de bala, autopsia, shock content';

export default function AlgorithmGuides({ setView }) {
  const [activeTab, setActiveTab] = useState('tiktok');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(KEYWORDS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 34px' }}>
        <div className="badge-tag">Higiene Digital Paso a Paso</div>
        <h1 className="hero-title" style={{ fontSize: '2.3rem' }}>
          Entrena a tus Algoritmos: <br />
          <span className="gradient-text">Elige qué entra en tu mente</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>
          Las aplicaciones no muestran violencia porque seas mala persona: la muestran porque el morbo retiene la mirada 3 segundos más. Aplica estas configuraciones oficiales para limpiar tus feeds.
        </p>
      </div>

      {/* Keywords copy box */}
      <div style={{
        background: 'rgba(99, 102, 241, 0.12)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '14px',
        padding: '22px',
        marginBottom: '34px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 700 }}>📋 Lista de Palabras Clave Recomendadas para Silenciar</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Copia esta lista y pégala en los filtros de palabras bloqueadas de TikTok, Instagram y X:</p>
          </div>
          <button className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.88rem' }} onClick={handleCopy}>
            {copied ? '¡Copiado al Portapapeles! ✓' : 'Copiar Palabras Clave 📋'}
          </button>
        </div>
        <div style={{
          background: '#090D16',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '12px',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          color: '#A5B4FC',
          wordBreak: 'break-all'
        }}>
          {KEYWORDS}
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="tab-buttons">
        <button className={`tab-btn ${activeTab === 'tiktok' ? 'active' : ''}`} onClick={() => setActiveTab('tiktok')}>
          🎵 TikTok
        </button>
        <button className={`tab-btn ${activeTab === 'instagram' ? 'active' : ''}`} onClick={() => setActiveTab('instagram')}>
          📸 Instagram / Reels
        </button>
        <button className={`tab-btn ${activeTab === 'x' ? 'active' : ''}`} onClick={() => setActiveTab('x')}>
          ✖️ X (Twitter)
        </button>
        <button className={`tab-btn ${activeTab === 'telegram' ? 'active' : ''}`} onClick={() => setActiveTab('telegram')}>
          ✈️ Telegram & WhatsApp
        </button>
      </div>

      {/* Tab 1: TikTok */}
      {activeTab === 'tiktok' && (
        <div>
          <div className="step-instruction">
            <div className="step-num-pill">1</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Actualizar el Feed "Para Ti" (Reinicio Total)</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Ve a tu <strong>Perfil → Ajustes y privacidad (☰) → Preferencias de contenido → Actualizar feed Para ti</strong>. Pulsa continuar. Esto borrará el historial de recomendaciones violentas y comenzará desde cero como si la cuenta fuera nueva.
              </p>
            </div>
          </div>

          <div className="step-instruction">
            <div className="step-num-pill">2</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Filtrar palabras clave de videos</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                En <strong>Preferencias de contenido → Filtrar palabras clave de videos</strong>, agrega términos como <code>gore</code>, <code>pelea</code>, <code>balacera</code>, <code>accidente</code>. Cualquier video que contenga esos hashtags en su descripción no se mostrará en tu feed.
              </p>
            </div>
          </div>

          <div className="step-instruction">
            <div className="step-num-pill">3</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Usar la regla de los 2 segundos y "No me interesa"</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Si ves el inicio de una agresión, <strong>mantén presionado el video y toca "No me interesa"</strong> en menos de 2 segundos. No mires los comentarios: TikTok mide los segundos de retención para recomendar más de lo mismo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Instagram */}
      {activeTab === 'instagram' && (
        <div>
          <div className="step-instruction">
            <div className="step-num-pill">1</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Configurar Control de Contenido Delicado a "Menos"</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Entra a tu <strong>Perfil → Configuración y privacidad → Contenido sugerido → Control de contenido delicado</strong>. Selecciona la opción <strong>"Menos"</strong>. Esto filtra de raíz publicaciones de agresiones físicas y accidentes en la pestaña Explorar y Reels.
              </p>
            </div>
          </div>

          <div className="step-instruction">
            <div className="step-num-pill">2</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Ocultar palabras y comentarios ofensivos</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                En <strong>Configuración → Palabras ocultas → Administrar palabras personalizadas</strong>, pega la lista de palabras clave recomendadas para evitar comentarios y mensajes directos morbosos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: X */}
      {activeTab === 'x' && (
        <div>
          <div className="step-instruction">
            <div className="step-num-pill">1</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Desactivar contenido multimedia delicado automático</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Ve a <strong>Configuración y privacidad → Privacidad y seguridad → Contenido que ves</strong>. Desmarca la casilla para que X censure con advertencia cualquier foto o video explícito.
              </p>
            </div>
          </div>

          <div className="step-instruction">
            <div className="step-num-pill">2</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Desactivar reproducción automática (Autoplay)</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                En <strong>Accesibilidad, pantalla e idiomas → Uso de datos → Reproducción automática de videos</strong>, selecciona <strong>"Nunca"</strong>. Esto evitará que un video violento se reproduzca automáticamente mientras haces scroll.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Telegram */}
      {activeTab === 'telegram' && (
        <div>
          <div className="step-instruction">
            <div className="step-num-pill">1</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Desactivar la Descarga Automática de Multimedia</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                En WhatsApp y Telegram ve a <strong>Ajustes → Almacenamiento y datos → Descarga automática</strong>. Desactiva la descarga automática de videos y fotos. De este modo, ningún video morboso se guardará en tu galería sin tu permiso.
              </p>
            </div>
          </div>

          <div className="step-instruction">
            <div className="step-num-pill">2</div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>Abandonar Canales y Grupos Tóxicos de Shock</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                Estar en canales no moderados donde se comparte gore o peleas normales genera habituación patológica rápida. Salte y elimina el chat: no te estás perdiendo nada valioso y estás cuidando tu salud mental.
              </p>
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-primary" onClick={() => setView('detox')}>
          🌱 Unirme al Reto Detox de 7 Días →
        </button>
      </div>
    </div>
  );
}
