/*
  Behaviour for the Linbey website.

  This script updates the year in the footer, animates elements into view
  as the user scrolls, toggles a class on the navigation bar when the page
  scrolls, and applies a subtle parallax effect to the hero section’s
  background.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Set the current year in the footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // IntersectionObserver to reveal elements when they enter the viewport
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

  // Navigation bar style toggle based on scroll position
  const nav = document.querySelector('.navbar');
  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // Parallax effect for hero background
  const heroSection = document.querySelector('.hero');
  function handleHeroParallax() {
    const scrollY = window.scrollY;
    // Move the background at half the scroll speed to create depth
    heroSection.style.backgroundPositionY = `${scrollY * 0.5}px`;
  }
  window.addEventListener('scroll', handleHeroParallax);
});