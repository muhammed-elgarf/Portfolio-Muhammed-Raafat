
/* =========================
   LOADING SCREEN
========================= */

const loader = document.getElementById("loader");
const loaderNumber = document.getElementById("loader-number");
const loaderProgress = document.getElementById("loader-progress");
const loaderTitle = document.querySelector(".loader-title");
const loaderStatus = document.getElementById("loader-status");
const loaderCounter = document.getElementById("loader-counter");

if (loader) {
  document.body.style.overflow = "hidden";

  const finishLoading = () => {
    if (loader.dataset.finished === "true") return;
    loader.dataset.finished = "true";

    const duration = 400;
    const start = performance.now();

    const animateExit = (now) => {
      const progress = Math.min((now - start) / duration, 1);

      loader.style.opacity = String(1 - progress);

      if (progress < 1) {
        requestAnimationFrame(animateExit);
      } else {
        loader.style.visibility = "hidden";
        loader.style.display = "none";
        document.body.style.overflow = "";
      }
    };

    requestAnimationFrame(animateExit);
  };

  const startLoading = () => {
    const loadingMessages = [
      "Initializing Portfolio...",
      "Loading Portfolio...",
      "Preparing Interface...",
      "Running Quality Checks...",
      "Almost Ready...",
      "All Checks Passed ✓"
    ];

    const images = [...document.images];
    const totalImages = images.length;

    const updateProgress = () => {
      const loadedImages = images.filter(
        (image) => image.complete
      ).length;

      const percentage = totalImages
        ? Math.round((loadedImages / totalImages) * 100)
        : 100;

      if (loaderNumber) {
        loaderNumber.textContent = percentage;
      }

      if (loaderProgress) {
        loaderProgress.style.width = `${percentage}%`;
      }

      if (loaderCounter) {
        loaderCounter.textContent = String(percentage).padStart(3, "0");
      }

      if (loaderStatus) {
        const messageIndex = Math.min(
          Math.floor(percentage / 20),
          loadingMessages.length - 1
        );

        loaderStatus.textContent = loadingMessages[messageIndex];
      }

      if (loaderTitle) {
        const reveal = Math.max(0, (percentage - 10) / 90);
        loaderTitle.style.opacity = reveal;
        loaderTitle.style.transform = `translateY(${8 - reveal * 8}px)`;
        loaderTitle.style.clipPath = `inset(0 ${100 - reveal * 100}% 0 0)`;
      }

      if (percentage >= 100) {
        finishLoading();
      }
    };

    updateProgress();

    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", updateProgress, { once: true });
        image.addEventListener("error", updateProgress, { once: true });
      }
    });
  };

  if (document.readyState === "complete") {
    startLoading();
  } else {
    window.addEventListener("load", startLoading, { once: true });
  }
}


/* =========================
   IMAGE TILT EFFECT
   Tilts the image container based on the mouse position.
========================= */

// Find the image container that responds to mouse movement.
const imageBox = document.querySelector(".image-box");

