// =========================================================
// Ano no rodapé
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Navbar: sombra ao rolar + menu mobile
// =========================================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Scroll reveal
// =========================================================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => observer.observe(el));
}

// =========================================================
// Typewriter no editor de código do hero
// =========================================================
const codeLines = [
  'const evelyn = {',
  '  cargo: "Engenheira de Software",',
  '  foco: ["React", "Next.js", "TypeScript"],',
  '  local: "Fortaleza, CE",',
  '  disponivel: true,',
  '};',
];

const typedCodeEl = document.getElementById('typedCode');
const caretEl = document.getElementById('caret');

function typeCode() {
  if (reduceMotion) {
    typedCodeEl.textContent = codeLines.join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let output = '';

  function step() {
    if (lineIndex >= codeLines.length) {
      caretEl.style.animation = 'blink 1s step-end infinite';
      return;
    }

    const currentLine = codeLines[lineIndex];

    if (charIndex < currentLine.length) {
      output += currentLine[charIndex];
      typedCodeEl.textContent = output;
      charIndex++;
      setTimeout(step, 18 + Math.random() * 22);
    } else {
      output += '\n';
      typedCodeEl.textContent = output;
      lineIndex++;
      charIndex = 0;
      setTimeout(step, 120);
    }
  }

  step();
}

// Começa a digitação quando o hero entra em vista (ou de imediato, já que fica acima da dobra)
typeCode();
