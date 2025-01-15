// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    initializeSmoothScroll();
    setupCTAButtons();
    initializeResponsiveImages();
});

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}

// Initialize smooth scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup CTA buttons
function setupCTAButtons() {
    const chromeStoreURL = '#'; // Replace with actual Chrome Store URL
    
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add loading state
            button.classList.add('loading');
            
            // Simulate loading (remove in production)
            setTimeout(() => {
                window.open(chromeStoreURL, '_blank');
                button.classList.remove('loading');
            }, 300);
        });
    });
}

// Handle responsive images
function initializeResponsiveImages() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}

// Handle errors
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
    // Implement your error tracking here
});

// Handle responsive behavior
function handleResponsive() {
    const width = window.innerWidth;
    const header = document.querySelector('header');
    
    if (width < 768) {
        header.classList.add('mobile');
    } else {
        header.classList.remove('mobile');
    }
}

// Initialize responsive behavior
window.addEventListener('resize', handleResponsive);
handleResponsive();