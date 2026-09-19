// Detox Tracker - 7-Day Digital Cleanse
const DETOX_KEY = 'reconecta_detox_state_v1';

document.addEventListener('DOMContentLoaded', () => {
  loadDetoxProgress();
  initDetoxCheckboxes();
});

function getDetoxState() {
  try {
    const raw = localStorage.getItem(DETOX_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveDetoxState(state) {
  try {
    localStorage.setItem(DETOX_KEY, JSON.stringify(state));
  } catch (e) {}
}

function loadDetoxProgress() {
  const state = getDetoxState();
  const dayCards = document.querySelectorAll('.detox-day-card');
  let completedCount = 0;

  dayCards.forEach(card => {
    const dayId = card.getAttribute('data-day');
    const isDone = !!state[dayId];
    if (isDone) {
      card.classList.add('completed');
      const icon = card.querySelector('.detox-checkbox');
      if (icon) icon.innerHTML = '✓';
      completedCount++;
    } else {
      card.classList.remove('completed');
      const icon = card.querySelector('.detox-checkbox');
      if (icon) icon.innerHTML = '';
    }
  });

  updateProgressDisplay(completedCount, dayCards.length);
}

function initDetoxCheckboxes() {
  const dayCards = document.querySelectorAll('.detox-day-card');
  dayCards.forEach(card => {
    card.addEventListener('click', () => {
      const dayId = card.getAttribute('data-day');
      const state = getDetoxState();
      state[dayId] = !state[dayId];
      saveDetoxState(state);
      loadDetoxProgress();

      if (state[dayId]) {
        if (window.playCalmTone) window.playCalmTone(520, 'sine', 0.25);
        if (window.showToast) window.showToast(`¡Día ${dayId} completado! Estás recuperando el control de tu atención.`, 'success');
      }
    });
  });

  const resetBtn = document.getElementById('reset-detox-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('¿Deseas reiniciar el reto de 7 días?')) {
        localStorage.removeItem(DETOX_KEY);
        loadDetoxProgress();
        if (window.showToast) window.showToast('Reto reiniciado correctamente');
      }
    });
  }
}

function updateProgressDisplay(completed, total) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const bar = document.getElementById('detox-progress-bar');
  const text = document.getElementById('detox-progress-text');
  const streak = document.getElementById('detox-streak-text');

  if (bar) bar.style.width = pct + '%';
  if (text) text.innerText = `${pct}% completado (${completed} de ${total} días)`;
  if (streak) streak.innerText = completed === 7 ? '🏆 ¡Reto Superado!' : `${completed} días activos`;

  const congratsCard = document.getElementById('detox-complete-congrats');
  if (congratsCard) {
    congratsCard.style.display = completed === 7 ? 'block' : 'none';
  }
}
