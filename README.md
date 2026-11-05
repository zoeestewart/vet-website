# Graceville Fiveways Veterinary

Websites for Graceville Fiveways Veterinary and Civic Centre Veterinary
Surgery, built with React, Vite, Tailwind CSS, and React Router. The same build
selects the clinic name, contact details, logo, content and accent colour from
the current domain.

## Getting started

```sh
npm install
npm run dev
```

## Available scripts

- `npm run dev` — start the local development server
- `npm run build` — create a production build in `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — lint the project with Oxlint

## Pages

- `/` — home
- `/about` — about the clinic
- `/services` — health checks, preventative care, dentistry, surgery, diagnostics, and routine services
- `/pet-advice` — guidance for cats, dogs, birds, reptiles, nutrition, and behaviour
- `/team` — the clinic team
- `/contact` — phone and location

The former `/cat-care` and `/dog-care` URLs redirect to `/pet-advice`.

Clinic details, service guides and glossary entries load from their public
Google Sheets tabs. Sheet columns are parsed by `src/data/clinics.js`,
`src/data/serviceGuides.js`, and `src/data/glossary.js`. Clinic and guide images
are hosted in the shared Google Drive photo folders and referenced by their
direct image URLs. Drive image files must allow anyone with the link to view
them for the public website to load them.

All tabs, including staff, are fetched once when the site loads and shared
through `SheetDataProvider`. The clinics tab also has optional `FacebookUrl` and
`InstagramUrl` columns; a clinic's social icons appear in the top bar and footer
only when those cells are filled in.

The staff tab's `Photo` column accepts a Google Drive share link, a full image
URL, or a path such as `staff/natasha.jpg`, which loads
`public/images/staff/natasha.jpg`.

## Project structure

```
src/
  App.jsx          route table (nested under Layout)
  components/      Layout, Header, Footer, ClinicSwitch, StaffDirectory, ...
  pages/           one file per route (Home, About, Services, Team, Contact, ...)
  data/            sheet parsers, navigation.js, staff.js
  lib/             shared helpers (button styles, CSV parser, sheet URLs)
```

The two clinic domains in the site configuration are
`fivewaysvet.com.au` and `civiccentrevets.com.au`. On the cPanel account each
domain has its own folder under `public_html/`, so the workflow deploys the same
`dist/` build to both folders and the site picks the clinic from the hostname.

For local previews, run `npm run dev`, then add `?clinic=civic-centre` to the
URL to preview the Civic Centre theme. The default local site is Graceville
Fiveways.

## Updating the staff directory

The Our Team page is connected to the clinic's shared Google Sheet (first tab,
`gid=0`). Google must allow anyone with the link to view it; signed-in-only
sheets cannot be loaded by the public website. The existing columns are
supported; the first row needs `Name` and `Title` (or `Role`). `Blurb` (or
`Bio`) and `Photo` are optional. A `Clinic` column is optional:

`Name,Title,Blurb,Photo,Clinic`

Use `graceville-fiveways` or `civic-centre` in `Clinic` to list staff at just
one site. Rows without a clinic value appear at both locations. `Photo` should
contain a publicly accessible image URL. Avoid putting personal contact
details, client/patient information, or other private data in the sheet.

Set the sheet to viewer access for anyone with the link. The provided sheet
URL is already configured as the default. If you move the staff tab or want to
use a different sheet, set `VITE_STAFF_CSV_URL` to its Google Sheets URL or
published CSV URL:

- Locally, set it in `.env.local` (copy `.env.example` first).
- For GitHub deployment, add a repository Actions **variable** named
  `VITE_STAFF_CSV_URL` only if you want to override the configured default.

For a normal Google Sheets edit link, the site builds a CSV export URL
automatically. Changes in the sheet appear on the Our Team page without editing
the site. If the sheet cannot be reached or its required columns are missing,
the clinic's saved staff details are shown with a visible notice. Since the
sheet is public to site visitors, only include information intended for
publication.

## VisionVPM online bookings

VisionVPM online appointment scheduling is available through Vetstoria's
VisionVPM integration. Vetstoria says its team connects the practice calendar
for real-time availability; once configured, you can link to the booking page
or embed it on the website. This site is prepared to use the booking-page link:

1. Contact Vetstoria to arrange the VisionVPM integration and set up online
   appointment scheduling for the clinic.
2. Once Vetstoria provides the clinic booking-page URLs, set
   `VITE_BOOKING_URL_GRACEVILLE` and/or `VITE_BOOKING_URL_CIVIC`.
   - Locally, copy `.env.example` to `.env.local` and fill in the URLs.
   - For GitHub deployment, add repository **Actions variables** with those
     names and their respective clinic URLs.
3. Build and deploy. The appointment buttons will then open online booking;
   until a URL is configured, they continue to call the clinic.

The booking link is public website configuration, not a credential. Use
`VITE_BOOKING_URL_GRACEVILLE` and `VITE_BOOKING_URL_CIVIC` to configure the
clinics separately. `VITE_BOOKING_URL` remains supported as a Graceville
fallback. Do not put VisionVPM passwords, API keys, or client/patient data in
the website.

References:

- [Vetstoria's VisionVPM integration](https://www.vetstoria.com/integrations/visionvpm/)
- [Covetrus VisionVPM software](https://software.covetrus.com/apac/veterinary-solutions/visionvpm-veterinary-software/)

## Deploying to cPanel

The GitHub Actions workflow builds the app and deploys `dist/` over explicit
FTPS on port 21 whenever
you push to `main`. In this repository's GitHub settings, add these Actions
secrets for the clinics' cPanel FTP account:

- `FTP_PASSWORD` — the shared `git-actions` FTP account password

The workflow uses the `git-actions@kommunity.com.au` username and both deploy
paths are relative to its `public_html/` starting directory:
`fivewaysvet.com.au/` and `civiccentrevets.com.au/`. Confirm that the account
has access to both folders. Back up existing site files before the first deploy.

Optional Actions variables can configure booking links and the Google Sheets
tabs:

- `VITE_BOOKING_URL_GRACEVILLE`
- `VITE_BOOKING_URL_CIVIC`
- `VITE_STAFF_CSV_URL`
- `VITE_CLINICS_CSV_URL`
- `VITE_GUIDES_CSV_URL`
- `VITE_GLOSSARY_CSV_URL`

`VITE_BOOKING_URL` is also supported as a legacy booking link for Graceville.
Clinic, guide, and glossary sheet URLs already have defaults configured.
The deployment uses explicit FTPS on port 21, as supported by cPanel.
The Apache rewrite rule in `public/.htaccess` keeps React Router pages working
when visitors open or refresh a page directly.
