document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.querySelector(".site-header");
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");
  const scrollIndicator = document.querySelector("[data-scroll-indicator]");

  function updateNavbar() {
    const isScrolled = window.scrollY > 60;
    siteHeader?.classList.toggle("scrolled", isScrolled);
    navbar?.classList.toggle("scrolled", isScrolled);

    if (scrollIndicator) {
      scrollIndicator.classList.toggle("hidden", window.scrollY > 100);
      scrollIndicator.style.opacity = window.scrollY > 100 ? "0" : "1";
    }
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  menuToggle?.addEventListener("click", function () {
    const isOpen = navLinks?.classList.toggle("open");
    menuToggle.classList.toggle("open", Boolean(isOpen));
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks?.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation menu");
    });
  });

  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.id = "cursor-dot";
  ring.id = "cursor-ring";
  document.body.append(dot, ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  }, { passive: true });

  function lerpCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(lerpCursor);
  }

  lerpCursor();

  document.querySelectorAll("a, button, .card, .member-card, .service-card, .event-card, .timeline-card, .story-card, .stat-card").forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      ring.classList.add("hovered");
      dot.classList.add("hovered");
    });
    el.addEventListener("mouseleave", function () {
      ring.classList.remove("hovered");
      dot.classList.remove("hovered");
    });
  });

  document.addEventListener("mousedown", function () {
    dot.classList.add("clicked");
  });
  document.addEventListener("mouseup", function () {
    dot.classList.remove("clicked");
  });

  function splitAndAnimate(el) {
    if (!el) {
      return;
    }

    const lines = el.querySelectorAll(".line");
    const targets = lines.length > 0 ? Array.from(lines) : [el];
    let charIndex = 0;

    targets.forEach(function (lineEl) {
      const text = lineEl.textContent;
      lineEl.textContent = "";

      Array.from(text).forEach(function (char) {
        const span = document.createElement("span");
        span.className = "char";
        span.style.cssText = [
          "display: inline-block",
          "opacity: 0",
          "transform: translateY(50px) rotate(6deg)",
          "transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1) " + (charIndex * 0.035) + "s, transform 0.7s cubic-bezier(0.16,1,0.3,1) " + (charIndex * 0.035) + "s"
        ].join("; ");
        span.textContent = char === " " ? "\u00A0" : char;
        lineEl.appendChild(span);
        charIndex += 1;
      });
    });

    el.style.visibility = "visible";
    el.classList.add("clip-visible");

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.querySelectorAll(".char").forEach(function (span) {
          span.style.opacity = "1";
        span.style.transform = "translateY(0) rotate(0deg)";
        });
      });
    });

    setTimeout(function () {
      el.querySelectorAll(".char").forEach(function (span) {
        if (window.getComputedStyle(span).opacity === "0") {
          span.style.opacity = "1";
          span.style.transform = "translateY(0) rotate(0deg)";
        }
      });
    }, 2000);
  }

  document.querySelectorAll(".hero-title, .page-hero h1").forEach(splitAndAnimate);

  const clipTargets = document.querySelectorAll(".hero-title, .page-hero h1, .section-heading h2, .cta-section h2, .section-label");
  clipTargets.forEach(function (el) {
    el.classList.add("clip-reveal");
  });

  if ("IntersectionObserver" in window) {
    const clipObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("clip-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    clipTargets.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("clip-visible");
      } else {
        clipObserver.observe(el);
      }
    });
  } else {
    clipTargets.forEach(function (el) {
      el.classList.add("clip-visible");
    });
  }

  const fadeEls = document.querySelectorAll(".animate");
  const fadeObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        const el = entry.target;
        const delay = Number(el.dataset.delay || 0);
        setTimeout(function () {
          el.classList.add("visible", "fade-in-up");
        }, delay * 1000);
        observer.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" })
    : null;

  fadeEls.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible", "fade-in-up");
    } else if (fadeObserver) {
      fadeObserver.observe(el);
    } else {
      el.classList.add("visible", "fade-in-up");
    }
  });

  const sectionRevealEls = document.querySelectorAll(".reveal-section");
  const sectionRevealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" })
    : null;

  sectionRevealEls.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
    } else if (sectionRevealObserver) {
      sectionRevealObserver.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  });

  setTimeout(function () {
    document.querySelectorAll(".animate, .char").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = el.classList.contains("char") ? "translateY(0) rotate(0deg)" : "translateY(0)";
      el.classList.add("visible");
    });
    document.querySelectorAll(".clip-reveal").forEach(function (el) {
      el.style.clipPath = "inset(0 0 0% 0)";
      el.classList.add("clip-visible");
    });
  }, 2500);

  const magneticButtons = Array.from(document.querySelectorAll(".button, .btn, .cta-btn, button"));

  magneticButtons.forEach(function (btn) {
    if (!btn.querySelector(".button-label") && btn.classList.contains("button")) {
      const label = document.createElement("span");
      label.className = "button-label";
      label.innerHTML = btn.innerHTML;
      btn.replaceChildren(label);
    }
  });

  function resetMagneticButton(btn) {
    const inner = btn.querySelector(".button-label") || btn.querySelector("span");
    btn.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
    btn.style.transform = "translate(0, 0)";

    if (inner && inner !== btn) {
      inner.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
      inner.style.transform = "translate(0, 0)";
    }
  }

  document.addEventListener("mousemove", function (event) {
    magneticButtons.forEach(function (btn) {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const inner = btn.querySelector(".button-label") || btn.querySelector("span");

      if (distance <= 80) {
        btn.style.transition = "transform 0.08s ease-out";
        btn.style.transform = "translate(" + (x * 0.3) + "px, " + (y * 0.3) + "px)";

        if (inner && inner !== btn) {
          inner.style.transition = "transform 0.08s ease-out";
          inner.style.transform = "translate(" + (x * 0.12) + "px, " + (y * 0.12) + "px)";
        }
      } else if (btn.style.transform && btn.style.transform !== "translate(0px, 0px)") {
        resetMagneticButton(btn);
      }
    });
  }, { passive: true });

  document.querySelectorAll(".hero, .page-hero").forEach(function (hero) {
    const circles = hero.querySelectorAll(".hero-circle");
    const underline = hero.querySelector(".hero-underline");
    let lerpX = 0;
    let lerpY = 0;
    let targetX = 0;
    let targetY = 0;

    hero.addEventListener("mousemove", function (event) {
      const rect = hero.getBoundingClientRect();
      targetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
      targetY = (event.clientY - rect.top - rect.height / 2) / rect.height;
    }, { passive: true });

    hero.addEventListener("mouseleave", function () {
      targetX = 0;
      targetY = 0;
    });

    function parallaxLoop() {
      lerpX += (targetX - lerpX) * 0.05;
      lerpY += (targetY - lerpY) * 0.05;
      circles.forEach(function (circle, index) {
        const factor = index === 0 ? -25 : index === 1 ? 18 : 8;
        circle.style.transform = "translate(" + (lerpX * factor) + "px, " + (lerpY * factor) + "px)";
      });

      if (underline) {
        underline.style.setProperty("--underline-shift", (lerpX * 16) + "px");
      }

      requestAnimationFrame(parallaxLoop);
    }

    parallaxLoop();
  });

  document.querySelectorAll(".member-grid").forEach(function (grid) {
    if (grid.querySelectorAll(".member-card").length === 2) {
      grid.classList.add("two-card-grid");
    }
  });

  document.querySelectorAll(".member-card").forEach(function (card) {
    card.style.transformStyle = "preserve-3d";
    card.style.transition = "transform 0.1s ease";

    card.addEventListener("mousemove", function (event) {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      card.style.transform = "perspective(800px) rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 8) + "deg) scale(1.02)";
    });

    card.addEventListener("mouseenter", function () {
      card.style.transition = "transform 0.1s ease";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  document.querySelectorAll(".service-card, .event-card, .stat-card").forEach(function (card) {
    card.style.transformStyle = "preserve-3d";

    card.addEventListener("mousemove", function (event) {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      card.style.transition = "transform 0.08s ease-out, box-shadow 0.2s ease";
      card.style.transform = "perspective(900px) rotateY(" + (x * 5) + "deg) rotateX(" + (-y * 5) + "deg) translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transition = "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease";
      card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  const statNumbers = document.querySelectorAll(".count-up, .stat-number");
  if (statNumbers.length > 0 && "IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.target.dataset.counted === "true") {
          return;
        }

        const el = entry.target;
        const target = parseInt(el.dataset.target || el.textContent.replace(/\D/g, ""), 10);
        const suffix = el.dataset.suffix || (el.textContent.includes("+") ? "+" : el.textContent.includes("%") ? "%" : "");
        const duration = 2000;
        const start = performance.now();
        el.dataset.counted = "true";

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
            spawnParticles(el);
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      countObserver.observe(el);
    });
  } else {
    statNumbers.forEach(function (el) {
      el.textContent = (el.dataset.target || el.textContent.replace(/\D/g, "")) + (el.dataset.suffix || "");
    });
  }

  function spawnParticles(el) {
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < 8; i += 1) {
      const particle = document.createElement("div");
      const angle = (i / 8) * Math.PI * 2;
      const distance = 40 + Math.random() * 30;
      particle.style.cssText = [
        "position: fixed",
        "width: 6px",
        "height: 6px",
        "border-radius: 50%",
        "background: #FFC627",
        "pointer-events: none",
        "z-index: 9999",
        "left: " + (rect.left + rect.width / 2) + "px",
        "top: " + (rect.top + rect.height / 2) + "px",
        "transition: transform 0.8s ease-out, opacity 0.8s ease-out",
        "opacity: 1"
      ].join("; ");
      document.body.appendChild(particle);

      requestAnimationFrame(function () {
        particle.style.transform = "translate(" + (Math.cos(angle) * distance) + "px, " + (Math.sin(angle) * distance) + "px) scale(0)";
        particle.style.opacity = "0";
      });

      setTimeout(function () {
        particle.remove();
      }, 900);
    }
  }

  const overlay = document.createElement("div");
  overlay.id = "page-overlay";
  overlay.style.cssText = [
    "position: fixed",
    "inset: 0",
    "background: #8C1D40",
    "z-index: 99999",
    "transform: translateY(100%)",
    "transition: transform 0.4s cubic-bezier(0.16,1,0.3,1)",
    "pointer-events: none"
  ].join("; ");
  document.body.appendChild(overlay);

  if (sessionStorage.getItem("gcn-page-transition") === "active") {
    sessionStorage.removeItem("gcn-page-transition");
    overlay.style.transform = "translateY(0)";
    requestAnimationFrame(function () {
      overlay.style.transform = "translateY(-100%)";
    });
  }

  document.querySelectorAll("a[href]").forEach(function (link) {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || link.target === "_blank") {
      return;
    }

    link.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();
      overlay.style.transition = "none";
      overlay.style.transform = "translateY(100%)";
      overlay.offsetHeight;
      overlay.style.transition = "transform 0.4s cubic-bezier(0.7,0,0.3,1)";
      overlay.style.transform = "translateY(0)";
      sessionStorage.setItem("gcn-page-transition", "active");
      setTimeout(function () {
        window.location.href = href;
      }, 420);
    });
  });
});
