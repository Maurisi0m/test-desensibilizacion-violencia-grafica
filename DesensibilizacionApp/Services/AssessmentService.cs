using DesensibilizacionApp.Models;

namespace DesensibilizacionApp.Services;

public class AssessmentService
{
    public static string GetScoreLabel(int score) => score switch
    {
        1 => "1 - Totalmente en desacuerdo / Nunca",
        2 => "2 - Rara vez",
        3 => "3 - Ocasionalmente / A veces",
        4 => "4 - Con frecuencia",
        5 => "5 - Totalmente de acuerdo / Siempre",
        _ => $"{score}"
    };

    public TestResult Evaluate(string alias, int age, List<Question> questions)
    {
        if (questions == null || questions.Count != 20)
        {
            throw new ArgumentException("El cuestionario debe contener exactamente 20 preguntas.", nameof(questions));
        }

        if (questions.Any(q => !q.IsAnswered))
        {
            throw new InvalidOperationException("No se han respondido todas las preguntas requeridas.");
        }

        AgeCohort cohort = AgeHelper.GetCohort(age);
        int totalRaw = questions.Sum(q => q.SelectedValue!.Value);

        // Subescalas (5 preguntas cada una, rango bruto 5 a 25)
        var passiveQuestions = questions.Where(q => q.Dimension == QuestionDimension.ExposicionPasivaAlgoritmica).ToList();
        var activeQuestions = questions.Where(q => q.Dimension == QuestionDimension.BusquedaActivaIntencional).ToList();
        var physiologicalQuestions = questions.Where(q => q.Dimension == QuestionDimension.ReactividadFisiologicaEmocional).ToList();
        var cognitiveQuestions = questions.Where(q => q.Dimension == QuestionDimension.NormalizacionCognitivaEmpatia).ToList();

        double CalculateSubscalePercentage(List<Question> list)
        {
            if (list.Count == 0) return 0.0;
            int sum = list.Sum(q => q.SelectedValue!.Value);
            int minPossible = list.Count * 1;
            int maxPossible = list.Count * 5;
            double pct = ((double)(sum - minPossible) / (maxPossible - minPossible)) * 100.0;
            return Math.Round(Math.Clamp(pct, 0.0, 100.0), 1);
        }

        double passiveScore = CalculateSubscalePercentage(passiveQuestions);
        double activeScore = CalculateSubscalePercentage(activeQuestions);
        double physiologicalScore = CalculateSubscalePercentage(physiologicalQuestions);
        double cognitiveScore = CalculateSubscalePercentage(cognitiveQuestions);

        // Índice Global de Desensibilización (IGD) normalizado a 0-100%
        // Min 20, Max 100
        double globalIndex = Math.Round(((double)(totalRaw - 20) / (100 - 20)) * 100.0, 1);
        globalIndex = Math.Clamp(globalIndex, 0.0, 100.0);

        var diagnostic = DiagnosticLevel.FromScore(globalIndex);

        var answerSummaries = questions.Select(q => new QuestionAnswerSummary
        {
            QuestionId = q.Id,
            Dimension = q.Dimension,
            QuestionText = q.GetText(cohort),
            Score = q.SelectedValue!.Value,
            ScoreLabel = GetScoreLabel(q.SelectedValue!.Value)
        }).ToList();

        return new TestResult
        {
            ParticipantAlias = string.IsNullOrWhiteSpace(alias) ? "Participante Anónimo" : alias.Trim(),
            Age = age,
            Cohort = cohort,
            EvaluatedAt = DateTime.Now,
            RawTotalScore = totalRaw,
            GlobalIndex = globalIndex,
            PassiveExposureIndex = passiveScore,
            ActiveSeekingIndex = activeScore,
            PhysiologicalNumbingIndex = physiologicalScore,
            CognitiveNormalizationIndex = cognitiveScore,
            Diagnostic = diagnostic,
            Answers = answerSummaries
        };
    }
}
