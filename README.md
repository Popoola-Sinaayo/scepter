# The Scepter

Website for **The Scepter Christian Ministries**, built around the Formation Theology Framework: forming believers into their identity and function as kings and priests.

## Stack

- **Next.js 16** (App Router, Server Actions)
- **TypeScript**, **Tailwind CSS v4**
- **Space Grotesk** (headlines, body and UI)
- **Resend** for enquiry emails, **Brevo** for newsletter subscribers, **zod** for validation

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About and founder |
| `/doctrine` | Our doctrine (four anchors, central thesis, witness) |
| `/formation` | Formation philosophy, spheres, gatherings and cohorts |
| `/teachings` | Teaching channels and recent teachings |
| `/contact` | Enquiry form |
| `/clay` | CLAY Conference 2026 — EMERGENCE |
| `/clay/register` | Conference attendance registration |
| `/clay/volunteer` | Conference volunteer registration |

`/sermons` and `/blog` permanently redirect to `/teachings`.

## Editing content

- Ministry copy, founder bio, gatherings and teachings live in `src/lib/content.ts`.
- Contact details and social links live in `src/lib/site.ts`. Empty values are hidden on the site.
- Search for `TODO` to find placeholders that still need real information.
- `/contact?subject=...` prefills the enquiry subject (used by "Register interest").

## Email setup

### Contact form (Resend)

1. Create an account at [resend.com](https://resend.com) and an API key.
2. In Resend, go to **Domains**, add your sending domain, and add the DNS records it shows (SPF/DKIM, and optionally DMARC) at your domain registrar. Wait until the domain shows **Verified**.
3. Set these in `.env.local` (and in your hosting provider):

   ```bash
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=info@thescepterglobal.org
   CONTACT_FROM_EMAIL=The Scepter <hello@thescepterglobal.com>
   ```

   Before the domain is verified you can test with `CONTACT_FROM_EMAIL="The Scepter <onboarding@resend.dev>"`, but Resend will only deliver to the email address on your Resend account.

When someone submits the contact form, the team receives the enquiry (replying goes straight to the sender) and the sender gets a branded acknowledgement.

### Newsletter (Brevo)

1. Create an account at [brevo.com](https://www.brevo.com) and an API key under **Settings → SMTP & API → API keys**.
2. Under **Contacts → Lists**, create a list (e.g. “Website newsletter”) and note its numeric ID.
3. Add:

   ```bash
   BREVO_API_KEY=xkeysib-...
   BREVO_LIST_ID=2
   ```

Footer subscribers are created/updated in Brevo and added to that list. If Brevo is unavailable and Resend is configured, the team is emailed the signup as a fallback.

## CLAY Conference registrations (Google Sheets)

Submissions from `/clay/register` and `/clay/volunteer` are saved as rows in a Google Sheet, in the **Attendees** and **Volunteers** tabs. The tabs and header rows are created automatically on the first submission.

1. Create a Google Sheet (e.g. “CLAY 2026 Registrations”) in the ministry's Google account.
2. Open **Extensions → Apps Script**, delete the sample code, and paste in `google-apps-script/clay-registrations.gs`.
3. Replace `SECRET` at the top of the script with a long random string (e.g. the output of `openssl rand -hex 24`) and save.
4. Click **Deploy → New deployment**, choose type **Web app**, set **Execute as: Me** and **Who has access: Anyone**, then **Deploy**. Approve the permissions prompt (choose **Advanced → Go to project** if Google warns the app is unverified).
5. Copy the **Web app URL** (ends in `/exec`). Opening it in a browser should show `"CLAY registrations webhook is running."`
6. Add to `.env.local` (and your hosting provider):

   ```bash
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
   GOOGLE_SHEETS_WEBHOOK_SECRET=the-same-secret-as-in-the-script
   ```

If you edit the script later, use **Deploy → Manage deployments → Edit → Version: New version** so the URL stays the same.

Registrants receive a confirmation email (with the date and venue) sent through Brevo, using the same `BREVO_API_KEY` as the newsletter; Resend is used only if Brevo is not configured or fails. The sender defaults to `info@thescepterglobal.org` and must be verified in Brevo under **Senders, Domains & Dedicated IPs**; override it with `BREVO_SENDER_EMAIL` / `BREVO_SENDER_NAME`. If the sheet cannot be reached, the full registration is emailed to `CONTACT_TO_EMAIL` instead so it is not lost.

Conference dates, venue, category eligibility wording, and the volunteer day/time options live in `src/lib/clay.ts`.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```
