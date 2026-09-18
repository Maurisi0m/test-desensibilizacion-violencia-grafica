using System.IO;
using DesensibilizacionApp.Models;
using DesensibilizacionApp.Services;
using Xunit;

namespace DesensibilizacionApp.Tests;

public class AssessmentTests
{
    private readonly AssessmentService _assessmentService = new();

    [Fact]
    public void QuestionBank_ShouldContain20CalibratedQuestions_With5PerDimension()
    {
        var questions = QuestionBankService.CreateQuestionnaire();

        Assert.Equal(20, questions.Count);
        Assert.Equal(5, questions.Count(q => q.Dimension == QuestionDimension.ExposicionPasivaAlgoritmica));
        Assert.Equal(5, questions.Count(q => q.Dimension == QuestionDimension.BusquedaActivaIntencional));
        Assert.Equal(5, questions.Count(q => q.Dimension == QuestionDimension.ReactividadFisiologicaEmocional));
        Assert.Equal(5, questions.Count(q => q.Dimension == QuestionDimension.NormalizacionCognitivaEmpatia));

        foreach (var q in questions)
        {
            Assert.False(string.IsNullOrWhiteSpace(q.TextAdolescent));
            Assert.False(string.IsNullOrWhiteSpace(q.TextAdult));
            Assert.False(string.IsNullOrWhiteSpace(q.ContextHint));
        }
    }

    [Theory]
    [InlineData(12, AgeCohort.Adolescente)]
    [InlineData(15, AgeCohort.Adolescente)]
    [InlineData(17, AgeCohort.Adolescente)]
    [InlineData(18, AgeCohort.JovenAdulto)]
    [InlineData(25, AgeCohort.JovenAdulto)]
    [InlineData(29, AgeCohort.JovenAdulto)]
    public void AgeHelper_ShouldClassifyValidAgeRanges(int age, AgeCohort expectedCohort)
    {
        var cohort = AgeHelper.GetCohort(age);
        Assert.Equal(expectedCohort, cohort);
    }

