// Meraki Karting Bugolobi - Interactive Web Experience & Booking Engine
// Contact: +256 763 170060

const WHATSAPP_NUMBER = "256763170060";

// State
let currentDayType = 'midweek'; // 'midweek' (Tue-Thu) or 'weekend' (Fri-Sun & Public Holidays)
let calculatorState = {
  dayType: 'midweek',
  karters: 4,
  kartType: 'pro_15', // cadet_15, cadet_30, pro_15, pro_30, twin_marshall_15, twin_self_15, grand_prix
  f1SimMinutes: 0, // 0, 10, 20, 40
  ps5Minutes: 0, // 0, 10, 30, 40, 60
  fifaTournament: 0, // 0, 4, 8
  foodCombos: 'none', // none, burger, endurance, meraki
  drinkChoice: 'soft' // none, soft, cocktails
};

// Pricing Matrix (UGX)
const PRICING = {
  midweek: {
    cadet_15: 50000,
    cadet_30: 75000,
    pro_15: 50000,
    pro_30: 75000,
    twin_marshall_15: 50000,
    twin_marshall_30: 75000,
    twin_self_15: 100000,
    twin_self_30: 150000,
    grand_prix: 150000
  },
  weekend: {
    cadet_15: 65000,
    cadet_30: 100000,
    pro_15: 65000,
    pro_30: 100000,
    twin_marshall_15: 65000,
    twin_marshall_30: 100000,
    twin_self_15: 130000,
    twin_self_30: 200000,
    grand_prix: 150000
  },
  gaming: {
    f1_10: 15000,
    f1_20: 25000,
    f1_40: 50000,
    ps5_10: 10000,
    ps5_30: 20000,
    ps5_40: 35000,
    ps5_60: 55000,
    fifa_4: 50000,
    fifa_8: 90000,
    astro_20: 20000,
    astro_60: 55000
  },
  food: {
    burger: 28000,
    endurance: 80000,
    meraki: 80000,
    pizza_bbq: 35000,
    pizza_meaty: 45000,
    ribs: 40000,
    wings: 30000
  },
  drinks: {
    cocktail: 30000,
    mocktail: 15000,
    beer: 10000,
    soda: 3000,
    juice: 10000
  }
};

// Format currency
function formatUGX(num) {
  return 'UGX ' + num.toLocaleString('en-US');
}

// 1-Tap Direct WhatsApp Message Builder
function openWhatsAppBooking(packageName, priceText, details = "") {
  let dayLabel = currentDayType === 'midweek' ? 'Tue - Thu Midweek' : 'Fri - Sun / Public Holiday';
  let message = `🏎️ *MERAKI KARTING BOOKING & INQUIRY*\n` +
    `Hello Meraki Team! I would like to book / inquire about this session:\n\n` +
    `🏁 *Package:* ${packageName}\n` +
    `💰 *Rate:* ${priceText}\n` +
    `📅 *Day Preference:* ${dayLabel}\n` +
    (details ? `ℹ️ *Details:* ${details}\n` : '') +
    `📍 *Venue:* Portbell Road, Bugolobi, Kampala\n\n` +
    `Could you please let me know current track availability for this week?`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}

// Toggle Midweek / Weekend Rate Cards
function setDayType(type) {
  currentDayType = type;
  calculatorState.dayType = type;

  // Update active pill UI
  const btnMidweek = document.getElementById('btn-midweek');
  const btnWeekend = document.getElementById('btn-weekend');

  if (btnMidweek && btnWeekend) {
    if (type === 'midweek') {
      btnMidweek.className = 'px-4 py-2 text-sm font-semibold rounded-lg bg-orange-600 text-white shadow-lg shadow-orange-600/30 transition-all';
      btnWeekend.className = 'px-4 py-2 text-sm font-semibold rounded-lg text-slate-300 hover:text-white transition-all';
    } else {
      btnWeekend.className = 'px-4 py-2 text-sm font-semibold rounded-lg bg-orange-600 text-white shadow-lg shadow-orange-600/30 transition-all';
      btnMidweek.className = 'px-4 py-2 text-sm font-semibold rounded-lg text-slate-300 hover:text-white transition-all';
    }
  }

  // Update all dynamic rate badges on the page
  document.querySelectorAll('[data-rate-key]').forEach(el => {
    const key = el.getAttribute('data-rate-key');
    if (PRICING[type] && PRICING[type][key] !== undefined) {
      el.textContent = formatUGX(PRICING[type][key]);
    }
  });

  // Re-run calculator
  calculateCustomRaceDay();
}

