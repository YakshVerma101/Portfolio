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

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_nhlrave';
const EMAILJS_TEMPLATE_ID = 'template_hlvfc0k';
const EMAILJS_PUBLIC_KEY = '2BD0zxWYfpV9nXBJM';

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');

function showMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.style.display = 'block';
  formMessage.style.color = isError ? '#ef4444' : '#10b981';
  formMessage.style.backgroundColor = isError 
    ? 'rgba(239, 68, 68, 0.1)' 
    : 'rgba(16, 185, 129, 0.1)';
  formMessage.style.padding = '12px 16px';
  formMessage.style.borderRadius = '8px';
  formMessage.style.marginTop = '8px';
  
  // Scroll to message
  formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check if EmailJS is configured
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
        EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      showMessage('Email service not configured. Please set up EmailJS credentials.', true);
      return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Get form data
    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message'),
      to_email: 'yakshverma101@gmail.com', // Your email address
    };
    
    try {
      // Send email using EmailJS
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      
      // Success
      showMessage('Message sent successfully! I\'ll get back to you soon.', false);
      contactForm.reset();
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      showMessage('Failed to send message. Please try again or email me directly at yakshverma101@gmail.com', true);
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
}
