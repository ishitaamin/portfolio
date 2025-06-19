

// STAR ANIMATION

function createStars(canvasId, count) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    let stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
      });
    }
  
    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.beginPath();
      stars.forEach(star => {
        ctx.moveTo(star.x, star.y);
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      });
      ctx.fill();
    }
  
    function animateStars() {
      drawStars();
      requestAnimationFrame(animateStars);
    }
  
    animateStars();
  
    // Mouse parallax
    document.addEventListener("mousemove", (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.06;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.06;
      canvas.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById('glassToggle');
    const navLinks = document.getElementById('glassNavLinks');
    const linkItems = navLinks.querySelectorAll("a");

    toggleBtn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('active');
    });

    linkItems.forEach(link => {
      link.addEventListener('click', () => {
        linkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navLinks.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  });




  gsap.registerPlugin(ScrollTrigger);
  // GSAP INTRO ANIMATION
  gsap.to(".intro-text h1", {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.5
  });
  gsap.to(".intro-text p", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 1
  });
  
  // INTRO TO HERO TRANSITION
  setTimeout(() => {
    gsap.to("#intro", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        document.getElementById("intro").style.display = "none";
        document.getElementById("hero").style.display = "block";
  
        // ✅ Enable scrolling
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      }
    });
  }, 3000);
  
  // Start stars
  createStars("intro-stars", 120);
  createStars("hero-stars", 150);
  
  // Typed text animation
  const text = "Passionate Web & Software Developer currently pursuing my B.Tech in Computer Science from Navrachana University. With hands-on experience in frontend and backend technologies through internships and personal projects.";
  const typedText = document.getElementById("typed-text");
  
  let index = 0;
  let interrupted = false;
  
  function typeText() {
    if (interrupted) return;
    if (index < text.length) {
      typedText.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 100); // speed up if needed
    }
  }
  
  window.addEventListener("load", () => {
    setTimeout(typeText, 500);
  });
  
  // Scroll => show full text
  window.addEventListener("scroll", () => {
    if (!interrupted && index < text.length) {
      interrupted = true;
      typedText.textContent = text;
    }
  });
  
  // Scroll animation for image
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.from("#hero-image", {
    x: -200,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    delay: 1.5
  });
  
  gsap.to("#hero-image", {
    x: -400,
    opacity: 0.3,
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  
  gsap.fromTo(".left-row .skill-icon",
    { x: -200, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 80%",
        end: "top 50%",
        scrub: true,
      }
    }
  );

  gsap.to(".left-row .skill-icon", {
    x: 200,
    opacity: 0.3,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".skills-section",
      start: "top 50%",
      end: "bottom top",
      scrub: true,
    }
  });


//   skilllls 
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
          el.classList.add('active');
          el.classList.remove('exit');
        } else {
          el.classList.remove('active');
          el.classList.add('exit');
        }
      });
    },
    { threshold: 0.3 }
  );

  const animatedRows = document.querySelectorAll('.slide-in-left, .slide-in-right');
  animatedRows.forEach(el => observer.observe(el));


//   work


gsap.registerPlugin(ScrollTrigger);

// Animate each project card
document.querySelectorAll(".project-card").forEach((card, i) => {
  gsap.from(card.querySelector(".project-content"), {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      end: "bottom center",
      toggleActions: "play none none reverse",
    }
  });

  gsap.from(card.querySelector(".image img"), {
    scale: 1.1,
    opacity: 0.4,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    }
  });
});





// resume

// Scroll-triggered animation
const observe = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.3 });
  
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
  

// contact

(function () {
  emailjs.init("t3mIWiOywd_eciofi"); // Replace with your actual public key
})();

const form = document.getElementById("contact-form");
const msg = document.getElementById("form-msg");
const loader = document.getElementById("form-loader");
const toast = document.getElementById("toast-msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Show loader
  loader.style.display = "block";

  // Hide previous messages
  msg.style.display = "none";
  toast.style.display = "none";

  emailjs
    .sendForm("service_1jnopo5", "template_be2fhrb", form)
    .then(() => {
      loader.style.display = "none";

      // Show toast message
      showToast("✅ Message sent successfully!", "#8b5cf6");

      // Reset form
      form.reset();
    })
    .catch(() => {
      loader.style.display = "none";

      // Show toast message
      showToast("❌ Failed to send. Please try again later.", "red");
    });
});

function showToast(message, color) {
  toast.textContent = message;
  toast.style.backgroundColor = color;
  toast.style.display = "block";

  // Hide toast after 5 seconds
  setTimeout(() => {
    toast.style.display = "none";
  }, 5000);
}



