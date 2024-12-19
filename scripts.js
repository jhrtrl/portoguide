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
    const windowHeight = window.innerHeight;

    fadeItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const offset = 300; // Aparece mais cedo (ajuste conforme necessário)

        if (rect.top < windowHeight - offset) {
            item.classList.add('active');
        }
    });
}

// Adicione o evento de scroll e inicialização
window.addEventListener('scroll', handleFadeIn);
document.addEventListener('DOMContentLoaded', handleFadeIn);

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

\\ Contador spots
function animateCounter(id, start, end, duration) {
    const element = document.getElementById(id);
    const range = end - start;
    let current = start;
    const increment = range / (duration / 16); // Aproximadamente 60 frames por segundo
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

// Ativar o contador quando a seção entrar na visualização
document.addEventListener('DOMContentLoaded', () => {
    const spotCounterSection = document.querySelector('.spot-counter');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter('spot-counter', 0, 77, 2000); // Contar de 0 a 77 em 2 segundos
                    observer.disconnect(); // Evitar múltiplas ativações
                }
            });
        },
        { threshold: 0.5 } // Ativar quando 50% da seção estiver visível
    );
    observer.observe(spotCounterSection);
});


// FAQ
document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion");

    accordions.forEach(accordion => {
        accordion.addEventListener("click", function () {
            // Alterna a classe 'active' no botão clicado
            this.classList.toggle("active");

            // Seleciona o painel associado
            const panel = this.nextElementSibling;

            // Verifica se o painel está visível
            if (panel.style.maxHeight) {
                // Se estiver visível, oculta-o
                panel.style.maxHeight = null;
                panel.classList.remove("show");
            } else {
                // Se não estiver visível, exibe-o
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.add("show");
            }
        });
    });
});

