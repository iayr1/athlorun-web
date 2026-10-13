(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  // ---- Theme toggle (remembered per browser) ----
  var THEME_KEY = "athlorun-theme";
  function storedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function applyTheme(theme) {
    if (theme) root.setAttribute("data-theme", theme);
    else root.removeAttribute("data-theme");
  }
  applyTheme(storedTheme());

  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var themeBtn = document.querySelector("[data-theme-toggle]");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
      });
    }

    // ---- Mobile menu ----
    var menuBtn = document.querySelector("[data-menu-toggle]");
    var links = document.querySelector(".nav-links");
    if (menuBtn && links) {
      menuBtn.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // ---- Footer year ----
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    // ---- Reveal on scroll ----
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }

    // ---- Table of contents highlight ----
    var tocLinks = document.querySelectorAll(".toc a[href^='#']");
    if (tocLinks.length && "IntersectionObserver" in window) {
      var map = {};
      tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
      var tocObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            tocLinks.forEach(function (a) { a.classList.remove("active"); });
            var link = map[entry.target.id];
            if (link) link.classList.add("active");
          }
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      Object.keys(map).forEach(function (id) {
        var section = document.getElementById(id);
        if (section) tocObserver.observe(section);
      });
    }

    // ---- Email-backed forms (static hosting: open the user's mail client) ----
    document.querySelectorAll("form[data-mailto]").forEach(function (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var to = form.getAttribute("data-mailto");
        var subject = form.getAttribute("data-subject") || "Athlorun request";
        var lines = [];
        form.querySelectorAll("input, select, textarea").forEach(function (field) {
          if (!field.name || field.type === "submit") return;
          var label = field.getAttribute("data-label") || field.name;
          var value = field.type === "checkbox" ? (field.checked ? "Yes" : "No") : field.value.trim();
          if (value) lines.push(label + ": " + value);
        });
        var typeField = form.querySelector("[name='topic']");
        if (typeField && typeField.value) subject += " — " + typeField.value;

        var href = "mailto:" + to +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(lines.join("\n") + "\n\nSent from athlorun website");
        window.location.href = href;

        var success = form.parentElement.querySelector(".form-success");
        if (success) success.classList.add("show");
      });
    });
  });
})();
