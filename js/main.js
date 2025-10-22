// Cardiff International Church - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Random header image
    setRandomHeaderImage();
    
    // Mobile menu functionality
    initMobileMenu();
    
    // Search functionality
    initSearch();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Event hover effects
    initEventAnimations();
    
    // Contact form functionality
    initContactForm();
    
    // Form field enhancements
    initFormFieldEnhancements();
});

/**
 * Get a random header image URL from the header images folder
 * @returns {string} The URL path to a random header image
 */
function getRandomHeaderImageUrl() {
    const headerImages = [
        'images/header/CIC17주년사진-1000x288.jpg',
        'images/header/cropped-2012-07-01-15.07.04-3 (1).jpg',
        'images/header/cropped-2012-07-01-15.07.04-3.jpg',
        'images/header/cropped-20170126_194419-2.jpg',
        'images/header/cropped-20190714_131847.jpg',
        'images/header/cropped-20190714_162207.jpg',
        'images/header/cropped-B1.jpg',
        'images/header/cropped-Korean-Night-photo-revised-scaled-1.jpg',
        'images/header/cropped-Small-group-1-revised-scaled-1.jpg',
        'images/header/cropped-edited-cake-scaled-1 (1).jpg',
        'images/header/cropped-edited-cake-scaled-1.jpg'
    ];
    
    // Get a random index
    const randomIndex = Math.floor(Math.random() * headerImages.length);
    
    // Return the random image URL
    return headerImages[randomIndex];
}

/**
 * Set a random header image on page load
 */
function setRandomHeaderImage() {
    const headerImage = document.querySelector('.header-image img');
    
    if (headerImage) {
        const randomImageUrl = getRandomHeaderImageUrl();
        
        // Set the image source
        headerImage.src = randomImageUrl;
        
        // Add loaded class when image is ready for smooth fade-in
        headerImage.onload = function() {
            headerImage.classList.add('loaded');
        };
        
        // Fallback: if image fails to load, show a default
        headerImage.onerror = function() {
            this.src = 'images/header/cropped-20190714_162207.jpg';
            this.classList.add('loaded');
        };
    }
}

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
        
        // Handle submenu toggles on mobile with separate toggle buttons
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Find the parent li element
                const parentLi = this.closest('li');
                const submenu = parentLi.querySelector('.sub-menu');
                const arrow = this.querySelector('span');
                
                if (submenu) {
                    const isCurrentlyOpen = !submenu.classList.contains('hidden');
                    
                    // Close other open submenus
                    const allSubmenus = document.querySelectorAll('.nav-menu .sub-menu');
                    const allArrows = document.querySelectorAll('.dropdown-toggle span');
                    allSubmenus.forEach((sm, idx) => {
                        if (sm !== submenu) {
                            sm.classList.add('hidden');
                            sm.closest('li').classList.remove('active');
                            allArrows[idx].style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Toggle this submenu
                    if (isCurrentlyOpen) {
                        // Close it
                        submenu.classList.add('hidden');
                        parentLi.classList.remove('active');
                        arrow.style.transform = 'rotate(0deg)';
                    } else {
                        // Open it
                        submenu.classList.remove('hidden');
                        parentLi.classList.add('active');
                        arrow.style.transform = 'rotate(180deg)';
                    }
                }
            });
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

// ============================================
// CONTACT FORM FUNCTIONALITY
// ============================================

/**
 * Initialize EmailJS
 */
function initEmailJS() {
    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init('0CnrdV3Rd7u2sxjpa'); 
    }
}

