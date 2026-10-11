# I'm OK blog playbook (getimok.app/blog)

Read this before writing any guide. BLOG_PLAN.md says what to write and when. BRAND.md has the product facts and voice; everything there applies here too.

## What the blog is for
- Help real people with the problem they searched for, fully, on one page. Rankings follow usefulness; never write for a keyword.
- Show, where it genuinely fits, how I'm OK helps (reminders on WhatsApp for the people you love; they tap Done and you know). Most of each guide must be useful even to someone who never uses I'm OK.
- Audience: UK first (British English, UK services and examples). Many readers are adult children looking after parents, couples and flatmates sharing a home, parents of teenagers, and people who live alone.

## Voice
- Warm, plain, practical. Write like a thoughtful friend who has been through it, not like a brochure.
- British English spelling (organise, colour, mum).
- Short paragraphs (1 to 4 sentences). Vary sentence length. Use "you" and "your mum" rather than "the user".
- Never use the long dash character (the em dash, U+2014) or the en dash (U+2013) in sentences. Use a full stop, comma, colon or brackets instead. Hyphens in words like "long-term" are fine.
- Avoid AI-sounding filler: "In today's fast-paced world", "navigating", "delve", "it's important to note", "game-changer", "seamless", "unlock", "embark", "landscape", "elevate", "in conclusion", "whether you're X or Y". No rhetorical question openers.
- Light formatting: bold only for a few key words per section, never whole sentences.
- Honest about limits. If something isn't possible (for example, WhatsApp can't remind another person for you), say so plainly.

## Trust (E-E-A-T without a named author)
- Every guide is "By the I'm OK team"; the engine adds the byline box and links to /about (who we are, editorial policy).
- Back facts with trusted, original sources and link to them in the text where the fact is used: NHS (nhs.uk), NHS Specialist Pharmacy Service, Age UK, Carers UK, Alzheimer's Society, Mind, GOV.UK, Health and Safety Executive (hse.gov.uk), RSPCA, PDSA, Blue Cross, Citizens Advice, Royal Voluntary Service, Independent Age, police.uk.
- Before linking, open the page and check it exists and says what you claim. Never link to a page you haven't checked. Never link to competitors' blogs as sources.
- List 2 to 5 sources in the frontmatter `sources:` field (they show at the end of the guide).
- Never invent statistics, studies, quotes, case studies or testimonials. No "studies show" without a linked source. No made-up people presented as real; examples use clearly illustrative names (John, Emily, Sam, Mum, Dad).
- Health: practical everyday help only, never medical advice. Anything about doses, changing medicines, symptoms or crushing tablets points to the GP, pharmacist or NHS 111. Never suggest giving medicine without consent. Emergencies: call 999.
- Safety: calm and practical, never fear-mongering. I'm OK is not an emergency service; the safety word alerts the people you chose, not the police.
- Show real experience where it's honest: what tends to work in families, common mistakes, small practical details. Never claim professional credentials.

## Shape of every guide
- Length: 1,500 to 2,500 words for pillars and how-tos; 1,000 to 1,500 for seasonal and short guides. Long because it's complete, never padded.
- `title`: the reader's question or task, under 65 characters, sentence case. `description`: one or two sentences, 120 to 155 characters, saying what they'll get.
- Opening: 2 or 3 short paragraphs that answer the core question straight away, then say what the guide covers.
- A `:::takeaways` box near the top (3 to 5 bullets).
- Body: H2 sections that each answer one real question people ask (these become the table of contents). Use H3 for steps or sub-points.
- At least two of these per guide, where they genuinely help: a table (comparisons, schedules, checklists), `:::cards` (options or ideas side by side), a numbered list of steps, a `:::tip` or `:::note`.
- CTAs: one `:::cta` near the end (before the FAQ), and at most one more mid-article, only where I'm OK genuinely fits what the reader is trying to do.
- A `:::faq` section near the end with 4 to 6 questions people really ask, each answered in 2 to 4 sentences that stand on their own.
- Internal links: 2 to 4 links to other published guides (relative links like `/blog/medication-reminders-elderly-parent`), plus the cluster's pillar guide if this isn't it. Link to `/` (the home page) at most once in the text. Only link to guides that are already published (check blog/index.json dates).
- External links: 2 to 6 to trusted sources (above), in the sentence where the fact is used.
- Product facts must match BRAND.md exactly (Free and Plus features; never quote prices in the blog).

## File format
Each guide is `blog/posts/<slug>.md`:

```
---
title: How to remind an elderly parent to take their medication
seoTitle: (optional, if the page title should differ from the H1)
description: One or two sentences, 120 to 155 characters.
cluster: parents
date: 2026-10-19
updated: 2026-10-19
image: /blog/img/medication-reminders-elderly-parent.png
imageAlt: A WhatsApp reminder that says "Take your tablet" with a Done button
sources: Medicines tips for carers, NHS | https://www.nhs.uk/...; Managing medication, Carers UK | https://www.carersuk.org/...
---

Opening paragraphs...

:::takeaways
- ...
:::

## A question people ask
Text, lists, tables, [links](https://...).

:::cards
### Option one
One or two sentences.
### Option two
One or two sentences.
:::

:::tip Optional title
Text.
:::

:::cta Optional headline
Optional one-line text.
:::

:::faq
### A question?
The answer.
:::
```

Supported Markdown: `##`/`###` headings, paragraphs, `-` and `1.` lists, `**bold**`, `*italic*`, links, images, `>` quotes, tables with a header row and `|---|` separator. Blocks: `:::takeaways`, `:::tip`, `:::note`, `:::cards`, `:::faq`, `:::cta`. Don't use raw HTML.

Then add the guide to `blog/index.json` (newest first is not required; the site sorts):
`{ "slug": "...", "title": "...", "description": "...", "cluster": "parents", "date": "2026-10-19", "updated": "2026-10-19", "image": "/blog/img/<slug>.png", "imageAlt": "..." }`

A guide appears on the site from its `date` (UK time), so guides can be written ahead.

Hero image: add an entry to `blog/img/heroes.js` (kicker = cluster name, a short title of 2 to 6 words, and a 1 to 3 bubble WhatsApp chat that shows the guide's idea), then run `cd tools && npm i && cd .. && NODE_PATH=$(npm root -g) node tools/render-blog.js`. Look at the PNG and fix anything clipped.

## Clusters
Defined in `blog/clusters.json` (id, name, title, blurb, intro, pillar). Every guide belongs to one cluster. Keep each cluster's pillar guide updated with links to its newer guides (add a line in its "Related guides" section and bump `updated`).

## Publishing rhythm
- Three guides a week: Monday, Wednesday and Friday (dated those days).
- Follow BLOG_PLAN.md in order. Seasonal guides are pinned to their dates.
- When the plan runs out, keep going: pick the next useful question in a cluster that has fewer guides, check it isn't already covered (blog/index.json), add it to the bottom of BLOG_PLAN.md marked "(added)", and write it. Rotate clusters so no cluster gets two guides in a row. Add the yearly seasonal guides from the calendar in BLOG_PLAN.md each year, updating last year's version instead of duplicating it when one exists (same slug, new `updated` date).
- Every three months, refresh one older guide per cluster: check links and facts still hold, improve it, bump `updated`.
