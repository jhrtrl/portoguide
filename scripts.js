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
const customStartDate = new Date("2024-12-15T00:00:00"); // Set your desired start date
const promotionEndDate = new Date(customStartDate.getTime() + 5 * 24 * 60 * 60 * 1000).getTime();
startCountdown(promotionEndDate, "main-countdown");
startCountdown(promotionEndDate, "sticky-countdown");

// Scroll Events: Sticky Header and Fade-In
window.addEventListener('scroll', () => {
    const stickyHeader = document.getElementById('sticky-header');
    const fadeIns = document.querySelectorAll('.fade-in');

    // Sticky Header Behavior
    if (window.scrollY > 200) {
        stickyHeader.classList.add('active');
    } else {
        stickyHeader.classList.remove('active');
    }

    // Fade-In Animations
    fadeIns.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            element.classList.add('active');
        }
    });
});

// Function to handle fade-in animations
function handleFadeIn() {
    // Select all fade-in elements
    const fadeItems = document.querySelectorAll('.fade-in, .fade-in-right');
    fadeItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect(); // Get the position relative to the viewport

        // Check if the element is near the viewport
        if (rect.top < window.innerHeight - 100) {
            // Add the active class to trigger animation
            setTimeout(() => {
                item.classList.add('active');
            }, index * 200); // Optional: Stagger animations for better effect
        }
    });
}

// Initial check to activate items already in view
handleFadeIn();

// Add scroll event listener to trigger animations
window.addEventListener('scroll', handleFadeIn);

// Carousel Functionality
const carousel = document.querySelector('.carousel-wrapper');
const items = Array.from(carousel.querySelectorAll('picture'));
let currentIndex = 0;

// Function to update the carousel for fade effect
function updateCarousel() {
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.style.opacity = 1; // Fully visible
            item.style.zIndex = 1; // Bring the active slide to the front
        } else {
            item.style.opacity = 0; // Hide non-active slides
            item.style.zIndex = 0; // Send non-active slides to the back
        }
    });
}

// Event listeners for navigation
document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Wrap to last slide
    updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length; // Wrap to first slide
    updateCarousel();
});

// Initialize carousel
updateCarousel();
