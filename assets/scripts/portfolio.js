/**
 * Portfolio JavaScript Functionality
 * Handles theme switching, navigation, and smooth scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons first
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        // Small delay to ensure icons are rendered before initializing theme
        setTimeout(() => {
            initializeThemeToggle();
        }, 100);
    } else {
        // If Lucide is not available, initialize theme immediately
        initializeThemeToggle();
    }
    
    initializeNavigation();
    initializeSmoothScrolling();
});

/**
 * Theme Toggle Functionality
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) {
        return;
    }
    
    const sunIcon = themeToggle.querySelector('.icon-light, .sun-icon');
    const moonIcon = themeToggle.querySelector('.icon-dark, .moon-icon');
    const html = document.documentElement;

    // Get current theme (already set by inline script)
    const currentTheme = html.getAttribute('data-theme') || localStorage.getItem('theme') || 'dark';

    // Update icon based on current theme
    function updateThemeIcon(theme) {
        if (sunIcon && moonIcon) {
            if (theme === 'light') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        }
    }

    // Initialize icon based on current theme
    updateThemeIcon(currentTheme);

    // Theme toggle event listener
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Re-initialize Lucide icons after theme change
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 50);
        }
    });
}

/**
 * Navigation Active State Management
 */
function initializeNavigation() {
    // Set home as active on page load
    const homeLink = document.querySelector('.navbar-nav .nav-link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Update active navigation on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Utility Functions
 */

// Add loading animation (for future use)
function showLoader() {
    // Implementation for showing loader
    console.log('Loading...');
}

function hideLoader() {
    // Implementation for hiding loader
    console.log('Loading complete');
}

// Add scroll-to-top functionality (for future use)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Export functions for potential external use
window.PortfolioJS = {
    scrollToTop,
    showLoader,
    hideLoader
};