---
name: blog-verify
description: Verify DealDock blog articles and free tools before founder review. An independent, sceptical fact-check subagent per piece (with legal, tax, vendor-fairness, tool, language and template modules), then registry update, type check, tests, production build, automated page checks (canonical, schema, FAQ parity, share images, internal links, CSV) and visual checks at desktop and 390px. Use after blog-write, for "fact-check the blog", "verify the articles", "check the new posts", or before blog-publish.
---

# Blog verification

Nothing reaches a founder without this. In November 2026 every piece had 9–20+ real errors fixed here: wrong menu paths, misattributed tax circulars, a superseded court ruling, a calculator rounding bug, a real brand used as an example.

## Step 1: independent fact-check agents (parallel)
- One **fresh** `general-purpose` background agent per 1–3 articles. Give risky pieces their own agent: law, tax, named vendors, tools with maths, regional language.
- Compose each prompt from `factcheck-prompts.md`: **Base** plus the modules that apply. Fill in the file list, the worktree path, the dev-server port if one is running, and the allowed internal-link list from `src/lib/blog-posts.ts`.
- You can start fact-checking finished pieces while other writers are still working, but don't touch tracked files until every agent has reported.
- Usage limits or stalls: resume with SendMessage; don't respawn.
- Collect every report. "Needs founder decision" and "for a lawyer/CA" items go into `REVIEW-NOTES.md` (see `blog-publish`).

## Step 2: registry and code
- Update `src/lib/blog-posts.ts` with the final titles and descriptions from the writer reports, and set `inLanguage` for non-English posts.
- CSV or other downloads: make sure `.gitattributes` has `public/templates/*.csv -text`, so CRLF survives.
- Run `timeout 300 npx tsc --noEmit -p .` and any tool tests (`node --test scripts/test-*.mjs`).

## Step 3: production build and automated checks
1. Stop any server using `.next` in this worktree (Windows locks the folder and builds hang). Find PIDs with `netstat -ano | grep ":<port> " | grep LISTENING`, then `taskkill //PID <pid> //T //F`.
2. `MARKETING_SITE_LIVE=true npm run build`. Every new page should prerender as static (○ or ●).
3. Serve it with `MARKETING_SITE_LIVE=true npx next start -p 3473` in the background, then run `node scripts/verify-blog.mjs http://localhost:3473`. It checks canonical, noindex, BlogPosting/WebApplication data, FAQ schema = visible FAQ, share image status, em dashes on the page, all internal links, and the CSV's BOM and CRLF. Fix everything it reports.

## Step 4: visual checks (don't skip)
- **Page tops at 390px:** headless Chrome won't go below ~500px wide, so load the page in a 390px iframe:
  ```
  printf '<body style="margin:0"><iframe src="URL" style="width:390px;height:844px;border:0"></iframe></body>' > frame.html
  "C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 --screenshot=out.png --window-size=600,900 file:///…/frame.html
  ```
  Then crop to 390px wide with sharp.
- **Specific elements** (templates, tables, the calculator): text-fragment URLs don't scroll inside iframes, so use a Playwright element screenshot with `require("C:/code/dealdock-app/node_modules/playwright")`, `chromium.launch({ channel: "chrome" })`, viewport 390×844, then `page.locator("div[class*=tableWrap]").first().screenshot(...)`. Also check that `document.documentElement.scrollWidth > innerWidth` is false.
- Desktop at 1280px for the blog index, one article and each tool.
- **Look for:**
  - no sideways page scroll (tables scroll inside their own wrapper);
  - templates readable;
  - FAQ accordion and pilot card present;
  - no marker or highlighter styling (Anshu dislikes it);
  - no overflowing headings.

## Step 5: read it yourself
Read each article's opening, its DealDock section and one template. Ask:
- Does it answer the question within ~150 words?
- Does it sound like a person who has helped creators?
- Would a sceptical creator on a phone act on it?

If not, send it back to its writer with SendMessage and specific notes.

Then hand off to `blog-publish`.
