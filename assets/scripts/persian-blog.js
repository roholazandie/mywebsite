/**
 * Persian Blog Post JavaScript Functionality
 * Handles theme toggle and share functionality for Persian blog posts
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Persian blog post loaded');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons initialized');
    }
    
    // Initialize Persian theme toggle
    initializePersianThemeToggle();
});

/**
 * Force theme toggle to work for Persian pages
 */
function initializePersianThemeToggle() {
    // Wait a bit longer then force initialize theme toggle
    setTimeout(() => {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            console.log('Theme toggle found, forcing initialization');
            
            // Remove any existing listeners
            const newToggle = themeToggle.cloneNode(true);
            themeToggle.parentNode.replaceChild(newToggle, themeToggle);
            
            // Add our own listener
            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Theme toggle clicked - manual handler');
                
                const html = document.documentElement;
                const currentTheme = html.getAttribute('data-theme') || 'dark';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                console.log('Switching theme from', currentTheme, 'to', newTheme);
                
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Update icons
                const sunIcon = newToggle.querySelector('[data-lucide="sun"]');
                const moonIcon = newToggle.querySelector('[data-lucide="moon"]');
                
                if (sunIcon && moonIcon) {
                    if (newTheme === 'light') {
                        sunIcon.style.display = 'none';
                        moonIcon.style.display = 'inline';
                    } else {
                        sunIcon.style.display = 'inline';
                        moonIcon.style.display = 'none';
                    }
                }
                
                // Re-initialize Lucide icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            });
            
            // Set initial icon state
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const sunIcon = newToggle.querySelector('[data-lucide="sun"]');
            const moonIcon = newToggle.querySelector('[data-lucide="moon"]');
            
            if (sunIcon && moonIcon) {
                if (currentTheme === 'light') {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'inline';
                } else {
                    sunIcon.style.display = 'inline';
                    moonIcon.style.display = 'none';
                }
            }
        }
    }, 500);
}

/**
 * Share post functionality for Persian posts
 */
function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: 'لگاریتم، ادراک و اطلاعات',
            text: 'بررسی رابطه لگاریتمی بین تحریکات فیزیکی و ادراک انسان',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('لینک کپی شد!');
    }
}