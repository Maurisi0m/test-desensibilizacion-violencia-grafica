import React from 'react';
import { IconBookOpen, IconCheckCircle } from '../components/Icons';

export default function ReferencesPage() {
  const references = [
    {
      id: 1,
      authors: 'Galán Jiménez, J. S., Sánchez-Armáss Cappello, O., & García y Barragán, L. F.',
      year: '2019',
      title: 'Propiedades psicométricas de la Escala de Desensibilización a la Violencia para Adolescentes (EDV)',
      source: 'Nova Scientia, 11(22), 346–371',
      doi: 'https://doi.org/10.21640/ns.v11i22.1680',
      note: 'Fundamento psicométrico de partida para los reactivos del Bloque 2 (desensibilización y habituación somática ante lesiones físicas graves).'
    },
    {
      id: 2,
      authors: 'Buss, A. H., & Perry, M.',
      year: '1992',
      title: 'The Aggression Questionnaire',
      source: 'Journal of Personality and Social Psychology, 63(3), 452–459',
      doi: 'https://doi.org/10.1037/0022-3514.63.3.452',
      note: 'Fundamento teórico para el Bloque 4: agresión física, agresión verbal, ira y hostilidad autoinformada.'
    },
    {
      id: 3,
      authors: 'Bandura, A.',
      year: '1973',
      title: 'Aggression: A social learning analysis',
      source: 'Prentice-Hall',
      doi: null,
      note: 'Teoría del aprendizaje social: modelamiento de conductas agresivas y mecanismos de desinhibición conductual tras observar violencia en medios.'
    },
    {
      id: 4,
      authors: 'Gerbner, G., & Gross, L.',
      year: '1976',
      title: 'Living with television: The violence profile',
      source: 'Journal of Communication, 26(2), 172–199',
      doi: 'https://doi.org/10.1111/j.1460-2466.1976.tb01397.x',
      note: 'Teoría del cultivo mediático: marco para el Bloque 3 sobre normalización cognitiva y percepción de la violencia como cotidiana o aceptable.'
    },
    {
      id: 5,
      authors: 'Galán Jiménez, J. S., & Preciado Serrano, M. de L.',
      year: '2014',
      title: 'Desensibilización a la violencia en adolescentes: Una aproximación conceptual',
      source: 'Revista Criminalidad, 56(1), 27–40',
      doi: null,
      note: 'Aproximación conceptual a los procesos de habituación emocional y pérdida de reactividad somática en adolescentes mexicanos.'
    },
    {
      id: 6,
      authors: 'Siegel, D. J.',
      year: '2015',
      title: 'Brainstorm: The power and purpose of the teenage brain',
      source: 'TarcherPerigee',
      doi: null,
      note: 'Neurodesarrollo adolescente: maduración del córtex prefrontal, regulación del afecto, búsqueda de sensaciones intensas y relación con pares.'
    },
    {
      id: 7,
      authors: 'Berkowitz, L.',
      year: '1984',
      title: 'Some effects of thoughts on appraisal and emotional reactions to stimuli',
      source: 'Advances in Experimental Social Psychology, 17, 303–342',
      doi: 'https://doi.org/10.1016/S0065-2601(08)60124-7',
      note: 'Mecanismos de priming cognitivo y reactividad afectiva ante imágenes y videos con representación explícita de violencia física.'
    }
  ];

  return (
    <div className="container" style={{ maxWidth: '940px', padding: '36px 20px 80px' }}>
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EDE4F8',
        borderRadius: '24px',
        padding: '38px',
        boxShadow: '0 12px 35px -8px rgba(124, 58, 237, 0.10)'
      }}>
        {/* Cabecera con Logo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px', gap: '20px' }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '9999px',
              background: '#F3E8FF',
              color: '#7C3AED',
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              Sustento Científico y Metodológico
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 6px' }}>
              Marco Teórico y Referencias (APA 7)
            </h1>
            <p style={{ color: '#6B7280', fontSize: '0.92rem', margin: 0, maxWidth: '640px', lineHeight: 1.55 }}>
              Fuentes académicas que fundamentan los 42 reactivos en 5 bloques temáticos y las variables de desensibilización, normalización, agresividad y relaciones interpersonales.
            </p>
          </div>

          <img 
            src="/lasalle-logo.png" 
            alt="Logo La Salle" 
            style={{
              height: '56px',
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

        {/* Declaración de rigor metodológico */}
        <div style={{
          background: '#FAF8FE',
          border: '1px solid #EDE4F8',
          borderRadius: '16px',
          padding: '18px 22px',
          marginBottom: '28px'
        }}>
          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#5B21B6', marginBottom: '4px' }}>
            Nota de Rigor Metodológico
          </div>
          <p style={{ color: '#4B5563', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            La Escala de Desensibilización a la Violencia (EDV) y el Aggression Questionnaire (BPAQ) constituyen antecedentes teóricos de referencia. Los 42 reactivos fueron adaptados lingüísticamente para adolescentes de secundaria y preparatoria sin presentarse como instrumentos clínicos de diagnóstico.
          </p>
        </div>

        {/* Lista de referencias */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {references.map(ref => (
            <div
              key={ref.id}
              style={{
                background: '#FAF8FE',
                border: '1px solid #EDE4F8',
                borderRadius: '14px',
                padding: '20px'
              }}
            >
              <div style={{ fontSize: '0.94rem', color: '#1E1B4B', lineHeight: 1.55, marginBottom: '6px' }}>
                <span style={{ fontWeight: 800 }}>{ref.authors}</span> ({ref.year}). <em>{ref.title}</em>. {ref.source}.
              </div>

              {ref.doi && (
                <div style={{ marginBottom: '10px' }}>
                  <a
                    href={ref.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#7C3AED',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    {ref.doi}
                  </a>
                </div>
              )}

              <div style={{
                fontSize: '0.82rem',
                color: '#6B7280',
                borderTop: '1px solid #EDE4F8',
                paddingTop: '8px',
                marginTop: '6px',
                lineHeight: 1.45
              }}>
                <strong style={{ color: '#1E1B4B' }}>Función en la investigación:</strong> {ref.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
