// Banco de 42 reactivos para Investigación Escolar Cuantitativa
// Variable Central: Exposición a Contenido Gráfico Violento y Desensibilización/Habituación
// Definición Operacional de Contenido Gráfico Violento: Publicaciones o videos que muestran sangre,
// lesiones físicas graves, mutilaciones o muertes violentas (distinguiéndolo de discusiones o agresiones verbales).
// Escala Likert de 5 puntos (1 = Nunca a 5 = Siempre) - Últimas 4 semanas

export const LIKERT_OPTIONS = [
  { val: 1, label: 'Nunca' },
  { val: 2, label: 'Raras veces' },
  { val: 3, label: 'A veces' },
  { val: 4, label: 'Frecuentemente' },
  { val: 5, label: 'Siempre' }
];

export const BLOCKS = [
  {
    id: 1,
    code: 'EXP',
    title: 'Bloque 1. Exposición a violencia gráfica',
    itemCount: 10,
    purpose: 'Identificar cuánto y con qué frecuencia el estudiante se expone de forma incidental o intencional a imágenes y videos explícitos de sangre, heridas o muerte.',
    guidance: 'Frecuencia de aparición no solicitada y búsqueda voluntaria de contenido gráfico en redes sociales y mensajería.'
  },
  {
    id: 2,
    code: 'DES',
    title: 'Bloque 2. Desensibilización y habituación a la violencia gráfica (Variable Central)',
    itemCount: 12,
    purpose: 'Calcular la puntuación global principal de desensibilización: atenuación de náuseas, taquicardia o aversión somática, acostumbramiento y diversión al atestiguar violencia física.',
    guidance: 'Reacción afectiva y corporal autopercibida ante material gráfico violento y habituación por exposición repetida (EDV adaptada).'
  },
  {
    id: 3,
    code: 'NOR',
    title: 'Bloque 3. Normalización de la violencia gráfica',
    itemCount: 6,
    purpose: 'Examinar si el participante considera la violencia gráfica como algo habitual, normal, justificado o motivo de diversión mediante memes y humor negro.',
    guidance: 'Creencias sobre la crudeza visual en internet, uso de stickers/memes de tragedias reales y justificación de daños.'
  },
  {
    id: 4,
    code: 'AGR',
    title: 'Bloque 4. Agresividad (Variable Secundaria)',
    itemCount: 8,
    purpose: 'Explorar la relación entre la desensibilización gráfica y la agresividad autoinformada (física, verbal, ira y hostilidad del BPAQ adaptado).',
    guidance: 'Respuestas de confrontación física, verbal, impulsividad de enojo y suspicacia interpersonal.'
  },
  {
    id: 5,
    code: 'REL',
    title: 'Bloque 5. Relaciones interpersonales (Variable Secundaria)',
    itemCount: 6,
    purpose: 'Explorar posibles asociaciones de la desensibilización con la empatía, disposición a ayudar y dificultades de convivencia escolar.',
    guidance: 'Resonancia afectiva ante el dolor ajeno, ayuda prosocial y fricciones de convivencia de pares.'
  }
];

