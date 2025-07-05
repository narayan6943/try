"use strict";
// =====================
// Utility: Set current year in footer
// =====================
document.getElementById('footer-year').textContent = new Date().getFullYear();
// =====================
// Mobile Hamburger Menu Toggle
// =====================
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    mobileNav.hidden = expanded;
    if (!expanded) {
        mobileNav.querySelector('a').focus();
    }
});
// Close mobile nav on link click
mobileNav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
    }
});
// =====================
// Sticky Header Shadow on Scroll
// =====================
const header = document.getElementById('site-header');
let lastScrollY = window.scrollY;
let ticking = false;
function handleHeaderShadow() {
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 16px 0 rgba(0,0,0,0.16)';
    } else {
        header.style.boxShadow = '0 2px 16px 0 rgba(0,0,0,0.08)';
    }
}
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleHeaderShadow();
            ticking = false;
        });
        ticking = true;
    }
});
// =====================
// Dark Mode Toggle (with animated sun/moon morph)
// =====================
const darkToggle = document.getElementById('darkmode-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
function setDarkMode(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
    localStorage.setItem('theme', mode);
}
// Detect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setDarkMode(savedTheme);
} else {
    setDarkMode(prefersDark ? 'dark' : 'light');
}
darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(isDark ? 'light' : 'dark');
});
// =====================
// Scroll-Triggered Animations (IntersectionObserver)
// =====================
const animatedElements = document.querySelectorAll('.pain-point-card, .service-card, .how-step, .testimonial-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a staggered delay based on the element's index
            entry.target.style.transitionDelay = `${index * 100}ms`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, {
    threshold: 0.1, // Trigger when 10% of the element is visible
});
animatedElements.forEach(el => {
    observer.observe(el);
});
// =====================
// Smooth Anchor Scroll (Vanilla, Accessible)
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        }
    });
});
// =====================
// Newsletter Form Validation + Animated Feedback
// =====================
const newsletterForm = document.getElementById('newsletter-form');
const newsletterInput = document.getElementById('newsletter-email');
const newsletterSuccess = document.getElementById('newsletter-success');
const newsletterError = document.getElementById('newsletter-error');
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = newsletterInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (valid) {
        newsletterSuccess.style.display = 'block';
        newsletterError.style.display = 'none';
        newsletterInput.value = '';
        confettiBurst(newsletterForm);
    } else {
        newsletterSuccess.style.display = 'none';
        newsletterError.style.display = 'block';
    }
});
// =====================
// Confetti Micro-Burst Animation (Newsletter Success)
// =====================
function confettiBurst(target) {
    const colors = [
        'var(--primary)', 'var(--accent)', '#FFD600', '#fff'
    ];
    for (let i = 0; i < 18; i++) {
        const conf = document.createElement('span');
        conf.style.position = 'absolute';
        conf.style.left = '50%';
        conf.style.top = '0';
        conf.style.width = '8px';
        conf.style.height = '8px';
        conf.style.borderRadius = '50%';
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];
        conf.style.opacity = '0.85';
        conf.style.pointerEvents = 'none';
        conf.style.transform = `translate(-50%, 0)`;
        conf.style.transition = 'transform 0.8s cubic-bezier(.4,0,.2,1), opacity 0.8s';
        target.appendChild(conf);
        setTimeout(() => {
            const angle = (i / 18) * 2 * Math.PI;
            const dist = 48 + Math.random() * 24;
            conf.style.transform = `translate(-50%, -${dist}px) translateX(${Math.cos(angle) * dist}px) translateY(${Math.sin(angle) * dist}px)`;
            conf.style.opacity = '0';
        }, 10);
        setTimeout(() => conf.remove(), 900);
    }
}
// =====================
// Accessibility: Trap focus in mobile nav when open
// =====================
function trapFocus(element) {
    const focusableEls = element.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    element.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        }
    });
}
trapFocus(mobileNav);
// =====================
// Accessibility: Reduce motion for users who prefer it
// =====================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}
// =====================
// Testimonials Slider
// =====================
const slider = document.querySelector('.testimonials-slider');
if (slider) {
    let cards = Array.from(document.querySelectorAll('.testimonial-card'));

    // Clone cards for seamless looping
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone');
        slider.appendChild(clone);
    });

    // Double the cards array for calculations
    cards = Array.from(document.querySelectorAll('.testimonial-card'));

    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Adjust for speed

    function animateTestimonials() {
        scrollAmount += scrollSpeed;
        // Calculate the total width of the original cards
        const totalWidth = (cards.length / 2) * (cards[0].offsetWidth + 32); // card width + gap

        if (scrollAmount >= totalWidth) {
            scrollAmount = 0;
        }

        slider.style.transform = `translateX(-${scrollAmount}px)`;
        requestAnimationFrame(animateTestimonials);
    }

    requestAnimationFrame(animateTestimonials);
}

