# Cockrell's shop board demo: project notes

Last updated: 2026-10-16

Demo only. Every car, customer and technician name is made up. No prices, contacts or real customer data belong in this file.

## What exists

**Airtable base: "Cockrell's Repair Board (Demo)"** (base ID appG5VsveSrJGW2cw)
- Tables: Repair Orders (job, customer, phone, insurance, step, waiting on, drop-off, promised, hours scheduled, technician, note for customer, late flag) and Technicians (name, role).
- Steps run 01 Administrative to 15 Return. "Waiting on" is Nothing, Parts, Insurance or Customer.
- Demo data: 10 cars and 6 technicians (Marcus, Dustin, Hank, Wyatt, Rusty, Caleb).
- Interface "Shop Floor": the board "Where every car is" and the dashboard "Service manager overview".
- Standalone form "Drop Off Form": Job (required), Customer, Phone, Insurance, Technician, Drop-off, Promised, Hours scheduled, Note for customer. Step and Waiting on are left off, so new cars land in Uncategorized until moved to 01.

**Website pages (this repo)**
- /cockrells/shop-board/: Input (live Airtable form embed), Status (static picture of the board), Reports (static picture of the manager dashboard). Hidden from search engines.
- Every Cockrell's demo page has a footer link to /cockrells/shop-board/.

**Private design canvas (not in this repo):** three 1920x1080 TV screens (all cars, needs attention, tech workload) in the Cockrell's navy, brick red and gold.

## Decisions so far
- Keep everything internal. No public Airtable share links except the form embed on the hidden demo page.
- Airtable refuses to show its interface pages inside another website, so Status and Reports are static pictures for now.
- The tech workload view is sensitive. It looks like a leaderboard, so keep it on the manager dashboard and off the shop TV unless the owner asks for it.
- Airtable is priced per editing seat. Cloudflare hosting is effectively free at this size.

## Next
1. Make Status and Reports live: a small Cloudflare helper reads the cars from Airtable with a read-only token kept as a Cloudflare secret, and the pages draw the board and dashboard from that data. Add a password to the page.
2. Rotating TV page that flips through the three screens every 15 seconds.
3. Write a one-page demo script (input, status, reports).
4. Optional: an automation so new cars start at "01 Administrative".

## Open questions
- Does the late-cars number on the Airtable dashboard count only late cars? It may be counting all cars.
- Should the tech workload screen be on the TV, hidden, or shown as "who has room for more work"?