/**
 * Contact Form Validation and Handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Initialize EmailJS
    initEmailJS();

    // Prevent form from submitting normally (prevents double submission)
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submit event prevented');
    });

    // Add real-time validation on blur for each field
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');

    if (nameField) {
        nameField.addEventListener('blur', function() {
            console.log('Name field blur - value:', this.value);
            validateField('name', this.value);
        });
        // Also validate on input for immediate feedback
        nameField.addEventListener('input', function() {
            if (this.value.length > 0) {
                validateField('name', this.value);
            }
        });
    }

    if (emailField) {
        emailField.addEventListener('blur', function() {
            console.log('Email field blur - value:', this.value);
            validateField('email', this.value);
        });
        // Also validate on input for immediate feedback
        emailField.addEventListener('input', function() {
            if (this.value.length > 0) {
                validateField('email', this.value);
            }
        });
    }

    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            console.log('Phone field blur - value:', this.value);
            // Only validate if user entered something
            if (this.value.trim().length > 0) {
                validateField('phone', this.value);
            }
        });
        // Also validate on input for immediate feedback
        phoneField.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                validateField('phone', this.value);
            }
        });
    }

    if (messageField) {
        messageField.addEventListener('blur', function() {
            console.log('Message field blur - value:', this.value);
            validateField('message', this.value);
        });
        // Also validate on input for immediate feedback after some typing
        messageField.addEventListener('input', function() {
            if (this.value.length > 0) {
                validateField('message', this.value);
            }
        });
    }

    // Handle form submission by intercepting button click instead of form submit
    const submitButton = contactForm.querySelector('button[type="submit"]');
    let isSubmitting = false; // Flag to prevent double submission
    
    if (submitButton) {
        submitButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default form submission
            event.stopPropagation(); // Stop event from bubbling up

            // Prevent double submission
            if (isSubmitting) {
                console.log('Form is already being submitted, ignoring duplicate request');
                return;
            }

            // Get form data manually
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            console.log('Form data:', data);

            // Validate form manually
            if (validateForm(data)) {
                // Set submitting flag
                isSubmitting = true;
                
                // Show loading state
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Send email using EmailJS
                sendEmail(data)
                    .then(() => {
                        // Show success message
                        showMessage(
                            "Thank you for your message! We'll get back to you within 24-48 hours.",
                            'success',
                        );

                        // Reset form
                        contactForm.reset();
                    })
                    .catch((error) => {
                        console.error('Email sending failed:', error);
                        showMessage(
                            'Sorry, there was an error sending your message. Please try again or contact us directly at cardiffinternationalchurch@gmail.com',
                            'error',
                        );
                    })
                    .finally(() => {
                        // Reset button and flag
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        isSubmitting = false;
                    });
            }
        });
    }
}

/**
 * Send email using EmailJS
 */
function sendEmail(formData) {
    // Replace these with your actual EmailJS service ID and template ID
    const serviceID = 'service_cic';
    const templateID = 'template_cic_website';

    // Prepare template parameters
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'General Enquiry',
        message: formData.message,
        to_name: 'Cardiff International Church',
    };

    // Send email via EmailJS
    return emailjs.send(serviceID, templateID, templateParams);
}

/**
 * Validate individual field (for real-time validation)
 */
function validateField(fieldName, value) {
    console.log(`Validating field: ${fieldName}, value: "${value}"`);
    
    // Clear existing error for this field
    const field = document.getElementById(fieldName);
    if (!field) {
        console.log(`Field ${fieldName} not found`);
        return;
    }

    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Reset field border and classes
    field.style.borderColor = '';
    field.style.borderWidth = '';
    field.classList.remove('error', 'valid');

    // Don't validate empty optional fields
    if ((!value || value.trim() === '') && (fieldName === 'phone' || fieldName === 'subject')) {
        console.log(`Skipping validation for empty optional field: ${fieldName}`);
        return true;
    }

    // For required fields, if empty, don't show error during typing but do on blur
    if (!value || value.trim() === '') {
        console.log(`Empty required field: ${fieldName}`);
        return false;
    }

    // Validate based on field type
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Please enter your name (at least 2 characters)';
            } else if (!isValidName(value)) {
                isValid = false;
                errorMessage = 'Name can only contain letters, spaces, hyphens (-) and apostrophes (\')';
            }
            break;

        case 'email':
            if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;

        case 'phone':
            if (!isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid UK phone number (e.g., 07123 456789 or +44 7123 456789)';
            }
            break;

        case 'message':
            if (value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Please provide more details in your message (minimum 10 characters)';
            }
            break;
    }

    console.log(`Validation result for ${fieldName}: ${isValid}`);

    // Show error or success state
    if (!isValid) {
        showFieldError(fieldName, errorMessage);
        field.classList.add('error');
    } else {
        // Show green border for valid field
        field.style.borderColor = '#10b981';
        field.style.borderWidth = '2px';
        field.classList.add('valid');
    }

    return isValid;
}

/**
 * Form Validation (for submit)
 */
