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
const carousel = document.querySelector('.carousel-wrapper');
const items = Array.from(carousel.querySelectorAll('picture')); // Get all picture elements
let currentIndex = 0;
let autoSwipeInterval;

// Initialize the carousel layout
function initializeCarousel() {
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.style.display = 'block'; // Show only the active image
        } else {
            item.style.display = 'none'; // Hide others
        }
    });
    console.log('Carousel Initialized');
}

// Update the carousel when navigating
function updateCarousel() {
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.style.display = 'block'; // Show the current image
        } else {
            item.style.display = 'none'; // Hide all other images
        }
    });
    console.log('Current Index:', currentIndex); // Debug log for current index
}

// Move to the next image
function goToNextImage() {
    currentIndex = (currentIndex + 1) % items.length; // Wrap around to the first item
    console.log('Next Image - New Index:', currentIndex); // Debug log: New index after Next
    updateCarousel();
}

// Move to the previous image
function goToPreviousImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Wrap around to the last item
    console.log('Previous Image - New Index:', currentIndex); // Debug log: New index after Previous
    updateCarousel();
}

// Start auto-swipe functionality
function startAutoSwipe() {
    autoSwipeInterval = setInterval(goToNextImage, 3000); // Change images every 3 seconds
    console.log('Auto-swipe started.');
}

// Stop auto-swipe functionality
function stopAutoSwipe() {
    clearInterval(autoSwipeInterval);
    console.log('Auto-swipe stopped.');
}

// Add event listeners for buttons
document.getElementById('prev').addEventListener('click', () => {
    stopAutoSwipe(); // Stop auto-swipe on manual navigation
    goToPreviousImage();
    startAutoSwipe(); // Restart auto-swipe
});

document.getElementById('next').addEventListener('click', () => {
    stopAutoSwipe(); // Stop auto-swipe on manual navigation
    goToNextImage();
    startAutoSwipe(); // Restart auto-swipe
});

// Add event listeners to check image loading
items.forEach((item, index) => {
    const img = item.querySelector('img'); // Select the <img> inside each <picture>
    if (img) {
        img.addEventListener('load', () => {
            console.log(`Image ${index} loaded successfully.`);
        });
        img.addEventListener('error', () => {
            console.error(`Image ${index} failed to load.`);
        });
    } else {
        console.warn(`No <img> found for item ${index}`);
    }
});

// Initialize the carousel
initializeCarousel();
startAutoSwipe(); // Start auto-swipe when the page loads
