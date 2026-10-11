namespace DesensibilizacionApp.Models;

public class QuestionAnswerSummary
{
    public int QuestionId { get; set; }
    public QuestionDimension Dimension { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public int Score { get; set; }
    public string ScoreLabel { get; set; } = string.Empty;
}

public class TestResult
{
    public string ParticipantAlias { get; set; } = "Anónimo";
    public int Age { get; set; }
    public AgeCohort Cohort { get; set; }
    public DateTime EvaluatedAt { get; set; } = DateTime.Now;

    public int RawTotalScore { get; set; } // 20 a 100
    public double GlobalIndex { get; set; } // 0% a 100%

    // Subíndices por dimensión (0 a 100%)
    public double PassiveExposureIndex { get; set; }
    public double ActiveSeekingIndex { get; set; }
    public double PhysiologicalNumbingIndex { get; set; }
    public double CognitiveNormalizationIndex { get; set; }

    public DiagnosticLevel Diagnostic { get; set; } = new();

    public List<QuestionAnswerSummary> Answers { get; set; } = new();

    /// <summary>
    /// Análisis de la fuente predominante de desensibilización:
    /// ¿Se debe más al algoritmo pasivo (Reels/TikTok/X) o a la búsqueda deliberada (Telegram/gore/shock)?
    /// </summary>
    public double ConsumptionBalanceIndex => Math.Round(ActiveSeekingIndex - PassiveExposureIndex, 1);

    public string EthicalDisclaimer { get; set; } = "Este resultado es de carácter orientativo, psicoeducativo y de autoevaluación. Se basa en indicadores autoinformados y no constituye un diagnóstico psicológico, psiquiátrico o clínico formal. Los rangos interpretativos corresponden a una fase experimental preliminar sujeta a baremación en muestra normativa.";

    /// <summary>
    /// Índice de Balance de Consumo (IBC = BA-C - EA-I)
    /// </summary>
    public string ConsumptionDominanceAnalysis
    {
        get
        {
            double ibc = ConsumptionBalanceIndex;
            if (ibc < -15.0)
            {
                return "Predominio de Exposición Incidental: El consumo está impulsado primordialmente por el flujo algorítmico y recomendaciones automáticas en redes sociales, sin una intencionalidad deliberada de búsqueda cruenta.";
            }
            else if (ibc > 15.0)
            {
                return "Predominio de Búsqueda Activa: El consumo presenta una iniciativa personal deliberada de consulta de material gráfico en canales de mensajería, grupos o foros específicos.";
            }
            else
            {
                return "Patrón Mixto / Balanceado: Existe una interacción equilibrada entre la recepción involuntaria de contenidos en feeds y la interacción o consulta ocasional por iniciativa propia.";
            }
        }
    }
}
