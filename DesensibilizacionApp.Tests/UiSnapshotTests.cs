using System.IO;
using System.Windows;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using DesensibilizacionApp.ViewModels;
using Xunit;

namespace DesensibilizacionApp.Tests;

public class UiSnapshotTests
{
    private const string ArtifactsDir = @"C:\Users\mauro\.gemini\antigravity-ide\brain\4ebc8ddd-1be8-45d8-8840-a2d30c8bf9f5";

    [Fact]
    public void RenderAndCaptureAllScreens_ShouldSaveRealImages()
    {
        var thread = new Thread(() =>
        {
            if (Application.Current == null)
            {
                var app = new DesensibilizacionApp.App();
                app.InitializeComponent();
            }

            var window = new MainWindow();
            var vm = (MainViewModel)window.DataContext;
            var content = (FrameworkElement)window.Content;

            int width = 1050;
            int height = 780;

            void CaptureScreen(string filename)
            {
                content.Measure(new Size(width, height));
                content.Arrange(new Rect(0, 0, width, height));
                content.UpdateLayout();

                var drawingVisual = new DrawingVisual();
                using (var dc = drawingVisual.RenderOpen())
                {
                    dc.DrawRectangle(window.Background, null, new Rect(0, 0, width, height));
                    var vb = new VisualBrush(content) { Stretch = Stretch.None, AlignmentX = AlignmentX.Left, AlignmentY = AlignmentY.Top };
                    dc.DrawRectangle(vb, null, new Rect(0, 0, width, height));
                }

                var rtb = new RenderTargetBitmap(width, height, 96, 96, PixelFormats.Pbgra32);
                rtb.Render(drawingVisual);

                var encoder = new PngBitmapEncoder();
                encoder.Frames.Add(BitmapFrame.Create(rtb));

                string outPath = Path.Combine(ArtifactsDir, filename);
                using var fs = File.Open(outPath, FileMode.Create, FileAccess.Write);
                encoder.Save(fs);
            }

            // 1. Capture Welcome Screen (Notice ComboBox high-contrast text)
            vm.SelectedAge = 16;
            CaptureScreen("screen_01_welcome.png");

            // 2. Start Questionnaire
            vm.ParticipantAlias = "Camila Gómez";
            vm.SelectedAge = 16;
            vm.StartTestCommand.Execute(null);

            // Select an option for question 1 to show active selection
            vm.SelectOptionCommand.Execute(4);
            CaptureScreen("screen_02_questionnaire.png");

            // 3. Complete all 20 questions
            for (int i = 1; i < 20; i++)
            {
                vm.NextQuestionCommand.Execute(null);
                int score = (i % 5) + 1;
                vm.SelectOptionCommand.Execute(score);
            }
            // Finish (this also automatically persists to history)
            vm.NextQuestionCommand.Execute(null);

            // 4. Capture Results Screen
            CaptureScreen("screen_03_results.png");

            // 5. Open History Screen to inspect registered evaluation & detailed question answers
            vm.OpenHistoryCommand.Execute(null);
            CaptureScreen("screen_04_history.png");
        });

        thread.SetApartmentState(ApartmentState.STA);
        thread.Start();
        thread.Join();

        Assert.True(File.Exists(Path.Combine(ArtifactsDir, "screen_01_welcome.png")));
        Assert.True(File.Exists(Path.Combine(ArtifactsDir, "screen_02_questionnaire.png")));
        Assert.True(File.Exists(Path.Combine(ArtifactsDir, "screen_03_results.png")));
        Assert.True(File.Exists(Path.Combine(ArtifactsDir, "screen_04_history.png")));
    }
}
