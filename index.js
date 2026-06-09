// Minimal Express server for the Contixo sample-repo collection.
// Listens on $PORT (Contixo sets this from the catalog's default_port
// for the matched runtime — Node.js 20 LTS row uses 3000).
//
// The HTML page below shows the customer their site is live + which
// Contixo build path served it, so they can verify the buildpacks
// pipeline ran end-to-end.

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.type("text/html").send(`
<!doctype html>
<html><head><title>Contixo Sample · Node.js Express</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 720px; margin: 4rem auto; padding: 0 1rem; color: #1e293b; }
  h1 { font-size: 2rem; margin-bottom: 0.25rem; }
  .badge { display: inline-block; background: #d1fae5; color: #047857; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
  .meta { margin-top: 2rem; background: #f8fafc; padding: 1rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.85rem; }
</style></head>
<body>
  <span class="badge">✓ Built with paketo-buildpacks (Node.js)</span>
  <h1>Hello from Contixo!</h1>
  <p>This is a Node.js Express app deployed via the Contixo dynamic-site wizard.</p>
  <p>The repo had a <code>package.json</code> → detection matched <code>nodejs</code> → buildpacks pipeline ran → image landed in Harbor → kubernetes pod is now serving you this page on port ${port}.</p>
  <div class="meta">
    <strong>Runtime:</strong> Node.js ${process.version}<br>
    <strong>Port:</strong> ${port}<br>
    <strong>Hostname:</strong> ${process.env.HOSTNAME || "unknown"}<br>
    <strong>Path:</strong> /
  </div>
</body></html>
  `);
});

app.get("/healthz", (_req, res) => {
  res.json({ status: "ok", runtime: "nodejs", version: process.version });
});

app.listen(port, () => {
  console.log(`contixo sample (node-express) listening on :${port}`);
});
