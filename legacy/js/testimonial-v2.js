(function () {
  "use strict";

  function init() {
    const section = document.querySelector(".tt-testimonial-section");
    if (!section) return;

    const wrapper = section.querySelector(".tt-carousel");
    const cards = Array.from(section.querySelectorAll(".tt-card"));
    const dots = Array.from(section.querySelectorAll(".tt-dot"));
    const images = Array.from(section.querySelectorAll(".tt-side-image"));
    const statPairs = Array.from(section.querySelectorAll(".tt-stat-pair"));
    const prevBtn = section.querySelector(".tt-arrow-prev");
    const nextBtn = section.querySelector(".tt-arrow-next");

    if (!wrapper || !cards.length) return;

    const TOTAL = cards.length;
    const DELAY = 4500;
    const THRESH = 50;

    let current = 0;
    let timer = null;
    let paused = false;

    /* ---- RENDER ---- */
    function render() {
      cards.forEach((c, i) => {
        const isActive = i === current;
        c.classList.toggle("active", isActive);
        c.setAttribute("aria-hidden", isActive ? "false" : "true");
      });
      dots.forEach((d, i) => {
        d.classList.toggle("active", i === current);
        d.setAttribute("aria-selected", i === current ? "true" : "false");
      });
      images.forEach((img, i) => {
        img.classList.toggle("active", i === current);
      });
      statPairs.forEach((s, i) => {
        s.classList.toggle("active", i === current);
      });
    }

    function go(dir) {
      current = (current + dir + TOTAL) % TOTAL;
      render();
    }

    /* ---- AUTO-PLAY ---- */
    function start() {
      if (paused) return;
      clearInterval(timer);
      timer = setInterval(() => go(1), DELAY);
    }
    function stop() {
      clearInterval(timer);
    }

    /* ---- PAUSE OFF-SCREEN ---- */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          paused = !entries[0].isIntersecting;
          paused ? stop() : start();
        },
        { threshold: 0.2 },
      ).observe(section);
    }

    /* ---- SWIPE / DRAG ---- */
    let x0 = 0,
      y0 = 0,
      down = false,
      moved = false;

    function onDown(e) {
      stop();
      down = true;
      moved = false;
      const pt = e.touches ? e.touches[0] : e;
      x0 = pt.clientX;
      y0 = pt.clientY;
    }

    function onMove(e) {
      if (!down || !e.touches) return;
      const dx = Math.abs(e.touches[0].clientX - x0);
      const dy = Math.abs(e.touches[0].clientY - y0);
      if (dx > dy && dx > 8) {
        e.preventDefault();
        moved = true;
      }
    }

    function onUp(e) {
      if (!down) return;
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const diff = endX - x0;
      if (Math.abs(diff) > THRESH) go(diff < 0 ? 1 : -1);
      down = false;
      start();
    }

    wrapper.addEventListener("touchstart", onDown, { passive: true });
    wrapper.addEventListener("touchmove", onMove, { passive: false });
    wrapper.addEventListener("touchend", onUp, { passive: true });

    /* ---- PREV / NEXT ARROWS ---- */
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        go(-1);
        stop();
        start();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        go(1);
        stop();
        start();
      });
    }

    /* Dot navigation */
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        current = i;
        render();
        stop();
        start();
      });
    });

    render();
    start();
  }

  /* ---- PERSPECTIVE WARP FOR DEVICE SCREENSHOT ----
     Maps each flat screenshot onto the exact quad measured from the
     laptop photo's screen corners, so the content itself skews to
     match the photographed perspective (not just clipped to it). */
  function initDeviceWarp() {
    const screen = document.querySelector(".tt-device-screen");
    if (!screen) return;

    const images = Array.from(screen.querySelectorAll(".tt-side-image"));
    if (!images.length) return;

    // Corners in unit-square order (0,0) (1,0) (1,1) (0,1), as fractions
    // of the .tt-device-screen box - matches the clip-path polygon.
    const QUAD = [
      [0.0745, 0.0453],
      [1, 0],
      [0.9068, 1],
      [0, 0.8314],
    ];

    function computeCoeffs(dstPx, w, h) {
      const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = dstPx;
      const dx1 = x1 - x2,
        dx2 = x3 - x2,
        dx3 = x0 - x1 + x2 - x3;
      const dy1 = y1 - y2,
        dy2 = y3 - y2,
        dy3 = y0 - y1 + y2 - y3;
      const den = dx1 * dy2 - dx2 * dy1;
      let g = 0,
        h2 = 0;
      if (Math.abs(dx3) > 1e-9 || Math.abs(dy3) > 1e-9) {
        g = (dx3 * dy2 - dx2 * dy3) / den;
        h2 = (dx1 * dy3 - dx3 * dy1) / den;
      }
      const a = x1 - x0 + g * x1;
      const b = x3 - x0 + h2 * x3;
      const c = x0;
      const d = y1 - y0 + g * y1;
      const e = y3 - y0 + h2 * y3;
      const f = y0;
      return {
        a: a / w,
        b: b / h,
        c,
        d: d / w,
        e: e / h,
        f,
        g: g / w,
        h: h2 / h,
      };
    }

    function apply() {
      const w = screen.clientWidth;
      const h = screen.clientHeight;
      if (!w || !h) return;
      const dstPx = QUAD.map(([fx, fy]) => [fx * w, fy * h]);
      const co = computeCoeffs(dstPx, w, h);
      const m = `matrix3d(${co.a}, ${co.d}, 0, ${co.g}, ${co.b}, ${co.e}, 0, ${co.h}, 0, 0, 1, 0, ${co.c}, ${co.f}, 0, 1)`;
      images.forEach((img) => {
        img.style.transformOrigin = "0 0";
        img.style.transform = m;
      });
    }

    apply();

    if ("ResizeObserver" in window) {
      new ResizeObserver(apply).observe(screen);
    } else {
      window.addEventListener("resize", apply);
    }
  }

  function initAll() {
    init();
    initDeviceWarp();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
