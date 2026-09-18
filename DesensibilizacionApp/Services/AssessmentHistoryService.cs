using System.IO;
using System.Text.Json;
using DesensibilizacionApp.Models;

namespace DesensibilizacionApp.Services;

public class AssessmentHistoryService
{
    private readonly string _storageFilePath;
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        WriteIndented = true,
        PropertyNameCaseInsensitive = true
    };

    public AssessmentHistoryService(string? customPath = null)
    {
        if (!string.IsNullOrEmpty(customPath))
        {
            _storageFilePath = customPath;
        }
        else
        {
            string baseDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data");
            Directory.CreateDirectory(baseDir);
            _storageFilePath = Path.Combine(baseDir, "historial_evaluaciones.json");
        }
    }

    public List<TestResult> LoadAll()
    {
        try
        {
            if (!File.Exists(_storageFilePath))
            {
                return new List<TestResult>();
            }

            string json = File.ReadAllText(_storageFilePath);
            if (string.IsNullOrWhiteSpace(json))
            {
                return new List<TestResult>();
            }

            var list = JsonSerializer.Deserialize<List<TestResult>>(json, JsonOptions);
            return list?.OrderByDescending(x => x.EvaluatedAt).ToList() ?? new List<TestResult>();
        }
        catch
        {
            return new List<TestResult>();
        }
    }

    public void Save(TestResult result)
    {
        try
        {
            var existing = LoadAll();
            existing.Insert(0, result);

            string dir = Path.GetDirectoryName(_storageFilePath)!;
            Directory.CreateDirectory(dir);

            string json = JsonSerializer.Serialize(existing, JsonOptions);
            File.WriteAllText(_storageFilePath, json);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"Error guardando historial: {ex.Message}");
        }
    }

    public void Delete(DateTime evaluatedAt, string alias)
    {
        try
        {
            var existing = LoadAll();
            existing.RemoveAll(x => x.EvaluatedAt == evaluatedAt && x.ParticipantAlias == alias);

            string json = JsonSerializer.Serialize(existing, JsonOptions);
            File.WriteAllText(_storageFilePath, json);
        }
        catch (Exception ex)
        {
            System.Diagnostics.Debug.WriteLine($"Error eliminando del historial: {ex.Message}");
        }
    }
}