function validateForm(data) {
    // Clear any existing field errors first
    clearFieldErrors();

    let isValid = true;

    // Required fields validation - show individual errors under each field
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Please enter your name (at least 2 characters)');
        isValid = false;
    } else if (!isValidName(data.name)) {
        showFieldError('name', 'Name can only contain letters, spaces, hyphens (-) and apostrophes (\')');
        isValid = false;
    }

    if (!data.email || !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Phone is optional, but if provided, must be valid
    if (data.phone && data.phone.trim().length > 0 && !isValidPhone(data.phone)) {
        showFieldError('phone', 'Please enter a valid UK phone number (e.g., 07123 456789 or +44 7123 456789)');
        isValid = false;
    }

    if (!data.message || data.message.trim().length < 10) {
        showFieldError(
            'message',
            'Please provide more details in your message (minimum 10 characters)',
        );
        isValid = false;
    }

    return isValid;
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Name validation - only letters, spaces, hyphens, and apostrophes
 */
function isValidName(name) {
    // Allow letters (including accented characters), spaces, hyphens, and apostrophes
    // This regex supports international characters (Unicode letters)
    const nameRegex = /^[\p{L}\s'-]+$/u;
    return nameRegex.test(name);
}

/**
 * Phone validation - UK phone numbers
 */
function isValidPhone(phone) {
    // Remove all spaces, hyphens, and parentheses for validation
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    
    // UK phone number patterns:
    // - Mobile: 07xxx xxxxxx (11 digits starting with 07)
    // - Landline: 01xxx xxxxxx or 02x xxxx xxxx (10-11 digits starting with 01 or 02)
    // - International: +447xxx xxxxxx (13 digits starting with +44)
    // - Must be at least 10 digits, max 13 digits (with +44)
    
    // Pattern 1: International format +44 followed by 10 digits
    const internationalPattern = /^\+44[1-9]\d{9}$/;
    
    // Pattern 2: UK format starting with 0, followed by 9-10 digits
    const ukPattern = /^0[1-9]\d{8,9}$/;
    
    // Must match one of the patterns
    return internationalPattern.test(cleanPhone) || ukPattern.test(cleanPhone);
}

/**
 * Show individual field error
 */
function showFieldError(fieldName, errorMessage) {
    const field = document.getElementById(fieldName);
    if (!field) return;

    // Remove any existing error for this field
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = errorMessage;

    // Add red border to the field
    field.style.borderColor = '#dc2626';
    field.style.borderWidth = '2px';

    // Insert error message after the field
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear all field errors
 */
function clearFieldErrors() {
    // Remove all existing error messages
    const errorMessages = document.querySelectorAll('.field-error');
    errorMessages.forEach((error) => error.remove());

    // Reset field border styles and classes
    const fields = ['name', 'email', 'phone', 'subject', 'message'];
    fields.forEach((fieldName) => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = '';
            field.style.borderWidth = '';
            field.classList.remove('error', 'valid');
        }
    });
}

/**
 * Show message function
 */
function showMessage(message, type) {
    console.log('showMessage called with:', message, type);

    // Try to find the existing message container
    let messageContainer = document.getElementById('formMessage');
    console.log('Message container found:', messageContainer);

    // If not found, create it dynamically and insert it into the form
    if (!messageContainer) {
        console.log('Creating message container dynamically...');
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'formMessage';
            messageContainer.className = 'form-message';
            messageContainer.style.display = 'none';

            // Insert before the submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            contactForm.insertBefore(messageContainer, submitButton.parentNode);
            console.log('Message container created and inserted');
        } else {
            console.log(
                'ERROR: Could not find contactForm to insert message container!',
            );
            return;
        }
    }

    // Update message content and styling
    messageContainer.innerHTML = message;
    messageContainer.className = `form-message ${type} show`;

    // Show the message
    messageContainer.style.display = 'block';

    console.log('Message displayed with class:', messageContainer.className);
    console.log('Message content:', messageContainer.innerHTML);

    // Scroll to message
    messageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageContainer.style.display = 'none';
            messageContainer.className = 'form-message';
        }, 5000);
    }
}

/**
 * Form field enhancements
 */
function initFormFieldEnhancements() {
    // Add focus effects to form fields
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach((field) => {
        field.addEventListener('focus', function () {
            this.parentNode.classList.add('focused');
        });

        field.addEventListener('blur', function () {
            this.parentNode.classList.remove('focused');
            if (this.value.trim() !== '') {
                this.parentNode.classList.add('filled');
            } else {
                this.parentNode.classList.remove('filled');
            }
        });
    });

    // Phone number formatting
    const phoneField = document.querySelector('input[name="phone"]');
    if (phoneField) {
        phoneField.addEventListener('input', function () {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');

            // Format UK phone numbers
            if (value.length > 0) {
                if (value.startsWith('44')) {
                    // International format
                    value = '+' + value;
                } else if (value.startsWith('0')) {
                    // UK format
                    if (value.length > 5) {
                        value = value.substring(0, 5) + ' ' + value.substring(5);
                    }
                    if (value.length > 11) {
                        value = value.substring(0, 11) + ' ' + value.substring(11);
                    }
                }
            }

            this.value = value;
        });
    }
}