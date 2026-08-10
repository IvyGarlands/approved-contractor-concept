/**
 * content.ts — collection query helpers.
 *
 * Sections never call getCollection directly with ad-hoc filters; they use
 * these, so locale filtering and ordering behave identically everywhere.
 */

import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";
import { SITE } from "../config/site";
import type { Locale } from "../i18n/ui";

type Ordered = { order?: number };

/**
 * Entries for one locale, ordered.
 *
 * Falls back to the default locale when a collection has no entries for the
 * requested one — a half-translated site should show English content rather
 * than an empty section.
 */
export async function localized<K extends CollectionKey>(
  key: K,
  locale: Locale
): Promise<CollectionEntry<K>[]> {
  const all = await getCollection(key);
  const forLocale = all.filter((e) => (e.data as { lang: string }).lang === locale);
  const entries = forLocale.length
    ? forLocale
    : all.filter((e) => (e.data as { lang: string }).lang === SITE.defaultLocale);

  return entries.sort(
    (a, b) => ((a.data as Ordered).order ?? 0) - ((b.data as Ordered).order ?? 0)
  );
}

/*
 * `groupMenu` and its MenuGroup type lived here in the engine and have been
 * removed from this project along with MenuCards / MenuClassic / MenuLeaders /
 * EventsFeature and the `menu`, `events` and `pages` collections.
 *
 * They belong to the hospitality family. A contractor has no menu, no event
 * calendar and no long-form inner pages, and keeping them meant three
 * permanent "no files found" build warnings plus four dead components that
 * still had to typecheck against collections this project does not register.
 * The engine copy is untouched — this is a per-project trim, not an engine
 * change.
 */

/** Featured entries first, then the rest, capped. */
export function featuredFirst<T extends { data: { featured?: boolean } }>(
  entries: T[],
  limit?: number
): T[] {
  const sorted = [...entries].sort(
    (a, b) => Number(b.data.featured ?? false) - Number(a.data.featured ?? false)
  );
  return limit ? sorted.slice(0, limit) : sorted;
}
