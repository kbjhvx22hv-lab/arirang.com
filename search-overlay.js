(function () {
  if (window.__searchOverlayInstalled) return;
  window.__searchOverlayInstalled = true;

  var CATALOG = [
    { name: "Heavyweight Box Tee",     cat: "T-Shirts",    price: 95,   href: "ARIRANG.html", letter: "T" },
    { name: "Pocket Crew Tee",         cat: "T-Shirts",    price: 85,   href: "Mens.html",    letter: "T" },
    { name: "Long-sleeve Henley",      cat: "T-Shirts",    price: 110,  href: "Mens.html",    letter: "T" },
    { name: "Wide Shirt Dress",        cat: "Womens",      price: 829,  href: "ARIRANG.html", letter: "W" },
    { name: "350gsm Loopback Hoodie",  cat: "Hoodies",     price: 165,  href: "Mens.html",    letter: "H" },
    { name: "Cropped Zip Hoodie",      cat: "Hoodies",     price: 185,  href: "ARIRANG.html", letter: "H" },
    { name: "Wool Boxing Hood",        cat: "Hoodies",     price: 245,  href: "Mens.html",    letter: "H" },
    { name: "Twisted Inseam Trousers", cat: "Pants",       price: 659,  href: "ARIRANG.html", letter: "P" },
    { name: "Selvedge Carpenter Pant", cat: "Pants",       price: 285,  href: "Mens.html",    letter: "P" },
    { name: "Pleated Wool Trouser",    cat: "Pants",       price: 459,  href: "Mens.html",    letter: "P" },
    { name: "Sharp Trouser",           cat: "Pants",       price: 859,  href: "ARIRANG.html", letter: "P" },
    { name: "Cashmere Overshirt",      cat: "Outerwear",   price: 1029, href: "ARIRANG.html", letter: "O" },
    { name: "Panel Coat",              cat: "Outerwear",   price: 1899, href: "ARIRANG.html", letter: "O" },
    { name: "Cashmere Overcoat",       cat: "Outerwear",   price: 2059, href: "ARIRANG.html", letter: "O" },
    { name: "14oz Chore Jacket",       cat: "Outerwear",   price: 345,  href: "Mens.html",    letter: "O" },
    { name: "Sharp Blazer",            cat: "Outerwear",   price: 1099, href: "ARIRANG.html", letter: "O" },
    { name: "Wrap Dress",              cat: "Womens",      price: 759,  href: "ARIRANG.html", letter: "W" },
    { name: "Panel Cut Top",           cat: "Tops",        price: 399,  href: "ARIRANG.html", letter: "T" },
    { name: "Collared Vest",           cat: "Tops",        price: 449,  href: "ARIRANG.html", letter: "T" },
    { name: "Sharp Vest",              cat: "Tops",        price: 659,  href: "ARIRANG.html", letter: "T" },
    { name: "Pleated Wool Skirt",      cat: "Womens",      price: 759,  href: "ARIRANG.html", letter: "W" },
    { name: "Soft Bucket Hat",         cat: "Accessories", price: 75,   href: "Stores.html",  letter: "A" },
    { name: "Calf-leather Belt",       cat: "Accessories", price: 145,  href: "Stores.html",  letter: "A" }
  ];
  var SUGG = ["Hoodie", "Cashmere", "Trouser", "Wool", "14oz", "Selvedge", "Vest", "Coat"];
  var CATS = [
    { label: "T-Shirts",    q: "tee" },
    { label: "Hoodies",     q: "hoodie" },
    { label: "Pants",       q: "pant" },
    { label: "Outerwear",   q: "outer" },
    { label: "Accessories", q: "accessor" }
  ];

  var CSS = '\
  .search-ovr{position:fixed;inset:0;z-index:9999;display:none;align-items:stretch;justify-content:stretch;font-family:"Montserrat",sans-serif;}\
  .search-ovr.open{display:flex;}\
  .search-ovr .ovr-bg{position:absolute;inset:0;background:rgba(255,255,255,.55);backdrop-filter:blur(22px) saturate(140%);-webkit-backdrop-filter:blur(22px) saturate(140%);animation:srchFade .35s ease both;}\
  @keyframes srchFade{from{opacity:0}to{opacity:1}}\
  @keyframes srchScale{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:none}}\
  .search-card{position:relative;z-index:1;margin:6vh auto auto;width:min(960px,92vw);max-height:88vh;background:#fff;color:#1a1815;border:1px solid #1a1815;box-shadow:0 40px 90px -30px rgba(0,0,0,.35),0 12px 24px -12px rgba(0,0,0,.18);display:flex;flex-direction:column;animation:srchScale .4s cubic-bezier(.2,.7,.2,1) both .05s;}\
  .search-head{display:flex;align-items:center;gap:16px;padding:22px 26px;border-bottom:1px solid rgba(26,24,21,.16);}\
  .search-head .icon{width:22px;height:22px;flex-shrink:0;color:#1a1815;}\
  .search-input{flex:1;border:0;outline:0;background:transparent;font-family:inherit;font-size:clamp(22px,3vw,36px);font-weight:600;letter-spacing:-.015em;color:#1a1815;padding:4px 0;min-width:0;}\
  .search-input::placeholder{color:rgba(26,24,21,.3);font-weight:400;font-style:italic;}\
  .search-close{width:36px;height:36px;border:1px solid #1a1815;background:#fff;color:#1a1815;display:flex;align-items:center;justify-content:center;font-size:12px;letter-spacing:.12em;font-weight:600;font-family:inherit;cursor:pointer;transition:all .2s;}\
  .search-close:hover{background:#1a1815;color:#fff;}\
  .search-meta{display:flex;justify-content:space-between;padding:14px 26px;border-bottom:1px solid rgba(26,24,21,.16);font-size:10.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(26,24,21,.55);}\
  .search-meta .esc{display:flex;gap:6px;}\
  .search-kbd{display:inline-flex;align-items:center;padding:2px 7px;border:1px solid rgba(26,24,21,.16);font-size:10px;font-weight:600;letter-spacing:.08em;color:#1a1815;}\
  .search-body{overflow-y:auto;padding:22px 26px 26px;}\
  .search-section-h{font-size:10.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(26,24,21,.55);margin:0 0 14px;display:flex;justify-content:space-between;}\
  .search-section-h:not(:first-child){margin-top:28px;}\
  .sugg-row{display:flex;flex-wrap:wrap;gap:8px;}\
  .sugg-chip{padding:9px 14px;border:1px solid rgba(26,24,21,.16);font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;background:#fff;color:#1a1815;font-family:inherit;cursor:pointer;transition:all .2s;}\
  .sugg-chip:hover{background:#1a1815;color:#fff;border-color:#1a1815;}\
  .res-list{display:flex;flex-direction:column;}\
  .res-item{display:grid;grid-template-columns:56px 1fr auto auto;align-items:center;gap:18px;padding:14px 8px;border-bottom:1px solid rgba(26,24,21,.16);text-decoration:none;color:#1a1815;cursor:pointer;transition:background .2s,padding .25s;}\
  .res-item:hover{background:#faf7f1;padding-left:14px;}\
  .res-thumb{width:56px;height:56px;background:#ebe5d8;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#1a1815;transition:background .25s,color .25s;}\
  .res-item:hover .res-thumb{background:#e10a17;color:#fff;}\
  .res-name{font-size:14px;font-weight:600;}\
  .res-cat{font-size:10.5px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:rgba(26,24,21,.55);margin-top:3px;}\
  .res-price{font-size:13px;font-weight:600;}\
  .res-arr{font-size:14px;color:rgba(26,24,21,.55);transition:transform .25s,color .2s;}\
  .res-item:hover .res-arr{transform:translate(3px,-3px);color:#e10a17;}\
  .res-empty{padding:40px 8px;text-align:center;font-size:13px;color:rgba(26,24,21,.55);}\
  .res-empty em{color:#1a1815;font-weight:600;font-style:italic;}\
  body.search-locked{overflow:hidden;}\
  @media (max-width:600px){.res-item{grid-template-columns:44px 1fr auto;gap:12px;}.res-thumb{width:44px;height:44px;font-size:18px;}.res-arr{display:none;}.search-head{padding:16px 18px;}.search-meta{padding:10px 18px;}.search-body{padding:16px 18px 22px;}}';

  function inject() {
    var s = document.createElement("style");
    s.id = "__search-overlay-css";
    s.textContent = CSS;
    document.head.appendChild(s);

    var ovr = document.createElement("div");
    ovr.className = "search-ovr";
    ovr.id = "search-ovr";
    ovr.setAttribute("aria-hidden", "true");
    ovr.innerHTML = '\
      <div class="ovr-bg" data-close></div>\
      <div class="search-card" role="dialog" aria-modal="true" aria-label="Search products">\
        <div class="search-head">\
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.5-4.5"/></svg>\
          <input class="search-input" id="search-input" placeholder="Search T-shirts, hoodies, pants…" autocomplete="off" spellcheck="false" />\
          <button class="search-close" data-close aria-label="Close">ESC</button>\
        </div>\
        <div class="search-meta"><span id="search-count">— ' + CATALOG.length + ' pieces in catalogue</span><span class="esc"><span class="search-kbd">↵</span> to open</span></div>\
        <div class="search-body" id="search-body"></div>\
      </div>';
    document.body.appendChild(ovr);
  }

  function escapeHtml(s) { return s.replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function highlight(text, q) {
    if (!q) return escapeHtml(text);
    var i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return escapeHtml(text);
    return escapeHtml(text.slice(0, i)) + "<mark style='background:#e10a17;color:#fff;padding:0 2px;'>" + escapeHtml(text.slice(i, i + q.length)) + "</mark>" + escapeHtml(text.slice(i + q.length));
  }

  var ovr, input, body, count;

  function render(q) {
    q = (q || "").trim();
    var html = "";
    if (!q) {
      html += '<div class="search-section-h"><span>— Browse by category</span><span>05</span></div><div class="sugg-row">';
      CATS.forEach(function (c) { html += '<button class="sugg-chip" data-q="' + c.q + '">' + c.label + '</button>'; });
      html += '</div><div class="search-section-h"><span>— Popular searches</span><span>' + SUGG.length + '</span></div><div class="sugg-row">';
      SUGG.forEach(function (s) { html += '<button class="sugg-chip" data-q="' + s.toLowerCase() + '">' + s + '</button>'; });
      html += '</div>';
      count.textContent = "— " + CATALOG.length + " pieces in catalogue";
    } else {
      var ql = q.toLowerCase();
      var matches = CATALOG.filter(function (p) { return p.name.toLowerCase().indexOf(ql) >= 0 || p.cat.toLowerCase().indexOf(ql) >= 0; });
      count.textContent = "— " + matches.length + " result" + (matches.length === 1 ? "" : "s") + " for '" + q + "'";
      if (!matches.length) {
        html = '<div class="res-empty">No matches for <em>"' + escapeHtml(q) + '"</em>.<br/><br/>Try <strong>hoodie</strong>, <strong>trouser</strong> or <strong>wool</strong>.</div>';
      } else {
        html += '<div class="search-section-h"><span>— Results</span><span>' + matches.length + '</span></div><div class="res-list">';
        matches.forEach(function (p) {
          html += '<a class="res-item" href="' + p.href + '"><div class="res-thumb">' + p.letter + '</div><div><div class="res-name">' + highlight(p.name, q) + '</div><div class="res-cat">' + highlight(p.cat, q) + '</div></div><div class="res-price">$' + p.price + '</div><div class="res-arr">↗</div></a>';
        });
        html += '</div>';
      }
    }
    body.innerHTML = html;
  }

  function openSearch() {
    ovr.classList.add("open");
    ovr.setAttribute("aria-hidden", "false");
    document.body.classList.add("search-locked");
    input.value = "";
    render("");
    setTimeout(function () { input.focus(); }, 120);
  }
  function closeSearch() {
    ovr.classList.remove("open");
    ovr.setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-locked");
  }

  function bindTriggers() {
    document.querySelectorAll("[data-search-trigger]").forEach(function (el) {
      if (el.__searchBound) return;
      el.__searchBound = true;
      el.addEventListener("click", function (e) { e.preventDefault(); openSearch(); });
    });
    document.querySelectorAll(".top-right .lk").forEach(function (el) {
      if (el.__searchBound) return;
      var t = (el.textContent || "").trim();
      if (t === "Search") {
        el.__searchBound = true;
        el.addEventListener("click", function (e) { e.preventDefault(); openSearch(); });
      }
    });
  }

  function init() {
    inject();
    ovr   = document.getElementById("search-ovr");
    input = document.getElementById("search-input");
    body  = document.getElementById("search-body");
    count = document.getElementById("search-count");

    ovr.addEventListener("click", function (e) {
      if (e.target.matches("[data-close]") || e.target.closest("[data-close]")) closeSearch();
      var chip = e.target.closest(".sugg-chip");
      if (chip) { input.value = chip.getAttribute("data-q"); render(input.value); input.focus(); }
    });
    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSearch();
      if (e.key === "Enter") { var first = body.querySelector(".res-item"); if (first) first.click(); }
    });
    document.addEventListener("keydown", function (e) {
      if (ovr.classList.contains("open") && e.key === "Escape") closeSearch();
      if (!ovr.classList.contains("open") && (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key === "k"))) { e.preventDefault(); openSearch(); }
    });

    bindTriggers();
    var mo = new MutationObserver(function () { bindTriggers(); });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  window.openSearch = function () { if (!ovr) init(); openSearch(); };
  window.closeSearch = function () { if (ovr) closeSearch(); };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
