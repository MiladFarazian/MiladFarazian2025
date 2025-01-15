document.querySelectorAll('.nav-links li').forEach(item => {
    item.addEventListener('mouseover', () => {
        // Make sure all items are gray before hovering
        document.querySelectorAll('.nav-links li').forEach(i => i.classList.add('inactive'));
        item.classList.remove('inactive');
    });

    item.addEventListener('mouseout', () => {
        // Reset all items to white when no hover
        document.querySelectorAll('.nav-links li').forEach(i => i.classList.remove('inactive'));
    });
});

// Get the navbar and the #expertise section
const navbar = document.querySelector('.navbar');
const expertiseSection = document.querySelector('#expertise');

// Listen for scroll events
window.addEventListener('scroll', () => {
    // Check if we've scrolled past the #expertise section
    if (window.scrollY >= expertiseSection.offsetTop) {
        navbar.classList.add('fixed');
    } else {
        navbar.classList.remove('fixed');
    }
});
