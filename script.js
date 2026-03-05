//  ==========================================
// UTILITY FUNCTIONS
// ==========================================

const utils = {
    // Check if device is mobile
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Animate number counter
    animateCounter: (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    },

    // Smooth scroll to element
    smoothScroll: (target) => {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
};

// ==========================================
// PREMIUM LOADER
// ==========================================

class PremiumLoader {
    constructor() {
        this.loader = document.getElementById('premium-loader');
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hide();
            }, 1500);
        });
    }

    hide() {
        this.loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    show() {
        this.loader.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// ==========================================
// THEME TOGGLE
// ==========================================

class ThemeToggle {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // Set initial theme
        this.body.classList.add(this.currentTheme);

        // Toggle theme on click
        this.themeToggle.addEventListener('click', () => this.toggle());
    }

    toggle() {
        if (this.body.classList.contains('dark')) {
            this.body.classList.remove('dark');
            this.body.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            this.body.classList.remove('light');
            this.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }
}

// ==========================================
// CUSTOM CURSOR (Desktop Only)
// ==========================================

class CustomCursor {
    constructor() {
        if (utils.isMobile()) {
            document.body.classList.add('mobile');
            return;
        }

        this.cursorDot = document.getElementById('cursor-dot');
        this.cursorOutline = document.getElementById('cursor-outline');
        this.init();
    }

    init() {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            this.cursorDot.style.left = mouseX + 'px';
            this.cursorDot.style.top = mouseY + 'px';
        });

        // Smooth outline follow
        const animateOutline = () => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            this.cursorOutline.style.left = outlineX - 16 + 'px';
            this.cursorOutline.style.top = outlineY - 16 + 'px';

            requestAnimationFrame(animateOutline);
        };
        animateOutline();

        // Scale on hover
        const interactiveElements = document.querySelectorAll('a, button, .project-card-premium, .service-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursorOutline.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                this.cursorOutline.style.transform = 'scale(1)';
            });
        });
    }
}

// ==========================================
// PROFESSIONAL NAVIGATION
// ==========================================

class Navigation {
    constructor() {
        this.nav = document.getElementById('navbar');
        this.navItems = document.querySelectorAll('.nav-item');
        this.mobileToggle = document.getElementById('mobile-toggle');
        this.mobileOverlay = document.getElementById('mobile-nav-overlay');
        this.mobileClose = document.getElementById('mobile-close');
        this.mobileLinks = document.querySelectorAll('.mobile-link');
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', utils.throttle(() => {
            if (window.scrollY > 100) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }
        }, 100));

        // Active link on scroll
        this.setupActiveLinks();

        // Mobile menu
        this.setupMobileMenu();

        // Smooth scroll
        this.setupSmoothScroll();
    }

    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', utils.throttle(() => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 150;
                const sectionId = section.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    this.navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${sectionId}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, 100));
    }

    setupMobileMenu() {
        this.mobileToggle.addEventListener('click', () => {
            this.mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        this.mobileClose.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        this.mobileOverlay.addEventListener('click', (e) => {
            if (e.target === this.mobileOverlay) {
                this.closeMobileMenu();
            }
        });

        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    closeMobileMenu() {
        this.mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    setupSmoothScroll() {
        const allLinks = [...this.navItems, ...this.mobileLinks];
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    utils.smoothScroll(href);
                }
            });
        });
    }
}

// ==========================================
// ANIMATED COUNTERS
// ==========================================

class AnimatedCounters {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.animated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        if (this.counters.length > 0) {
            observer.observe(this.counters[0].closest('.hero-stats'));
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            utils.animateCounter(counter, target, 2000);
        });
    }
}

// ==========================================
// SKILL BARS ANIMATION
// ==========================================

class SkillBars {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-fill-premium');
        this.animated = false;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateBars();
                }
            });
        }, { threshold: 0.5 });

        if (this.skillBars.length > 0) {
            observer.observe(this.skillBars[0].closest('.skills-premium'));
        }
    }

    animateBars() {
        this.skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }
}

// ==========================================
// PROJECT FILTERING
// ==========================================

class ProjectFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-tab');
        this.projectCards = document.querySelectorAll('.project-card-premium');
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.filterProjects(filter);
                this.setActiveButton(btn);
            });
        });
    }

    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');

            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'slideUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    setActiveButton(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// ==========================================
// PROJECT MODAL
// ==========================================

