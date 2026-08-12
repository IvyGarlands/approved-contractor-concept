# Brand archaeology — Approved Contractor, Inc.

Excavated 2026-08-12, before any palette, typeface or recipe was chosen.
Every observation carries its source. Hex values marked **sampled** were read
off their actual pixels, not eyeballed from a screenshot.

---

## 1. Colours actually in use

### Sampled from the wordmark itself

Their logo PNG was drawn to a canvas and its pixels counted
(`/wp-content/uploads/2020/03/approved-contractor-logo@2x.png`, 590×182).
Two colours account for essentially the entire mark:

| Sampled | Where | Share |
|---|---|---|
| **`#ae0f15`** | the APPROVED stamp — ink and frame | 22,666 px (dominant) |
| **`#231f20`** | the word "Contractor" | 4,353 px |

`#ae0f15` is a true scarlet with a trace of blue in it. `#231f20` is the classic
warm near-black of print work, not a blue-grey.

### Sampled from the live stylesheet

Computed styles across ~2,500 elements on the homepage:

| Sampled | Role on their site | Frequency |
|---|---|---|
| `#464c5a` | **all body copy and every heading** | 547 uses |
| `#ffffff` | reverse type, page ground | 150 |
| **`#aa0e00`** | announcement bar, buttons, headline accents, the divider rules | 143 |
| `#000000` | scrims and overlays | 110 |
| `#246282` | the sticky Live Chat / Text Us bar | 9 |
| `#5cbbed`, `#4b9cc6` | chat bar icons and hovers | 9 |
| `#1f262e` | footer ground | 7 |
| `#f7f7f7` | a faint alternating band | 2 |

### The finding that matters

**Their logo and their website do not use the same two colours.**

- Red: logo `#ae0f15` vs site `#aa0e00`. Close enough to look like the same
  colour and far enough apart to be wrong — the site's red has *no blue in it at
  all* (B=0) while the mark's does. Side by side the site red reads oranger.
- Ink: logo `#231f20` (warm near-black) vs site `#464c5a` (cool blue-grey).
  These are not the same family. The mark is printed; the site is drawn in
  Bootstrap's default text colour.

This is the single clearest piece of evidence that the site was built around the
logo rather than from it. **Resolved in the redesign by promoting the logo's
values and demoting the site's.** See §7.

The blues (`#246282`, `#5cbbed`) belong to a bolted-on third-party chat widget,
not to the brand. Discarded.

---

## 2. Type character

Not the exact fonts — those are unidentifiable from a rasterised logo — but the
genres, which is what carries across.

**In the wordmark, two genres, deliberately contrasted:**

1. **"APPROVED"** — heavy roman capitals with bracketed, slabby serifs, tightly
   set inside the stamp frame. Squared-off, weight-forward, official. The
   letterforms are conventional; the *distress texture over them* is doing all
   the character work.
2. **"Contractor"** — a **light, geometric, generously letterspaced** sans in
   title case. Circular `C`, `o`, `a`. Low stroke contrast. Quiet, modern,
   almost delicate, and set noticeably wider than the stamp.

The contrast between the two is the whole idea of the mark: a bureaucratic
rubber stamp landing on top of a calm modern name.

**On the site:** `Open Sans` for all 852 typed elements — headings, body,
buttons, everything. Bold for headings, normal tracking, no display face. That
is the WordPress theme default, not a decision. **There is no type identity on
the website at all.**

**Execution flaws, stated plainly so the fix is defensible:**

- The logo is a **590×182 raster PNG**. 26,406 of its 37,356 non-transparent
  pixels are partial-alpha — a very soft, mottled, anti-aliased edge. That is a
  stock distressed-stamp graphic, and it means the mark cannot be set large,
  cannot be printed sharply, and cannot be recoloured.
- The mark is otherwise technically fine: genuinely transparent, correct @2x.
- Nothing on the site echoes the wordmark's letterspacing, its two-genre
  contrast, or its red. The logo sits in the corner and the page ignores it.

---

## 3. Ornament and motif

