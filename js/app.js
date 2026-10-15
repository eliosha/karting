"use strict";
const karts = [
  ["P1", "Pro-Racer Karts", "Premier single racer · 390cc Honda engine", 1],
  ["P2", "Cadets", "Junior & beginner single racer · tuned agility", 1],
  ["P3", "Individual & Marshall", "Two-seater paired run · instructor assist", 1],
  ["P4", "Self Driven Tandem", "Two-seater dual racer · shared thrill", 2],
];
const money = (n) => "UGX " + n.toLocaleString("en-UG");
function renderRates(day) {
  const weekend = day === "weekend";
  document.querySelector("#rate-rows").replaceChildren(
    ...karts.map(([pos, name, description, multiplier]) => {
      const tr = document.createElement("tr");
      const label = document.createElement("th");
      label.scope = "row";
      label.innerHTML = `
        <div class="timing-col">
          <span class="timing-badge">${pos}</span>
          <div class="timing-meta">
            <strong>${name}</strong>
            <small>${description}</small>
          </div>
        </div>
      `;
      tr.append(label);
      for (const amount of weekend ? [65000, 100000] : [50000, 75000]) {
        const td = document.createElement("td");
        td.className = "timing-data";
        td.innerHTML = `<span class="timing-val">${money(amount * multiplier)}</span>`;
        tr.append(td);
      }
      const action = document.createElement("td");
      const link = document.createElement("a");
      link.className = "timing-pit-btn";
      link.href = "tel:+256763170060";
      link.textContent = "Book Pit →";
      link.setAttribute("aria-label", `Call to book ${name}`);
      action.append(link);
      tr.append(action);
      return tr;
    }),
  );
  document.querySelector("#day-description").textContent =
    `Showing ${weekend ? "Friday–Sunday & public holiday" : "Tuesday–Thursday"} prices.`;
  document
    .querySelectorAll("[data-day]")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.day === day)),
    );
}
document
  .querySelectorAll("[data-day]")
  .forEach((b) =>
    b.addEventListener("click", () => renderRates(b.dataset.day)),
  );
renderRates("weekday");
const groups = [
  [
    "Race Buddies",
    295000,
    "for 2 people",
    "Perfect for duos",
    [
      "15-minute karting session",
      "1 Gaming Coupon each",
      "Platter for sharing",
      "Bottle of gin or wine",
    ],
  ],
  [
    "Speedster’s Special",
    120000,
    "per person",
    "Minimum 6 people",
    [
      "15-minute karting session",
      "Glass of juice",
      "2 Gaming Coupons",
      "Plate of food",
    ],
  ],
  [
    "Racer’s Thrill",
    140000,
    "per person",
    "Minimum 6 people",
    [
      "30-minute karting session",
      "Glass of juice",
      "1 Gaming Coupon",
      "Plate of food",
    ],
  ],
  [
    "Fast & Festive",
    155000,
    "per person",
    "Minimum 8 people",
    [
      "30-minute karting session",
      "Glass of juice",
      "1 Gaming Coupon",
      "Plate of food",
      "F1-Themed Cake",
    ],
  ],
  [
    "Team Vibes",
    170000,
    "per person",
    "Minimum 10 people",
    [
      "30-minute karting session",
      "Glass of juice",
      "1 Gaming Coupon",
      "Plate of food",
      "F1-Themed Cake",
      "Custom Group T-Shirts",
    ],
  ],
  [
    "Grand Prix Challenge",
    195000,
    "per person",
    "Minimum 6 people",
    [
      "Grand Prix (3 intense races)",
      "Gaming Coupon",
      "Plate of food",
      "2 Soft Drinks",
    ],
  ],
  [
    "Grand Prix Pro",
    235000,
    "per person",
    "Minimum 10 people",
    [
      "Grand Prix (3 intense races)",
      "Gaming Coupon",
      "Plate of food",
      "2 Soft Drinks",
      "Personalized T-Shirt",
      "F1 theme Cake",
      "Professional Photography Session",
    ],
  ],
];
document.querySelector("#group-packages").replaceChildren(
  ...groups.map(([name, price, basis, min, items], i) => {
    const detail = document.createElement("details");
    if (i === 0) detail.open = true;
    const summary = document.createElement("summary");
    summary.innerHTML = `<span class="package-name">${name}<small>${min}</small></span><span class="package-price">${money(price)}<small>${basis}</small></span><span class="plus" aria-hidden="true">+</span>`;
    const list = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.append(li);
    });
    const link = document.createElement("a");
    link.className = "package-link";
    link.href = "tel:+256763170060";
    link.textContent = `Enquire about ${name} →`;
    detail.append(summary, list, link);
    return detail;
  }),
);
const menu = document.querySelector(".menu-toggle"),
  navigation = document.querySelector("#navigation"),
  siteHeader = document.querySelector(".site-header");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}
