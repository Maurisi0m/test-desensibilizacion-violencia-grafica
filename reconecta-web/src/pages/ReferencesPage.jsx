import React from 'react';
import { IconBookOpen, IconShield, IconFileText } from '../components/Icons';

export default function ReferencesPage() {
  const references = [
    {
      id: 1,
      authors: 'Galán Jiménez, J. S., Sánchez-Armáss Cappello, O., & García y Barragán, L. F.',
      year: '2019',
      title: 'Propiedades psicométricas de la Escala de Desensibilización a la Violencia para Adolescentes (EDV)',
      source: 'Nova Scientia, 11(22), 346–371',
      doi: 'https://doi.org/10.21640/ns.v11i22.1680',
      note: 'Fundamento de las 3 dimensiones de desensibilización: diversión ante violencia física, agrado al ejercer violencia psicológica y diversión ante violencia psicológica.'
    },
    {
      id: 2,
      authors: 'Buss, A. H., & Perry, M.',
      year: '1992',
      title: 'The Aggression Questionnaire',
      source: 'Journal of Personality and Social Psychology, 63(3), 452–459',
      doi: 'https://doi.org/10.1037/0022-3514.63.3.452',
      note: 'Fundamento para las 4 dimensiones de agresividad autoinformada: agresión física, agresión verbal, ira y hostilidad.'
    },
    {
      id: 3,
      authors: 'Bandura, A.',
      year: '1973',
      title: 'Aggression: A social learning analysis',
      source: 'Prentice-Hall',
      doi: null,
      note: 'Contextualización del aprendizaje por observación, modelamiento de conductas agresivas y mecanismos de desinhibición.'
    },
    {
      id: 4,
      authors: 'Gerbner, G., & Gross, L.',
      year: '1976',
      title: 'Living with television: The violence profile',
      source: 'Journal of Communication, 26(2), 172–199',
      doi: 'https://doi.org/10.1111/j.1460-2466.1976.tb01397.x',
      note: 'Teoría del cultivo mediático: asociación entre exposición acumulada a contenidos mediáticos y percepción de la violencia como habitual o normal.'
    },
    {
      id: 5,
      authors: 'Galán Jiménez, J. S., & Preciado Serrano, M. de L.',
      year: '2014',
      title: 'Desensibilización a la violencia en adolescentes: Una aproximación conceptual',
      source: 'Revista Criminalidad, 56(1), 27–40',
      doi: null,
      note: 'Marco teórico conceptual sobre la habituación psicológica ante la violencia en población adolescente mexicana.'
    },
    {
      id: 6,
      authors: 'Siegel, D. J.',
      year: '2015',
      title: 'Brainstorm: The power and purpose of the teenage brain',
      source: 'TarcherPerigee',
      doi: null,
      note: 'Neurodesarrollo adolescente: maduración del córtex prefrontal, regulación emocional, búsqueda de sensaciones y relación con pares.'
    },
    {
      id: 7,
      authors: 'Berkowitz, L.',
      year: '1984',
      title: 'Some effects of thoughts on appraisal and emotional reactions to stimuli',
      source: 'Advances in Experimental Social Psychology, 17, 303–342',
      doi: 'https://doi.org/10.1016/S0065-2601(08)60124-7',
      note: 'Mecanismos de priming cognitivo y activación afectiva (arousal) ante estímulos visuales agresivos.'
    }
  ];

  return (
    <div className="container" style={{ maxWidth: '900px', padding: '30px 20px 80px' }}>
      <div style={{
        background: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        padding: '36px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <IconBookOpen size={24} color="#38bdf8" />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Marco Teórico y Referencias Bibliográficas (APA 7)
          </h1>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '28px' }}>
          Fuentes científicas que sustentan la construcción de los 38 reactivos, las 11 dimensiones 
          y los supuestos conceptuales del estudio escolar sobre desensibilización, agresividad y convivencia.
        </p>

        {/* Declaración de rigor metodológico */}
        <div style={{
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '28px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start'
        }}>
          <IconShield size={20} color="#38bdf8" />
          <div style={{ fontSize: '0.86rem', color: '#bae6fd', lineHeight: 1.55 }}>
            <strong>Nota de adaptación psicométrica:</strong> La Escala de Desensibilización a la Violencia (EDV) y el Aggression Questionnaire (BPAQ) constituyen referencias teóricas e instrumentales de partida. Los reactivos fueron adaptados lingüísticamente para estudiantes adolescentes y no se presentan como automáticamente equivalentes a las versiones completas validadas.
          </div>
        </div>

        {/* Lista de referencias */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {references.map(ref => (
            <div
              key={ref.id}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '10px',
                padding: '18px 20px'
              }}
            >
              <div style={{ fontSize: '0.92rem', color: '#f8fafc', lineHeight: 1.5, marginBottom: '6px' }}>
                <span style={{ fontWeight: 700 }}>{ref.authors}</span> ({ref.year}). <em>{ref.title}</em>. {ref.source}.
              </div>

              {ref.doi && (
                <div style={{ marginBottom: '8px' }}>
                  <a
                    href={ref.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#38bdf8',
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{ref.doi}</span>
                  </a>
                </div>
              )}

              <div style={{ fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid #334155', paddingTop: '8px', marginTop: '6px' }}>
                <strong>Función en la investigación:</strong> {ref.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
