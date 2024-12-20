// Countdown Timer Function
function startCountdown(endDate, elementId) {
    const timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById(elementId).innerHTML = "Promotion has ended!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        document.getElementById(elementId).innerHTML = countdownString;
    }, 1000);
}

// Initialize Countdown
const customStartDate = new Date("2024-12-17T00:00:00");
const promotionEndDate = new Date(customStartDate.getTime() + 5 * 24 * 60 * 60 * 1000).getTime();
startCountdown(promotionEndDate, "main-countdown");
startCountdown(promotionEndDate, "sticky-countdown");

// Sticky Header Toggle
window.addEventListener('scroll', () => {
    const stickyHeader = document.getElementById('sticky-header');
    const mainHeader = document.querySelector('header');

    if (window.scrollY > mainHeader.offsetHeight) {
        stickyHeader.classList.add('active');
    } else {
        stickyHeader.classList.remove('active');
    }
});

// Fade-In/Fade-Out Animations
const fadeSections = document.querySelectorAll('.fade-in, .fade-in-right');

const fadeObserverOptions = {
    root: null,
    threshold: 0.2,
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.classList.remove('fade-out');
        } else {
            entry.target.classList.remove('active');
            entry.target.classList.add('fade-out');
        }
    });
}, fadeObserverOptions);

fadeSections.forEach((section) => fadeObserver.observe(section));

// Função para animar o contador
function animateCounter(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    let current = start;
    const increment = range / (duration / 16);
    const step = () => {
        current += increment;
        if (current >= end) {
            current = end;
        }
        element.textContent = Math.floor(current);
        if (current < end) {
            requestAnimationFrame(step);
        }
    };
    step();
}

// Observador para ativar o contador ao rolar até a seção
document.addEventListener('DOMContentLoaded', () => {
    const counterSection = document.querySelector('.spot-counter');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter('spot-counter-number', 0, 77, 2000);
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.5 }
    );

    if (counterSection) {
        observer.observe(counterSection);
    }
});

// Language animation
document.addEventListener('DOMContentLoaded', () => {
    const flagItems = document.querySelectorAll('.fade-in-sequence');
    flagItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
});

// FAQ
document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach((accordion) => {
        accordion.addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.classList.remove("show");
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.add("show");
            }
        });
    });
});

// Typing Animation
const languageTexts = [
    "Languages Available", 
    "Idiomas Disponibles", 
    "Langues Disponibles", 
    "Idiomas Disponíveis"
];

const typingElement = document.querySelector(".language-flags h2");
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let deletingSpeed = 80;
let pauseBetweenTexts = 1500;

function typeLanguages() {
    const currentText = languageTexts[currentTextIndex];

    if (isDeleting) {
        // Remove one character
        typingElement.textContent = currentText.slice(0, currentCharIndex--);
    } else {
        // Add one character
        typingElement.textContent = currentText.slice(0, currentCharIndex++);
    }

    // If the word is fully typed
    if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeLanguages, pauseBetweenTexts); // Pause before deleting
        return;
    }

    // If the word is fully deleted
    if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % languageTexts.length; // Move to the next text
    }

    // Adjust speed for typing or deleting
    const delay = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeLanguages, delay);
}

// Start the animation
if (typingElement) {
    typeLanguages();
}
