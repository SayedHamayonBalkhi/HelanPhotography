/* ==========================================================================
   HELAN EVENT PHOTOGRAPHY — script.js
   Vanilla JavaScript. Reads everything it shows from content.js
   (window.HELAN_CONTENT), so load content.js first.

   Contents:  1 Setup & data · 2 Small helpers · 3 Header / menu / footer
              4 Photo tiles · 5 Lightbox · 6 Home page · 7 Work page
              8 Testimonials page · 9 Contact form · 10 Start-up
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Setup & data ---------- */
  var C = window.HELAN_CONTENT;
  if (!C) {
    console.error("content.js did not load before script.js. Check the <script> order in the HTML file.");
    return;
  }
  var doc = document;
  var root = doc.documentElement;
  var page = doc.body.getAttribute("data-page") || "home";
  var reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  root.classList.add("js");

  function byOrder(a, b) {
    return (a.order == null ? 9999 : a.order) - (b.order == null ? 9999 : b.order);
  }

  // Only photographs whose category exists and that are not hidden.
  var categoryIds = (C.categories || []).map(function (c) { return c.id; });
  var photos = (C.photos || []).filter(function (p) {
    return p && p.display !== false && p.src && categoryIds.indexOf(p.category) !== -1;
  });

  // Categories that have at least one visible photograph (empty ones stay hidden).
  var categories = (C.categories || []).map(function (c) {
    var list = photos.filter(function (p) { return p.category === c.id; }).sort(byOrder);
    return Object.assign({}, c, { photos: list });
  }).filter(function (c) { return c.photos.length > 0; });

  var allPhotos = [];
  categories.forEach(function (c) { allPhotos = allPhotos.concat(c.photos); });

  function photoById(id) {
    if (!id) return null;
    for (var i = 0; i < allPhotos.length; i++) if (allPhotos[i].id === id) return allPhotos[i];
    return null;
  }

  // Approved testimonials: display must be exactly true.
  var approvedTestimonials = ((C.testimonials && C.testimonials.items) || []).filter(function (t) {
    return t && t.display === true && t.text;
  });
  var featuredTestimonials = approvedTestimonials.filter(function (t) { return t.featured === true; });

  // Gentle checks for the person editing content.js (shown in the browser console only).
  (function checkRegistry() {
    var seen = {};
    (C.photos || []).forEach(function (p) {
      if (seen[p.id]) console.warn("[content.js] Duplicate photo id:", p.id);
      seen[p.id] = true;
      if (categoryIds.indexOf(p.category) === -1) console.warn("[content.js] Photo", p.id, "has an unknown category:", p.category);
      if (!p.alt) console.warn("[content.js] Photo", p.id, "has no alt text.");
    });
  })();

  /* ---------- 2. Small helpers ---------- */
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }

  function h(tag, attrs) {
    var el = doc.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === "class") el.className = v;
        else if (k === "text") el.textContent = v;
        else el.setAttribute(k, v === true ? "" : v);
      });
    }
    for (var i = 2; i < arguments.length; i++) {
      var child = arguments[i];
      if (child == null) continue;
      el.appendChild(typeof child === "string" ? doc.createTextNode(child) : child);
    }
    return el;
  }

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  function bindText() {
    $$("[data-bind]").forEach(function (el) {
      var v = get(el.getAttribute("data-bind"));
      if (typeof v === "string") el.textContent = v;
    });
  }

  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

  var revealObserver = null;
  function reveal(el) {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); revealObserver.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -5% 0px" });
    }
    el.classList.add("reveal");
    revealObserver.observe(el);
  }

  /* ---------- 3. Header, mobile menu, footer ---------- */
  function navItems() {
    return (C.nav || []).filter(function (n) {
      if (n.requires === "testimonials") return approvedTestimonials.length > 0;
      return true;
    });
  }

  // One-click contact links, built only from details set in content.js (contact.whatsapp / phone / email).
  // Anything missing or invalid is left out, so no dummy or guessed link is ever shown.
  var contactCfg = C.contact || {};
  var ctaLabels = Object.assign({ book: "Book a Session", whatsapp: "WhatsApp Helan", phone: "Call Helan", email: "Email Helan" }, contactCfg.ctaLabels || {});
  var contactLinks = (function () {
    var out = { whatsapp: "", phone: "", email: "" };
    var wa = String(contactCfg.whatsapp || "").replace(/\D/g, "");
    if (wa) {
      if (/^[1-9]\d{7,14}$/.test(wa)) {
        var msg = String(contactCfg.whatsappMessage || "").trim();
        out.whatsapp = "https://wa.me/" + wa + (msg ? "?text=" + encodeURIComponent(msg) : "");
      } else console.warn("[content.js] contact.whatsapp does not look like a valid number with country code, so the WhatsApp link is hidden.");
    }
    var ph = String(contactCfg.phone || "").replace(/[^\d+]/g, "");
    if (ph) {
      if (/^\+?\d{6,15}$/.test(ph)) out.phone = "tel:" + ph;
      else console.warn("[content.js] contact.phone does not look like a valid number, so the Call link is hidden.");
    }
    var em = String(contactCfg.email || "").trim();
    if (em) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) out.email = "mailto:" + em;
      else console.warn("[content.js] contact.email does not look like a valid address, so the Email link is hidden.");
    }
    return out;
  })();

  // "Book a Session": opens WhatsApp when a number is configured, otherwise goes to the contact form.
  function bookLink(extraClass) {
    var wa = contactLinks.whatsapp;
    return h("a", {
      class: "btn btn--primary " + extraClass,
      href: wa || (page === "home" ? "#contact" : "index.html#contact"),
      text: ctaLabels.book,
      target: wa ? "_blank" : null,
      rel: wa ? "noopener noreferrer" : null
    });
  }

  // WhatsApp / Call / Email buttons or links, only for the details that exist.
  function contactActionLinks(cls) {
    var list = [];
    [["whatsapp", "whatsapp"], ["phone", "phone"], ["email", "email"]].forEach(function (k) {
      var href = contactLinks[k[0]];
      if (!href) return;
      list.push(h("a", {
        class: typeof cls === "function" ? cls(k[0]) : cls,
        href: href,
        text: ctaLabels[k[1]],
        target: k[0] === "whatsapp" ? "_blank" : null,
        rel: k[0] === "whatsapp" ? "noopener noreferrer" : null
      }));
    });
    return list;
  }

  function hrefForHere(href) {
    // On the home page, "index.html#about" can simply be "#about".
    if (page === "home" && href.indexOf("index.html#") === 0) return href.replace("index.html", "");
    return href;
  }

  function isCurrent(href) {
    var file = location.pathname.split("/").pop() || "index.html";
    return href.split("#")[0] === file && href.indexOf("#") === -1 && file !== "index.html";
  }

  function renderHeader() {
    var header = $("#site-header");
    if (!header) return;
    var brand = C.brand || {};

    function linkList(extraClass) {
      var ul = h("ul");
      navItems().forEach(function (n) {
        var a = h("a", { href: hrefForHere(n.href), text: n.label, class: extraClass });
        if (isCurrent(n.href)) a.setAttribute("aria-current", "page");
        ul.appendChild(h("li", null, a));
      });
      return ul;
    }

    var wordmark = h("a", { class: "wordmark", href: "index.html", "aria-label": brand.name + ", home" },
      h("span", { class: "wordmark__name", text: brand.wordmark || brand.name }),
      h("span", { class: "wordmark__sub", text: "Event Photography", "aria-hidden": "true" })
    );
    var nav = h("nav", { class: "nav", "aria-label": "Primary" }, linkList());
    var btn = h("button", { class: "menu-btn", type: "button", "aria-expanded": "false", "aria-controls": "site-menu", "aria-label": "Open menu" },
      h("span", { class: "menu-btn__label", text: "Menu" }),
      h("span", { class: "menu-btn__bars", "aria-hidden": "true" })
    );
    header.appendChild(h("div", { class: "container header__inner" }, wordmark, nav, bookLink("btn--sm header-cta"), btn));

    // The menu sits outside the header (the header's blur effect would otherwise trap a fixed-position child).
    var menu = h("nav", { class: "menu", id: "site-menu", "aria-label": "Mobile" }, linkList(), h("div", { class: "menu__cta" }, bookLink("")));
    header.insertAdjacentElement("afterend", menu);

    var closeTargets = function () { return [$("#main"), $("#site-footer")].filter(Boolean); };
    var lastWidth = window.innerWidth;

    function setMenu(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.querySelector(".menu-btn__label").textContent = open ? "Close" : "Menu";
      menu.classList.toggle("is-open", open);
      root.classList.toggle("is-locked", open);
      closeTargets().forEach(function (el) {
        if (open) el.setAttribute("inert", ""); else el.removeAttribute("inert");
      });
    }
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setMenu(false); btn.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth !== lastWidth && window.innerWidth >= 820) setMenu(false);
      lastWidth = window.innerWidth;
    });

    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    var footer = $("#site-footer");
    if (!footer) return;
    var f = C.footer || {};
    var brand = C.brand || {};
    var year = f.year || new Date().getFullYear();
    var contactHref = page === "home" ? "#contact" : "index.html#contact";

    var invite = h("section", { class: "invite", "aria-labelledby": "invite-title" },
      h("div", { class: "container invite__inner" },
        h("p", { class: "eyebrow", text: f.inviteEyebrow }),
        h("h2", { id: "invite-title", text: f.inviteHeading }),
        h("p", { text: f.inviteCopy }),
        h("div", { class: "invite__actions" },
          h("a", { class: "btn btn--primary", href: contactHref, text: f.inviteCta }),
          page === "work" ? null : h("a", { class: "text-link text-link--plain", href: "work.html", text: f.inviteLinkLabel })
        )
      )
    );

    var navUl = h("ul");
    navItems().forEach(function (n) {
      navUl.appendChild(h("li", null, h("a", { href: hrefForHere(n.href), text: n.label })));
    });

    var social = C.social || {};
    var socialUl = h("ul");
    [["instagram", "Instagram"], ["facebook", "Facebook"], ["tiktok", "TikTok"]].forEach(function (s) {
      if (social[s[0]]) socialUl.appendChild(h("li", null, h("a", { href: social[s[0]], text: s[1], target: "_blank", rel: "noopener noreferrer" })));
    });

    var email = C.contact && C.contact.email;
    var links = h("div", { class: "foot__links" }, h("nav", { class: "foot__nav", "aria-label": "Footer" }, navUl));
    var contactUl = h("ul");
    contactActionLinks("").forEach(function (a) { contactUl.appendChild(h("li", null, a)); });
    if (contactUl.children.length) links.appendChild(h("nav", { class: "foot__contact", "aria-label": "Contact" }, contactUl));
    if (socialUl.children.length) links.appendChild(h("nav", { class: "foot__social", "aria-label": "Social media" }, socialUl));

    var main = h("div", { class: "foot" },
      h("div", { class: "container" },
        h("div", { class: "foot__top" },
          h("div", { class: "foot__brand" },
            h("a", { class: "wordmark", href: "index.html", "aria-label": brand.name + ", home" },
              h("span", { class: "wordmark__name", text: brand.wordmark || brand.name })),
            h("p", { class: "foot__statement", text: f.statement }),
            email ? h("p", { class: "foot__email" }, h("a", { href: "mailto:" + email, text: email })) : null
          ),
          links
        ),
        h("div", { class: "foot__bottom" }, h("p", { text: (f.copyright || "").replace("{year}", year) }))
      )
    );
    footer.appendChild(invite);
    footer.appendChild(main);
  }

  /* ---------- 4. Photo tiles ---------- */
  function ratioOf(p) { return p.w && p.h ? p.w + " / " + p.h : "3 / 4"; }

  function srcsetOf(p) {
    return p.thumb && p.tw && p.w ? p.thumb + " " + p.tw + "w, " + p.src + " " + p.w + "w" : null;
  }

  function makeTile(p, opts) {
    opts = opts || {};
    var img = h("img", {
      src: p.thumb || p.src,
      srcset: srcsetOf(p),
      sizes: opts.sizes,
      alt: p.alt || "",
      width: p.w, height: p.h,
      loading: opts.eager ? "eager" : "lazy",
      decoding: "async"
    });
    var btn = h("button", { class: "tile__btn", type: "button", "aria-haspopup": "dialog", "aria-label": "View larger: " + (p.alt || p.title || "photograph") }, img);
    var fig = h("figure", { class: "tile" }, btn);
    fig.style.setProperty("--ratio", ratioOf(p));
    if (p.title && opts.showTitle) btn.appendChild(h("span", { class: "tile__label", text: p.title }));

    // If the picture has no width/height in content.js, learn it from the file once it loads.
    img.addEventListener("load", function () {
      if (!p.w && img.naturalWidth) {
        fig.style.setProperty("--ratio", img.naturalWidth + " / " + img.naturalHeight);
        if (opts.onResize) opts.onResize();
      }
    });
    // A missing file should never leave a broken box behind.
    img.addEventListener("error", function () {
      console.warn("[content.js] Image file not found:", img.getAttribute("src"), "(photo id: " + p.id + ")");
      p.display = false;
      p._broken = true;
      if (fig.parentNode) fig.parentNode.removeChild(fig);
      if (opts.onResize) opts.onResize();
    });
    return fig;
  }

  function wireTiles(container, list) {
    container.addEventListener("click", function (e) {
      var btn = e.target.closest(".tile__btn");
      if (!btn || !container.contains(btn)) return;
      var tiles = $$(".tile__btn", container);
      var idx = tiles.indexOf(btn);
      var shown = list.filter(function (p) { return !p._broken; });
      if (idx > -1 && shown[idx]) Lightbox.open(shown, idx, btn);
    });
  }

  /* ---------- 5. Lightbox ---------- */
  var Lightbox = (function () {
    var box = $("#lightbox");
    var api = { open: function () {}, close: function () {} };
    if (!box) return api;

    var img = $(".lb-img", box), cap = $(".lb-caption", box), count = $(".lb-count", box);
    var btnClose = $(".lb-close", box), btnPrev = $(".lb-prev", box), btnNext = $(".lb-next", box);
    var list = [], index = 0, lastFocus = null, isOpen = false, hideTimer = null;

    function inertTargets() { return [$("#site-header"), $("#site-menu"), $("#main"), $("#site-footer")].filter(Boolean); }

    function show(i) {
      if (!list.length) return;
      index = (i + list.length) % list.length;
      var p = list[index];
      img.style.opacity = "0.001";
      img.onload = function () { img.style.opacity = ""; };
      img.onerror = function () { img.style.opacity = ""; };
      img.src = p.src;
      img.alt = p.alt || "";
      var text = [p.title, p.caption].filter(Boolean).join(" \u2014 ");
      cap.textContent = text;
      count.textContent = list.length > 1 ? (index + 1) + " / " + list.length : "";
      // Warm the cache for the neighbours.
      if (list.length > 1) {
        [index + 1, index - 1].forEach(function (n) {
          var q = list[(n + list.length) % list.length];
          if (q) { var pre = new Image(); pre.src = q.src; }
        });
      }
    }

    function open(items, i, trigger) {
      list = items.slice();
      lastFocus = trigger || doc.activeElement;
      clearTimeout(hideTimer);
      box.hidden = false;
      box.classList.toggle("is-single", list.length < 2);
      show(i);
      root.classList.add("is-locked");
      inertTargets().forEach(function (el) { el.setAttribute("inert", ""); });
      isOpen = true;
      // Next frame so the fade can run.
      window.requestAnimationFrame(function () { box.classList.add("is-open"); });
      btnClose.focus();
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      box.classList.remove("is-open");
      root.classList.remove("is-locked");
      inertTargets().forEach(function (el) { el.removeAttribute("inert"); });
      hideTimer = setTimeout(function () { box.hidden = true; img.removeAttribute("src"); }, reduceMotion ? 0 : 200);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    btnClose.addEventListener("click", close);
    btnPrev.addEventListener("click", function () { show(index - 1); });
    btnNext.addEventListener("click", function () { show(index + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });

    doc.addEventListener("keydown", function (e) {
      if (!isOpen) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
      else if (e.key === "Tab") {
        // Keep keyboard focus inside the viewer.
        var f = [btnClose, btnPrev, btnNext].filter(function (b) { return b.offsetParent !== null || list.length > 1 || b === btnClose; });
        if (list.length < 2) f = [btnClose];
        var pos = f.indexOf(doc.activeElement);
        e.preventDefault();
        if (e.shiftKey) f[(pos <= 0 ? f.length : pos) - 1].focus();
        else f[(pos + 1) % f.length].focus();
      }
    });

    // Swipe left/right on touch screens.
    var sx = 0, sy = 0, tracking = false;
    box.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1 || e.target.closest(".lb-btn")) { tracking = false; return; }
      tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(dx < 0 ? index + 1 : index - 1);
    }, { passive: true });

    api.open = open; api.close = close;
    return api;
  })();

  /* ---------- 6. Home page ---------- */
  function renderHome() {
    bindText();

    // Hero
    var hero = C.hero || {};
    var title = $("#hero-title");
    (hero.titleLines || []).forEach(function (line, i) {
      var span = h("span");
      if (hero.italicLine === i + 1) span.appendChild(h("em", { text: line })); else span.textContent = line;
      title.appendChild(span);
    });
    var c1 = $("#hero-cta-1"), c2 = $("#hero-cta-2");
    if (hero.primaryCta) { c1.textContent = hero.primaryCta.label; c1.setAttribute("href", hero.primaryCta.href); }
    if (hero.secondaryCta) { c2.textContent = hero.secondaryCta.label; c2.setAttribute("href", hero.secondaryCta.href); }
    var hp = photoById(hero.photoId);
    if (hp) {
      var himg = $("#hero-img");
      himg.src = hp.src; himg.alt = hp.alt || "";
      if (hp.w) { himg.width = hp.w; himg.height = hp.h; }
      $("#hero-media").style.setProperty("--ratio", ratioOf(hp));
      $("#hero-media").hidden = false;
      himg.addEventListener("error", function () { $("#hero-media").hidden = true; });
    }

    // Featured
    var featured = photos.filter(function (p) { return p.featured === true && photoById(p.id); })
      .sort(function (a, b) {
        var fa = a.featuredOrder == null ? 9999 : a.featuredOrder, fb = b.featuredOrder == null ? 9999 : b.featuredOrder;
        return fa - fb || allPhotos.indexOf(a) - allPhotos.indexOf(b);
      })
      .filter(function (p) { return p.id !== hero.photoId; });
    if (featured.length) {
      var fg = $("#featured-grid");
      featured.forEach(function (p, i) {
        var t = makeTile(p, { sizes: "(min-width: 760px) 40vw, 50vw", eager: i < 2 });
        fg.appendChild(t); reveal(t);
      });
      wireTiles(fg, featured);
      var fl = $("#featured-link");
      fl.textContent = C.featuredSection.linkLabel; fl.setAttribute("href", C.featuredSection.linkHref);
      $("#featured").hidden = false;
    }

    // Category cards
    if (categories.length) {
      var grid = $("#cats-grid");
      categories.forEach(function (c) {
        var cover = photoById(c.coverPhotoId) || c.photos[0];
        var card = h("a", { class: "cat", href: "work.html#" + c.slug },
          h("div", { class: "cat__media" },
            h("img", { src: cover.thumb || cover.src, srcset: srcsetOf(cover), sizes: "(min-width: 700px) 40vw, 100vw", alt: "", loading: "lazy", decoding: "async" })),
          h("div", { class: "cat__body" },
            h("h3", { class: "cat__name", text: c.label }),
            c.subtitle ? h("p", { class: "cat__sub", text: c.subtitle }) : null,
            h("p", { class: "cat__count", text: plural(c.photos.length, "photograph", "photographs") })
          )
        );
        grid.appendChild(h("li", null, card));
      });
      $("#categories").hidden = false;
    }

    // About
    var ap = photoById(C.about && C.about.photoId);
    if (ap) {
      var aimg = $("#about-img");
      aimg.src = ap.thumb || ap.src; aimg.srcset = srcsetOf(ap) || ""; aimg.sizes = "(min-width: 900px) 40vw, 100vw"; aimg.alt = ap.alt || "";
      if (ap.w) { aimg.width = ap.w; aimg.height = ap.h; }
      $("#about-media").hidden = false;
      aimg.addEventListener("error", function () { $("#about-media").hidden = true; $(".about").classList.add("about--text-only"); });
    } else {
      $(".about").classList.add("about--text-only");
    }

    // Why choose us
    var why = C.whyChoose || {};
    var whyItems = (why.items || []).filter(function (i) { return i.display !== false; });
    if (why.enabled && whyItems.length) {
      var wl = $("#why-list");
      wl.style.setProperty("--why-cols", Math.min(4, whyItems.length));
      whyItems.forEach(function (i) {
        wl.appendChild(h("li", null, h("h3", { text: i.title }), h("p", { text: i.text })));
      });
      $("#why").hidden = false;
    }

    // Testimonial preview: 1 or 2 different featured testimonials, picked at random on every load.
    if (featuredTestimonials.length) {
      renderTestimonialPreview();
      // Going Back/Forward can restore the page from cache without running this script again; pick afresh then too.
      window.addEventListener("pageshow", function (e) { if (e.persisted) renderTestimonialPreview(); });
      $("#testimonials-preview").hidden = false;
    }

    // Contact: Quick Contact list (mobile, Instagram, email). Real links only; empty details show a marked placeholder.
    renderQuickContact();
    initForm();
  }

  function renderQuickContact() {
    var ul = $("#quick-list");
    if (!ul) return;
    var cc = C.contact || {};
    var labels = Object.assign({ phone: "Mobile", instagram: "Instagram", email: "Email" }, cc.quickLabels || {});
    var ph = Object.assign({ phone: "Number coming soon", instagram: "Profile coming soon", email: "Address coming soon" }, cc.quickPlaceholders || {});
    var ig = String((C.social && C.social.instagram) || "").trim();
    if (ig && !/^https?:\/\//i.test(ig)) ig = "";
    var icons = {
      phone: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 3h3l1.4 4.2-2 1.4a11 11 0 0 0 5.4 5.4l1.4-2L20 13.4v3A2.6 2.6 0 0 1 17.4 19 14.4 14.4 0 0 1 5 6.6 2.6 2.6 0 0 1 6.6 3z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor"/></svg>',
      email: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/></svg>'
    };
    var email = String(cc.email || "").trim();
    var items = [
      { k: "phone", href: contactLinks.phone, text: String(cc.phone || "").trim() },
      { k: "instagram", href: ig, text: ig ? "@" + ig.replace(/\/+$/, "").split("/").pop().replace(/\?.*$/, "") : "" },
      { k: "email", href: contactLinks.email, text: email }
    ];
    items.forEach(function (it) {
      var live = !!(it.href && it.text);
      if (!live && cc.showPlaceholders === false) return;
      var icon = h("span", { class: "quick__icon", "aria-hidden": "true" });
      icon.innerHTML = icons[it.k];
      var value = live
        ? h("a", { class: "quick__value", href: it.href, text: it.text, target: it.k === "instagram" ? "_blank" : null, rel: it.k === "instagram" ? "noopener noreferrer" : null })
        : h("span", { class: "quick__value quick__value--pending", text: ph[it.k] });
      ul.appendChild(h("li", { class: "quick__item" + (live ? "" : " is-pending") }, icon,
        h("span", { class: "quick__text" }, h("span", { class: "quick__label", text: labels[it.k] }), value)));
    });
    ul.parentNode.hidden = !ul.children.length;
  }

  function pickRandom(list, n) {
    var a = list.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } // Fisher-Yates shuffle: no repeats
    return a.slice(0, n);
  }

  function renderTestimonialPreview() {
    var tl = $("#tp-list");
    if (!tl) return;
    var n = featuredTestimonials.length < 2 ? featuredTestimonials.length : 1 + Math.floor(Math.random() * 2); // 1 or 2
    var chosen = pickRandom(featuredTestimonials, n);
    tl.textContent = "";
    tl.style.setProperty("--q-cols", chosen.length);
    tl.classList.toggle("quotes--single", chosen.length === 1);
    chosen.forEach(function (t) { tl.appendChild(quoteEl(t)); });
  }

  /* ---------- 7. Work page ---------- */
  function renderWork() {
    bindText();
    var grid = $("#gallery"), filters = $("#filters");
    var wp = C.workPage || {};
    var allLabel = wp.allLabel || "All work";
    var allDesc = wp.allDescription || "";
    var current = null; // "all" or a category slug

    function slugFromHash() {
      var s = decodeURIComponent((location.hash || "").replace(/^#/, "")).toLowerCase();
      for (var i = 0; i < categories.length; i++) if (categories[i].slug === s) return s;
      return "all";
    }

    function buildFilters() {
      filters.textContent = "";
      var items = [{ slug: "all", label: allLabel, count: allPhotos.length }].concat(categories.map(function (c) {
        return { slug: c.slug, label: c.label, count: c.photos.length };
      }));
      items.forEach(function (it) {
        var a = h("a", { href: "#" + it.slug, "data-slug": it.slug }, it.label, h("sup", { text: String(it.count) }));
        filters.appendChild(a);
      });
    }

    var layoutQueued = false;
    function layout() {
      if (layoutQueued) return;
      layoutQueued = true;
      window.requestAnimationFrame(function () {
        layoutQueued = false;
        var tiles = $$(".tile", grid);
        var heights = tiles.map(function (t) { return t.offsetHeight; }); // read first...
        tiles.forEach(function (t, i) { t.style.gridRowEnd = "span " + Math.max(1, Math.ceil(heights[i] / 8)); }); // ...then write
      });
    }

    function render() {
      var slug = slugFromHash();
      var cat = categories.filter(function (c) { return c.slug === slug; })[0] || null;
      var list = (cat ? cat.photos : allPhotos).filter(function (p) { return !p._broken; });
      current = slug;

      $$("a", filters).forEach(function (a) {
        if (a.getAttribute("data-slug") === slug) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
      $("#gallery-title").textContent = cat ? cat.label : allLabel;
      $("#gallery-desc").textContent = cat ? (cat.subtitle || "") : allDesc;
      var brandName = (C.brand && C.brand.name) || "";
      doc.title = (cat ? cat.label + " | " : "") + "Work | " + brandName;
      $("#gallery-live").textContent = (cat ? cat.label : allLabel) + ": " + plural(list.length, "photograph", "photographs");

      grid.textContent = "";
      $("#gallery-empty").hidden = list.length > 0;
      list.forEach(function (p, i) {
        var t = makeTile(p, { sizes: "(min-width: 1100px) 33vw, (min-width: 480px) 50vw, 100vw", eager: i < 3, onResize: layout });
        grid.appendChild(t); reveal(t);
      });
      wireTilesOnce(list);
      layout();
    }

    var wiredList = [];
    var wired = false;
    function wireTilesOnce(list) {
      wiredList = list;
      if (wired) return;
      wired = true;
      grid.addEventListener("click", function (e) {
        var btn = e.target.closest(".tile__btn");
        if (!btn) return;
        var tiles = $$(".tile__btn", grid);
        var idx = tiles.indexOf(btn);
        var shown = wiredList.filter(function (p) { return !p._broken; });
        if (idx > -1 && shown[idx]) Lightbox.open(shown, idx, btn);
      });
    }

    buildFilters();
    render();
    window.addEventListener("hashchange", render);
    if ("ResizeObserver" in window) {
      var lastW = 0;
      new ResizeObserver(function () {
        var w = grid.clientWidth;
        if (w !== lastW) { lastW = w; layout(); }
      }).observe(grid);
    } else {
      window.addEventListener("resize", layout);
    }
    window.addEventListener("load", layout);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(layout);
  }

  /* ---------- 8. Testimonials ---------- */
  function quoteEl(t) {
    var paras = String(t.text).split(/\n\s*\n/).map(function (x) { return x.trim(); }).filter(Boolean);
    var q = h("blockquote", { class: "quote" + (paras.length > 1 ? " quote--long" : "") });
    paras.forEach(function (txt, i) {
      q.appendChild(h("p", { text: (i === 0 ? "\u201C" : "") + txt + (i === paras.length - 1 ? "\u201D" : "") }));
    });
    // Name only when supplied; otherwise a neutral label (never an invented identity).
    var foot = h("footer");
    var who = t.name || (C.testimonials && C.testimonials.defaultAttribution);
    if (who) foot.appendChild(h("div", { text: who }));
    if (t.name && t.category) foot.appendChild(h("div", { text: t.category }));
    if (foot.children.length) q.appendChild(foot);
    return q;
  }

  function renderTestimonialsPage() {
    bindText();
    var list = $("#tp-list");
    if (!approvedTestimonials.length) {
      var empty = $("#tp-empty");
      empty.textContent = (C.testimonials && C.testimonials.emptyMessage) || "";
      empty.hidden = false;
      return;
    }
    approvedTestimonials.forEach(function (t) { list.appendChild(quoteEl(t)); });
  }

  /* ---------- 9. Contact form ---------- */
  function initForm() {
    var form = $("#contact-form");
    if (!form) return;
    var c = C.contact || {};
    var status = $("#form-status"), submit = $("#form-submit");
    var sending = false;

    $("#interest-label").textContent = c.interestLabel || "Photography interest";
    var sel = $("#f-interest");
    sel.appendChild(h("option", { value: "", text: c.interestPlaceholder || "Choose one (optional)" }));
    (c.interestOptions || []).forEach(function (o) { sel.appendChild(h("option", { value: o, text: o })); });
    submit.textContent = c.submitLabel || "Send Message";

    function setStatus(msg, kind) {
      status.textContent = msg || "";
      status.className = "form__status" + (kind ? " is-" + kind : "");
    }
    function fieldError(input, msg) {
      var err = $("#e-" + input.name);
      if (!err) return;
      if (msg) { input.setAttribute("aria-invalid", "true"); err.textContent = msg; err.hidden = false; }
      else { input.removeAttribute("aria-invalid"); err.textContent = ""; err.hidden = true; }
    }
    function validate() {
      var name = form.elements.name, email = form.elements.email, message = form.elements.message;
      var firstBad = null;
      function check(input, ok, msg) { fieldError(input, ok ? "" : msg); if (!ok && !firstBad) firstBad = input; }
      check(name, name.value.trim().length > 0, "Please enter your name.");
      check(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), "Please enter a valid email address, such as name@example.com.");
      check(message, message.value.trim().length > 0, "Please write a short message.");
      if (firstBad) { firstBad.focus(); setStatus("Please fix the highlighted fields.", "error"); return false; }
      return true;
    }
    ["name", "email", "message"].forEach(function (n) {
      form.elements[n].addEventListener("input", function () { fieldError(form.elements[n], ""); });
    });

    function setSending(on) {
      sending = on;
      submit.disabled = on;
      submit.setAttribute("aria-disabled", on ? "true" : "false");
      submit.textContent = on ? (c.sendingLabel || "Sending\u2026") : (c.submitLabel || "Send Message");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (sending) return;
      setStatus("");
      if (!validate()) return;
      if (form.elements._honey && form.elements._honey.value) { return; } // a bot filled the hidden field: drop it quietly

      var recipient = ((C.form && C.form.recipient) || "").trim();
      if (!recipient || /[\s\/]/.test(recipient)) {
        console.warn("[content.js] form.recipient is empty or invalid, so the contact form cannot send yet. See the README, 'Contact form'.");
        setStatus(c.notConfiguredMessage, "error");
        return;
      }

      setSending(true);
      var ctrl = "AbortController" in window ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 20000) : null;
      var payload = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        interest: form.elements.interest.value || "Not specified",
        message: form.elements.message.value.trim(),
        _subject: (C.form && C.form.subject) || "New website enquiry",
        _template: "table"
      };
      fetch("https://formsubmit.co/ajax/" + recipient, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl ? ctrl.signal : undefined
      }).then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok, data: data }; }, function () { return { ok: false, data: null }; });
      }).then(function (r) {
        // Only claim success when the service itself confirms it.
        var confirmed = r.ok && r.data && (r.data.success === true || r.data.success === "true");
        if (confirmed) { form.reset(); setStatus(c.successMessage, "success"); }
        else { console.warn("[contact form] Service did not confirm delivery:", r.data); setStatus(c.errorMessage, "error"); }
      }).catch(function (err) {
        console.warn("[contact form] Request failed:", err);
        setStatus(c.errorMessage, "error"); // the typed text stays in the fields
      }).then(function () {
        if (timer) clearTimeout(timer);
        setSending(false);
      });
    });
  }

  /* ---------- 10. Start-up ---------- */
  renderHeader();
  renderFooter();
  if (page === "home") renderHome();
  else if (page === "work") renderWork();
  else if (page === "testimonials") renderTestimonialsPage();
})();
