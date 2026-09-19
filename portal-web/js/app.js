// ReConecta Digital - Global App Logic
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAudioBeeps();
});

function initNavigation() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
      menuBtn.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // Active link detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Subtle Audio Feedback via Web Audio API (No external sound files required)
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function initAudioBeeps() {
  window.playCalmTone = (freq = 440, type = 'sine', duration = 0.4) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy handled silently
    }
  };
}

// Toast notification helper
window.showToast = (message, type = 'info') => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 10px; pointer-events: none;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? '#10B981' : (type === 'alert' ? '#F43F5E' : '#6366F1');
  toast.style.cssText = `background: #0F172A; border: 1px solid ${bgColor}; border-left: 4px solid ${bgColor}; color: #F8FAFC; padding: 12px 20px; border-radius: 8px; font-size: 0.9rem; box-shadow: 0 10px 25px rgba(0,0,0,0.5); pointer-events: auto; animation: toastIn 0.3s ease forwards;`;
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};
