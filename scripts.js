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
const customStartDate = new Date("2024-12-15T00:00:00");
const promotionEndDate = new Date(customStartDate.getTime() + 5 * 24 * 60 * 60 * 1000).getTime();
startCountdown(promotionEndDate, "main-countdown");
startCountdown(promotionEndDate, "sticky-countdown");

// Sticky Header and Fade-In Animations
function handleFadeIn() {
    const fadeItems = document.querySelectorAll('.fade-in, .fade-in-right');
    fadeItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {
            setTimeout(() => {
                item.classList.add('active');
            }, index * 200); // Optional: Stagger animations for better effect
        }
    });
}

// Sticky Header Toggle
window.addEventListener('scroll', () => {
    const stickyHeader = document.getElementById('sticky-header');
    if (window.scrollY > 200) {
        stickyHeader.classList.add('active');
    } else {
        stickyHeader.classList.remove('active');
    }

    // Trigger fade-in animations
    handleFadeIn();
});

// Initial check to activate items already in view
handleFadeIn();

// Carousel with Fade Effect
const carousel = document.querySelector('.carousel-wrapper');
const items = Array.from(carousel.querySelectorAll('picture'));
let currentIndex = 0;

function updateCarousel() {
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.style.opacity = 1;
            item.style.zIndex = 1;
        } else {
            item.style.opacity = 0;
            item.style.zIndex = 0;
        }
    });
}

// Forçar a atualização da visibilidade das imagens na inicialização
window.addEventListener('load', () => {
    updateCarousel();
});

// Initialize carousel
updateCarousel();

// Event listeners for navigation buttons
document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
});

