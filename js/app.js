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
  navigation = document.querySelector("#navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}
menu.addEventListener("click", () => {
  const expanded = menu.getAttribute("aria-expanded") === "true";
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
