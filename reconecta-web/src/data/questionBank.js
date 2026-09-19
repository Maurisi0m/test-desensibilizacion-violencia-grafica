export const QUESTIONS = [
  // Subscale 1: Exposición Algorítmica Indirecta (EA-I)
  {
    id: 1, dimension: 'EA-I', dimensionName: 'Exposición Algorítmica Indirecta',
    teen: 'Al ver Reels o TikToks, me aparecen videos de peleas callejeras, asaltos o accidentes sin que yo los busque.',
    adult: 'Al navegar por mis feeds habituales (X, Reels, TikTok), me topo con videos de accidentes graves o balaceras de imprevisto.',
    hint: 'Mide la frecuencia con la que el algoritmo te expone de manera no solicitada a violencia explícita.'
  },
  {
    id: 2, dimension: 'EA-I', dimensionName: 'Exposición Algorítmica Indirecta',
    teen: 'En mis redes me salen videos de golpizas escolares o peleas de bandas con títulos llamativos.',
    adult: 'Encuentro con frecuencia grabaciones de riñas, agresiones físicas o linchamientos mientras reviso noticias o tendencias.',
    hint: 'Evalúa la presencia de agresiones interpersonales violentas en tus recomendaciones.'
  },
  {
    id: 3, dimension: 'EA-I', dimensionName: 'Exposición Algorítmica Indirecta',
    teen: 'Amigos o conocidos mandan videos de personas lastimadas o peleas a los grupos de WhatsApp.',
    adult: 'En chats grupales o canales compartidos, contactos envían enlaces o videos con contenido violento explícito.',
    hint: 'Refleja la exposición secundaria transmitida a través de círculos sociales digitales.'
  },
  {
    id: 4, dimension: 'EA-I', dimensionName: 'Exposición Algorítmica Indirecta',
    teen: 'Cuando una pelea se vuelve viral en la escuela o internet, me aparece varias veces al día.',
    adult: 'Cuando ocurre un incidente violento noticioso, las plataformas me bombardean repetidamente con el metraje sin censura.',
    hint: 'Mide la saturación de repetición del mismo evento traumático inducida por la viralidad.'
  },
  {
    id: 5, dimension: 'EA-I', dimensionName: 'Exposición Algorítmica Indirecta',
    teen: 'Aparecen grabaciones de cámaras de seguridad con atropellos o asaltos mientras hago scroll normal.',
    adult: 'Metrajes de cámaras de circuito cerrado (CCTV) con incidentes fatales se reproducen automáticamente en mi pantalla.',
    hint: 'Indica la intrusión visual de violencia no ficticia durante la navegación casual.'
  },

  // Subscale 2: Búsqueda Activa e Intencional (BA-C)
  {
    id: 6, dimension: 'BA-C', dimensionName: 'Búsqueda Activa e Intencional',
    teen: 'Si me entero de que grabaron una pelea fuerte, busco el video o le pido a alguien que me lo pase.',
    adult: 'Cuando escucho sobre un hecho violento de alto impacto, busco activamente el video sin censura para verlo.',
    hint: 'Mide la curiosidad mórbida y la conducta deliberada de obtención de material gráfico.'
  },
  {
    id: 7, dimension: 'BA-C', dimensionName: 'Búsqueda Activa e Intencional',
    teen: 'He entrado a grupos o canales donde prometen videos prohibidos, accidentes o sangre.',
    adult: 'Estoy suscrito o visito canales de Telegram, foros o portales web dedicados exclusivamente a shock content o gore.',
    hint: 'Evalúa la pertenencia o acceso regular a repositorios de contenido no regulado.'
  },
  {
    id: 8, dimension: 'BA-C', dimensionName: 'Búsqueda Activa e Intencional',
    teen: 'Cuando leo advertencias de "imágenes sensibles", quito el filtro de inmediato para ver de qué se trata.',
    adult: 'Desactivo intencionalmente las advertencias de contenido sensible para ver el material cruento de primera mano.',
    hint: 'Refleja la neutralización voluntaria de los filtros de advertencia digital.'
  },
  {
    id: 9, dimension: 'BA-C', dimensionName: 'Búsqueda Activa e Intencional',
    teen: 'A veces busco videos de accidentes o cosas fuertes solo por curiosidad o para no aburrirme.',
    adult: 'He buscado de forma premeditada grabaciones de cirugías extremas, accidentes letales o ejecuciones por interés o morbo.',
    hint: 'Mide el uso del contenido de choque como estímulo de entretenimiento o novedad.'
  },
  {
    id: 10, dimension: 'BA-C', dimensionName: 'Búsqueda Activa e Intencional',
    teen: 'He reenviado videos de peleas o personas accidentadas a otros amigos para ver cómo reaccionan.',
    adult: 'He compartido videos con violencia explícita o gore con conocidos o en comunidades para generar impacto o debate.',
    hint: 'Evalúa el rol de difusor activo de estímulos aversivos en redes.'
  },

  // Subscale 3: Reactividad Fisiológica y Embotamiento Corporal (RF-E)
  {
    id: 11, dimension: 'RF-E', dimensionName: 'Embotamiento Fisiológico',
    teen: 'Puedo ver videos donde sale mucha sangre o heridas graves sin sentir asco ni ganas de taparme los ojos.',
    adult: 'Puedo observar metrajes con heridas abiertas, fracturas expuestas o abundante sangre sin experimentar náusea ni aversión visceral.',
    hint: 'Evalúa la atenuación de la respuesta somática refleja de rechazo.'
  },
  {
    id: 12, dimension: 'RF-E', dimensionName: 'Embotamiento Fisiológico',
    teen: 'Antes me daba taquicardia o miedo ver cosas fuertes en el celular, pero ahora ya no me causa nada.',
    adult: 'He notado que mi frecuencia cardíaca y tensión muscular ya no se alteran al presenciar actos de agresión letal grabados.',
    hint: 'Mide la habituación simpática y la extinción de la respuesta autonómica de alarma.'
  },
  {
    id: 13, dimension: 'RF-E', dimensionName: 'Embotamiento Fisiológico',
    teen: 'Puedo comer o botanear mientras veo videos de personas sufriendo golpes o accidentes sin que se me quite el apetito.',
    adult: 'La visualización de imágenes cruentas o restos humanos no interrumpe mi alimentación ni me genera malestar gástrico.',
    hint: 'Indica una disociación marcada entre el estímulo visual aversivo y las respuestas neurovegetativas digestivas.'
  },
  {
    id: 14, dimension: 'RF-E', dimensionName: 'Embotamiento Fisiológico',
    teen: 'Rara vez tengo pesadillas o me quedo pensando en las imágenes violentas que veo en internet.',
    adult: 'Las imágenes cruentas no me generan memorias intrusivas, dificultades para conciliar el sueño ni sobresaltos posteriores.',
    hint: 'Refleja la ausencia de huella traumática afectiva inmediata.'
  },
  {
    id: 15, dimension: 'RF-E', dimensionName: 'Embotamiento Fisiológico',
    teen: 'Mis amigos se espantan con ciertos videos sangrientos, pero a mí me parece una reacción exagerada.',
    adult: 'Considero que las personas que se perturban profundamente con imágenes violentas son excesivamente sensibles o melodramáticas.',
    hint: 'Compara tu umbral sensorial con la respuesta emocional normativa de la población.'
  },

  // Subscale 4: Normalización Cognitiva y Desconexión Empática (NC-D)
  {
    id: 16, dimension: 'NC-D', dimensionName: 'Normalización Cognitiva',
    teen: 'Siento que ver este tipo de videos me ayuda a ser más "fuerte" y a que nada me asuste en la vida real.',
    adult: 'Considero que exponerme a metrajes cruentos es una forma útil de "endurecerme" psicológicamente frente a la realidad hostil.',
    hint: 'Evalúa la creencia racionalizada de que el morbo genera resiliencia emocional.'
  },
  {
    id: 17, dimension: 'NC-D', dimensionName: 'Normalización Cognitiva',
    teen: 'Pienso que la violencia que se ve en redes es lo normal hoy en día y no vale la pena preocuparse.',
    adult: 'Asumo que la violencia extrema es un componente intrínseco inevitable de la sociedad que no amerita indignación.',
    hint: 'Mide la heurística del mundo hostil y la resignación cínica.'
  },
  {
    id: 18, dimension: 'NC-D', dimensionName: 'Normalización Cognitiva',
    teen: 'A veces me causan risa los comentarios o memes que hacen sobre personas que sufrieron accidentes en videos.',
    adult: 'Encuentro humorístico el uso de clips de dolor real o tragedias como memes, stickers o remates de comedia negra.',
    hint: 'Mide la trivialización y el distanciamiento moral de Bandura.'
  },
  {
    id: 19, dimension: 'NC-D', dimensionName: 'Normalización Cognitiva',
    teen: 'Cuando veo que golpean a alguien en un video, suelo pensar que seguro esa persona se lo buscó.',
    adult: 'Tiendo a suponer que las víctimas de incidentes violentos filmados tuvieron la culpa o se involucraron por imprudencia.',
    hint: 'Evalúa la hipótesis del mundo justo de Lerner y la atribución defensiva de culpabilidad.'
  },
  {
    id: 20, dimension: 'NC-D', dimensionName: 'Normalización Cognitiva',
    teen: 'Rara vez me pongo en el lugar de la persona del video ni pienso en lo que siente su familia.',
    adult: 'Me resulta indiferente la perspectiva de la víctima; no experimento la necesidad de inferir su angustia ni la de sus seres queridos.',
    hint: 'Refleja la erosión de la Teoría de la Mente (ToM) y la atenuación de la empatía situacional.'
  }
];

export const LIKERT_OPTIONS = [
  { val: 1, label: 'Totalmente en desacuerdo / Nunca' },
  { val: 2, label: 'Rara vez' },
  { val: 3, label: 'Ocasionalmente / A veces' },
  { val: 4, label: 'Con frecuencia' },
  { val: 5, label: 'Totalmente de acuerdo / Siempre' }
];