class ProjectModal {
    constructor() {
        this.modal = document.getElementById('project-modal-premium');
        this.closeBtn = document.getElementById('modal-close-premium');
        this.projectCards = document.querySelectorAll('.project-card-premium');
        this.backdrop = this.modal?.querySelector('.modal-backdrop');

        this.projectData = {
            '1': {
                title: 'ERPNext & BlueSeer Deployment',
                category: 'Enterprise ERP',
                description: 'Comprehensive enterprise resource planning system implementation featuring custom inventory management, advanced financial reporting, and streamlined procurement modules. Successfully deployed for a mid-sized manufacturing company, resulting in 40% improvement in operational efficiency and 30% reduction in processing time. The system integrates seamlessly with existing workflows and provides real-time insights into business operations.',
                tech: ['Python', 'JavaScript', 'ERPNext', 'MySQL', 'Redis', 'Nginx'],
                image: 'https://images.unsplash.com/photo-1758411898021-ef0dadaaa295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            },
            '2': {
                title: 'Real-Time Analytics Dashboard',
                category: 'Web Application',
                description: 'Interactive data visualization platform built with React and D3.js, featuring real-time KPI tracking, customizable reports, and advanced filtering capabilities. The dashboard processes over 1 million data points daily and provides actionable insights through beautiful visualizations. Includes role-based access control and export functionality.',
                tech: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Socket.io', 'AWS'],
                image: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            },
            '3': {
                title: 'Business Management Suite',
                category: 'Enterprise',
                description: 'Full-featured CRM and project management solution with team collaboration tools, automated workflows, and comprehensive reporting. Built with Vue.js and Laravel, the platform serves 500+ users across multiple departments. Features include task management, time tracking, client portal, and invoice generation.',
                tech: ['Vue.js', 'Laravel', 'PostgreSQL', 'Docker', 'Redis'],
                image: 'https://images.unsplash.com/photo-1770013398722-f3142a8162c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            },
            '4': {
                title: 'Modern Portfolio Template',
                category: 'Web Design',
                description: 'Sleek and responsive portfolio website featuring dark/light mode toggle, smooth animations, and modern design principles. Built with vanilla JavaScript and CSS, focusing on performance and accessibility. Includes interactive project showcase, contact form with validation, and testimonial slider.',
                tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Web3Forms'],
                image: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            }
        };

        this.init();
    }

    init() {
        if (!this.modal) return;

        // Open modal on card click
        this.projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                this.openModal(projectId);
            });
        });

        // Close modal
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        this.backdrop?.addEventListener('click', () => this.closeModal());

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(projectId) {
        const project = this.projectData[projectId];
        if (!project) return;

        // Populate modal content
        document.getElementById('modal-img-premium').src = project.image;
        document.getElementById('modal-title-premium').textContent = project.title;
        document.getElementById('modal-cat-premium').textContent = project.category;
        document.getElementById('modal-desc-premium').textContent = project.description;

        // Populate tech stack
        const techList = document.getElementById('modal-tech-premium');
        techList.innerHTML = project.tech.map(tech => 
            `<span class="tech-item">${tech}</span>`
        ).join('');

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ==========================================
// TESTIMONIAL SLIDER
// ==========================================

class TestimonialSlider {
    constructor() {
        this.track = document.querySelector('.testimonial-track');
        this.prevBtn = document.getElementById('testimonial-prev');
        this.nextBtn = document.getElementById('testimonial-next');
        this.dots = document.querySelectorAll('.slider-dots .dot');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (!this.track) return;

        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-play
        this.startAutoPlay();

        // Touch support
        this.setupTouchSupport();
    }

    prev() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.dots.length - 1;
        this.updateSlider();
    }

    next() {
        this.currentIndex = this.currentIndex < this.dots.length - 1 ? this.currentIndex + 1 : 0;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }

    updateSlider() {
        const scrollAmount = this.track.children[0].offsetWidth * this.currentIndex;
        this.track.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay() {
        setInterval(() => {
            this.next();
        }, 5000);
    }

    setupTouchSupport() {
        let startX = 0;
        let scrollLeft = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            scrollLeft = this.track.scrollLeft;
        });

        this.track.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX;
            const walk = (startX - x) * 2;
            this.track.scrollLeft = scrollLeft + walk;
        });
    }
}

