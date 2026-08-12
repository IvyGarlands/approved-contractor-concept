// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config/site.ts";

/**
 * Engine defaults. Per-client changes should be limited to:
 *   - `site` (comes from src/config/site.ts)
 *   - the i18n `locales` list, if the client is not bilingual
 * Everything else is engine policy and should not be edited per project.
 *
 * https://astro.build/config
 */
export default defineConfig({
  site: SITE.url,
  output: "static",
  trailingSlash: "ignore",

  // Built-in i18n routing. Default locale stays un-prefixed (/about), the
  // second locale is prefixed (/es/about). Adding a language is a content
  // task: drop in `lang: 'es'` entries and the routes exist.
  i18n: {
    defaultLocale: SITE.defaultLocale,
    // Spread: SITE is `as const`, and Astro's Locales type is mutable.
    locales: [...SITE.locales],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  /**
   * NO SITEMAP ON A CONCEPT BUILD. Lock 2 of 4 (the others are robots.txt
   * Disallow, the six-directive robots meta, and X-Robots-Tag in both
   * public/_headers and public/vercel.json).
   *
   * A sitemap is an active invitation to crawl, and it survives being ignored
   * elsewhere: robots.txt Disallow stops a crawl but a sitemap URL discovered
   * some other way still hands over a tidy list of every page. The integration
   * is gated on the same SITE.isConcept flag that drives the badge, the robots
   * meta and robots.txt, so the four locks cannot drift apart.
   *
   * It switches itself back on the moment isConcept goes false for a real
   * client — nothing to remember.
   */
  integrations: SITE.isConcept
    ? []
    : [
        sitemap({
          i18n: {
            defaultLocale: SITE.defaultLocale,
            locales: Object.fromEntries(SITE.locales.map((l) => [l, l])),
          },
          filter: (page) => !page.includes("/404"),
        }),
      ],

  image: {
    // AVIF first, WebP fallback, original as last resort — handled per-usage by
    // <Picture>. Sharp is the build-time encoder; no runtime image service.
    responsiveStyles: true,
    layout: "constrained",
  },

  build: {
    /**
     * Inline ALL CSS rather than Astro's default "auto".
     *
     * Our total CSS is ~10KB gzipped, and "auto" left three separate
     * render-blocking <link> requests in <head>. On these sites the
     * overwhelming majority of visitors see exactly one page on a phone, so
     * the cross-page cache benefit of external CSS never materialises while
     * the extra round-trips are paid every time.
     *
     * Revisit if a project's CSS ever exceeds ~20KB gzipped — past that the
     * inlined bytes start costing more than the requests saved.
     */
    inlineStylesheets: "always",
  },

  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
