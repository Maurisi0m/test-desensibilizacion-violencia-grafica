// Módulo Psicométrico para Investigación Escolar Cuantitativa
// Variable Central: Exposición a Contenido Gráfico Violento y Desensibilización/Habituación
// 42 Reactivos distribuidos en 5 Bloques Teóricos
// Referencias: Galán Jiménez et al. (2019), Buss & Perry (1992), Bandura (1973), Gerbner & Gross (1976), Siegel (2015)

export const BLOCK_CONFIG = {
  EXP: {
    id: 1,
    code: 'EXP',
    name: 'Exposición a Violencia Gráfica',
    k: 10,
    min: 10,
    max: 50,
    isCentral: false
  },
  DES: {
    id: 2,
    code: 'DES',
    name: 'Desensibilización y Habituación (Variable Central)',
    k: 12,
    min: 12,
    max: 60,
    isCentral: true
  },
  NOR: {
    id: 3,
    code: 'NOR',
    name: 'Normalización de la Violencia Gráfica',
    k: 6,
    min: 6,
    max: 30,
    isCentral: false
  },
  AGR: {
    id: 4,
    code: 'AGR',
    name: 'Agresividad',
    k: 8,
    min: 8,
    max: 40,
    isCentral: false
  },
  REL: {
    id: 5,
    code: 'REL',
    name: 'Relaciones Interpersonales',
    k: 6,
    min: 6,
    max: 30,
    isCentral: false
  }
};

export const SUBDIMENSION_CONFIG = {
  EXP_INC: { name: 'Exposición Gráfica Incidental', block: 'EXP', k: 5 },
  EXP_ACT: { name: 'Búsqueda Gráfica Intencional', block: 'EXP', k: 5 },
  DES_HAB: { name: 'Habituación y Tolerancia Somática', block: 'DES', k: 8 },
  DES_DIV: { name: 'Diversión al Atestiguar Violencia', block: 'DES', k: 4 },
  NOR_GRAF: { name: 'Normalización y Justificación Cognitiva', block: 'NOR', k: 6 },
  AGR_FIS: { name: 'Agresión Física', block: 'AGR', k: 2 },
  AGR_VER: { name: 'Agresión Verbal', block: 'AGR', k: 2 },
  AGR_IRA: { name: 'Ira', block: 'AGR', k: 2 },
  AGR_HOS: { name: 'Hostilidad', block: 'AGR', k: 2 },
  REL_EMP: { name: 'Empatía y Conducta Prosocial', block: 'REL', k: 4 },
  REL_DIF: { name: 'Dificultades Interpersonales', block: 'REL', k: 2 }
};

export function getScoreLabel(score) {
  switch (score) {
    case 1: return 'Nunca';
    case 2: return 'Raras veces';
    case 3: return 'A veces';
    case 4: return 'Frecuentemente';
    case 5: return 'Siempre';
    default: return String(score);
  }
}

