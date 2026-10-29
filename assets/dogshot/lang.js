// DogShot site language: ?lang=<code>, else the browser's language if supported, else English.
(function () {
  var codes = ["en", "ko", "ja", "de", "fr", "es", "zh-hant", "it", "pt-br"];
  var htmlLang = {"en": "en", "ko": "ko", "ja": "ja", "de": "de", "fr": "fr", "es": "es", "zh-hant": "zh-Hant", "it": "it", "pt-br": "pt-BR"};
  function norm(v) {
    v = String(v || "").toLowerCase();
    if (codes.indexOf(v) >= 0) return v;
    var p = v.split(/[-_]/)[0];
    if (p === "zh") return "zh-hant";
    if (p === "pt") return "pt-br";
    return codes.indexOf(p) >= 0 ? p : "";
  }
  var lang = "";
  try { lang = norm(new URLSearchParams(location.search).get("lang")); } catch (e) {}
  if (!lang) {
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language];
    for (var i = 0; i < list.length && !lang; i++) lang = norm(list[i]);
  }
  if (!lang) lang = "en";
  var root = document.documentElement;
  root.setAttribute("data-lang", lang);
  root.setAttribute("lang", htmlLang[lang]);
  var page = window.DOGSHOT_PAGE || {};
  if (page.titles && page.titles[lang]) document.title = page.titles[lang];
  function setMeta(sel, val) { var el = document.querySelector(sel); if (el && val) el.setAttribute("content", val); }
  setMeta('meta[name="description"]', page.descs && page.descs[lang]);
  setMeta('meta[property="og:title"]', page.titles && page.titles[lang]);
  setMeta('meta[property="og:description"]', page.descs && page.descs[lang]);
  if (page.og && page.og[lang]) setMeta('meta[property="og:image"]', "https://dographyapp.com/" + page.og[lang]);
  // Close the language menu after a choice or when tapping elsewhere.
  document.addEventListener("click", function (e) {
    document.querySelectorAll("details.lang[open]").forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute("open"); });
  });
})();
