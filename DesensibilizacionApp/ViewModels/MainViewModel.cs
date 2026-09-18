using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Runtime.CompilerServices;
using System.Windows.Input;
using DesensibilizacionApp.Models;
using DesensibilizacionApp.Services;

namespace DesensibilizacionApp.ViewModels;

public enum AppScreenState
{
    Welcome,
    Questionnaire,
    Results,
    History
}

public class MainViewModel : INotifyPropertyChanged
{
    private readonly AssessmentService _assessmentService = new();
    private readonly AssessmentHistoryService _historyService = new();
    
    private AppScreenState _currentScreen = AppScreenState.Welcome;
    private string _participantAlias = string.Empty;
    private int _selectedAge = 16;
    private int _currentQuestionIndex = 0;
    private Question? _currentQuestion;
    private TestResult? _testResult;
    private TestResult? _selectedHistoryTest;
    private string _statusMessage = string.Empty;
    private string _exportedFilePath = string.Empty;

    public MainViewModel()
    {
        Ages = new ObservableCollection<int>(Enumerable.Range(12, 18)); // 12 a 29
        Questions = new ObservableCollection<Question>();
        HistoryTests = new ObservableCollection<TestResult>();

        StartTestCommand = new RelayCommand(StartTest);
        SelectOptionCommand = new RelayCommand(param => SelectOption(param));
        NextQuestionCommand = new RelayCommand(NextQuestion, () => CanGoNext);
        PreviousQuestionCommand = new RelayCommand(PreviousQuestion, () => CanGoPrevious);
        RestartTestCommand = new RelayCommand(RestartTest);
        ExportReportCommand = new RelayCommand(ExportReport);
        OpenFileCommand = new RelayCommand(OpenFile, () => !string.IsNullOrEmpty(ExportedFilePath));
        OpenFolderCommand = new RelayCommand(OpenFolder);

        // History Commands
        OpenHistoryCommand = new RelayCommand(OpenHistory);
        BackFromHistoryCommand = new RelayCommand(BackFromHistory);
        SelectHistoryTestCommand = new RelayCommand(param =>
        {
            if (param is TestResult tr)
            {
                SelectedHistoryTest = tr;
            }
        });
        DeleteHistoryTestCommand = new RelayCommand(DeleteSelectedHistoryTest, () => SelectedHistoryTest != null);
        ExportSelectedHistoryReportCommand = new RelayCommand(ExportSelectedHistoryReport, () => SelectedHistoryTest != null);

        // Precargar cuestionario y registros existentes
        ResetQuestions();
        LoadHistory();
    }

    public ObservableCollection<int> Ages { get; }
    public ObservableCollection<Question> Questions { get; }
    public ObservableCollection<TestResult> HistoryTests { get; }