// Evalúa un formulario completo de 42 reactivos
export function evaluateSubmission(participantData, answers) {
  if (!Array.isArray(answers) || answers.length !== 42) {
    throw new Error('El instrumento requiere exactamente 42 respuestas válidas.');
  }

  const alias = (participantData.alias && participantData.alias.trim()) || 'Estudiante Anónimo';
  const age = parseInt(participantData.age, 10) || 15;
  const gender = participantData.gender || 'No especificado';
  const schoolGrade = participantData.school_grade || 'Secundaria';
  const screenHours = participantData.screen_hours || '2 a 4 horas';

  // Acumuladores por bloque y por subdimensión
  const blockSums = { EXP: 0, DES: 0, NOR: 0, AGR: 0, REL: 0 };
  const subSums = {};
  Object.keys(SUBDIMENSION_CONFIG).forEach(k => { subSums[k] = 0; });

  const processedAnswers = [];

  for (let i = 0; i < answers.length; i++) {
    const raw = answers[i];
    const score = Math.max(1, Math.min(5, parseInt(raw.score, 10) || 1));
    const qId = raw.question_id || (i + 1);

    // Mapeo por ID de pregunta a Bloque y Subdimensión
    let blockCode = 'EXP';
    let subCode = 'EXP_INC';

    if (qId <= 5) { blockCode = 'EXP'; subCode = 'EXP_INC'; }
    else if (qId <= 10) { blockCode = 'EXP'; subCode = 'EXP_ACT'; }
    else if ((qId >= 11 && qId <= 16) || qId === 21 || qId === 22) { blockCode = 'DES'; subCode = 'DES_HAB'; }
    else if (qId >= 17 && qId <= 20) { blockCode = 'DES'; subCode = 'DES_DIV'; }
    else if (qId >= 23 && qId <= 28) { blockCode = 'NOR'; subCode = 'NOR_GRAF'; }
    else if (qId === 29 || qId === 30) { blockCode = 'AGR'; subCode = 'AGR_FIS'; }
    else if (qId === 31 || qId === 32) { blockCode = 'AGR'; subCode = 'AGR_VER'; }
    else if (qId === 33 || qId === 34) { blockCode = 'AGR'; subCode = 'AGR_IRA'; }
    else if (qId === 35 || qId === 36) { blockCode = 'AGR'; subCode = 'AGR_HOS'; }
    else if (qId >= 37 && qId <= 40) { blockCode = 'REL'; subCode = 'REL_EMP'; }
    else if (qId >= 41 && qId <= 42) { blockCode = 'REL'; subCode = 'REL_DIF'; }

    blockSums[blockCode] += score;
    subSums[subCode] += score;

    processedAnswers.push({
      question_id: qId,
      block: blockCode,
      dimension: subCode,
      question_text: raw.question_text || '',
      score: score,
      score_label: getScoreLabel(score)
    });
  }

  // 1. Cálculo de Puntuaciones por Bloque (Índices 0 - 100)
  // Fórmula: [(suma - k) / (4 * k)] * 100
  const blockResults = {};
  for (const [code, cfg] of Object.entries(BLOCK_CONFIG)) {
    const sum = blockSums[code];
    const mean = Math.round((sum / cfg.k) * 100) / 100;
    const index = Math.round(((sum - cfg.k) / (4 * cfg.k)) * 1000) / 10;

    blockResults[code] = {
      code,
      name: cfg.name,
      k: cfg.k,
      sum,
      mean,
      index,
      isCentral: cfg.isCentral
    };
  }

  // Variable Central Principal: Desensibilización y Habituación (Bloque 2)
  const centralScore = {
    title: 'Índice Global de Desensibilización y Habituación a la Violencia Gráfica',
    index: blockResults.DES.index,
    sum: blockResults.DES.sum,
    mean: blockResults.DES.mean,
    k: blockResults.DES.k,
    scale: '0.0% a 100.0%'
  };

  // 2. Cálculo de Subdimensiones Específicas
  const subdimensionResults = {};
  for (const [code, cfg] of Object.entries(SUBDIMENSION_CONFIG)) {
    const sum = subSums[code];
    const mean = Math.round((sum / cfg.k) * 100) / 100;
    const index = Math.round(((sum - cfg.k) / (4 * cfg.k)) * 1000) / 10;

    subdimensionResults[code] = {
      code,
      name: cfg.name,
      block: cfg.block,
      k: cfg.k,
      sum,
      mean,
      index
    };
  }

  // 3. Comparativa de Exposición Gráfica (Incidental vs. Búsqueda Intencional)
  const incIndex = subdimensionResults.EXP_INC.index;
  const actIndex = subdimensionResults.EXP_ACT.index;
  const expDiff = Math.round((actIndex - incIndex) * 10) / 10;
  let expComparison = '';

  if (expDiff < -15) {
    expComparison = 'Predominio marcado de exposición incidental involuntaria: el estudiante encuentra contenido violento gráfico impulsado por recomendaciones automáticas sin buscarlo intencionalmente.';
  } else if (expDiff > 15) {
    expComparison = 'Predominio de búsqueda intencional premeditada: el estudiante muestra iniciativa propia por localizar, solicitar o consultar grabaciones de violencia gráfica extrema o gore.';
  } else {
    expComparison = 'Patrón equilibrado: concurrencia moderada entre exposición casual por algoritmos y consulta voluntaria ocasional de contenido gráfico.';
  }

  // 4. Perfil Interpretativo Exploratorio
  const profile = determineExploratoryProfile(blockResults, subdimensionResults, expDiff);

  // 5. Análisis Descriptivo de la Relación entre Variables
  const descriptiveAssociation = buildDescriptiveAssociationText(blockResults, subdimensionResults);

  return {
    participant: {
      alias,
      age,
      gender,
      school_grade: schoolGrade,
      screen_hours: screenHours,
      evaluated_at: new Date().toISOString()
    },
    central_score: centralScore,
    blocks: blockResults,
    subdimensions: subdimensionResults,
    exposure_comparison: {
      difference: expDiff,
      interpretation: expComparison
    },
    profile,
    descriptive_association: descriptiveAssociation,
    answers: processedAnswers
  };
}

