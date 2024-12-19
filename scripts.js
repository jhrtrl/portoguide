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

        if (rect.top < window.innerHeight +300) {
            setTimeout(() => {
                item.classList.add('active');
            }, index * 200); // Optional: Stagger animations for better effect
        }
    });
 // Verifique se o FAQ está visível e ative-o imediatamente
    const faqSection = document.querySelector('#faq');
    if (faqSection) {
        const faqRect = faqSection.getBoundingClientRect();
        if (faqRect.top < window.innerHeight) { // FAQ ativa assim que entrar na tela
            faqSection.classList.add('active');
        }
    }   
}

// Ative todos os elementos visíveis ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    handleFadeIn();
});

// Monitore o scroll para ativar outros elementos
window.addEventListener('scroll', handleFadeIn);

// Sticky Header Toggle
window.addEventListener('scroll', () => {
    const stickyHeader = document.getElementById('sticky-header');
    const mainHeader = document.querySelector('header');

    // Mostrar o Sticky Header apenas quando o usuário passar pelo cabeçalho principal
    if (window.scrollY > mainHeader.offsetHeight) {
        stickyHeader.classList.add('active');
    } else {
        stickyHeader.classList.remove('active');
    }
});

// Initial check to activate items already in view
handleFadeIn();

// Carousel Navigation
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselImages = document.querySelector('.carousel-images');
let currentIndex = 0;

// Function to update the carousel and show the active image
function updateCarousel() {
    const offset = -currentIndex * 100; // Move o carrossel para a esquerda
    carouselImages.style.transform = `translateX(${offset}%)`;
}

// Event listeners for navigation buttons
document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
});

// Inicializa o carrossel mostrando a primeira imagem
updateCarousel();

// FAQ Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(accordion => {
        accordion.addEventListener("click", function () {
            const panel = this.nextElementSibling;

            // Alterna a classe 'show' para exibir/esconder o painel
            if (panel.classList.contains("show")) {
                panel.classList.remove("show");
            } else {
                panel.classList.add("show");
            }

            // Alterna a classe 'active' no título clicado
            this.classList.toggle("active");
        });
    });
});
