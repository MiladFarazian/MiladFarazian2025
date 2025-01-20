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

/* Select all anchor links in the navbar */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetSection = document.querySelector(targetId); // Select the target section

        // Smoothly scroll to the target section
        targetSection.scrollIntoView({
            behavior: 'smooth', // Smooth scrolling animation
            block: 'start' // Scroll to the top of the section
        });
    });
});

// Add toggle functionality for experience items
document.querySelectorAll('.experience-item').forEach(item => {
    const header = item.querySelector('.experience-header');
    const details = item.querySelector('.experience-details');
    const button = item.querySelector('.toggle-button');

    header.addEventListener('click', () => {
        if (details.classList.contains('active')) {
            // Collapse the details
            const height = details.scrollHeight; // Get current full height
            details.style.maxHeight = height + 'px'; // Set current height
            setTimeout(() => {
                details.style.maxHeight = '0'; // Collapse smoothly
            }, 10); // Ensure transition applies
            button.textContent = '+';
        } else {
            // Expand the details
            details.style.display = 'block'; // Make it visible
            const fullHeight = details.scrollHeight + 'px'; // Get full height
            details.style.maxHeight = '0'; // Start from collapsed state
            setTimeout(() => {
                details.style.maxHeight = fullHeight; // Expand to full height
            }, 10); // Ensure transition applies
            button.textContent = '-';

            // Scroll into view
            details.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

        // Toggle active class
        details.classList.toggle('active');
    });

    // Reset `display` after transition ends
    details.addEventListener('transitionend', () => {
        if (!details.classList.contains('active')) {
            details.style.display = 'none'; // Hide after transition finishes
        }
    });
});