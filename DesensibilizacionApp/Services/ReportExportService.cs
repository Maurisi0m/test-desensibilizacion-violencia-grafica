using System.IO;
using System.Text;
using DesensibilizacionApp.Models;

namespace DesensibilizacionApp.Services;

public class ReportExportService
{
    public static string GenerateMarkdownReport(TestResult result)
    {
        var sb = new StringBuilder();
        sb.AppendLine("# INFORME DE INDICADORES AUTOINFORMADOS: EXPOSICIÓN Y HABITUACIÓN A LA VIOLENCIA GRÁFICA");
        sb.AppendLine("Instrumento: ED-CVG — Escala de Indicadores de Desensibilización y Habituación a la Violencia Gráfica Digital (12–29 años)");
        sb.AppendLine($"Fecha de Evaluación: {result.EvaluatedAt:yyyy-MM-dd HH:mm:ss}");
        sb.AppendLine();
        sb.AppendLine("> **AVISO METODOLÓGICO Y ÉTICO:** Este instrumento evalúa indicadores autoinformados con propósitos psicoeducativos y de autoevaluación. **No constituye un diagnóstico clínico, psicológico o psiquiátrico formal.** Los puntos de corte corresponden a una fase experimental preliminar sujeta a validación psicométrica normativa.");
        sb.AppendLine();
        sb.AppendLine("## DATOS DEL PARTICIPANTE");
        sb.AppendLine($"- **Identificador / Alias:** {result.ParticipantAlias}");
        sb.AppendLine($"- **Edad:** {result.Age} años");
        sb.AppendLine($"- **Cohorte Poblacional:** {AgeHelper.GetCohortDescription(result.Cohort)}");
        sb.AppendLine();
        sb.AppendLine("## 1. RESULTADO CUANTITATIVO GLOBAL");
        sb.AppendLine($"| Indicador | Puntuación Bruta | Escala Normalizada (0-100%) | Rango Interpretativo Preliminar |");
        sb.AppendLine($"| :--- | :---: | :---: | :--- |");
        sb.AppendLine($"| **Índice Global de Desensibilización (IGD)** | {result.RawTotalScore} / 100 | **{result.GlobalIndex:F1}%** | **{result.Diagnostic.BadgeText}** |");
        sb.AppendLine();
        sb.AppendLine("## 2. PUNTUACIÓN DE PERFIL (4 SUBESCALAS PSICOMÉTRICAS)");
        sb.AppendLine("| Dimensión Evaluada | Puntuación (0-100%) | Definición Operativa |");
        sb.AppendLine("| :--- | :---: | :--- |");
        sb.AppendLine($"| **Exposición Algorítmica Incidental (EA-I)** | {result.PassiveExposureIndex:F1}% | Frecuencia con la que el usuario encuentra contenido violento sin buscarlo deliberadamente |");
        sb.AppendLine($"| **Búsqueda Activa y Curiosidad (BA-C)** | {result.ActiveSeekingIndex:F1}% | Tendencia a buscar deliberadamente contenido violento o particularmente gráfico |");
        sb.AppendLine($"| **Reactividad Emocional Autopercibida (RE-A)** | {result.PhysiologicalNumbingIndex:F1}% | Cambios percibidos en asco, sobresalto, activación emocional y respuesta corporal |");
        sb.AppendLine($"| **Normalización Cognitiva de la Violencia Digital (NC-D)** | {result.CognitiveNormalizationIndex:F1}% | Grado en que el usuario percibe la violencia digital como normal, justificable o trivial |");
        sb.AppendLine();
        sb.AppendLine($"## 3. ÍNDICE DE BALANCE DE CONSUMO (IBC = BA-C - EA-I: {result.ConsumptionBalanceIndex:F1}%)");
        sb.AppendLine($"> **{result.ConsumptionDominanceAnalysis}**");
        sb.AppendLine();
        sb.AppendLine("## 4. ANÁLISIS DESCRIPTIVO Y CONSTRUCTOS COGNITIVOS");
        sb.AppendLine($"### Rango Preliminar: {result.Diagnostic.Title}");
        sb.AppendLine(result.Diagnostic.Summary);
        sb.AppendLine();
        sb.AppendLine("**Fundamentación Fenomenológica y de Habituación:**");
        sb.AppendLine(result.Diagnostic.ClinicalInterpretation);
        sb.AppendLine();
        sb.AppendLine("**Perfil Neurocognitivo de Referencia:**");
        sb.AppendLine(result.Diagnostic.NeurocognitiveProfile);
        sb.AppendLine();
        sb.AppendLine("### Constructos Psicológicos Operacionalizados en este Perfil:");
        sb.AppendLine("| Constructo Cognitivo | Marco Teórico | Definición Operacional | Manifestación en el Perfil |");
        sb.AppendLine("| :--- | :--- | :--- | :--- |");
        foreach (var c in result.Diagnostic.AppliedCognitiveConstructs)
        {
            sb.AppendLine($"| **{c.ConstructName}** | {c.TheoreticalFramework} | {c.OperationalDefinition} | {c.ManifestationInProfile} |");
        }
        sb.AppendLine();
        sb.AppendLine("### Indicadores Conductuales Observables:");
        foreach (var indicator in result.Diagnostic.BehavioralIndicators)
        {
            sb.AppendLine($"- {indicator}");
        }
        sb.AppendLine();
        sb.AppendLine("### Pautas de Intervención y Prevención (Higiene Digital):");
        foreach (var inter in result.Diagnostic.AppliedInterventions)
        {
            sb.AppendLine($"- {inter}");
        }
        sb.AppendLine();
        sb.AppendLine("### Recomendaciones Psicoeducativas:");
        foreach (var rec in result.Diagnostic.PsychoeducationalRecommendations)
        {
            sb.AppendLine($"- {rec}");
        }
        sb.AppendLine();
        sb.AppendLine("## 5. AUDITORÍA REACTIVO POR REACTIVO (20 PREGUNTAS)");
        sb.AppendLine("| # | Subescala | Reactivo | Puntuación |");
        sb.AppendLine("| :---: | :--- | :--- | :--- |");
        foreach (var ans in result.Answers)
        {
            sb.AppendLine($"| {ans.QuestionId} | {ans.Dimension.GetShortCode()} | {ans.QuestionText} | **{ans.ScoreLabel}** |");
        }
        sb.AppendLine();
        sb.AppendLine("---");
        sb.AppendLine("*Informe generado por la suite ED-CVG. Proyecto de concientización y evaluación de bienestar digital.*");

        return sb.ToString();
    }