| Motif | Evidence | Verdict |
|---|---|---|
| **The stamp frame** — a rounded-rectangle double rule enclosing APPROVED, rotated roughly −6°, with the ink broken and mottled | the wordmark | **The identity.** Carried across and rebuilt. |
| **The short red rule** — `red-line-01@2x.jpg`, a 202×3 px image used as a section divider, with a white counterpart `white-line-01@2x.jpg` for dark grounds | homepage, used 3× | **A real motif, shipped as a JPEG.** Carried across, rebuilt as a token. |
| **Numbered step badges** — `number-01…number-four-01@2x.png`, 80×80 filled circles | the four-step process section | Idea kept, artwork discarded. |
| **Five-star row** — `five-stars-white-01@2x.png` | under both testimonials | Discarded — it sits next to an unverifiable review count (facts.txt CONFLICT #4). |
| **Badge wall** — 11 partner and award logos in a row | homepage footer area | Idea kept, **artwork discarded entirely** — those marks are licensed to them, not to us. Set in type instead. |
| Trade-clipart service icons (a house, a window, a paint roller) | services tiles | Discarded. |

Four of the six motifs are shipped as **flattened raster images of things that
should be CSS**. A 202×3 pixel JPEG of a red line is the tell: this is a brand
with real ideas rendered by someone with no type or vector tooling.

---

## 4. Era and register

**Bureaucratic-official, with an anxious-homeowner reassurance layer on top.**

The register is stamps, licences, certifications, approvals, badges, numbers,
checkmarks — the visual language of *something having been checked*. It is not
rustic, not craft, not architectural, not luxury. It belongs to the filing
cabinet and the permit counter.

Sitting on top of that is a much softer, more anxious voice aimed straight at
someone who has been burned before.

---

## 5. Their voice (verbatim, their words)

**The fear they name out loud:**

> "Fed up with dishonest contractors?"
> "Frustrated With Your Home Exterior?"
> "Enough is enough. Don't waste any more time or money."
> "As homeowners ourselves, we understand how apprehensive you can feel when
> hiring a contractor…"

**The reassurance:**

> "We Treat Your Home Like It's Our Own!"
> "No Surprises"
> "we don't do gimmicks or pushy upsells — we give you the best price from the
> start"
> "You won't have to chase us down — we get back to you lightning fast."
> "We'll always show up on time. You'll never have to wonder if or when we're
> coming."
> "You'll find us after your project is done."
> "Treating Every Customer Like They're #1"
> "we answer your calls, email you back"

**Their own naming instinct:** the company is called **Approved Contractor** and
its logo is a rubber stamp reading **APPROVED**. Nobody arrives at that by
accident. The entire identity — name, mark, colour — is one idea: *this is the
one that has been checked.*

That instinct is completely correct and completely unexploited. The word
"approved" appears in their name and their logo and then **never appears again
anywhere on the page**. Their licence number is set at 11px in a footer.

---

## 6. What the redesign carries across

| Cue found | Carried across as | Kept / refined / changed |
|---|---|---|
| Stamp red `#ae0f15` (sampled from the mark) | `--b-600`, the brand red, **used as a dominant field colour rather than a 5% accent** | **Kept exactly.** Their own hex, unchanged. |
| Site red `#aa0e00` | dropped in favour of the logo's red | Changed — unified onto the mark. |
| Logo ink `#231f20` | `--n-900`, the ink ramp's anchor | **Kept exactly.** |
| Site ink `#464c5a` | `--n-600`, demoted to muted/secondary ink | Refined — kept in the system, no longer the voice. |
| Heavy slabby roman caps in "APPROVED" | **Source Serif 4** display, heavy, tight | Refined — same genre, drawn properly, and it is also the register of an official record. |
| Light geometric letterspaced sans in "Contractor" | **Outfit** for body, UI and every record field, tracked wide at small sizes | Refined — same genre, same feeling, real weights. |
| The two-genre contrast in the mark | the page's entire type logic: roman for what is said, geometric for what is recorded | Kept and made structural. |
| The stamp frame | rebuilt as vector, and it is the signature moment | **Kept.** See §7. |
| The 202×3 red rule JPEG | `--rule-*` tokens; a real element at any width, in brand or reverse | Refined — same motif, no image request. |
| Numbered step badges | numerals set in the display face, no circles | Refined. |
| Partner/award badge wall | typographic credential list | Changed — legal, not aesthetic. |
| Star rows and "800+ reviews" | removed | Changed — see facts.txt CONFLICT #4. |
| The word "approved" | the organising idea of the whole page | **Kept, and finally used.** |

**How much of the original survives:** the two colours are theirs, sampled from
their own mark and unchanged. Both type genres are theirs. The stamp is theirs.
The rule is theirs. The name, the voice and the central idea are theirs. What
was replaced is the *execution layer* — Open Sans, the raster clip-art, the JPEG
rules, the borrowed logos, and the blue chat widget. Someone who knows this
business should recognise it immediately.

---

## 7. The wordmark: redrawn, not reinvented

**Verdict: redraw.** There was never a question of replacing it — the idea is
excellent and it is the company's name made visible. What is wrong with it is
entirely execution.

**Kept:** the two-part lockup; APPROVED in heavy roman caps inside a
rounded-rectangle double-rule frame; the frame rotated off-axis; "Contractor"
below in a light, widely-tracked geometric sans; both original colours.

**Fixed:**

1. **Vector, not a 590px raster.** It now sets at any size, including the
   viewport-wide version in the signature moment.
2. **The distress texture is gone.** Stock mottling is what made it read as
   clip-art. The new mark gets its character from letterform, weight and the
   frame's proportion instead. A stamp that is *drawn* rather than *filtered*.
3. **The rotation is regularised** to a fixed −5.5°, expressed as a token, so
   the wordmark, the section marks and the signature stamp all sit at the same
   angle instead of three different accidental ones.
4. **The lockup is re-spaced.** In the original, "Contractor" collides with the
   frame's lower rule and the optical centres of the two words disagree.
5. **It stays legible at 24px**, which the distressed original does not.
6. **One red, not two.** `#ae0f15` everywhere.

---

## 8. Where the recipe had to bend

`design-recipes.md` **Built Well** is the contractor default and was the
starting point for the previous build. Their real cues override it on three
axes, and the differentiation log records this:

- Built Well is **warm greige, architectural, restrained, portfolio-as-art**.
  Their brand is **scarlet, bureaucratic, official**. The brand cue wins; the
  greige is gone entirely.
- Built Well treats brand colour as a **<5% accent**. Here red is a **dominant
  field**, because a stamp that appears once at 5% coverage is not a stamp.
- Built Well pairs a quiet serif with a neutral grotesque. Their mark demands
  **heavy roman + light geometric**, which is a sharper contrast than the recipe
  wants.

Recipe kept only its structural spine: trust architecture, process, credentials,
a real projects section.
