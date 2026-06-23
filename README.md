# TitleCheckPro

Production-oriented vehicle history report request website built with Next.js App Router, React, TypeScript, Tailwind CSS, React Hook Form, Zod, Lucide icons, Nodemailer and Route Handlers.

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
```

SMTP credentials stay server-side. When SMTP is missing, validated submissions are logged safely during development. Production returns a configuration error and never claims an email was delivered.

## Mailbox setup

Application code cannot create the actual `info@titlecheckpro.com` mailbox. Create it through the domain/email provider, such as cPanel, Zoho Mail, Microsoft 365 or Google Workspace, then supply SMTP credentials.

## Configuration

- Country names, labels, currencies and prices: `src/data/countries.ts`
- Plan content and recommendation: `src/data/plans.ts`
- Site details, optional phone/address/social links and legal placeholders: `src/data/site.ts`
- Sample testimonials requiring replacement: `src/data/testimonials.ts`

Update the three country price objects only when final prices are supplied. Null prices render as “Price coming soon.”

## Launch checklist

- Add final AUD, CAD and USD prices.
- Add SMTP credentials and create the mailbox.
- Add payment gateway credentials and implement the prepared payment service interface.
- Replace sample testimonials with genuine permissioned feedback.
- Confirm legal entity name and jurisdiction.
- Obtain professional legal review of all policy drafts.
- Optionally replace `public/images/hero-vehicle.svg`, an original named placeholder, with final licensed automotive photography.

## Verification

```bash
npm run lint
npm run build
```
