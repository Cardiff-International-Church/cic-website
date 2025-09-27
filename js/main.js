// Cardiff International Church - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initMobileMenu();
    
    // Search functionality
    initSearch();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Event hover effects
    initEventAnimations();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        // Ensure menu starts hidden on mobile
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            navMenu.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open menu');
        }
        
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navMenu.classList.toggle('hidden');
            
            // Update aria-expanded attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Change button text for screen readers
            menuToggle.setAttribute('aria-label', 
                isExpanded ? 'Close menu' : 'Open menu'
            );
        });
        
        // Handle submenu toggles on mobile
        const menuItems = document.querySelectorAll('.nav-menu > li');
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.sub-menu');
            
            if (submenu) {
                link.addEventListener('click', function(e) {
                    // Only prevent default on mobile
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        item.classList.toggle('active');
                    }
                });
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Open menu');
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navMenu.classList.remove('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Toggle menu');
                
                // Remove active class from menu items
                const activeItems = document.querySelectorAll('.nav-menu li.active');
                activeItems.forEach(item => item.classList.remove('active'));
            } else {
                // Ensure menu is hidden on mobile
                navMenu.classList.remove('active');
                navMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Open menu');
            }
        });
    }
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchInput = document.getElementById('search');
    const searchButton = document.querySelector('.search-container button');
    
    if (searchInput && searchButton) {
        // Handle search button click
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch();
        });
        
        // Handle Enter key in search input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
        
        // Handle input changes for live search feedback
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                highlightSearchResults(this.value);
            } else {
                clearHighlights();
            }
        });
    }
}

/**
 * Perform search functionality
 */
function performSearch() {
    const searchTerm = document.getElementById('search').value.trim();
    
    if (searchTerm.length === 0) {
        alert('Please enter a search term.');
        return;
    }
    
    // Simple client-side search through page content
    const searchResults = searchPageContent(searchTerm);
    
    if (searchResults.length > 0) {
        highlightSearchResults(searchTerm);
        // Scroll to first result
        searchResults[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        alert(`No results found for "${searchTerm}"`);
    }
}

/**
 * Search through page content
 */
function searchPageContent(searchTerm) {
    const searchableElements = document.querySelectorAll('h1, h2, h3, p, a');
    const results = [];
    
    searchableElements.forEach(element => {
        if (element.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            results.push(element);
        }
    });
    
    return results;
}

/**
 * Highlight search results
 */
function highlightSearchResults(searchTerm) {
    clearHighlights();
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const searchableElements = document.querySelectorAll('h1, h2, h3, p, a');
    
    searchableElements.forEach(element => {
        if (element.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            const originalText = element.innerHTML;
            const highlightedText = originalText.replace(regex, '<mark>$1</mark>');
            element.innerHTML = highlightedText;
            element.setAttribute('data-original-content', originalText);
        }
    });
}

/**
 * Clear search highlights
 */
function clearHighlights() {
    const highlightedElements = document.querySelectorAll('[data-original-content]');
    
    highlightedElements.forEach(element => {
        element.innerHTML = element.getAttribute('data-original-content');
        element.removeAttribute('data-original-content');
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
                
                // Set focus to target element for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });
}

/**
 * Initialize event card animations
 */
function initEventAnimations() {
    const events = document.querySelectorAll('.event');
    
    // Add intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        events.forEach((event, index) => {
            // Initial state for animation
            event.style.opacity = '0';
            event.style.transform = 'translateY(20px)';
            event.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            observer.observe(event);
        });
    }
    
    // Add click handlers for event cards
    events.forEach(event => {
        event.addEventListener('click', function() {
            // Add a subtle click feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Make event cards keyboard accessible
        event.setAttribute('tabindex', '0');
        event.setAttribute('role', 'button');
        
        event.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Utility functions
 */

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Error handling for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In a production environment, you might want to log this to a service
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}