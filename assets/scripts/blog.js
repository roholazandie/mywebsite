// Blog functionality
class BlogManager {
    constructor() {
        this.initializeBlog();
    }

    initializeBlog() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Initialize newsletter form
        this.initializeNewsletter();
        
        // Initialize animations
        this.initializeAnimations();
        
        // Initialize scroll effects
        this.initializeScrollEffects();
        
        // Initialize search functionality (if needed in the future)
        this.initializeSearch();
    }

    initializeNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
        }
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const emailInput = e.target.querySelector('input[type="email"]');
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        this.showSubscribeLoading(submitBtn);
        
        // Simulate API call (replace with actual newsletter service)
        setTimeout(() => {
            this.showSubscribeSuccess(submitBtn, emailInput);
            this.showNotification('Successfully subscribed! Thank you for joining.', 'success');
        }, 1500);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showSubscribeLoading(button) {
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        button.dataset.originalText = originalText;
    }

    showSubscribeSuccess(button, input) {
        button.textContent = 'Subscribed!';
        button.classList.add('btn-success');
        input.value = '';
        
        setTimeout(() => {
            button.textContent = button.dataset.originalText;
            button.disabled = false;
            button.classList.remove('btn-success');
        }, 3000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto remove after 5 seconds
        setTimeout(() => this.removeNotification(notification), 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    initializeAnimations() {
        // Animate blog cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            card.classList.add('animate-on-scroll');
            observer.observe(card);
        });

        // Observe newsletter section
        const newsletterSection = document.querySelector('.newsletter-section');
        if (newsletterSection) {
            observer.observe(newsletterSection);
        }
    }

    initializeScrollEffects() {
        // Add scroll-based effects
        let ticking = false;

        const updateScrollEffects = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Parallax effect for blog header (subtle)
            const blogHeader = document.querySelector('.blog-header');
            if (blogHeader) {
                const offset = scrollY * 0.1;
                blogHeader.style.transform = `translateY(${offset}px)`;
            }

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    initializeSearch() {
        // Placeholder for future search functionality
        // Could implement client-side search through blog posts
        const searchInput = document.querySelector('.blog-search');
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });
        }
    }

    performSearch(query) {
        // Placeholder for search implementation
        const blogCards = document.querySelectorAll('.blog-card');
        const lowerQuery = query.toLowerCase();

        blogCards.forEach(card => {
            const title = card.querySelector('.blog-card-title a').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            const isMatch = title.includes(lowerQuery) || 
                          excerpt.includes(lowerQuery) || 
                          tags.some(tag => tag.includes(lowerQuery));

            if (query === '' || isMatch) {
                card.style.display = 'block';
                card.parentElement.style.display = 'block';
            } else {
                card.style.display = 'none';
                card.parentElement.style.display = 'none';
            }
        });
    }

    // Reading time calculation (for individual blog posts)
    calculateReadingTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
    }

    // Social sharing functionality
    initializeSocialSharing() {
        const shareButtons = document.querySelectorAll('.share-button');
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = button.dataset.platform;
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                
                let shareUrl = '';
                
                switch (platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }

    // Copy link functionality
    initializeCopyLink() {
        const copyButtons = document.querySelectorAll('.copy-link');
        copyButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    this.showNotification('Link copied to clipboard!', 'success');
                } catch (err) {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = window.location.href;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    this.showNotification('Link copied to clipboard!', 'success');
                }
            });
        });
    }
}

// CSS for notifications (injected dynamically)
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.hide {
        transform: translateX(100%);
    }
    
    .notification-content {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1rem 1.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-success .notification-content {
        border-left: 4px solid var(--success-color, #10b981);
    }
    
    .notification-error .notification-content {
        border-left: 4px solid var(--error-color, #ef4444);
    }
    
    .notification-message {
        color: var(--text-primary);
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-muted);
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        color: var(--text-primary);
    }
    
    /* Animation styles for blog cards */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogManager;
}