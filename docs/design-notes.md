# Meraki concept redesign

Independent presentation concept; not commissioned or approved. No live booking or payment integration. Search indexing is disabled until business approval.

## Sources and accuracy

- Supplied Meraki Karting Packages PDF, visually inspected pages 1–4 for karting, gaming and all seven group packages. Exact prices, durations, minimum group sizes and inclusions are retained. Page 1 lists 30-day validity without explaining its meaning; confirm with business. Publication date unspecified.
- Existing logo and hero collage match imagery in the supplied PDF. Additional racer crop is from PDF page 4. No unrelated stock imagery used. Source images are low-resolution; high-resolution original photographs and a vector logo are needed before a commercial launch.
- The race-night hero is generated concept artwork and is labelled as such on the page. It does not depict Meraki's real venue or a documented event. Replace it with approved official event photography when available.
- Contact number 0763 170060 is in the PDF. Call and Instagram links initiate enquiries, not confirmed reservations. WhatsApp removed because its availability is unverified.
- Instagram and Lubowa competitor website requests returned proxy 403 responses. No live review of those sites was possible. No competitor comparison claims are made.
- Original implementation claimed a specific address, opening status, track records, leaderboard and upcoming tournament. These are not supported by the supplied source and have been removed. Address, hours, safety and age/height requirements require confirmation.

## Design decisions

Indigo foundation, warm paper sections, orange calls to action and restrained yellow details. Palette informed by supplied logo and brochure; digital colors are design approximations, not a certified brand specification. The visual system borrows from motorsport timing boards, starting lights, angled aerodynamic forms and race-event graphics without copying Formula 1 trademarks or team branding. Event-focused copy is grounded in the supplied group and birthday packages. Local fonts and CSS remove runtime CDN dependencies. Existing static stack preserved.

## Run locally

From /workspace/karting: `python -m http.server 3000 --bind 0.0.0.0`

No dependency installation or build required. Use existing isolated checkout; do not create a worktree. Prices change with the day toggle; group inclusions expand using native keyboard-accessible details. Menu supports Escape and closes after navigation. Direct enquiries leave availability confirmation to the business.
