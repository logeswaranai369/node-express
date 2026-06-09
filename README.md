# Sample 01 — Node.js Express (buildpacks path)

The simplest possible dynamic-site test: an Express server that says hi on `/`.

## What this exercises

| Step | What happens |
|---|---|
| Detection | `runtime_detection` sees `package.json` → matches `nodejs` |
| Catalog | Resolves to the `nodejs-20-lts` catalog row (port 3000) |
| Wizard | Renders the **happy-path Runtime panel** (green "Node.js project detected") |
| Build | `paketo-buildpacks/builder-jammy-base` Job runs — detects Node, runs `npm install`, layers + exports image |
| Deploy | Harbor digest → K8s Deployment → public URL serves the page |

## What to verify

1. Site goes Live within 2–4 minutes.
2. Visit the site URL → see the green "Built with paketo-buildpacks" badge.
3. `/healthz` returns `{"status":"ok","runtime":"nodejs"}`.
4. **Deploys tab** in the customer detail page shows captured build log (paketo output).

## Files

* `package.json` — declares Node 20 + Express dependency. `engines.node` sets buildpack's node version pin.
* `index.js` — Express app serving HTML + `/healthz`.

## To use

1. Push this folder as a public GitHub repo.
2. `/sites/create` → Dynamic → connect this repo.
3. Detection should auto-fill: runtime = Node.js 20 LTS, port = 3000.
4. Hit Deploy and watch build progress in the Deploys tab.
