//login
document.querySelector('.login-button').addEventListener('click', function() {
  window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.querySelector('.login-button');
  loginButton.addEventListener('click', function () {
      if (window.innerWidth <= 768) { // Adjust the screen width as needed for "mobile view"
          window.location.href = 'login.html';
      }
  });
});


//new
document.getElementById('theme-toggle').addEventListener('change', function() {
  document.body.classList.toggle('dark-mode', this.checked);
});
// Function to update the background color of the element
function updateElementBackground() {
  // Check if the body has the dark-mode class
  const isDarkMode = document.body.classList.contains('dark-mode');
  const targetElement = document.querySelector('.shadow-1-strong.bg-white.my-5');
  

  if (targetElement) {
    if (isDarkMode) {
      targetElement.style.setProperty('background-color', 'black', 'important');
    } else {
      targetElement.style.removeProperty('background-color'); // Reset to default
    }
  }
}

// Function to toggle dark mode
function toggleDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  document.body.classList.toggle('dark-mode', themeToggle.checked);
  updateElementBackground(); // Update background color when toggling
}

// Event listener for the theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('change', toggleDarkMode);
  updateElementBackground(); // Initial update based on current mode
});



// Initialize AOS Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});


function openNav() {
  document.getElementById("mobileNav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mobileNav").style.width = "0";
}




// Function to handle opening modals
function openModal(modalId, imageSrc) {
  var modal = document.getElementById(modalId);
  var modalImg = modal.querySelector(".modal-content");
  if (modal && modalImg) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
  }
}

// Function to handle closing modals
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Add event listeners for zoom icons
  document.querySelectorAll('.zoom-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      var modalId = this.getAttribute('data-modal');
      var imageSrc = this.previousElementSibling.src; // Get the image source
      openModal(modalId, imageSrc);
    });
  });

  // Close the modal when clicking outside of the image
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Handle zoom button functionality
  const zoomButtons = document.querySelectorAll('.zoom-button');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.close');

  // Open the modal when a zoom button is clicked
  zoomButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetImg = document.querySelector(button.getAttribute('data-target'));
      modal.style.display = 'block';
      modalImg.src = targetImg.src;
    });
  });

  // Close the modal when the close button is clicked
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close the modal when clicking outside the image
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Handle Image Carousel Functionality
  const sections = {
    section3: {
      currentImageIndex: 0,
      images: [
        "images/project-2.jpg",
        "images/project-1.jpg",
        "images/project-3.jpg"
      ]
    },
    section4: {
      currentImageIndex: 0,
      images: [
        "images/project-2.jpg",
        "images/project-1.jpg",
        "images/project-3.jpg"
      ]
    },
    section5: {
      currentImageIndex: 0,
      images: [
        "images/project-2.jpg",
        "images/project-1.jpg",
        "images/project-3.jpg"
      ]
    },
    section6: {
      currentImageIndex: 0,
      images: [
        "images/project-2.jpg",
        "images/project-1.jpg",
        "images/project-3.jpg"
      ]
    }
  };

  function showNextImage(sectionId) {
    const section = sections[sectionId];
    const images = document.querySelector(`#${sectionId} .images-container`);
    section.currentImageIndex = (section.currentImageIndex + 1) % section.images.length;
    updateImage(sectionId);
  }

  function showPreviousImage(sectionId) {
    const section = sections[sectionId];
    const images = document.querySelector(`#${sectionId} .images-container`);
    section.currentImageIndex = (section.currentImageIndex - 1 + section.images.length) % section.images.length;
    updateImage(sectionId);
  }

  function updateImage(sectionId) {
    const section = sections[sectionId];
    const images = document.querySelector(`#${sectionId} .images-container`);
    const imageElements = images.querySelectorAll('img');

    imageElements.forEach((img, index) => {
      img.classList.toggle('current-image', index === section.currentImageIndex);
      img.classList.toggle('hidden-image', index !== section.currentImageIndex);
    });
  }

 
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const feedbackMessage = document.getElementById('feedback-message');
  const loading = document.getElementById('loading');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    // Show the loading GIF
    loading.style.display = 'block';

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        body: new URLSearchParams(formData)
      });

      const result = await response.text();

      if (response.ok) {
        displayTypewriterEffect('Email sent successfully!', 'green', '/images/cunning.gif');
      } else {
        displayTypewriterEffect('Failed to send email.', 'red', '/images/sad.gif');
      }
    } catch (error) {
      displayTypewriterEffect('An error occurred: ' + error.message, 'red', '/images/sad.gif');
    } finally {
      // Hide the loading GIF after the request completes
      loading.style.display = 'none';
    }
  });

  function displayTypewriterEffect(message, color, imageUrl) {
    feedbackMessage.textContent = '';
    feedbackMessage.style.color = color;
    feedbackMessage.insertAdjacentHTML('beforeend', `<img src="${imageUrl}" alt="Feedback" class="feedback-image">`);

    let i = 0;
    function typeWriter() {
      if (i < message.length) {
        feedbackMessage.textContent += message.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // Adjust the typing speed here
      }
    }
    typeWriter();
  }
});



function showPreviousImage(sectionId) {
  const section = document.getElementById(sectionId);
  const showcase = section.querySelector('.showcase');
  const images = showcase.querySelectorAll('.images-container img');
  let currentIndex = Array.from(images).findIndex(image => image.classList.contains('current-image'));

  images[currentIndex].classList.remove('current-image');
  images[currentIndex].classList.add('hidden-image');

  currentIndex = (currentIndex - 1 + images.length) % images.length;

  images[currentIndex].classList.remove('hidden-image');
  images[currentIndex].classList.add('current-image');
}

function showNextImage(sectionId) {
  const section = document.getElementById(sectionId);
  const showcase = section.querySelector('.showcase');
  const images = showcase.querySelectorAll('.images-container img');
  let currentIndex = Array.from(images).findIndex(image => image.classList.contains('current-image'));

  images[currentIndex].classList.remove('current-image');
  images[currentIndex].classList.add('hidden-image');

  currentIndex = (currentIndex + 1) % images.length;

  images[currentIndex].classList.remove('hidden-image');
  images[currentIndex].classList.add('current-image');
}

