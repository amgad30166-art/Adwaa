// ===== LANGUAGE TOGGLE =====
let currentLang = "ar";

function toggleLang() {
    const elements = document.querySelectorAll("[data-ar]");
    const html = document.documentElement;
    const langBtn = document.querySelectorAll(".lang-btn");

    if (currentLang === "ar") {
        // Switch to English
        elements.forEach(el => {
            const enText = el.getAttribute("data-en");
            if (enText) el.textContent = enText;
        });
        html.setAttribute("dir", "ltr");
        html.setAttribute("lang", "en");
        langBtn.forEach(btn => btn.textContent = "AR");
        currentLang = "en";
        localStorage.setItem("preferredLanguage", "en");
    } else {
        // Switch to Arabic
        elements.forEach(el => {
            const arText = el.getAttribute("data-ar");
            if (arText) el.textContent = arText;
        });
        html.setAttribute("dir", "rtl");
        html.setAttribute("lang", "ar");
        langBtn.forEach(btn => btn.textContent = "EN");
        currentLang = "ar";
        localStorage.setItem("preferredLanguage", "ar");
    }
}

// Load preferred language on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem("preferredLanguage");
    if (savedLang && savedLang !== currentLang) {
        toggleLang();
    }
});

// ===== MOBILE MENU TOGGLE =====
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav) {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav && nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        }
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.querySelector('.main-nav');
        const toggle = document.querySelector('.mobile-menu-toggle');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        }
    });
});

// ===== WHATSAPP FORM SUBMISSION =====
const whatsappForm = document.getElementById("whatsappForm");

if (whatsappForm) {
    whatsappForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const city = document.getElementById("city") ? document.getElementById("city").value.trim() : "";
        const country = document.getElementById("country").value;
        const notes = document.getElementById("notes") ? document.getElementById("notes").value.trim() : "";

        // Validate required fields
        if (!name || !phone || !country) {
            alert(currentLang === "ar" ? "الرجاء ملء جميع الحقول المطلوبة" : "Please fill all required fields");
            return;
        }

        // Validate phone number (Saudi format)
        const phoneRegex = /^05\d{8}$/;
        if (!phoneRegex.test(phone)) {
            alert(currentLang === "ar" ? 
                "الرجاء إدخال رقم جوال صحيح يبدأ بـ 05 ويتكون من 10 أرقام" : 
                "Please enter a valid mobile number starting with 05 (10 digits)");
            return;
        }

        // Build WhatsApp message
        let message = currentLang === "ar" ? 
            `طلب استقدام جديد:\n\nالاسم: ${name}\nالجوال: ${phone}` :
            `New Recruitment Request:\n\nName: ${name}\nMobile: ${phone}`;

        if (city) {
            message += currentLang === "ar" ? `\nالمدينة: ${city}` : `\nCity: ${city}`;
        }

        message += currentLang === "ar" ? `\nالدولة: ${country}` : `\nCountry: ${country}`;

        if (notes) {
            message += currentLang === "ar" ? `\nملاحظات: ${notes}` : `\nNotes: ${notes}`;
        }

        // Create WhatsApp URL
        const whatsappNumber = "966500808111";
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp in new tab
        window.open(url, "_blank");
        
        // Optional: Reset form after submission
        // whatsappForm.reset();
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL TO TOP FUNCTIONALITY =====
let scrollToTopBtn;

function createScrollToTopButton() {
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'العودة للأعلى');
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 998;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollToTopBtn);
    }
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (!scrollToTopBtn) createScrollToTopButton();
    
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// ===== FORM VALIDATION ENHANCEMENTS =====
// Add real-time validation feedback
const formInputs = document.querySelectorAll('.form-box input, .form-box select, .form-box textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(231, 76, 60)') {
            this.style.borderColor = '#ddd';
        }
    });
});

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to cards and sections
window.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .feature-card, .country-card, .step, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });
});

// ===== PHONE NUMBER FORMATTING =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        // Ensure it starts with 05
        if (value.length > 0 && !value.startsWith('05')) {
            value = '05' + value.replace(/^0*/, '');
        }
        
        // Limit to 10 digits
        value = value.substring(0, 10);
        
        e.target.value = value;
    });
}

// ===== ANALYTICS & TRACKING (Optional) =====
// Track form submissions
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function() {
        // Add your analytics tracking here
        console.log('Form submitted - Track this event in your analytics');
        
        // Example: Google Analytics event tracking
        // gtag('event', 'form_submission', {
        //     'event_category': 'recruitment_request',
        //     'event_label': document.getElementById('country').value
        // });
    });
}

// Track phone clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone link clicked - Track this event');
        // Add analytics tracking
    });
});

// Track WhatsApp clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp link clicked - Track this event');
        // Add analytics tracking
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Defer non-critical JavaScript
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    // Initialize all app functionality
    console.log('App initialized successfully');
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.message);
    // You can add error reporting here
});

// ===== SERVICE WORKER REGISTRATION (for PWA - Optional) =====
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}
*/

console.log('Adwaa Alradef Recruitment - Website Loaded Successfully');