menu.addEventListener("click", () => {
  const expanded = menu.getAttribute("aria-expanded") === "true";
  siteHeader.classList.remove("nav-hidden");
  menu.setAttribute("aria-expanded", String(!expanded));
  navigation.classList.toggle("open", !expanded);
});
navigation
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});

const groupVideo = document.querySelector("[data-group-video]");
const videoToggle = document.querySelector("[data-video-toggle]");
const ambientCanvas = document.querySelector("[data-video-ambient]");
const ambientContext = ambientCanvas ? ambientCanvas.getContext("2d", { alpha: false, willReadFrequently: false }) : null;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let videoVisible = false;
let videoUserPaused = false;
let ambientAnimId;
let lastAmbientTime = 0;

function paintAmbientFrame(now) {
  if (!ambientCanvas || !ambientContext || !videoVisible || groupVideo.paused || reducedMotion.matches) {
    ambientAnimId = undefined;
    return;
  }

  if (now - lastAmbientTime >= 160) {
    if (groupVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      ambientContext.drawImage(groupVideo, 0, 0, ambientCanvas.width, ambientCanvas.height);
    }
    lastAmbientTime = now;
  }

  ambientAnimId = window.requestAnimationFrame(paintAmbientFrame);
}

function startAmbientEffect() {
  if (!ambientAnimId && ambientCanvas && videoVisible && !groupVideo.paused && !reducedMotion.matches) {
    lastAmbientTime = 0;
    ambientAnimId = window.requestAnimationFrame(paintAmbientFrame);
  }
}

function stopAmbientEffect() {
  if (ambientAnimId) {
    window.cancelAnimationFrame(ambientAnimId);
    ambientAnimId = undefined;
  }
}

function updateVideoControl() {
  if (!videoToggle || !groupVideo) return;
  const paused = groupVideo.paused;
  videoToggle.textContent = paused ? "Play video" : "Pause video";
  videoToggle.setAttribute(
    "aria-label",
    paused ? "Play background video" : "Pause background video",
  );
}

function applyMotionPreference() {
  if (!groupVideo) return;
  if (reducedMotion.matches) {
    groupVideo.pause();
    groupVideo.removeAttribute("autoplay");
    stopAmbientEffect();
  } else if (videoVisible && !videoUserPaused) {
    groupVideo.play().then(startAmbientEffect).catch(updateVideoControl);
  } else {
    groupVideo.pause();
    stopAmbientEffect();
  }
  updateVideoControl();
}

if (videoToggle && groupVideo) {
  videoToggle.addEventListener("click", () => {
    if (groupVideo.paused) {
      videoUserPaused = false;
      groupVideo.play().then(startAmbientEffect).catch(updateVideoControl);
    } else {
      videoUserPaused = true;
      groupVideo.pause();
      stopAmbientEffect();
    }
  });

  groupVideo.addEventListener("play", () => {
    updateVideoControl();
    startAmbientEffect();
  });
  groupVideo.addEventListener("pause", () => {
    updateVideoControl();
    stopAmbientEffect();
  });
  reducedMotion.addEventListener("change", applyMotionPreference);

  new IntersectionObserver(
    ([entry]) => {
      videoVisible = entry.isIntersecting;
      if (videoVisible) {
        if (!reducedMotion.matches && !videoUserPaused) {
          groupVideo.play().then(startAmbientEffect).catch(updateVideoControl);
        }
      } else {
        groupVideo.pause();
        stopAmbientEffect();
      }
    },
    { rootMargin: "120px 0px", threshold: 0.05 },
  ).observe(groupVideo);

  applyMotionPreference();
}

const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
let previousScrollY = window.scrollY;
let scrollFrame;

function updateActiveNavigation() {
  const marker = window.innerHeight * 0.36;
  let activeId = "";

  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    if (bounds.top <= marker && bounds.bottom > marker) activeId = link.hash;
  });

  navLinks.forEach((link) => {
    if (link.hash === activeId) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateSmartNavigation() {
  const currentScrollY = window.scrollY;
  const scrollRange =
    document.documentElement.scrollHeight - window.innerHeight || 1;
  const progress = Math.min(1, currentScrollY / scrollRange);
  const menuOpen = menu.getAttribute("aria-expanded") === "true";

  siteHeader.classList.toggle("nav-scrolled", currentScrollY > 48);
  siteHeader.style.setProperty("--scroll-progress", progress.toFixed(4));

  if (
    currentScrollY > 180 &&
    currentScrollY > previousScrollY + 5 &&
    !menuOpen &&
    !siteHeader.matches(":focus-within")
  ) {
    siteHeader.classList.add("nav-hidden");
  } else if (currentScrollY < previousScrollY - 3 || currentScrollY < 180) {
    siteHeader.classList.remove("nav-hidden");
  }

  previousScrollY = currentScrollY;
  updateActiveNavigation();
}

function requestScrollUpdate() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    updateSmartNavigation();
    scrollFrame = undefined;
  });
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
reducedMotion.addEventListener("change", requestScrollUpdate);
updateSmartNavigation();