// Category Tabs Switching
function switchCategoryTab(tabId) {
  document.querySelectorAll('.rate-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('bg-orange-500/20', 'text-orange-400', 'border-orange-500');
      btn.classList.remove('text-slate-400', 'border-transparent');
    } else {
      btn.classList.remove('bg-orange-500/20', 'text-orange-400', 'border-orange-500');
      btn.classList.add('text-slate-400', 'border-transparent');
    }
  });

  document.querySelectorAll('.tab-panel').forEach(panel => {
    if (panel.id === `tab-${tabId}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
}

// Menu Sub-Tabs Switching
function switchMenuTab(tabId) {
  document.querySelectorAll('.menu-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-menu-tab') === tabId) {
      btn.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500');
      btn.classList.remove('text-slate-400', 'border-transparent');
    } else {
      btn.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500');
      btn.classList.add('text-slate-400', 'border-transparent');
    }
  });

  document.querySelectorAll('.menu-panel').forEach(panel => {
    if (panel.id === `menu-${tabId}`) {
      panel.classList.remove('hidden');
    } else {
      panel.classList.add('hidden');
    }
  });
}

// Race Day Calculator
function updateCalculatorField(field, value) {
  calculatorState[field] = value;
  calculateCustomRaceDay();
}

function calculateCustomRaceDay() {
  const karters = parseInt(calculatorState.karters) || 1;
  const day = calculatorState.dayType;
  let kartCostPerPerson = PRICING[day][calculatorState.kartType] || 50000;
  
  let totalKartsCost = kartCostPerPerson * karters;

  // Simulator Add-on
  let totalSimCost = 0;
  let simDescription = "None";
  if (calculatorState.f1SimMinutes === 10) {
    totalSimCost = PRICING.gaming.f1_10 * karters;
    simDescription = `${karters}x 10-min F1 Sim`;
  } else if (calculatorState.f1SimMinutes === 20) {
    totalSimCost = PRICING.gaming.f1_20 * karters;
    simDescription = `${karters}x 20-min F1 Sim`;
  } else if (calculatorState.f1SimMinutes === 40) {
    totalSimCost = PRICING.gaming.f1_40 * karters;
    simDescription = `${karters}x 40-min F1 Sim`;
  }

  // PS5 Gaming Add-on
  let totalPS5Cost = 0;
  let ps5Description = "None";
  if (calculatorState.ps5Minutes === 10) {
    totalPS5Cost = PRICING.gaming.ps5_10 * karters;
    ps5Description = `${karters}x 10-min PS5`;
  } else if (calculatorState.ps5Minutes === 30) {
    totalPS5Cost = PRICING.gaming.ps5_30 * karters;
    ps5Description = `${karters}x 30-min PS5`;
  } else if (calculatorState.ps5Minutes === 60) {
    totalPS5Cost = PRICING.gaming.ps5_60 * karters;
    ps5Description = `${karters}x 60-min PS5`;
  }

  // FIFA Tournament
  let totalFIFACost = 0;
  let fifaDescription = "None";
  if (calculatorState.fifaTournament === 4) {
    totalFIFACost = PRICING.gaming.fifa_4;
    fifaDescription = "4-Player FIFA Bracket";
  } else if (calculatorState.fifaTournament === 8) {
    totalFIFACost = PRICING.gaming.fifa_8;
    fifaDescription = "8-Player FIFA Bracket";
  }

  // Food Combo
  let totalFoodCost = 0;
  let foodDescription = "None";
  if (calculatorState.foodCombos === 'burger') {
    totalFoodCost = PRICING.food.burger * karters;
    foodDescription = `${karters}x Classic Burger + Chips + Soda`;
  } else if (calculatorState.foodCombos === 'endurance') {
    const sets = Math.ceil(karters / 5);
    totalFoodCost = PRICING.food.endurance * sets;
    foodDescription = `${sets}x Endurance Combos (10pc Chicken, 2 Chips, 2L Soda)`;
  } else if (calculatorState.foodCombos === 'meraki') {
    const sets = Math.ceil(karters / 4);
    totalFoodCost = PRICING.food.meraki * sets;
    foodDescription = `${sets}x Meraki Combos (5pc Chicken, Large Fries, 2 Burgers, 2L Soda)`;
  }

  // Drink Choice
  let totalDrinkCost = 0;
  let drinkDescription = "None";
  if (calculatorState.drinkChoice === 'soft') {
    totalDrinkCost = PRICING.drinks.soda * karters;
    drinkDescription = `${karters}x Chilled Sodas`;
  } else if (calculatorState.drinkChoice === 'cocktails') {
    totalDrinkCost = PRICING.drinks.cocktail * karters;
    drinkDescription = `${karters}x Signature Cocktails (Pink Mercedes / Gin Infused)`;
  }

  const grandTotal = totalKartsCost + totalSimCost + totalPS5Cost + totalFIFACost + totalFoodCost + totalDrinkCost;
  const perPerson = Math.round(grandTotal / karters);

  // Update DOM UI
  const totalEl = document.getElementById('calc-total');
  const perPersonEl = document.getElementById('calc-per-person');
  const kartersCountEl = document.getElementById('calc-karters-display');

  if (totalEl) totalEl.textContent = formatUGX(grandTotal);
  if (perPersonEl) perPersonEl.textContent = formatUGX(perPerson) + ' / person';
  if (kartersCountEl) kartersCountEl.textContent = `${karters} Karters`;

  // Update Breakdown Labels
  const kartSummaryEl = document.getElementById('calc-summary-karts');
  const extrasSummaryEl = document.getElementById('calc-summary-extras');
  if (kartSummaryEl) {
    const kartNames = {
      cadet_15: "Cadet Karts (15m)",
      cadet_30: "Cadet Karts (30m)",
      pro_15: "Pro-Racer Karts (15m)",
      pro_30: "Pro-Racer Karts (30m)",
      twin_marshall_15: "Twin Karts Marshall (15m)",
      twin_self_15: "Twin Karts Self-Driven (15m)",
      grand_prix: "Full Grand Prix Tournament (3 Races)"
    };
    kartSummaryEl.textContent = `${karters}x ${kartNames[calculatorState.kartType] || "Pro Karts"} (${formatUGX(totalKartsCost)})`;
  }

  if (extrasSummaryEl) {
    const extras = [];
    if (totalSimCost > 0) extras.push(simDescription);
    if (totalPS5Cost > 0) extras.push(ps5Description);
    if (totalFIFACost > 0) extras.push(fifaDescription);
    if (totalFoodCost > 0) extras.push(foodDescription);
    if (totalDrinkCost > 0) extras.push(drinkDescription);
    extrasSummaryEl.textContent = extras.length > 0 ? extras.join(' • ') : "No extras added";
  }

  // Store for WhatsApp action
  calculatorState.lastCalculated = {
    grandTotal,
    perPerson,
    karters,
    totalKartsCost,
    simDescription,
    ps5Description,
    fifaDescription,
    foodDescription,
    drinkDescription
  };
}

// Send Calculator Order directly to WhatsApp
function sendCalculatorOrderToWhatsApp() {
  const calc = calculatorState.lastCalculated;
  if (!calc) return;

  const kartNames = {
    cadet_15: "Cadet Single Karts (15 mins)",
    cadet_30: "Cadet Single Karts (30 mins)",
    pro_15: "Pro-Racer Single Karts (15 mins)",
    pro_30: "Pro-Racer Single Karts (30 mins)",
    twin_marshall_15: "Two-Seater Marshall Assisted (15 mins)",
    twin_self_15: "Two-Seater Self-Driven (15 mins)",
    grand_prix: "Grand Prix Championship (Warm-up + 3 Races)"
  };

  const dayLabel = calculatorState.dayType === 'midweek' ? 'Tue - Thu Midweek' : 'Fri - Sun / Public Holiday';

  let message = `🏎️ *MERAKI KARTING - CUSTOM RACE DAY BOOKING*\n` +
    `Hello! We used the interactive planner on your website and want to reserve this session:\n\n` +
    `👥 *Racers Group Size:* ${calc.karters} people\n` +
    `📅 *Day Selection:* ${dayLabel}\n` +
    `🏁 *Track Session:* ${calc.karters}x ${kartNames[calculatorState.kartType]}\n`;

  if (calc.simDescription !== "None") message += `🎮 *F1 Simulator:* ${calc.simDescription}\n`;
  if (calc.ps5Description !== "None") message += `🕹️ *PS5 Lounge:* ${calc.ps5Description}\n`;
  if (calc.fifaDescription !== "None") message += `🏆 *FIFA Tournament:* ${calc.fifaDescription}\n`;
  if (calc.foodDescription !== "None") message += `🍔 *Food Order:* ${calc.foodDescription}\n`;
  if (calc.drinkDescription !== "None") message += `🍹 *Drinks:* ${calc.drinkDescription}\n`;

  message += `\n💰 *ESTIMATED TOTAL:* ${formatUGX(calc.grandTotal)} (~${formatUGX(calc.perPerson)} per person)\n` +
    `📍 *Location:* Meraki Karting, Portbell Road, Bugolobi, Kampala\n\n` +
    `Please confirm if you have a track slot available for our group!`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}

// Stepper for Karters
function changeKartersCount(delta) {
  let val = parseInt(calculatorState.karters) + delta;
  if (val < 1) val = 1;
  if (val > 40) val = 40;
  calculatorState.karters = val;
  const input = document.getElementById('calc-karters-input');
  if (input) input.value = val;
  calculateCustomRaceDay();
}

// Pitch Modal: "Why Meraki Beats Lubowa"
function openPitchModal() {
  const modal = document.getElementById('pitch-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closePitchModal() {
  const modal = document.getElementById('pitch-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Rate Card PDF Modal Zoom
function openPdfModal(pageNumber) {
  const modal = document.getElementById('pdf-modal');
  const img = document.getElementById('pdf-modal-img');
  const title = document.getElementById('pdf-modal-title');
  if (modal && img) {
    img.src = `assets/pdf_images/page_${pageNumber}.jpg`;
    if (title) {
      const titles = [
        "Page 1: Single & Twin Karts Rate Card",
        "Page 2: Simulation & PS5 Gaming Rate Card",
        "Page 3: Meraki Group Packages (Grand Prix & Race Buddies)",
        "Page 4: Meraki Group Packages (Speedster & Team Vibes)",
        "Page 5: Meraki Bites Food Menu",
        "Page 6: Meraki Drinks & Cocktails Menu"
      ];
      title.textContent = titles[pageNumber - 1] || `Original Rate Card Page ${pageNumber}`;
    }
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closePdfModal() {
  const modal = document.getElementById('pdf-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Mobile Navigation Toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}

// Telemetry Live Clock (East Africa Time)
function updateTelemetryClock() {
  const clockEl = document.getElementById('telemetry-clock');
  if (!clockEl) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {
    timeZone: 'Africa/Kampala',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  clockEl.textContent = `${timeStr} EAT`;
}

// Lap record simulation
let lapSeconds = 31.428;
function simulateTelemetryLap() {
  const liveLapEl = document.getElementById('live-lap-timer');
  if (!liveLapEl) return;
  let jitter = (Math.random() * 0.08 - 0.04).toFixed(3);
  let val = (lapSeconds + parseFloat(jitter)).toFixed(3);
  liveLapEl.textContent = `00:${val}`;
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setDayType('midweek');
  calculateCustomRaceDay();
  setInterval(updateTelemetryClock, 1000);
  setInterval(simulateTelemetryLap, 3500);
  updateTelemetryClock();

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePitchModal();
      closePdfModal();
    }
  });
});
