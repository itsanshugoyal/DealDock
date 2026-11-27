# Lessons from the first article batch (7–8 Nov 2026)

Seven articles and a free calculator were produced by 8 writer agents plus 5 independent fact-check agents. The founders judged the quality "really good". This file records why, and what went wrong operationally, so the blog skills reproduce the result.

## What made the quality high

1. **One shared brief, short per-article assignments.** Every writer read the same brief (voice, research rules, DealDock claim rules, markup, quality gate, report format). Each assignment added only the slug, the single question to answer better than anyone, the searches to win, a "Cover" list, and known primary sources to verify. See `.claude/skills/blog-write/`.
2. **"The question it must answer better than anything else online."** Each assignment framed one question and a winnable search cluster (weak page one, creator with money at stake, answer shows the job DealDock does).
3. **Primary sources only, opened, not remembered.** Writers verified every claim on Meta's Help Center or developer docs, government or legislature sites, and vendors' own docs, and reported what they couldn't verify instead of guessing.
4. **A separate, sceptical fact-checker per piece.** Its prompt said the writer "may be wrong" and asked for the smallest edits. Each pass fixed 9–20+ real errors: wrong menu paths, misattributed tax circulars, a superseded court ruling, a calculator rounding bug, a real brand name used as an example. Never skip this step.
5. **Specialist checkers for risky topics.** Tax and legal (194R, MSMED, US freelance laws), vendor fairness (named competitors), and tools/calculators (maths, tests, accessibility) got their own focused prompts.
6. **Honest DealDock framing.** "The pilot is built to…", one short "where a tool helps (and where it doesn't)" section that says when a spreadsheet is enough, and the CTA card left to the layout.
7. **Human voice rules.** Open with a recognisable creator situation, answer plainly within ~150 words, typographic quotes, no em dashes, the banned-phrase list, plus an `avoid-ai-writing` pass. Labelled, obviously invented examples.
8. **Visual and technical verification.** Production build, `scripts/verify-blog.mjs` (canonical, schema, FAQ parity, share image, internal links, CSV), and element screenshots at 390px.

## Research shortcuts that worked
- Instagram Help Center pages (help.instagram.com/<id>) render with JavaScript. Read the same article at https://www.facebook.com/help/instagram/<id>, but link the help.instagram.com URL.
- Meta Business Help text is in the raw HTML; plain curl works where WebFetch sees only a title.
- Government sites (incometaxindia, MeitY, PIB, leginfo, ilga, parliament.uk) often return 403 to tools. Use the department's own explainer pages, official gazette copies, or reputable full-text mirrors, and say so. **Never spoof a browser user agent to get past a bot check.** The permission classifier blocks it, and it bypasses the site's intent.
- ManyChat's site returns 403 to tools; cite Meta's partner case-study page instead.

## Operational pitfalls (and fixes)
- **Usage limits and stalls.** Long parallel runs hit the 5-hour limit, and some agents stalled with "no progress for 600s". Their work is saved: resume each with SendMessage ("Resume: you were stopped at X; your file Y is saved; finish Z and report"). Don't respawn from scratch.
- **Slow type checks.** With 8 agents plus a dev server, `tsc` took ~20 minutes and agents waited on background monitors. Tell agents to run `timeout 300 npx tsc --noEmit -p .` in the foreground.
- **Windows file locks.** A running `next start` or `next dev` locks `.next`, and a concurrent `npm run build` hangs. Stop servers (by port with netstat and taskkill) before building.
- **Don't change tracked files while agents run.** Switching branches or editing the registry mid-run breaks their dev-server checks. Restructure branches only after every agent reports.
- **Merging before checks finish.** `gh pr checks --watch | head` exits early; never pipe `--watch` through `head`. Wait for all checks, then merge (infrastructure only).
- **CRLF in CSV templates.** The repo has `core.autocrlf=input`; `.gitattributes` keeps `public/templates/*.csv -text`.
- **Hinglish posts.** Set `inLanguage: "hi-Latn"` in the registry entry.
- **Highlighter look.** Anshu dislikes marker or highlighter styling. Use plain heavy type for emphasis.
- **Text-fragment URLs don't scroll inside iframes.** For phone screenshots of specific elements, use Playwright's element screenshot (this repo has no Playwright; `C:/code/dealdock-app/node_modules/playwright` with `channel: "chrome"` works).
- **Security.** Never write vulnerability details into public commits or PRs (the repo is public). Report them privately.

## Product questions the batch surfaced (still open unless updated)
- Replies sent through Meta's API move a chat to the General tab. Confirm the pilot's behaviour before claiming anything.
- Meta's 24-hour and 7-day (Human Agent) windows apply to API sends. Human Agent needs App Review.
- The calculator's own modelling ranges (organic 30d up to 20%, paid 90d up to 100%, exclusivity 90d up to 150%) await a founder decision; the default currency is INR.
