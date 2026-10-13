# Meraki concept redesign

Independent presentation concept; not commissioned or approved. No live booking or payment integration. Search indexing is disabled until business approval.

## Sources and accuracy

- Supplied Meraki Karting Packages PDF, visually inspected pages 1–4 for karting, gaming and all seven group packages. Exact prices, durations, minimum group sizes and inclusions are retained. Page 1 lists 30-day validity without explaining its meaning; confirm with business. Publication date unspecified.
- The primary circular logo and racer hero photograph were supplied by the user. Web assets preserve their brand palette and photographic composition while reducing file size. Additional racer imagery is cropped from PDF page 4. No unrelated stock imagery is used.
- The Better Together section uses the supplied 15.9-second Meraki video as a muted, looping background. It is resized to 480 × 854, stripped of audio, and served with a poster image and pause/play control. The media panel remains sticky while packages scroll and its crop moves with the section for a restrained parallax effect. A tiny canvas samples the playing video at a low frame rate to cast its live colors across the full section background without decoding a second video. Playback and ambient sampling stop while the section is off screen; reduced-motion preferences disable both effects.
- The smart navigation compacts after the initial viewport, tracks reading progress, marks the visible section, hides on downward scrolling and returns on upward scrolling. It remains visible while the mobile menu or keyboard focus is active.
- The supplied night-racing photograph appears in the Full Experience section as a compact landscape editorial image so both columns finish at a similar height.
- A vector version of the logo and the untouched original photograph should replace the optimized presentation assets before a commercial launch if available.
- Contact number 0763 170060 is in the PDF. Call and Instagram links initiate enquiries, not confirmed reservations. WhatsApp removed because its availability is unverified.
- Instagram and Lubowa competitor website requests returned proxy 403 responses. No live review of those sites was possible. No competitor comparison claims are made.
- Original implementation claimed a specific address, opening status, track records, leaderboard and upcoming tournament. These are not supported by the supplied source and have been removed. Address, hours, safety and age/height requirements require confirmation.

## Design decisions

Indigo foundation, warm paper sections, orange calls to action and restrained yellow details. Palette informed by supplied logo and brochure; digital colors are design approximations, not a certified brand specification. The visual system borrows from motorsport timing boards, starting lights, angled aerodynamic forms and race-event graphics without copying Formula 1 trademarks or team branding. Event-focused copy is grounded in the supplied group and birthday packages. Local fonts and CSS remove runtime CDN dependencies. Existing static stack preserved.

## Run locally

From /workspace/karting: `python -m http.server 3000 --bind 0.0.0.0`

No dependency installation or build required. Use existing isolated checkout; do not create a worktree. Prices change with the day toggle; group inclusions expand using native keyboard-accessible details. Menu supports Escape and closes after navigation. Direct enquiries leave availability confirmation to the business.
