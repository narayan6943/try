// Solutions Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initAnimations();
    initScrollEffects();
    initIndustryCards();
    initSmoothScrolling();
    initStatsCounter();
    
    // Animation initialization
function initAnimations() {
        // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
        const animateElements = document.querySelectorAll('.solution-category, .industry-card, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    }
    
    // Scroll effects
    function initScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-particles');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Industry cards interaction
    function initIndustryCards() {
        const industryCards = document.querySelectorAll('.industry-card');
        
        industryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
            
            // Add click functionality for future expansion
            card.addEventListener('click', function() {
                const industryName = this.querySelector('h3').textContent;
                console.log(`Industry selected: ${industryName}`);
                // Future: Add modal or navigation to detailed industry page
            });
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Animated stats counter
    function initStatsCounter() {
        const statsElements = document.querySelectorAll('.stat-number');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const isPercentage = finalValue.includes('%');
                    const isTime = finalValue.includes('24/7');
                    
                    if (isTime) {
                        // For time-based stats, just animate the appearance
                        target.style.opacity = '0';
                        target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                            target.style.transition = 'all 0.6s ease-out';
                            target.style.opacity = '1';
                            target.style.transform = 'translateY(0)';
                        }, 200);
                    } else {
                        // For numerical stats, animate the counting
                        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                        animateCounter(target, 0, numericValue, isPercentage ? '%' : '+');
                    }
                    
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statsElements.forEach(el => statsObserver.observe(el));
    }
    
    // Counter animation function
    function animateCounter(element, start, end, suffix) {
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Add loading animation for page elements
    function addLoadingAnimations() {
        const elements = document.querySelectorAll('.solution-category, .industry-card');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Initialize loading animations after a short delay
    setTimeout(addLoadingAnimations, 500);
    
    // Add hover effects for buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add floating animation to hero visual cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
    
    // Add scroll-triggered animations for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.3 });
    
    const sections = document.querySelectorAll('.solutions-overview, .industries-section, .cta-section');
    sections.forEach(section => sectionObserver.observe(section));
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

    // Optimize scroll events
    const optimizedScrollHandler = debounce(() => {
        // Handle scroll-based effects here
    }, 16);
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Add accessibility improvements
    function enhanceAccessibility() {
        // Add ARIA labels to interactive elements
        const industryCards = document.querySelectorAll('.industry-card');
        industryCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Learn more about ${card.querySelector('h3').textContent} AI solutions`);
            
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Add focus indicators
        const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(el => {
            el.addEventListener('focus', function() {
                this.style.outline = '3px solid #ffe082';
                this.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }
    
    enhanceAccessibility();
    
    // Add error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .section-visible {
        animation: fadeIn 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 3px solid #ffe082 !important;
        outline-offset: 2px !important;
    }
    
    .industry-card {
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .industry-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .btn-primary, .btn-secondary {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-primary:hover, .btn-secondary:hover {
        transform: translateY(-2px) scale(1.02);
    }
`;

document.head.appendChild(style); 