using DesensibilizacionApp.Models;

namespace DesensibilizacionApp.Services;

public class QuestionBankService
{
    public static List<Question> CreateQuestionnaire()
    {
        return new List<Question>
        {
            // ==========================================
            // DIMENSIÓN 1: EXPOSICIÓN PASIVA ALGORÍTMICA (EA-I)
            // ==========================================
            new Question
            {
                Id = 1,
                Dimension = QuestionDimension.ExposicionPasivaAlgoritmica,
                TextAdolescent = "En TikTok, Reels o historias me aparecen con frecuencia videos de peleas de escuela, asaltos o accidentes fuertes sin que yo los busque.",
                TextAdult = "En mis feeds de redes sociales (X/Twitter, Reels, TikTok o Facebook) me topo de improviso con videos de agresiones físicas, accidentes o violencia explícita.",
                ContextHint = "Evalúa la frecuencia con la que los algoritmos te muestran violencia sin tu consentimiento previo."
            },
            new Question
            {
                Id = 2,
                Dimension = QuestionDimension.ExposicionPasivaAlgoritmica,
                TextAdolescent = "Cuando me sale de golpe un video sangriento o de un choque en el 'Para Ti' de TikTok/Instagram, me quedo viéndolo hasta que termina.",
                TextAdult = "Al toparme con un video con contenido gráfico o sangre en mis noticias, suelo reproducirlo completo en lugar de deslizarlo de inmediato.",
                ContextHint = "Mide si tu reflejo inmediato es omitir o quedarte por curiosidad pasiva."
            },
            new Question
            {
                Id = 3,
                Dimension = QuestionDimension.ExposicionPasivaAlgoritmica,
                TextAdolescent = "En grupos de WhatsApp o Discord con mis compañeros es común que manden videos de peleas callejeras, golpizas o caídas graves.",
                TextAdult = "En grupos de mensajería compartidos (WhatsApp, Telegram o chats de amigos) recibo con regularidad videos gráficos de altercados o catástrofes.",
                ContextHint = "Mide la exposición social indirecta a través de tus círculos de pares."
            },
            new Question
            {
                Id = 4,
                Dimension = QuestionDimension.ExposicionPasivaAlgoritmica,
                TextAdolescent = "Siento que ver sangre o golpes en el teléfono se ha vuelto tan normal que ya nada me asusta en redes.",
                TextAdult = "La presencia de imágenes sangrientas o eventos violentos en internet me resulta tan rutinaria que rara vez me causa desconcierto.",
                ContextHint = "Mide la percepción de saturación cotidiana de violencia mediática."
            },
            new Question
            {
                Id = 5,
                Dimension = QuestionDimension.ExposicionPasivaAlgoritmica,
                TextAdolescent = "Cuando la aplicación pone la pantalla borrosa con advertencia de 'Contenido Delicado', casi siempre le doy clic a 'Ver de todas formas'.",
                TextAdult = "Frente a filtros de advertencia por 'Contenido Gráfico/Sensible', elijo casi sistemáticamente desbloquear y visualizar el material.",
                ContextHint = "Mide si la barrera de advertencia institucional detiene o atrae tu consumo."
            },

            // ==========================================
            // DIMENSIÓN 2: BÚSQUEDA ACTIVA E INTENCIONAL (BA-C)
            // ==========================================
            new Question
            {
                Id = 6,
                Dimension = QuestionDimension.BusquedaActivaIntencional,
                TextAdolescent = "Si escucho que hubo una pelea o tragedia cerca o en internet, busco el video 'sin censura' para ver cómo pasó exactamente.",
                TextAdult = "Tras enterarme de un hecho violento de alto impacto en las noticias, dedico tiempo a buscar el metraje original crudo y sin cortes.",
                ContextHint = "Mide la iniciativa de búsqueda deliberada motivada por curiosidad mórbida."
            },
            new Question
            {
                Id = 7,
                Dimension = QuestionDimension.BusquedaActivaIntencional,
                TextAdolescent = "He entrado o sigo canales de Telegram, foros o páginas donde solo suben videos sangrientos o de peleas pesadas.",
                TextAdult = "Formo o he formado parte de foros, comunidades (como Reddit gore, canales shock en Telegram o sitios shock) dedicados a contenido explícito.",
                ContextHint = "Mide la suscripción consciente a canales no moderados de violencia extrema."
            },
            new Question
            {
                Id = 8,
                Dimension = QuestionDimension.BusquedaActivaIntencional,
                TextAdolescent = "Le he pedido a amigos que me pasen por privado algún video violento que se hizo viral y que borraron de las redes.",
                TextAdult = "He solicitado activamente a conocidos o contactos que me compartan enlaces o archivos de grabaciones violentas censuradas.",
                ContextHint = "Mide la proactividad interpersonal en la obtención de material gráfico restringido."
            },
            new Question
            {
                Id = 9,
                Dimension = QuestionDimension.BusquedaActivaIntencional,
                TextAdolescent = "A veces navego por internet buscando videos de accidentes fuertes o peleas solo por aburrimiento o para pasar el rato.",
                TextAdult = "He recurrido a visualizar recopilaciones de incidentes violentos, tiroteos o siniestros viales como pasatiempo deliberado.",
                ContextHint = "Evalúa la violencia gráfica como forma de entretenimiento o estimulación dopaminérgica."
            },
            new Question
            {
                Id = 10,
                Dimension = QuestionDimension.BusquedaActivaIntencional,
                TextAdolescent = "Cuando sale un video muy fuerte que todos comentan, siento la necesidad de verlo para 'no quedarme atrás' o para ver qué tan valiente soy.",
                TextAdult = "He consumido material gráfico extremo con la intención de poner a prueba mi propia resistencia estomacal o por presión de pertenencia.",
                ContextHint = "Mide el consumo violento como prueba de estatus o tolerancia psicológica."
            },

            // ==========================================
            // DIMENSIÓN 3: REACTIVIDAD FISIOLÓGICA Y EMOCIONAL (RF-E)
            // ==========================================
            new Question
            {
                Id = 11,
                Dimension = QuestionDimension.ReactividadFisiologicaEmocional,
                TextAdolescent = "Puedo estar comiendo una botana o almorzando mientras veo un video con sangre o heridas graves sin que me dé asco ni se me quite el hambre.",
                TextAdult = "Tengo la capacidad de ingerir alimentos o realizar mis actividades habituales mientras veo grabaciones de lesiones graves sin náuseas.",
                ContextHint = "Mide la inhibición del reflejo aversivo visceral gástrico."
            },
            new Question
            {
                Id = 12,
                Dimension = QuestionDimension.ReactividadFisiologicaEmocional,
                TextAdolescent = "A diferencia de antes, ver gente golpeándose salvajemente o herida ya no hace que mi corazón lata rápido ni que me suden las manos.",
                TextAdult = "Observar violencia corporal extrema ya no activa en mí respuestas autonómicas simpáticas (taquicardia, sudoración o tensión muscular).",
                ContextHint = "Mide la habituación del sistema nervioso simpático ante estímulos amenazantes."
            },
            new Question
            {
                Id = 13,
                Dimension = QuestionDimension.ReactividadFisiologicaEmocional,
                TextAdolescent = "Después de ver un video perturbador en el celular, puedo apagar la pantalla y dormirme tranquilamente sin que me dé miedo ni pesadillas.",
                TextAdult = "El consumo de contenido con muerte o daño físico no me genera rumiación nocturna, insomnio ni imágenes intrusivas posteriores.",
                ContextHint = "Mide la ausencia de impacto post-exposición en el ciclo del sueño y procesamiento emocional."
            },
            new Question
            {
                Id = 14,
                Dimension = QuestionDimension.ReactividadFisiologicaEmocional,
                TextAdolescent = "Noto que a mis amigos o familia les da mucho asco o tristeza ver cosas que a mí me parecen de lo más normales.",
                TextAdult = "Reconozco que el umbral de impresión de mis pares y familiares es mucho más sensible que el mío frente a escenas cruentas.",
                ContextHint = "Mide la percepción diferencial de insensibilidad en comparación con tu entorno social."
            },
            new Question
            {
                Id = 15,
                Dimension = QuestionDimension.ReactividadFisiologicaEmocional,
                TextAdolescent = "Siento una especie de 'mente en blanco' o frialdad cuando veo personas lastimadas en pantalla; no siento nada.",
                TextAdult = "Experimento un estado de neutralidad afectiva o anestesia emocional inmediata cuando observo sufrimiento humano explícito.",
                ContextHint = "Mide el embotamiento emocional y desapego del afecto espontáneo."
            },

            // ==========================================
            // DIMENSIÓN 4: NORMALIZACIÓN COGNITIVA Y DESCONEXIÓN EMPÁTICA (NC-D)
            // ==========================================
            new Question
            {
                Id = 16,
                Dimension = QuestionDimension.NormalizacionCognitivaEmpatia,
                TextAdolescent = "Me he reído o he compartido memes, stickers o videos graciosos que usan como base un accidente o una golpiza real.",
                TextAdult = "He interactuado positivamente (risas, reenvíos, comentarios sarcásticos) con memes derivados de desgracias o agresiones reales.",
                ContextHint = "Evalúa la trivialización y conversión de la tragedia humana en contenido lúdico."
            },
            new Question
            {
                Id = 17,
                Dimension = QuestionDimension.NormalizacionCognitivaEmpatia,
                TextAdolescent = "Pienso que la violencia en internet no debería censurarse porque 'así es la vida real y hay que aguantar'.",
                TextAdult = "Considero que la exposición a violencia explícita es un reflejo fáctico del mundo que no debería restringirse bajo criterios de sensibilidad.",
                ContextHint = "Mide la legitimación cognitiva e ideológica de la violencia no mediada."
            },
            new Question
            {
                Id = 18,
                Dimension = QuestionDimension.NormalizacionCognitivaEmpatia,
                TextAdolescent = "Muchas veces, cuando veo que a alguien le pasa algo malo en un video, pienso que 'por tonto' o por meterse donde no debía se lo merecía.",
                TextAdult = "Tiendo a inferir que las víctimas en grabaciones violentas son responsables de su destino ('sesgo de mundo justo' o culpabilización de la víctima).",
                ContextHint = "Mide la atribución culposa a la víctima como mecanismo de distanciamiento moral."
            },
            new Question
            {
                Id = 19,
                Dimension = QuestionDimension.NormalizacionCognitivaEmpatia,
                TextAdolescent = "Me cuesta sentir tristeza o lástima por personas que no conozco cuando las veo heridas o llorando en videos de redes.",
                TextAdult = "Encuentro difícil activar una respuesta de compasión o dolor vicario ante el padecimiento de desconocidos en entornos virtuales.",
                ContextHint = "Mide la erosión de la capacidad de compasión vicaria."
            },
            new Question
            {
                Id = 20,
                Dimension = QuestionDimension.NormalizacionCognitivaEmpatia,
                TextAdolescent = "Si empezara una pelea brutal frente a mí en la calle o escuela, lo primero que haría sería sacar el celular para grabarlo y subirlo.",
                TextAdult = "Ante un incidente violento en el entorno presencial, mi primer impulso conductual sería documentar la escena para redes antes de alarmarme o auxiliar.",
                ContextHint = "Mide la priorización de la mediatización y espectáculo por encima del auxilio prosocial real."
            }
        };
    }
}
