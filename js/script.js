// Dark theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Checking if user has a saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  icon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  if (body.classList.contains("dark-theme")) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Navbar highlight on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Scroll reveal animations
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.5 };
const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => appearOnScroll.observe(fader));

// For smooth scrol; during navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll(".skill-progress");

const animateSkills = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute("data-width");
        const skillValue = bar.querySelector(".skill-value");

        let counter = 0;
        const updateValue = setInterval(() => {
          if (counter >= targetWidth) {
            clearInterval(updateValue);
          } else {
            counter++;
            skillValue.textContent = counter + "%";
          }
        }, 15); // Adjust speed if needed

        bar.style.width = targetWidth + "%"; // Animate width
        observer.unobserve(bar); // Stop observing after animation
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => animateSkills.observe(bar));
