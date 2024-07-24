// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Add your javascript here
//new

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
},

};

function showNextImage(sectionId) {
  const section = sections[sectionId];
  const images = document.querySelector(`#${sectionId} .images-container`);
  const currentImage = images.querySelector('.current-image');

  section.currentImageIndex = (section.currentImageIndex + 1) % section.images.length;

  updateImage(sectionId);
}

function showPreviousImage(sectionId) {
  const section = sections[sectionId];
  const images = document.querySelector(`#${sectionId} .images-container`);
  const currentImage = images.querySelector('.current-image');

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


//new
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const feedbackMessage = document.getElementById('feedback-message');
  const loading = document.getElementById('loading');
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const mainContent = document.getElementById('main-content');
  const fadeOutDuration = 10000; // 10 seconds (10000 milliseconds)
  
  function typewriterEffect(text, element, delay = 100) {
    let index = 0;
    element.textContent = ''; // Clear the content before starting
    const interval = setInterval(() => {
      element.textContent += text[index];
      index++;
      if (index > text.length - 1) {
        clearInterval(interval);
      }
    }, delay);
  }

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

      // Handle response
      if (response.ok) {
        // Typewriter effect for success message
        typewriterEffect('Email sent successfully!', feedbackMessage, 50);
        feedbackMessage.style.color = 'green';
        feedbackMessage.insertAdjacentHTML('beforeend', '<img src="/images/cunning.gif" alt="Success" class="feedback-image">');
      } else {
        // Typewriter effect for failure message
        typewriterEffect('Failed to send email.', feedbackMessage, 50);
        feedbackMessage.style.color = 'red';
        feedbackMessage.insertAdjacentHTML('beforeend', '<img src="/images/sad.gif" alt="Failure" class="feedback-image">');
      }
    } catch (error) {
      // Typewriter effect for error message
      typewriterEffect('An error occurred: ' + error.message, feedbackMessage, 50);
      feedbackMessage.style.color = 'red';
      feedbackMessage.insertAdjacentHTML('beforeend', '<img src="/images/sad.gif" alt="Failure" class="feedback-image">');
    } finally {
      // Hide the loading GIF
      loading.style.display = 'none';
    }
  });

  // Hide the welcome overlay and show the main content after the fade-out
  setTimeout(() => {
    welcomeOverlay.style.opacity = 0; // Fade out the overlay
    setTimeout(() => {
      // Remove the overlay from the DOM after fade-out is complete
      welcomeOverlay.style.display = 'none';
      // Apply transition for the main content
      mainContent.classList.add('show');
    }, fadeOutDuration); // Match the fade-out duration
  }, 0); // Start the fade-out immediately
});

