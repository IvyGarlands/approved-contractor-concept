/**
 * page.ts — the things more than one page needs, in one place.
 *
 * This build is ten pages rather than one, and the fastest way to make a
 * ten-page concept look amateur is to let the nav, the licence figures or the
 * promise list drift apart between them. Nothing here is copy the client would
 * edit — that lives in `src/content/`. This is the structural furniture that
 * every page reads from the same source (CLAUDE.md §3).
 */
import { SITE, LICENCE } from "../config/site";

/** Primary navigation. Mirrors their own information architecture. */
export const NAV_LINKS = [
  { label: "Siding", href: "/siding" },
  { label: "Windows", href: "/window-replacement" },
  { label: "Paint & coating", href: "/paint-texture-coating" },
  { label: "Roofing", href: "/roofing" },
  { label: "Our work", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * The four checkable facts under the homepage hero.
 *
 * Every one is verifiable from a public source, which is the entire point of
 * putting them above the fold. The homeowner count is the ONLY client-published
 * figure here and it is rendered exactly as they state it — "3,000+", not
 * "over 3,000" and not rounded (input/facts.txt §7).
 */
export const HERO_FACTS = [
  { value: "CSLB #952272", label: "Current and active" },
  { value: "Since 2010", label: "Licensed in California" },
  { value: "$25,000", label: "Contractor's bond" },
  { value: "3,000+", label: "Homeowners served" },
];

/**
 * The licence record card.
 *
 * Read off the CSLB register on 2026-08-12 and held in site.ts, so the card,
 * the FAQ answer and the footer cannot disagree. The status row is the only
 * emphasised field — it is the one the whole page exists to show.
 */
export const RECORD_FIELDS = [
  { label: "Status", value: LICENCE.status, emphasis: true },
  { label: "Licence number", value: "952272" },
  { label: "Business name on record", value: LICENCE.businessName },
  { label: "Classification", value: LICENCE.classification },
  { label: "Entity", value: LICENCE.entity },
  { label: "Issued", value: LICENCE.issued },
  { label: "Expires", value: LICENCE.expires },
  { label: "Address on record", value: LICENCE.address },
  {
    label: "Contractor's bond",
    value: `${LICENCE.bondAmount} · ${LICENCE.bondCompany}`,
  },
  { label: "Workers' compensation", value: LICENCE.workersComp },
  { label: "Qualifying individual", value: LICENCE.qualifier },
];

/**
 * "Our Promise To You" — VERBATIM from their homepage. Do not paraphrase, do
 * not tighten, do not fix the em dashes. This is the best copy on their site
 * and it is already in the right voice.
 */
export const PROMISES = [
  "You won't have to chase us down — we get back to you lightning fast.",
  "We'll always show up on time. You'll never have to wonder if or when we're coming.",
  "We take the time to educate you — your project won't start until your questions are answered.",
  "You'll find us after your project is done. We are a local company and will always be around when you need us.",
];

/**
 * "Treating Every Customer Like They're #1" — also verbatim, also theirs.
 * Used on the About page.
 */
export const DIFFERENTIATORS = [
  {
    title: "Reliable Installation",
    body: "We stay on the cutting edge of technology and manufacturer's best practices so you know the job is done right the first time.",
  },
  {
    title: "No Surprises",
    body: "We can't stand it when people over-promise and underdeliver. That's why we don't do gimmicks or pushy upsells — we give you the best price from the start.",
  },
  {
    title: "Proven Track Record",
    body: "Over 10 years in business — we're a local company and will be around when you need us.",
  },
];

/**
 * Service area, verbatim from their "Areas We Serve" page. Not expanded, not
 * tidied into "Southern California", not given a radius we cannot support.
 */
export const COUNTIES = [
  "Los Angeles County",
  "San Diego County",
  "Orange County",
  "Ventura County",
  "San Bernardino County",
  "Riverside County",
];

export const CITIES = [
  "Anaheim",
  "Calabasas",
  "Carlsbad",
  "Chula Vista",
  "Del Mar",
  "El Cajon",
  "Encinitas",
  "Encino",
  "Escondido",
  "Huntington Beach",
  "Irvine",
  "La Jolla",
  "La Mesa",
  "Long Beach",
  "Los Angeles",
  "Oceanside",
  "Ontario",
  "Pasadena",
  "Riverside",
  "San Bernardino",
  "San Diego",
  "San Marcos",
  "Santee",
  "Sherman Oaks",
  "Studio City",
  "Tarzana",
  "Ventura",
  "Vista",
  "West Hills",
  "Woodland Hills",
];

/** Convenience — every page puts the number in front of someone. */
export const CALL_HREF = `tel:${SITE.phoneHref}`;

/**
 * How a review's source is credited under the quote.
 *
 * The collection stores an enum, and rendering it raw produced "via Direct",
 * which reads like a system field leaking onto the page. Everything except
 * "Direct" is a real platform name and reads correctly with "via"; "Direct"
 * means the business published it on their own site, so it gets said properly.
 *
 * Attribution is never dropped — a quote whose provenance is not stated is
 * indistinguishable from an invented one, which is the whole reason `source`
 * is a required field (CLAUDE.md §11).
 */
export function sourceLabel(source: string, via: string): string {
  return source === "Direct"
    ? "Shared with us directly"
    : `${via} ${source}`;
}
