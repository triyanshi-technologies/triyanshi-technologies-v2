
"use strict";

const { execFileSync } = require("child_process");
const { cpSync, rmSync, existsSync, mkdtempSync } = require("fs");
const os = require("os");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

execFileSync(process.execPath, [path.join(__dirname, "minify.js")], { stdio: "inherit" });

const EXCLUDE_DIRS = new Set(["node_modules", ".git", ".github", ".claude", ".agents", ".codex", "scripts", "dist"]);
const EXCLUDE_FILES = new Set(["package.json", "package-lock.json", ".gitignore", "DEVELOPER_GUIDE.md", "context.md" , "data.txt"]);

function isUnminifiedSource(name) {
  return (name.endsWith(".css") && !name.endsWith(".min.css")) || (name.endsWith(".js") && !name.endsWith(".min.js"));
}


const staging = mkdtempSync(path.join(os.tmpdir(), "triyanshi-dist-"));
cpSync(ROOT, staging, {
  recursive: true,
  filter(src) {
    const rel = path.relative(ROOT, src);
    if (rel === "") return true;
    const top = rel.split(path.sep)[0];
    if (EXCLUDE_DIRS.has(top)) return false;
    const name = path.basename(src);
    if (EXCLUDE_FILES.has(name)) return false;
    if (isUnminifiedSource(name)) return false;
    return true;
  },
});

if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
cpSync(staging, DIST, { recursive: true });
rmSync(staging, { recursive: true, force: true });

console.log(`Production build ready in ${path.relative(ROOT, DIST)}/`);
