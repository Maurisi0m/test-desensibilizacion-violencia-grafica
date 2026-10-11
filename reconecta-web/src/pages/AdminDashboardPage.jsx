import React, { useState, useEffect } from 'react';
import { 
  IconBarChart, 
  IconUsers, 
  IconDownload, 
  IconFilter, 
  IconCheckCircle, 
  IconFileText, 
  IconAlertCircle, 
  IconUser, 
  IconSearch, 
  IconPrinter,
  IconTrash
} from '../components/Icons';
import { BLOCKS, QUESTIONS_42 } from '../data/questionBank';
import DimensionExplanationCard from '../components/DimensionExplanationCard';
import StudentVisualCharts from '../components/StudentVisualCharts';
import { generateStudentConclusion } from '../data/conclusionGenerator';

export default function AdminDashboardPage({ onRequireLogin }) {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('charts'); // 'charts' | 'individual' | 'group'
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBlockReview, setFilterBlockReview] = useState(0); // 0 = todos los bloques
  
  // Estados para vista grupal
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filterGrade, setFilterGrade] = useState('ALL');
  const [stats, setStats] = useState(null);
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
      if (data.length > 0 && !selectedStudentId) {
        setSelectedStudentId(data[0].id);
      }
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

  const searchedEvaluations = filteredEvaluations.filter(e => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const alias = (e.participant?.alias || '').toLowerCase();
    const id = String(e.id);
    const grade = (e.participant?.school_grade || '').toLowerCase();
    return alias.includes(q) || id.includes(q) || grade.includes(q);
  });

  const selectedStudent = evaluations.find(e => e.id === selectedStudentId) || evaluations[0];

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
      a.download = `Matriz_Investigacion_LaSalle_42reactivos_N${idsArray.length}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error al exportar matriz CSV: ' + err.message);
    }
  };

  const handleDeleteEvaluation = async (id, alias) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar permanentemente la evaluación #${id} (${alias || 'Estudiante'})? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/evaluations/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });

      if (res.status === 401) {
        onRequireLogin();
        return;
      }

      if (!res.ok) {
        throw new Error('Error al eliminar participante de la base de datos.');
      }

      setEvaluations(prev => {
        const next = prev.filter(e => e.id !== id);
        if (selectedStudentId === id) {
          setSelectedStudentId(next.length > 0 ? next[0].id : null);
        }
        return next;
      });
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteSelected = async () => {
    const count = selectedIds.size;
    if (count === 0) return;

    if (!window.confirm(`¿Confirmas eliminar permanentemente los ${count} participantes seleccionados de la base de datos? Esta acción es irreversible.`)) {
      return;
    }

    try {
      const idsArray = Array.from(selectedIds);
      for (const id of idsArray) {
        await fetch(`/api/evaluations/${id}`, {
          method: 'DELETE',
          headers: getAuthHeader()
        });
      }

      setEvaluations(prev => {
        const next = prev.filter(e => !selectedIds.has(e.id));
        setSelectedStudentId(next.length > 0 ? next[0].id : null);
        return next;
      });
      setSelectedIds(new Set());
    } catch (err) {
      alert('Error al eliminar seleccionados: ' + err.message);
    }
  };

  // CÁLCULOS DINÁMICOS PARA GRÁFICOS RELEVANTES BASADOS EN LA MUESTRA SELECCIONADA
  const activeSample = evaluations.filter(e => selectedIds.has(e.id));
  const sampleN = activeSample.length;

  // Medias de los 5 bloques para la muestra activa
  const calcMean = (key) => {
    if (sampleN === 0) return 0;
    const sum = activeSample.reduce((acc, curr) => {
      const val = curr.blocks?.[key]?.index ?? curr[`idx_${key.toLowerCase()}`] ?? 0;
      return acc + val;
    }, 0);
    return sum / sampleN;
  };

  const meanCentral = sampleN > 0 
    ? activeSample.reduce((acc, curr) => acc + (curr.central_score?.index ?? curr.idx_central_des ?? 0), 0) / sampleN 
    : 0;
  const meanExp = calcMean('EXP');
  const meanNor = calcMean('NOR');
  const meanAgr = calcMean('AGR');
  const meanRel = calcMean('REL');

  // Distribución de niveles de desensibilización
  const countLowDes = activeSample.filter(e => (e.central_score?.index ?? e.idx_central_des ?? 0) < 34).length;
  const countMidDes = activeSample.filter(e => {
    const val = e.central_score?.index ?? e.idx_central_des ?? 0;
    return val >= 34 && val < 67;
  }).length;
  const countHighDes = activeSample.filter(e => (e.central_score?.index ?? e.idx_central_des ?? 0) >= 67).length;

  const pctLowDes = sampleN > 0 ? (countLowDes / sampleN) * 100 : 0;
  const pctMidDes = sampleN > 0 ? (countMidDes / sampleN) * 100 : 0;
  const pctHighDes = sampleN > 0 ? (countHighDes / sampleN) * 100 : 0;

  // Exposición incidental vs intencional
  const meanIncidental = sampleN > 0
    ? activeSample.reduce((acc, curr) => acc + (curr.subdimensions?.EXP_INC?.index ?? 0), 0) / sampleN
    : 0;
  const meanIntentional = sampleN > 0
    ? activeSample.reduce((acc, curr) => acc + (curr.subdimensions?.EXP_ACT?.index ?? 0), 0) / sampleN
    : 0;

  // Demografía
  const countSecundaria = activeSample.filter(e => (e.participant?.school_grade || '').includes('Secundaria')).length;
  const countPreparatoria = activeSample.filter(e => (e.participant?.school_grade || '').includes('Preparatoria') || (e.participant?.school_grade || '').includes('Bachillerato')).length;
  const countOtroGrado = sampleN - countSecundaria - countPreparatoria;

  const countFem = activeSample.filter(e => e.participant?.gender === 'Femenino').length;
  const countMasc = activeSample.filter(e => e.participant?.gender === 'Masculino').length;
  const countOtroGen = sampleN - countFem - countMasc;

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: '#7C3AED', fontWeight: 700, fontSize: '1.05rem' }}>Cargando base de datos de investigación...</p>
      </div>
    );
  }

  const blockStats = stats?.blocks || {};
  const correlations = stats?.correlations || {};
  const blockKeys = ['EXP', 'DES', 'NOR', 'AGR', 'REL'];

  return (
    <div className="container" style={{ maxWidth: '1240px', padding: '32px 20px 80px' }}>
      
      {/* CABECERA PRINCIPAL CON LOGO LA SALLE */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #EDE4F8',
        borderRadius: '24px',
        padding: '28px 34px',
        marginBottom: '20px',
        boxShadow: '0 8px 30px rgba(124, 58, 237, 0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            background: '#F3E8FF',
            color: '#7C3AED',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Panel de Investigación • La Salle Pachuca (Campus La Luz)
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 6px' }}>
            Exposición al Contenido Violento Gráfico en las Redes Sociales
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>
            Módulo de visualización gráfica, auditoría individual y estadística cuantitativa.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <img 
            src="/lasalle-logo.png" 
            alt="Logo La Salle" 
            style={{
              height: '56px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>

      {/* FICHA FORMAL DE AUTORES DEL PROYECTO */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)',
        border: '1px solid #DDD6FE',
        borderRadius: '16px',
        padding: '16px 24px',
        marginBottom: '26px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
            Equipo de Investigación • Metodología de la Investigación
          </div>
          <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#1E1B4B' }}>
            Alan David Cortés Hernández • Raúl Gabriel García Márquez • Daniel Rodríguez García • Mauro Ortiz Juárez
          </div>
          <div style={{ fontSize: '0.82rem', color: '#5B21B6', fontWeight: 500, marginTop: '2px' }}>
            Alumnos de 5to semestre de bachillerato — Colegio La Salle Pachuca (Campus La Luz)
          </div>
        </div>

        <div style={{
          padding: '6px 14px',
          background: '#FFFFFF',
          border: '1px solid #EDE4F8',
          borderRadius: '10px',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#7C3AED'
        }}>
          Muestra Activa: {sampleN} alumnos
        </div>
      </div>

      {/* MENÚ DE 3 PESTAÑAS (GRÁFICOS | ANÁLISIS INDIVIDUAL .EXE | MUESTRA Y CORRELACIONES) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '24px',
        borderBottom: '1px solid #EDE4F8',
        paddingBottom: '12px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('charts')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 20px',
            borderRadius: '12px',
            fontSize: '0.92rem',
            fontWeight: 800,
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'charts' ? '#7C3AED' : '#FFFFFF',
            color: activeTab === 'charts' ? '#FFFFFF' : '#4B5563',
            boxShadow: activeTab === 'charts' ? '0 4px 16px rgba(124, 58, 237, 0.25)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <IconBarChart size={18} color={activeTab === 'charts' ? '#FFFFFF' : '#7C3AED'} />
          <span>Gráficos y Métricas Visuales</span>
        </button>

        <button
          onClick={() => setActiveTab('individual')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 20px',
            borderRadius: '12px',
            fontSize: '0.92rem',
            fontWeight: 800,
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'individual' ? '#7C3AED' : '#FFFFFF',
            color: activeTab === 'individual' ? '#FFFFFF' : '#4B5563',
            boxShadow: activeTab === 'individual' ? '0 4px 16px rgba(124, 58, 237, 0.25)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <IconUser size={18} color={activeTab === 'individual' ? '#FFFFFF' : '#7C3AED'} />
          <span>Análisis Individual por Persona (Ficha .EXE)</span>
        </button>

        <button
          onClick={() => setActiveTab('group')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 20px',
            borderRadius: '12px',
            fontSize: '0.92rem',
            fontWeight: 800,
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'group' ? '#7C3AED' : '#FFFFFF',
            color: activeTab === 'group' ? '#FFFFFF' : '#4B5563',
            boxShadow: activeTab === 'group' ? '0 4px 16px rgba(124, 58, 237, 0.25)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <IconFileText size={18} color={activeTab === 'group' ? '#FFFFFF' : '#7C3AED'} />
          <span>Matriz de Correlaciones y Base de Datos</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PESTAÑA 1: GRÁFICOS Y MÉTRICAS VISUALES INTERACTIVAS */}
      {/* ========================================================================= */}
      {activeTab === 'charts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* BARRA DE FILTRO RÁPIDO PARA LOS GRÁFICOS */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EDE4F8',
            borderRadius: '16px',
            padding: '14px 22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#4B5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IconFilter size={15} color="#7C3AED" />
                Muestra analizada en los gráficos:
              </span>
              <button
                onClick={() => setFilterGrade('ALL')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterGrade === 'ALL' ? '#7C3AED' : '#EDE4F8',
                  background: filterGrade === 'ALL' ? '#F3E8FF' : '#FFFFFF',
                  color: filterGrade === 'ALL' ? '#7C3AED' : '#6B7280'
                }}
              >
                Todos ({evaluations.length})
              </button>
              <button
                onClick={() => setFilterGrade('SEC')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterGrade === 'SEC' ? '#7C3AED' : '#EDE4F8',
                  background: filterGrade === 'SEC' ? '#F3E8FF' : '#FFFFFF',
                  color: filterGrade === 'SEC' ? '#7C3AED' : '#6B7280'
                }}
              >
                Secundaria
              </button>
              <button
                onClick={() => setFilterGrade('PREP')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterGrade === 'PREP' ? '#7C3AED' : '#EDE4F8',
                  background: filterGrade === 'PREP' ? '#F3E8FF' : '#FFFFFF',
                  color: filterGrade === 'PREP' ? '#7C3AED' : '#6B7280'
                }}
              >
                Preparatoria
              </button>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>
              Los gráficos reflejan automáticamente a los <strong>{sampleN}</strong> participantes seleccionados.
            </div>
          </div>

          {/* GRID PRINCIPAL DE GRÁFICOS (FILA 1: BARRAS DE 5 BLOQUES + NIVELES DE DESENSIBILIZACIÓN) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '22px' }}>
            
            {/* GRÁFICO 1: COMPARATIVA DE LAS 5 DIMENSIONES (0 A 100%) */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #EDE4F8',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
                    Comparativa de Medias por Dimensión
                  </h3>
                  <p style={{ color: '#6B7280', fontSize: '0.8rem', margin: 0 }}>
                    Puntuación promedio de la muestra en escala de 0.0% a 100.0%
                  </p>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', background: '#F3E8FF', color: '#7C3AED', borderRadius: '6px' }}>
                  N = {sampleN}
                </span>
              </div>

              {/* Lista de Barras Visuales */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Bloque 2: Desensibilización (DESTACADO COMO VARIABLE CENTRAL) */}
                <div style={{
                  background: '#FAF5FF',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #C4B5FD'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#7C3AED' }}>
                        B2: Desensibilización y Habituación
                      </span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '1px 6px', background: '#7C3AED', color: '#FFFFFF', borderRadius: '4px' }}>
                        Variable Central
                      </span>
                    </div>
                    <span style={{ fontWeight: 900, fontSize: '1rem', color: '#7C3AED' }}>
                      {meanCentral.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '10px', background: '#E9D5FF', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(100, Math.max(0, meanCentral))}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #7C3AED, #6366F1)',
                      borderRadius: '9999px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>

                {/* Bloque 1: Exposición */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.84rem', color: '#1E1B4B' }}>
                      B1: Exposición a Violencia Gráfica
                    </span>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#4B5563' }}>
                      {meanExp.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#F3E8FF', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(100, Math.max(0, meanExp))}%`,
                      height: '100%',
                      background: '#A78BFA',
                      borderRadius: '9999px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>

                {/* Bloque 3: Normalización */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.84rem', color: '#1E1B4B' }}>
                      B3: Normalización (Memes y humor)
                    </span>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#4B5563' }}>
                      {meanNor.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#F3E8FF', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(100, Math.max(0, meanNor))}%`,
                      height: '100%',
                      background: '#A78BFA',
                      borderRadius: '9999px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>

                {/* Bloque 4: Agresividad */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.84rem', color: '#1E1B4B' }}>
                      B4: Agresividad Autoinformada
                    </span>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#4B5563' }}>
                      {meanAgr.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#F3E8FF', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(100, Math.max(0, meanAgr))}%`,
                      height: '100%',
                      background: '#A78BFA',
                      borderRadius: '9999px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>

                {/* Bloque 5: Relaciones */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.84rem', color: '#1E1B4B' }}>
                      B5: Relaciones Interpersonales
                    </span>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#4B5563' }}>
                      {meanRel.toFixed(1)}%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#F3E8FF', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(100, Math.max(0, meanRel))}%`,
                      height: '100%',
                      background: '#A78BFA',
                      borderRadius: '9999px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>

              </div>
            </div>

            {/* GRÁFICO 2: DISTRIBUCIÓN POR NIVELES DE DESENSIBILIZACIÓN */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #EDE4F8',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
                  Distribución de Niveles de Desensibilización
                </h3>
                <p style={{ color: '#6B7280', fontSize: '0.8rem', margin: 0 }}>
                  Clasificación de la muestra según grado de habituación somática y reacción
                </p>
              </div>

              {/* Tarjetas con porcentajes y barras */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Nivel Bajo */}
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#166534' }}>
                        Nivel Bajo (0% a 33%)
                      </span>
                      <div style={{ fontSize: '0.72rem', color: '#15803D' }}>
                        Sensibilidad preservada / Reactividad típica de aversión
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#166534' }}>
                        {pctLowDes.toFixed(0)}%
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#15803D' }}>{countLowDes} participantes</div>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#DCFCE7', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pctLowDes}%`, height: '100%', background: '#22C55E', borderRadius: '9999px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>

                {/* Nivel Moderado */}
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#92400E' }}>
                        Nivel Moderado (34% a 66%)
                      </span>
                      <div style={{ fontSize: '0.72rem', color: '#B45309' }}>
                        Habituación parcial / Tolerancia afectiva incipiente
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#92400E' }}>
                        {pctMidDes.toFixed(0)}%
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#B45309' }}>{countMidDes} participantes</div>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#FEF3C7', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pctMidDes}%`, height: '100%', background: '#F59E0B', borderRadius: '9999px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>

                {/* Nivel Alto */}
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div>
                      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#991B1B' }}>
                        Nivel Alto (67% a 100%)
                      </span>
                      <div style={{ fontSize: '0.72rem', color: '#B91C1C' }}>
                        Desensibilización marcada / Diversión o morbo ante sangre
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#991B1B' }}>
                        {pctHighDes.toFixed(0)}%
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#B91C1C' }}>{countHighDes} participantes</div>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#FEE2E2', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pctHighDes}%`, height: '100%', background: '#EF4444', borderRadius: '9999px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* GRID FILA 2: EXPOSICIÓN INCIDENTAL VS BÚSQUEDA ACTIVA + COMPOSICIÓN DEMOGRÁFICA */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '22px' }}>
            
            {/* GRÁFICO 3: INCIDENTAL VS INTENCIONAL */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #EDE4F8',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
                Exposición Incidental vs. Búsqueda Activa
              </h3>
              <p style={{ color: '#6B7280', fontSize: '0.8rem', margin: '0 0 18px' }}>
                Comparación entre contenido que aparece en el feed contra búsqueda deliberada
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                {/* Incidental */}
                <div style={{ background: '#FAF8FE', border: '1px solid #EDE4F8', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Incidental (Feed/Algoritmo)
                  </div>
                  <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#1E1B4B' }}>
                    {meanIncidental.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '4px' }}>
                    Reactivos 1 al 5 (Sin intención previa)
                  </div>
                </div>

                {/* Intencional */}
                <div style={{ background: '#FAF8FE', border: '1px solid #EDE4F8', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Búsqueda Deliberada
                  </div>
                  <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#1E1B4B' }}>
                    {meanIntentional.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '4px' }}>
                    Reactivos 6 al 10 (Grupos, canales, morbo)
                  </div>
                </div>
              </div>

              {/* Interpretación comparativa */}
              <div style={{
                background: '#F5F3FF',
                border: '1px solid #DDD6FE',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '0.84rem',
                color: '#5B21B6',
                lineHeight: 1.45
              }}>
                <strong>Brecha observada:</strong> La exposición incidental supera a la búsqueda deliberada por <strong>{(meanIncidental - meanIntentional).toFixed(1)} puntos porcentuales</strong> en la muestra actual, lo que indica que el material violento impacta primariamente por la circulación algorítmica en redes sociales.
              </div>
            </div>

            {/* GRÁFICO 4: COMPOSICIÓN DEMOGRÁFICA MUESTRAL */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #EDE4F8',
              borderRadius: '20px',
              padding: '24px 28px',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
                Composición de la Muestra por Grado y Género
              </h3>
              <p style={{ color: '#6B7280', fontSize: '0.8rem', margin: '0 0 18px' }}>
                Distribución demográfica de los {sampleN} participantes evaluados
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Grado escolar */}
                <div style={{ background: '#FAF8FE', border: '1px solid #EDE4F8', borderRadius: '14px', padding: '16px' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Por Nivel Académico
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1E1B4B' }}>
                      <span>Secundaria:</span>
                      <strong>{countSecundaria} ({sampleN > 0 ? ((countSecundaria / sampleN) * 100).toFixed(0) : 0}%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1E1B4B' }}>
                      <span>Preparatoria:</span>
                      <strong>{countPreparatoria} ({sampleN > 0 ? ((countPreparatoria / sampleN) * 100).toFixed(0) : 0}%)</strong>
                    </div>
                    {countOtroGrado > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                        <span>Otro:</span>
                        <strong>{countOtroGrado}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sexo / Género */}
                <div style={{ background: '#FAF8FE', border: '1px solid #EDE4F8', borderRadius: '14px', padding: '16px' }}>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Por Género
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1E1B4B' }}>
                      <span>Femenino:</span>
                      <strong>{countFem} ({sampleN > 0 ? ((countFem / sampleN) * 100).toFixed(0) : 0}%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1E1B4B' }}>
                      <span>Masculino:</span>
                      <strong>{countMasc} ({sampleN > 0 ? ((countMasc / sampleN) * 100).toFixed(0) : 0}%)</strong>
                    </div>
                    {countOtroGen > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                        <span>Otro / Prefiero no decir:</span>
                        <strong>{countOtroGen}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botón para exportar base de datos */}
              <div style={{ marginTop: '18px', textAlign: 'center' }}>
                <button
                  onClick={handleExportCsv}
                  style={{
                    width: '100%',
                    padding: '11px 18px',
                    background: '#7C3AED',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.22)'
                  }}
                >
                  <IconDownload size={16} />
                  <span>Descargar Matriz Completa en CSV para SPSS / Excel</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 2: ANÁLISIS INDIVIDUAL POR PERSONA (SIMILAR A LA APP .EXE) */}
      {/* ========================================================================= */}
      {activeTab === 'individual' && (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
          
          {/* COLUMNA IZQUIERDA: LISTA Y BUSCADOR DE PARTICIPANTES */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EDE4F8',
            borderRadius: '20px',
            padding: '22px',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 14px' }}>
              Participantes ({evaluations.length})
            </h3>

            {/* Buscador de Alumno */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Buscar por ID o alias..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 34px',
                  background: '#FAF8FE',
                  border: '1px solid #E9D5FF',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  color: '#1E1B4B',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ position: 'absolute', left: '10px', top: '10px', color: '#7C3AED' }}>
                <IconSearch size={15} />
              </div>
            </div>

            {/* Lista interactiva de alumnos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '600px', overflowY: 'auto' }}>
              {searchedEvaluations.map(e => {
                const isSelected = e.id === selectedStudentId;
                const p = e.participant || {};
                const c = e.central_score || {};

                return (
                  <div
                    key={e.id}
                    onClick={() => setSelectedStudentId(e.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: isSelected ? '#7C3AED' : '#EDE4F8',
                      background: isSelected ? '#F3E8FF' : '#FAF8FE',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: isSelected ? '#7C3AED' : '#1E1B4B' }}>
                        #{e.id} {p.alias || 'Estudiante'}
                      </span>
                      <span style={{
                        fontWeight: 900,
                        fontSize: '0.82rem',
                        color: '#7C3AED',
                        background: '#FFFFFF',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        border: '1px solid #DDD6FE'
                      }}>
                        {c.index !== undefined ? `${c.index.toFixed(0)}%` : `${e.idx_central_des?.toFixed(0)}%`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>
                      {p.age} años • {p.gender} • {p.school_grade}
                    </div>
                  </div>
                );
              })}

              {searchedEvaluations.length === 0 && (
                <div style={{ textAlign: 'center', padding: '24px 10px', color: '#9CA3AF', fontSize: '0.85rem' }}>
                  No se encontraron participantes.
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: FICHA COMPLETA DEL PARTICIPANTE SELECCIONADO */}
          {selectedStudent ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* FICHA TÉCNICA DEMOGRÁFICA */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #EDE4F8',
                borderRadius: '20px',
                padding: '26px 30px',
                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
                  <div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase' }}>
                      Ficha Individual de Investigación
                    </span>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1E1B4B', margin: '2px 0 0' }}>
                      Participante #{selectedStudent.id}: {selectedStudent.participant?.alias}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{
                      padding: '6px 14px',
                      background: '#F3E8FF',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      color: '#7C3AED',
                      fontWeight: 700
                    }}>
                      Fecha: {new Date(selectedStudent.created_at || selectedStudent.participant?.evaluated_at).toLocaleString()}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteEvaluation(selectedStudent.id, selectedStudent.participant?.alias)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        background: '#FEF2F2',
                        color: '#B91C1C',
                        border: '1px solid #FECACA',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <IconTrash size={14} color="#B91C1C" />
                      <span>Eliminar Alumno</span>
                    </button>
                  </div>
                </div>

                {/* Grid con datos demográficos */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
                  <div style={{ background: '#FAF8FE', padding: '10px 14px', borderRadius: '10px', border: '1px solid #EDE4F8' }}>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 600 }}>Edad</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1E1B4B' }}>{selectedStudent.participant?.age} años</div>
                  </div>
                  <div style={{ background: '#FAF8FE', padding: '10px 14px', borderRadius: '10px', border: '1px solid #EDE4F8' }}>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 600 }}>Género</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1E1B4B' }}>{selectedStudent.participant?.gender}</div>
                  </div>
                  <div style={{ background: '#FAF8FE', padding: '10px 14px', borderRadius: '10px', border: '1px solid #EDE4F8' }}>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 600 }}>Grado Escolar</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1E1B4B' }}>{selectedStudent.participant?.school_grade}</div>
                  </div>
                  <div style={{ background: '#FAF8FE', padding: '10px 14px', borderRadius: '10px', border: '1px solid #EDE4F8' }}>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 600 }}>Tiempo en Pantallas</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1E1B4B' }}>{selectedStudent.participant?.screen_hours}</div>
                  </div>
                </div>
              </div>

              {/* GRÁFICOS VISUALES DEL ALUMNO SELECCIONADO */}
              <StudentVisualCharts
                blocks={selectedStudent.blocks || {
                  DES: { index: selectedStudent.idx_central_des ?? 0, mean: selectedStudent.central_score?.mean ?? 0 },
                  EXP: { index: selectedStudent.idx_exp ?? 0, mean: selectedStudent.blocks?.EXP?.mean ?? 0 },
                  NOR: { index: selectedStudent.idx_nor ?? 0, mean: selectedStudent.blocks?.NOR?.mean ?? 0 },
                  AGR: { index: selectedStudent.idx_agr ?? 0, mean: selectedStudent.blocks?.AGR?.mean ?? 0 },
                  REL: { index: selectedStudent.idx_rel ?? 0, mean: selectedStudent.blocks?.REL?.mean ?? 0 }
                }}
                centralScore={selectedStudent.central_score || { index: selectedStudent.idx_central_des ?? 0 }}
                exposureComp={selectedStudent.exposure_comparison || {}}
                answers={selectedStudent.answers || []}
              />

              {/* SECCIÓN DETALLADA: QUÉ MIDE, EN QUÉ SE BASA Y PARA QUÉ SIRVE CADA PORCENTAJE */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #EDE4F8',
                borderRadius: '20px',
                padding: '24px 28px',
                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
              }}>
                <div style={{ marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
                    Fundamentación Metodológica y Utilidad de los Porcentajes
                  </h3>
                  <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: 0 }}>
                    Explicación teórica y científica de cada dimensión tanto para el estudiante como para el equipo de investigación.
                  </p>
                </div>

                {/* 1. VARIABLE CENTRAL (BLOQUE 2: DESENSIBILIZACIÓN) */}
                <DimensionExplanationCard
                  dimKey="DES"
                  score={selectedStudent.central_score?.index ?? selectedStudent.idx_central_des ?? 0}
                  mean={selectedStudent.central_score?.mean ?? selectedStudent.blocks?.DES?.mean ?? null}
                  defaultOpen={true}
                  isHero={true}
                />

                {/* 2. BLOQUE 1: EXPOSICIÓN */}
                <DimensionExplanationCard
                  dimKey="EXP"
                  score={selectedStudent.blocks?.EXP?.index ?? selectedStudent.idx_exp ?? 0}
                  mean={selectedStudent.blocks?.EXP?.mean ?? null}
                  defaultOpen={false}
                />

                {/* 3. BLOQUE 3: NORMALIZACIÓN */}
                <DimensionExplanationCard
                  dimKey="NOR"
                  score={selectedStudent.blocks?.NOR?.index ?? selectedStudent.idx_nor ?? 0}
                  mean={selectedStudent.blocks?.NOR?.mean ?? null}
                  defaultOpen={false}
                />

                {/* 4. BLOQUE 4: AGRESIVIDAD */}
                <DimensionExplanationCard
                  dimKey="AGR"
                  score={selectedStudent.blocks?.AGR?.index ?? selectedStudent.idx_agr ?? 0}
                  mean={selectedStudent.blocks?.AGR?.mean ?? null}
                  defaultOpen={false}
                />

                {/* 5. BLOQUE 5: RELACIONES INTERPERSONALES */}
                <DimensionExplanationCard
                  dimKey="REL"
                  score={selectedStudent.blocks?.REL?.index ?? selectedStudent.idx_rel ?? 0}
                  mean={selectedStudent.blocks?.REL?.mean ?? null}
                  defaultOpen={false}
                />
              </div>

              {/* CONCLUSIÓN INDIVIDUAL Y DIAGNÓSTICO PERSONALIZADO DEL ALUMNO */}
              {(() => {
                const conc = generateStudentConclusion({
                  participant: selectedStudent.participant || {},
                  desScore: selectedStudent.central_score?.index ?? selectedStudent.idx_central_des ?? 0,
                  expScore: selectedStudent.blocks?.EXP?.index ?? selectedStudent.idx_exp ?? 0,
                  norScore: selectedStudent.blocks?.NOR?.index ?? selectedStudent.idx_nor ?? 0,
                  agrScore: selectedStudent.blocks?.AGR?.index ?? selectedStudent.idx_agr ?? 0,
                  relScore: selectedStudent.blocks?.REL?.index ?? selectedStudent.idx_rel ?? 0,
                  exposureComp: selectedStudent.exposure_comparison || null,
                  answers: selectedStudent.answers || []
                });

                return (
                  <div style={{
                    background: '#FFFFFF',
                    border: '2px solid #DDD6FE',
                    borderRadius: '20px',
                    padding: '26px 30px',
                    boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            background: conc.profileBadgeBg,
                            color: conc.profileBadgeColor,
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            textTransform: 'uppercase'
                          }}>
                            {conc.profileCategory}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: '#6B7280', fontWeight: 600 }}>
                            • Diagnóstico Algorítmico Personalizado
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
                          Conclusión Individual: {conc.profileTitle}
                        </h3>
                        <p style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.55, margin: 0 }}>
                          {conc.summary}
                        </p>
                      </div>
                    </div>

                    {/* Hallazgos Cruzados */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', marginBottom: '18px' }}>
                      {conc.findings.map((f, i) => (
                        <div key={i} style={{ background: '#FAF8FE', border: '1px solid #EDE4F8', borderRadius: '12px', padding: '14px 16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '6px' }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1E1B4B' }}>{f.topic}</span>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: f.color, background: '#FFFFFF', padding: '2px 8px', borderRadius: '6px', border: '1px solid #EDE4F8' }}>{f.status}</span>
                          </div>
                          <p style={{ color: '#4B5563', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{f.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Conclusión para el Equipo de Investigación */}
                    <div style={{
                      background: 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)',
                      border: '1px solid #C4B5FD',
                      borderRadius: '14px',
                      padding: '16px 18px'
                    }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#5B21B6', marginBottom: '4px' }}>
                        Aporte de este Alumno a la Pregunta de Investigación:
                      </div>
                      <p style={{ color: '#4B5563', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                        {conc.researcherTakeaway}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* DETALLE Y AUDITORÍA REACTIVO POR REACTIVO (42 PREGUNTAS) */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #EDE4F8',
                borderRadius: '20px',
                padding: '26px 30px',
                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
                      Auditoría Reactivo por Reactivo (42 Preguntas)
                    </h3>
                    <p style={{ color: '#6B7280', fontSize: '0.84rem', margin: 0 }}>
                      Respuestas exactas registradas para el participante #{selectedStudent.id}
                    </p>
                  </div>

                  {/* Filtro por bloque */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setFilterBlockReview(0)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: filterBlockReview === 0 ? '#7C3AED' : '#EDE4F8',
                        background: filterBlockReview === 0 ? '#F3E8FF' : '#FFFFFF',
                        color: filterBlockReview === 0 ? '#7C3AED' : '#6B7280'
                      }}
                    >
                      Todos (42)
                    </button>
                    {BLOCKS.map(b => (
                      <button
                        key={b.id}
                        onClick={() => setFilterBlockReview(b.id)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: '1px solid',
                          borderColor: filterBlockReview === b.id ? '#7C3AED' : '#EDE4F8',
                          background: filterBlockReview === b.id ? '#F3E8FF' : '#FFFFFF',
                          color: filterBlockReview === b.id ? '#7C3AED' : '#6B7280'
                        }}
                      >
                        B{b.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabla de Reactivos */}
                <div style={{ overflowX: 'auto', border: '1px solid #EDE4F8', borderRadius: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                    <thead>
                      <tr style={{ background: '#FAF8FE', color: '#1E1B4B', textAlign: 'left', borderBottom: '1px solid #EDE4F8' }}>
                        <th style={{ padding: '10px 12px', width: '50px', textAlign: 'center' }}>#</th>
                        <th style={{ padding: '10px 12px', width: '90px' }}>Bloque</th>
                        <th style={{ padding: '10px 14px' }}>Texto del Reactivo</th>
                        <th style={{ padding: '10px 14px', width: '170px', textAlign: 'center' }}>Respuesta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedStudent.answers || []).filter(a => {
                        if (filterBlockReview === 0) return true;
                        const qInfo = QUESTIONS_42.find(q => q.id === a.question_id);
                        return qInfo && qInfo.blockId === filterBlockReview;
                      }).map((ans, idx) => {
                        const qInfo = QUESTIONS_42.find(q => q.id === ans.question_id) || {};
                        const score = ans.score;

                        // Colores según nivel de respuesta
                        let badgeBg = '#F3F4F6';
                        let badgeColor = '#4B5563';
                        if (score >= 4) {
                          badgeBg = '#FEE2E2';
                          badgeColor = '#B91C1C';
                        } else if (score === 3) {
                          badgeBg = '#FEF3C7';
                          badgeColor = '#B45309';
                        } else if (score === 2) {
                          badgeBg = '#F3E8FF';
                          badgeColor = '#7C3AED';
                        } else {
                          badgeBg = '#DCFCE7';
                          badgeColor = '#15803D';
                        }

                        return (
                          <tr key={ans.question_id || idx} style={{ borderBottom: '1px solid #F3F4F6' }}>
                            <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: '#7C3AED' }}>
                              {ans.question_id}
                            </td>
                            <td style={{ padding: '10px 12px', fontSize: '0.75rem', fontWeight: 700, color: '#6B7280' }}>
                              B{qInfo.blockId} ({ans.block || 'EXP'})
                            </td>
                            <td style={{ padding: '10px 14px', color: '#1E1B4B', lineHeight: 1.45 }}>
                              {ans.question_text || qInfo.text}
                            </td>
                            <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                              <span style={{
                                display: 'inline-block',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                background: badgeBg,
                                color: badgeColor,
                                fontWeight: 800,
                                fontSize: '0.8rem'
                              }}>
                                {score} - {ans.score_label || 'Puntaje'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
              Selecciona un participante para consultar su análisis individual.
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 3: MATRIZ DE CORRELACIONES Y BASE DE DATOS */}
      {/* ========================================================================= */}
      {activeTab === 'group' && (
        <>
          {/* BARRA DE HERRAMIENTAS Y ACCIONES */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EDE4F8',
            borderRadius: '16px',
            padding: '16px 24px',
            marginBottom: '26px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            boxShadow: '0 4px 16px rgba(124, 58, 237, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#4B5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IconFilter size={15} color="#7C3AED" />
                Filtrar Muestra:
              </span>
              <button
                onClick={() => setFilterGrade('ALL')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterGrade === 'ALL' ? '#7C3AED' : '#EDE4F8',
                  background: filterGrade === 'ALL' ? '#F3E8FF' : '#FFFFFF',
                  color: filterGrade === 'ALL' ? '#7C3AED' : '#6B7280'
                }}
              >
                Toda la Muestra ({evaluations.length})
              </button>
              <button
                onClick={() => setFilterGrade('SEC')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterGrade === 'SEC' ? '#7C3AED' : '#EDE4F8',
                  background: filterGrade === 'SEC' ? '#F3E8FF' : '#FFFFFF',
                  color: filterGrade === 'SEC' ? '#7C3AED' : '#6B7280'
                }}
              >
                Solo Secundaria
              </button>
              <button
                onClick={() => setFilterGrade('PREP')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: filterGrade === 'PREP' ? '#7C3AED' : '#EDE4F8',
                  background: filterGrade === 'PREP' ? '#F3E8FF' : '#FFFFFF',
                  color: filterGrade === 'PREP' ? '#7C3AED' : '#6B7280'
                }}
              >
                Solo Preparatoria
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={selectedIds.size === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  background: selectedIds.size === 0 ? '#F3F4F6' : '#FEF2F2',
                  color: selectedIds.size === 0 ? '#9CA3AF' : '#B91C1C',
                  border: '1px solid',
                  borderColor: selectedIds.size === 0 ? '#E5E7EB' : '#FECACA',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: selectedIds.size === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <IconTrash size={15} color={selectedIds.size === 0 ? '#9CA3AF' : '#B91C1C'} />
                <span>Eliminar Seleccionados ({selectedIds.size})</span>
              </button>

              <button
                type="button"
                onClick={handleExportCsv}
                disabled={selectedIds.size === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  background: selectedIds.size === 0 ? '#9CA3AF' : '#7C3AED',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  cursor: selectedIds.size === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
                }}
              >
                <IconDownload size={16} />
                <span>Exportar Matriz de Datos (.CSV)</span>
              </button>
            </div>
          </div>

          {/* MATRIZ DE CORRELACIÓN DE SPEARMAN Y GUÍA EXPLICATIVA */}
          {stats && stats.n >= 2 && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #EDE4F8',
              borderRadius: '20px',
              padding: '28px 32px',
              marginBottom: '26px',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
            }}>
              <div style={{ marginBottom: '18px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  background: '#F3E8FF',
                  borderRadius: '9999px',
                  color: '#7C3AED',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  <span>Estadística Inferencial • Spearman (ρ)</span>
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 6px' }}>
                  Matriz de Correlación entre Dimensiones
                </h2>
                <p style={{ color: '#4B5563', fontSize: '0.9rem', margin: 0, lineHeight: 1.55 }}>
                  Compara los 5 bloques evaluados de forma cruzada para determinar qué variables se mueven juntas. Permite responder con rigor estadístico si ver más violencia en redes se asocia con mayor frialdad o pérdida de sensibilidad en los adolescentes.
                </p>
              </div>

              {/* GUÍA VISUAL: CÓMO SE LEE LA MATRIZ */}
              <div style={{
                background: '#FAF8FE',
                border: '1px solid #EDE4F8',
                borderRadius: '14px',
                padding: '16px 20px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#1E1B4B', marginBottom: '8px' }}>
                  ¿Cómo interpretar los valores del coeficiente de Spearman (de -1.00 a +1.00)?
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.8rem' }}>
                  <div style={{ background: '#EDE9FE', border: '1px solid #DDD6FE', borderRadius: '8px', padding: '8px 12px', color: '#5B21B6' }}>
                    <strong>+0.50 a +1.00 (Fuerte Positiva):</strong> A mayor puntuación en una variable, mayor es la otra (van de la mano).
                  </div>
                  <div style={{ background: '#F5F3FF', border: '1px solid #EDE4F8', borderRadius: '8px', padding: '8px 12px', color: '#7C3AED' }}>
                    <strong>+0.25 a +0.49 (Moderada Positiva):</strong> Existe una tendencia observable de incremento conjunto.
                  </div>
                  <div style={{ background: '#FFFFFF', border: '1px solid #EDE4F8', borderRadius: '8px', padding: '8px 12px', color: '#6B7280' }}>
                    <strong>-0.24 a +0.24 (Débil / Nula):</strong> No existe asociación lineal clara entre ambas variables.
                  </div>
                  <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '8px', padding: '8px 12px', color: '#B91C1C' }}>
                    <strong>-0.25 a -1.00 (Inversa / Negativa):</strong> Son opuestas; cuando una variable aumenta, la otra disminuye.
                  </div>
                </div>
              </div>

              {/* TABLA DE LA MATRIZ */}
              <div style={{ overflowX: 'auto', border: '1px solid #EDE4F8', borderRadius: '12px', marginBottom: '22px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'center' }}>
                  <thead>
                    <tr style={{ background: '#FAF8FE', color: '#1E1B4B' }}>
                      <th style={{ padding: '12px 14px', textAlign: 'left' }}>Dimensión Evaluada</th>
                      {blockKeys.map(k => (
                        <th key={k} style={{ padding: '12px 8px', width: '90px', fontWeight: 800 }}>
                          [{k}]
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {blockKeys.map(rKey => (
                      <tr key={rKey} style={{ borderBottom: '1px solid #EDE4F8' }}>
                        <td style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, color: '#1E1B4B' }}>
                          [{rKey}] {blockStats[rKey]?.name}
                        </td>
                        {blockKeys.map(cKey => {
                          const val = correlations[rKey]?.[cKey] ?? 0;
                          let bg = 'transparent';
                          let color = '#6B7280';

                          if (rKey === cKey) {
                            bg = '#F3E8FF';
                            color = '#7C3AED';
                          } else if (val >= 0.5) {
                            bg = '#EDE9FE';
                            color = '#6D28D9';
                          } else if (val >= 0.25) {
                            bg = '#F5F3FF';
                            color = '#7C3AED';
                          } else if (val <= -0.25) {
                            bg = '#FEE2E2';
                            color = '#B91C1C';
                          }

                          return (
                            <td key={cKey} style={{ padding: '12px 8px', background: bg, color: color, fontWeight: Math.abs(val) > 0.4 ? 800 : 600 }}>
                              {val.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PANEL DE HALLAZGOS AUTOMÁTICOS DE LA MUESTRA ACTUAL */}
              {(() => {
                const rhoExpDes = correlations['EXP']?.['DES'] ?? 0;
                const rhoDesNor = correlations['DES']?.['NOR'] ?? 0;
                const rhoDesRel = correlations['DES']?.['REL'] ?? 0;

                return (
                  <div style={{
                    background: 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)',
                    border: '1px solid #DDD6FE',
                    borderRadius: '16px',
                    padding: '20px 22px'
                  }}>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#5B21B6', margin: '0 0 12px' }}>
                      Lectura Automática de Hallazgos para el Reporte de Investigación
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.55 }}>
                      <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', border: '1px solid #EDE4F8' }}>
                        <strong style={{ color: '#1E1B4B' }}>1. Hipótesis Central [Exposición ↔ Desensibilización] (ρ = {rhoExpDes.toFixed(2)}):</strong>{' '}
                        {rhoExpDes >= 0.3 
                          ? 'Existe una correlación positiva perceptible: los participantes que reportan mayor frecuencia de violencia visual en redes tienden a manifestar mayor pérdida de sensibilidad y atenuación de respuestas de asco o sobresalto.' 
                          : rhoExpDes <= -0.3
                          ? 'Se observa una relación inversa en la muestra actual: mayor exposición coincide con menor tolerancia, lo que puede reflejar rechazo o sensibilización acumulada.'
                          : 'Asociación débil en la muestra analizada; el tamaño muestral sugiere que la respuesta de desensibilización varía heterogéneamente entre participantes.'}
                      </div>

                      <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', border: '1px solid #EDE4F8' }}>
                        <strong style={{ color: '#1E1B4B' }}>2. Normalización y Banalización [Desensibilización ↔ Memes/Humor] (ρ = {rhoDesNor.toFixed(2)}):</strong>{' '}
                        {rhoDesNor >= 0.3
                          ? 'Correlación positiva moderada o fuerte: el acostumbramiento físico ante imágenes violentas se acompaña del uso de humor negro y justificación cognitiva del daño.'
                          : 'Los niveles de humor negro y memes operan con relativa independencia frente al acostumbramiento corporal en los datos registrados.'}
                      </div>

                      <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '10px', border: '1px solid #EDE4F8' }}>
                        <strong style={{ color: '#1E1B4B' }}>3. Impacto en Relaciones [Desensibilización ↔ Empatía/Convivencia] (ρ = {rhoDesRel.toFixed(2)}):</strong>{' '}
                        {rhoDesRel <= -0.25
                          ? 'Correlación inversa detectada: a mayor nivel de desensibilización hacia la violencia gráfica, se observan puntuaciones más reducidas en empatía prosocial y mayor fricción de convivencia.'
                          : 'No se evidencia una reducción estadísticamente concluyente de la empatía ligada únicamente a la desensibilización en este corte muestral.'}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TABLA DE AUDITORÍA GENERAL */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EDE4F8',
            borderRadius: '20px',
            padding: '26px 30px',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.05)'
          }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E1B4B', margin: '0 0 4px' }}>
              Registro de Muestra ({filteredEvaluations.length} participantes)
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.84rem', margin: '0 0 16px' }}>
              Auditoría y selección individual para exportación a SPSS / Excel
            </p>

            <div style={{ overflowX: 'auto', border: '1px solid #EDE4F8', borderRadius: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ background: '#FAF8FE', color: '#1E1B4B', textAlign: 'left', borderBottom: '1px solid #EDE4F8' }}>
                    <th style={{ padding: '10px 12px', width: '40px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.size === filteredEvaluations.length && filteredEvaluations.length > 0}
                        onChange={toggleSelectAll}
                        style={{ accentColor: '#7C3AED', cursor: 'pointer' }}
                      />
                    </th>
                    <th style={{ padding: '10px 12px' }}>ID / Alias</th>
                    <th style={{ padding: '10px 12px' }}>Edad / Sexo</th>
                    <th style={{ padding: '10px 12px' }}>Grado</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Desensibilización (Central)</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Exposición Gráfica</th>
                    <th style={{ padding: '10px 12px' }}>Fecha</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvaluations.map(e => {
                    const isSelected = selectedIds.has(e.id);
                    const p = e.participant || {};
                    const c = e.central_score || {};
                    const b = e.blocks || {};

                    return (
                      <tr key={e.id} style={{ borderBottom: '1px solid #F3F4F6', background: isSelected ? '#FAF5FF' : 'transparent' }}>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectOne(e.id)}
                            style={{ accentColor: '#7C3AED', cursor: 'pointer' }}
                          />
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1E1B4B' }}>
                          #{e.id} {p.alias}
                        </td>
                        <td style={{ padding: '10px 12px', color: '#4B5563' }}>
                          {p.age} años ({p.gender})
                        </td>
                        <td style={{ padding: '10px 12px', color: '#6B7280' }}>
                          {p.school_grade}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: '#7C3AED' }}>
                          {c.index !== undefined ? `${c.index.toFixed(1)}%` : `${e.idx_central_des?.toFixed(1)}%`}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', color: '#4B5563' }}>
                          {b.EXP?.index !== undefined ? `${b.EXP.index.toFixed(1)}%` : `${e.idx_exp?.toFixed(1)}%`}
                        </td>
                        <td style={{ padding: '10px 12px', color: '#9CA3AF', fontSize: '0.78rem' }}>
                          {new Date(e.created_at || p.evaluated_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteEvaluation(e.id, p.alias)}
                            title="Eliminar este participante de la base de datos"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '5px 10px',
                              background: '#FEF2F2',
                              color: '#B91C1C',
                              border: '1px solid #FECACA',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <IconTrash size={12} color="#B91C1C" />
                            <span>Eliminar</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
