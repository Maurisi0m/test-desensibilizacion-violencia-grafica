// Psychometrics evaluation module for ReConecta Web

export function getScoreLabel(score) {
  switch (score) {
    case 1: return '1 - Totalmente en desacuerdo / Nunca';
    case 2: return '2 - Rara vez';
    case 3: return '3 - Ocasionalmente / A veces';
    case 4: return '4 - Con frecuencia';
    case 5: return '5 - Totalmente de acuerdo / Siempre';
    default: return `${score}`;
  }
}

export function evaluateSubmission(alias, age, answers) {
  if (!Array.isArray(answers) || answers.length !== 20) {
    throw new Error('La evaluación debe contener exactamente 20 respuestas.');
  }

  const cleanAlias = (alias && alias.trim()) || 'Participante';
  const numericAge = parseInt(age, 10) || 16;
  const cohort = numericAge <= 17 ? 'Adolescente' : 'JovenAdulto';

  let totalRaw = 0;
  let sums = { 'EA-I': 0, 'BA-C': 0, 'RF-E': 0, 'NC-D': 0 };

  const processedAnswers = answers.map(a => {
    const score = Math.max(1, Math.min(5, parseInt(a.score, 10) || 1));
    totalRaw += score;
    if (sums[a.dimension] !== undefined) {
      sums[a.dimension] += score;
    }
    return {
      question_id: a.question_id,
      dimension: a.dimension,
      question_text: a.question_text || '',
      score: score,
      score_label: getScoreLabel(score)
    };
  });

  // Normalization 0% - 100%
  const globalIndex = Math.round(((totalRaw - 20) / 80) * 1000) / 10;
  const passiveIndex = Math.round(((sums['EA-I'] - 5) / 20) * 1000) / 10;
  const activeIndex = Math.round(((sums['BA-C'] - 5) / 20) * 1000) / 10;
  const physiologicalIndex = Math.round(((sums['RF-E'] - 5) / 20) * 1000) / 10;
  const cognitiveIndex = Math.round(((sums['NC-D'] - 5) / 20) * 1000) / 10;

  // Differential consumption analysis
  const diff = Math.round((activeIndex - passiveIndex) * 10) / 10;
  let diffAnalysis = '';
  if (Math.abs(diff) < 10) {
    diffAnalysis = 'Perfil Mixto Equilibrado: Tu desensibilización se nutre tanto de lo que los algoritmos te muestran de improviso como de tu propia iniciativa de búsqueda.';
  } else if (diff > 0) {
    diffAnalysis = 'Predominio de Búsqueda Activa e Intencional: Tu nivel de desensibilización está impulsado principalmente por curiosidad mórbida personal, acceso deliberado a canales/foros o petición de material violento.';
  } else {
    diffAnalysis = 'Predominio de Inundación Algorítmica Pasiva: Tu desensibilización es mayormente incidental, provocada por la saturación de videos violentos en feeds de redes sociales (Reels, TikTok, X) sin búsqueda voluntaria.';
  }

  // Diagnostic level
  let severityLevel = '';
  let severityTitle = '';
  let summary = '';
  let constructs = [];
  let interventions = [];

  if (globalIndex < 25) {
    severityLevel = 'Bajo';
    severityTitle = 'Sensibilidad Emocional Preservada (Reactividad Afectiva Típica)';
    summary = 'Tus respuestas reflejan una reactividad afectiva y fisiológica biológicamente típica y saludable ante estímulos aversivos. El circuito de aversión empática y la respuesta somática de alarma permanecen plenamente conservados.';
    constructs = [
      'Resonancia Afectiva Intacta (Decety & Jackson): Activación involuntaria de representaciones somatosensoriales propias ante el dolor ajeno.',
      'Bajo Distanciamiento Moral (Albert Bandura): Fuerte resistencia a autojustificar o consumir agresiones como entretenimiento.',
      'Saliencia Atencional Aversiva: El estímulo gráfico violento activa señales de alerta biológica que motivan la evitación conductual.'
    ];
    interventions = [
      'Psicoeducación en Higiene Digital Profiláctica: Fortalecimiento de sesgos protectores frente a algoritmos de recompensa rápida.',
      'Consolidación de Juicio Crítico Mediático: Reconocimiento de tácticas de monetización basadas en engagement visceral.'
    ];
  } else if (globalIndex < 50) {
    severityLevel = 'Medio-Bajo';
    severityTitle = 'Desensibilización Leve a Moderada (Habituación Periférica)';
    summary = 'Se aprecia una habituación perceptual en entornos digitales. Aunque aún conservas rechazo ante agresiones muy extremas, toleras peleas o accidentes casuales sin experimentar sobresalto fisiológico evidente.';
    constructs = [
      'Habituación por Repetición Algorítmica: Reducción paulatina de la reactividad simpática ante estímulos frecuentes sin consecuencias directas.',
      'Heurística de Disponibilidad (Kahneman & Tversky): Sobreestimación sutil de la hostilidad ambiental provocada por el consumo de feeds violentos.',
      'Racionalización Cognitiva Inicial: Aparición de esquemas de tolerancia hacia la violencia no letal grabada.'
    ];
    interventions = [
      'Entrenamiento en Autocontrol Atencional: Aplicación de la regla de los 2 segundos para omitir contenido aversivo.',
      'Regulación de Filtros Digitales: Activación del control de contenido delicado en Instagram y TikTok.'
    ];
  } else if (globalIndex < 75) {
    severityLevel = 'Alto';
    severityTitle = 'Desensibilización Significativa (Embotamiento Afectivo y Normalización)';
    summary = 'Existe un aplanamiento simpático relevante. La imaginería cruenta en pantalla ya no te genera náuseas ni taquicardia, y has comenzado a normalizar la violencia interpersonal como algo cotidiano o justificado.';
    constructs = [
      'Atenuación del Reflejo de Sobresalto y Reactividad Autonómica: Disminución severa de la respuesta neurovegetativa de alarma ante trauma visual.',
      'Mecanismos de Desconexión Moral (Bandura): Tendencia a la justificación moral, dilución de culpa y deshumanización de víctimas en metrajes.',
      'Sesgo del Mundo Justo (Melvin Lerner): Atribución defensiva de que las víctimas tuvieron la culpa para mitigar la disonancia afectiva.'
    ];
    interventions = [
      'Reestructuración Cognitiva de Creencias Intermedias (Beck): Disputa socrática de pensamientos de normalización y minimización del daño.',
      'Desensibilización Sistemática Inversa: Retiro progresivo de canales no moderados y silencio de términos gore.',
      'Reentrenamiento en Mentalización (Batson): Ejercicios de toma de perspectiva para revertir la deshumanización implícita.'
    ];
  } else {
    severityLevel = 'Severo';
    severityTitle = 'Desensibilización Severa y Embotamiento Afectivo Crónico';
    summary = 'Bloqueo funcional del circuito de alarma somatomotor y desconexión empática profunda. El sufrimiento humano extremo en pantalla se percibe despersonalizado, como estímulo lúdico, humor negro o curiosidad sin impacto moral.';
    constructs = [
      'Desconexión Moral Consolidada (Bandura): Difusión total de responsabilidad, deshumanización explícita y conversión del trauma en comedia.',
      'Erosión de la Teoría de la Mente (ToM): Deterioro severo en la inferencia del dolor subjetivo y la angustia ajena.',
      'Fatiga por Compasión y Sobrecarga Alostática: Agotamiento frontolímbico crónico que resulta en apatía perceptiva defensiva.'
    ];
    interventions = [
      'Protocolo de Desconexión Digital Supervisada: Pausa total de foros shock y comunidades no reguladas.',
      'Rehabilitación de la Resonancia Somatosensorial: Ejercicios de biofeedback interoceptivo y anclaje somático.',
      'Acompañamiento Psicológico Profesional Especializado: Intervención clínica orientada a reconstruir la empatía situacional.'
    ];
  }

  return {
    alias: cleanAlias,
    age: numericAge,
    cohort,
    evaluated_at: new Date().toISOString(),
    raw_total: totalRaw,
    global_index: globalIndex,
    passive_index: passiveIndex,
    active_index: activeIndex,
    physiological_index: physiologicalIndex,
    cognitive_index: cognitiveIndex,
    severity_level: severityLevel,
    severity_title: severityTitle,
    summary,
    diff_analysis: diffAnalysis,
    constructs,
    interventions,
    answers: processedAnswers
  };
}
