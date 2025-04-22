// navbar responsive
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = navLinks.querySelectorAll('a');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      links.forEach(l => l.classList.remove('navlink-active'));
      link.classList.add('navlink-active');
    });
  });
});

// const banner = document.querySelector("#banner");
const tl = gsap.timeline();
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initNavbarAnimation();
  initHeroAnimation();
  initAboutAnimation();
  initColoredDivsAnimation();
  initCatalogAnimation();
  initContactAnimation();
  fetchAndRenderCatalog();
});

// Navbar scroll animation
function initNavbarAnimation() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}

// Hero section animations
function initHeroAnimation() {
    tl.addLabel("start")
    .set("#banner-frame2", { opacity: 0 })
    .set("#cta", { opacity: 0 })

    .addLabel("frame01")
    .from("#banner-frame1", { scale: 1, duration: 1.5, ease: "power1.out" }, "frame01")

    .addLabel("frame02")
    // // hide
    .to("#banner-frame1", { opacity: 0, duration: 1.5, ease:"power1.out"}, "frame02+=1.5") 
    // // show
    .to("#banner-frame2", { opacity: 1, scale: 1.1, duration: 1, ease:"power1.out"}, "frame02+=3") 
    .to("#cta", { opacity: 1, duration: 0.8, ease:"power1.out"}, "frame02+=4.5")
}

// About section animations
function initAboutAnimation() {
  gsap.from('.about-section', { 
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 80%'
    },
    duration: 0.8, 
    y: 50, 
    opacity: 0, 
    ease: 'power3.out'
  });
}

// img divs animations
function initColoredDivsAnimation() {
  const animationDivs = document.querySelectorAll('.animation-div');
  
  if (animationDivs.length === 0) return;
  
  // Create the animation timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.animation-section',
      start: 'top 70%',
      end: 'bottom 50%',
      toggleActions: 'play none none reverse',
    },
  });

  // Animate each div with a stagger effect
  tl.to(
    animationDivs,
    { 
      y: 0, 
      opacity: 1,
      scale: 1,
      duration: 0.6, 
      stagger: 0.15,
      ease: 'bounce.out',
    }
  );
}
// catalog animation
function fetchAndRenderCatalog() {
    fetch('js/products.json')
      .then(response => response.json())
      .then(renderCatalog)
      .catch(error => console.error('Error al cargar los productos:', error));
}
function renderCatalog(products) {
const grid = document.querySelector('.products-grid');
grid.innerHTML = ''; // limpia antes de renderizar

products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
    <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <a href="#" target="_blank" class="whatsapp-button">💬 Consultar</a>
    </div>
    `;
    grid.appendChild(card);
});
}
function initCatalogAnimation() {
  gsap.from('.catalog-section', { 
    scrollTrigger: {
      trigger: '.catalog-section',
      start: 'top 50%'
    },
    duration: 0.8, 
    y: 50, 
    opacity: 0, 
    ease: 'power3.out'
  });
}

// Contact section animations
function initContactAnimation() {
  gsap.from('.contact-section', { 
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 80%'
    },
    duration: 0.8, 
    y: 50, 
    opacity: 0, 
    ease: 'power3.out'
  });
  
  gsap.from('.contact-card', { 
    scrollTrigger: {
      trigger: '.contact-cards',
      start: 'top 90%'
    },
    duration: 0.5, 
    opacity: 1, 
    y: 30, 
    stagger: 0.1,
    ease: 'power2.out'
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
});
  
