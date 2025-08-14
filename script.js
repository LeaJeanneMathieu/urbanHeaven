// Hamburger menu functionality
const hamburger = document.querySelector('.group');
const menu = document.querySelector('.group > div:last-child');

hamburger.addEventListener('mouseenter', () => {
  menu.classList.add('opacity-100', 'visible', 'translate-y-0');
  menu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
});

hamburger.addEventListener('mouseleave', () => {
  menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
  menu.classList.add('opacity-0', 'invisible', '-translate-y-2');
});

// Parallax effect
document.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  // Header parallax
  const headerBackgrounds = document.querySelectorAll("header .parallax-bg");
  headerBackgrounds.forEach((el) => {
    const speed = 0.2;
    el.style.transform = `translateY(${scrollTop * speed}px)`;
  });

  // Sections parallax
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
      const progress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
      
      // Image parallax
      const image = section.querySelector('.section-img');
      if (image) {
        const translateY = -400 * progress;
        image.style.transform = `translateY(${translateY}px) scale(${1 + progress * 0.1})`;
      }

      // Content parallax
      const content = section.querySelector('.section-content');
      if (content) {
        const translateY = -150 * progress;
        content.style.transform = `translateY(${translateY}px)`;
      }
    }
  });
});

// Scroll reveal
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('opacity-100', 'translate-y-0');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Carousel functionality
const carouselImages = document.querySelectorAll('section:nth-child(3) img');

carouselImages.forEach(img => {
  img.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  img.style.cursor = 'pointer';
  img.style.willChange = 'transform, box-shadow';
  img.style.transformOrigin = 'center';
  img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  
  img.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.05)';
    img.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
  });
  
  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
    img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  });
});