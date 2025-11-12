const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const year = document.getElementById('year');
const nav = document.getElementById('top-nav');

const STORAGE_KEY = 'yaksh-portfolio-theme';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
  localStorage.setItem(STORAGE_KEY, theme);
}

function initializeTheme() {
  const storedTheme = localStorage.getItem(STORAGE_KEY);
  if (storedTheme) {
    setTheme(storedTheme);
    return;
  }
  setTheme(prefersDark.matches ? 'dark' : 'light');
}

function toggleTheme() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  setTheme(isDark ? 'light' : 'dark');
}

function updateNavAppearance() {
  if (window.scrollY > 80) {
    nav.classList.add('nav-condensed');
  } else {
    nav.classList.remove('nav-condensed');
  }
}

function handleReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach((el) => {
      el.style.setProperty('animation', 'none', 'important');
      el.style.setProperty('transition', 'none', 'important');
    });
  }
}

prefersDark.addEventListener('change', (event) => {
  setTheme(event.matches ? 'dark' : 'light');
});

themeToggle.addEventListener('click', toggleTheme);
window.addEventListener('scroll', updateNavAppearance);

initializeTheme();
updateNavAppearance();
handleReducedMotion();

year.textContent = new Date().getFullYear();