// ==========================================
// CONTACT FORM WITH VALIDATION & BACKEND
// ==========================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form-premium');
        this.submitBtn = this.form?.querySelector('.submit-btn-premium');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.parentElement.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const formGroup = field.parentElement;
        const errorText = formGroup.querySelector('.error-text');
        let isValid = true;
        let message = '';

        // Required validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid email';
            }
        }

        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        }

        // Update UI
        if (isValid) {
            formGroup.classList.remove('error');
        } else {
            formGroup.classList.add('error');
            if (errorText) errorText.textContent = message;
        }

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Please fill in all required fields correctly', 'error');
            return;
        }

        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        try {
            // Submit form using Web3Forms API
            const formData = new FormData(this.form);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.form.reset();
                
                // Remove error states
                this.form.querySelectorAll('.form-group-premium').forEach(group => {
                    group.classList.remove('error');
                });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Oops! Something went wrong. Please try again or email me directly.', 'error');
        } finally {
            // Reset button state
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showNotification(message, type = 'success') {
        const toast = document.getElementById('notification-toast');
        const toastTitle = toast.querySelector('.toast-title');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon-wrapper');

        // Update content
        toastTitle.textContent = type === 'success' ? 'Success!' : 'Error!';
        toastMessage.textContent = message;

        // Update icon color
        if (type === 'error') {
            toastIcon.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        } else {
            toastIcon.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        }

        // Show toast
        toast.classList.add('show');

        // Auto hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);

        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.onclick = () => toast.classList.remove('show');
    }
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

class BackToTop {
    constructor() {
        this.btn = document.getElementById('back-to-top-premium');
        this.init();
    }

    init() {
        if (!this.btn) return;

        // Show/hide on scroll
        window.addEventListener('scroll', utils.throttle(() => {
            if (window.scrollY > 500) {
                this.btn.classList.add('visible');
            } else {
                this.btn.classList.remove('visible');
            }
        }, 200));

        // Scroll to top
        this.btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================
// DOWNLOAD CV FUNCTIONALITY
// ==========================================

class DownloadCV {
    constructor() {
        this.btn = document.getElementById('download-cv');
        this.init();
    }

    init() {
        if (!this.btn) return;

        this.btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create notification
            const toast = document.getElementById('notification-toast');
            const toastTitle = toast.querySelector('.toast-title');
            const toastMessage = toast.querySelector('.toast-message');
            
            toastTitle.textContent = 'CV Download';
            toastMessage.textContent = 'Please add your CV file to enable downloads. For now, please contact me directly.';
            
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);

            // In production, you would link to an actual CV file:
            // window.open('/path/to/Muhammad-Hamza-CV.pdf', '_blank');
        });
    }
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll(
            '.service-card, .project-card-premium, .testimonial-card, .expertise-item, .contact-card-mini'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// ==========================================
// FOOTER YEAR UPDATE
// ==========================================

class FooterYear {
    constructor() {
        this.yearElement = document.getElementById('footer-year');
        this.init();
    }

    init() {
        if (this.yearElement) {
            this.yearElement.textContent = new Date().getFullYear();
        }
    }
}

// ==========================================
// TYPING EFFECT (HERO)
// ==========================================

class TypingEffect {
    constructor() {
        this.element = document.querySelector('.typing-cursor');
        this.texts = ['ERP Specialist', 'Problem Solver', 'UI/UX Enthusiast'];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseDuration = 2000;
        this.init();
    }

    init() {
        if (!this.element) return;
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==========================================
// PARALLAX EFFECT
// ==========================================

class ParallaxEffect {
    constructor() {
        this.orbs = document.querySelectorAll('.gradient-orb');
        this.init();
    }

    init() {
        if (this.orbs.length === 0) return;

        window.addEventListener('scroll', utils.throttle(() => {
            const scrolled = window.pageYOffset;
            
            this.orbs.forEach((orb, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);
                orb.style.transform = `translateY(${yPos}px)`;
            });
        }, 50));
    }
}

// ==========================================
// INITIALIZE ALL COMPONENTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Ultra-Professional Portfolio...');

    // Initialize all components
    new PremiumLoader();
    new ThemeToggle();
    new CustomCursor();
    new Navigation();
    new AnimatedCounters();
    new SkillBars();
    new ProjectFilter();
    new ProjectModal();
    new TestimonialSlider();
    new ContactForm();
    new BackToTop();
    new DownloadCV();
    new ScrollAnimations();
    new FooterYear();
    new TypingEffect();
    new ParallaxEffect();

    console.log('✅ All components initialized successfully!');
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Service Worker for PWA (Optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ==========================================
// EXPORT FOR TESTING (Optional)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        utils,
        PremiumLoader,
        ThemeToggle,
        Navigation,
        ProjectFilter,
        ContactForm
    };
}
