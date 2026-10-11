// Generador Algorítmico de Conclusiones Individuales
// Construye una síntesis diagnóstica y metodológica personalizada basada en la combinación
// cuantitativa continua de los 5 bloques evaluados (sin textos fijos ni genéricos).

export function generateStudentConclusion({
  participant = {},
  desScore = 0,
  expScore = 0,
  norScore = 0,
  agrScore = 0,
  relScore = 0,
  exposureComp = null,
  answers = []
}) {
  const des = Number.isFinite(desScore) ? Math.min(100, Math.max(0, desScore)) : 0;
  const exp = Number.isFinite(expScore) ? Math.min(100, Math.max(0, expScore)) : 0;
  const nor = Number.isFinite(norScore) ? Math.min(100, Math.max(0, norScore)) : 0;
  const agr = Number.isFinite(agrScore) ? Math.min(100, Math.max(0, agrScore)) : 0;
  const rel = Number.isFinite(relScore) ? Math.min(100, Math.max(0, relScore)) : 0;

  // Clasificación por rangos normativos
  // Bajo: < 34% | Moderado: 34% - 66% | Alto: >= 67%
  const getLevel = (val) => {
    if (val >= 67) return 'alto';
    if (val >= 34) return 'moderado';
    return 'bajo';
  };

  const desLevel = getLevel(des);
  const expLevel = getLevel(exp);
  const norLevel = getLevel(nor);
  const agrLevel = getLevel(agr);
  const relLevel = getLevel(rel);

  // 1. DETERMINACIÓN DEL PERFIL COMBINATORIO PRINCIPAL
  let profileTitle = '';
  let profileCategory = '';
  let profileBadgeColor = '#7C3AED';
  let profileBadgeBg = '#F3E8FF';
  let summary = '';

  if (expLevel === 'alto' && desLevel === 'alto' && norLevel === 'alto') {
    profileTitle = 'Habituación Marcada y Normalización Digital';
    profileCategory = 'Alta Tolerancia con Banalización Mediática';
    profileBadgeColor = '#B91C1C';
    profileBadgeBg = '#FEE2E2';
    summary = `Presenta una alta frecuencia de contacto con violencia visual (${exp.toFixed(1)}%) acompañada de una reducción notable en reacciones somáticas de asco o sobresalto (${des.toFixed(1)}%) y asimilación de memes o humor negro sobre tragedias (${nor.toFixed(1)}%).`;
  } else if (expLevel === 'alto' && desLevel === 'bajo') {
    profileTitle = 'Exposición Frecuente con Sensibilidad Preservada';
    profileCategory = 'Resiliencia Afectiva ante Saturación de Algoritmo';
    profileBadgeColor = '#15803D';
    profileBadgeBg = '#DCFCE7';
    summary = `A pesar de una exposición considerable a videos cruentos en redes (${exp.toFixed(1)}%), mantiene activas las respuestas naturales de aversión física y rechazo emocional (${des.toFixed(1)}%), evidenciando resistencia biológica a la desensibilización.`;
  } else if (expLevel === 'bajo' && desLevel === 'bajo') {
    profileTitle = 'Consumo Protegido y Reactividad Típica';
    profileCategory = 'Sensibilidad Natural con Baja Exposición';
    profileBadgeColor = '#15803D';
    profileBadgeBg = '#DCFCE7';
    summary = `Reporta baja frecuencia de contacto con material explícito (${exp.toFixed(1)}%) y conserva una reacción corporal inmediata de molestia o rechazo (${des.toFixed(1)}%), propio de un ecosistema digital cuidado o con filtros activos.`;
  } else if (desLevel === 'alto' && expLevel !== 'alto') {
    profileTitle = 'Tolerancia Somática con Exposición Moderada';
    profileCategory = 'Atenuación Reactiva Temprana';
    profileBadgeColor = '#B45309';
    profileBadgeBg = '#FEF3C7';
    summary = `Con una exposición moderada en redes (${exp.toFixed(1)}%), muestra puntuaciones altas en desensibilización (${des.toFixed(1)}%), lo que sugiere que pocas experiencias visuales han bastado para habituar su respuesta fisiológica.`;
  } else if (desLevel === 'moderado') {
    profileTitle = 'Sensibilidad en Transición o Habituación Parcial';
    profileCategory = 'Tolerancia Incipiente en Desarrollo';
    profileBadgeColor = '#B45309';
    profileBadgeBg = '#FEF3C7';
    summary = `Registra niveles intermedios de tolerancia somática (${des.toFixed(1)}%) y una exposición del ${exp.toFixed(1)}%. Muestra indicios de adaptación visual ante accidentes cotidianos, pero aún experimenta incomodidad ante violencia explícita extrema.`;
  } else {
    profileTitle = 'Perfil Adaptativo Equilibrado';
    profileCategory = 'Reactividad Afectiva Normal';
    profileBadgeColor = '#7C3AED';
    profileBadgeBg = '#F3E8FF';
    summary = `Valores moderados o bajos en desensibilización (${des.toFixed(1)}%) y exposición (${exp.toFixed(1)}%), reflejando una convivencia digital habitual sin signos de anestesia afectiva ni hostilidad manifiesta.`;
  }

  // 2. CONSTRUCCIÓN MODULAR DE HALLAZGOS CRUZADOS
  const findings = [];

  // Cruce A: Exposición vs. Desensibilización Física
  if (exp >= 50 && des >= 50) {
    findings.push({
      topic: 'Exposición y Reacción Física (Variable Central)',
      status: 'Concurrencia Positiva',
      color: '#7C3AED',
      text: `Tus puntuaciones en Exposición (${exp.toFixed(1)}%) y Desensibilización (${des.toFixed(1)}%) se encuentran en el cuadrante superior. Esto indica que ver con frecuencia accidentes y heridas en redes se asocia con que tu cuerpo deje de manifestar náuseas, taquicardia o necesidad de apartar la mirada.`
    });
  } else if (exp >= 50 && des < 35) {
    findings.push({
      topic: 'Exposición y Reacción Física (Variable Central)',
      status: 'Resistencia Somática',
      color: '#15803D',
      text: `Aunque recibes videos gráficos con frecuencia (${exp.toFixed(1)}%), tu reactividad física se mantiene baja en habituación (${des.toFixed(1)}%), lo que demuestra que ver videos no te ha insensibilizado físicamente: tu organismo aún siente el impacto natural del dolor humano.`
    });
  } else {
    findings.push({
      topic: 'Exposición y Reacción Física (Variable Central)',
      status: 'Nivel Contenido',
      color: '#4B5563',
      text: `La presencia de material violento en tus pantallas (${exp.toFixed(1)}%) es moderada o baja, al igual que tu habituación somática (${des.toFixed(1)}%). No se observan señales de saturación sensorial.`
    });
  }

  // Cruce B: Normalización mediante Humor y Memes
  if (nor >= 60) {
    findings.push({
      topic: 'Normalización y Humor Negro',
      status: 'Banalización Activa',
      color: '#B91C1C',
      text: `Puntuación elevada en normalización (${nor.toFixed(1)}%). Existe una inclinación a justificar la violencia o transformarla en entretenimiento a través de stickers, memes o bromas, lo que según la teoría de Bandura actúa como un escudo que reduce la censura moral cotidiana.`
    });
  } else if (nor >= 35) {
    findings.push({
      topic: 'Normalización y Humor Negro',
      status: 'Tolerancia Ocasional',
      color: '#B45309',
      text: `Puntuación intermedia en normalización (${nor.toFixed(1)}%). Aunque reconoces la gravedad de tragedias reales, en ocasiones compartes o toleras chistes y memes relacionados con accidentes sin juzgarlos como dañinos.`
    });
  } else {
    findings.push({
      topic: 'Normalización y Humor Negro',
      status: 'Criterio Preservado',
      color: '#15803D',
      text: `Puntuación baja en normalización (${nor.toFixed(1)}%). Desapruebas el uso de tragedias ajenas como motivo de burla o diversión en redes sociales, manteniendo un respeto claro ante el sufrimiento real.`
    });
  }

  // Cruce C: Impacto en Convivencia Escolar y Empatía
  if (rel <= 35 || agr >= 60) {
    findings.push({
      topic: 'Convivencia Escolar y Reacción Cotidiana',
      status: 'Atención en Empatía',
      color: '#B91C1C',
      text: `Se observa un contraste entre la tolerancia visual y las relaciones interpersonales (Empatía: ${rel.toFixed(1)}%, Agresividad: ${agr.toFixed(1)}%). Sugiere que tolerar crudeza visual podría asociarse con menor paciencia ante desacuerdos o mayor dificultad para conectar con el dolor ajeno.`
    });
  } else {
    findings.push({
      topic: 'Convivencia Escolar y Reacción Cotidiana',
      status: 'Empatía Favorable',
      color: '#15803D',
      text: `Tus relaciones interpersonales y empatía se mantienen en un rango favorable (${rel.toFixed(1)}%) con baja reactividad agresiva (${agr.toFixed(1)}%). Tu contacto con redes no parece haber afectado negativamente tu trato hacia compañeros ni tu disposición a ayudar.`
    });
  }

  // 3. RECOMENDACIÓN PARA EL ESTUDIANTE (BIENESTAR DIGITAL)
  let studentGuidance = '';
  if (des >= 60 || exp >= 65) {
    studentGuidance = 'Te recomendamos depurar tus líneas de tiempo en TikTok, X o Instagram: cuando aparezca un video de accidentes, utiliza la opción "No me interesa" en lugar de quedarte a verlo hasta el final. Darle pausas a tu cerebro evitará que la violencia visual se convierta en tu estándar de normalidad.';
  } else if (nor >= 50) {
    studentGuidance = 'Un buen ejercicio reflexivo es preguntarte antes de compartir un meme o sticker de un accidente: "¿cómo se sentiría la familia de esa persona si viera esto?". Separar la comedia sana de la burla al sufrimiento humano fortalece tu madurez emocional.';
  } else {
    studentGuidance = 'Continúa manteniendo un consumo consciente de redes sociales. Tu sensibilidad corporal ante el dolor ajeno es una cualidad prosocial valiosa que te ayuda a convivir con empatía y respeto en tu entorno escolar.';
  }

  // 4. LECTURA METODOLÓGICA PARA EL EQUIPO DE INVESTIGACIÓN
  let researcherTakeaway = '';
  if (exp >= 50 && des >= 50) {
    researcherTakeaway = `Este registro respalda empíricamente la hipótesis de trabajo: el estudiante combina alta exposición (B1 = ${exp.toFixed(1)}%) con alta desensibilización (B2 = ${des.toFixed(1)}%), aportando evidencia a la correlación positiva postulada en el marco teórico de la EDV.`;
  } else if (exp >= 50 && des < 40) {
    researcherTakeaway = `Caso relevante de resiliencia mediática: muestra que la alta exposición algorítmica (B1 = ${exp.toFixed(1)}%) no siempre genera anestesia afectiva automática (B2 = ${des.toFixed(1)}%), señalando el papel de factores protectores como la empatía activa (B5 = ${rel.toFixed(1)}%).`;
  } else {
    researcherTakeaway = `Registro de línea base normativa: puntuaciones dentro de parámetros convencionales que enriquecen la dispersión muestral para el cálculo de correlación de Spearman del grupo.`;
  }

  return {
    profileTitle,
    profileCategory,
    profileBadgeColor,
    profileBadgeBg,
    summary,
    scores: { des, exp, nor, agr, rel },
    findings,
    studentGuidance,
    researcherTakeaway
  };
}