if (imageBox) {

  // Calculate the mouse position and rotate the image container accordingly.
  imageBox.addEventListener("mousemove", (e) => {

    // Get the container's position and dimensions.
    const rect = imageBox.getBoundingClientRect();

    // Calculate the mouse coordinates relative to the container.
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate horizontal rotation based on the mouse's vertical position.
    const rotateY =
      ((x / rect.width) - 0.5) * 12;

    // Calculate vertical rotation based on the mouse's horizontal position.
    const rotateX =
      ((y / rect.height) - 0.5) * -12;

    // Apply the 3D tilt effect to the image container.
    imageBox.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Reset the image container when the mouse leaves it.
  imageBox.addEventListener("mouseleave", () => {

    imageBox.style.transform =
      "rotateX(0deg) rotateY(0deg)";
  });
}

/* =========================
   CERTIFICATES FILTER
========================= */

// Get all certificate filter buttons and certificate cards.
const filterButtons = document.querySelectorAll(".filter-btn");
const certificateCards = document.querySelectorAll(".certificate-card");

// Add a click event to every filter button.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {

    // Remove the active state from all filter buttons.
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Mark the clicked button as active.
    button.classList.add("active");

    // Read the selected category from the button.
    const filter = button.getAttribute("data-filter");

    // Show matching certificates and hide the others.
    certificateCards.forEach((card) => {
      if (
        filter === "all" ||
        card.classList.contains(filter)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});


/* =========================
   SCROLL TO TOP
========================= */

// Get the scroll-to-top button.
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Initialize the scroll behavior only if the button exists.
if (scrollTopBtn) {

  // Show the button after the user scrolls down more than 300px.
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // Smoothly scroll back to the top when the button is clicked.
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* =========================
   DARK / LIGHT MODE
========================= */

// Get the theme toggle button and its icon.
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");


/* =========================
   LOAD SAVED THEME
========================= */

// Read the previously saved theme from localStorage.
const savedTheme = localStorage.getItem("theme");

// Restore dark mode if it was selected previously.
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");

  // Update the icon to match the current theme.
  if (themeIcon) {
    themeIcon.textContent = "☾";
  }

  // Describe the action available through the theme button.
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      "Switch to light mode"
    );
  }
}


/* =========================
   TOGGLE THEME
========================= */

// Add theme-switching behavior if the toggle button exists.
if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    // Toggle dark mode and store the resulting state.
    const isDark = document.body.classList.toggle("dark-mode");

    if (isDark) {

      // Update the icon and accessibility label for dark mode.
      if (themeIcon) {
        themeIcon.textContent = "☾";
      }

      themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
      );

      // Save the selected theme for future visits.
      localStorage.setItem("theme", "dark");

    } else {

      // Update the icon and accessibility label for light mode.
      if (themeIcon) {
        themeIcon.textContent = "☀";
      }

      themeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
      );

      // Save the selected theme for future visits.
      localStorage.setItem("theme", "light");
    }
  });
}


/* =========================
   CERTIFICATE LIGHTBOX
========================= */

// Get the certificate grid and lightbox elements.
const certificateGrid = document.querySelector(".certificates-grid");
const lightbox = document.getElementById("certificateLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

// Initialize the lightbox only when all required elements exist.
if (
  certificateGrid &&
  lightbox &&
  lightboxImage &&
  lightboxClose
) {

  // Open a certificate when its image or VIEW button is clicked.
  certificateGrid.addEventListener("click", (event) => {

    // Check whether the click originated from a VIEW button or image.
    const viewButton = event.target.closest(".view-btn");
    const image = event.target.closest(".certificate-card img");

    // Ignore clicks outside certificate images and VIEW buttons.
    if (!viewButton && !image) return;

    // Get the certificate URL from the button or the clicked image.
    const certificateSrc = viewButton
      ? viewButton.dataset.certificate
      : image.src;

    // Stop if no certificate URL is available.
    if (!certificateSrc) return;

    // Display the selected certificate inside the lightbox.
    lightboxImage.src = certificateSrc;

    // Use the image's alternative text when available.
    lightboxImage.alt = image?.alt || "Certificate Preview";

    // Show the lightbox and prevent background scrolling.
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close the lightbox when the close button is clicked.
  lightboxClose.addEventListener("click", closeLightbox);

  // Close the lightbox when the user clicks its background.
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Close the lightbox when the Escape key is pressed.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      lightbox.classList.contains("active")
    ) {
      closeLightbox();
    }
  });

  // Hide the lightbox and restore normal page scrolling.
  function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }
}


/* =========================
   STACK & TOOLS PAGINATION
========================= */

// Use an isolated scope to keep pagination variables local.
(() => {

  // Get the skills grid and stop if it does not exist.
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  // Collect skill cards that belong to a numbered page.
  const cards = Array.from(
    grid.querySelectorAll(".skills-card[data-page]")
  );

  // Get the current-page label, total-pages label, and navigation buttons.
  const currentLabel = document.getElementById("skillsCurrent");
  const totalLabel = document.getElementById("skillsTotal");
  const prevButton = document.getElementById("skillsPrev");
  const nextButton = document.getElementById("skillsNext");

  // Stop if any required pagination control is missing.
  if (
    !currentLabel ||
    !totalLabel ||
    !prevButton ||
    !nextButton
  ) {
    return;
  }

  // Collect unique page numbers and sort them in ascending order.
  const pages = [...new Set(
    cards.map((card) => Number(card.dataset.page))
  )].sort((a, b) => a - b);

  // Stop if no valid page numbers were found.
  if (pages.length === 0) return;

  // Track the index of the currently displayed page.
  let currentIndex = 0;

  // Display the total number of pages using two digits.
  totalLabel.textContent = String(pages.length).padStart(2, "0");

  // Display the requested page and update the navigation controls.
  function showPage(index) {

    // Keep the page index within the valid range.
    currentIndex = Math.max(
      0,
      Math.min(index, pages.length - 1)
    );

    // Get the actual page number associated with this index.
    const activePage = pages[currentIndex];

    // Show cards belonging to the active page and hide the others.
    cards.forEach((card) => {
      card.hidden = Number(card.dataset.page) !== activePage;
    });

    // Update the current-page label using two digits.
    currentLabel.textContent = String(currentIndex + 1).padStart(2, "0");

    // Disable navigation buttons when the first or last page is reached.
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === pages.length - 1;
  }

  // Navigate to the previous page.
  prevButton.addEventListener("click", () => {
    showPage(currentIndex - 1);
  });

  // Navigate to the next page.
  nextButton.addEventListener("click", () => {
    showPage(currentIndex + 1);
  });

  // Display the first page when the pagination initializes.
  showPage(0);

})();


