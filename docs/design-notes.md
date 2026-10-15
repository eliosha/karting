# Meraki concept redesign

Independent presentation concept; not commissioned or approved. No live booking or payment integration. Search indexing is disabled until business approval.

## Sources and accuracy

- Supplied Meraki Karting Packages PDF, visually inspected pages 1–4 for karting, gaming and all seven group packages. Exact prices, durations, minimum group sizes and inclusions are retained. Page 1 lists 30-day validity without explaining its meaning; confirm with business. Publication date unspecified.
- The primary circular logo and racer hero photograph were supplied by the user. The hero banner features an authentically edited widescreen horizontal composition of kart #9 from `img/image1.jpeg`, positioned on the right with roll cage, helmet, steering wheel and Meraki branding in focus, with a seamless fade into Midnight Indigo on the left for the copy.
- The Better Together section showcases the authentic 9:16 vertical reel video in its native vertical aspect ratio (aspect-ratio: 9/16) with rounded borders and ambient lighting. All heavy canvas repainting loops and scroll parallax transforms were eliminated in favor of GPU-accelerated CSS radial gradients, ensuring silky-smooth 60fps video playback and scrolling with pause/play controls. Playback automatically pauses when off-screen or when reduced-motion is preferred.
- The smart navigation compacts after the initial viewport, tracks reading progress, marks the visible section, hides on downward scrolling and returns on upward scrolling. It remains visible while the mobile menu or keyboard focus is active.
- The supplied night-racing photograph appears in the Full Experience section as a compact landscape editorial image so both columns finish at a similar height.
- A vector version of the logo and the untouched original photograph should replace the optimized presentation assets before a commercial launch if available.
- Contact number 0763 170060 is in the PDF. Call and Instagram links initiate enquiries, not confirmed reservations. WhatsApp removed because its availability is unverified.
- Instagram and Lubowa competitor website requests returned proxy 403 responses. No live review of those sites was possible. No competitor comparison claims are made.
- Venue location confirmed via user-provided Google Maps listing (coordinates: 0.3178804° N, 32.628731° E, Kampala, Uganda). A responsive mini map card in the footer provides an embedded map preview and direct link to open directions in Google Maps. Opening hours, safety and age/height requirements require confirmation.

## Design decisions

Indigo foundation, warm paper sections, orange calls to action and restrained yellow details. Palette informed by supplied logo and brochure; digital colors are design approximations, not a certified brand specification. The visual system borrows from motorsport timing boards, starting lights, angled aerodynamic forms and race-event graphics without copying Formula 1 trademarks or team branding. Event-focused copy is grounded in the supplied group and birthday packages. Local fonts and CSS remove runtime CDN dependencies. Existing static stack preserved.

## Run locally

From /workspace/karting: `python -m http.server 3000 --bind 0.0.0.0`

No dependency installation or build required. Use existing isolated checkout; do not create a worktree. Prices change with the day toggle; group inclusions expand using native keyboard-accessible details. Menu supports Escape and closes after navigation. Direct enquiries leave availability confirmation to the business.