// Exactamente 42 reactivos distribuidos en los 5 bloques
export const QUESTIONS_42 = [
  // =========================================================================
  // BLOQUE 1: EXPOSICIÓN A VIOLENCIA GRÁFICA (10 REACTIVOS)
  // =========================================================================
  // Exposición incidental (Ítems 1-5)
  {
    id: 1,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'Al navegar en mis redes sociales (TikTok, Reels, Instagram, X), me aparecen videos que muestran sangre o personas con heridas graves sin que yo los busque.',
    guidance: 'Considera la intrusión no solicitada de heridas o sangre en tus líneas de tiempo.'
  },
  {
    id: 2,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'En mis sugerencias automáticas de video me salen grabaciones de accidentes fatales o choques fuertes donde se ven víctimas ensangrentadas.',
    guidance: 'Evalúa la frecuencia con la que los algoritmos te muestran siniestros mortales de imprevisto.'
  },
  {
    id: 3,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'En chats grupales o aplicaciones de mensajería (WhatsApp, Telegram) contactos mandan fotos o videos de personas heridas de gravedad o fallecidas.',
    guidance: 'Mide la recepción de contenido sangriento a través de círculos de pares o canales compartidos.'
  },
  {
    id: 4,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'Veo grabaciones de cámaras de seguridad (CCTV) con atropellos mortales, asaltos con disparos o linchamientos mientras hago scroll normal.',
    guidance: 'Indica la aparición casual de metrajes de circuito cerrado con violencia letal no ficticia.'
  },
  {
    id: 5,
    blockId: 1,
    dimension: 'EXP_INC',
    dimensionName: 'Exposición Gráfica Incidental',
    text: 'Cuando ocurre una noticia violenta de alto impacto, las redes sociales me bombardean con el metraje explícito sin censura.',
    guidance: 'Mide la saturación repetitiva del evento cruento impulsada por viralidad.'
  },

  // Búsqueda intencional (Ítems 6-10)
  {
    id: 6,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'Si me entero de un video que muestra una tragedia, balacera o ejecución violenta, busco la grabación para verla con mis propios ojos.',
    guidance: 'Evalúa tu iniciativa personal deliberada de localizar grabaciones cruentas.'
  },
  {
    id: 7,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'He buscado intencionalmente en internet o Telegram canales o sitios web dedicados a publicar fotos y videos de gore, sangre o muerte.',
    guidance: 'Mide la visita premeditada a repositorios de shock content o contenido extremo.'
  },
  {
    id: 8,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'Cuando veo advertencias de "contenido delicado o sensible" que cubre imágenes de heridas o violencia extrema, desactivo el filtro para mirar.',
    guidance: 'Refleja la acción voluntaria de retirar los filtros de advertencia digital.'
  },
  {
    id: 9,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'Suelo pedir a amigos o contactos que me pasen enlaces de videos de accidentes sangrientos o riñas fuertes que se hayan hecho virales.',
    guidance: 'Evalúa la solicitud activa de material gráfico cruento a conocidos.'
  },
  {
    id: 10,
    blockId: 1,
    dimension: 'EXP_ACT',
    dimensionName: 'Búsqueda Gráfica Intencional',
    text: 'He buscado grabaciones de cirugías invasivas extremas, accidentes letales o violencia cruda por curiosidad o morbo en momentos de ocio.',
    guidance: 'Mide la búsqueda de estimulación visual extrema como entretenimiento.'
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
    text: 'Puedo ver videos o fotos con heridas abiertas, fracturas expuestas o abundante sangre sin sentir asco ni náuseas.',
    guidance: 'Evalúa la atenuación de la respuesta corporal de aversión o rechazo gástrico.'
  },
  {
    id: 12,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'He notado que ver imágenes de personas gravemente lastimadas ya no me altera el ritmo cardíaco ni me produce taquicardia o sobresalto.',
    guidance: 'Mide la disminución en la activación autonómica de alerta fisiológica.'
  },
  {
    id: 13,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Puedo comer o botanear mientras veo videos donde personas sufren heridas graves o accidentes sin que se me quite el apetito.',
    guidance: 'Indica desvinculación entre la imaginería cruenta y el malestar digestivo.'
  },
  {
    id: 14,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Antes me impactaba o perturbaba mucho ver videos sangrientos, pero ahora que los veo seguido en redes ya no me causan nada.',
    guidance: 'Mide la percepción directa de acostumbramiento progresivo por exposición acumulada.'
  },
  {
    id: 15,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Las imágenes de violencia extrema o cuerpos mutilados que veo en internet no me provocan pesadillas ni memorias intrusivas al dormir.',
    guidance: 'Evalúa la ausencia de huella afectiva o perturbación del sueño a corto plazo.'
  },
  {
    id: 16,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Siento que me he acostumbrado a ver sangre y muerte en internet al punto de que me parece algo común que ya no me impresiona.',
    guidance: 'Refleja la pérdida de asombro ante la pérdida de vidas humanas en pantalla.'
  },
  {
    id: 17,
    blockId: 2,
    dimension: 'DES_DIV',
    dimensionName: 'Diversión al Atestiguar Violencia Gráfica',
    text: 'Me parece entretenido o emocionante ver videos donde dos personas se agarran a golpes causándose heridas físicas visibles.',
    guidance: 'Mide la respuesta de entretenimiento ante agresiones con daño corporal evidente (EDV adaptada).'
  },
  {
    id: 18,
    blockId: 2,
    dimension: 'DES_DIV',
    dimensionName: 'Diversión al Atestiguar Violencia Gráfica',
    text: 'Me causa risa ver grabaciones de peleas o caídas aparatosas donde alguien termina gravemente lastimado o sangrando.',
    guidance: 'Evalúa si el dolor físico o las lesiones de terceros provocan hilaridad.'
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
    text: 'Disfruto viendo compilaciones de riñas, disturbios o enfrentamientos con golpes y sangre entre jóvenes.',
    guidance: 'Mide el consumo lúdico de compilaciones de agresiones corporales sangrientas.'
  },
  {
    id: 21,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Me parece que las personas que se perturban o se asustan profundamente al ver sangre en redes son exageradas o demasiado débiles.',
    guidance: 'Compara el umbral de incomodidad afectiva propio frente a la reacción de pares.'
  },
  {
    id: 22,
    blockId: 2,
    dimension: 'DES_HAB',
    dimensionName: 'Desensibilización y Habituación Somática',
    text: 'Rara vez desvío la mirada o cierro un video cuando aparece una escena de violencia física cruda o sangrienta.',
    guidance: 'Mide la latencia atencional y la ausencia de conductas de evitación visual inmediata.'
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
    text: 'Considero que ver videos de violencia gráfica o sangre es algo normal hoy en día y no tiene nada de malo.',
    guidance: 'Evalúa la percepción de normalidad en el consumo habitual de imaginería violenta.'
  },
  {
    id: 24,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Me causan gracia los memes, stickers o remates de humor negro hechos a partir de grabaciones de accidentes fatales o tragedias reales.',
    guidance: 'Mide el uso de mecanismos de humor para trivializar el dolor de víctimas reales (etiquetado eufemístico de Bandura).'
  },
  {
    id: 25,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Siento que ver contenido gráfico violento me ayuda a "endurecerme" y a ser más fuerte psicológicamente para la vida real.',
    guidance: 'Mide la creencia racionalizada de que el consumo de crudeza visual otorga fortaleza adaptativa.'
  },
  {
    id: 26,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Comparto o reacciono con risa a publicaciones que se burlan de personas que sufrieron mutilaciones o accidentes graves en videos.',
    guidance: 'Evalúa la difusión activa y refuerzo lúdico de tragedias humanas entre pares.'
  },
  {
    id: 27,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Pienso que quienes sufren agresiones o accidentes sangrientos filmados en internet seguro tuvieron la culpa o se lo buscaron por imprudentes.',
    guidance: 'Evalúa el sesgo de atribución defensiva y culpabilización de la víctima (Melvin Lerner).'
  },
  {
    id: 28,
    blockId: 3,
    dimension: 'NOR_GRAF',
    dimensionName: 'Normalización de Violencia Gráfica',
    text: 'Considero que hacer escándalo o alarmarse por la difusión de videos sangrientos en redes es innecesario, porque la violencia siempre ha existido.',
    guidance: 'Mide la minimización social del impacto del contenido explícito en plataformas digitales.'
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