// Determina el perfil exploratorio según combinaciones de puntuaciones
function determineExploratoryProfile(blocks, subs, expDiff) {
  const desIndex = blocks.DES.index;
  const norIndex = blocks.NOR.index;
  const agrIndex = blocks.AGR.index;
  const empIndex = subs.REL_EMP.index;
  const difIndex = subs.REL_DIF.index;

  const patterns = [];

  if (expDiff < -15) {
    patterns.push('Exposición principalmente incidental no buscada');
  } else if (expDiff > 15) {
    patterns.push('Búsqueda activa intencional de material gráfico cruento');
  }

  if (desIndex >= 60) {
    patterns.push('Indicadores elevados de desensibilización y tolerancia somática');
  } else if (desIndex <= 25) {
    patterns.push('Reactividad emocional preservada frente a imágenes violentas');
  }

  if (norIndex >= 50) {
    patterns.push('Indicadores de normalización y justificación mediante humor/memes');
  }

  if (agrIndex >= 50) {
    patterns.push('Indicadores de agresividad autoinformada');
  }

  if (difIndex >= 50 && empIndex <= 40) {
    patterns.push('Dificultades interpersonales y menor empatía declarada');
  }

  let finalName = '';
  let finalDescription = '';

  if (desIndex >= 60 && norIndex >= 50) {
    finalName = 'Perfil de Habituación y Normalización de Violencia Gráfica';
    finalDescription = 'El participante reporta escasa perturbación física o emocional ante escenas cruentas (sangre, heridas o muerte), acompañado del uso de humor negro, memes o justificación cognitiva del daño.';
  } else if (desIndex >= 50 && blocks.EXP.index >= 50) {
    finalName = 'Perfil de Desensibilización por Exposición Acumulada';
    finalDescription = 'Se identifica una concurrencia entre alta frecuencia de contacto con violencia gráfica y una notable atenuación de respuestas de asco o sobresalto corporal.';
  } else if (desIndex <= 30 && blocks.EXP.index >= 50) {
    finalName = 'Perfil de Exposición Frecuente con Sensibilidad Conservada';
    finalDescription = 'A pesar de recibir continuamente metrajes violentos en redes sociales, el estudiante mantiene respuestas espontáneas de rechazo somático, aversión o molestia afectiva.';
  } else if (patterns.length >= 3) {
    finalName = 'Perfil Mixto Heterogéneo';
    finalDescription = `Combinación diversa de respuestas en las áreas evaluadas: ${patterns.join(', ')}.`;
  } else if (patterns.length === 0 || (desIndex < 45 && norIndex < 45)) {
    finalName = 'Perfil sin Patrón Predominante';
    finalDescription = 'Respuestas en rangos moderados o bajos que reflejan reactividad afectiva típica sin señales marcadas de habituación ni normalización.';
  } else {
    finalName = patterns[0] || 'Perfil Exploratorio General';
    finalDescription = 'El patrón de respuestas se caracteriza prioritariamente por ' + finalName.toLowerCase() + '.';
  }

  return {
    name: finalName,
    description: finalDescription,
    identified_patterns: patterns
  };
}

