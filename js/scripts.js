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
      details.classList.toggle('active');
      button.classList.toggle('active');
  
      // Update button text
      button.textContent = details.classList.contains('active') ? '-' : '+';
    });
  });
  
