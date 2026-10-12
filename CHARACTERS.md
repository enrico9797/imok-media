# I'm OK characters: style guide

Read this before making any comic, illustrated post or video with the I'm OK cast. (Created 12 Oct 2026.)

## Why characters
- The cast gives I'm OK a face without using real people. Drawn people are honest about being drawn; realistic AI people are not, and they cost trust.
- A recurring cast gives people a reason to come back for the next strip.
- One piece of work covers everything: a 4-panel comic carousel for Instagram and Facebook, then the same panels animated into a 10 to 15 second vertical video for Reels, TikTok and YouTube Shorts.

## The style: 2D, for everything
- **2D flat illustration** with a soft paper grain, for posts and videos alike. Not 3D.
  - Why not 3D: AI 3D characters drift towards the generic animated-film look, which reads as AI and as borrowed; 2D is easier to keep consistent and leaves room for text.
  - Revisit only if the 2D videos clearly underperform after a month, and then switch the whole cast at once, never mix.
- Line: rounded, medium weight, warm dark brown (#3A2A1E), never pure black.
- Scenes use a calm, muted palette: cream walls, sage green, beige and warm wood. Bright orange is for Tick and small accents only, never whole rooms or clothes.
- Colour: the brand palette. Cream background #FFF7EE, warm sand #F3E6D6, I'm OK orange #FF8A3D with the gradient to #FFB347, ink #2A1D14, WhatsApp green #25D366 only for phone screens and Done buttons.
- Proportions: natural (head about one sixth of the body). No giant limbs, tiny heads or corporate-flat people.
- Faces: simple, expressive eyes and eyebrows; the joke is carried by expressions.
- Backgrounds: simple, warm, domestic (a kitchen, a garden, a sofa, a London flat), a few objects, lots of cream space.
- Phones: drawn simply, but the screen shows a real-looking WhatsApp bubble added afterwards (see Text).

## The cast

| Character | Look (keep identical every time) | Personality | Running joke | Never |
|---|---|---|---|---|
| **Emily** | Mid 30s, copper-red hair tied up in a loose, effortless messy updo with face-framing strands, freckles, smooth skin (no lines), oatmeal-beige cropped cardigan over a cream top, wide-leg burgundy corduroy trousers, white trainers, small gold hoops | Kind, busy, slightly late, worries about her parents, quietly stylish | Has 47 phone alarms, all called IMPORTANT | Shown as a nag or a bad daughter |
| **Mum** | Early 70s, short silver bob, red-framed glasses on a beaded chain, teal cardigan, pearl earrings | Sharp, independent, funny, proud | "I know, I know" to every reminder, then taps Done with a flourish | Confused, frail, or the butt of the joke |
| **Dad** | Mid 70s, bald on top with white sides, white moustache, flat cap outdoors, green knitted vest over a checked shirt | Cheerful, competitive, happiest in the garden | Treats the Done button as a game he intends to win | Forgetful as the punchline, or helpless with technology |
| **Tick** | The I'm OK app icon come to life: a small rounded orange speech bubble with a white tick for a mouth-and-eyes face, tiny arms, no legs (floats) | Helpful, upbeat, a bit smug | Pops out of phones; does the nagging so Emily doesn't have to | Talks in long sentences (one short line at most) |

### Adding characters
The cast can grow when a story needs it: a son, friends, a flatmate, a partner. Two rules keep it consistent:
- Anyone who appears more than once gets a row in the table above and a reference sheet in `characters/` before their second appearance.
- Keep the main cast small (six at most), so people recognise them. One-off extras can appear without a sheet, drawn in the same style, and never as the focus of the strip.

Ready to add when a story calls for them:
- **Sam**, Emily's son, 15: hoodie, headphones round his neck, always on his phone. For the "text me when you're home" and homework stories.
- **John**, Emily's friend and neighbour, early 40s, lives alone with a dog. For the daily I'm OK, bin day and "look out for each other" stories.

Names always come from the brand list (Emily, John, Sam, Mum, Dad). Never Enrico's real family or friends.

## Rules for the stories
- Mum and Dad are the clever ones. The joke is the situation, Emily, or Tick.
- Never about falls, illness, loneliness, confusion or death. Never suggest I'm OK replaces a call or a visit.
- Every strip shows the product working: a reminder arriving, a Done tap, "✅ done at 9:04am" or a missed alert.
- Four panels: set-up, problem, I'm OK, payoff. The last panel can carry the line "Start free at getimok.app".

## Text
- **No words inside AI images.** Speech bubbles, captions and WhatsApp messages go on afterwards (tools/render.js for posts, CapCut for videos), so the spelling and the product are always right.
- Speech bubbles: white, rounded, ink text in the post font. WhatsApp bubbles: the house chat style used in posts.

## Keeping the characters consistent
1. Each character has a reference sheet: front view, three-quarter view, side view, and three expressions (happy, unimpressed, surprised), plus their colours. Sheets live in `characters/` in this repo.
2. Every new image starts from the sheets as reference images, never from a text prompt alone.
3. Keep the master prompt below word for word and only change the scene line.
4. Check every image against the sheet before using it: hair, glasses, clothes, colours. Regenerate if anything drifted.

### Master prompt (images)
> 2D flat illustration with soft paper grain texture, rounded medium-weight warm dark brown outlines, natural proportions, simple expressive faces, warm cream background (#FFF7EE) with sand and orange accents, cosy British home setting, plenty of empty space, no text, no letters, no logos. Characters exactly as in the reference sheets. Scene: [one sentence: who, where, doing what, which expression].

Avoid: 3D, photorealism, anime, big-limbed corporate flat style, text or letters, extra fingers, different hair or clothes from the sheets.

## Video
- Vertical 9:16, 10 to 15 seconds, 3 to 5 shots of 2 to 4 seconds each.
- Each shot starts from an approved panel image (image to video), with small, slow movements: a head turn, a phone lighting up, Tick popping out. No big camera moves.
- Captions burnt in (most people watch without sound). Optional British AI voice for Emily; no lip-sync at first.
- Light music, low. End card: the I'm OK logo and "Start free on WhatsApp".
- Made in CapCut (Pro), exported once, posted to Reels, TikTok and Shorts.

## Cadence
- From Monday 19 October: two comics a week (Wednesday and Thursday slots) in place of regular posts. See PLAN.md.
- Video once the first comics exist; then one video a week, made from that week's best comic.

## Reference sheet prompts (run once per character, 16:9)
Shared start: "Character turnaround and expression sheet, 2D flat illustration with soft paper grain, rounded medium-weight warm dark brown (#3A2A1E) outlines, natural adult proportions, flat brand colours (cream #FFF7EE background, sand #F3E6D6, orange #FF8A3D), left: four consistent full-body views in a row (front, three-quarter, side, back), right: three head-and-shoulders expressions (happy, unimpressed, surprised), identical original character in every view, plain cream seamless background, professional model sheet presentation,"
Shared end: "no text, no letters, no logos, no watermark, no frame borders, no other characters, no props, not 3D, not photorealistic, not anime, no big-limbed corporate flat style, original character not resembling any real person or existing character."

- **Emily:** "woman in her mid thirties with smooth clear skin, no wrinkles, a light dusting of freckles, copper-red hair tied up in a loose messy updo bun with soft face-framing curtain strands and loose wisps, small gold hoop earrings, light oatmeal-beige cropped knit cardigan with tortoiseshell buttons over a plain cream top, wide-leg dark burgundy-brown corduroy trousers, white trainers, slim build, warm, kind, slightly amused expression, no orange clothing,"
- **Mum:** "woman in her early seventies, fair skin with soft smile lines, short neat silver bob, red-framed glasses on a beaded chain, small pearl earrings, teal cardigan over a cream blouse, navy trousers, comfortable brown loafers, upright confident posture, sharp amused expression,"
- **Dad:** "man in his mid seventies, ruddy fair skin, bald on top with short white hair at the sides, full white moustache, green knitted sleeveless vest over a blue-and-white checked shirt, brown corduroy trousers, sturdy brown shoes, flat tweed cap held in one hand, stocky build, cheerful competitive grin,"
- **Tick:** "small friendly mascot shaped like a rounded orange speech bubble (#FF8A3D to #FFB347 soft gradient) with a tail at the bottom left, a simple white tick shape forming its smile, two small dot eyes, tiny stubby arms, no legs, floating slightly above the ground with a soft shadow, about the size of a hand, upbeat and slightly smug,"

Generate each sheet, check it against the table above, save the chosen one as `characters/<name>-sheet.png`, and use it as the reference image for every scene.

## Approved reference sheets (12 Oct 2026)
Previews are in `characters/` (emily-sheet.jpg, mum-sheet.jpg, dad-sheet.jpg, tick-sheet.jpg). Full-size originals are in Higgsfield; pass these job IDs as reference images (role image_references, model gpt_image_2_5) in every scene:
- Emily: aa301b61-9570-4b52-93fd-dd0525ce865a (red updo, beige cardigan, burgundy trousers; approved 12 Oct. Earlier versions are retired)
- Mum: d21f2e51-46db-4e17-b25a-4922d04a35d0
- Dad: a604a7be-b495-4d50-bd4f-37691cf57644
- Tick: 72649bd3-df1c-4a72-b662-d26cf1bab67a

## How to make a comic (the process used for the first one)
1. Write the 4 slides: a caption per slide (heading with one gradient phrase, optional sub line), any speech bubble, and the WhatsApp bubble for the payoff.
2. Generate each panel with gpt_image_2_5, aspect 4:5, quality medium, passing the reference sheet job IDs above, using the master prompt plus "Keep the top quarter of the image as plain empty cream space for a caption".
3. Check every panel against the sheets; regenerate any that drifted.
4. Add the text with HTML (Fraunces 700 headings, gradient italic phrase, Inter sub lines, white speech bubbles with a brown outline, house WhatsApp bubble), 1080x1350, slide counter top right, the last slide with the I'm OK logo and "Start free at getimok.app".
5. Save as posts/<date>/<story>-N-name.jpg (a new file name for any changed image, so the GitHub cache never serves an old one), push, and schedule the carousel in Metricool (Instagram and Facebook) from the raw GitHub URLs. Mark Instagram isAiGenerated true.
