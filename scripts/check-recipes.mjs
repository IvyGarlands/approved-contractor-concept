#!/usr/bin/env node
/**
 * check-recipes.mjs — proves every palette in docs/design-recipes.md is
 * actually shippable.
 *
 * A recipe that fails AA is worse than no recipe: it looks authoritative and
 * quietly poisons a project on day one. This extracts each recipe's declared
 * primitives, layers them over the real semantic mappings from tokens.css, and
 * runs the identical matrix that gates the shipping palette.
 *
 *   npm run check:recipes
 *
 * Note: recipes that are explicitly documented as dark-first (Precision Shop,
 * Nightlife) are checked against .on-dark as their PRIMARY context, because
 * that is how they are built.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  baseLayer,
  parseBlocks,
  parseDeclarations,
  checkContext,
  checkScrim,
} from "./lib/contrast.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const TOKENS = resolve(here, "../src/styles/tokens.css");
const RECIPES = resolve(here, "../docs/design-recipes.md");

/* Recipes documented as dark-first: their light context is the exception, so
   we check .on-dark as primary and skip the light-context assertions. */
const DARK_FIRST = new Set(["Precision Shop", "Nightlife", "Detail Bay"]);

/**
 * Integrity guard. A malformed colour literal (a truncated hex, a stray word,
 * a homoglyph pasted in from elsewhere) is invisible in a markdown table and
 * silently poisons a project on day one. Reject anything that is not exactly
 * #rrggbb before we get as far as measuring contrast.
 */
function assertWellFormed(md) {
  const bad = [];
  const lines = md.split("\n");
  lines.forEach((line, i) => {
    if (!/^--[\w-]+\s*:/.test(line.trim())) return;
    for (const decl of line.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      const [, name, raw] = decl;
      const value = raw.trim();
      if (!/color|^--[nba]-\d/.test(name) && !value.startsWith("#")) continue;
      if (value.startsWith("#") && !/^#[0-9a-f]{6}$/i.test(value)) {
        bad.push(`line ${i + 1}: ${name}: ${value}`);
      }
    }
    if (/[^\x00-\x7F]/.test(line)) {
      bad.push(`line ${i + 1}: non-ASCII character in a token declaration`);
    }
  });
  if (bad.length) {
    console.error("✗ Malformed colour literals in docs/design-recipes.md:\n");
    for (const b of bad) console.error(`  ${b}`);
    console.error("\nEvery primitive must be exactly #rrggbb.\n");
    process.exit(1);
  }
}

const base = baseLayer(readFileSync(TOKENS, "utf8"));
const rootBase = parseBlocks(base, ":root");
const onDarkBase = parseBlocks(base, ".on-dark");
const onBrandBase = parseBlocks(base, ".on-brand");

/* Pull "## N. Name" headings and every ```css block beneath each. */
const md = readFileSync(RECIPES, "utf8");
assertWellFormed(md);
const sections = md.split(/^## /m).slice(1);

let total = 0;
const failures = [];
let recipeCount = 0;

for (const section of sections) {
  const heading = section.split("\n")[0].trim();
  const m = heading.match(/^\d+\.\s+(.+)$/);
  if (!m) continue; // "Quick reference", "Using a recipe"
  const name = m[1].trim();
  recipeCount++;

  const overrides = {};
  for (const block of section.matchAll(/```css\n([\s\S]*?)```/g)) {
    Object.assign(overrides, parseDeclarations(block[1]));
  }

  if (!Object.keys(overrides).length) {
    failures.push(`${name}: no css block found`);
    continue;
  }

  const darkFirst = DARK_FIRST.has(name);
  const scope = { ...rootBase, ...overrides };
  const contexts = darkFirst
    ? [[".on-dark", { ...scope, ...onDarkBase }]]
    : [
        [":root", scope],
        [".on-dark", { ...scope, ...onDarkBase }],
        [".on-brand", { ...scope, ...onBrandBase }],
      ];

  const bad = [];
  for (const [ctxName, ctxScope] of contexts) {
    for (const r of checkContext(ctxScope)) {
      total++;
      if (!r.ok) bad.push(`${ctxName} ${r.label} — ${r.r.toFixed(2)}:1`);
    }
  }
  const scrim = checkScrim(scope);
  total++;
  if (!scrim.ok) bad.push(`scrim — ${scrim.r.toFixed(2)}:1`);

  const tag = darkFirst ? " (dark-first)" : "";
  if (bad.length) {
    console.log(`\n✗ ${name}${tag}`);
    for (const b of bad) console.log(`    ${b}`);
    failures.push(...bad.map((b) => `${name}: ${b}`));
  } else {
    console.log(`✓ ${name}${tag}`);
  }
}

console.log(`\n${recipeCount} recipes, ${total} checks.`);
if (failures.length) {
  console.error(`\n✗ ${failures.length} failure(s) across the recipe book.`);
  console.error(
    "Fix the palette in docs/design-recipes.md — a recipe that ships broken\n" +
      "contrast is worse than no recipe at all.\n"
  );
  process.exit(1);
}
console.log("✓ Every recipe palette holds WCAG AA.\n");
