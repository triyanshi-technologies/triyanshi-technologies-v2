
"use strict";

const { readdirSync, statSync, readFileSync } = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const ROOT = path.resolve(__dirname, "..");
const SKIP_DIRS = new Set(["node_modules", ".git", ".github", ".claude", ".agents", ".codex", "scripts"]);

function walk(dir, ext, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full, ext, out);
    } else if (name.endsWith(ext) && !name.endsWith(`.min${ext}`)) {
      out.push(full);
    }
  }
  return out;
}

const cssFiles = walk(ROOT, ".css");
const jsFiles = walk(ROOT, ".js");


const imported = new Set();
for (const file of cssFiles) {
  const src = readFileSync(file, "utf8");
  const dir = path.dirname(file);
  for (const m of src.matchAll(/@import\s+url\((['"]?)(.+?)\1\)/g)) {
    imported.add(path.resolve(dir, m[2]));
  }
}

let count = 0;
for (const file of cssFiles) {
  if (imported.has(file)) continue;
  esbuild.buildSync({
    entryPoints: [file],
    outfile: file.replace(/\.css$/, ".min.css"),
    bundle: true, 
    minify: true,
    logLevel: "warning",
    external: ["*.svg", "*.png", "*.jpg", "*.jpeg", "*.gif", "*.webp", "*.ico", "*.woff", "*.woff2", "*.ttf", "*.eot"],
  });
  count++;
}

for (const file of jsFiles) {
  esbuild.buildSync({
    entryPoints: [file],
    outfile: file.replace(/\.js$/, ".min.js"),
    bundle: false,
    minify: true,
    logLevel: "warning",
  });
  count++;
}

console.log(`Minified ${count} files.`);
