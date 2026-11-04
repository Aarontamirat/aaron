# Aaron Tamirat — Personal Portfolio

A complete Next.js App Router portfolio with an editorial graphite/blue design, a lightweight SVG systems illustration, six statically generated case studies, authentic project assets and CV, and an optional server-side email integration.

## Run locally

Use Node.js 24 LTS and npm.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. For a production preview:

```sh
npm run build
npm start
```

## Edit content

All professional content lives in **`src/content/portfolio.ts`**.

| Change | Configuration |
| --- | --- |
| Name, title, email, location, links | `portfolio` top-level fields and `socials` |
| Introduction, professional biography | `portfolio.hero`, `portfolio.about` |
| Employment details and dates | `portfolio.experience` |
| Education | `portfolio.education` |
| Technology groups and practical context | `portfolio.skills` |
| Engineering approach | `portfolio.approach` |
| Credentials and verification links | `portfolio.certifications` |
| Availability, work arrangements, relocation | `portfolio.availability`; unconfirmed preferences remain empty |
| Contact invitation | `portfolio.contact` |
| CV | `portfolio.resume.url` and `filename` |
| Projects and every case-study section | `projects` array |

Conversation topics are shared between the content and validation in `src/lib/contact-validation.ts`; update `contactTopics` there if needed.

To add a project, add a complete `Project` entry to the array, give it a unique slug, and put its authentic image in `public/projects/`. Its route and sitemap entry are generated automatically. `liveUrl`, `github`, `additionalSource`, and `demoNote` are optional. Omit unavailable links. The first two projects receive the featured presentation; the remaining projects use compact editorial rows. Update the display number when changing order.

Replace **`public/cv/Aaron_Tamirat_CV.pdf`** with an updated authentic PDF when needed. Setting `portfolio.resume.url` to `null` changes CV actions to a genuine email request. The existing PDF was recovered intact from Aaron’s public portfolio repository; it was not generated or rewritten.

Design tokens are in `src/app/tokens.css`. Layout, responsive styles, interactions, and reduced-motion rules are in `src/app/globals.css`. Fonts are served locally through `next/font/local`.

## Contact email delivery

Copy `.env.example` to `.env.local`, then configure:

```dotenv
RESEND_API_KEY=your_server_side_resend_key
CONTACT_FROM_EMAIL=Aaron Portfolio <contact@your-verified-domain.com>
CONTACT_TO_EMAIL=aarontamirat99@gmail.com
```

The sender domain must be verified in Resend. The recipient defaults to `portfolio.email`. Secrets never use the `NEXT_PUBLIC_` prefix. Set the environment variables **before building**, because the static homepage chooses its contact presentation at build time.

With credentials, the form validates on the client and server, displays sending/success/error states, and sends a plain-text email through Resend with the visitor’s email as the reply address. Success is returned only after the provider responds successfully with a message ID. Provider acceptance does not guarantee final inbox delivery; confirm your sending domain and delivery logs after deployment.

Without credentials, the form deliberately offers **Open email draft**. It validates the message and opens a prefilled `mailto:` draft for the visitor to send in their email app. It never reports that a message was sent. The API returns 503 if delivery is not configured. A direct email link and copy-email button remain available.

Spam controls include a honeypot, form age checks, strict JSON/body-size limits, same-origin checks, and a five-attempt/15-minute limiter. The default limiter is local to a server process. For distributed/serverless production, configure both `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to use an atomic, shared Redis limiter. Only hashed client identifiers are used as rate-limit keys. Deploy behind a trusted proxy that overwrites `x-real-ip`/`x-forwarded-for` (such as Vercel). If using another host, configure its proxy headers accordingly. The portfolio itself needs no application database.

## Deploy

This project supports Vercel or a Node.js host running `npm run build` and `npm start`. It is not an HTML-only export because `/api/contact` needs a server runtime.

1. Import the project into the host using the Next.js preset.
2. Set `NEXT_PUBLIC_SITE_URL` to the final production origin.
3. Add the optional email and Redis environment values.
4. Build and deploy.
5. Confirm the CV, case-study routes, sitemap, and a real email submission with your configured sender.

`src/app/layout.tsx` defines titles, canonical URLs, social metadata, and Person/WebSite JSON-LD. Sitemap and robots routes are generated from the content. `src/app/opengraph-image.tsx` generates the sharing image. Security response headers are defined in `next.config.ts`.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Browser tests use installed Google Chrome. Change `launchOptions.channel` in `playwright.config.ts` if needed, or install Playwright Chromium and remove the channel setting. Build first; the suite starts or reuses a production preview on port 3000. The contact fallback/API assertions assume email credentials are absent. Unit tests mock delivery; they never send real email.

The browser suite covers all case studies and metadata endpoints, real PDF downloads, keyboard and mobile navigation, project filtering, validation and spam controls, five viewport widths, reduced motion, and WCAG accessibility scans on the homepage and every case study.

See **`docs/content-sources.md`** for the evidence behind the professional content and information still needing confirmation, and **`docs/quality-assurance.md`** for verified test coverage and Lighthouse results. Local research and QA captures are ignored in `.research/` and `.artifacts/`.
