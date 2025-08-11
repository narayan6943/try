// Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initAnimations();
    initScrollEffects();
    initProductCards();
    initSmoothScrolling();
    initStatsCounter();
    initPricingCards();
    initServiceCategories();
    initServiceItems();
    
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
        const animateElements = document.querySelectorAll('.product-card, .pricing-card, .use-case-card, .testimonial-card, .detail-card, .section-header');
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
    
    // Product cards interaction
    function initProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add click functionality for future expansion
            card.addEventListener('click', function() {
                const productName = this.querySelector('h3').textContent;
                console.log(`Product selected: ${productName}`);
                // Future: Add modal or navigation to detailed product page
            });
        });
    }
    
    // Pricing cards interaction
    function initPricingCards() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add click functionality for pricing selection
            card.addEventListener('click', function() {
                const planName = this.querySelector('h4').textContent;
                console.log(`Plan selected: ${planName}`);
                // Future: Add pricing selection functionality
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
                    const isMultiplier = finalValue.includes('x');
                    
                    if (isTime) {
                        // For time-based stats, just animate the appearance
                        target.style.opacity = '0';
                        target.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            target.style.transition = 'all 0.6s ease-out';
                            target.style.opacity = '1';
                            target.style.transform = 'translateY(0)';
                        }, 200);
                    } else if (isMultiplier) {
                        // For multiplier stats, animate the appearance
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
                        animateCounter(target, 0, numericValue, isPercentage ? '%' : '');
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
        const elements = document.querySelectorAll('.product-card, .pricing-card, .use-case-card, .testimonial-card, .detail-card');
        
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
    
    const sections = document.querySelectorAll('.products-overview, .product-details-section, .use-cases-section, .tech-stack-section, .testimonials-section, .cta-section');
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
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Learn more about ${card.querySelector('h3').textContent}`);
            
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Add ARIA labels to pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Select ${card.querySelector('h4').textContent} plan`);
            
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
    
    // Add product filtering functionality (for future use)
    function initProductFiltering() {
        // This can be expanded to add filtering by category, price, etc.
        console.log('Product filtering system initialized');
    }
    
    // Add pricing calculator functionality (for future use)
    function initPricingCalculator() {
        // This can be expanded to add dynamic pricing calculations
        console.log('Pricing calculator initialized');
    }
    
    // Initialize additional features
    initProductFiltering();
    initPricingCalculator();
    
    // Service Categories interaction
    function initServiceCategories() {
        const serviceCategories = document.querySelectorAll('.service-category');
        
        serviceCategories.forEach(category => {
            category.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.01)';
            });
            
            category.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add click functionality for category expansion
            category.addEventListener('click', function() {
                const categoryName = this.querySelector('h3').textContent;
                console.log(`Service category selected: ${categoryName}`);
                // Future: Add category expansion or filtering functionality
            });
        });
    }
    
    // Service Items interaction
    function initServiceItems() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        serviceItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
                this.style.borderColor = 'var(--accent-color)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.borderColor = 'rgba(102, 126, 234, 0.1)';
            });
            
            // Add click functionality for service details
            item.addEventListener('click', function() {
                const serviceName = this.querySelector('h4').textContent;
                console.log(`Service selected: ${serviceName}`);
                // Future: Add service detail modal or navigation
            });
        });
        
        // Add staggered animation for service items
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        serviceItems.forEach(item => serviceObserver.observe(item));
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
    
    .product-card,
    .pricing-card,
    .use-case-card,
    .testimonial-card,
    .detail-card {
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .product-card:hover,
    .pricing-card:hover,
    .use-case-card:hover,
    .testimonial-card:hover,
    .detail-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .service-category,
    .service-item,
    .feature-card {
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .service-category:hover,
    .service-item:hover,
    .feature-card:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
    }
    
    .btn-primary, .btn-secondary {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-primary:hover, .btn-secondary:hover {
        transform: translateY(-2px) scale(1.02);
    }
    
    .tech-tag {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .tech-tag:hover {
        transform: translateY(-2px) scale(1.05);
    }
`;

document.head.appendChild(style); 