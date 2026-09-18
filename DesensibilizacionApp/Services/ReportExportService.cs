using System.IO;
using System.Text;
using DesensibilizacionApp.Models;

namespace DesensibilizacionApp.Services;

public class ReportExportService
{
    public static string GenerateMarkdownReport(TestResult result)
    {
        var sb = new StringBuilder();
        sb.AppendLine("# INFORME PSICOMÉTRICO Y NEUROCOGNITIVO: DESENSIBILIZACIÓN A LA VIOLENCIA GRÁFICA");
        sb.AppendLine("Instrumento: Escala de Desensibilización a la Violencia Gráfica Digital (ED-CVG 12-29)");
        sb.AppendLine($"Fecha de Evaluación: {result.EvaluatedAt:yyyy-MM-dd HH:mm:ss}");
        sb.AppendLine();
        sb.AppendLine("## DATOS DEL PARTICIPANTE");
        sb.AppendLine($"- **Identificador / Alias:** {result.ParticipantAlias}");
        sb.AppendLine($"- **Edad:** {result.Age} años");
        sb.AppendLine($"- **Cohorte Poblacional:** {AgeHelper.GetCohortDescription(result.Cohort)}");
        sb.AppendLine();
        sb.AppendLine("## 1. RESULTADOS CUANTITATIVOS GLOBALES");
        sb.AppendLine($"| Indicador | Puntuación Bruta | Escala Normalizada (0-100%) | Nivel Diagnóstico |");
        sb.AppendLine($"| :--- | :---: | :---: | :--- |");
        sb.AppendLine($"| **Índice Global de Desensibilización (IGD)** | {result.RawTotalScore} / 100 | **{result.GlobalIndex:F1}%** | **{result.Diagnostic.BadgeText}** |");
        sb.AppendLine();
        sb.AppendLine("## 2. DESGLOSE POR SUBESCALAS PSICOMÉTRICAS");
        sb.AppendLine("| Dimensión Evaluada | Puntuación (0-100%) | Interpretación Fenomenológica |");
        sb.AppendLine("| :--- | :---: | :--- |");
        sb.AppendLine($"| **Exposición Algorítmica Pasiva (Reels/Feeds)** | {result.PassiveExposureIndex:F1}% | Saturación incidental por plataformas de video corto y algoritmos |");
        sb.AppendLine($"| **Búsqueda Activa y Curiosidad Mórbida** | {result.ActiveSeekingIndex:F1}% | Búsqueda intencional (canales Telegram/foros gore/shock sites) |");
        sb.AppendLine($"| **Embotamiento Emocional y Fisiológico** | {result.PhysiologicalNumbingIndex:F1}% | Supresión de taquicardia, náuseas y aversión autonómica |");
        sb.AppendLine($"| **Normalización Cognitiva y Desconexión Empática** | {result.CognitiveNormalizationIndex:F1}% | Trivialización (memes, culpa a víctimas, deshumanización) |");
        sb.AppendLine();
        sb.AppendLine("## 3. ANÁLISIS DIFERENCIAL DE FUENTE");
        sb.AppendLine($"> **{result.ConsumptionDominanceAnalysis}**");
        sb.AppendLine();
        sb.AppendLine("## 4. ANÁLISIS COGNITIVO Y CONSTRUCTOS PSICOLÓGICOS APLICADOS");
        sb.AppendLine($"### Diagnóstico Clínico: {result.Diagnostic.Title}");
        sb.AppendLine(result.Diagnostic.Summary);
        sb.AppendLine();
        sb.AppendLine("**Fundamentación Teórica y Clínica:**");
        sb.AppendLine(result.Diagnostic.ClinicalInterpretation);
        sb.AppendLine();
        sb.AppendLine("**Perfil Neurocognitivo y Procesamiento Afectivo:**");
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
        sb.AppendLine("### Intervenciones Cognitivo-Conductuales Aplicadas (TCC y Digital Wellbeing):");
        foreach (var inter in result.Diagnostic.AppliedInterventions)
        {
            sb.AppendLine($"- {inter}");
        }
        sb.AppendLine();
        sb.AppendLine("### Recomendaciones Psicoeducativas y de Higiene Digital:");
        foreach (var rec in result.Diagnostic.PsychoeducationalRecommendations)
        {
            sb.AppendLine($"- {rec}");
        }
        sb.AppendLine();
        sb.AppendLine("## 5. REGISTRO DETALLADO DE RESPUESTAS (20 REACTIVOS)");
        sb.AppendLine("| # | Dimensión | Reactivo / Pregunta | Puntuación | Respuesta Seleccionada |");
        sb.AppendLine("| -: | :---: | :--- | :---: | :--- |");
        foreach (var ans in result.Answers)
        {
            sb.AppendLine($"| {ans.QuestionId} | {ans.Dimension.GetShortCode()} | {ans.QuestionText} | {ans.Score}/5 | {ans.ScoreLabel} |");
        }
        sb.AppendLine();
        sb.AppendLine("---");
        sb.AppendLine("*Nota de confidencialidad y rigor: Este informe tiene fines de evaluación psicológica, concienciación neurocognitiva y orientación diagnóstica especializada.*");
        return sb.ToString();
    }

