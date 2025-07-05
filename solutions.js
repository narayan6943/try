// Solutions Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button, idx) => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active/focus/aria from all
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
            });
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active/focus/aria to clicked
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            button.setAttribute('tabindex', '0');
            document.getElementById(targetTab).classList.add('active');
            document.getElementById(targetTab).focus();
        });
        // Keyboard navigation for tabs
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                let newIdx = idx + (e.key === 'ArrowRight' ? 1 : -1);
                if (newIdx < 0) newIdx = tabButtons.length - 1;
                if (newIdx >= tabButtons.length) newIdx = 0;
                tabButtons[newIdx].focus();
            }
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll for service cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service and industry cards
    const cards = document.querySelectorAll('.service-card, .industry-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects for better interactivity
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
    });

    // Add search functionality (optional enhancement)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search services...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 20px;
        margin: 20px auto;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1rem;
        backdrop-filter: blur(10px);
        display: block;
    `;

    // Insert search input after tab navigation
    const tabNavigation = document.querySelector('.tab-navigation');
    if (tabNavigation) {
        tabNavigation.parentNode.insertBefore(searchInput, tabNavigation.nextSibling);
    }

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const serviceCards = document.querySelectorAll('.service-card');
        const industryCards = document.querySelectorAll('.industry-card');

        // Search in service cards
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const industries = card.querySelector('.service-details p:first-of-type').textContent.toLowerCase();
            const useCases = card.querySelector('.service-details p:last-of-type').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm) || 
                industries.includes(searchTerm) || useCases.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Search in industry cards
        industryCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const solutions = Array.from(card.querySelectorAll('.solution-list li'))
                .map(li => li.textContent.toLowerCase()).join(' ');

            if (title.includes(searchTerm) || solutions.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Add placeholder styling
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        this.style.background = 'rgba(255, 255, 255, 0.15)';
    });

    searchInput.addEventListener('blur', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
}); 