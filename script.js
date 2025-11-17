/**
 * Access the World - Interactive Enhancements
 * Adds scroll-triggered animations and smooth interactions
 */

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate mission section
    const missionContent = document.querySelector('.mission-content');
    if (missionContent) {
        missionContent.style.opacity = '0';
        missionContent.style.transform = 'translateY(30px)';
        missionContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(missionContent);
    }

    // Animate stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = `opacity 0.6s ease ${0.2 + index * 0.15}s, transform 0.6s ease ${0.2 + index * 0.15}s`;
        observer.observe(stat);
    });

    // Animate CTA section
    const ctaContent = document.querySelector('.cta-content');
    if (ctaContent) {
        ctaContent.style.opacity = '0';
        ctaContent.style.transform = 'scale(0.95)';
        ctaContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(ctaContent);
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle links with actual hash targets
            if (href !== '#' && href.length > 1) {
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add parallax effect to floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.pageYOffset;

        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });

        ticking = false;
    };

    const requestParallax = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };

    // Only add parallax on larger screens
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestParallax, { passive: true });
    }

    // Respect user's motion preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (motionQuery.matches) {
        // Disable parallax for users who prefer reduced motion
        window.removeEventListener('scroll', requestParallax);

        // Make all animations instant
        document.querySelectorAll('[style*="transition"]').forEach(el => {
            el.style.transition = 'none';
        });
    }

    // Add hover effect enhancement for feature cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.4s ease';
        });
    });

    // Keyboard navigation enhancement
    document.addEventListener('keydown', (e) => {
        // Add visual feedback for keyboard navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Console message for developers
    console.log(
        '%c🌍 Access the World %c\n' +
        'Built with accessibility in mind.\n' +
        'Featuring Atkinson Hyperlegible (designed for low vision) and Fraunces typefaces.\n' +
        'Licensed under Apache 2.0',
        'font-size: 20px; font-weight: bold; color: #ff8966;',
        'font-size: 12px; color: #faf8f3;'
    );
});

// Dynamic year in footer
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Access the World. Licensed under Apache 2.0`;
}