    public AppScreenState CurrentScreen
    {
        get => _currentScreen;
        set
        {
            if (_currentScreen != value)
            {
                _currentScreen = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(IsWelcomeScreen));
                OnPropertyChanged(nameof(IsQuestionnaireScreen));
                OnPropertyChanged(nameof(IsResultsScreen));
                OnPropertyChanged(nameof(IsHistoryScreen));
            }
        }
    }

    public bool IsWelcomeScreen => CurrentScreen == AppScreenState.Welcome;
    public bool IsQuestionnaireScreen => CurrentScreen == AppScreenState.Questionnaire;
    public bool IsResultsScreen => CurrentScreen == AppScreenState.Results;
    public bool IsHistoryScreen => CurrentScreen == AppScreenState.History;

    public string ParticipantAlias
    {
        get => _participantAlias;
        set
        {
            if (_participantAlias != value)
            {
                _participantAlias = value;
                OnPropertyChanged();
            }
        }
    }

    public int SelectedAge
    {
        get => _selectedAge;
        set
        {
            if (_selectedAge != value)
            {
                _selectedAge = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(CohortName));
                OnPropertyChanged(nameof(CohortDescription));
                OnPropertyChanged(nameof(CurrentQuestionText));
            }
        }
    }

    public AgeCohort CurrentCohort => AgeHelper.GetCohort(SelectedAge);
    public string CohortName => CurrentCohort == AgeCohort.Adolescente ? "Adolescentes (12-17 años)" : "Jóvenes Adultos (18-29 años)";
    public string CohortDescription => CurrentCohort == AgeCohort.Adolescente
        ? "Preguntas contextualizadas para dinámicas escolares, TikTok, Reels, Discord y chats grupales de pares."
        : "Preguntas contextualizadas para consumo autónomo, feeds de X, Telegram, Reddit y entorno universitario/social.";

    public int CurrentQuestionIndex
    {
        get => _currentQuestionIndex;
        set
        {
            if (_currentQuestionIndex != value)
            {
                _currentQuestionIndex = value;
                OnPropertyChanged();
                UpdateCurrentQuestion();
            }
        }
    }

    public Question? CurrentQuestion
    {
        get => _currentQuestion;
        set
        {
            if (_currentQuestion != value)
            {
                _currentQuestion = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(CurrentQuestionText));
                OnPropertyChanged(nameof(CurrentQuestionNumberText));
                OnPropertyChanged(nameof(ProgressPercentage));
                OnPropertyChanged(nameof(DimensionTitle));
                OnPropertyChanged(nameof(DimensionBadgeColor));
                OnPropertyChanged(nameof(DimensionShortCode));
                OnPropertyChanged(nameof(IsOption1Selected));
                OnPropertyChanged(nameof(IsOption2Selected));
                OnPropertyChanged(nameof(IsOption3Selected));
                OnPropertyChanged(nameof(IsOption4Selected));
                OnPropertyChanged(nameof(IsOption5Selected));
                OnPropertyChanged(nameof(CanGoNext));
                OnPropertyChanged(nameof(CanGoPrevious));
                OnPropertyChanged(nameof(NextButtonText));
            }
        }
    }

    public string CurrentQuestionText => CurrentQuestion?.GetText(CurrentCohort) ?? string.Empty;
    public string CurrentQuestionNumberText => $"Pregunta {CurrentQuestionIndex + 1} de {Questions.Count}";
    public double ProgressPercentage => Questions.Count == 0 ? 0 : ((CurrentQuestionIndex + 1) / (double)Questions.Count) * 100.0;
    public string DimensionTitle => CurrentQuestion?.Dimension.GetTitle() ?? string.Empty;
    public string DimensionBadgeColor => CurrentQuestion?.Dimension.GetBadgeColor() ?? "#64748B";
    public string DimensionShortCode => CurrentQuestion?.Dimension.GetShortCode() ?? "";

    public bool IsOption1Selected => CurrentQuestion?.SelectedValue == 1;
    public bool IsOption2Selected => CurrentQuestion?.SelectedValue == 2;
    public bool IsOption3Selected => CurrentQuestion?.SelectedValue == 3;
    public bool IsOption4Selected => CurrentQuestion?.SelectedValue == 4;
    public bool IsOption5Selected => CurrentQuestion?.SelectedValue == 5;

    public bool CanGoPrevious => CurrentQuestionIndex > 0;
    public bool CanGoNext => CurrentQuestion?.IsAnswered == true;
    public string NextButtonText => CurrentQuestionIndex == Questions.Count - 1 ? "Finalizar y Guardar Resultados" : "Siguiente Pregunta →";

    public TestResult? TestResult
    {
        get => _testResult;
        set
        {
            if (_testResult != value)
            {
                _testResult = value;
                OnPropertyChanged();
            }
        }
    }

    public TestResult? SelectedHistoryTest
    {
        get => _selectedHistoryTest;
        set
        {
            if (_selectedHistoryTest != value)
            {
                _selectedHistoryTest = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(HasSelectedHistoryTest));
                (DeleteHistoryTestCommand as RelayCommand)?.RaiseCanExecuteChanged();
                (ExportSelectedHistoryReportCommand as RelayCommand)?.RaiseCanExecuteChanged();
            }
        }
    }

    public bool HasSelectedHistoryTest => SelectedHistoryTest != null;
    public int TotalSavedTestsCount => HistoryTests.Count;
    public string HistoryBadgeText => TotalSavedTestsCount == 1 ? "1 Test Registrado" : $"{TotalSavedTestsCount} Tests Registrados";

    public string StatusMessage
    {
        get => _statusMessage;
        set
        {
            if (_statusMessage != value)
            {
                _statusMessage = value;
                OnPropertyChanged();
            }
        }
    }

    public string ExportedFilePath
    {
        get => _exportedFilePath;
        set
        {
            if (_exportedFilePath != value)
            {
                _exportedFilePath = value;
                OnPropertyChanged();
                OnPropertyChanged(nameof(HasExportedFile));
            }
        }
    }

    public bool HasExportedFile => !string.IsNullOrEmpty(ExportedFilePath);

    // Commands
    public ICommand StartTestCommand { get; }
    public ICommand SelectOptionCommand { get; }
    public ICommand NextQuestionCommand { get; }
    public ICommand PreviousQuestionCommand { get; }
    public ICommand RestartTestCommand { get; }
    public ICommand ExportReportCommand { get; }
    public ICommand OpenFileCommand { get; }
    public ICommand OpenFolderCommand { get; }

    // History Commands
    public ICommand OpenHistoryCommand { get; }
    public ICommand BackFromHistoryCommand { get; }
    public ICommand SelectHistoryTestCommand { get; }
    public ICommand DeleteHistoryTestCommand { get; }
    public ICommand ExportSelectedHistoryReportCommand { get; }

    private void ResetQuestions()
    {
        Questions.Clear();
        foreach (var q in QuestionBankService.CreateQuestionnaire())
        {
            Questions.Add(q);
        }
        CurrentQuestionIndex = 0;
        UpdateCurrentQuestion();
    }

    private void UpdateCurrentQuestion()
    {
        if (Questions.Count > 0 && CurrentQuestionIndex >= 0 && CurrentQuestionIndex < Questions.Count)
        {
            CurrentQuestion = Questions[CurrentQuestionIndex];
        }
    }

    public void LoadHistory()
    {
        HistoryTests.Clear();
        var items = _historyService.LoadAll();
        foreach (var item in items)
        {
            HistoryTests.Add(item);
        }
        if (HistoryTests.Count > 0 && SelectedHistoryTest == null)
        {
            SelectedHistoryTest = HistoryTests[0];
        }
        OnPropertyChanged(nameof(TotalSavedTestsCount));
        OnPropertyChanged(nameof(HistoryBadgeText));
    }

    private void StartTest()
    {
        ResetQuestions();
        StatusMessage = string.Empty;
        ExportedFilePath = string.Empty;
        CurrentScreen = AppScreenState.Questionnaire;
    }

    private void SelectOption(object? param)
    {
        if (CurrentQuestion == null) return;

        if (param is string s && int.TryParse(s, out int score))
        {
            CurrentQuestion.SelectedValue = score;
        }
        else if (param is int i)
        {
            CurrentQuestion.SelectedValue = i;
        }

        OnPropertyChanged(nameof(IsOption1Selected));
        OnPropertyChanged(nameof(IsOption2Selected));
        OnPropertyChanged(nameof(IsOption3Selected));
        OnPropertyChanged(nameof(IsOption4Selected));
        OnPropertyChanged(nameof(IsOption5Selected));
        OnPropertyChanged(nameof(CanGoNext));
        (NextQuestionCommand as RelayCommand)?.RaiseCanExecuteChanged();
    }

    private void NextQuestion()
    {
        if (!CanGoNext) return;

        if (CurrentQuestionIndex < Questions.Count - 1)
        {
            CurrentQuestionIndex++;
        }
        else
        {
            FinishTest();
        }
    }

    private void PreviousQuestion()
    {
        if (CanGoPrevious)
        {
            CurrentQuestionIndex--;
        }
    }

    private void FinishTest()
    {
        try
        {
            TestResult = _assessmentService.Evaluate(
                string.IsNullOrWhiteSpace(ParticipantAlias) ? "Participante" : ParticipantAlias,
                SelectedAge,
                Questions.ToList()
            );

            // Registro automático en almacenamiento permanente
            _historyService.Save(TestResult);
            LoadHistory();
            SelectedHistoryTest = TestResult;

            CurrentScreen = AppScreenState.Results;
            StatusMessage = "¡Evaluación completada y registrada exitosamente en el historial! Puedes consultar sus respuestas en cualquier momento.";
        }
        catch (Exception ex)
        {
            StatusMessage = $"Error al calcular resultados: {ex.Message}";
        }
    }

    private void RestartTest()
    {
        ResetQuestions();
        TestResult = null;
        StatusMessage = string.Empty;
        ExportedFilePath = string.Empty;
        CurrentScreen = AppScreenState.Welcome;
    }

    private void OpenHistory()
    {
        LoadHistory();
        CurrentScreen = AppScreenState.History;
    }

    private void BackFromHistory()
    {
        if (TestResult != null)
        {
            CurrentScreen = AppScreenState.Results;
        }
        else
        {
            CurrentScreen = AppScreenState.Welcome;
        }
    }

    private void DeleteSelectedHistoryTest()
    {
        if (SelectedHistoryTest == null) return;

        _historyService.Delete(SelectedHistoryTest.EvaluatedAt, SelectedHistoryTest.ParticipantAlias);
        SelectedHistoryTest = null;
        LoadHistory();
        StatusMessage = "Evaluación eliminada del registro.";
    }

    private void ExportSelectedHistoryReport()
    {
        if (SelectedHistoryTest == null) return;

        try
        {
            string exportDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Reportes");
            string generatedHtml = ReportExportService.SaveReportToFile(SelectedHistoryTest, exportDir);
            ExportedFilePath = generatedHtml;
            StatusMessage = $"Informe de '{SelectedHistoryTest.ParticipantAlias}' exportado con éxito.";
        }
        catch (Exception ex)
        {
            StatusMessage = $"Error al exportar: {ex.Message}";
        }
    }

    private void ExportReport()
    {
        if (TestResult == null) return;

        try
        {
            string exportDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Reportes");
            string generatedHtml = ReportExportService.SaveReportToFile(TestResult, exportDir);
            ExportedFilePath = generatedHtml;
            StatusMessage = $"¡Informe exportado con éxito en formato HTML y Markdown!";
        }
        catch (Exception ex)
        {
            StatusMessage = $"Error al exportar reporte: {ex.Message}";
        }
    }

    private void OpenFile()
    {
        if (string.IsNullOrEmpty(ExportedFilePath) || !File.Exists(ExportedFilePath)) return;

        try
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = ExportedFilePath,
                UseShellExecute = true
            });
        }
        catch (Exception ex)
        {
            StatusMessage = $"No se pudo abrir el archivo: {ex.Message}";
        }
    }

    private void OpenFolder()
    {
        try
        {
            string exportDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Reportes");
            if (!Directory.Exists(exportDir))
            {
                Directory.CreateDirectory(exportDir);
            }

            Process.Start(new ProcessStartInfo
            {
                FileName = exportDir,
                UseShellExecute = true
            });
        }
        catch (Exception ex)
        {
            StatusMessage = $"No se pudo abrir la carpeta: {ex.Message}";
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    protected void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