    [Theory]
    [InlineData(11)]
    [InlineData(10)]
    [InlineData(30)]
    [InlineData(50)]
    public void AgeHelper_ShouldRejectOutOfRangeAges(int age)
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => AgeHelper.GetCohort(age));
    }

    [Fact]
    public void Evaluate_AllAnswersMinimum_ShouldYieldZeroPercentAndPreservedSensitivity()
    {
        var questions = QuestionBankService.CreateQuestionnaire();
        foreach (var q in questions)
        {
            q.SelectedValue = 1;
        }

        var result = _assessmentService.Evaluate("Test Min", 16, questions);

        Assert.Equal(20, result.RawTotalScore);
        Assert.Equal(0.0, result.GlobalIndex);
        Assert.Equal(0.0, result.PassiveExposureIndex);
        Assert.Equal(0.0, result.ActiveSeekingIndex);
        Assert.Equal(0.0, result.PhysiologicalNumbingIndex);
        Assert.Equal(0.0, result.CognitiveNormalizationIndex);
        Assert.Equal(SeverityLevel.SensibilidadPreservada, result.Diagnostic.Level);
    }

    [Fact]
    public void Evaluate_AllAnswersMaximum_ShouldYieldHundredPercentAndSevereLevel()
    {
        var questions = QuestionBankService.CreateQuestionnaire();
        foreach (var q in questions)
        {
            q.SelectedValue = 5;
        }

        var result = _assessmentService.Evaluate("Test Max", 22, questions);

        Assert.Equal(100, result.RawTotalScore);
        Assert.Equal(100.0, result.GlobalIndex);
        Assert.Equal(100.0, result.PassiveExposureIndex);
        Assert.Equal(100.0, result.ActiveSeekingIndex);
        Assert.Equal(100.0, result.PhysiologicalNumbingIndex);
        Assert.Equal(100.0, result.CognitiveNormalizationIndex);
        Assert.Equal(SeverityLevel.DesensibilizacionSevera, result.Diagnostic.Level);
    }

    [Fact]
    public void Evaluate_AllAnswersNeutral_ShouldYieldFiftyPercent()
    {
        var questions = QuestionBankService.CreateQuestionnaire();
        foreach (var q in questions)
        {
            q.SelectedValue = 3;
        }

        var result = _assessmentService.Evaluate("Test Neutral", 19, questions);

        Assert.Equal(60, result.RawTotalScore);
        Assert.Equal(50.0, result.GlobalIndex);
        Assert.Equal(50.0, result.PassiveExposureIndex);
        Assert.Equal(50.0, result.ActiveSeekingIndex);
        Assert.Equal(50.0, result.PhysiologicalNumbingIndex);
        Assert.Equal(50.0, result.CognitiveNormalizationIndex);
        Assert.Equal(SeverityLevel.DesensibilizacionSignificativa, result.Diagnostic.Level);
    }

    [Fact]
    public void Evaluate_PassiveDominance_DetectsAlgorithmicInfluence()
    {
        var questions = QuestionBankService.CreateQuestionnaire();
        foreach (var q in questions)
        {
            if (q.Dimension == QuestionDimension.ExposicionPasivaAlgoritmica)
            {
                q.SelectedValue = 5; // Max pasivo = 100%
            }
            else
            {
                q.SelectedValue = 1; // Otros = 0%
            }
        }

        var result = _assessmentService.Evaluate("Test Passive", 14, questions);

        Assert.Equal(100.0, result.PassiveExposureIndex);
        Assert.Equal(0.0, result.ActiveSeekingIndex);
        Assert.Contains("Algorítmica Pasiva", result.ConsumptionDominanceAnalysis);
    }

    [Fact]
    public void Evaluate_ActiveDominance_DetectsActiveSeeking()
    {
        var questions = QuestionBankService.CreateQuestionnaire();
        foreach (var q in questions)
        {
            if (q.Dimension == QuestionDimension.BusquedaActivaIntencional)
            {
                q.SelectedValue = 5; // Max activo = 100%
            }
            else
            {
                q.SelectedValue = 1; // Otros = 0%
            }
        }

        var result = _assessmentService.Evaluate("Test Active", 21, questions);

        Assert.Equal(0.0, result.PassiveExposureIndex);
        Assert.Equal(100.0, result.ActiveSeekingIndex);
        Assert.Contains("Búsqueda Activa", result.ConsumptionDominanceAnalysis);
    }

    [Fact]
    public void ReportExportService_GeneratesValidMarkdownAndHtml()
    {
        var questions = QuestionBankService.CreateQuestionnaire();
        foreach (var q in questions)
        {
            q.SelectedValue = 3;
        }

        var result = _assessmentService.Evaluate("Alex", 17, questions);

        string md = ReportExportService.GenerateMarkdownReport(result);
        string html = ReportExportService.GenerateHtmlReport(result);

        Assert.False(string.IsNullOrWhiteSpace(md));
        Assert.Contains("Alex", md);
        Assert.Contains("50.0%", md);

        Assert.False(string.IsNullOrWhiteSpace(html));
        Assert.Contains("Alex", html);
        Assert.Contains("<!DOCTYPE html>", html);
    }

    [Fact]
    public void MainViewModel_FullWorkflowSimulation_NavigatesAndCalculatesResults()
    {
        var vm = new DesensibilizacionApp.ViewModels.MainViewModel();
        Assert.True(vm.IsWelcomeScreen);

        vm.ParticipantAlias = "Usuario Pruebas";
        vm.SelectedAge = 19;
        Assert.Equal(AgeCohort.JovenAdulto, vm.CurrentCohort);

        // Start test
        vm.StartTestCommand.Execute(null);
        Assert.True(vm.IsQuestionnaireScreen);
        Assert.Equal(0, vm.CurrentQuestionIndex);

        // Answer each question
        for (int i = 0; i < 20; i++)
        {
            Assert.Equal(i, vm.CurrentQuestionIndex);
            Assert.False(string.IsNullOrWhiteSpace(vm.CurrentQuestionText));

            // Select option 4 (score 4)
            vm.SelectOptionCommand.Execute(4);
            Assert.True(vm.CanGoNext);

            // Execute next
            vm.NextQuestionCommand.Execute(null);
        }

        // Must now be on Results screen
        Assert.True(vm.IsResultsScreen);
        Assert.NotNull(vm.TestResult);
        Assert.Equal("Usuario Pruebas", vm.TestResult.ParticipantAlias);
        Assert.Equal(19, vm.TestResult.Age);
        Assert.Equal(80, vm.TestResult.RawTotalScore);
        Assert.Equal(75.0, vm.TestResult.GlobalIndex);
        Assert.Equal(SeverityLevel.DesensibilizacionSevera, vm.TestResult.Diagnostic.Level);

        // Export report
        vm.ExportReportCommand.Execute(null);
        Assert.True(vm.HasExportedFile);
        Assert.True(System.IO.File.Exists(vm.ExportedFilePath));

        // Restart test
        vm.RestartTestCommand.Execute(null);
        Assert.True(vm.IsWelcomeScreen);
        Assert.Null(vm.TestResult);
    }

    [Fact]
    public void AssessmentHistoryService_CanSaveLoadAndDelete()
    {
        string tempFile = Path.Combine(Path.GetTempPath(), $"history_test_{Guid.NewGuid():N}.json");
        try
        {
            var service = new AssessmentHistoryService(tempFile);
            var initial = service.LoadAll();
            Assert.Empty(initial);

            var sampleResult = new TestResult
            {
                ParticipantAlias = "Participante Test",
                Age = 20,
                Cohort = AgeCohort.JovenAdulto,
                EvaluatedAt = DateTime.Now,
                GlobalIndex = 62.5,
                Diagnostic = new DiagnosticLevel { Title = "Moderado-Alto", BadgeText = "MODERADO" },
                Answers = new List<QuestionAnswerSummary>
                {
                    new() { QuestionId = 1, Score = 4, QuestionText = "¿Ves violencia en Reels?", ScoreLabel = "4 - Con frecuencia" }
                }
            };

            service.Save(sampleResult);

            var loaded = service.LoadAll();
            Assert.Single(loaded);
            Assert.Equal("Participante Test", loaded[0].ParticipantAlias);
            Assert.Equal(62.5, loaded[0].GlobalIndex);
            Assert.Single(loaded[0].Answers);
            Assert.Equal("4 - Con frecuencia", loaded[0].Answers[0].ScoreLabel);

            service.Delete(sampleResult.EvaluatedAt, "Participante Test");
            var afterDelete = service.LoadAll();
            Assert.Empty(afterDelete);
        }
        finally
        {
            if (File.Exists(tempFile))
            {
                File.Delete(tempFile);
            }
        }
    }
}