/* =========================
   CERTIFICATES CAROUSEL ARROWS
========================= */

// Get the certificate track and its previous/next buttons.
const certificatesTrack = document.querySelector(".certificates-grid");
const certificatePrev = document.getElementById("certificatesPrev");
const certificateNext = document.getElementById("certificatesNext");

// Enable carousel navigation only when all required elements exist.
if (
  certificatesTrack &&
  certificatePrev &&
  certificateNext
) {

  // Scroll forward by one visible grid width.
  certificateNext.addEventListener("click", () => {
    certificatesTrack.scrollBy({
      left: certificatesTrack.clientWidth,
      behavior: "smooth"
    });
  });

  // Scroll backward by one visible grid width.
  certificatePrev.addEventListener("click", () => {
    certificatesTrack.scrollBy({
      left: -certificatesTrack.clientWidth,
      behavior: "smooth"
    });
  });
}


/* =========================
   PRELOADER ANIMATION
========================= */

// Use an isolated scope for the preloader animation.
(() => {

  // Get the preloader and its progress elements.
  const preloader = document.getElementById("preloader");
  const percentage = document.getElementById("loader-percentage");
  const progressBar = document.getElementById("loader-progress-bar");
  const statusText = document.getElementById("loader-status-text");

  // Stop if the essential preloader elements are missing.
  if (!preloader || !percentage || !progressBar) return;

  // Initialize the loading percentage and completion state.
  let progress = 0;
  let finished = false;

  // Update the loading progress at regular intervals.
  const interval = setInterval(() => {

    // Increase progress by a random value between 1 and 4.
    progress += Math.floor(Math.random() * 4) + 1;

    // Cap progress at 100% and mark the animation as complete.
    if (progress >= 100) {
      progress = 100;
      finished = true;
    }

    // Update the displayed percentage and progress bar width.
    percentage.textContent = progress;
    progressBar.style.width = `${progress}%`;

    // Update the status message according to the current progress.
    if (statusText) {
      statusText.textContent =
        progress < 35 ? "Loading assets" :
        progress < 70 ? "Preparing experience" :
        progress < 100 ? "Almost ready" :
        "Welcome";
    }

    // Stop updating progress once loading is complete.
    if (finished) {
      clearInterval(interval);

      // Allow a short pause before hiding the preloader.
      setTimeout(() => {

        // Add the CSS class responsible for hiding the preloader.
        preloader.classList.add("loader-hidden");

        // Remove the preloader from the DOM after its hide animation.
        setTimeout(() => {
          preloader.remove();
        }, 900);

      }, 350);
    }

  }, 45);

})();


/* =========================
   PROJECTS FILTER & CAROUSEL
========================= */

