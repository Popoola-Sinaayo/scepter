# The Scepter

Website for **The Scepter Christian Ministries**, built around the Formation Theology Framework: forming believers into their identity and function as kings and priests.

## Stack

- **Next.js 16** (App Router, Server Actions)
- **TypeScript**, **Tailwind CSS v4**
- **Cormorant Garamond** (headlines, scripture) + **Roboto Condensed** (UI)
- **Resend** for enquiry and subscriber emails, **zod** for validation

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About and founder |
| `/doctrine` | Our doctrine (four anchors, central thesis, witness) |
| `/formation` | Formation philosophy, spheres, gatherings and cohorts |
| `/teachings` | Teaching channels and recent teachings |
| `/contact` | Enquiry form |

`/sermons` and `/blog` permanently redirect to `/teachings`.

## Editing content

- Ministry copy, founder bio, gatherings and teachings live in `src/lib/content.ts`.
- Contact details and social links live in `src/lib/site.ts`. Empty values are hidden on the site.
- Search for `TODO` to find placeholders that still need real information.
- `/contact?subject=...` prefills the enquiry subject (used by "Register interest").

## Email setup (Resend)

1. Create an account at [resend.com](https://resend.com) and an API key.
2. In Resend, go to **Domains**, add `thescepterglobal.com`, and add the DNS records it shows (SPF/DKIM, and optionally DMARC) at your domain registrar. Wait until the domain shows **Verified**.
3. Copy `.env.example` to `.env.local` (and add the same variables in your hosting provider):

   ```bash
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=info@thescepterglobal.com
   CONTACT_FROM_EMAIL=The Scepter <hello@thescepterglobal.com>
   RESEND_SEGMENT_ID=           # optional, for footer subscribers
   ```

   Before the domain is verified you can test with `CONTACT_FROM_EMAIL="The Scepter <onboarding@resend.dev>"`, but Resend will only deliver to the email address on your Resend account.

When someone submits the contact form, the team receives the enquiry (replying goes straight to the sender) and the sender gets a branded acknowledgement. Footer subscribers are saved as Resend contacts; if that fails, the team is emailed instead.

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
