import type { APIRoute } from "astro";
import { SITE } from "../config/site";

/**
 * robots.txt, generated rather than dropped in /public.
 *
 * A static file could not tell the difference between the two modes this
 * engine ships, and getting it wrong is expensive in both directions: a
 * concept demo that allows crawling can get indexed under the real business's
 * name, and a live client site carrying `Disallow: /` is invisible.
 *
 * So it reads the same `SITE.isConcept` flag that already drives the concept
 * badge and the noindex meta. One switch, three consistent outcomes.
 *
 * Prerendered — this is a static build and there is no server to run it on.
 */
export const prerender = true;

export const GET: APIRoute = () => {
  const body = SITE.isConcept
    ? [
        "# Concept redesign. Not the live site for this business.",
        "# Nothing here should ever be indexed under their name.",
        "User-agent: *",
        "Disallow: /",
        "",
      ].join("\n")
    : [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${SITE.url}/sitemap-index.xml`,
        "",
      ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
