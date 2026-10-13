"use strict";
const karts = [
  ["Cadets", "Single racer", 1],
  ["Pro-Racer Karts", "Single racer", 1],
  ["Individual & Marshall", "Two-seater racer", 1],
  ["Self Driven", "Two-seater racer", 2],
];
const money = (n) => "UGX " + n.toLocaleString("en-UG");
function renderRates(day) {
  const weekend = day === "weekend";
  document.querySelector("#rate-rows").replaceChildren(
    ...karts.map(([name, description, multiplier]) => {
      const tr = document.createElement("tr");
      const label = document.createElement("th");
      label.scope = "row";
      label.innerHTML = `${name}<small>${description}</small>`;
      tr.append(label);
      for (const amount of weekend ? [65000, 100000] : [50000, 75000]) {
        const td = document.createElement("td");
        td.textContent = money(amount * multiplier);
        tr.append(td);
      }
      const action = document.createElement("td");
      const link = document.createElement("a");
      link.href = "tel:+256763170060";
      link.textContent = "Enquire →";
      link.setAttribute("aria-label", `Call to enquire about ${name}`);
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
const ambientContext = ambientCanvas.getContext("2d", { alpha: false });
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let ambientVisible = false;
let ambientTimer;
let videoUserPaused = false;

function paintAmbientFrame() {
  if (!ambientVisible || groupVideo.paused || reducedMotion.matches) {
    ambientTimer = undefined;
    return;
  }

  if (groupVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    ambientContext.drawImage(
      groupVideo,
      0,
      0,
      ambientCanvas.width,
      ambientCanvas.height,
    );
  }
  const interval = window.innerWidth <= 700 ? 280 : 180;
  ambientTimer = window.setTimeout(paintAmbientFrame, interval);
}

function startAmbientEffect() {
  if (!ambientTimer && ambientVisible && !groupVideo.paused) {
    paintAmbientFrame();
  }
}

function stopAmbientEffect() {
  window.clearTimeout(ambientTimer);
  ambientTimer = undefined;
}

function updateVideoControl() {
  const paused = groupVideo.paused;
  videoToggle.textContent = paused ? "Play video" : "Pause video";
  videoToggle.setAttribute(
    "aria-label",
    paused ? "Play background video" : "Pause background video",
  );
}

function applyMotionPreference() {
  if (reducedMotion.matches) {
    groupVideo.pause();
    groupVideo.removeAttribute("autoplay");
  } else if (ambientVisible && !videoUserPaused) {
    groupVideo.play().catch(updateVideoControl);
  } else {
    groupVideo.pause();
  }
  updateVideoControl();
}

videoToggle.addEventListener("click", () => {
  if (groupVideo.paused) {
    videoUserPaused = false;
    groupVideo.play().catch(updateVideoControl);
  } else {
    videoUserPaused = true;
    groupVideo.pause();
  }
});
groupVideo.addEventListener("play", updateVideoControl);
groupVideo.addEventListener("play", startAmbientEffect);
groupVideo.addEventListener("pause", () => {
  updateVideoControl();
  stopAmbientEffect();
});
reducedMotion.addEventListener("change", applyMotionPreference);
new IntersectionObserver(
  ([entry]) => {
    ambientVisible = entry.isIntersecting;
    if (ambientVisible) {
      if (!reducedMotion.matches && !videoUserPaused) {
        groupVideo.play().catch(updateVideoControl);
      }
      startAmbientEffect();
    } else {
      groupVideo.pause();
      stopAmbientEffect();
    }
  },
  { rootMargin: "150px 0px", threshold: 0.01 },
).observe(ambientCanvas);
applyMotionPreference();

const parallaxMedia = document.querySelector("[data-parallax-media]");
const groupSection = parallaxMedia.closest(".groups");
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

function updateParallax() {
  if (reducedMotion.matches) {
    groupVideo.style.setProperty("--parallax-y", "0px");
    return;
  }

  const bounds = groupSection.getBoundingClientRect();
  const totalTravel = window.innerHeight + bounds.height;
  const progress = Math.min(
    1,
    Math.max(0, (window.innerHeight - bounds.top) / totalTravel),
  );
  const range = Math.min(38, parallaxMedia.clientHeight * 0.075);
  const offset = (progress - 0.5) * range * 2;
  groupVideo.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
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
  updateParallax();
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
