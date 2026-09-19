# Escala Diagnóstica de Desensibilización al Contenido Violento Gráfico (ED-CVG)

Software de evaluación psicométrica y diagnóstico cognitivo desarrollado en **C# (.NET 9.0 / WPF)** para cuantificar los niveles de habituación, embotamiento afectivo y normalización frente al consumo de violencia explícita en medios digitales (redes sociales, reels, foros y comunidades de shock content) en población de **12 a 29 años**.

---

## 🧠 Fundamentación Psicométrica y Teórica

El instrumento consta de **20 reactivos psicométricamente calibrados** en escala Likert (1 a 5), adaptados semánticamente en dos cohortes etarias:
- **Adolescentes (12 a 17 años)**: Enfoque centrado en dinámicas de pares, feeds algorítmicos (TikTok, Instagram Reels, Shorts) y regulación emocional en desarrollo.
- **Adultos Jóvenes (18 a 29 años)**: Enfoque orientado a hábitos de navegación digital, foros de shock content, Telegram y patrones de consumo autónomo.

### Subescalas de Evaluación

| Dimensión | Sigla | Ítems | Foco de Medición |
|---|---|---|---|
| **Exposición Algorítmica Indirecta** | `EA-I` | 5 | Frecuencia de aparición pasiva en feeds, reels y líneas de tiempo. |
| **Búsqueda Activa e Intencional** | `BA-C` | 5 | Curiosidad mórbida, acceso voluntario a grupos de Telegram o sitios de gore. |
| **Reactividad Fisiológica y Embotamiento** | `RF-E` | 5 | Atenuación de náuseas, taquicardia o sobresalto ante estímulos aversivos. |
| **Normalización Cognitiva y Desconexión** | `NC-D` | 5 | Justificación moral, deshumanización de víctimas y disminución de empatía. |

### Métricas Cuantitativas
- **Índice Global de Desensibilización (IGD)**: Normalizado en escala porcentual de **0.0% a 100.0%** mediante la fórmula:
  $$\text{IGD} = \frac{\sum (\text{puntajes}) - 20}{80} \times 100$$
- **Niveles Diagnósticos**:
  - `0% - 25%`: Sensibilidad Típica Preservada (Verde)
  - `26% - 50%`: Habituación Leve a Moderada (Amarillo)
  - `51% - 75%`: Desensibilización Significativa (Naranja)
  - `76% - 100%`: Desensibilización Severa y Embotamiento Afectivo (Rojo)
- **Análisis de Consumo Diferencial**: Diferenciación cuantitativa entre habituación reactiva inducida por algoritmos vs. habituación activa motivada por búsqueda deliberada.

---

## 🔬 Constructos Psicológicos Cognitivos Integrados

El sistema integra en sus diagnósticos y reportes constructos de la psicología cognitiva experimental y la neurociencia afectiva:
1. **Atenuación del Reflejo de Sobresalto y Reactividad Autonómica**: Disminución de la conductancia electrodérmica y aplanamiento simpático ante estímulos de dolor o trauma ajeno.
2. **Mecanismos de Desconexión Moral (Albert Bandura)**: Activación de justificación moral, atribución de culpa a la víctima, difusión de la responsabilidad y deshumanización.
3. **Heurística de Disponibilidad (Tversky & Kahneman) y Sesgo de Atribución Hostil**: Sobreestimación sistemática de la hostilidad ambiental generada por sobreexposición algorítmica.
4. **Hipótesis del Mundo Justo (Melvin Lerner)**: Racionalización cognitiva defensiva para neutralizar la disonancia afectiva ante la violencia arbitraria.
5. **Fatiga por Compasión y Erosión de la Teoría de la Mente (ToM)**: Sobrecarga alostática frontolímbica y dificultad para la inferencia de estados mentales ajenos.

---

## 🛡️ Intervenciones Clínico-Cognitivas Aplicadas (TCC)

El reporte generado proporciona pautas de intervención fundamentadas en **Terapia Cognitivo-Conductual**:
- **Reestructuración Cognitiva de Creencias Intermedias (Beck)**: Disputa socrática de esquemas de normalización y minimización del daño.
- **Protocolo de Higiene Digital Algorítmica y Desensibilización Inversa**: Regulación de la tasa de exposición, uso de palabras bloqueadas y reactivación paulatina de la sensibilidad perceptiva.
- **Entrenamiento en Mentalización y Reatribución Empática (Batson)**: Ejercicios de toma de perspectiva para revertir la deshumanización implícita.
- **Biofeedback Somatosensorial y Modulación Vagal**: Técnicas interoceptivas y de respiración diafragmática para restituir la conexión sensorial frente al embotamiento.

