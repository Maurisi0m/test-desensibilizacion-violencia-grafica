// Banco de 42 reactivos para Investigación Escolar Cuantitativa
// Variable Central: Exposición a Contenido Gráfico Violento y Desensibilización/Habituación
// Definición Operacional de Contenido Gráfico Violento: Publicaciones o videos que muestran accidentes graves,
// heridas físicas visibles o agresiones explícitas (distinguiéndolo de discusiones o conflictos verbales).
// Escala Likert de 5 puntos (1 = Nunca a 5 = Siempre) - Últimas 4 semanas

export const LIKERT_OPTIONS = [
  { val: 1, value: 1, label: 'Nunca' },
  { val: 2, value: 2, label: 'Raras veces' },
  { val: 3, value: 3, label: 'A veces' },
  { val: 4, value: 4, label: 'Frecuentemente' },
  { val: 5, value: 5, label: 'Siempre' }
];

export const BLOCKS = [
  {
    id: 1,
    code: 'EXP',
    title: 'Bloque 1: ¿Con qué frecuencia te aparecen estos contenidos?',
    shortName: 'Frecuencia de videos',
    description: 'Preguntas sobre qué tan seguido te salen publicaciones o videos con accidentes o situaciones impactantes en redes sociales, y si alguna vez los buscas por curiosidad.',
    itemCount: 10,
    purpose: 'Conocer con qué frecuencia el estudiante ve publicaciones con accidentes, heridas o violencia en internet.',
    guidance: 'Frecuencia con la que te aparecen estos videos o fotos en tus redes.'
  },
  {
    id: 2,
    code: 'DES',
    title: 'Bloque 2: ¿Cómo reaccionas al ver este tipo de videos?',
    shortName: 'Reacción emocional y física',
    description: 'Preguntas sobre cómo reacciona tu cuerpo y tus emociones al ver videos fuertes: si te da impresión, tristeza o si sientes que ya te acostumbraste.',
    isCentral: true,
    itemCount: 12,
    purpose: 'Conocer las reacciones físicas y emocionales inmediatas ante material gráfico.',
    guidance: 'Tu sensación física o si sientes que ya no te impacta como antes.'
  },
  {
    id: 3,
    code: 'NOR',
    title: 'Bloque 3: ¿Qué tan normal te parece ver esto en internet?',
    shortName: 'Normalización y humor',
    description: 'Preguntas sobre si consideras algo común ver tragedias en redes sociales, o si es habitual compartir memes y stickers sobre estos temas.',
    itemCount: 6,
    purpose: 'Saber si este contenido se percibe como algo común o habitual.',
    guidance: 'Tu opinión sobre si ver estos contenidos en internet es algo cotidiano.'
  },
  {
    id: 4,
    code: 'AGR',
    title: 'Bloque 4: Reacciones cotidianas y manejo de desacuerdos',
    shortName: 'Reacciones y enojo',
    description: 'Preguntas sobre cómo reaccionas cuando estás molesto o tienes un desacuerdo con alguien en la vida diaria.',
    itemCount: 8,
    purpose: 'Conocer cómo se maneja el enojo y las diferencias con los demás.',
    guidance: 'Formas cotidianas de expresar desacuerdos o molestia.'
  },
  {
    id: 5,
    code: 'REL',
    title: 'Bloque 5: Convivencia y empatía con los demás',
    shortName: 'Empatía y convivencia',
    description: 'Preguntas sobre cómo te sientes cuando ves a otra persona pasándola mal o si te nace apoyarla en la escuela o con amigos.',
    itemCount: 6,
    purpose: 'Conocer la cercanía, empatía y convivencia con compañeros.',
    guidance: 'Solidaridad y apoyo hacia los demás.'
  }
];