    public static string GenerateHtmlReport(TestResult result)
    {
        var sb = new StringBuilder();
        sb.AppendLine("<!DOCTYPE html>");
        sb.AppendLine("<html lang=\"es\">");
        sb.AppendLine("<head>");
        sb.AppendLine("  <meta charset=\"UTF-8\">");
        sb.AppendLine("  <title>Dictamen ED-CVG - Indicadores Autoinformados</title>");
        sb.AppendLine("  <style>");
        sb.AppendLine("    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background-color: #0b0f19; color: #f8fafc; margin: 0; padding: 30px 20px; }");
        sb.AppendLine("    .container { max-width: 860px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; padding: 40px; box-shadow: 0 10px 35px rgba(0,0,0,0.5); }");
        sb.AppendLine("    .header { text-align: center; border-bottom: 1px solid #1f2937; padding-bottom: 24px; margin-bottom: 24px; }");
        sb.AppendLine("    h1 { color: #f8fafc; font-size: 26px; margin: 0 0 6px 0; font-weight: 800; }");
        sb.AppendLine("    .subtitle { color: #94a3b8; font-size: 14px; margin: 0; }");
        sb.AppendLine("    .disclaimer-box { background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 10px; padding: 14px 18px; margin-bottom: 26px; font-size: 13px; color: #bae6fd; line-height: 1.5; }");
        sb.AppendLine("    .meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; background-color: #1e293b; padding: 18px; border-radius: 10px; margin-bottom: 28px; }");
        sb.AppendLine("    .meta-item strong { display: block; font-size: 11px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }");
        sb.AppendLine("    .meta-item span { font-size: 15px; font-weight: 600; color: #f1f5f9; }");
        sb.AppendLine("    .score-hero { text-align: center; background: radial-gradient(circle, rgba(30,58,138,0.2) 0%, rgba(17,24,39,0) 70%); border: 1px solid #1f2937; border-radius: 16px; padding: 30px; margin-bottom: 30px; }");
        sb.AppendLine("    .score-num { font-size: 52px; font-weight: 800; margin: 10px 0; }");
        sb.AppendLine("    .badge { display: inline-block; padding: 6px 16px; border-radius: 9999px; font-weight: 700; font-size: 12px; letter-spacing: 0.5px; }");
        sb.AppendLine("    .section-title { font-size: 18px; font-weight: 700; color: #38bdf8; margin: 28px 0 16px; border-left: 4px solid #38bdf8; padding-left: 10px; }");
        sb.AppendLine("    .subscales { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }");
        sb.AppendLine("    .subscale-card { background-color: #1e293b; padding: 16px; border-radius: 10px; border: 1px solid #334155; }");
        sb.AppendLine("    .progress-bar-bg { background-color: #0f172a; height: 10px; border-radius: 9999px; overflow: hidden; margin-top: 8px; }");
        sb.AppendLine("    .progress-bar-fill { height: 100%; border-radius: 9999px; }");
        sb.AppendLine("    .box-notice { background-color: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 10px; padding: 16px; color: #e2e8f0; font-size: 14px; line-height: 1.5; margin-bottom: 24px; }");
        sb.AppendLine("    .construct-card { background: #1a2234; border: 1px solid #334155; border-radius: 10px; padding: 16px; margin-bottom: 12px; }");
        sb.AppendLine("    .construct-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }");
        sb.AppendLine("    .construct-name { font-weight: 700; color: #f8fafc; font-size: 15px; }");
        sb.AppendLine("    .construct-framework { font-size: 12px; color: #38bdf8; font-weight: 600; background: rgba(56,189,248,0.1); padding: 2px 8px; border-radius: 4px; }");
        sb.AppendLine("    .construct-desc { font-size: 13px; color: #cbd5e1; margin-bottom: 6px; line-height: 1.4; }");
        sb.AppendLine("    .construct-manifestation { font-size: 13px; color: #94a3b8; font-style: italic; line-height: 1.4; }");
        sb.AppendLine("    table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 13px; }");
        sb.AppendLine("    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #1e293b; }");
        sb.AppendLine("    th { color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 11px; background-color: #1e293b; }");
        sb.AppendLine("    ul { margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 14px; line-height: 1.6; }");
        sb.AppendLine("    li { margin-bottom: 8px; }");
        sb.AppendLine("    .footer { text-align: center; margin-top: 36px; padding-top: 20px; border-top: 1px solid #1f2937; font-size: 12px; color: #64748b; }");
        sb.AppendLine("  </style>");
        sb.AppendLine("</head>");
        sb.AppendLine("<body>");
        sb.AppendLine("<div class=\"container\">");
        sb.AppendLine("  <div class=\"header\">");
        sb.AppendLine("    <h1>Dictamen de Indicadores Autoinformados</h1>");
        sb.AppendLine("    <p class=\"subtitle\">ED-CVG (12–29 años) — Escala de Exposición y Habituación a la Violencia Gráfica Digital</p>");
        sb.AppendLine("  </div>");
        sb.AppendLine();
        sb.AppendLine("  <div class=\"disclaimer-box\">");
        sb.AppendLine($"    <strong>⚖️ Aviso Metodológico y Ético:</strong> {result.EthicalDisclaimer}");
        sb.AppendLine("  </div>");
        sb.AppendLine();
        sb.AppendLine("  <div class=\"meta-grid\">");
        sb.AppendLine($"    <div class=\"meta-item\"><strong>Participante</strong><span>{result.ParticipantAlias}</span></div>");
        sb.AppendLine($"    <div class=\"meta-item\"><strong>Edad y Cohorte</strong><span>{result.Age} años ({AgeHelper.GetCohortDescription(result.Cohort)})</span></div>");
        sb.AppendLine($"    <div class=\"meta-item\"><strong>Fecha de Registro</strong><span>{result.EvaluatedAt:dd/MM/yyyy HH:mm}</span></div>");
        sb.AppendLine("  </div>");
        sb.AppendLine();
        sb.AppendLine("  <div class=\"score-hero\">");
        sb.AppendLine($"    <span class=\"badge\" style=\"background-color:{result.Diagnostic.ColorHex}; color:#0f172a;\">{result.Diagnostic.BadgeText}</span>");
        sb.AppendLine($"    <div class=\"score-num\" style=\"color:{result.Diagnostic.ColorHex};\">{result.GlobalIndex:F1} <span style=\"font-size:24px; color:#64748b;\">/ 100</span></div>");
        sb.AppendLine($"    <div style=\"font-size:18px; font-weight:600; color:#f1f5f9;\">{result.Diagnostic.Title}</div>");
        sb.AppendLine($"    <p style=\"color:#94a3b8; max-width:640px; margin:10px auto 0; font-size:14px; line-height:1.5;\">{result.Diagnostic.Summary}</p>");
        sb.AppendLine("  </div>");
        sb.AppendLine();
        sb.AppendLine("  <h2 class=\"section-title\">Puntuación de Perfil (4 Subescalas Psicométricas)</h2>");
        sb.AppendLine("  <div class=\"subscales\">");

        void AppendCard(string title, double val, string color, string desc)
        {
            sb.AppendLine("    <div class=\"subscale-card\">");
            sb.AppendLine($"      <div style=\"display:flex; justify-content:space-between; font-weight:600; font-size:13px; color:#e2e8f0;\"><span>{title}</span><span style=\"color:{color}; font-weight:700;\">{val:F1}%</span></div>");
            sb.AppendLine("      <div class=\"progress-bar-bg\">");
            sb.AppendLine($"        <div class=\"progress-bar-fill\" style=\"width:{val:F1}%; background-color:{color};\"></div>");
            sb.AppendLine("      </div>");
            sb.AppendLine($"      <div style=\"font-size:11px; color:#94a3b8; margin-top:6px;\">{desc}</div>");
            sb.AppendLine("    </div>");
        }

        AppendCard("Exposición Algorítmica Incidental (EA-I)", result.PassiveExposureIndex, "#38BDF8", "Frecuencia de recepción en feeds sin búsqueda deliberada.");
        AppendCard("Búsqueda Activa y Curiosidad (BA-C)", result.ActiveSeekingIndex, "#F472B6", "Iniciativa voluntaria de consulta de material gráfico.");
        AppendCard("Reactividad Emocional Autopercibida (RE-A)", result.PhysiologicalNumbingIndex, "#A78BFA", "Atenuación percibida de asco, sobresalto o aceleración.");
        AppendCard("Normalización Cognitiva (NC-D)", result.CognitiveNormalizationIndex, "#34D399", "Percepción de la violencia digital como trivial o justificable.");

        sb.AppendLine("  </div>");
        sb.AppendLine();
        sb.AppendLine($"  <div class=\"box-notice\"><strong>⚖️ Índice de Balance de Consumo (IBC: {(result.ConsumptionBalanceIndex > 0 ? "+" : "")}{result.ConsumptionBalanceIndex:F1}%):</strong> {result.ConsumptionDominanceAnalysis}</div>");
        sb.AppendLine();
        sb.AppendLine("  <h2 class=\"section-title\">Marcos Teóricos y Constructos Operacionalizados</h2>");
        sb.AppendLine($"  <p style=\"color:#cbd5e1; line-height:1.6; margin-bottom:16px;\"><strong>Referencia Neurocognitiva:</strong> {result.Diagnostic.NeurocognitiveProfile}</p>");

        foreach (var c in result.Diagnostic.AppliedCognitiveConstructs)
        {
            sb.AppendLine("  <div class=\"construct-card\">");
            sb.AppendLine("    <div class=\"construct-header\">");
            sb.AppendLine($"      <span class=\"construct-name\">{c.ConstructName}</span>");
            sb.AppendLine($"      <span class=\"construct-framework\">{c.TheoreticalFramework}</span>");
            sb.AppendLine("    </div>");
            sb.AppendLine($"    <div class=\"construct-desc\"><strong>Definición Operacional:</strong> {c.OperationalDefinition}</div>");
            sb.AppendLine($"    <div class=\"construct-manifestation\"><strong>Manifestación en el perfil:</strong> {c.ManifestationInProfile}</div>");
            sb.AppendLine("  </div>");
        }

        sb.AppendLine("  <h2 class=\"section-title\">Pautas de Higiene Digital y Prevención</h2>");
        sb.AppendLine("  <ul>");
        foreach (var inter in result.Diagnostic.AppliedInterventions)
        {
            sb.AppendLine($"    <li>{inter}</li>");
        }
        sb.AppendLine("  </ul>");

        sb.AppendLine("  <h2 class=\"section-title\">Auditoría de Respuestas Reactivo por Reactivo (20 Ítems)</h2>");
        sb.AppendLine("  <table>");
        sb.AppendLine("    <thead><tr><th>#</th><th>Subescala</th><th>Reactivo Evaluado</th><th>Respuesta Autoinformada</th></tr></thead>");
        sb.AppendLine("    <tbody>");
        foreach (var ans in result.Answers)
        {
            sb.AppendLine($"      <tr><td>{ans.QuestionId}</td><td><span style=\"font-size:11px; padding:2px 8px; border-radius:4px; background:#334155; color:#38bdf8;\">{ans.Dimension.GetShortCode()}</span></td><td>{ans.QuestionText}</td><td><strong>{ans.ScoreLabel}</strong></td></tr>");
        }
        sb.AppendLine("    </tbody>");
        sb.AppendLine("  </table>");

        sb.AppendLine("  <div class=\"footer\">Documento generado con base en la escala ED-CVG. Autoevaluación confidencial y psicoeducativa.</div>");
        sb.AppendLine("</div>");
        sb.AppendLine("</body>");
        sb.AppendLine("</html>");
        return sb.ToString();
    }

    public static string SaveReportToFile(TestResult result, string directoryPath)
    {
        Directory.CreateDirectory(directoryPath);
        string fileBase = $"Reporte_Desensibilizacion_{result.ParticipantAlias.Replace(" ", "_")}_{DateTime.Now:yyyyMMdd_HHmmss}";
        
        string mdPath = Path.Combine(directoryPath, $"{fileBase}.md");
        File.WriteAllText(mdPath, GenerateMarkdownReport(result), Encoding.UTF8);

        string htmlPath = Path.Combine(directoryPath, $"{fileBase}.html");
        File.WriteAllText(htmlPath, GenerateHtmlReport(result), Encoding.UTF8);

        return htmlPath;
    }
}
