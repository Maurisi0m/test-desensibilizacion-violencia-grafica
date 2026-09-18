namespace DesensibilizacionApp.Models;

public enum QuestionDimension
{
    /// <summary>
    /// Consumo indirecto / pasivo impuesto por algoritmos (Reels, TikTok, X, feeds, estados).
    /// </summary>
    ExposicionPasivaAlgoritmica,

    /// <summary>
    /// Búsqueda activa e intencional por curiosidad mórbida (canales Telegram, foros gore, sitios shock, pedir links).
    /// </summary>
    BusquedaActivaIntencional,

    /// <summary>
    /// Embotamiento afectivo y fisiológico (ausencia de taquicardia, náuseas, asco o impacto emocional).
    /// </summary>
    ReactividadFisiologicaEmocional,

    /// <summary>
    /// Normalización cognitiva y pérdida de empatía (memes de tragedias, culpar a víctimas, indiferencia moral).
    /// </summary>
    NormalizacionCognitivaEmpatia
}

public static class DimensionExtensions
{
    public static string GetTitle(this QuestionDimension dimension) => dimension switch
    {
        QuestionDimension.ExposicionPasivaAlgoritmica => "Exposición Pasiva en Redes (Reels / Feeds)",
        QuestionDimension.BusquedaActivaIntencional => "Búsqueda Activa y Curiosidad Mórbida",
        QuestionDimension.ReactividadFisiologicaEmocional => "Reactividad Emocional y Embotamiento",
        QuestionDimension.NormalizacionCognitivaEmpatia => "Normalización y Desconexión Empática",
        _ => "Dimensión Desconocida"
    };

    public static string GetShortCode(this QuestionDimension dimension) => dimension switch
    {
        QuestionDimension.ExposicionPasivaAlgoritmica => "EA-I",
        QuestionDimension.BusquedaActivaIntencional => "BA-C",
        QuestionDimension.ReactividadFisiologicaEmocional => "RF-E",
        QuestionDimension.NormalizacionCognitivaEmpatia => "NC-D",
        _ => "N/A"
    };

    public static string GetBadgeColor(this QuestionDimension dimension) => dimension switch
    {
        QuestionDimension.ExposicionPasivaAlgoritmica => "#3B82F6",      // Azul
        QuestionDimension.BusquedaActivaIntencional => "#EC4899",        // Magenta / Rosa
        QuestionDimension.ReactividadFisiologicaEmocional => "#8B5CF6",  // Púrpura
        QuestionDimension.NormalizacionCognitivaEmpatia => "#F59E0B",    // Ámbar
        _ => "#64748B"
    };
}
