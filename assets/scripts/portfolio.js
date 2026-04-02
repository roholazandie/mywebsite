/**
 * Portfolio JavaScript — Arena-Inspired Redesign
 */

document.addEventListener('DOMContentLoaded', function () {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        setTimeout(initializeThemeToggle, 100);
    } else {
        initializeThemeToggle();
    }

    initializeNavigation();
    initializeSmoothScrolling();
    initializeScrollReveal();
    initializeNavbarScroll();
    initializeTOC();
});

/* ---- Theme Toggle ---- */
function initializeThemeToggle() {
    var themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    var sunIcon = themeToggle.querySelector('.icon-light, .sun-icon');
    var moonIcon = themeToggle.querySelector('.icon-dark, .moon-icon');
    var html = document.documentElement;
    var currentTheme = html.getAttribute('data-theme') || localStorage.getItem('theme') || 'dark';

    function updateThemeIcon(theme) {
        if (sunIcon && moonIcon) {
            sunIcon.style.display = theme === 'light' ? 'none' : 'block';
            moonIcon.style.display = theme === 'light' ? 'block' : 'none';
        }
    }

    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function (e) {
        e.preventDefault();
        var cur = html.getAttribute('data-theme');
        var next = cur === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
        if (typeof lucide !== 'undefined') {
            setTimeout(function () { lucide.createIcons(); }, 50);
        }
    });
}

/* ---- Navigation Active State ---- */
function initializeNavigation() {
    var homeLink = document.querySelector('.navbar-nav .nav-link[href="#home"]');
    if (homeLink) homeLink.classList.add('active');

    window.addEventListener('scroll', function () {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        var current = '';

        sections.forEach(function (section) {
            var top = section.offsetTop - 120;
            if (window.scrollY >= top && window.scrollY < top + section.clientHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* ---- Smooth Scrolling (fallback for browsers without CSS scroll-behavior) ---- */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---- Scroll Reveal (IntersectionObserver) ---- */
function initializeScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(function (el) { el.classList.add('visible'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { observer.observe(el); });
}

/* ---- Navbar shrink on scroll ---- */
function initializeNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ---- Auto Table of Contents for blog posts ---- */
function initializeTOC() {
    var tocContainer = document.querySelector('.toc');
    var postContent = document.querySelector('.post-content');
    if (!tocContainer || !postContent) return;

    var headings = postContent.querySelectorAll('h2, h3');
    if (headings.length < 2) return;

    tocContainer.classList.add('has-items');

    var list = tocContainer.querySelector('.toc-list');
    if (!list) {
        list = document.createElement('ul');
        list.className = 'toc-list';
        tocContainer.appendChild(list);
    }

    headings.forEach(function (heading, i) {
        if (!heading.id) {
            heading.id = 'section-' + i;
        }

        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        if (heading.tagName === 'H3') {
            a.classList.add('toc-h3');
        }
        a.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: heading.offsetTop - 80,
                behavior: 'smooth'
            });
        });
        li.appendChild(a);
        list.appendChild(li);
    });

    // Scroll-spy: highlight active TOC link
    var tocLinks = list.querySelectorAll('a');
    window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 120;
        var activeLink = null;

        headings.forEach(function (heading, i) {
            if (heading.offsetTop <= scrollPos) {
                activeLink = tocLinks[i];
            }
        });

        tocLinks.forEach(function (link) { link.classList.remove('active'); });
        if (activeLink) activeLink.classList.add('active');
    });
}

/* ---- Utility ---- */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.PortfolioJS = { scrollToTop: scrollToTop };
