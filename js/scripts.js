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

// Show the response-message popup
function showPopup(message, isSuccess = true) {
    const responseMessage = document.getElementById('response-message');

    // Set the message and style
    responseMessage.textContent = message;
    responseMessage.className = `popup ${isSuccess ? 'success' : 'error'}`;
    responseMessage.classList.remove('hidden');

    // Auto-hide the popup after 3 seconds
    setTimeout(() => {
        responseMessage.classList.add('hidden');
    }, 3000);
}
  
// Add event listener to all forms with the class "contact-form"
document.querySelectorAll('.contact-form').forEach((form) => {
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(form);

    try {
    // Submit form data to Formspree
    const response = await fetch('https://formspree.io/f/mjkgbrkj', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
    });

    if (response.ok) {
        showPopup('Message sent successfully!', true);
        form.reset(); // Clear form fields
    } else {
        showPopup('Failed to send message. Please try again.', false);
    }
    } catch (error) {
    showPopup('An error occurred. Please check your connection and try again.', false);
    }
});
});
  

// Count projects and update the numbers
function updateProjectCounts() {
    // Create a map to store project counts by category
    const counts = { all: projectCards.length };
  
    // Count projects for each category
    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      counts[category] = (counts[category] || 0) + 1;
    });
  
    // Update the counts in the filter buttons
    filterButtons.forEach((button) => {
      const filter = button.getAttribute('data-filter');
      const count = counts[filter] || 0;
  
      // Format the count as a two-digit number
      const formattedCount = count.toString().padStart(2, '0');
  
      // Update the count element
      const countElement = button.querySelector('.project-count');
      countElement.textContent = formattedCount;
    });
}

// Run the function on page load
updateProjectCounts();

// Select DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');
const closeMenu = document.getElementById('close-menu');

// Open Dropdown Menu
menuToggle.addEventListener('click', () => {
  dropdownMenu.classList.add('show');
});

// Close Dropdown Menu
closeMenu.addEventListener('click', () => {
  dropdownMenu.classList.remove('show');
});

// Select all links inside the dropdown menu
const dropdownLinks = dropdownMenu.querySelectorAll("a");

// Close dropdown menu when a link is clicked
dropdownLinks.forEach(link => {
  link.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
  });
});


  
  
