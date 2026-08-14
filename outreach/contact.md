# Contact dossier — Approved Contractor, Inc.

Gathered 2026-08-14, for outreach purposes. Everything below is either
independently verified (marked ✅) or clearly flagged as unverified. Nothing
here is guessed. Where a fact conflicts across sources, both sources are
shown and the conflict is not resolved by picking one — see facts.txt for
the same discipline applied to the site build.

---

## Phone numbers

**✅ Real line: (877) 792-9082**
Confirmed on four independent sources that agree with each other:
- CSLB state license register (business phone of record)
- Their own Contact and About pages
- Their own Facebook Page "About" tab
- The `tel:` link actually wired into every page of the current site, as of
  today (2026-08-14)

**⚠️ (866) 215-2968 — almost certainly a call-tracking number, not a second line**
This number appeared in the site's header on 2026-08-12 and does **not**
appear anywhere on the site today, two days later. The site's HTML loads
**CallRail** (`callrail` appears in the page source), which is a dynamic
number insertion service — it swaps the displayed phone number based on
where the visitor came from (a Google Ads click sees a different number than
a direct visit, for attribution). That is the far more likely explanation
than a second real line, and it is consistent with the number vanishing
between visits. I have not called it to confirm where it routes, and I
wouldn't recommend doing that just to test it.

**Practical takeaway:** call or text (877) 792-9082. It's the number in the
state record, and it's what the site itself calls its number today.

Addendum, same day: on a mobile viewport the header showed a **third**
number, (866) 558-2367 — different from both the (866) 215-2968 seen on
2026-08-12 and the (877) number on every other check. Three different
displayed numbers across three visits is strong confirmation this is
CallRail dynamic insertion doing its job (matching a number to a device
type or session), not three real lines. It doesn't change the
recommendation.

---

## Email

**✅ jgreen@approvedcontractorinc.com**
Published on their Facebook Page's "About" tab (Page Transparency /
Business Info section), alongside the matching phone number and address —
not guessed, not pattern-matched. This directly closes an open item from the
site build, where no email could be found anywhere on their own website.

I did not find any other published email (no `info@`, `sales@`, or
`contact@` address anywhere on their site, Facebook, or listings).

---

## Social media

### Facebook — ✅ active, real, worth using
**facebook.com/ApprovedContractorInc** — linked from their own site footer.
- 402 followers, following 1
- Most recent post at time of check: **7 hours ago** (a post about
  pass-through windows). This is a genuinely active page, not an abandoned
  one.
- Shows "Open now," price range `$$`, and a Facebook recommendation score of
  **92% (12 reviews)** — a fourth, different review number from the ones
  already catalogued in facts.txt CONFLICT #4. Recorded here for awareness
  only; it should never be quoted anywhere, for the same reason none of the
  others are.
- **DM status: could not verify.** Facebook shows a full "Message" button
  only to logged-in users, and I did not log in to check. Given how active
  the page is, DMs are likely open, but this is a guess, not a finding.

### Instagram — not found
No Instagram is linked from their own site, their Facebook page, or in
search results. If a handle exists, it is not surfaced anywhere I could
check. **Do not use Instagram for outreach** — there is nothing to message.

### TikTok — not found
Same as above. No evidence of an account anywhere.

### YouTube — a channel exists, activity unconfirmed
Linked from their site footer: `youtube.com/channel/UCNyPyDkIrUK0oDBovdfEY7w`.
I could not load the channel page to check upload frequency or subscriber
count in this session. Not a channel for outreach either way — it's a
one-way broadcast, not a messaging surface.

---

## People

**✅ Jared Green — Owner, President, and CEO**
Confirmed across CSLB (qualifying individual on the license), their own
About page, BBB principal contact listing, LinkedIn, and — most usefully —
named directly and warmly by customers in reviews without prompting
(Kimberly A.'s testimonial: *"Jared made it easy to say yes… He got me an
amazing deal, and took care of financing the project in a few minutes"*;
also named by reviewers Jeffrey K. and Tracy G.). He appears to still run
consultations personally.

A LinkedIn profile exists at `linkedin.com/in/jaredgreenapprovedcontractor`
with 500+ connections, attended University of Arizona. I did not open it to
avoid connection-request noise; the search snippet was enough to confirm he
is a real, findable, professionally active person — which matters for tone
calibration.

**No portrait photo of Jared is published anywhere I could find** — not on
the site, not on Facebook, not on LinkedIn's public preview. This was
already flagged as an open item on the concept site itself.

**⚠️ Justin Charney — Regional Manager**
Appears only on the BBB principal-contacts listing, a single unconfirmed
source. Does not recur in any review. Not worth naming in outreach; the
email should go to Jared, who is the person actually being thanked by name
in reviews.

**No other staff names recur** across the review set gathered in
`reviews.txt`. This is a Jared-run operation from the outside looking in.

---

## Address