// Redacción tentativa de la relación descriptiva entre variables
function buildDescriptiveAssociationText(blocks, subs) {
  const expVal = blocks.EXP.index;
  const desVal = blocks.DES.index;
  const norVal = blocks.NOR.index;
  const agrVal = blocks.AGR.index;
  const empVal = subs.REL_EMP.index;
  const difVal = subs.REL_DIF.index;

  const paragraphs = [];

  // 1. Exposición Gráfica vs. Desensibilización (Variable Central)
  if (expVal >= 50 && desVal >= 50) {
    paragraphs.push('Los resultados son compatibles con una asociación entre la frecuencia de exposición a violencia gráfica explícita y puntuaciones elevadas en desensibilización somática (menor asco, ausencia de náusea y tolerancia al ver sangre). Esto coincide descriptivamente con los postulados de la teoría del cultivo mediático y de habituación conductual, sin que ello pruebe una causalidad unidireccional.');
  } else if (expVal >= 50 && desVal < 35) {
    paragraphs.push('Se observa que una alta exposición algorítmica no se acompaña necesariamente de desensibilización en este participante, conservando respuestas afectivas y corporales de rechazo hacia la imaginería sangrienta.');
  } else {
    paragraphs.push('El estudiante reporta niveles contenidos de exposición a violencia gráfica, acompañados de reactividad afectiva y somática conservada.');
  }

  // 2. Normalización vs. Desensibilización
  if (norVal >= 50 && desVal >= 50) {
    paragraphs.push('La tolerancia fisiológica a la sangre y heridas coincide con actitudes de normalización cognitiva, tales como el disfrute de memes de accidentes fatales, la creencia de que presenciar gore "endurece el carácter" y la culpabilización de las víctimas (mecanismos de desconexión moral de Bandura).');
  }

  // 3. Asociación con Agresividad y Relaciones Interpersonales
  if (agrVal >= 50 && desVal >= 50) {
    paragraphs.push('En las variables secundarias, se observa una posible concurrencia entre mayor tolerancia a la violencia gráfica y mayor frecuencia autoinformada de agresividad verbal, física o impulsividad colérica (BPAQ adaptado).');
  } else {
    paragraphs.push('No se evidencia una vinculación directa entre la reacción ante videos sangrientos y las conductas agresivas declaradas en el entorno cotidiano.');
  }

  if (difVal >= 50 || empVal < 40) {
    paragraphs.push('En el plano interpersonal, los datos sugieren posibles fricciones en la convivencia escolar y una menor disposición declarada a brindar apoyo empático a compañeros en situación de dolor.');
  } else {
    paragraphs.push('En las relaciones interpersonales se mantienen niveles favorables de empatía prosocial y rechazo al maltrato escolar.');
  }

  return paragraphs.join('\n\n');
}

