// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/*"
  ],
  exclude: [
    "/",
    "/_astro/*",
    "/favicon.svg",
    "/robots.txt",
    "/audio/*",
    "/images/*",
    "/blog/*",
    "/gdpr",
    "/kontakt",
    "/o-nas",
    "/obchodni-podminky",
    "/reklamace-a-vraceni-zbozi",
    "/smluvni-podminky",
    "/en/*",
    "/de/*",
    "/es/*",
    "/ru/*",
    "/cs/*"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/app/.wrangler/tmp/pages-F5NUMz/bundledWorker-0.1258687298624448.mjs";
import { isRoutingRuleMatch } from "/app/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/app/.wrangler/tmp/pages-F5NUMz/bundledWorker-0.1258687298624448.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=i1ahodzw8qj.js.map
