import React from 'react';

export default function SurveyCircleCard({ style = {} }) {
  return (
    <div style={{
      background: '#F9FAFB',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '12px 16px',
      fontSize: '0.8rem',
      color: '#4B5563',
      lineHeight: 1.5,
      ...style
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
        <span style={{ fontWeight: 800, color: '#374151', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          SurveyCircle • Survey Code
        </span>
        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#6D28D9', background: '#EDE9FE', padding: '2px 8px', borderRadius: '6px', letterSpacing: '0.03em' }}>
          23Y3-34N1-QKTX-PKZX
        </span>
      </div>
      <p style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#4B5563' }}>
        Canjea el siguiente Survey Code en <a href="https://www.surveycircle.com" target="_blank" rel="noopener noreferrer" style={{ color: '#7C3AED', textDecoration: 'underline' }}>https://www.surveycircle.com</a> y recibe participantes gratis para tu estudio a través de SurveyCircle: <strong style={{ color: '#111827', letterSpacing: '0.03em' }}>23Y3-34N1-QKTX-PKZX</strong>
      </p>
      <div style={{ fontSize: '0.78rem', color: '#4B5563' }}>
        Redime el Survey Code con un solo clic: <a href="https://www.surveycircle.com/23Y3-34N1-QKTX-PKZX/" target="_blank" rel="noopener noreferrer" style={{ color: '#7C3AED', fontWeight: 700, wordBreak: 'break-all' }}>https://www.surveycircle.com/23Y3-34N1-QKTX-PKZX/</a>
      </div>
    </div>
  );
}
