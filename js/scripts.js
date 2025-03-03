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

// Debounce function to limit the frequency of updates
function debounce(func, delay = 20) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  // Get the navbar and the #expertise section
  const navbar = document.querySelector('.navbar');
  const expertiseSection = document.querySelector('#expertise');
  
  // Scroll event listener with debounce
  window.addEventListener(
    'scroll',
    debounce(() => {
      if (window.scrollY >= expertiseSection.offsetTop) {
        navbar.classList.add('fixed');
      } else {
        navbar.classList.remove('fixed');
      }
    }, 10) // Adjust delay for better responsiveness
  );
  

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

document.addEventListener("DOMContentLoaded", function () {
  const experienceHeaders = document.querySelectorAll(".experience-header");

  experienceHeaders.forEach(header => {
      header.addEventListener("click", function () {
          const currentlyOpen = document.querySelector(".experience-details.active");
          const details = this.nextElementSibling; // Get corresponding details section
          const button = this.querySelector(".toggle-button");

          // If clicking the already open section, close it
          if (currentlyOpen === details) {
              details.style.maxHeight = details.scrollHeight + "px"; // Reset to current height
              requestAnimationFrame(() => {
                  details.style.maxHeight = "0px"; // Collapse smoothly
              });

              details.classList.remove("active");
              this.classList.remove("active");
              button.textContent = "+";

              // Delay hiding the element slightly to let animation finish
              setTimeout(() => {
                  if (!details.classList.contains("active")) {
                      details.style.display = "none";
                  }
              }, 400); // Delay should match CSS transition time

              return;
          }

          // If another section is open, close it first
          if (currentlyOpen && currentlyOpen !== details) {
              currentlyOpen.style.maxHeight = currentlyOpen.scrollHeight + "px";
              requestAnimationFrame(() => {
                  currentlyOpen.style.maxHeight = "0px";
              });

              currentlyOpen.classList.remove("active");
              currentlyOpen.previousElementSibling.classList.remove("active");
              currentlyOpen.previousElementSibling.querySelector(".toggle-button").textContent = "+";

              // Delay hiding to allow animation to fully finish
              setTimeout(() => {
                  if (!currentlyOpen.classList.contains("active")) {
                      currentlyOpen.style.display = "none";
                  }
              }, 300);
          }

          // Open the clicked section smoothly
          details.style.display = "block"; // Ensure it's visible before expanding
          requestAnimationFrame(() => {
              details.style.maxHeight = details.scrollHeight + "px"; // Expand smoothly
          });

          details.classList.add("active");
          this.classList.add("active");
          button.textContent = "-";
      });
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

// Select the toggle button and filter buttons
const toggleButton = document.querySelector('.collapsible-toggle');

// Select the parent container of filter buttons
const filterContainer = document.querySelector('.filter-buttons');

// Add event listener for toggle button
toggleButton.addEventListener('click', () => {
  const isOpen = filterContainer.classList.contains('open');
  
  // Toggle the "open" class on the filter container
  filterContainer.classList.toggle('open', !isOpen);

  // Update the toggle button text
  toggleButton.textContent = isOpen ? 'Filter Projects' : 'Filter by:';
});

// Select modal elements
const modal = document.getElementById('project-modal');
const modalTitle = modal.querySelector('.modal-title');
const modalImage = modal.querySelector('.modal-image');
const modalDescription = modal.querySelector('.modal-description');
const modalTechnologies = modal.querySelector('.modal-technologies');
const modalProjectTitle = modal.querySelector('.modal-project-title');
const modalOpen = modal.querySelector('.modal-open'); // Select the "Open Project" button
const modalClose = modal.querySelector('.modal-close'); // Select the "Open Project" button
const prevProjectBtn = document.getElementById('prev-project');
const nextProjectBtn = document.getElementById('next-project');

let currentIndex = 0; // Track current project

// Function to update the modal with a specific project index
function updateModal(index) {
  const card = projectCards[index];
  if (!card) return;

  // Extract project details
  const title = card.getAttribute('data-title');
  const description = card.getAttribute('data-description');
  const imageSrc = card.getAttribute('data-image');
  const technologies = card.getAttribute('data-technologies') || "Not specified";
  const projectLink = card.getAttribute('data-link');

  // Populate modal with project details
  modalTitle.textContent = title;
  modalProjectTitle.textContent = title;
  modalDescription.textContent = description;
  modalImage.src = imageSrc;
  modalTechnologies.textContent = technologies;

  // Update the "Open Project" link
  if (projectLink) {
      modalOpen.href = projectLink;
      modalOpen.style.display = "inline-flex";
  } else {
      modalOpen.style.display = "none";
  }

  // Update current index
  currentIndex = index;

  // Update next project title (NEW CODE)
  const nextProjectTitleContainer = document.getElementById("next-project-title");
  if (currentIndex < projectCards.length - 1) {
      const nextProjectTitle = projectCards[currentIndex + 1].getAttribute('data-title');
      nextProjectTitleContainer.textContent = nextProjectTitle;
      nextProjectTitleContainer.style.display = "block"; // Make sure it's visible
  } else {
      nextProjectTitleContainer.textContent = "";
      nextProjectTitleContainer.style.display = "none"; // Hide if no next project
  }

  // Update navigation button visibility
  prevProjectBtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";
  nextProjectBtn.style.visibility = currentIndex === projectCards.length - 1 ? "hidden" : "visible";
}

// Add event listeners to project cards to open modal
projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        updateModal(index);
        modal.classList.remove('hidden');
        modal.classList.add('visible');
    });
});

// Add event listeners for navigation buttons
prevProjectBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        updateModal(currentIndex - 1);
    }
});

nextProjectBtn.addEventListener('click', () => {
    if (currentIndex < projectCards.length - 1) {
        updateModal(currentIndex + 1);
    }
});

  

// Add event listener to close button
modalClose.addEventListener('click', () => {
  modal.classList.remove('visible');
  modal.classList.add('hidden');
});

// Close modal on clicking outside the content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
  }
});

modalClose.addEventListener('click', (e) => {
    e.preventDefault();

    // Add blink animation on click
    modalClose.classList.add('clicked');

    // Remove class after animation completes
    setTimeout(() => {
        modalClose.classList.remove('clicked');
    }, 600);

    // Close modal
    const modal = document.getElementById('project-modal');
    modal.classList.remove('visible');
    modal.classList.add('hidden');
});

document.addEventListener("DOMContentLoaded", () => {
    const gif = document.getElementById("gif");

    setTimeout(() => {
        gif.src = "images/milad_home.png"; // Replace GIF with a still frame
        gif.style.top = "2px"; // Push the PNG down
    }, 350); 
});



  
  
