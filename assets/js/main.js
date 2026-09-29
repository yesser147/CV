/* =====================================================================
   Renders data/content.js into the page.
   You normally don't need to edit this file — edit data/content.js.
   ===================================================================== */

(function () {
  "use strict";

  const C = window.CONTENT || (typeof CONTENT !== "undefined" ? CONTENT : null);
  if (!C) return console.error("data/content.js is missing or has a syntax error.");

  /* ─────────── Helpers ─────────── */

  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Escapes text, then turns **bold** into <strong>bold</strong>
  const rich = (s = "") => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  const list = (arr, fn) => (arr || []).map(fn).join("");

  const ICONS = {
    github: '<path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" fill="currentColor" stroke="none"/>',
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5c0-1.2 0-2.75-1.67-2.75s-1.93 1.3-1.93 2.66V21h-4z" fill="currentColor" stroke="none"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pin: '<path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    download: '<path d="M12 3v12m0 0-5-5m5 5 5-5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
    external: '<path d="M14 4h6v6M20 4 10 14M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  };

  const icon = (name, cls = "icon") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  const tags = (items, cls = "tag") => `<div class="tags">${list(items, (t) => `<span class="${cls}">${esc(t)}</span>`)}</div>`;

  const bar = ({ name, level }) => `
    <div class="bar">
      <div class="bar-label"><span>${esc(name)}</span><span class="mono">${Number(level) || 0}%</span></div>
      <div class="bar-track"><div class="bar-fill" data-level="${Math.max(0, Math.min(100, Number(level) || 0))}"></div></div>
    </div>`;

  const initials = (name = "") => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const telHref = (p = "") => "tel:" + p.replace(/[^\d+]/g, "");

  /* ─────────── Section renderers ─────────── */

  const P = C.profile || {};

  const renderers = {
    brand: () => `<span class="brand-mark">${esc(initials(P.name))}</span><span class="brand-name">${esc(P.name)}</span>`,

    hero: () => `
      <div class="hero-text reveal">
        ${P.availability ? `<span class="status"><span class="dot"></span>${esc(P.availability)}</span>` : ""}
        <h1>Hi, I'm <span class="grad">${esc(P.name)}</span></h1>
        <p class="hero-role">${esc(P.role)}${P.tagline ? ` <span class="sep">/</span> <span class="muted">${esc(P.tagline)}</span>` : ""}</p>
        <p class="hero-summary">${rich(P.summary)}</p>
        <div class="hero-cta">
          ${list(P.cv, (cv, i) => `<a class="btn ${i === 0 ? "btn-primary" : "btn-ghost"}" href="${esc(cv.file)}" download>${icon("download")}${esc(cv.label)}</a>`)}
          <a class="btn btn-ghost" href="#projects">See projects ${icon("arrow")}</a>
        </div>
        <div class="hero-meta">
          ${P.location ? `<span>${icon("pin")}${esc(P.location)}</span>` : ""}
          ${P.email ? `<a href="mailto:${esc(P.email)}">${icon("mail")}${esc(P.email)}</a>` : ""}
          ${list(P.links, (l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${icon(l.icon || "globe")}${esc(l.label)}</a>`)}
        </div>
      </div>
      <div class="hero-photo reveal">
        <div class="photo-frame">
          <picture>
            <source srcset="${esc(P.photo)}" type="image/webp" />
            <img src="${esc(P.photoFallback || P.photo)}" alt="${esc(P.name)}" width="640" height="640" />
          </picture>
        </div>
      </div>`,

    about: () => `
      <div class="card reveal about-main">
        <h3>Profile</h3>
        <p>${rich(P.summary)}</p>
        ${P.goal ? `<div class="goal"><span class="goal-label">Goal</span><p>${rich(P.goal)}</p></div>` : ""}
      </div>
      <div class="card reveal">
        <h3>Education</h3>
        <ol class="timeline compact">
          ${list(C.education, (e) => `
            <li>
              <span class="tl-date mono">${esc(e.period)}</span>
              <p class="tl-title">${esc(e.title)}</p>
              <p class="tl-sub">${esc(e.place)}</p>
            </li>`)}
        </ol>
      </div>
      <div class="stack">
        <div class="card reveal">
          <h3>Languages</h3>
          <div class="bars">${list(C.languages, bar)}</div>
        </div>
        ${C.interests?.length ? `<div class="card reveal"><h3>Interests</h3>${tags(C.interests, "tag tag-sm")}</div>` : ""}
      </div>`,

    experience: () => `
      <ol class="timeline">
        ${list(C.experience, (x) => `
          <li class="card reveal">
            <div class="xp-head">
              <div>
                <p class="tl-title">${esc(x.role)}</p>
                <p class="tl-sub">${esc(x.company)}${x.location ? ` · ${esc(x.location)}` : ""}</p>
              </div>
              <span class="pill mono">${esc(x.period)}</span>
            </div>
            <ul class="bullets">${list(x.bullets, (b) => `<li>${rich(b)}</li>`)}</ul>
            ${x.stack?.length ? tags(x.stack, "tag tag-accent") : ""}
          </li>`)}
      </ol>`,

    projects: () => {
      const cats = [...new Set((C.projects || []).flatMap((p) => p.categories || []))];
      return `
        ${cats.length > 1 ? `
          <div class="filters" role="tablist" aria-label="Filter projects">
            <button class="filter active" data-filter="*">All <span class="count">${C.projects.length}</span></button>
            ${list(cats, (c) => `<button class="filter" data-filter="${esc(c)}">${esc(c)}</button>`)}
          </div>` : ""}
        <div class="project-grid">
          ${list(C.projects, (p) => `
            <article class="card project reveal" data-categories="${esc((p.categories || []).join("|"))}">
              <div class="project-top">
                <span class="project-cats mono">${esc((p.categories || []).join(" · "))}</span>
                <div class="project-links">
                  ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener" aria-label="Source code on GitHub" title="Source code">${icon("github")}</a>` : ""}
                  ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener" aria-label="Live demo" title="Live demo">${icon("external")}</a>` : ""}
                </div>
              </div>
              <h3>${esc(p.title)}</h3>
              <p class="project-desc">${rich(p.description)}</p>
              ${p.highlights?.length ? `<ul class="bullets small">${list(p.highlights, (h) => `<li>${rich(h)}</li>`)}</ul>` : ""}
              <div class="project-foot">${tags(p.stack || [], "tag tag-sm")}</div>
            </article>`)}
        </div>`;
    },

    skills: () =>
      list(C.skills, (g) => `
        <div class="card reveal">
          <h3>${esc(g.group)}</h3>
          ${g.type === "bars" ? `<div class="bars">${list(g.items, bar)}</div>` : tags(g.items)}
        </div>`),

    certifications: () =>
      list(C.certifications, (c) => `
        <a class="card cert reveal" href="${esc(c.file)}" target="_blank" rel="noopener">
          <div class="cert-thumb">
            ${c.image ? `<img src="${esc(c.image)}" alt="${esc(c.title)} certificate" loading="lazy" />` : icon("file", "icon cert-icon")}
            <span class="cert-open">${icon("external")} View</span>
          </div>
          <div class="cert-body">
            <p class="cert-title">${esc(c.title)}</p>
            <p class="cert-meta"><span class="pill">${esc(c.issuer)}</span>${c.date ? `<span class="mono muted">${esc(c.date)}</span>` : ""}</p>
          </div>
        </a>`),

    contact: () => `
      <div class="contact card reveal">
        <div>
          <span class="eyebrow">06</span>
          <h2>Let's work together</h2>
          <p class="muted">${rich(P.contactMessage || P.goal || "")}</p>
        </div>
        <div class="contact-actions">
          ${P.email ? `<a class="contact-item" href="mailto:${esc(P.email)}">${icon("mail")}<span><small>Email</small>${esc(P.email)}</span></a>` : ""}
          ${P.phone ? `<a class="contact-item" href="${telHref(P.phone)}">${icon("phone")}<span><small>Phone</small>${esc(P.phone)}</span></a>` : ""}
          ${list(P.links, (l) => `<a class="contact-item" href="${esc(l.url)}" target="_blank" rel="noopener">${icon(l.icon || "globe")}<span><small>${esc(l.label)}</small>${esc(l.url.replace(/^https?:\/\/(www\.)?/, ""))}</span></a>`)}
        </div>
      </div>`,

    footer: () => `<p>© ${new Date().getFullYear()} ${esc(P.name)}</p><a href="#top" class="muted">Back to top ↑</a>`,
  };

  document.querySelectorAll("[data-render]").forEach((el) => {
    const fn = renderers[el.dataset.render];
    if (fn) el.innerHTML = fn();
  });

  /* ─────────── Theme toggle ─────────── */

  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const paintThemeBtn = () => (themeBtn.innerHTML = icon(root.dataset.theme === "dark" ? "sun" : "moon"));
  paintThemeBtn();
  themeBtn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    paintThemeBtn();
  });

  /* ─────────── Mobile menu ─────────── */

  const menuBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const setMenu = (open) => {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.innerHTML = icon(open ? "close" : "menu");
  };
  setMenu(false);
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  /* ─────────── Project filters ─────────── */

  document.querySelectorAll(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
      const f = btn.dataset.filter;
      document.querySelectorAll(".project").forEach((card) => {
        card.hidden = f !== "*" && !card.dataset.categories.split("|").includes(f);
      });
    })
  );

  /* ─────────── Scroll effects ─────────── */

  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const fillBars = (scope) =>
    scope.querySelectorAll(".bar-fill").forEach((b) => (b.style.width = b.dataset.level + "%"));

  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("visible");
          fillBars(e.target);
          revealObs.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

    // Highlight the nav link of the section on screen
    const links = [...navLinks.querySelectorAll("a")];
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    fillBars(document);
  }
})();
