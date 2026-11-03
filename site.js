/* CACleaner website: download and buy links in one place */
var CA = {
  /* the newest installer always comes from the latest GitHub release */
  releases: "https://github.com/craigory1591/cacleaner-releases/releases/latest",
  api: "https://api.github.com/repos/craigory1591/cacleaner-releases/releases/latest",
  /* Lemon Squeezy checkout for CACleaner Pro */
  buy: "https://cacleaner.lemonsqueezy.com/checkout/buy/cde8a738-f749-48a1-8cf1-9d3fba805363",
  contact: "support@cacleaner.co.uk"
};

/* point every Download button at the newest installer file */
(function () {
  var links = document.querySelectorAll("[data-download]");
  links.forEach(function (a) { a.href = CA.releases; });
  fetch(CA.api).then(function (r) { return r.json(); }).then(function (rel) {
    var exe = (rel.assets || []).filter(function (x) { return /\.exe$/i.test(x.name); })[0];
    if (!exe) return;
    links.forEach(function (a) { a.href = exe.browser_download_url; });
    document.querySelectorAll("[data-version]").forEach(function (el) { el.textContent = "Version " + String(rel.tag_name || "").replace(/^v/, "") + " · Windows 10 and 11"; });
  }).catch(function () {});
  document.querySelectorAll("[data-buy]").forEach(function (a) { a.href = CA.buy; });
  document.querySelectorAll("[data-contact]").forEach(function (a) { a.href = "mailto:" + CA.contact; a.textContent = CA.contact; });
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
