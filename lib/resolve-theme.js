/**
 * Build-time utility that resolves syntax highlight colors from
 * Starlight theme plugins or the bundled Night Owl defaults.
 *
 * Falls back gracefully if theme files can't be loaded.
 */

import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";

// --- JSONC parser (strip comments + trailing commas) ----

function parseJsonc(raw) {
  const stripped = raw
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/,\s*([}\]])/g, "$1");
  return JSON.parse(stripped);
}

// --- Scope matching -------------------------------------

/**
 * Scores how well `candidate` matches `target`.
 * Returns -1 for no match, or a positive specificity score.
 */
function scopeScore(target, candidate) {
  if (target === candidate) return 1000 + candidate.length;
  if (target.startsWith(candidate + ".")) return candidate.length;
  if (candidate.startsWith(target + ".")) return target.length;
  return -1;
}

function resolveColor(theme, scopes) {
  let bestColor = null;
  let bestScore = -1;

  for (const rule of theme.tokenColors) {
    const fg = rule.settings?.foreground;
    if (!fg) continue;

    const ruleScopes = Array.isArray(rule.scope)
      ? rule.scope
      : typeof rule.scope === "string"
        ? rule.scope.split(",").map((s) => s.trim())
        : [];

    for (const target of scopes) {
      for (const rs of ruleScopes) {
        const score = scopeScore(target, rs);
        if (score > bestScore) {
          bestScore = score;
          bestColor = fg;
        }
      }
    }
  }

  return bestColor;
}

// --- Highlight type → TextMate scope mapping ------------

const SCOPE_MAP = {
  function: ["entity.name.function"],
  type: ["storage.type"],
  object: ["entity.name.class", "entity.name.type.class"],
  parameter: ["variable.parameter.function", "variable.parameter"],
  variable: ["variable"],
  keyword: ["keyword"],
  string: ["string"],
  number: ["constant.numeric"],
  comment: ["comment"],
  constant: ["constant.language", "constant"],
  support: ["support.function", "support.constant"],
  tag: ["entity.name.tag"],
  property: ["meta.property-name"],
};

// --- Theme loading --------------------------------------

let themes = null;

/**
 * Auto-detect Starlight theme plugins that ship syntax themes.
 * Scans node_modules for starlight-theme-* packages containing
 * JSON files with tokenColors.
 */
function loadPluginThemes() {
  const require = createRequire(import.meta.url);

  let nodeModulesDir;
  try {
    const starlightPath = require.resolve("@astrojs/starlight");
    nodeModulesDir = starlightPath.replace(/\/@astrojs\/starlight\/.*$/, "/");
  } catch {
    return null;
  }

  let themeDirs;
  try {
    themeDirs = readdirSync(nodeModulesDir)
      .filter((name) => name.startsWith("starlight-theme-"));
  } catch {
    return null;
  }

  for (const pkg of themeDirs) {
    const pkgDir = nodeModulesDir + pkg + "/";
    const themeFiles = findThemeFiles(pkgDir);
    if (themeFiles.length === 0) continue;

    const pair = pairThemes(themeFiles);
    if (pair) return pair;

    if (themeFiles.length === 1) {
      return { dark: themeFiles[0], light: themeFiles[0] };
    }
  }

  return null;
}

/**
 * Find JSON files containing tokenColors in a directory (shallow + common subdirs).
 */
function findThemeFiles(dir) {
  const results = [];
  const searchDirs = [dir];

  for (const sub of ["themes", "syntax-themes", "syntax", "dist"]) {
    searchDirs.push(dir + sub + "/");
  }

  for (const searchDir of searchDirs) {
    let files;
    try {
      files = readdirSync(searchDir).filter((f) => f.endsWith(".json"));
    } catch {
      continue;
    }

    for (const file of files) {
      try {
        const data = JSON.parse(readFileSync(searchDir + file, "utf-8"));
        if (data.tokenColors && Array.isArray(data.tokenColors)) {
          results.push(data);
        }
      } catch {
        continue;
      }
    }
  }

  return results;
}

/**
 * Given theme files, try to pair them as dark/light.
 */
function pairThemes(themes) {
  if (themes.length < 2) return null;

  let dark = null;
  let light = null;

  for (const theme of themes) {
    if (theme.type === "dark" && !dark) dark = theme;
    else if (theme.type === "light" && !light) light = theme;
  }

  if (dark && light) return { dark, light };
  return { dark: themes[0], light: themes[1] };
}

/**
 * Load Starlight's bundled Night Owl themes (the default).
 */
function loadStarlightThemes() {
  try {
    const require = createRequire(import.meta.url);
    const entryPath = require.resolve("@astrojs/starlight");
    const dir = entryPath.replace(/\/[^/]*$/, "/");
    const darkPath = dir + "integrations/expressive-code/themes/night-owl-dark.jsonc";
    const lightPath = dir + "integrations/expressive-code/themes/night-owl-light.jsonc";

    return {
      dark: parseJsonc(readFileSync(darkPath, "utf-8")),
      light: parseJsonc(readFileSync(lightPath, "utf-8")),
    };
  } catch {
    return null;
  }
}

async function loadThemes() {
  if (themes) return themes;
  themes = loadPluginThemes() || loadStarlightThemes();
  return themes;
}

// --- Public API -----------------------------------------

export async function resolveHighlightColors() {
  const data = await loadThemes();
  if (!data) return null;

  const darkFg = data.dark.colors?.["editor.foreground"] || "#d6deeb";
  const lightFg = data.light.colors?.["editor.foreground"] || "#403f53";

  const result = {};

  for (const [name, scopes] of Object.entries(SCOPE_MAP)) {
    result[name] = {
      dark: resolveColor(data.dark, scopes) || darkFg,
      light: resolveColor(data.light, scopes) || lightFg,
    };
  }

  return result;
}

/**
 * Returns a CSS string that sets --cb-hl-* custom properties
 * for both light and dark themes, derived from the active theme.
 */
export async function generateThemeCSS() {
  const colors = await resolveHighlightColors();
  if (!colors) return "";

  const darkVars = Object.entries(colors)
    .map(([name, c]) => `  --cb-hl-${name}: ${c.dark};`)
    .join("\n");

  const lightVars = Object.entries(colors)
    .map(([name, c]) => `  --cb-hl-${name}: ${c.light};`)
    .join("\n");

  return `:root[data-theme="dark"] .cb-browser {\n${darkVars}\n}\n:root[data-theme="light"] .cb-browser {\n${lightVars}\n}`;
}
