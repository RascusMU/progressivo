var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import { renderers } from "./renderers.mjs";
import { c as createExports, s as serverEntrypointModule } from "./chunks/_@astrojs-ssr-adapter_DBDLFspW.mjs";
import { manifest } from "./manifest_Dd5B1xqP.mjs";
globalThis.process ??= {};
globalThis.process.env ??= {};
var serverIslandMap = /* @__PURE__ */ new Map();
var _page0 = /* @__PURE__ */ __name(() => import("./pages/blog/_slug_.astro.mjs"), "_page0");
var _page1 = /* @__PURE__ */ __name(() => import("./pages/blog.astro.mjs"), "_page1");
var _page2 = /* @__PURE__ */ __name(() => import("./pages/gdpr.astro.mjs"), "_page2");
var _page3 = /* @__PURE__ */ __name(() => import("./pages/kontakt.astro.mjs"), "_page3");
var _page4 = /* @__PURE__ */ __name(() => import("./pages/o-nas.astro.mjs"), "_page4");
var _page5 = /* @__PURE__ */ __name(() => import("./pages/obchodni-podminky.astro.mjs"), "_page5");
var _page6 = /* @__PURE__ */ __name(() => import("./pages/reklamace-a-vraceni-zbozi.astro.mjs"), "_page6");
var _page7 = /* @__PURE__ */ __name(() => import("./pages/smluvni-podminky.astro.mjs"), "_page7");
var _page8 = /* @__PURE__ */ __name(() => import("./pages/_lang_/blog.astro.mjs"), "_page8");
var _page9 = /* @__PURE__ */ __name(() => import("./pages/_lang_/gdpr.astro.mjs"), "_page9");
var _page10 = /* @__PURE__ */ __name(() => import("./pages/_lang_/kontakt.astro.mjs"), "_page10");
var _page11 = /* @__PURE__ */ __name(() => import("./pages/_lang_/o-nas.astro.mjs"), "_page11");
var _page12 = /* @__PURE__ */ __name(() => import("./pages/_lang_/obchodni-podminky.astro.mjs"), "_page12");
var _page13 = /* @__PURE__ */ __name(() => import("./pages/_lang_/reklamace-a-vraceni-zbozi.astro.mjs"), "_page13");
var _page14 = /* @__PURE__ */ __name(() => import("./pages/_lang_/sluzby/_slug_.astro.mjs"), "_page14");
var _page15 = /* @__PURE__ */ __name(() => import("./pages/_lang_/smluvni-podminky.astro.mjs"), "_page15");
var _page16 = /* @__PURE__ */ __name(() => import("./pages/_lang_.astro.mjs"), "_page16");
var _page17 = /* @__PURE__ */ __name(() => import("./pages/index.astro.mjs"), "_page17");
var pageMap = /* @__PURE__ */ new Map([
  ["src/pages/blog/[slug].astro", _page0],
  ["src/pages/blog/index.astro", _page1],
  ["src/pages/gdpr.astro", _page2],
  ["src/pages/kontakt.astro", _page3],
  ["src/pages/o-nas.astro", _page4],
  ["src/pages/obchodni-podminky.astro", _page5],
  ["src/pages/reklamace-a-vraceni-zbozi.astro", _page6],
  ["src/pages/smluvni-podminky.astro", _page7],
  ["src/pages/[lang]/blog/index.astro", _page8],
  ["src/pages/[lang]/gdpr.astro", _page9],
  ["src/pages/[lang]/kontakt.astro", _page10],
  ["src/pages/[lang]/o-nas.astro", _page11],
  ["src/pages/[lang]/obchodni-podminky.astro", _page12],
  ["src/pages/[lang]/reklamace-a-vraceni-zbozi.astro", _page13],
  ["src/pages/[lang]/sluzby/[slug].astro", _page14],
  ["src/pages/[lang]/smluvni-podminky.astro", _page15],
  ["src/pages/[lang]/index.astro", _page16],
  ["src/pages/index.astro", _page17]
]);
var _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  actions: /* @__PURE__ */ __name(() => import("./noop-entrypoint.mjs"), "actions"),
  middleware: /* @__PURE__ */ __name(() => import("./_astro-internal_middleware.mjs"), "middleware")
});
var _args = void 0;
var _exports = createExports(_manifest);
var __astrojsSsrVirtualEntry = _exports.default;
var _start = "start";
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
  serverEntrypointModule[_start](_manifest, _args);
}
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
//# sourceMappingURL=bundledWorker-0.1258687298624448.mjs.map
