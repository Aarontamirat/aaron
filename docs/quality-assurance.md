# Quality assurance

Verified on **4 November 2026** against the local production build.

| Check | Result |
| --- | --- |
| ESLint | Passed, no errors or warnings |
| TypeScript | Passed |
| Contact unit tests | 9 passed; validation, spam checks, configuration, provider acceptance/failure, local/shared rate limiting |
| Playwright browser tests | 8 passed |
| Production build | Passed; homepage and all 6 case studies statically generated |
| Production dependency audit | 0 known vulnerabilities (`npm audit --omit=dev`) |
| Browser console | No application errors during inspected navigation |
| Responsive layouts | No horizontal overflow at 320, 390, 768, 1024, and 1440px |
| WCAG scans | No axe violations on homepage and all 6 case studies, at desktop and mobile sizes |
| CV | Valid PDF response and actual successful browser download |
| Metadata and assets | Sitemap, robots, OG image, icon, and all 6 project screenshots return HTTP 200 |

Browser coverage includes project filters, keyboard skip navigation, mobile disclosure navigation and Escape dismissal, case-study links, PDF download, contact field errors and email-draft behavior, same-origin enforcement, honeypot and timing checks, honest 503 delivery-unavailable responses, and rate-limit responses.

## Lighthouse

Chrome Lighthouse **13.6.0**, default mobile emulation, against http://127.0.0.1:3000:

| Category | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

Measured first contentful paint: **1.0s**; largest contentful paint: **1.0s**; total blocking time: **40ms**; cumulative layout shift: **0**. These are local laboratory measurements, not production field Core Web Vitals. Hosting conditions, visitor hardware, and networks affect real results.

The full HTML/JSON reports and desktop/mobile screenshots are preserved locally in `.artifacts/` and excluded from deployment/source control.

## Remaining configuration and evidence limits

- Resend credentials were not supplied. The current UI uses a validated email draft plus direct email links; it makes no delivery claims. Provider success/failure was tested with mocked responses. A real delivery test requires a verified sender and configured deployment secrets.
- For multiple server instances, configure the documented Upstash Redis credentials for shared rate limiting.
- The CV has no organization-linked official employment title or dates. The exact experience total is intentionally omitted. See `content-sources.md` before updating this information.
- LinkedIn automated fetching timed out. Its owner-provided profile URL is preserved. The broken library demo URL is omitted. LeaveFlow’s public frontend is reachable, but authorized application workflows were not tested with private credentials.
- Full development-dependency audit reports moderate advisories in transitive lint tooling. Runtime dependencies have no reported vulnerabilities; no forced major-version overrides were used.
