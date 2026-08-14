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

  /**
   * Dev-only cross-origin allowance for proxied previews (defense-in-depth).
   *
   * Astro's dev server runs a Sec-Fetch middleware that returns 403
   * "Cross-origin request blocked" for cross-site subresource requests. It
   * only consults `security.allowedDomains` when the request carries an
   * `Origin` header — an entry with no `hostname` matches any origin. This
   * covers origin-bearing requests; the Vite plugin below covers the rest.
   *
   * `output` is "static", so `security` is inert for `astro build` — there is
   * no production server to loosen. If this engine ever moves to
   * `output: "server"`, remove this and the dev plugin below.
   */
  security: { allowedDomains: [{}] },

  vite: {
    plugins: [
      /**
       * Neutralize Astro's dev Sec-Fetch guard for proxied previews.
       *
       * The v0 preview serves the dev server through a rotating cross-site
       * origin. Astro's `secFetchMiddleware` blocks any cross-site *subresource*
       * (CSS/JS/images/fetch) and — crucially — falls through to a hard 403
       * "Cross-origin request blocked" whenever such a request has NO `Origin`
       * header, which `allowedDomains` cannot rescue. That is what surfaced in
       * the preview.
       *
       * Astro registers its guard with `middlewares.stack.unshift(...)`, i.e. at
       * the very front. To run ahead of it we return a post-hook from
       * `configureServer` (fires after Astro's `configureServer` body has
       * installed its guard) and `unshift` our own normalizer, which rewrites a
       * cross-site `Sec-Fetch-Site` to `same-origin` so the guard always calls
       * `next()`. Dev-only: Vite plugins do not run during `astro build`.
       */
      {
        name: "v0-preview-allow-cross-origin",
        apply: "serve",
        configureServer(server) {
          return () => {
            server.middlewares.stack.unshift({
              route: "",
              handle: (req, _res, next) => {
                const site = req.headers["sec-fetch-site"];
                if (
                  site &&
                  site !== "same-origin" &&
                  site !== "same-site" &&
                  site !== "none"
                ) {
                  req.headers["sec-fetch-site"] = "same-origin";
                }
                next();
              },
            });
          };
        },
      },
    ],
    build: {
      cssMinify: "lightningcss",
    },
  },
});