    public static string GenerateHtmlReport(TestResult result)
    {
        var sb = new StringBuilder();
        sb.AppendLine("<!DOCTYPE html>");
        sb.AppendLine("<html lang=\"es\">");
        sb.AppendLine("<head>");
        sb.AppendLine("<meta charset=\"utf-8\">");
        sb.AppendLine("<title>Informe Psicométrico y Neurocognitivo - ED-CVG</title>");
        sb.AppendLine("<style>");
        sb.AppendLine(@"
            body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 40px 20px; }
            .container { max-width: 920px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid #334155; }
            .header { border-bottom: 2px solid #334155; padding-bottom: 24px; margin-bottom: 30px; }
            .badge { display: inline-block; padding: 6px 14px; border-radius: 9999px; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; }
            h1 { font-size: 26px; color: #ffffff; margin: 0 0 10px 0; }
            .subtitle { color: #94a3b8; font-size: 15px; margin: 0; }
            .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; background: #0f172a; padding: 18px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #1e293b; }
            .meta-item strong { display: block; color: #94a3b8; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
            .meta-item span { font-size: 16px; font-weight: 600; color: #e2e8f0; }
            .score-hero { background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95)); border: 1px solid #334155; border-radius: 16px; padding: 30px; text-align: center; margin-bottom: 30px; }
            .score-num { font-size: 64px; font-weight: 800; line-height: 1; margin: 10px 0; }
            .subscales { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .subscale-card { background: #0f172a; border-radius: 12px; padding: 20px; border: 1px solid #334155; }
            .progress-bar-bg { background: #334155; height: 10px; border-radius: 5px; overflow: hidden; margin-top: 10px; }
            .progress-bar-fill { height: 100%; border-radius: 5px; }
            .box-notice { background: rgba(99, 102, 241, 0.12); border-left: 4px solid #6366f1; padding: 16px 20px; border-radius: 8px; margin-bottom: 30px; font-size: 14.5px; color: #cbd5e1; line-height: 1.5; }
            .section-title { font-size: 18px; color: #f8fafc; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-top: 32px; margin-bottom: 16px; }
            .construct-card { background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 16px 18px; margin-bottom: 12px; }
            .construct-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
            .construct-name { font-weight: 700; color: #818cf8; font-size: 15px; }
            .construct-framework { font-size: 11.5px; color: #94a3b8; background: #1e293b; padding: 3px 8px; border-radius: 6px; }
            .construct-desc { font-size: 13.5px; color: #cbd5e1; margin-bottom: 6px; line-height: 1.5; }
            .construct-manifestation { font-size: 12.5px; color: #38bdf8; background: rgba(56, 189, 248, 0.08); padding: 8px 12px; border-radius: 6px; border-left: 3px solid #38bdf8; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13.5px; }
            th { text-align: left; background: #0f172a; color: #94a3b8; padding: 12px; border-bottom: 2px solid #334155; }
            td { padding: 12px; border-bottom: 1px solid #334155; color: #e2e8f0; line-height: 1.4; }
            ul { margin: 10px 0; padding-left: 24px; color: #cbd5e1; line-height: 1.6; }
            .footer { margin-top: 40px; text-align: center; font-size: 12.5px; color: #64748b; border-top: 1px solid #334155; padding-top: 20px; }
        ");
        sb.AppendLine("</style>");
        sb.AppendLine("</head>");
        sb.AppendLine("<body>");
        sb.AppendLine("<div class=\"container\">");
        sb.AppendLine("  <div class=\"header\">");
        sb.AppendLine("    <h1>Informe Psicométrico y Neurocognitivo</h1>");
        sb.AppendLine("    <p class=\"subtitle\">Escala de Desensibilización a la Violencia Gráfica Digital (ED-CVG 12-29)</p>");
        sb.AppendLine("  </div>");

        sb.AppendLine("  <div class=\"meta-grid\">");
        sb.AppendLine($"    <div class=\"meta-item\"><strong>Participante</strong><span>{result.ParticipantAlias}</span></div>");
        sb.AppendLine($"    <div class=\"meta-item\"><strong>Edad y Cohorte</strong><span>{result.Age} años ({AgeHelper.GetCohortDescription(result.Cohort)})</span></div>");
        sb.AppendLine($"    <div class=\"meta-item\"><strong>Fecha</strong><span>{result.EvaluatedAt:dd/MM/yyyy HH:mm}</span></div>");
        sb.AppendLine("  </div>");

        sb.AppendLine("  <div class=\"score-hero\">");
        sb.AppendLine($"    <span class=\"badge\" style=\"background-color:{result.Diagnostic.ColorHex}; color:#0f172a;\">{result.Diagnostic.BadgeText}</span>");
        sb.AppendLine($"    <div class=\"score-num\" style=\"color:{result.Diagnostic.ColorHex};\">{result.GlobalIndex:F1}%</div>");
        sb.AppendLine($"    <div style=\"font-size:18px; font-weight:600; color:#f1f5f9;\">{result.Diagnostic.Title}</div>");
        sb.AppendLine($"    <p style=\"color:#94a3b8; max-width:640px; margin:10px auto 0; font-size:14px; line-height:1.5;\">{result.Diagnostic.Summary}</p>");
        sb.AppendLine("  </div>");

        sb.AppendLine("  <h2 class=\"section-title\">Desglose de Subescalas Clínicas</h2>");
        sb.AppendLine("  <div class=\"subscales\">");

        void AppendCard(string title, double val, string color)
        {
            sb.AppendLine("    <div class=\"subscale-card\">");
            sb.AppendLine($"      <div style=\"display:flex; justify-content:space-between; font-weight:600; font-size:14px; color:#e2e8f0;\"><span>{title}</span><span style=\"color:{color};\">{val:F1}%</span></div>");
            sb.AppendLine("      <div class=\"progress-bar-bg\">");
            sb.AppendLine($"        <div class=\"progress-bar-fill\" style=\"width:{val:F1}%; background-color:{color};\"></div>");
            sb.AppendLine("      </div>");
            sb.AppendLine("    </div>");
        }

        AppendCard("Exposición Algorítmica en Redes (Reels)", result.PassiveExposureIndex, "#3B82F6");
        AppendCard("Búsqueda Activa y Curiosidad Mórbida", result.ActiveSeekingIndex, "#EC4899");
        AppendCard("Embotamiento Emocional y Corporal", result.PhysiologicalNumbingIndex, "#8B5CF6");
        AppendCard("Normalización Cognitiva y Falta de Empatía", result.CognitiveNormalizationIndex, "#F59E0B");

        sb.AppendLine("  </div>");

        sb.AppendLine($"  <div class=\"box-notice\"><strong>⚖️ Análisis Diferencial de Consumo:</strong> {result.ConsumptionDominanceAnalysis}</div>");

        // Section: Constructos Cognitivos Aplicados
        sb.AppendLine("  <h2 class=\"section-title\">Constructos Psicológicos y Cognitivos Operacionalizados</h2>");
        sb.AppendLine($"  <p style=\"color:#cbd5e1; line-height:1.6; margin-bottom:16px;\"><strong>Fundamentación Neurocognitiva:</strong> {result.Diagnostic.NeurocognitiveProfile}</p>");

        foreach (var c in result.Diagnostic.AppliedCognitiveConstructs)
        {
            sb.AppendLine("  <div class=\"construct-card\">");
            sb.AppendLine("    <div class=\"construct-header\">");
            sb.AppendLine($"      <span class=\"construct-name\">{c.ConstructName}</span>");
            sb.AppendLine($"      <span class=\"construct-framework\">{c.TheoreticalFramework}</span>");
            sb.AppendLine("    </div>");
            sb.AppendLine($"    <div class=\"construct-desc\"><strong>Definición Operacional:</strong> {c.OperationalDefinition}</div>");
            sb.AppendLine($"    <div class=\"construct-manifestation\"><strong>Manifestación en este participante:</strong> {c.ManifestationInProfile}</div>");
            sb.AppendLine("  </div>");
        }

        sb.AppendLine("  <h2 class=\"section-title\">Intervenciones Cognitivo-Conductuales y de Salud Digital (TCC)</h2>");
        sb.AppendLine("  <ul>");
        foreach (var inter in result.Diagnostic.AppliedInterventions)
        {
            sb.AppendLine($"    <li>{inter}</li>");
        }
        sb.AppendLine("  </ul>");

        sb.AppendLine("  <h2 class=\"section-title\">Recomendaciones de Higiene Neurocognitiva</h2>");
        sb.AppendLine("  <ul>");
        foreach (var rec in result.Diagnostic.PsychoeducationalRecommendations)
        {
            sb.AppendLine($"    <li>{rec}</li>");
        }
        sb.AppendLine("  </ul>");

        sb.AppendLine("  <h2 class=\"section-title\">Registro Detallado de Respuestas (20 Reactivos)</h2>");
        sb.AppendLine("  <table>");
        sb.AppendLine("    <thead><tr><th>#</th><th>Dimensión</th><th>Reactivo / Pregunta</th><th>Puntaje</th></tr></thead>");
        sb.AppendLine("    <tbody>");
        foreach (var ans in result.Answers)
        {
            sb.AppendLine($"      <tr><td>{ans.QuestionId}</td><td><span style=\"font-size:11px; padding:2px 8px; border-radius:4px; background:#334155;\">{ans.Dimension.GetShortCode()}</span></td><td>{ans.QuestionText}</td><td><strong>{ans.ScoreLabel}</strong></td></tr>");
        }
        sb.AppendLine("    </tbody>");
        sb.AppendLine("  </table>");

        sb.AppendLine("  <div class=\"footer\">Reporte generado por el software ED-CVG v1.0. Batería psicométrica y neurocognitiva para medios digitales.</div>");
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
