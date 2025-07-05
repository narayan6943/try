document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.product-card, .tier-card, .use-case-card, .testimonial-card, .feature-item, .tech-item');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        // Pause animation initially
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Simple Tab-like functionality for product details (if needed in future)
    // Example:
    // const productNavLinks = document.querySelectorAll('.product-nav a');
    // const productDetailsSections = document.querySelectorAll('.product-details-section');

    // productNavLinks.forEach(link => {
    //     link.addEventListener('click', (e) => {
    //         e.preventDefault();
            
    //         // Deactivate all links and sections
    //         productNavLinks.forEach(l => l.classList.remove('active'));
    //         productDetailsSections.forEach(s => s.style.display = 'none');
            
    //         // Activate clicked link and corresponding section
    //         link.classList.add('active');
    //         const targetId = link.getAttribute('href');
    //         document.querySelector(targetId).style.display = 'block';
    //     });
    // });
}); 