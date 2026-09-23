# Chigozirim Favour — Portfolio

A responsive React and TypeScript portfolio with project case studies, category filtering, keyboard-accessible dialogs, and LinkedIn contact links.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173`).

## Check and build

```sh
npm run typecheck
npm run build
npm run preview
```

The production build is generated in `dist/`. It can be hosted on Vercel, Netlify, Cloudflare Pages, or another static host. No backend or environment variables are required.

## Update content

- `src/data.ts`: name, GitHub, LinkedIn, optional email, project descriptions, status, and links.
- `src/experience-data.ts`: leadership, internship, showcase award, selected merged pull requests, and certificates.
- `src/Experience.tsx` and `src/experience.css`: experience, evidence holders, contributions, and credentials sections.
- `src/App.tsx`: introduction, about, working approach, contact, and page structure.
- `src/ProjectVisual.tsx`: project screenshots and fallback illustrations.
- `src/GitHubCalendar.tsx` and `src/github-calendar.css`: live GitHub activity calendar and styling.
- `src/styles.css`: design and responsive layouts.
- `index.html`: page title, description, social metadata, and fonts.

Email is the primary contact, with a copy-address control and links to LinkedIn and GitHub. No placeholder resume download is displayed.

All five projects use screenshots captured from their live websites and include direct website links. To update a screenshot, replace its file in `public/projects` or change the project's `screenshot` path in `src/data.ts`. The content distinguishes prototypes, Testnet software, and ongoing development; a live landing page does not imply every backend capability is production-ready.

The project descriptions were drafted from reviewed repository evidence. Personal roles in shared projects and live business results still need confirmation before adding more specific ownership or impact claims.

## Before publishing

### Add experience photos and certificates

Save approved images in `public/evidence/`. In `src/experience-data.ts`, set an entry's `evidence.src` to `/evidence/your-image.jpg`, provide descriptive `alt` text, and update its caption. The dashed holder becomes an image that opens at full size. There is no public upload form.

The Fuuud showcase result and roles currently use the owner's supplied information. Exact school/association name, community chapter, Women Techmakers title, internship specialism, and dates still need confirmation. No dates or employment at AWS/Google have been inferred. Fuuud's showcase achievement is presented separately from the newer health project's case study because the showcased version has not been confirmed.

The `credentials` array is intentionally empty. Two labeled certificate holders appear until actual credential names, issuers, images, and optional verification URLs are added. Placeholder holders do not assert that any particular certification was earned.

The GitHub calendar fetches public activity for `Gozirimdev` from the GitHub Contributions API on page load. The provider caches results for one hour. Visitors can switch between the last year and individual years, explore daily counts, and retry if the service is unavailable. No API token is required.

The three selected pull requests appear in an expandable section below the calendar. They were checked on 23 September 2026: each was authored by `Gozirimdev` and marked merged. Their displayed titles come from GitHub.

Set the final site URL and use absolute Open Graph URLs once the domain is known. Verify project links and any newly added contact details. Fonts are self-hosted, with their licenses in `public/fonts`. A PNG social card is included alongside its SVG source.
