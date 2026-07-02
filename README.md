# TitleCheckPro

Production-oriented vehicle history report request website built with Next.js App Router, React, TypeScript, Tailwind CSS, React Hook Form, Zod, Lucide icons, Nodemailer, Stripe and Route Handlers.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and configure:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=no-reply@titlecheckpro.com
EMAIL_TO=info@titlecheckpro.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_CURRENCY=usd
```

SMTP credentials stay server-side. `STRIPE_SECRET_KEY` also stays server-side and must never be committed. When SMTP is missing, validated submissions are logged safely during development. Production returns a configuration error and never claims an email was delivered.

## Mailbox setup

Application code cannot create the actual `info@titlecheckpro.com` mailbox. Create it through the domain/email provider, such as cPanel, Zoho Mail, Microsoft 365 or Google Workspace, then supply SMTP credentials.

## Configuration

- Country names, labels, currencies and editable test prices: `src/data/countries.ts`
- Plan content and recommendation: `src/data/plans.ts`
- Site details, optional phone/address/social links and legal placeholders: `src/data/site.ts`
- Sample testimonials requiring replacement: `src/data/testimonials.ts`

Update the three country price objects when final AUD, CAD and USD prices are supplied. `null` prices render as "Price coming soon" and cannot be sent to Stripe Checkout.

## Stripe test checkout

The order form posts validated report details to `/api/checkout`, creates a Stripe Checkout Session on the server, and redirects the customer to Stripe. The success page reads `session_id` from Stripe's return URL and verifies the checkout session server-side before displaying payment status.

Use Stripe test cards while `STRIPE_SECRET_KEY` points at test mode. Webhook handling is not implemented in this Next.js-only integration yet; the current flow verifies status on the success page.

## Launch checklist

- Confirm final AUD, CAD and USD prices.
- Add SMTP credentials and create the mailbox.
- Confirm Stripe test credentials and configure a webhook before production payment fulfillment.
- Replace sample testimonials with genuine permissioned feedback.
- Confirm legal entity name and jurisdiction.
- Obtain professional legal review of all policy drafts.
- Optionally replace `public/images/hero-vehicle.svg`, an original named placeholder, with final licensed automotive photography.

## Verification

```bash
npm run lint
npm run build
```
