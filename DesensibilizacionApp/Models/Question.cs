namespace DesensibilizacionApp.Models;

public class Question
{
    public int Id { get; set; }
    public QuestionDimension Dimension { get; set; }
    public string TextAdolescent { get; set; } = string.Empty;
    public string TextAdult { get; set; } = string.Empty;
    public string ContextHint { get; set; } = string.Empty;
    public int? SelectedValue { get; set; }

    public string GetText(AgeCohort cohort) => cohort switch
    {
        AgeCohort.Adolescente => TextAdolescent,
        AgeCohort.JovenAdulto => TextAdult,
        _ => TextAdult
    };

    public bool IsAnswered => SelectedValue.HasValue && SelectedValue.Value >= 1 && SelectedValue.Value <= 5;
}
