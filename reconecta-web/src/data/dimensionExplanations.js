// Fundamentación metodológica, conceptual y psicométrica de las dimensiones
// Utilidad dual: Orientación reflexiva para el alumno y rigor metodológico para el equipo de investigación

export const DIMENSION_DETAILS = {
  DES: {
    code: 'B2',
    name: 'Desensibilización y Habituación a Violencia Gráfica',
    isCentral: true,
    tag: 'Variable Central Principal',
    color: '#7C3AED',
    bgLight: '#FAF5FF',
    borderLight: '#C4B5FD',
    itemsCount: 12,
    whatIs: 'Mide la pérdida progresiva de reacciones corporales viscerales de aversión (náuseas, taquicardia, mareo, sobresalto o necesidad de apartar la vista) y el surgimiento de frialdad emocional, indiferencia o búsqueda de entretenimiento morboso al observar imágenes y videos con sangre real, lesiones corporales graves, mutilaciones o muerte violenta.',
    foundation: 'Basado en la Escala de Desensibilización a la Violencia para Adolescentes (EDV) de Galán Jiménez, Sánchez-Armáss y García y Barragán (2019, Nova Scientia), instrumento psicométrico validado en México que demostró la atenuación de la reactividad somática autonómica tras el consumo repetido de violencia visual.',
    studentUtility: 'Te ayuda a reconocer si tu cuerpo y emociones se han "acostumbrado" o adormecido ante imágenes crudas de dolor humano. Conocer este porcentaje te permite tomar el control de lo que consumes en redes, evitar canales morbosos que dañen tu salud mental y recuperar la sensibilidad natural de cuidado personal.',
    researcherUtility: 'Es la Variable Dependiente Central del proyecto de investigación. Proporciona el índice métrico (0.0% a 100.0%) con el cual el equipo contrasta la hipótesis principal: comprobar numéricamente si a mayor frecuencia de exposición en redes sociales, mayor es la habituación psicofisiológica observada en estudiantes de La Salle Pachuca.'
  },
  EXP: {
    code: 'B1',
    name: 'Exposición a Violencia Gráfica en Redes Sociales',
    isCentral: false,
    tag: 'Variable Independiente',
    color: '#6366F1',
    bgLight: '#EEF2FF',
    borderLight: '#C7D2FE',
    itemsCount: 10,
    whatIs: 'Evalúa la frecuencia y la modalidad con la que el estudiante entra en contacto con publicaciones y grabaciones visuales explícitas de daño corporal o fallecimientos violentos, diferenciando claramente entre exposición incidental (sugerencias del feed o algoritmo) y búsqueda activa deliberada (canales de Telegram, foros o morbo voluntario).',
    foundation: 'Sustentado en la Teoría del Cultivo Mediático de George Gerbner (1976) y en modelos contemporáneos de ecología digital adolescente, que explican cómo la hiperconectividad en plataformas móviles (WhatsApp, X/Twitter, TikTok, Instagram) incrementa la tasa de impacto visual involuntario y voluntario.',
    studentUtility: 'Te permite tomar conciencia de cuánto contenido gráfico violento aparece en tus pantallas a la semana sin que lo hayas pedido y cuántas veces lo has buscado por curiosidad. Te sirve para configurar tus filtros de contenido y proteger tu tranquilidad digital.',
    researcherUtility: 'Es la Variable Independiente. Permite cuantificar el nivel de contacto mediático del alumno, calcular la brecha entre consumo incidental vs intencional y actuar como predictor estadístico fundamental en las pruebas de correlación lineal y no paramétrica (Spearman ρ).'
  },
  NOR: {
    code: 'B3',
    name: 'Normalización y Banalización (Memes y Humor Negro)',
    isCentral: false,
    tag: 'Variable Mediadora',
    color: '#8B5CF6',
    bgLight: '#F5F3FF',
    borderLight: '#DDD6FE',
    itemsCount: 6,
    whatIs: 'Examina la justificación cognitiva de la violencia letal como un fenómeno "normal o inevitable" en la sociedad mexicana, así como el uso de stickers de mensajería, memes, parodias o humor negro que transforman tragedias humanas reales en objetos cómicos o de entretenimiento social entre pares.',
    foundation: 'Fundamentado en la Teoría del Aprendizaje Social y los mecanismos de desinhibición moral de Albert Bandura (1973), junto con el marco de priming afectivo de Leonard Berkowitz (1984), que explican cómo el humor disfraza la crueldad y reduce las barreras de censura moral en grupos sociales.',
    studentUtility: 'Te invita a reflexionar sobre las bromas, stickers o memes que compartes en tus grupos de chat: te muestra si el humor está normalizando el sufrimiento ajeno y convirtiendo el dolor de personas reales en una simple burla pasajera.',
    researcherUtility: 'Funciona como variable cognitiva mediadora. Permite comprobar si la anestesia emocional observada en el Bloque 2 se acompaña de esquemas de pensamiento que justifican o minimizan la violencia en la vida cotidiana de la comunidad escolar.'
  },
  AGR: {
    code: 'B4',
    name: 'Reactividad Agresiva Autoinformada',
    isCentral: false,
    tag: 'Variable Secundaria de Impacto',
    color: '#EC4899',
    bgLight: '#FDF2F8',
    borderLight: '#FBCFE8',
    itemsCount: 8,
    whatIs: 'Cuantifica la propensión declarada a reaccionar mediante confrontaciones físicas, agresiones verbales (gritos, insultos), episodios impulsivos de ira o actitudes de desconfianza y hostilidad interpersonal frente a conflictos o provocaciones cotidianas.',
    foundation: 'Adaptado del Aggression Questionnaire (BPAQ) de Buss y Perry (1992), instrumento psicométrico de referencia internacional que divide la agresividad en componentes motores (física y verbal), emocionales (ira) y cognitivos (hostilidad y suspicacia).',
    studentUtility: 'Te sirve para evaluar si la sobreexposición a violencia en internet está afectando tu temperamento, volviéndote más impaciente, irritable o impulsivo al momento de resolver desacuerdos con amigos o familiares.',
    researcherUtility: 'Variable Secundaria de Impacto. Permite correlacionar la desensibilización con conductas hostiles manifiestas en el ámbito académico, demostrando si tolerar más violencia visual incrementa la reactividad agresiva en el bachillerato.'
  },
  REL: {
    code: 'B5',
    name: 'Relaciones Interpersonales y Empatía Prosocial',
    isCentral: false,
    tag: 'Variable Secundaria de Convivencia',
    color: '#10B981',
    bgLight: '#ECFDF5',
    borderLight: '#A7F3D0',
    itemsCount: 6,
    whatIs: 'Evalúa la resonancia afectiva ante el sufrimiento de los pares, la capacidad de conmoverse cuando un compañero de escuela atraviesa una situación difícil y la disposición a ofrecer auxilio activo vs el distanciamiento o la burla pasiva.',
    foundation: 'Basado en los modelos de empatía prosocial y neurodesarrollo del córtex prefrontal adolescente (Daniel Siegel, 2015; Bandura, 1973), orientados a la dinámica socioemocional y al clima de convivencia escolar en instituciones educativas.',
    studentUtility: 'Te permite medir tu nivel de empatía real: te demuestra si conservas la capacidad de conectar de corazón con tus compañeros de clase o si te has vuelto frío e indiferente ante lo que les ocurre a las personas a tu alrededor.',
    researcherUtility: 'Responde directamente la segunda parte de la pregunta de investigación («¿y cómo afecta sus relaciones interpersonales?»), aportando el sustento empírico para demostrar si la desensibilización digital erosiona los lazos empáticos y deteriora la convivencia escolar.'
  }
};
