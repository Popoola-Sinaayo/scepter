@AGENTS.md

# The Scepter — website

Marketing site for The Scepter Christian Ministries, plus registration for the CLAY Conference 2026 ("EMERGENCE"). It runs on Next.js 16 with the App Router and Server Actions, React 19, TypeScript (strict), Tailwind CSS v4 and zod 4. There is no database: form submissions go to Brevo, Resend and a Google Sheet. The README covers setting up those services; this file covers how the code fits together.

## Commands

```bash
npm run dev       # http://localhost:3000
npm run build     # production build (also type-checks)
npm run lint      # eslint (next core-web-vitals + typescript)
npx tsc --noEmit  # type-check only
```

There is no test suite. To check a change, run lint and the type-check, then try it in the browser. Forms need `.env.local` (see `.env.example`). Without those keys the actions log an error and show the "temporarily unavailable" message.

## Layout

```
src/app/                 App Router pages (all server components)
  layout.tsx             Root layout: Space Grotesk font, Navbar, Footer, site-wide metadata
  page.tsx, about/, doctrine/, formation/, teachings/, give/, contact/
  clay/                  Conference landing, register/, volunteer/
  clay/actions.ts        Server actions registerAttendee / registerVolunteer
  contact/actions.ts     Server action sendEnquiry (Resend only)
  actions/subscribe.ts   Server action subscribe (footer newsletter → Brevo)
  sitemap.ts, robots.ts  Hand-maintained route list: add new pages here
src/components/          Shared UI (Button, Container, PageHero, Reveal, cards, bands…)
  clay/                  Registration form system (see below)
src/lib/
  site.ts                Name, URL, email, socials, nav/quick links
  content.ts             All ministry copy and the `images` registry (src + alt)
  clay.ts                Conference date/venue and every form option list
  seo.ts                 createMetadata() for per-page metadata
  email.ts               Resend client, emailConfig, escapeHtml, brandedEmail() template
  brevo.ts               Brevo contacts (newsletter) + transactional email
  sheets.ts              appendSheetRow() → Apps Script webhook
  countries.ts           Country list for the select
public/images/ministry/  Photos; public/logos/  brand + CLAYCON logos
google-apps-script/      Apps Script for the Sheet. It is gitignored, so it exists only locally.
```

`next.config.ts` sets permanent redirects from `/sermons` and `/blog` to `/teachings`, and `allowedDevOrigins`, which client JS needs to hydrate when the dev server is opened at its network URL.

## Conventions

- **Content lives in `src/lib`, not in the pages.** To change copy, dates, options or images, edit `content.ts`, `site.ts` or `clay.ts`. Images are referenced through `images.<key>` from `content.ts`, so new photos go into that registry with alt text. Many values are typed `"" as string`, and empty strings are hidden in the UI (phone, location, socials, `clay.dates`/`venue`). Keep that pattern. `grep TODO src` lists the placeholders still waiting for real content.
- **Pages** are server components that export `metadata = createMetadata({ title, description, path })` and are built from `PageHero` + `<section>` + `Container` (`narrow` for forms). `Reveal` (in `components/Reveal.tsx`) handles scroll animations. Only interactive components use `"use client"`: Navbar, Reveal, ContactForm, SubscribeForm and the clay forms.
- **Imports** use the `@/*` alias for `src/*`.
- **Styling:** Tailwind v4 is set up in `src/app/globals.css` (`@theme inline`). There is no tailwind.config file. The palette tokens are `ink`, `navy`, `navy-deep`, `burgundy`, `burgundy-deep`, `cream` and `paper`. `font-serif`, `font-sans` and `font-display` all map to Space Grotesk, which has no italic, so `italic` renders upright. The `.eyebrow` utility class is for small uppercase labels. The animation classes `.reveal*` and `.hero-*` respect `prefers-reduced-motion`.
- **Emails** are HTML strings wrapped in `brandedEmail({ heading, body })` with inline styles. Every user value must pass through `escapeHtml()`. Always send a plain-text version alongside the HTML.

## Server actions and forms

All three actions follow the same pattern. Each takes `(prevState, formData)`, reads fields with a `text()` helper (trim + string), validates with zod, and returns a state object (`status: "idle" | "success" | "error"`, `message`, field `errors` from `z.flattenError`). Each also has a hidden **honeypot** field (`company` on contact, `clay_hp` on clay). When the honeypot is filled the action returns a fake success.

- **Contact** (`sendEnquiry`): emails the team through Resend with reply-to set to the sender, then sends the sender an acknowledgement. The submitted values come back in the state so the form can refill them.
- **Subscribe**: upserts the contact into a Brevo list. If that fails, it emails the team through Resend so the signup is not lost.
- **CLAY** (`registerAttendee`, `registerVolunteer`): zod schema plus manual conditional checks (e.g. `groupName` required when `inGroup === "Yes"`) → build a `SheetRow` whose **keys are the human-readable column headers** → `saveRegistration()`:
  1. `appendSheetRow("Attendees" | "Volunteers", row)`. If this fails, the full row is emailed to `CONTACT_TO_EMAIL`. The submission counts as failed only if that email also fails.
  2. Sends the registrant a confirmation through `sendEmail()`, which tries Brevo first and falls back to Resend. The confirmation includes a reference such as `CLAY-XXXXXX`.

### Adding or changing a CLAY question

1. Add the option list to `src/lib/clay.ts` if the field is a choice (`as const` tuples; `zod` enums are built from them).
2. Add the field to the schema in `src/app/clay/actions.ts`, the `safeParse` input, and the `row` object (the key becomes a new sheet column). The Apps Script adds missing header columns automatically, so the sheet needs no manual changes.
3. Add the input to `AttendeeForm.tsx` / `VolunteerForm.tsx` using the primitives in `components/clay/FormFields.tsx`. The primitives are `FormSection`, `TextField`, `TextAreaField`, `SelectField`, `ChoiceField` (radio or checkbox), `ConsentField`, the conditional `Reveal show={…}` wrapper (a different component from `components/Reveal`) and `Honeypot`. Pass `errors={errors.<name>}`. Conditional sections are controlled with local `useState` in the form.

`useRegistrationForm` submits through `onSubmit` + `startTransition`, which stops React 19 from resetting the form after a server error. It also passes `formAction` to `<form action>` so a submit before hydration still POSTs. After a submit it scrolls to the first `[data-invalid]` field, or on success to the result panel. Keep both of these behaviours when you change the forms.

## Environment variables

`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (Resend); `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME` (Brevo); `GOOGLE_SHEETS_WEBHOOK_URL`, `GOOGLE_SHEETS_WEBHOOK_SECRET` (must match `SECRET` in the Apps Script). All of them are server-only. `.env*` files are gitignored except `.env.example`, which must be updated whenever a variable is added.

## Gotchas

- The installed Next.js is newer than most training data. Read `node_modules/next/dist/docs/` before using framework APIs (see AGENTS.md).
- Social images: `src/app/opengraph-image.jpg` / `twitter-image.jpg` (file convention) and `ogImage` in `seo.ts` (`/public/og.jpg`) both exist. Check which one wins before changing either.
- A new page must be added by hand to `sitemap.ts`, and to `navLinks` / `quickLinks` in `site.ts` if it belongs in the navigation.
- The Apps Script stores strings with a leading `'` so phone numbers keep their `+`/`0`. After editing the script, redeploy it as a *new version of the same deployment* so the URL stays the same.
