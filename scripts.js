// Sticky Header Toggle on Scroll
window.addEventListener('scroll', () => {
    const stickyHeader = document.getElementById('sticky-header');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 200) { // Adjust threshold as needed
        stickyHeader.classList.add('active'); // Show sticky header
    } else {
        stickyHeader.classList.remove('active'); // Hide sticky header
    }
});

// Carousel Functionality
const carousel = document.querySelector('.carousel-wrapper');
const items = Array.from(carousel.querySelectorAll('picture')); // Get all picture elements
let currentIndex = 0;

// Initialize the carousel layout
function initializeCarousel() {
    items.forEach((item, index) => {
        item.style.position = 'absolute'; // Position all items absolutely
        item.style.top = '0'; // Align all items to the top
        item.style.left = `${index * 100}%`; // Position items sequentially
        item.style.transition = 'transform 0.5s ease'; // Smooth transition
        if (index === currentIndex) {
            item.style.display = 'block'; // Show only the current image
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
            item.style.transform = 'translateX(0)'; // Reset transform for the active image
        } else {
            item.style.display = 'none'; // Hide all other images
        }
    });
    console.log('Current Index:', currentIndex); // Debug log for current index
}

// Move to the next image
function goToNextImage() {
    currentIndex = (currentIndex + 1) % items.length; // Wrap around to the first item
    updateCarousel();
    console.log('Next Image - New Index:', currentIndex); // Debug log: New index after Next
}

// Move to the previous image
function goToPreviousImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Wrap around to the last item
    updateCarousel();
    console.log('Previous Image - New Index:', currentIndex); // Debug log: New index after Previous
}

// Start auto-swipe functionality
function startAutoSwipe() {
    setInterval(goToNextImage, 3000); // Change images every 3 seconds
    console.log('Auto-swipe started.');
}

// Add Event Listeners for Carousel Controls
document.getElementById('prev').addEventListener('click', () => {
    goToPreviousImage();
});

document.getElementById('next').addEventListener('click', () => {
    goToNextImage();
});

// Initialize the carousel and auto-swipe
initializeCarousel();
startAutoSwipe();