// Estadísticas grupales para el Panel de Investigación
export function computeGroupStatistics(evaluationsList) {
  const n = evaluationsList.length;
  if (n === 0) {
    return { n: 0, blocks: {}, subdimensions: {}, correlations: {}, demographics: {} };
  }

  // 1. Estadísticos descriptivos por los 5 Bloques
  const blockStats = {};
  for (const [code, cfg] of Object.entries(BLOCK_CONFIG)) {
    const values = evaluationsList.map(e => (e.blocks && e.blocks[code] ? e.blocks[code].index : 0)).sort((a, b) => a - b);
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = Math.round((sum / n) * 100) / 100;
    const median = Math.round(calculateMedian(values) * 100) / 100;
    const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n > 1 ? n - 1 : 1);
    const sd = Math.round(Math.sqrt(variance) * 100) / 100;

    blockStats[code] = {
      code,
      name: cfg.name,
      k: cfg.k,
      isCentral: cfg.isCentral,
      n,
      mean,
      median,
      sd,
      min: values[0] ?? 0,
      max: values[values.length - 1] ?? 0
    };
  }

  // 2. Estadísticos por Subdimensiones
  const subStats = {};
  for (const [code, cfg] of Object.entries(SUBDIMENSION_CONFIG)) {
    const values = evaluationsList.map(e => (e.subdimensions && e.subdimensions[code] ? e.subdimensions[code].index : 0)).sort((a, b) => a - b);
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = Math.round((sum / n) * 100) / 100;
    const median = Math.round(calculateMedian(values) * 100) / 100;
    const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (n > 1 ? n - 1 : 1);
    const sd = Math.round(Math.sqrt(variance) * 100) / 100;

    subStats[code] = {
      code,
      name: cfg.name,
      block: cfg.block,
      k: cfg.k,
      n,
      mean,
      median,
      sd,
      min: values[0] ?? 0,
      max: values[values.length - 1] ?? 0
    };
  }

  // 3. Matriz de Correlación de Spearman entre los 5 Bloques
  const blockKeys = Object.keys(BLOCK_CONFIG);
  const correlations = computeSpearmanMatrix(evaluationsList, blockKeys, 'blocks');

  // 4. Desglose sociodemográfico
  const demographics = {
    total: n,
    gender: {},
    school_grade: {},
    screen_hours: {}
  };

  for (const e of evaluationsList) {
    const p = e.participant || {};
    const g = p.gender || 'No especificado';
    const sg = p.school_grade || 'No especificado';
    const sh = p.screen_hours || 'No especificado';

    demographics.gender[g] = (demographics.gender[g] || 0) + 1;
    demographics.school_grade[sg] = (demographics.school_grade[sg] || 0) + 1;
    demographics.screen_hours[sh] = (demographics.screen_hours[sh] || 0) + 1;
  }

  return {
    n,
    blocks: blockStats,
    subdimensions: subStats,
    correlations,
    demographics
  };
}

function calculateMedian(sortedArray) {
  const len = sortedArray.length;
  if (len === 0) return 0;
  const mid = Math.floor(len / 2);
  return len % 2 !== 0 ? sortedArray[mid] : (sortedArray[mid - 1] + sortedArray[mid]) / 2;
}

function computeSpearmanMatrix(evaluationsList, keys, targetObj = 'blocks') {
  const n = evaluationsList.length;
  if (n < 3) return {};

  const ranked = {};
  for (const k of keys) {
    const rawVals = evaluationsList.map(e => (e[targetObj] && e[targetObj][k] ? e[targetObj][k].index : 0));
    ranked[k] = assignRanks(rawVals);
  }

  const matrix = {};
  for (let i = 0; i < keys.length; i++) {
    const k1 = keys[i];
    matrix[k1] = {};
    for (let j = 0; j < keys.length; j++) {
      const k2 = keys[j];
      matrix[k1][k2] = i === j ? 1.0 : Math.round(pearsonCorrelation(ranked[k1], ranked[k2]) * 1000) / 1000;
    }
  }
  return matrix;
}

function assignRanks(arr) {
  const indexed = arr.map((val, idx) => ({ val, idx })).sort((a, b) => a.val - b.val);
  const ranks = new Array(arr.length);
  let i = 0;
  while (i < indexed.length) {
    let j = i;
    while (j < indexed.length - 1 && indexed[j].val === indexed[j + 1].val) j++;
    const avgRank = (i + 1 + j + 1) / 2;
    for (let k = i; k <= j; k++) ranks[indexed[k].idx] = avgRank;
    i = j + 1;
  }
  return ranks;
}

function pearsonCorrelation(x, y) {
  const n = x.length;
  if (n === 0) return 0;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let num = 0, denX = 0, denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  const den = Math.sqrt(denX * denY);
  return den === 0 ? 0 : num / den;
}
