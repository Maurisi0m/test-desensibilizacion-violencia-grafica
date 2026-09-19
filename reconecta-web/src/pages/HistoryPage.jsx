import React, { useState, useEffect } from 'react';
import { getEvaluations, getEvaluationById, deleteEvaluation } from '../services/api';

export default function HistoryPage({ setView }) {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchList = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await getEvaluations();
      setEvaluations(data);
      if (data.length > 0 && !selectedEvaluation) {
        loadDetail(data[0].id);
      }
    } catch (err) {
      console.error('Error fetching evaluations:', err);
      setErrorMsg('No se pudo conectar con la base de datos del servidor.');
    } finally {
      setLoading(false);
    }
  };

  const loadDetail = async (id) => {
    setLoadingDetail(true);
    try {
      const detail = await getEvaluationById(id);
      setSelectedEvaluation(detail);
    } catch (err) {
      console.error('Error loading evaluation detail:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`¿Estás seguro de eliminar permanentemente la evaluación #${id} de la base de datos?`)) {
      return;
    }
    try {
      await deleteEvaluation(id);
      const updated = evaluations.filter(e => e.id !== id);
      setEvaluations(updated);
      if (selectedEvaluation && selectedEvaluation.id === id) {
        setSelectedEvaluation(updated.length > 0 ? null : null);
        if (updated.length > 0) {
          loadDetail(updated[0].id);
        }
      }
    } catch (err) {
      alert('Error al eliminar evaluación: ' + err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const getSeverityBadgeColor = (level) => {
    switch (level) {
      case 'Bajo': return '#10B981';
      case 'Medio-Bajo': return '#F59E0B';
      case 'Alto': return '#F97316';
      default: return '#EF4444';
    }
  };

  return (
    <div className="container" style={{ paddingTop: '30px', paddingBottom: '70px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
            📋 Registro Histórico de Evaluaciones (Base de Datos SQLite)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Consulta qué respondió cada participante reactivo por reactivo y analiza sus puntuaciones individuales.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={fetchList}>
            🔄 Actualizar
          </button>
          <button className="btn-primary" onClick={() => setView('test')}>
            + Nueva Evaluación
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          Cargando registros desde la base de datos SQLite...
        </div>
      ) : errorMsg ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: '#F87171' }}>
          {errorMsg}
        </div>
      ) : evaluations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📭</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No hay evaluaciones registradas aún</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
            Sé el primero en realizar el test de desensibilización para ver el registro en tiempo real.
          </p>
          <button className="btn-primary" onClick={() => setView('test')}>
            Realizar Primera Evaluación →
          </button>
        </div>
      ) : (
        <div className="history-container">
          {/* Left Panel: Participants List */}
          <div className="history-list-panel">
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase' }}>
              {evaluations.length} Evaluaciones Guardadas
            </div>

            {evaluations.map((item) => {
              const isSelected = selectedEvaluation && selectedEvaluation.id === item.id;
              const badgeColor = getSeverityBadgeColor(item.severity_level);

              return (
                <div
                  key={item.id}
                  className={`history-item-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => loadDetail(item.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.98rem', color: '#FFFFFF' }}>
                      #{item.id} - {item.alias}
                    </span>
                    <span style={{
                      background: `${badgeColor}22`,
                      color: badgeColor,
                      border: `1px solid ${badgeColor}44`,
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      IGD: {item.global_index}%
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {item.age} años ({item.cohort}) • {new Date(item.evaluated_at).toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Panel: Detailed Inspector */}
          <div className="history-detail-panel">
            {loadingDetail ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                Cargando detalle de respuestas...
              </div>
            ) : selectedEvaluation ? (
              <div>
                {/* Header of selected test */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                      Ficha de Evaluación #{selectedEvaluation.id} — {selectedEvaluation.alias}
                    </h2>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      Edad: <strong>{selectedEvaluation.age} años</strong> ({selectedEvaluation.cohort}) • Evaluado el {new Date(selectedEvaluation.evaluated_at).toLocaleString()}
                    </p>
                  </div>

                  <button className="btn-danger" onClick={() => handleDelete(selectedEvaluation.id)}>
                    🗑️ Eliminar Registro
                  </button>
                </div>

                {/* Scores Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Índice Global (IGD)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{selectedEvaluation.global_index}%</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>{selectedEvaluation.severity_title}</div>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Exposición Pasiva (EA-I)</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38BDF8' }}>{selectedEvaluation.passive_index}%</div>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Búsqueda Activa (BA-C)</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F472B6' }}>{selectedEvaluation.active_index}%</div>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Normalización (NC-D)</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#34D399' }}>{selectedEvaluation.cognitive_index}%</div>
                  </div>
                </div>

                {/* Differential Analysis text */}
                <div style={{ background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '10px', padding: '14px', marginBottom: '26px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#A5B4FC', marginBottom: '4px' }}>
                    ⚖️ Análisis de Consumo:
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    {selectedEvaluation.diff_analysis}
                  </div>
                </div>

                {/* Item-by-item answers table */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '14px' }}>
                  📝 Desglose Individual Reactivo por Reactivo (20 Preguntas)
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(selectedEvaluation.answers || []).map((ans, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(15, 23, 42, 0.7)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '10px',
                      padding: '14px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                            #{ans.question_id}
                          </span>
                          <span style={{ fontSize: '0.78rem', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                            {ans.dimension}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                          {ans.question_text}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <span style={{
                          display: 'inline-block',
                          background: ans.score >= 4 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                          color: ans.score >= 4 ? '#F87171' : '#A5B4FC',
                          border: `1px solid ${ans.score >= 4 ? 'rgba(244, 63, 94, 0.4)' : 'rgba(99, 102, 241, 0.4)'}`,
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          padding: '4px 10px',
                          borderRadius: '6px'
                        }}>
                          {ans.score} / 5
                        </span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '4px', maxWidth: '140px' }}>
                          {ans.score_label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                Selecciona una evaluación de la izquierda para ver el desglose completo.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
