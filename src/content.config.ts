/**
 * content.config.ts — every piece of client content, schema'd.
 *
 * Zod schemas are the guardrail: a missing price, a testimonial without a
 * source, an image without alt text is a BUILD ERROR, not something a client
 * discovers. That is deliberate (CLAUDE.md §10).
 *
 * Every collection carries `lang`, so adding Spanish is a content task rather
 * than an engineering one.
 */

import { defineCollection, z, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { SITE } from "./config/site";

const langs = SITE.locales as readonly [string, ...string[]];
const lang = z.enum(langs).default(SITE.defaultLocale);

/**
 * AN EMPTY COLLECTION IS A NORMAL STATE, NOT A WARNING.
 *
 * On this project `projects`, `testimonials` and `people` are all empty and
 * three of them are empty ON PURPOSE — no before/after pairs, no verbatim
 * reviews and no named owner were supplied, so those sections must not ship
 * (CLAUDE.md §11). Astro's glob loader warns on an empty directory, and §7
 * requires a warning-clean build, which left alone pushes you toward the wrong
 * fix: deleting the schema, or worse, inventing content to fill it.
 *
 * So: glob when there is something to glob, and hand back an empty loader when
 * there is not. Dropping the first JSON file in switches it back on with no
 * config change.
 *
 * Ported from the engine, which grew this after the Setiba build hit the same
 * wall for the same reason.
 */
/* Resolved from this file's own URL, not from process.cwd(): Astro evaluates
   the content config inside a Vite module runner where `process` is not yet
   initialised. */
const CONTENT_ROOT = fileURLToPath(new URL("./content/", import.meta.url));

const hasContent = (dir: string, pattern: RegExp): boolean => {
  const base = resolve(CONTENT_ROOT, dir);
  if (!existsSync(base)) return false;
  return readdirSync(base, { recursive: true }).some((f) =>
    pattern.test(String(f))
  );
};

const empty = (dir: string) => ({
  name: `empty:${dir}`,
  load: async () => {},
});

const ANY = /\.(md|json|ya?ml)$/;

const src = (dir: string) =>
  hasContent(dir, ANY)
    ? glob({ pattern: "**/*.{md,json,yaml,yml}", base: `./src/content/${dir}` })
    : empty(dir);

/**
 * Photo fields use Astro's `image()` schema helper, so every referenced file is
 * processed by astro:assets — AVIF/WebP with explicit dimensions — rather than
 * shipped raw.
 *
 * `alt` is enforced by `requireAlt` below: a photo without alt text fails the
 * BUILD, it is not something a client discovers. Decorative images pass
 * `alt: ""` and must justify themselves in `altNote` (CLAUDE.md §5).
 */
const photoFields = ({ image }: SchemaContext) => ({
  photo: image().optional(),
  alt: z.string().optional(),
  altNote: z.string().optional(),
});

/**
 * Structural stand-in for zod's RefinementCtx. Typed this way on purpose: `z`
 * is re-exported from `astro:content` as a value, not a namespace, and reaching
 * for `zod`'s own types would mean importing a transitive dependency that only
 * resolves because npm happens to hoist it.
 */
interface RefineCtx {
  addIssue(issue: {
    code: "custom";
    path: (string | number)[];
    message: string;
  }): void;
}

/** superRefine guard shared by every collection that can carry a photo. */
function requireAlt(
  data: { photo?: unknown; alt?: string; altNote?: string },
  ctx: RefineCtx
) {
  if (data.photo && data.alt === undefined) {
    ctx.addIssue({
      code: "custom",
      path: ["alt"],
      message:
        'alt is required whenever photo is set. Use alt: "" for a decorative image and say why in altNote.',
    });
  }
  if (data.alt === "" && !data.altNote) {
    ctx.addIssue({
      code: "custom",
      path: ["altNote"],
      message:
        'altNote is required when alt is "" — state why this image is decorative.',
    });
  }
}

/* ---------------------------------------------------------------------- */


const services = defineCollection({
  loader: src("services"),
  schema: (ctx) =>
    z
      .object({
        lang,
        name: z.string(),
        /**
         * An abbreviated name for tight contexts. Added for HeroElevation,
         * whose callout labels sit in a fixed annotation margin — the same
         * reason a real drawing says "PAINT & COATING" on the leader and
         * spells it out in the legend. Falls back to `name`.
         */
        short: z.string().optional(),
        summary: z.string(),
        /** Longer body for a detail page or an expanded card. */
        detail: z.string().optional(),
        price: z.string().optional(),
        /** "from", "per visit", "per hour" — rendered next to price. */
        priceNote: z.string().optional(),
        /** Key into the inline icon set, not a file path. */
        icon: z.string().optional(),
        /** Its own page, where one exists. Added for the multi-page build. */
        href: z.string().optional(),
        /** One-line proof point pulled from the client's own copy. */
        note: z.string().optional(),
        order: z.number().default(0),
        featured: z.boolean().default(false),
        ...photoFields(ctx),
      })
      .superRefine(requireAlt),
});


const projects = defineCollection({
  loader: src("projects"),
  schema: (ctx) =>
    z
      .object({
        lang,
        title: z.string(),
        summary: z.string().optional(),
        /** Before/after pairs for remodelers and detailers. */
        beforePhoto: ctx.image().optional(),
        beforeAlt: z.string().optional(),
        location: z.string().optional(),
        year: z.string().optional(),
        /**
         * Which trade(s) this job demonstrates. Added for the multi-page build:
         * /siding, /window-replacement, /paint-texture-coating and /roofing
         * each show their own work, and filtering a shared collection is the
         * only way that stays true when a project is edited. A job usually
         * carries more than one — most of these houses got siding AND windows.
         */
        trade: z
          .array(z.enum(["siding", "windows", "stucco", "coating", "roofing"]))
          .default([]),
        order: z.number().default(0),
        ...photoFields(ctx),
      })
      .superRefine((data, c) => {
        requireAlt(data, c);
        if (data.beforePhoto && data.beforeAlt === undefined) {
          c.addIssue({
            code: "custom",
            path: ["beforeAlt"],
            message: "beforeAlt is required whenever beforePhoto is set.",
          });
        }
      }),
});

const testimonials = defineCollection({
  loader: src("testimonials"),
  schema: z.object({
    lang,
    /** Real review text, verbatim. Never authored by us — CLAUDE.md §11. */
    quote: z.string(),
    author: z.string(),
    rating: z.number().min(1).max(5).optional(),
    /** Where it came from. Required so we can never launder an invented one.
        "GuildQuality" added for build 005: it surveys customers directly rather
        than accepting open submissions, and it publishes the negative responses
        too, which is exactly why it is the source this build leans on
        (input/reviews.txt §2). "Direct" here means published by the business on
        their own site. */
    source: z.enum([
      "Google",
      "Yelp",
      "Facebook",
      "TripAdvisor",
      "GuildQuality",
      "Direct",
    ]),
    date: z.coerce.date().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: src("faq"),
  schema: z.object({
    lang,
    question: z.string(),
    answer: z.string(),
    order: z.number().default(0),
  }),
});

const people = defineCollection({
  loader: src("people"),
  schema: (ctx) =>
    z
      .object({
        lang,
        name: z.string(),
        role: z.string(),
        /** Client-supplied, verbatim. Never invented — CLAUDE.md §11. */
        credentials: z.array(z.string()).default([]),
        bio: z.string().optional(),
        order: z.number().default(0),
        ...photoFields(ctx),
      })
      .superRefine(requireAlt),
});

/**
 * Credentials. CLIENT-PUBLISHED ONLY (CLAUDE.md §11) — never originated.
 *
 * Three fields added for build 005, all additive and all in service of one
 * problem: a row of eleven partner logos reads as desperate, and it also
 * cannot be shipped. The James Hardie, Andersen, Pella, Anlin and Owens
 * Corning marks are licensed to the BUSINESS for its own use, not to us for a
 * concept on our own domain (input/facts.txt §6). So `logo` goes unused here
 * and the credential has to carry itself in type instead — which means it needs
 * to say who granted it and what it actually means, or it is just a word.
 *
 *   group     which authority granted it, so the list can be read as a ledger
 *             rather than a badge wall
 *   meaning   one plain sentence. NOT marketing — a factual gloss on what the
 *             designation is. Where the honest answer is "we could not verify
 *             this", that is what it says.
 *   verifyUrl the public lookup, where one exists. This is the whole argument
 *             of the page: a credential you cannot check is a claim.
 *
 * Generalisation candidate: every trust-selling vertical wants this.
 */
const credentials = defineCollection({
  loader: src("credentials"),
  schema: (ctx) =>
    z.object({
      lang,
      label: z.string(),
      issuer: z.string().optional(),
      group: z.string().optional(),
      meaning: z.string().optional(),
      verifyUrl: z.string().url().optional(),
      logo: ctx.image().optional(),
      logoAlt: z.string().optional(),
      order: z.number().default(0),
    }),
});

const process = defineCollection({
  loader: src("process"),
  schema: z.object({
    lang,
    step: z.number(),
    title: z.string(),
    body: z.string(),
  }),
});


/**
 * Registered collections for THIS project.
 *
 * `menu`, `events` and `pages` are gone entirely, schema and all: they belong
 * to the hospitality family and a contractor has no menu, no event calendar
 * and no long-form inner pages. The engine keeps all three.
 *
 * The three that are registered and empty — `projects`, `testimonials`,
 * `people` — each warn on build, and that is the point. Those warnings are
 * this project's open items talking: no before/after pairs, no verbatim
 * reviews, no named owner. They clear themselves the moment the operator
 * drops a file in, and until then the build says so out loud every time.
 */
export const collections = {
  services,
  projects,
  testimonials,
  faq,
  people,
  credentials,
  process,
};