(() => {

  // Get the projects grid, filter buttons, and carousel navigation buttons.
  const grid = document.querySelector(".projects-grid");
  const filterButtons = document.querySelectorAll(".project-filter-btn");
  const prevButton = document.getElementById("projectsPrev");
  const nextButton = document.getElementById("projectsNext");

  // Stop initialization if any required element is missing.
  if (!grid || !prevButton || !nextButton || !filterButtons.length) {
    return;
  }

  // Store all project cards so they can be filtered and paginated.
  const allCards = Array.from(grid.querySelectorAll(".project-card"));

  // Track the selected category, current page, and filtered cards.
  let activeFilter = "all";
  let currentPage = 0;
  let visibleCards = [];

  // Display one card on mobile and two cards on larger screens.
  function cardsPerPage() {
    return window.matchMedia("(max-width: 700px)").matches ? 1 : 2;
  }

  // Filter the projects and render the cards for the current page.
  function renderProjects() {

    // Select cards that match the active category.
    visibleCards = allCards.filter((card) => {
      return activeFilter === "all" ||
        card.dataset.category === activeFilter;
    });

    // Calculate how many pages are needed for the filtered cards.
    const perPage = cardsPerPage();
    const totalPages = Math.ceil(visibleCards.length / perPage);

    // Keep the current page valid, including when no cards match.
    currentPage = totalPages > 0
      ? Math.max(0, Math.min(currentPage, totalPages - 1))
      : 0;

    // Hide all cards and reset their reveal animation state.
    allCards.forEach((card) => {
      card.hidden = true;
      card.classList.remove("is-visible");
    });

    // Identify the cards that belong to the current page.
    const start = currentPage * perPage;
    const pageCards = visibleCards.slice(start, start + perPage);

    // Display the current page's cards.
    pageCards.forEach((card) => {
      card.hidden = false;

      // Add the visibility class on the next animation frame.
      requestAnimationFrame(() => {
        card.classList.add("is-visible");
      });
    });

    // Keep both buttons enabled to preserve the existing cursor behavior.
    prevButton.disabled = false;
    nextButton.disabled = false;

    // Hide the navigation arrows when there is only one page or no results.
    const showArrows = totalPages > 1;

    prevButton.style.visibility = showArrows ? "visible" : "hidden";
    nextButton.style.visibility = showArrows ? "visible" : "hidden";
  }

  // Set up category filtering.
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

      // Read the selected category and return to the first page.
      activeFilter = button.dataset.filter || "all";
      currentPage = 0;

      // Update the active state and accessibility attributes.
      filterButtons.forEach((btn) => {
        const isActive = btn === button;

        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      // Refresh the displayed projects.
      renderProjects();
    });
  });

  // Navigate to the previous page when one is available.
  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      renderProjects();
    }
  });

  // Navigate to the next page when one is available.
  nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(
      visibleCards.length / cardsPerPage()
    );

    if (currentPage < totalPages - 1) {
      currentPage++;
      renderProjects();
    }
  });

  // Re-render the carousel when the viewport size changes.
  window.addEventListener("resize", renderProjects);

  // Render the initial project list.
  renderProjects();

})();


/* =========================
   CUSTOM CURSOR
========================= */

(() => {
  // Enable the custom cursor only on devices with a precise hover pointer.
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  // Remove previously created cursor elements to prevent duplicates.
  document.querySelectorAll(".custom-cursor, .custom-cursor-ring")
    .forEach((element) => element.remove());

  // Create the cursor dot and surrounding ring.
  const dot = document.createElement("div");
  dot.className = "custom-cursor";

  const ring = document.createElement("div");
  ring.className = "custom-cursor-ring";

  // Style the cursor dot.
  Object.assign(dot.style, {
    position: "fixed",
    width: "6px",
    height: "6px",
    background: "#4f8cff",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: "1000000",
    transform: "translate(-50%, -50%)",
    display: "block",
    opacity: "0"
  });

  // Style the outer ring.
  Object.assign(ring.style, {
    position: "fixed",
    width: "36px",
    height: "36px",
    border: "1.5px solid rgba(79, 140, 255, 0.85)",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: "999999",
    transform: "translate(-50%, -50%)",
    display: "block",
    opacity: "0"
  });

  // Add both cursor elements to the page.
  document.body.append(dot, ring);

  // Hide the native cursor.
  document.documentElement.style.setProperty("cursor", "none", "important");
  document.body.style.setProperty("cursor", "none", "important");

  // Track the mouse and show both cursor elements.
  document.addEventListener("mousemove", (event) => {
    const x = `${event.clientX}px`;
    const y = `${event.clientY}px`;

    dot.style.left = x;
    dot.style.top = y;

    ring.style.left = x;
    ring.style.top = y;

    // Restore visibility whenever the mouse moves.
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });

  // Hide the custom cursor when the mouse leaves the page.
  document.documentElement.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  // Restore the cursor when the mouse returns to the page.
  document.documentElement.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });

})();
