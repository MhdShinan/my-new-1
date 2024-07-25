// Initialize AOS Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

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
        feedbackMessage.textContent = 'Email sent successfully!';
        feedbackMessage.style.color = 'green';
        feedbackMessage.insertAdjacentHTML('beforeend', '<img src="/images/cunning.gif" alt="Success" class="feedback-image">');
      } else {
        feedbackMessage.textContent = 'Failed to send email.';
        feedbackMessage.style.color = 'red';
        feedbackMessage.insertAdjacentHTML('beforeend', '<img src="/images/sad.gif" alt="Failure" class="feedback-image">');
      }
    } catch (error) {
      feedbackMessage.textContent = 'An error occurred: ' + error.message;
      feedbackMessage.style.color = 'red';
      feedbackMessage.insertAdjacentHTML('beforeend', '<img src="/images/sad.gif" alt="Failure" class="feedback-image">');
    } finally {
      // Hide the loading GIF after the request completes
      loading.style.display = 'none';
    }
  });
});
