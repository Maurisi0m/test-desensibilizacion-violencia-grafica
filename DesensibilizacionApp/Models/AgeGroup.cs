namespace DesensibilizacionApp.Models;

public enum AgeCohort
{
    Adolescente,   // 12 a 17 años
    JovenAdulto    // 18 a 29 años
}

public static class AgeHelper
{
    public static AgeCohort GetCohort(int age)
    {
        if (age < 12 || age > 29)
        {
            throw new ArgumentOutOfRangeException(nameof(age), "La edad debe encontrarse en el rango de 12 a 29 años.");
        }

        return age <= 17 ? AgeCohort.Adolescente : AgeCohort.JovenAdulto;
    }

    public static string GetCohortDescription(AgeCohort cohort) => cohort switch
    {
        AgeCohort.Adolescente => "Adolescentes (12 - 17 años)",
        AgeCohort.JovenAdulto => "Jóvenes Adultos (18 - 29 años)",
        _ => "No determinado"
    };
}
