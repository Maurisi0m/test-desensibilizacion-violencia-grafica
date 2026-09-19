// SOS Engine: 4-7-8 Breathing Pacer & 5-4-3-2-1 Sensory Grounding
let breathingInterval = null;
let breathingPhase = 'idle';
let currentSeconds = 0;
let cycleCount = 0;

const PHASES = [
  { name: 'Inhala por la nariz...', duration: 4, class: 'breathe-inhale', soundFreq: 330 },
  { name: 'Sostén el aire con calma...', duration: 7, class: 'breathe-hold', soundFreq: 440 },
  { name: 'Exhala suave por la boca...', duration: 8, class: 'breathe-exhale', soundFreq: 260 }
];

document.addEventListener('DOMContentLoaded', () => {
  initBreathingControls();
  initGroundingStepper();
});

function initBreathingControls() {
  const startBtn = document.getElementById('start-breathe-btn');
  const stopBtn = document.getElementById('stop-breathe-btn');
  if (!startBtn) return;

  startBtn.addEventListener('click', startBreathing);
  if (stopBtn) stopBtn.addEventListener('click', stopBreathing);
}

function startBreathing() {
  const startBtn = document.getElementById('start-breathe-btn');
  const stopBtn = document.getElementById('stop-breathe-btn');
  const orb = document.getElementById('breathing-orb');
  const instruction = document.getElementById('breathe-instruction');
  const timerDisplay = document.getElementById('breathe-timer');
  const cycleDisplay = document.getElementById('breathe-cycles');

  if (breathingInterval) clearInterval(breathingInterval);

  startBtn.style.display = 'none';
  if (stopBtn) stopBtn.style.display = 'inline-flex';

  cycleCount = 1;
  let phaseIdx = 0;
  
  function applyPhase() {
    const p = PHASES[phaseIdx];
    currentSeconds = p.duration;

    if (orb) {
      orb.className = 'breathing-orb ' + p.class;
    }
    if (instruction) instruction.innerText = p.name;
    if (timerDisplay) timerDisplay.innerText = currentSeconds + 's';
    if (cycleDisplay) cycleDisplay.innerText = `Ciclo: ${cycleCount}/4`;

    if (window.playCalmTone) window.playCalmTone(p.soundFreq, 'sine', 0.5);

    breathingInterval = setInterval(() => {
      currentSeconds--;
      if (timerDisplay) timerDisplay.innerText = currentSeconds + 's';

      if (currentSeconds <= 0) {
        clearInterval(breathingInterval);
        phaseIdx++;
        if (phaseIdx >= PHASES.length) {
          phaseIdx = 0;
          cycleCount++;
          if (cycleCount > 4) {
            finishBreathing();
            return;
          }
        }
        applyPhase();
      }
    }, 1000);
  }

  applyPhase();
}

function stopBreathing() {
  if (breathingInterval) clearInterval(breathingInterval);
  breathingInterval = null;

  const startBtn = document.getElementById('start-breathe-btn');
  const stopBtn = document.getElementById('stop-breathe-btn');
  const orb = document.getElementById('breathing-orb');
  const instruction = document.getElementById('breathe-instruction');
  const timerDisplay = document.getElementById('breathe-timer');

  if (startBtn) startBtn.style.display = 'inline-flex';
  if (stopBtn) stopBtn.style.display = 'none';
  if (orb) orb.className = 'breathing-orb';
  if (instruction) instruction.innerText = 'Presiona Iniciar para comenzar';
  if (timerDisplay) timerDisplay.innerText = '4-7-8';
}

function finishBreathing() {
  stopBreathing();
  const instruction = document.getElementById('breathe-instruction');
  if (instruction) {
    instruction.innerHTML = '✨ ¡Excelente trabajo! Tu ritmo cardíaco y niveles de cortisol han disminuido.';
  }
  if (window.showToast) window.showToast('Sesión de respiración completada con éxito', 'success');
}

// 5-4-3-2-1 Sensory Grounding Stepper
function initGroundingStepper() {
  const steps = document.querySelectorAll('.grounding-step-card');
  if (!steps.length) return;

  steps.forEach((step, idx) => {
    const nextBtn = step.querySelector('.btn-next-step');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        step.classList.remove('active');
        step.style.opacity = '0.6';
        if (steps[idx + 1]) {
          steps[idx + 1].classList.add('active');
          steps[idx + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const completeCard = document.getElementById('grounding-complete');
          if (completeCard) {
            completeCard.style.display = 'block';
            completeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          if (window.showToast) window.showToast('¡Has recuperado tu anclaje con el entorno presente!', 'success');
        }
      });
    }
  });
}
