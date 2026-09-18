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
    public string ConsumptionDominanceAnalysis
    {
        get
        {
            double diff = ActiveSeekingIndex - PassiveExposureIndex;
            if (Math.Abs(diff) < 10.0)
            {
                return "Perfil Mixto Equilibrado: Tu desensibilización se alimenta tanto de lo que los algoritmos te muestran de improviso como de tu propia iniciativa de búsqueda.";
            }
            else if (diff > 0)
            {
                return "Predominio de Búsqueda Activa e Intencional: Tu nivel de desensibilización está impulsado principalmente por curiosidad mórbida personal, acceso deliberado a canales/foros o petición activa de material violento a terceros.";
            }
            else
            {
                return "Predominio de Inundación Algorítmica Pasiva: Tu desensibilización es mayormente incidental, provocada por la saturación de videos de peleas, accidentes y agresiones en feeds de redes sociales (Reels, TikTok, X) sin que necesariamente las busques.";
            }
        }
    }
}
