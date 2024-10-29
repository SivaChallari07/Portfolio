let slideIndex = 0;
let slides = document.querySelectorAll(".slides img");
let autoSlideTimer;
let isPaused = false;

// Function to show a specific slide
function showSlide(index) {
    // Wrap around index if it's out of bounds
    slideIndex = (index + slides.length) % slides.length;

    // Hide all images and show only the active one
    slides.forEach((slide, i) => {
        slide.style.opacity = 0; // Start with a fade-out effect
        if (i === slideIndex) {
            slide.style.display = 'block'; // Ensure the active slide is displayed
            setTimeout(() => {
                slide.style.opacity = 1; // Fade in the active slide
            }, 10); // Small delay to allow display to take effect
        } else {
            slide.style.display = 'none'; // Hide other slides
        }
    });
}

// Function to move slides manually
function moveSlide(n) {
    clearInterval(autoSlideTimer); // Stop automatic scrolling when user clicks
    showSlide(slideIndex + n);
    startAutoSlide(); // Restart auto-scrolling after manual move
}

// Automatic slide scrolling every 3 seconds
function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        if (!isPaused) {
            moveSlide(1);
        }
    }, 3000); // Change slide every 3 seconds
}

// Stop scrolling when mouse hovers over an image
slides.forEach(slide => {
    slide.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    // Resume scrolling when mouse leaves the image
    slide.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    // Stop scrolling when clicking on an image
    slide.addEventListener("click", () => {
        isPaused = true;
    });
});

// Start the slider when the page loads
document.addEventListener("DOMContentLoaded", () => {
    showSlide(slideIndex); // Show the first image initially
    startAutoSlide(); // Start the automatic scrolling
});

// scripts.js
// Select the menu button and menu items
const menuButton = document.querySelector(".menu-button");
const menuItems = document.querySelector(".menu-items");

// Toggle the 'active' class to show/hide the menu items on button click
menuButton.addEventListener("click", (event) => {
    menuItems.classList.toggle("active");
    event.stopPropagation(); // Prevent the click event from propagating to the document
});

// Close the menu when clicking outside of it
document.addEventListener("click", (event) => {
    // Check if the click is outside of the menu and button
    if (!menuItems.contains(event.target) && !menuButton.contains(event.target)) {
        menuItems.classList.remove("active");
    }
});

// Highlight the current page link
const currentPath = window.location.pathname;

// Find all links and highlight the one matching the current path
document.querySelectorAll(".menu-items a").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
        link.classList.add("active"); // Add active class to the current link
        link.style.color = "#3D8A2D"; // Optional: Change color to indicate active link
        link.style.fontWeight = "bold"; // Make the active link bold
    }
});

// Optional: Enhance accessibility by adding keyboard support
menuButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") { // Handle Enter and Space
        menuItems.classList.toggle("active");
        event.preventDefault(); // Prevent default action
    }
});

// Close the menu on escape key press
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuItems.classList.contains("active")) {
        menuItems.classList.remove("active");
    }
});


document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        fetch('/api/contact/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('contactForm').reset();
            } else {
                throw new Error('Failed to send message.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        });
    });
	window.addEventListener("load", function() {
	    setTimeout(() => {
	        const galleryGrid = document.querySelector(".gallery-grid");
	        if (galleryGrid) {
	            galleryGrid.classList.add("loaded"); // Show gallery with fade-in
	        }
	    }, 1000); // Delay of 1 second
	});

	


