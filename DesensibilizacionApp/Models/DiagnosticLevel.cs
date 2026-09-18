namespace DesensibilizacionApp.Models;

public enum SeverityLevel
{
    SensibilidadPreservada,       // 0% - 24%
    DesensibilizacionLeve,        // 25% - 49%
    DesensibilizacionSignificativa,// 50% - 74%
    DesensibilizacionSevera       // 75% - 100%
}

public class CognitiveConstructDetail
{
    public string ConstructName { get; set; } = string.Empty;
    public string TheoreticalFramework { get; set; } = string.Empty; // e.g. "Albert Bandura", "Neurobiología Afectiva", "Melvin Lerner"
    public string OperationalDefinition { get; set; } = string.Empty;
    public string ManifestationInProfile { get; set; } = string.Empty;
}

public class DiagnosticLevel
{
    public SeverityLevel Level { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ScoreRange { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string ClinicalInterpretation { get; set; } = string.Empty;
    public string NeurocognitiveProfile { get; set; } = string.Empty;

    public List<CognitiveConstructDetail> AppliedCognitiveConstructs { get; set; } = new();
    public List<string> BehavioralIndicators { get; set; } = new();
    public List<string> PsychoeducationalRecommendations { get; set; } = new();
    public List<string> AppliedInterventions { get; set; } = new();

    public string ColorHex { get; set; } = "#10B981";
    public string BadgeText { get; set; } = "Bajo";

    public static DiagnosticLevel FromScore(double score)
    {
        if (score < 25.0)
        {
            return new DiagnosticLevel
            {
                Level = SeverityLevel.SensibilidadPreservada,
                Title = "Sensibilidad Emocional Preservada (Reactividad Afectiva Típica)",
                ScoreRange = "0% - 24%",
                BadgeText = "NIVEL BAJO / SALUDABLE",
                ColorHex = "#10B981", // Verde Esmeralda
                Summary = "Tus respuestas reflejan una reactividad afectiva y fisiológica biológicamente típica y saludable ante estímulos aversivos. El circuito de aversión empática y la respuesta somática de alarma permanecen plenamente conservados.",
                ClinicalInterpretation = "Se observa una respuesta simpática congruente ante estímulos dolorosos ajenos. El sistema de alarma somatomotor (reflejo de sobresalto, náusea aversiva, rechazo motor de retirada) previene la normalización del daño humano.",
                NeurocognitiveProfile = "Integridad funcional del eje amígdala-ínsula anterior-corteza cingulada anterior (ACC). No existe atenuación patológica del potencial de preparación motora ni habituación atencional frente a la imaginería cruenta.",
                AppliedCognitiveConstructs = new List<CognitiveConstructDetail>
                {
                    new()
                    {
                        ConstructName = "Resonancia Afectiva Intacta (Affective Resonance)",
                        TheoreticalFramework = "Neurobiología de la Empatía (Decety & Jackson)",
                        OperationalDefinition = "Activación involuntaria de representaciones somatosensoriales propias al presenciar dolor o lesión en un semejante.",
                        ManifestationInProfile = "Rechazo fisiológico visceral espontáneo y conductas de evitación inmediata (deslizar o apartar la mirada)."
                    },
                    new()
                    {
                        ConstructName = "Bajo Distanciamiento Moral (Moral Disengagement Resistance)",
                        TheoreticalFramework = "Teoría Social Cognitiva (Albert Bandura)",
                        OperationalDefinition = "Incapacidad para autojustificar, trivializar o convertir en estímulo lúdico el sufrimiento de una persona real.",
                        ManifestationInProfile = "Fuerte resistencia a consumir o reenviar agresiones como memes o material de entretenimiento."
                    },
                    new()
                    {
                        ConstructName = "Saliencia Atencional Aversiva (Attentional Aversion Bias)",
                        TheoreticalFramework = "Procesamiento Ascendente de la Información (Bottom-up Attention)",
                        OperationalDefinition = "El estímulo gráfico violento activa señales de alerta biológica que motivan la interrupción conductual de la exposición.",
                        ManifestationInProfile = "Filtro activo ante advertencias de contenido delicado; no se busca intencionalmente material cruento."
                    }
                },
                BehavioralIndicators = new List<string>
                {
                    "Rechazo somático natural inmediato ante heridas abiertas o agresiones graves.",
                    "Hábito automático de omisión (deslizar de inmediato en menos de 1 segundo).",
                    "Activación empática prosocial congruente frente a víctimas de accidentes.",
                    "Ausencia de curiosidad mórbida en comunidades no moderadas (Telegram, foros shock)."
                },
                PsychoeducationalRecommendations = new List<string>
                {
                    "Mantener habilitados los filtros parentales y algoritmos de contenido sensible en plataformas digitales.",
                    "Preservar este nivel de reactividad como un biomarcador comportamental protector para el juicio moral y la empatía social.",
                    "Promover el reporte activo de cuentas que eludan moderación de violencia explícita."
                },
                AppliedInterventions = new List<string>
                {
                    "Psicoeducación en Higiene Digital Profiláctica: Fortalecimiento de sesgos protectores frente a algoritmos de recompensa rápida.",
                    "Consolidación de Juicio Crítico Mediático: Reconocimiento de tácticas de monetización de plataformas basadas en engagement visceral."
                }
            };
        }
        else if (score < 50.0)
        {
            return new DiagnosticLevel
            {
                Level = SeverityLevel.DesensibilizacionLeve,
                Title = "Desensibilización Leve a Moderada-Baja (Habituación Periférica por Exposición Digital)",
                ScoreRange = "25% - 49%",
                BadgeText = "NIVEL MODERADO-BAJO",
                ColorHex = "#0EA5E9", // Azul Cielo
                Summary = "Se identifica una habituación sensorial periférica derivada de la exposición involuntaria reiterada en redes sociales. Aunque se conserva la capacidad de angustia vicaria ante hechos severos, existe una tolerancia creciente a la violencia cotidiana mediada por pantalla.",
                ClinicalInterpretation = "Fenómeno de fatiga perceptiva y habituación hedónica adaptativa. El participante presenta menor tasa de sobresalto ante altercados callejeros, riñas escolares o siniestros leves, aunque el umbral de desconexión empática no se ha generalizado hacia el gore severo.",
                NeurocognitiveProfile = "Atenuación inicial del componente de respuesta atencional temprana (P300 disminuida frente a violencia moderada). Persiste reactividad autonómica frente a dolor catastrófico, pero la latencia para apartar la mirada se ha incrementado.",
                AppliedCognitiveConstructs = new List<CognitiveConstructDetail>
                {
                    new()
                    {
                        ConstructName = "Habituación Sensorial Digital (Sensory Adaptation)",
                        TheoreticalFramework = "Modelo General de Agresión / Habituación (Anderson & Bushman)",
                        OperationalDefinition = "Disminución progresiva de la respuesta fisiológica y atencional ante la repetición sistemática de un estímulo aversivo.",
                        ManifestationInProfile = "Tolerancia visual pasiva: se observa el inicio de videos violentos en reels antes de decidir deslizar."
                    },
                    new()
                    {
                        ConstructName = "Disociación Peritraumática Tecnológica (Screen-Mediated Derealization)",
                        TheoreticalFramework = "Teoría de la Desrealización Mediada (Turkle / Holmes)",
                        OperationalDefinition = "Percepción del suceso trágico como una representación escénica ficticia o simulada debido a la interfaz de cristal del smartphone.",
                        ManifestationInProfile = "Reducción de la urgencia de auxilio; la persona procesa el video como 'contenido' antes que como sufrimiento real."
                    },
                    new()
                    {
                        ConstructName = "Fatiga por Compasión Subclínica (Compassion Fatigue)",
                        TheoreticalFramework = "Sobrecarga Alostática Empática (Figley / Stamm)",
                        OperationalDefinition = "Sobrecarga de estímulos dolorosos en feeds continuos que agota transitoriamente los recursos cognitivos de empatía.",
                        ManifestationInProfile = "Sensación de indiferencia o acostumbramiento ('ya no me asombra tanto porque sale todos los días')."
                    }
                },
                BehavioralIndicators = new List<string>
                {
                    "Poco asombro ante peleas escolares o de calle que aparecen en historias o Reels.",
                    "Ocasionalmente permanece viendo unos segundos contenido violento antes de deslizarlo.",
                    "Aún experimenta malestar estomacal o perturbación ante heridas abiertas o desastres graves.",
                    "No suele buscar activamente material gore, pero tolera la exposición pasiva ocasional."
                },
                PsychoeducationalRecommendations = new List<string>
                {
                    "Implementar la 'Regla de Corte Temprano a los 2 Segundos': omitir inmediatamente al detectar agresión física.",
                    "Reajustar el algoritmo: dar 'No me interesa' a cuentas de noticias de nota roja y recopilaciones de incidentes.",
                    "Establecer 'Dietas Digitales': pausas programadas sin consumo de videos en formato scroll vertical."
                },
                AppliedInterventions = new List<string>
                {
                    "Entrenamiento en Toma de Perspectiva (Perspective Taking Exercise): 'Humanizar la miniatura' recordando que detrás de cada clip hay una persona real.",
                    "Técnica de Interrupción de Inercia Algorítmica: Identificar la fijación visual pasiva como un bucle dopaminérgico automático."
                }
            };
        }
        else if (score < 75.0)
        {
            return new DiagnosticLevel
            {
                Level = SeverityLevel.DesensibilizacionSignificativa,
                Title = "Desensibilización Significativa (Embotamiento Afectivo Marcado y Distanciamiento Moral)",
                ScoreRange = "50% - 74%",
                BadgeText = "NIVEL MODERADO-ALTO / ALERTA",
                ColorHex = "#F59E0B", // Ámbar / Naranja
                Summary = "Tus niveles de reactividad autonómica ante la violencia explícita se encuentran severamente atenuados. Se evidencia la activación de mecanismos cognitivos de distanciamiento moral y una normalización del sufrimiento humano.",
                ClinicalInterpretation = "Bloqueo funcional de la resonancia vicaria. El individuo es capaz de procesar imágenes de daño físico grave (sangre abundante, fracturas expuestas, agonía) sin activación concomitante del sistema simpático (taquicardia, sudoración o náuseas). La violencia comienza a conceptualizarse como mercancía lúdica o entretenimiento.",
                NeurocognitiveProfile = "Hipoactividad de la ínsula anterior y amígdala ante imaginería nociva. Sobrecarga del córtex prefrontal ventromedial (VMPFC) en la supresión de respuestas afectivas aversivas. Se observa inhibición de la 'Pain Matrix' cerebral.",
                AppliedCognitiveConstructs = new List<CognitiveConstructDetail>
                {
                    new()
                    {
                        ConstructName = "Distanciamiento Moral por Etiquetado Eufemístico (Moral Disengagement)",
                        TheoreticalFramework = "Mecanismos de Desconexión Moral (Albert Bandura)",
                        OperationalDefinition = "Uso del humor negro, memes, stickers y sarcasmo para despojar a un acto atroz de su carga moral y trágica real.",
                        ManifestationInProfile = "Interacción con chistes, 'reaccionar con risa' y reenvío de desgracias en chats como contenido cómico."
                    },
                    new()
                    {
                        ConstructName = "Atribución de Culpa a la Víctima (Victim Blaming Bias)",
                        TheoreticalFramework = "Hipótesis del Mundo Justo (Just-World Hypothesis, Melvin Lerner)",
                        OperationalDefinition = "Sesgo cognitivo que asume que las personas que sufren daño 'hicieron algo para merecerlo', aliviando la angustia empática propia.",
                        ManifestationInProfile = "Pensamientos automáticos del tipo: 'eso le pasa por tonto', 'él se lo buscó', justificando la agresión."
                    },
                    new()
                    {
                        ConstructName = "Curiosidad Mórbida Instrumental (Morbid Curiosity Drive)",
                        TheoreticalFramework = "Búsqueda de Sensaciones y Curiosidad de Riesgo (Zuckerman / Oosterwijk)",
                        OperationalDefinition = "Búsqueda deliberada de estímulos aterradores o sangrientos como mecanismo de estimulación límbica sin riesgo físico inmediato.",
                        ManifestationInProfile = "Búsqueda activa de 'videos sin censura' tras hechos virales y petición de enlaces crudos a contactos."
                    },
                    new()
                    {
                        ConstructName = "Efecto Espectador Digitalizado (Digital Bystander Effect)",
                        TheoreticalFramework = "Teoría del Efecto Espectador (Latané & Darley / Thorne)",
                        OperationalDefinition = "Priorización de la mediación tecnológica (grabar con el smartphone) por encima de la movilización de auxilio o alarma prosocial.",
                        ManifestationInProfile = "Impulso automático de filmar un suceso violento presencial antes que experimentar pánico o prestar asistencia."
                    }
                },
                BehavioralIndicators = new List<string>
                {
                    "Capacidad de alimentarse o realizar tareas cotidianas mientras se visualizan lesiones graves sin experimentar náuseas.",
                    "Participación activa en grupos de humor negro y memes derivados de accidentes fatales reales.",
                    "Búsqueda intencional de metrajes 'sin censura' tras noticias de impacto nacional o local.",
                    "Falta de rumiación o pesadillas tras visualización de contenidos con homicidios o violencia armada."
                },
                PsychoeducationalRecommendations = new List<string>
                {
                    "Corte radical de canales y grupos dedicados a contenido shock (Telegram, canales de noticias no reguladas).",
                    "Práctica de 'Re-humanización Guiada': Investigar el contexto biográfico de víctimas para reactivar la teoría de la mente.",
                    "Establecimiento de límites éticos en chats de pares: rechazar explícitamente la difusión de material gráfico denigrante."
                },
                AppliedInterventions = new List<string>
                {
                    "Reestructuración Cognitiva de Atribuciones: Cuestionar activamente los pensamientos de culpabilización ('just-world bias').",
                    "Protocolo de Re-sensibilización Afectiva (CBT-based): Exposición a narrativas testimoniales en lugar de fragmentos descontextualizados.",
                    "Desescalada Dopaminérgica: Reemplazar el consumo shock por deportes, arte o actividades de alta concentración cinestésica."
                }
            };
        }
        else
        {
            return new DiagnosticLevel
            {
                Level = SeverityLevel.DesensibilizacionSevera,
                Title = "Desensibilización Severa (Anestesia Emocional Crítica y Deshumanización Sistemática)",
                ScoreRange = "75% - 100%",
                BadgeText = "NIVEL SEVERO / CRÍTICO",
                ColorHex = "#EF4444", // Rojo Carmesí
                Summary = "Tus resultados evidencian un estado de anestesia emocional profunda y deshumanización sistemática frente al sufrimiento humano explícito. Se observa un embotamiento afectivo generalizado y búsqueda deliberada recurrente de violencia extrema.",
                ClinicalInterpretation = "Extinción casi completa de la respuesta aversiva autonómica ante la muerte y la mutilación física. La persona no experimenta náuseas, taquicardia ni perturbación emocional ante escenas de crueldad extrema. Coexiste una erosión profunda de la empatía vicaria y una legitimación ideológica de la violencia.",
                NeurocognitiveProfile = "Marcada hiporreactividad límbica frente a imaginería gráfica dolorosa; atenuación sustancial de la conductancia electrodérmica y variabilidad de la frecuencia cardíaca (HRV). Desconexión de la corteza prefrontal medial en la asignación de valor a la vida del semejante.",
                AppliedCognitiveConstructs = new List<CognitiveConstructDetail>
                {
                    new()
                    {
                        ConstructName = "Anestesia Afectiva Crítica (Severe Affective Numbing)",
                        TheoreticalFramework = "Constructo de Apatía y Embotamiento Afectivo (Foa / Litz / Anderson)",
                        OperationalDefinition = "Pérdida radical de la capacidad para experimentar dolor emocional vicario ante la tortura, muerte o heridas de otros seres humanos.",
                        ManifestationInProfile = "Frialdad absoluta y 'mente en blanco'; el dolor de otros genera indiferencia total o placer morboso."
                    },
                    new()
                    {
                        ConstructName = "Deshumanización Sistemática de la Víctima (Dehumanization Construct)",
                        TheoreticalFramework = "Teoría de la Deshumanización (Haslam / Bandura)",
                        OperationalDefinition = "Percepción del ser humano sufriente como un objeto biológico inerte o un 'personaje' carente de mente, derechos o sensibilidad.",
                        ManifestationInProfile = "Cosificación de víctimas en foros gore, celebrando actos crueles como meros espectáculos visuales."
                    },
                    new()
                    {
                        ConstructName = "Búsqueda Compulsiva de Shock / Tolerancia Dopaminérgica (Sensation Seeking)",
                        TheoreticalFramework = "Modelo Neurobiológico de Dependencia a Estímulos Shock (Volkow / Zuckerman)",
                        OperationalDefinition = "Escalamiento en la crudeza del contenido consumido debido a que videos moderados ya no provocan ninguna activación nerviosa.",
                        ManifestationInProfile = "Inscripción en comunidades secretas de gore extremo, ejecuciones, accidentes sin censura y sitios shock especializados."
                    },
                    new()
                    {
                        ConstructName = "Erosión Crítica de la Teoría de la Mente Afectiva (Impaired Affective ToM)",
                        TheoreticalFramework = "Cognición Social y Mentalización (Frith & Frith / Baron-Cohen)",
                        OperationalDefinition = "Déficit en la inferencia y resonancia con los estados mentales de angustia y terror que experimenta la persona violentada.",
                        ManifestationInProfile = "Incapacidad para proyectar el sufrimiento hacia familiares propios o hacia el propio proyecto vital."
                    }
                },
                BehavioralIndicators = new List<string>
                {
                    "Total indiferencia, aburrimiento o frialdad emocional frente a asesinatos, desmembramientos o siniestros mortales.",
                    "Consumo rutinario deliberado en foros de gore explícito, canales oscuros de Telegram o sitios shock.",
                    "Justificación radical de agresiones violentas y ridiculización sistemática de las víctimas.",
                    "Impulso primario de grabar, monetizar o compartir agresiones presenciales sin experimentar miedo ni deseo de ayuda."
                },
                PsychoeducationalRecommendations = new List<string>
                {
                    "Intervención de Desintoxicación Digital Total: Cierre y desinstalación inmediata de canales shock y foros gore.",
                    "Se aconseja de forma prioritaria una evaluación por parte de un profesional de la salud mental (psicólogo clínico / neuropsicólogo).",
                    "Inmersión en proyectos de servicio prosocial y reconexión comunitaria para estimular circuitos de empatía presencial."
                },
                AppliedInterventions = new List<string>
                {
                    "Terapia Cognitivo-Conductual (CBT) Orientada a la Empatía: Desmontaje sistemático de mecanismos de distanciamiento moral y cosificación.",
                    "Entrenamiento en Conciencia Plena (Mindfulness) y Regulación Afectiva: Reconectar con sensaciones corporales genuinas bloqueadas.",
                    "Protocolos de Desensibilización Sistemática Inversa: Re-asociación guiada de imaginería dolorosa con valores prosociales y duelo saludable."
                }
            };
        }
    }
}