---

## 🌐 Plataforma Web de Ayuda y Concientización (ReConecta Digital)

Ubicada en `portal-web/`, es una plataforma web responsiva diseñada para que los jóvenes puedan acceder directamente desde teléfonos móviles o navegadores web sin necesidad de instalar software:
- **🚨 Botón SOS (Primeros Auxilios Psicológicos)**: Respiración vagal 4-7-8 guiada visualmente con contador y anclaje sensorial 5-4-3-2-1 para disipar la intrusión de imágenes perturbadoras.
- **📊 Test ED-CVG Web**: Los 20 reactivos psicométricos con cálculo en vivo de IGD %, subescalas y dictamen clínico descargable.
- **🛡️ Guía de Blindaje de Algoritmos**: Tutoriales paso a paso para TikTok, Instagram Reels, X y Telegram con lista de palabras clave silenciables copiable en 1 clic.
- **🌱 Reto Detox de 7 Días**: Desafíos diarios interactivos de higiene digital con progreso guardado en `localStorage`.
- **📞 Directorio de Crisis**: Enlace directo a líneas gratuitas de atención psicológica (Línea de la Vida 800 911 2000, Consejo Ciudadano 55 5533 5533).

---

## 💻 Características del Software de Escritorio (WPF)

- **Arquitectura MVVM**: Separación estricta entre modelos de datos, servicios de evaluación y vistas XAML.
- **Tema Oscuro con Alto Contraste**: Paleta Slate/Indigo con controles adaptados para garantizar máxima legibilidad en campos de texto y selectores.
- **Persistencia en Disco (JSON)**: Registro automático de todas las evaluaciones en `Data/historial_evaluaciones.json`.
- **Inspector de Historial Individualizado**: Permite consultar qué respondió cada participante reactivo por reactivo (las 20 preguntas con su puntaje y descripción exacta).
- **Generador de Reportes Multiformato**: Exportación inmediata a **Markdown (.md)** y **HTML interactivo estilizado (.html)** con diseño clínico formal.
- **Acceso Directo a la Plataforma Web**: Botones integrados para abrir la plataforma de concientización en el navegador con 1 clic.
- **Cobertura de Pruebas Unitarias (xUnit)**: Pruebas automatizadas de calibración, persistencia y ciclo de vida de la aplicación.

---

## 🚀 Requisitos e Instalación

### Prerrequisitos
- [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0) o superior.
- Windows 10/11 (arquitectura x64).

### Ejecución de la Aplicación
```powershell
# Clonar el repositorio
git clone https://github.com/Maurisi0m/test-desensibilizacion-violencia-grafica.git
cd test-desensibilizacion-violencia-grafica

# Ejecutar la aplicación WPF
dotnet run --project DesensibilizacionApp
```

### Ejecución de Pruebas Unitarias
```powershell
dotnet test DesensibilizacionSuite.sln
```

---

## 📁 Estructura del Proyecto

```text
SIMULACRO/
├── DesensibilizacionApp/               # Aplicación principal WPF (.NET 9)
│   ├── Converters/                    # Conversores XAML (ColorHexToBrush, BoolToVis)
│   ├── Models/                        # Modelos de datos (Question, TestResult, DiagnosticLevel, AgeGroup)
│   ├── Services/                      # Lógica de cálculo, persistencia y exportación de reportes
│   ├── ViewModels/                    # Máquina de estados MVVM y comandos interactivos
│   ├── App.xaml                       # Recursos y estilos globales de alto contraste
│   └── MainWindow.xaml                # Pantallas (Bienvenida, Test, Resultados, Historial)
├── DesensibilizacionApp.Tests/        # Proyecto de pruebas unitarias xUnit
│   ├── AssessmentTests.cs             # Pruebas psicométricas, de rangos y persistencia
│   └── UiSnapshotTests.cs             # Pruebas de renderizado y captura visual
├── DesensibilizacionSuite.sln         # Solución de Visual Studio / .NET
├── .gitignore                         # Reglas de exclusión para .NET/VS
└── README.md                          # Documentación completa del proyecto
```

---

## 📄 Licencia

Este proyecto se distribuye bajo fines de investigación y evaluación psicológica. Todos los derechos reservados.
