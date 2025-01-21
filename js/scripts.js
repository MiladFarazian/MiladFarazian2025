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

document.querySelectorAll('.experience-item').forEach(item => {
    const header = item.querySelector('.experience-header');
    const details = item.querySelector('.experience-details');
    const button = item.querySelector('.toggle-button');

    header.addEventListener('click', () => {
        const isExpanding = !details.classList.contains('active');

        if (isExpanding) {
            // Expand the details
            details.style.display = 'block'; // Make it visible
            const fullHeight = details.scrollHeight + 'px'; // Get the full height
            details.style.maxHeight = '0'; // Reset height for transition
            setTimeout(() => {
                details.style.maxHeight = fullHeight; // Expand smoothly
            }, 10); // Allow styles to apply before expanding
            button.textContent = '-';
        } else {
            // Collapse the details
            const currentHeight = details.scrollHeight + 'px'; // Current visible height
            details.style.maxHeight = currentHeight; // Set current height for transition
            setTimeout(() => {
                details.style.maxHeight = '0'; // Collapse smoothly
            }, 10); // Allow styles to apply before collapsing
            button.textContent = '+';
        }

        // Toggle active class on details and header
        details.classList.toggle('active');
        header.classList.toggle('active');
    });

    details.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'max-height' && !details.classList.contains('active')) {
            details.style.display = 'none'; // Hide completely after collapse
        }
    });
});

// Select all filter buttons and project cards
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Add click event listener to each filter button
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter projects
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        card.style.display = 'block'; // Show matching projects
      } else {
        card.style.display = 'none'; // Hide non-matching projects
      }
    });
  });
});