// Set footer year
const yearSpan = document.getElementById('footer-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
/* Add CSS for .slide-in-left, .slide-in-right, .slide-out-left, .slide-out-right in style.css for smooth transitions. */

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.getAttribute('data-target');
                target.classList.add('visible'); // Trigger CSS animation
                animateCountUp(target, finalValue);
                observer.unobserve(target); // Animate only once
            }
        });
    }, {
        threshold: 0.5 // Start animation when 50% of the element is visible
    });

    const impactNumbers = document.querySelectorAll('.impact-number');
    impactNumbers.forEach(num => observer.observe(num));

    function animateCountUp(el, finalValue) {
        let isX = false;
        let finalNumber = parseInt(finalValue, 10);
        if (/x$/i.test(finalValue)) {
            isX = true;
        }
        const duration = 2000; // 2 seconds
        const frameRate = 60;
        const increment = finalNumber / (duration / 1000 * frameRate);
        let currentNumber = 0;

        function updateNumber() {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                el.textContent = isX ? finalNumber + 'x' : finalNumber;
                return;
            }
            el.textContent = isX ? Math.round(currentNumber) + 'x' : Math.round(currentNumber);
            requestAnimationFrame(updateNumber);
        }
        requestAnimationFrame(updateNumber);
    }

    // Testimonial Carousel (Flickity)
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        new Flickity(testimonialCarousel, {
            // options
            cellAlign: 'left',
            contain: true,
            wrapAround: true,
            autoPlay: 5000,
            prevNextButtons: true,
            pageDots: true,
            imagesLoaded: true,
            setGallerySize: false,
            arrowShape: 'M4.9,46.7c-0.6,0.6-0.6,1.5,0,2.1l20.3,20.3c0.6,0.6,1.5,0.6,2.1,0L48.5,48.8c0.6-0.6,0.6-1.5,0-2.1L27.3,26.4c-0.6-0.6-1.5-0.6-2.1,0L4.9,46.7z'
        });
    }

    // Animated counter for all .impact-number elements
    document.querySelectorAll('.impact-number').forEach(function (el) {
        let text = el.textContent.trim();
        let match = text.match(/^(\d+)(\D*)$/);
        if (!match) return;
        let end = parseInt(match[1], 10);
        let suffix = match[2] || "";
        let duration = 1500;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            el.textContent = Math.floor(progress * end) + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = end + suffix;
            }
        }
        // Only animate if not already at the end value
        if (el.textContent !== (end + suffix)) {
            requestAnimationFrame(step);
        }
    });
});

// --- TCS Navbar Interactivity ---
document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu
  const hamburger = document.querySelector('.tcs-hamburger');
  const mobileNav = document.getElementById('tcs-mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      mobileNav.hidden = !isOpen;
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Dropdowns for mobile
  document.querySelectorAll('.tcs-mobile-nav .has-dropdown > a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.classList.toggle('open');
    });
  });

  // Close mobile nav on outside click (optional)
  document.addEventListener('click', function (e) {
    if (
      mobileNav &&
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileNav.classList.remove('open');
      mobileNav.hidden = true;
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Custom Navbar Hamburger & Mobile Nav
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      mobileNav.hidden = !isOpen;
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileNav.classList.remove('open');
        mobileNav.hidden = true;
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}); 