import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
import incrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Without this, prerendered/static routes still re-run their render function
// (and any fs reads inside it) on every request instead of being served from
// the build-time cache — this repo has no KV/R2/D1, so the ASSETS-backed
// static cache is the right (and only zero-infra) fit.
export default defineCloudflareConfig({
  incrementalCache,
});
