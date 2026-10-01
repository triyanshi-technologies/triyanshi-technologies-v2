
"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PORT = process.env.PORT || 5500;
const WATCH_SKIP_DIRS = new Set(["node_modules", ".git", ".github", ".claude", ".agents", ".codex", "dist"]);
const WATCH_EXTS = new Set([".html", ".css", ".js"]);

const LIVERELOAD_SNIPPET = `
<script>
  (function () {
    var es = new EventSource("/__livereload");
    es.onmessage = function (e) {
      if (e.data === "reload") location.reload();
    };
  })();
</script>`;

const reloadClients = new Set();

function broadcastReload() {
  for (const res of reloadClients) res.write("data: reload\n\n");
}

let debounceTimer = null;
fs.watch(ROOT, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  const top = filename.split(path.sep)[0];
  if (WATCH_SKIP_DIRS.has(top)) return;
  if (!WATCH_EXTS.has(path.extname(filename))) return;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(broadcastReload, 100);
});

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function resolveFile(urlPath) {
  let rel = decodeURIComponent(urlPath.split("?")[0]);
  let full = path.normalize(path.join(ROOT, rel));
  if (!full.startsWith(ROOT)) return null; // path traversal guard

  // Dev serves original sources: swap *.min.css / *.min.js for the
  // unminified sibling when one exists.
  if (/\.min\.(css|js)$/.test(full)) {
    const source = full.replace(/\.min\.(css|js)$/, ".$1");
    if (fs.existsSync(source)) full = source;
  }

  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
    full = path.join(full, "index.html");
  }
  if (fs.existsSync(full)) return full;

  // .htaccess-style extensionless route: /about -> about.html
  if (fs.existsSync(`${full}.html`)) return `${full}.html`;

  return null;
}

http
  .createServer((req, res) => {
    if (req.url === "/__livereload") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });
      res.write("\n");
      reloadClients.add(res);
      req.on("close", () => reloadClients.delete(res));
      return;
    }

    const file = resolveFile(req.url);
    if (!file) {
      res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
      return;
    }

    if (path.extname(file) === ".html") {
      const html = fs.readFileSync(file, "utf8");
      const withReload = html.includes("</body>")
        ? html.replace("</body>", `${LIVERELOAD_SNIPPET}\n</body>`)
        : html + LIVERELOAD_SNIPPET;
      res.writeHead(200, { "Content-Type": MIME[".html"] });
      res.end(withReload);
      return;
    }

    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT} (serving original .css/.js, live-reload on)`);
  });
