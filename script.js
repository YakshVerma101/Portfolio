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

// Smooth scroll with offset for navigation links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#hero') {
        // For hero, scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement && nav) {
        // Calculate nav bar bottom position: top position (24px) + nav height + extra spacing
        const navTop = 24; // Nav bar is positioned 24px from top
        const navHeight = nav.offsetHeight;
        const extraSpacing = 40; // Extra space for comfortable viewing
        const totalOffset = navTop + navHeight + extraSpacing;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = Math.max(0, targetPosition - totalOffset);
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize smooth scroll when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSmoothScroll);
} else {
  setupSmoothScroll();
}

initializeTheme();
updateNavAppearance();
handleReducedMotion();

year.textContent = new Date().getFullYear();

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_nhlrave';
const EMAILJS_TEMPLATE_ID = 'template_hlvfc0k';
const EMAILJS_PUBLIC_KEY = '2BD0zxWYfpV9nXBJM';

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

// Initialize EmailJS when the library is loaded
function initializeEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    return true;
  }
  return false;
}

// Wait for EmailJS to load
function waitForEmailJS() {
  return new Promise((resolve, reject) => {
    if (typeof emailjs !== 'undefined') {
      resolve();
      return;
    }
    
    // Wait up to 5 seconds for EmailJS to load
    let attempts = 0;
    const maxAttempts = 50;
    const checkInterval = setInterval(() => {
      attempts++;
      if (typeof emailjs !== 'undefined') {
        clearInterval(checkInterval);
        resolve();
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        reject(new Error('EmailJS library failed to load'));
      }
    }, 100);
  });
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
    
    // Check if EmailJS is available
    try {
      await waitForEmailJS();
      if (!initializeEmailJS()) {
        throw new Error('EmailJS library not available');
      }
    } catch (error) {
      console.error('EmailJS initialization error:', error);
      showMessage('Email service is not available. Please refresh the page and try again.', true);
      return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
      // Send email using EmailJS sendForm method
      // EmailJS v4: sendForm(serviceId, templateId, formElement, publicKey)
      const response = await emailjs.sendForm(
        EMAILJS_SERVICE_ID, 
        EMAILJS_TEMPLATE_ID, 
        contactForm,
        EMAILJS_PUBLIC_KEY
      );
      
      // Success
      if (response.status === 200) {
        showMessage('Message sent successfully! I\'ll get back to you soon.', false);
        contactForm.reset();
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send message. ';
      
      if (error.text) {
        // EmailJS provides error details in error.text
        if (error.text.includes('Invalid') || error.text.includes('not found')) {
          errorMessage += 'Email service configuration error. ';
        } else if (error.text.includes('quota') || error.text.includes('limit')) {
          errorMessage += 'Email service quota exceeded. ';
        } else {
          errorMessage += `Error: ${error.text}. `;
        }
      }
      
      errorMessage += 'Please try again or email me directly at yakshverma101@gmail.com';
      showMessage(errorMessage, true);
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
}

// Resume Download Handler
async function downloadResume() {
  const resumePath = 'resume/Yaksh_Verma_Resume.pdf';
  const fileName = 'Yaksh_Verma_Resume.pdf';
  
  try {
    // Fetch the file
    const response = await fetch(resumePath);
    if (!response.ok) {
      throw new Error('Failed to fetch resume');
    }
    
    // Create a blob from the response
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Download error:', error);
    // Fallback: open in new tab if download fails
    window.open(resumePath, '_blank');
  }
}

// Resume View Handler
function viewResumeInNewTab() {
  const resumePath = 'resume/Yaksh_Verma_Resume.pdf';
  window.open(resumePath, '_blank', 'noopener,noreferrer');
}

// Initialize resume buttons
function initializeResumeButtons() {
  const downloadBtn = document.querySelector('.resume-download-btn');
  const viewBtn = document.querySelector('.resume-view-btn');
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadResume();
    });
  }
  
  if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      viewResumeInNewTab();
    });
  }
}

// Initialize email link handler
function initializeEmailLink() {
  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    emailLink.addEventListener('click', function(e) {
      // Prevent default to handle via JavaScript
      e.preventDefault();
      
      // Ensure mailto link works
      const email = 'yakshverma101@gmail.com';
      const subject = 'Contact from Portfolio';
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
      
      // Try to open email client
      try {
        window.location.href = mailtoLink;
      } catch (error) {
        console.error('Error opening email client:', error);
        // Fallback: show email address
        alert(`Email: ${email}\n\nPlease copy this email address and send me a message!`);
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeResumeButtons();
    initializeEmailLink();
  });
} else {
  // DOM is already loaded
  initializeResumeButtons();
  initializeEmailLink();
}