**✅ 9015 Eton Avenue, Unit D, Canoga Park, CA 91304**
Matches across the CSLB register, their Contact page, and their Facebook
page. This is the address to use if a letter or a dropped-off printed piece
is ever considered, though the recommendation below is not to do that.

---

## Their existing site — technical read

**approvedcontractorinc.com**

- **Registrar:** GoDaddy.com, LLC. Domain first registered 2010-09-22,
  renewed most recently 2025-09-23, currently set to expire 2026-09-22 — so
  it will come up for renewal again about a month after this outreach lands.
  Not a lever to pull, just useful context for timing.
- **DNS / edge:** Proxied through Cloudflare (nameservers `dana.ns.cloudflare.com`
  / `marek.ns.cloudflare.com`). This masks the real hosting origin from a
  simple IP lookup, which is normal and not suspicious on its own.
- **CMS:** WordPress 7.0.4, on the **Ubertheme/Genesis** framework, built
  with **WPBakery Page Builder**.
- **Plugin stack (from the site's own `wp-json` REST index):** WP Rocket
  (paid caching), iThemes/Solid Security, Redirection (301 redirect
  management — usually installed during an SEO migration), Yoast SEO,
  Gravity Forms, Genesis Blocks, Envira Gallery **Pro** (the `envira-ai`,
  `envira-convert` namespaces are paid-tier features), and REST namespaces
  named `siteground-optimizer` / `siteground-settings` — plugins that only
  make sense on **SiteGround** hosting specifically.
- **The site was modified as recently as 2026-08-12** (`Last-Modified`
  header), two days before this was written, and it carries project photos
  uploaded as recently as this past spring and summer. This is not a
  stale, forgotten site.

**Verdict: this is vendor-managed, not self-managed, and not neglected.**
Nobody sets up WP Rocket, Solid Security, Redirection, and SiteGround's own
optimizer plugin by accident, and the site is being actively updated with
new project photos. Somebody — most likely a local SEO or web management
retainer, not an in-house employee — is actively touching this site on a
regular basis.

**Why this matters for outreach:** the "we already have someone" objection
(handled in `notes.md`) is not a hypothetical here. It is the single most
likely objection given what this technical read shows. The pitch should not
assume an empty seat.

**One curiosity, not a fact to use:** the site's own WordPress settings
describe the business as servicing *"Greater Los Angeles, San Diego and the
San Francisco Bay Area."* The Bay Area is not mentioned anywhere in their
public-facing copy, service area list, or city list (`facts.txt` §8). This
could be a stale field from an old template, an expansion they haven't
announced yet, or an agency's boilerplate. Not something to reference in
outreach — flagged here in case it comes up in conversation.

---

## Best channel to reach them, ranked

1. **Email — jgreen@approvedcontractorinc.com.** Goes directly to the owner,
   by name, at an address he published himself. It's asynchronous, so it
   doesn't interrupt a job site, and it's the easiest place to include a
   link and a short deck without it feeling like a phone pitch. This is the
   primary recommendation.
2. **Text message to (877) 792-9082.** The number is his real line and this
   trade runs on the phone — his own site literally promises *"we get back
   to you lightning fast."* A text is low-pressure and easy to leave unread
   without guilt, which matters given this is unsolicited. Good as a
   same-day follow-up to the email, or as the first touch if you'd rather
   start there.
3. **Facebook DM or comment.** Third choice. The page is genuinely active
   (posted 7 hours ago at last check), so a message would likely be seen —
   but DM-open status is unverified, and a cold DM to a business page reads
   more like a customer inquiry than a note from another local person,
   which works against the tone this is supposed to have.

**Not recommended:** Instagram or TikTok (nothing found to message), calling
the (866) number (likely just a tracking line, adds nothing), or a physical
letter (slow, and the ask doesn't need that much formality).

---

## Best time of day to make contact

No hours are published anywhere on their own site — this is a genuine gap,
already flagged in `facts.txt` §3 and CONFLICT #6, and it isn't invented
here either. Third-party aggregators (unverified, disagreeing with each
other on Saturday) suggest **Monday–Friday, 8:00 AM–8:00 PM, Saturday
8:00 AM–5:00 PM**, which at minimum tells you this is a business that
expects contact deep into the evening, not a 9-to-5 office.

Practical read: Jared is a working owner who still runs consultations
himself, and this is a residential exterior trade — most homeowner calls
land evenings and Saturday mornings, so estimating and admin work most
likely happens **weekday mornings before the job-site day gets going**, and
again in the **early evening** after crews wrap. If sending an email,
**Tuesday–Thursday, around 7:30–8:30 AM** is a reasonable bet: early enough
to be near the top of an inbox, on a weekday when a contractor is more
likely to be doing desk work than driving between job sites.

This is a reasonable inference, not a verified fact. Nothing about the
outreach depends on getting this exactly right — the whole point of email
and text is that timing matters much less than for a phone call.
