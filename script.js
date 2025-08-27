// Hamburger menu functionality
const hamburger = document.querySelector('.group');
const menu = document.querySelector('.group > div:last-child');

// Fonction pour ouvrir le menu
const openMenu = () => {
  menu.classList.remove('menu-closed');
  menu.classList.add('menu-open');
};

// Fonction pour fermer le menu
const closeMenu = () => {
  menu.classList.remove('menu-open');
  menu.classList.add('menu-closed');
};

// Fonction pour gérer l'ouverture/fermeture du menu
const toggleMenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  const isOpen = menu.classList.contains('menu-open');
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
};

// Initialisation des événements
const initMenuEvents = () => {
  // Supprimer tous les event listeners existants
  hamburger.removeEventListener('mouseenter', openMenu);
  hamburger.removeEventListener('mouseleave', closeMenu);
  hamburger.removeEventListener('click', toggleMenu);
  
  // Supprimer les event listeners de fermeture
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', closeMenu);
  
  if (window.innerWidth > 768) {
    // Desktop: événements hover
    hamburger.addEventListener('mouseenter', openMenu);
    hamburger.addEventListener('mouseleave', closeMenu);
  } else {
    // Mobile: événements click/touch
    hamburger.addEventListener('click', toggleMenu);
    
    // Fermer le menu quand on clique ailleurs
    document.addEventListener('click', handleClickOutside);
    
    // Fermer le menu sur scroll
    window.addEventListener('scroll', closeMenu);
  }
};

// Fonction pour gérer le clic en dehors du menu
const handleClickOutside = (e) => {
  if (!hamburger.contains(e.target)) {
    closeMenu();
  }
};

// Initialiser le menu en état fermé
const initMenu = () => {
  menu.classList.add('menu-closed');
};

// Initialiser les événements au chargement
initMenu();
initMenuEvents();

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', initMenuEvents);

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
class Carousel {
  constructor() {
    this.container = document.querySelector('.carousel-container');
    this.desktopView = document.querySelector('.desktop-view');
    this.mobileView = document.querySelector('.mobile-view');
    this.mobileElements = document.querySelectorAll('.mobile-only');
    this.slides = document.querySelectorAll('.mobile-view .carousel-slide');
    this.prevBtn = document.querySelector('.carousel-prev');
    this.nextBtn = document.querySelector('.carousel-next');
    this.indicators = document.querySelectorAll('.carousel-indicator');
    
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.isTransitioning = false;
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
    this.isMobile = false;
    
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    console.log('Carousel init, slides count:', this.slideCount);
    
    // Détection mobile/desktop
    this.checkDeviceType();
    
    // Event listeners pour le redimensionnement
    window.addEventListener('resize', () => this.checkDeviceType());
    
    // Initialisation immédiate
    if (this.isMobile) {
      this.initMobileCarousel();
    } else {
      this.initDesktopEffects();
    }
  }
  
  checkDeviceType() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;
    
    console.log('Device type check:', { wasMobile, isMobile: this.isMobile, width: window.innerWidth });
    
    if (this.isMobile !== wasMobile) {
      this.toggleView();
    }
  }
  
  toggleView() {
    console.log('Toggling view, isMobile:', this.isMobile);
    
    if (this.isMobile) {
      // Afficher la version mobile
      this.desktopView.style.display = 'none';
      this.mobileView.style.display = 'block';
      this.mobileElements.forEach(el => el.style.display = 'block');
      this.initMobileCarousel();
    } else {
      // Afficher la version desktop
      this.desktopView.style.display = 'flex';
      this.mobileView.style.display = 'none';
      this.mobileElements.forEach(el => el.style.display = 'none');
      this.destroyMobileCarousel();
      this.initDesktopEffects();
    }
  }
  
  initMobileCarousel() {
    console.log('Initializing mobile carousel');
    
    if (!this.slides.length || !this.prevBtn || !this.nextBtn) {
      console.error('Mobile carousel elements not found');
      return;
    }
    
    // S'assurer que la vue mobile est visible
    this.mobileView.style.display = 'block';
    
    // Event listeners pour les boutons
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Event listeners pour les indicateurs
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Event listeners pour le touch/swipe
    this.setupTouchEvents();
    
    // Event listeners pour le clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    
    // Défilement automatique
    this.startAutoPlay();
    
    // Mise à jour initiale
    this.updateCarousel();
  }
  
  initDesktopEffects() {
    console.log('Initializing desktop effects');
    
    // Effet de survol sur desktop pour les images
    const desktopSlides = document.querySelectorAll('.desktop-view .carousel-slide');
    desktopSlides.forEach(img => {
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
  }
  
  destroyMobileCarousel() {
    console.log('Destroying mobile carousel');
    // Nettoyer les event listeners si nécessaire
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
  
  setupTouchEvents() {
    if (!this.container) return;
    
    console.log('Setting up touch events');
    
    // Touch events pour mobile
    this.container.addEventListener('touchstart', (e) => {
      this.startX = e.touches[0].clientX;
      this.isDragging = true;
      this.stopAutoPlay();
    });
    
    this.container.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      this.currentX = e.touches[0].clientX;
    });
    
    this.container.addEventListener('touchend', (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      
      const diff = this.currentX - this.startX;
      const threshold = this.container.offsetWidth * 0.3;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      }
      
      this.startAutoPlay();
    });
  }
  
  prevSlide() {
    if (this.isTransitioning) return;
    this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    console.log('Previous slide, current:', this.currentSlide);
    this.updateCarousel();
  }
  
  nextSlide() {
    if (this.isTransitioning) return;
    this.currentSlide = (this.currentSlide + 1) % this.slideCount;
    console.log('Next slide, current:', this.currentSlide);
    this.updateCarousel();
  }
  
  goToSlide(index) {
    if (this.isTransitioning || index === this.currentSlide) return;
    this.currentSlide = index;
    console.log('Go to slide:', this.currentSlide);
    this.updateCarousel();
  }
  
  updateCarousel() {
    if (this.isTransitioning) return;
    
    console.log('Updating carousel, slide:', this.currentSlide);
    
    this.isTransitioning = true;
    
    // Masquer toutes les images
    this.slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.style.opacity = '1';
        slide.classList.add('active');
      } else {
        slide.style.opacity = '0';
        slide.classList.remove('active');
      }
    });
    
    // Mise à jour des indicateurs
    this.indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.style.background = 'rgba(255,255,255,0.9)';
      } else {
        indicator.style.background = 'rgba(255,255,255,0.5)';
      }
    });
    
    // Reset de la transition après l'animation
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

// Initialisation du carrousel quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  new Carousel();
});

// Pause du défilement automatique quand la page n'est pas visible
document.addEventListener('visibilitychange', () => {
  const carousel = window.carouselInstance;
  if (document.hidden) {
    if (carousel && carousel.stopAutoPlay) carousel.stopAutoPlay();
  } else {
    if (carousel && carousel.startAutoPlay) carousel.startAutoPlay();
  }
});