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

// Carousel Navigation
//const carouselItems = document.querySelectorAll('.carousel-item');
//const carouselImages = document.querySelector('.carousel-images');
//let currentIndex = 0;

// Function to update the carousel and show the active image
//function updateCarousel() {
//    const offset = -currentIndex * 100; // Move o carrossel para a esquerda
  //  carouselImages.style.transform = `translateX(${offset}%)`;
//}

// Event listeners for navigation buttons
//document.getElementById('prev').addEventListener('click', () => {
//    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
 //   updateCarousel();
//});

//document.getElementById('next').addEventListener('click', () => {
 //   currentIndex = (currentIndex + 1) % carouselItems.length;
   // updateCarousel();
//});

// Inicializa o carrossel mostrando a primeira imagem
//updateCarousel();

//Carousel Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Loop infinito
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000, // Troca automática a cada 3 segundos
        },
        allowTouchMove: true, // Garante rolagem no mobile
        touchStartPreventDefault: false, // Corrige o congelamento ao tocar
    });

    // Garante que a rolagem funcione corretamente no mobile
    document.addEventListener('touchmove', (e) => {
        e.stopPropagation();
    }, { passive: false });
