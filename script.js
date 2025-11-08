// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

// Navbar scroll effect
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 8px 32px rgba(102, 126, 234, 0.15)";
    navbar.style.backdropFilter = "blur(20px) saturate(180%)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.9)";
    navbar.style.boxShadow = "0 8px 32px rgba(102, 126, 234, 0.1)";
    navbar.style.backdropFilter = "blur(20px) saturate(180%)";
  }

  lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}

// Scroll progress indicator
const scrollProgress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + "%";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections and animated elements
document
  .querySelectorAll(
    "section, .menu-item, .about-content, .gallery-item, .info-item, .feature-item"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Custom cursor effect
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

if (window.innerWidth > 768) {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    }
  });

  // Smooth follower animation
  function animateFollower() {
    if (cursorFollower) {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      cursorFollower.style.left = followerX + "px";
      cursorFollower.style.top = followerY + "px";
    }
    requestAnimationFrame(animateFollower);
  }

  animateFollower();

  // Cursor hover effects
  const interactiveElements = document.querySelectorAll(
    "a, button, .menu-item, .gallery-item, .info-item, input, textarea, select"
  );

  interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (cursor) {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.borderColor = "#f093fb";
    }
  });

  el.addEventListener("mouseleave", () => {
    if (cursor) {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.borderColor = "#667eea";
    }
  });
  });
}

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Initialize counter animation when stats section is visible
const statNumbers = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute("data-target"));
        animateCounter(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((stat) => {
  statsObserver.observe(stat);
});

// Menu filter functionality
const tabButtons = document.querySelectorAll(".tab-btn");
const menuItems = document.querySelectorAll(".menu-item");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const category = button.getAttribute("data-category");

    menuItems.forEach((item) => {
      if (
        category === "all" ||
        item.getAttribute("data-category") === category
      ) {
        item.style.display = "block";
        item.style.animation = "fadeInUp 0.6s ease forwards";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Form submission
const reservationForm = document.querySelector(".reservation-form");
if (reservationForm) {
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = reservationForm.querySelector(".submit-btn");
    const originalText = submitBtn.querySelector("span").textContent;

    submitBtn.querySelector("span").textContent = "Reserving...";
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      submitBtn.querySelector("span").textContent = "Reservation Confirmed! ✓";
      submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";

      setTimeout(() => {
        submitBtn.querySelector("span").textContent = originalText;
        submitBtn.style.background =
          "linear-gradient(135deg, var(--primary-color), var(--accent-color))";
        submitBtn.disabled = false;
        reservationForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Reserve button in navbar
const reserveBtn = document.querySelector(".reserve-btn");
if (reserveBtn) {
  reserveBtn.addEventListener("click", () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// Button click ripple effect
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple CSS dynamically
const style = document.createElement("style");
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero && scrolled < window.innerHeight) {
    const heroContent = hero.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - scrolled / 800;
    }
  }
});

// Gallery lightbox effect (simple version)
const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Add a simple zoom effect
    item.style.transform = "scale(1.1)";
    setTimeout(() => {
      item.style.transform = "scale(1)";
    }, 300);
  });
});

// Menu item hover effect enhancement
menuItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-10px) scale(1.02)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)";
  });
});

// Add animation delay to menu items on load
window.addEventListener("load", () => {
  menuItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});

// Smooth reveal animation for sections
const sections = document.querySelectorAll("section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Add floating animation to hero buttons
const heroButtons = document.querySelectorAll(".hero-btns button");
heroButtons.forEach((btn, index) => {
  btn.style.animationDelay = `${0.8 + index * 0.1}s`;
});

// View Menu button scroll
const viewMenuBtn = document.querySelector(".btn-primary");
if (viewMenuBtn && viewMenuBtn.textContent.includes("Menu")) {
  viewMenuBtn.addEventListener("click", () => {
    const menuSection = document.querySelector("#menu");
    if (menuSection) {
      menuSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// Book Table button scroll
const bookTableBtn = document.querySelector(".btn-secondary");
if (bookTableBtn && bookTableBtn.textContent.includes("Table")) {
  bookTableBtn.addEventListener("click", () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// Add stagger animation to gallery items
const galleryObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "scale(1)";
        }, index * 100);
        galleryObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

galleryItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "scale(0.8)";
  item.style.transition = "all 0.5s ease";
  galleryObserver.observe(item);
});

// Console welcome message
console.log(
  "%c🍽️ Welcome to Bella Vista Restaurant! 🍽️",
  "color: #d4a574; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cExperience fine dining with our animated website",
  "color: #c97d60; font-size: 14px;"
);

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Enhanced form validation
const formInputs = document.querySelectorAll(
  ".reservation-form input, .reservation-form select, .reservation-form textarea"
);

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentElement.classList.remove("focused");
    }
  });
});

// Add date restrictions (today and future dates only)
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}