// Exactamente 42 reactivos distribuidos en los 5 bloques
export const QUESTIONS_42 = [
  // =========================================================================
  // BLOQUE 1: EXPOSICIÓN A VIOLENCIA GRÁFICA / CONTENIDO IMPACTANTE (10 REACTIVOS)
  // =========================================================================
  // Exposición incidental (Ítems 1-5)
  {
    id: 1,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'Al navegar en mis redes sociales (TikTok, Reels, Instagram, X), me aparecen videos que muestran accidentes o personas con heridas visibles sin que yo los busque.',
    guidance: 'Considera la aparición no solicitada de accidentes o personas lesionadas en tus líneas de tiempo.'
  },
  {
    id: 2,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'En mis sugerencias automáticas de video me salen grabaciones de accidentes fuertes o choques viales donde se ven personas lastimadas o heridas.',
    guidance: 'Evalúa la frecuencia con la que los algoritmos te muestran siniestros viales de imprevisto.'
  },
  {
    id: 3,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'En chats grupales o aplicaciones de mensajería (WhatsApp, Telegram) contactos mandan fotos o videos de personas con lesiones graves o accidentes.',
    guidance: 'Mide la recepción de contenido de impacto a través de grupos o canales compartidos.'
  },
  {
    id: 4,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'Veo grabaciones de cámaras de seguridad (CCTV) con accidentes de tránsito, asaltos con violencia o agresiones físicas mientras navego.',
    guidance: 'Indica la aparición casual de metrajes de circuito cerrado con incidentes violentos en tu feed.'
  },
  {
    id: 5,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'Cuando ocurre un hecho violento o una tragedia, las redes sociales me muestran repetidamente las grabaciones reales sin censura.',
    guidance: 'Mide la saturación y repetición del evento en plataformas digitales.'
  },

  // Búsqueda intencional (Ítems 6-10)
  {
    id: 6,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'Si me entero de un video que muestra una tragedia, balacera o agresión armada, busco la grabación para verla directamente.',
    guidance: 'Evalúa tu iniciativa personal voluntaria de buscar grabaciones del suceso.'
  },
  {
    id: 7,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'He buscado intencionalmente en internet o Telegram canales o páginas dedicadas a difundir videos de accidentes graves o contenido explícito sin censura.',
    guidance: 'Mide el ingreso voluntario a páginas o canales que difunden contenido explícito.'
  },
  {
    id: 8,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'Cuando veo advertencias de "contenido delicado o sensible" que cubre imágenes de personas lastimadas o situaciones violentas, desactivo el filtro para mirar.',
    guidance: 'Refleja la decisión voluntaria de retirar los filtros de advertencia digital.'
  },
  {
    id: 9,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'Suelo pedir a amigos o contactos que me pasen enlaces de videos de accidentes fuertes o peleas callejeras que se hayan hecho virales.',
    guidance: 'Evalúa la solicitud activa de videos de impacto a tus conocidos.'
  },
  {
    id: 10,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'He buscado grabaciones de operaciones médicas complejas, accidentes impactantes o incidentes de riesgo por curiosidad en momentos libres.',
    guidance: 'Mide la búsqueda de videos impactantes como entretenimiento o curiosidad.'
  },

  // =========================================================================
  // BLOQUE 2: DESENSIBILIZACIÓN Y HABITUACIÓN A LA VIOLENCIA GRÁFICA (12 REACTIVOS)
  // VARIABLE CENTRAL DEL ESTUDIO (Ítems 11-22)
  // =========================================================================
  {
    id: 11,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Puedo ver videos o fotos con personas muy lastimadas, heridas visibles o accidentes fuertes sin sentir asco ni malestar en el estómago.',
    guidance: 'Evalúa si tu cuerpo experimenta o no malestar físico o sensación de rechazo.'
  },
  {
    id: 12,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'He notado que ver imágenes de personas con lesiones graves ya no me acelera el corazón ni me produce sobresalto.',
    guidance: 'Mide si se mantiene o disminuye la reacción física de alerta o nerviosismo.'
  },
  {
    id: 13,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Puedo comer o botanear mientras veo videos donde personas sufren heridas graves o accidentes sin que se me quite el apetito.',
    guidance: 'Indica desvinculación entre las imágenes de accidentes y el malestar digestivo.'
  },
  {
    id: 14,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Antes me impactaba mucho ver videos de accidentes y violencia gráfica, pero ahora que los veo seguido en redes siento que ya no me impresionan.',
    guidance: 'Mide la sensación de acostumbramiento progresivo con el paso del tiempo.'
  },
  {
    id: 15,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Las imágenes de accidentes graves o violencia gráfica que veo en internet no me provocan pesadillas ni malestar al dormir.',
    guidance: 'Evalúa si los contenidos visuales que ves de día afectan o no tu descanso nocturno.'
  },
  {
    id: 16,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Siento que me he acostumbrado a ver tragedias y accidentes en internet al punto de que ya no me causan impresión.',
    guidance: 'Refleja si te sorprende o ya ves como algo común los sucesos difíciles en pantalla.'
  },
  {
    id: 17,
    blockId: 2,
    dimension: 'DES_DIV',
    dimensionName: 'Diversión al Atestiguar Violencia Gráfica',
    text: 'Me parece entretenido o llamativo ver videos donde dos personas pelean fuertemente y terminan lastimadas.',
    guidance: 'Mide si ver agresiones físicas te resulta entretenido o emocionante.'
  },
  {
    id: 18,
    blockId: 2,
    dimension: 'DES_DIV',
    dimensionName: 'Diversión al Atestiguar Violencia Gráfica',
    text: 'Me causa gracia o risa ver grabaciones de peleas o caídas aparatosas donde alguien termina lastimado.',
    guidance: 'Evalúa si las caídas con dolor físico o los golpes provocan risa o humor.'
  },
  {
    id: 19,
    blockId: 2,
    dimension: 'DES_DIV',
    dimensionName: 'Diversión al Atestiguar Violencia Gráfica',
    text: 'Cuando presencio una agresión física fuerte en la calle o en la escuela, siento curiosidad o ganas de quedarme a mirar el desenlace.',
    guidance: 'Indica atracción o interés presencial ante incidentes con violencia física.'
  },
  {
    id: 20,
    blockId: 2,
    dimension: 'DES_DIV',
    dimensionName: 'Diversión al Atestiguar Violencia Gráfica',
    text: 'Disfruto viendo recopilaciones de peleas, disturbios o enfrentamientos físicos entre personas.',
    guidance: 'Mide el gusto por ver compilaciones de peleas en video.'
  },
  {
    id: 21,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Me parece que las personas que se asustan o se impresionan mucho por ver accidentes o peleas en redes son exageradas.',
    guidance: 'Compara tu nivel de tolerancia afectiva con el de otras personas.'
  },
  {
    id: 22,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Rara vez desvío la mirada o cierro un video cuando aparece una escena de violencia física o accidentes fuertes.',
    guidance: 'Mide si prefieres seguir mirando o apartar la vista ante una escena difícil.'
  },

  // =========================================================================
  // BLOQUE 3: NORMALIZACIÓN COGNITIVA DE LA VIOLENCIA GRÁFICA (6 REACTIVOS)
  // (Ítems 23-28)
  // =========================================================================
  {
    id: 23,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Considero que ver videos de accidentes y violencia en redes es algo normal hoy en día y no tiene nada de raro.',
    guidance: 'Evalúa la percepción de normalidad en el consumo habitual de imaginería violenta.'
  },
  {
    id: 24,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Me causan gracia los memes, stickers o chistes de humor negro basados en accidentes o tragedias reales.',
    guidance: 'Mide si te divierte el humor negro surgido de situaciones trágicas reales.'
  },
  {
    id: 25,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Siento que ver videos de situaciones fuertes me ayuda a "endurecerme" y a ser más resistente para la vida real.',
    guidance: 'Mide la idea de que ver imágenes crudas sirve para fortalecerse psicológicamente.'
  },
  {
    id: 26,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Comparto o reacciono con risa a publicaciones que se burlan de personas que sufrieron caídas o accidentes graves en videos.',
    guidance: 'Evalúa la difusión y reacción lúdica ante accidentes de personas en internet.'
  },
  {
    id: 27,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Pienso que las personas que sufren agresiones o accidentes en internet seguro tuvieron la culpa o se lo buscaron por imprudentes.',
    guidance: 'Evalúa la tendencia a responsabilizar a la persona que sufrió el percance.'
  },
  {
    id: 28,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Considero que alarmarse por la difusión de videos de violencia en redes es innecesario, porque las noticias difíciles siempre han existido.',
    guidance: 'Mide si consideras innecesaria la preocupación social por estos contenidos.'
  },


  // =========================================================================
  // BLOQUE 4: AGRESIVIDAD (8 REACTIVOS)
  // Variable Secundaria - Adaptación Abreviada BPAQ (Ítems 29-36)
  // =========================================================================
  {
    id: 29,
    blockId: 4,
    dimension: 'AGR_FIS',
    dimensionName: 'Agresión Física',
    text: 'Si alguien me provoca o me insulta fuertemente, respondo con golpes, empujones o agresión física.',
    guidance: 'Mide la tendencia motora a responder con violencia corporal ante una afrenta.'
  },
  {
    id: 30,
    blockId: 4,
    dimension: 'AGR_FIS',
    dimensionName: 'Agresión Física',
    text: 'Cuando tengo un coraje muy grande, tiendo a golpear la pared, azotar puertas o romper objetos.',
    guidance: 'Refleja descarga agresiva contra el entorno material ante la frustración.'
  },
  {
    id: 31,
    blockId: 4,
    dimension: 'AGR_VER',
    dimensionName: 'Agresión Verbal',
    text: 'Cuando me enojo con alguien, le digo insultos, groserías o palabras muy hirientes.',
    guidance: 'Mide el empleo de vocabulario ofensivo directo durante discusiones.'
  },
  {
    id: 32,
    blockId: 4,
    dimension: 'AGR_VER',
    dimensionName: 'Agresión Verbal',
    text: 'Si una persona me contradice o me lleva la contraria, suelo levantarle la voz y discutir de manera agresiva.',
    guidance: 'Evalúa la confrontación áspera y tono elevado en discrepancias de opinión.'
  },
  {
    id: 33,
    blockId: 4,
    dimension: 'AGR_IRA',
    dimensionName: 'Ira',
    text: 'Me enojo con mucha facilidad por situaciones pequeñas que no salen como yo quería.',
    guidance: 'Evalúa reactividad colérica rápida y bajo umbral de tolerancia a la frustración.'
  },
  {
    id: 34,
    blockId: 4,
    dimension: 'AGR_IRA',
    dimensionName: 'Ira',
    text: 'Me cuesta mucho trabajo calmarme y recuperar la tranquilidad cuando siento rabia o furia.',
    guidance: 'Mide la dificultad en la modulación del retorno a la calma tras el enfado.'
  },
  {
    id: 35,
    blockId: 4,
    dimension: 'AGR_HOS',
    dimensionName: 'Hostilidad',
    text: 'Siento con frecuencia que otras personas hablan mal a mis espaldas o buscan perjudicarme.',
    guidance: 'Evalúa suspicacia respecto a las intenciones de los demás.'
  },
  {
    id: 36,
    blockId: 4,
    dimension: 'AGR_HOS',
    dimensionName: 'Hostilidad',
    text: 'Desconfío de las intenciones de la gente, incluso cuando aparentan ser amables o colaboradoras conmigo.',
    guidance: 'Mide desconfianza interpersonal generalizada.'
  },

  // =========================================================================
  // BLOQUE 5: RELACIONES INTERPERSONALES (6 REACTIVOS)
  // Variable Secundaria - Empatía y Convivencia Escolar (Ítems 37-42)
  // =========================================================================
  {
    id: 37,
    blockId: 5,
    dimension: 'REL_EMP',
    dimensionName: 'Empatía y Conducta Prosocial',
    text: 'Si veo que un compañero está pasando por un momento difícil o sufre dolor, siento compasión e intento apoyarlo.',
    guidance: 'Mide disposición activa a brindar consuelo afectivo a un semejante en sufrimiento.'
  },
  {
    id: 38,
    blockId: 5,
    dimension: 'REL_EMP',
    dimensionName: 'Empatía y Conducta Prosocial',
    text: 'Me incomoda y me duele profundamente ver que a un estudiante lo humillan, lastiman o hacen llorar frente a otros.',
    guidance: 'Evalúa la resonancia afectiva empática frente a la victimización ajena.'
  },
  {
    id: 39,
    blockId: 5,
    dimension: 'REL_EMP',
    dimensionName: 'Empatía y Conducta Prosocial',
    text: 'Estoy dispuesto a ayudar a otros compañeros en la escuela cuando tienen problemas, sin esperar nada a cambio.',
    guidance: 'Refleja la orientación altruista en la convivencia cotidiana escolar.'
  },
  {
    id: 40,
    blockId: 5,
    dimension: 'REL_EMP',
    dimensionName: 'Empatía y Conducta Prosocial',
    text: 'Me resulta fácil ponerme en el lugar de mis compañeros y entender lo que sienten cuando están tristes o asustados.',
    guidance: 'Mide toma de perspectiva afectiva vicaria hacia pares.'
  },
  {
    id: 41,
    blockId: 5,
    dimension: 'REL_DIF',
    dimensionName: 'Dificultades Interpersonales',
    text: 'Suelo tener discusiones y distanciamientos frecuentes con compañeros o amigos por comentarios hirientes o actitudes agresivas.',
    guidance: 'Evalúa conflictividad relacional en el círculo escolar.'
  },
  {
    id: 42,
    blockId: 5,
    dimension: 'REL_DIF',
    dimensionName: 'Dificultades Interpersonales',
    text: 'Me cuesta trabajo resolver desacuerdos de forma pacífica sin que terminen en gritos o peleas.',
    guidance: 'Mide dificultades para la negociación no violenta ante discrepancias.'
  }
];
