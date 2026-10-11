import React, { useState, useEffect } from 'react';
import { IconBarChart, IconUsers, IconDownload, IconTrash, IconFilter, IconCheckCircle, IconFileText, IconAlertCircle } from '../components/Icons';
import { BLOCKS } from '../data/questionBank';

export default function AdminDashboardPage({ onViewIndividual, onRequireLogin }) {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filterGrade, setFilterGrade] = useState('ALL');
  const [stats, setStats] = useState(null);
  const [inspectModalData, setInspectModalData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const getAuthHeader = () => {
    const token = localStorage.getItem('researchAuthToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const fetchEvaluations = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await fetch('/api/evaluations', {
        headers: getAuthHeader()
      });

      if (res.status === 401) {
        onRequireLogin();
        return;
      }

      if (!res.ok) {
        throw new Error('Error al consultar base de datos de investigación.');
      }

      const data = await res.json();
      setEvaluations(data);
      setSelectedIds(new Set(data.map(d => d.id)));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error de conexión.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, []);

  useEffect(() => {
    if (evaluations.length === 0) return;

    const idsArray = Array.from(selectedIds);
    fetch('/api/stats/group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ ids: idsArray })
    })
      .then(res => {
        if (res.status === 401) {
          onRequireLogin();
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setStats(data);
      })
      .catch(err => console.error('Error al calcular estadísticas:', err));
  }, [selectedIds, evaluations]);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredEvaluations.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredEvaluations.map(e => e.id)));
    }
  };

  const toggleSelectOne = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const filteredEvaluations = evaluations.filter(e => {
    const grade = e.participant?.school_grade || '';
    if (filterGrade === 'ALL') return true;
    if (filterGrade === 'SEC' && grade.includes('Secundaria')) return true;
    if (filterGrade === 'PREP' && (grade.includes('Preparatoria') || grade.includes('Bachillerato'))) return true;
    return true;
  });

  const handleExportCsv = async () => {
    try {
      const idsArray = Array.from(selectedIds);
      const res = await fetch('/api/export/csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        },
        body: JSON.stringify({ ids: idsArray })
      });

      if (res.status === 401) {
        onRequireLogin();
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Matriz_Investigacion_Violencia_Grafica_42items_N${idsArray.length}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error al exportar matriz a CSV.');
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm(`¿Confirmas la eliminación del registro #${id}?`)) return;

    try {
      const res = await fetch(`/api/evaluations/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });
      if (res.ok) {
        setEvaluations(prev => prev.filter(item => item.id !== id));
        setSelectedIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    } catch (err) {
      alert('Error al eliminar registro.');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center', color: '#94a3b8' }}>
        Cargando datos de investigación escolar...
      </div>
    );
  }

  const sampleSize = selectedIds.size;
  const blockStats = stats?.blocks || {};
  const correlations = stats?.correlations || {};
  const blockKeys = Object.keys(blockStats);

  return (
    <div className="container" style={{ maxWidth: '1200px', padding: '30px 20px 80px' }}>
      
      {/* Encabezado del Panel */}
      <div style={{
        background: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '26px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '9999px',
              color: '#38bdf8',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              <IconBarChart size={14} color="#38bdf8" />
              Panel de Investigación (Acceso Restringido La Salle)
            </div>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px' }}>
              Auditoría y Análisis Muestral Grupal
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
              Variable Central: Desensibilización a Violencia Gráfica (Bloque 2) con variables de Exposición, Normalización, Agresividad y Convivencia.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleExportCsv}
              disabled={sampleSize === 0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: sampleSize === 0 ? '#334155' : 'linear-gradient(135deg, #0284c7, #2563eb)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: sampleSize === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <IconDownload size={16} />
              <span>Exportar Matriz a CSV (42 Ítems / SPSS)</span>
            </button>
          </div>
        </div>

        {/* Filtros de Muestra */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          marginTop: '22px',
          paddingTop: '18px',
          borderTop: '1px solid #1f2937'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
              Muestra Seleccionada: <strong style={{ color: '#38bdf8' }}>{sampleSize}</strong> de <strong>{evaluations.length}</strong> encuestas registradas
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Filtrar Grado:</span>
              <select
                value={filterGrade}
                onChange={e => setFilterGrade(e.target.value)}
                style={{
                  padding: '6px 10px',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  color: '#f8fafc',
                  fontSize: '0.82rem'
                }}
              >
                <option value="ALL">Todos los grados</option>
                <option value="SEC">Secundaria</option>
                <option value="PREP">Preparatoria / Bachillerato</option>
              </select>
            </div>
          </div>

          <button
            onClick={toggleSelectAll}
            style={{
              padding: '6px 12px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '6px',
              color: '#94a3b8',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            {selectedIds.size === filteredEvaluations.length ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
          </button>
        </div>
      </div>

      {sampleSize === 0 ? (
        <div style={{
          background: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '16px',
          padding: '60px 20px',
          textAlign: 'center',
          color: '#94a3b8'
        }}>
          <IconAlertCircle size={32} color="#f59e0b" className="mb-2" />
          <p>No hay participantes seleccionados para el análisis. Selecciona al menos un participante abajo.</p>
        </div>
      ) : (
        <>
          {/* TABLA DE LOS 5 BLOQUES TEÓRICOS */}
          <div style={{
            background: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '26px'
          }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 14px' }}>
              Estadísticos Descriptivos por Bloque Temático (N = {sampleSize})
            </h2>
            <div style={{ overflowX: 'auto', border: '1px solid #1e293b', borderRadius: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px' }}>Bloque Temático</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center' }}>Reactivos (k)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center' }}>Media (M %)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center' }}>Mediana (Mdn %)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center' }}>Desv. Estándar (DE)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center' }}>Rango Mín - Máx</th>
                  </tr>
                </thead>
                <tbody>
                  {blockKeys.map(k => {
                    const b = blockStats[k];
                    return (
                      <tr key={k} style={{ borderBottom: '1px solid #1e293b', background: b.isCentral ? 'rgba(56, 189, 248, 0.05)' : 'transparent' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 700, color: b.isCentral ? '#38bdf8' : '#f1f5f9' }}>
                          {b.name} {b.isCentral && <span style={{ fontSize: '0.72rem', color: '#38bdf8', border: '1px solid #38bdf8', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>VARIABLE CENTRAL</span>}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', color: '#cbd5e1' }}>
                          {b.k}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 800, color: b.isCentral ? '#38bdf8' : '#f8fafc' }}>
                          {b.mean.toFixed(2)}%
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', color: '#cbd5e1' }}>
                          {b.median.toFixed(2)}%
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', color: '#94a3b8' }}>
                          ±{b.sd.toFixed(2)}
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center', color: '#64748b' }}>
                          {b.min.toFixed(1)}% - {b.max.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* MATRIZ DE CORRELACIÓN DE SPEARMAN ENTRE BLOQUES */}
          {sampleSize >= 3 && Object.keys(correlations).length > 0 && (
            <div style={{
              background: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '26px'
            }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 4px' }}>
                Matriz de Correlación de Rangos de Spearman (rho) entre Bloques
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 16px' }}>
                Asociación estadística entre exposición a violencia gráfica, desensibilización, normalización, agresividad y relaciones.
              </p>

              <div style={{ overflowX: 'auto', border: '1px solid #1e293b', borderRadius: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'center' }}>
                  <thead>
                    <tr style={{ background: '#1e293b', color: '#94a3b8' }}>
                      <th style={{ padding: '10px 14px', textAlign: 'left' }}>Bloque</th>
                      {blockKeys.map(k => (
                        <th key={k} style={{ padding: '10px 8px', width: '80px' }}>
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {blockKeys.map(rKey => (
                      <tr key={rKey} style={{ borderBottom: '1px solid #1e293b' }}>
                        <td style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#f1f5f9' }}>
                          [{rKey}] {blockStats[rKey]?.name}
                        </td>
                        {blockKeys.map(cKey => {
                          const val = correlations[rKey]?.[cKey] ?? 0;
                          let bg = 'transparent';
                          let color = '#94a3b8';

                          if (rKey === cKey) {
                            bg = '#1e293b';
                            color = '#f8fafc';
                          } else if (val >= 0.5) {
                            bg = 'rgba(56, 189, 248, 0.2)';
                            color = '#38bdf8';
                          } else if (val >= 0.25) {
                            bg = 'rgba(56, 189, 248, 0.1)';
                            color = '#bae6fd';
                          } else if (val <= -0.25) {
                            bg = 'rgba(239, 68, 68, 0.15)';
                            color = '#fca5a5';
                          }

                          return (
                            <td key={cKey} style={{ padding: '10px 6px', background: bg, color: color, fontWeight: Math.abs(val) > 0.4 ? 700 : 500 }}>
                              {val.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* REGISTRO COMPLETO DE ESTUDIANTES */}
      <div style={{
        background: '#111827',
        border: '1px solid #1f2937',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 4px' }}>
              Base de Datos de Respuestas de Estudiantes ({filteredEvaluations.length})
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>
              Auditoría individual y detalle reactivo por reactivo para el equipo de investigación
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid #1e293b', borderRadius: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', width: '40px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filteredEvaluations.length && filteredEvaluations.length > 0}
                    onChange={toggleSelectAll}
                    style={{ accentColor: '#0284c7', cursor: 'pointer' }}
                  />
                </th>
                <th style={{ padding: '10px 12px' }}>ID / Alias</th>
                <th style={{ padding: '10px 12px' }}>Edad / Sexo</th>
                <th style={{ padding: '10px 12px' }}>Grado</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Desensibilización (Central)</th>
                <th style={{ padding: '10px 12px', textAlign: 'center' }}>Exposición Gráfica</th>
                <th style={{ padding: '10px 12px' }}>Fecha</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvaluations.map(e => {
                const isSelected = selectedIds.has(e.id);
                const p = e.participant || {};
                const c = e.central_score || {};
                const b = e.blocks || {};

                return (
                  <tr key={e.id} style={{ borderBottom: '1px solid #1e293b', background: isSelected ? 'rgba(56, 189, 248, 0.03)' : 'transparent' }}>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(e.id)}
                        style={{ accentColor: '#0284c7', cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: '#f8fafc' }}>
                      #{e.id} {p.alias}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>
                      {p.age} años ({p.gender})
                    </td>
                    <td style={{ padding: '10px 12px', color: '#94a3b8' }}>
                      {p.school_grade}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: '#38bdf8' }}>
                      {c.index !== undefined ? `${c.index.toFixed(1)}%` : `${e.idx_central_des?.toFixed(1)}%`}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center', color: '#cbd5e1' }}>
                      {b.EXP?.index !== undefined ? `${b.EXP.index.toFixed(1)}%` : `${e.idx_exp?.toFixed(1)}%`}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#64748b', fontSize: '0.78rem' }}>
                      {new Date(e.created_at || p.evaluated_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          onClick={() => setInspectModalData(e)}
                          style={{
                            padding: '4px 8px',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '4px',
                            color: '#38bdf8',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          Inspeccionar (42)
                        </button>
                        <button
                          onClick={(evt) => handleDelete(e.id, evt)}
                          style={{
                            padding: '4px 8px',
                            background: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '4px',
                            color: '#ef4444',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          <IconTrash size={12} color="#ef4444" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PARA INSPECCIONAR LAS 42 PREGUNTAS DE UN ESTUDIANTE */}
      {inspectModalData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            background: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '26px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Auditoría Completa de Respuestas — #{inspectModalData.id} {inspectModalData.participant?.alias}
              </h3>
              <button
                onClick={() => setInspectModalData(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cerrar (X)
              </button>
            </div>

            <div style={{ border: '1px solid #1e293b', borderRadius: '8px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px', width: '40px' }}>#</th>
                    <th style={{ padding: '8px 12px', width: '80px' }}>Bloque</th>
                    <th style={{ padding: '8px 12px' }}>Reactivo</th>
                    <th style={{ padding: '8px 12px', width: '100px', textAlign: 'center' }}>Puntaje</th>
                  </tr>
                </thead>
                <tbody>
                  {(inspectModalData.answers || []).map(a => (
                    <tr key={a.question_id} style={{ borderBottom: '1px solid #1e293b' }}>
                      <td style={{ padding: '8px 12px', color: '#64748b', fontWeight: 700 }}>
                        {a.question_id}
                      </td>
                      <td style={{ padding: '8px 12px', color: '#38bdf8', fontSize: '0.74rem' }}>
                        Bloque {a.block_id || a.block}
                      </td>
                      <td style={{ padding: '8px 12px', color: '#cbd5e1' }}>
                        {a.question_text}
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 700, color: '#38bdf8' }}>
                        {a.score} ({a.score_label})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button
                onClick={() => setInspectModalData(null)}
                style={{
                  padding: '8px 18px',
                  background: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #334155',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
