/**
 * site.ts — every site-wide fact, in one place.
 *
 * AMBUSH CONCEPT BUILD — Approved Contractor, Inc., Canoga Park CA.
 *
 * EVERY VALUE BELOW IS EITHER CLIENT-PUBLISHED OR EMPTY. Nothing here is
 * inferred, rounded or filled in to make a section look complete. Where the
 * operator has not supplied a fact, the value is "" and the section that would
 * have used it does not render (CLAUDE.md §11).
 *
 * OPEN ITEMS the operator must close before this is sent — see the OPEN ITEMS
 * block at the bottom of src/pages/index.astro for the full list.
 */

/** Drives the JSON-LD @type and the default recipe set. See CLAUDE.md §10a. */
export type Vertical =
  // hospitality & lifestyle
  | "restaurant"
  | "venue"
  | "bakery"
  | "salon"
  | "studio"
  // trades & professional services
  | "auto"
  | "autodetail"
  | "homeservices"
  | "contractor"
  | "medspa"
  | "dental"
  | "legal"
  | "financial"
  | "vet";

/** schema.org type per vertical. All inherit from LocalBusiness. */
export const SCHEMA_TYPE: Record<Vertical, string> = {
  restaurant: "Restaurant",
  venue: "EventVenue",
  bakery: "Bakery",
  salon: "HealthAndBeautyBusiness",
  studio: "SportsActivityLocation",
  auto: "AutoRepair",
  autodetail: "AutoWash",
  homeservices: "HomeAndConstructionBusiness",
  contractor: "GeneralContractor",
  medspa: "MedicalBusiness",
  dental: "Dentist",
  legal: "Attorney",
  financial: "FinancialService",
  vet: "VeterinaryCare",
};

export interface DayHours {
  /** 24h "HH:MM". Omit both for a closed day. */
  open?: string;
  close?: string;
  /** Optional note shown instead of times, e.g. "Kitchen closes 9pm". */
  note?: string;
}

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/**
 * HOURS ARE DELIBERATELY EMPTY.
 *
 * Approved Contractor does not publish opening hours anywhere the operator
 * could find them, and inventing "Mon-Fri 8-5" for a contractor is exactly the
 * kind of small invented fact that gets a homeowner standing outside a locked
 * unit on a Saturday.
 *
 * Consequences, both intentional:
 *   - `openingHours()` in lib/schema.ts filters out any day with no open/close,
 *     so NO openingHoursSpecification is emitted at all. The schema stays valid.
 *   - The homepage passes showHours={false} to LocationContact, so HoursTable
 *     never renders.
 *
 * Fill this in and flip showHours back on the moment the operator has them.
 */
export const HOURS: Record<Weekday, DayHours> = {
  monday: {},
  tuesday: {},
  wednesday: {},
  thursday: {},
  friday: {},
  saturday: {},
  sunday: {},
};

export const WEEKDAYS: readonly Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const SITE = {
  /* ---- identity ---------------------------------------------------- */
  name: "Approved Contractor",
  legalName: "Approved Contractor, Inc.",
  /**
   * NOT their published tagline. "We Treat Your Home Like It's Our Own!" is
   * the most-used line in the trade and organises nothing. This one states the
   * category boundary instead — a proposal in their voice, replaced by their
   * own words the moment they engage (CLAUDE.md §11).
   */
  tagline:
    "Siding, windows, stucco and roofing. The part of your house everyone else sees.",
  vertical: "contractor" as Vertical,

  /** Production URL. Cloudflare Pages gives you a *.pages.dev to start with. */
  url: "https://ambush-approved-contractor.pages.dev",

  /* ---- contact ------------------------------------------------------ */
  phone: "(877) 792-9082",
  /** E.164, for the tel: href. Never format this one. */
  phoneHref: "+18777929082",
  /** Not published by the client. Empty means LocationContact omits the block. */
  email: "",

  address: {
    street: "9015 Eton Avenue, Unit D",
    locality: "Canoga Park",
    region: "CA",
    postalCode: "91304",
    country: "US",
  },

  /**
   * NULL ON PURPOSE. The map facade builds its query from the address string
   * above, so it is already exact; `geo` is used only by the LocalBusiness
   * JSON-LD. Rather than eyeball a lat/lng for a specific unit on Eton Avenue
   * and ship a pin on the wrong building, this stays null and schema.ts's
   * `if (SITE.geo)` guard drops the property.
   *
   * OPEN ITEM: paste the real coordinates from the Google Business Profile.
   */
  geo: null as { lat: number; lng: number } | null,

  /** Deep link for the directions button. Address query, so Google resolves it. */
  mapsUrl:
    "https://maps.google.com/?q=9015+Eton+Avenue+Unit+D+Canoga+Park+CA+91304",

  /* ---- hours --------------------------------------------------------
     Defined as HOURS above — empty, deliberately. See the note there.     */
  hours: HOURS,

  /* ---- forms ---------------------------------------------------------
     Empty during a demo: ContactForm renders a clearly disabled state
     rather than silently posting into the void.                            */
  FORM_ENDPOINT: "",
  FORM_ACCESS_KEY: "",

  /* ---- social --------------------------------------------------------
     The intake says they are listed on Angi, HomeAdvisor, Houzz and Yelp but
     supplied no URLs. Guessing a profile URL would put a wrong link in the
     page AND a wrong `sameAs` in the structured data, so all four stay empty.  */
  social: {
    instagram: "",
    facebook: "",
    yelp: "",
    tripadvisor: "",
  },

  /* ---- i18n ----------------------------------------------------------
     English only. The Valley has a large Spanish-speaking homeowner base and
     bilingual would be a genuine differentiator here — but it costs a full
     content pass and every word of it would have to be the operator's, not a
     machine translation on a licensed trade's advertising. Flagged in the
     OPEN ITEMS block rather than half-done.                                 */
  defaultLocale: "en",
  locales: ["en"] as const,

  /* ---- SEO defaults --------------------------------------------------- */
  ogImage: "/og-default.jpg",
  twitterHandle: "",

  /**
   * Browser-chrome colour (Android address bar, PWA splash). --b-700, Valley
   * slate.
   *
   * This is the ONE place the palette is allowed to exist outside tokens.css,
   * and only because `<meta name="theme-color">` and public/site.webmanifest
   * are both read by the browser OUTSIDE the document's CSS and cannot see a
   * custom property. Keep this value and the manifest's `theme_color` in step
   * with --b-700 when the palette changes; nothing else may copy a hex.
   */
  themeColor: "#2e4354",

  /* ---- ambush mode ---------------------------------------------------- */
  isConcept: true,
  studioName: "Looking Glass Labs",
  studioUrl: "",

  /* ---- regulated vertical: CONTRACTOR ---------------------------------
     California B&P 7030.5 requires the licence number on advertising, so this
     is not decoration — it belongs on the page.
     #952272 is the number Approved Contractor publishes on their own site. It
     ships verbatim and nothing is added to it: no "bonded", no "insured", no
     "fully licensed" — the client makes none of those claims and we do not
     originate one (CLAUDE.md §11).

     OPEN ITEM: confirm on the CSLB licence lookup before this is sent.       */
  licenseNumber: "CA Lic. #952272",
  legalDisclaimer: "",
} as const;

export type SiteConfig = typeof SITE;
