// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Navigation scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Hide scroll indicator on scroll
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    scrollIndicator.classList.add('hidden');
  } else {
    scrollIndicator.classList.remove('hidden');
  }
});

// Hero animations
gsap.timeline()
  .to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.3
  })
  .to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.7')
  .to('.hero-buttons', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.7');

// Parallax effect for orb
gsap.to('.orb-container', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  },
  y: 200,
  scale: 0.8,
  opacity: 0
});

// Animate section headers
gsap.utils.toArray('.section-header').forEach(header => {
  gsap.to(header, {
    scrollTrigger: {
      trigger: header,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  });
});

// Animate category cards with stagger
const categoryCards = gsap.utils.toArray('.category-card');

categoryCards.forEach((card, index) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      end: 'top 60%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: index * 0.2,
    ease: 'power3.out'
  });
});

// Animate story cards
const storyCards = gsap.utils.toArray('.story-card');

storyCards.forEach((card, index) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      end: 'top 60%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: index * 0.15,
    ease: 'power3.out'
  });
});

// Horizontal scroll for stories on desktop
if (window.innerWidth > 768) {
  const storiesSlider = document.querySelector('.stories-slider');
  let isDown = false;
  let startX;
  let scrollLeft;

  storiesSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    storiesSlider.style.cursor = 'grabbing';
    startX = e.pageX - storiesSlider.offsetLeft;
    scrollLeft = storiesSlider.scrollLeft;
  });

  storiesSlider.addEventListener('mouseleave', () => {
    isDown = false;
    storiesSlider.style.cursor = 'grab';
  });

  storiesSlider.addEventListener('mouseup', () => {
    isDown = false;
    storiesSlider.style.cursor = 'grab';
  });

  storiesSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - storiesSlider.offsetLeft;
    const walk = (x - startX) * 2;
    storiesSlider.scrollLeft = scrollLeft - walk;
  });

  storiesSlider.style.cursor = 'grab';
}

// Animate team members
const teamMembers = gsap.utils.toArray('.team-member');

teamMembers.forEach((member, index) => {
  gsap.to(member, {
    scrollTrigger: {
      trigger: member,
      start: 'top 85%',
      end: 'top 60%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: index * 0.15,
    ease: 'power3.out'
  });
});

// Animate news items
const newsItems = gsap.utils.toArray('.news-item');

newsItems.forEach((item, index) => {
  gsap.to(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      end: 'top 60%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: index * 0.1,
    ease: 'power3.out'
  });
});

// Interactive cursor effect (desktop only)
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(188, 111, 241, 0.5);
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.2s ease;
    mix-blend-mode: screen;
    display: none;
  `;
  document.body.appendChild(cursor);

  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(188, 111, 241, 0.3);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    display: none;
  `;
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursorGlow.style.display = 'block';
    
    gsap.to(cursor, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.1
    });
    
    gsap.to(cursorGlow, {
      x: e.clientX - 20,
      y: e.clientY - 20,
      duration: 0.2
    });
  });

  // Scale cursor on hover
  const hoverElements = document.querySelectorAll('a, button, .category-card, .story-card, .news-item');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      gsap.to(cursorGlow, { scale: 1.5, duration: 0.3 });
    });
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(cursorGlow, { scale: 1, duration: 0.3 });
    });
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Don't prevent default for links that just go to '#'
    if (href === '#') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  if (navMenu.style.display === 'flex') {
    navMenu.style.display = 'none';
  } else {
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '100%';
    navMenu.style.right = '0';
    navMenu.style.background = 'rgba(26, 26, 46, 0.98)';
    navMenu.style.padding = '24px';
    navMenu.style.borderRadius = '0 0 0 16px';
    navMenu.style.minWidth = '200px';
  }
});

// Add 3D tilt effect to cards
const cards = document.querySelectorAll('.category-card, .story-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Add gradient animation to hero background
const heroGradient = document.querySelector('.hero-gradient');
let gradientAngle = 135;

function animateGradient() {
  gradientAngle += 0.5;
  if (gradientAngle >= 360) gradientAngle = 0;
  
  const x = 50 + Math.cos(gradientAngle * Math.PI / 180) * 20;
  const y = 50 + Math.sin(gradientAngle * Math.PI / 180) * 20;
  
  heroGradient.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(127, 83, 172, 0.3) 0%, rgba(100, 125, 238, 0.2) 35%, transparent 70%)`;
  
  requestAnimationFrame(animateGradient);
}

animateGradient();

// Add scroll-based color shift
window.addEventListener('scroll', () => {
  const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
  const hue = 260 + (scrollPercent * 40); // Shift from purple to blue
  
  document.documentElement.style.setProperty('--color-primary', `hsl(${hue}, 45%, 55%)`);
});