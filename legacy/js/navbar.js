(function () {
  /* ============================================
     SCROLL EFFECT
  ============================================ */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener(
      "scroll",
      () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      },
      { passive: true },
    );
  }

  /* ============================================
     DESKTOP DROPDOWNS
  ============================================ */
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const navToggles = Array.from(document.querySelectorAll(".nav-toggle"));
  const desktopMode = window.matchMedia("(min-width: 1024px)");
  const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)");
  let closeTimer = null;
  let openItemRef = null;

  function syncDropdownPosition(item) {
    const menu = item.querySelector(".dd-menu");
    if (!menu || !desktopMode.matches) return;

    menu.style.left = "0";
    menu.style.right = "auto";
    //menu.style.transform = "translateY(0)";

    const viewportPadding = 12;
    const menuRect = menu.getBoundingClientRect();
    if (menuRect.right > window.innerWidth - viewportPadding) {
      const shiftLeft = window.innerWidth - viewportPadding - menuRect.right;
      menu.style.transform = `translateX(${shiftLeft}px) translateY(0)`;
      return;
    }

    if (menuRect.left < viewportPadding) {
      const shiftRight = viewportPadding - menuRect.left;
      menu.style.transform = `translateX(${shiftRight}px) translateY(0)`;
    }
  }

  function openItem(item) {
    clearTimeout(closeTimer);
    navItems.forEach((other) => {
      if (other !== item) closeItem(other);
    });
    item.classList.add("is-open");
    item.dataset.openedAt = String(Date.now());
    const toggle = item.querySelector(".nav-toggle");
    toggle?.setAttribute("aria-expanded", "true");
    const menu = item.querySelector(".dd-menu");
    menu?.setAttribute("aria-hidden", "false");
    openItemRef = item;
    syncDropdownPosition(item);
  }

  function closeItem(item) {
    item.classList.remove("is-open");
    delete item.dataset.openedAt;
    item.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "false");
    const menu = item.querySelector(".dd-menu");
    menu?.setAttribute("aria-hidden", "true");
    if (menu) {
      menu.style.left = "";
      menu.style.right = "";
      menu.style.transform = "";
    }
    if (openItemRef === item) openItemRef = null;
  }

  function closeAll() {
    clearTimeout(closeTimer);
    navItems.forEach(closeItem);
  }

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      if (!desktopMode.matches || !hoverCapable.matches) return;
      openItem(item);
    });
    item.addEventListener("mouseleave", () => {
      if (!desktopMode.matches || !hoverCapable.matches) return;
      closeTimer = setTimeout(() => closeItem(item), 90);
    });

    item.addEventListener("focusin", () => {
      clearTimeout(closeTimer);
      if (!item.classList.contains("is-open")) {
        openItem(item);
      }
    });

    item.addEventListener("focusout", (e) => {
      if (!desktopMode.matches || !hoverCapable.matches) return;
      if (!item.contains(e.relatedTarget)) {
        closeTimer = setTimeout(() => closeItem(item), 90);
      }
    });

    item.addEventListener("click", (e) => {
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest("a")) {
        closeItem(item);
      }
    });
  });

  navToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (toggle.matches("a.nav-toggle-link")) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const item = toggle.closest(".nav-item");
      if (!item) return;

      const isOpen = item.classList.contains("is-open");
      const openedAt = parseInt(item.dataset.openedAt || "0", 10);
      const justOpened = Date.now() - openedAt < 50;
      if (isOpen && !justOpened) {
        closeItem(item);
        toggle.blur();
        return;
      }

      if (!isOpen) {
        openItem(item);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (mobileMenu?.classList.contains("open")) {
      closeMobile({ restoreFocus: true });
      return;
    }

    const open = document.querySelector(".nav-item.is-open");
    if (open) {
      closeItem(open);
      open.querySelector(".nav-toggle")?.focus();
    }
  });

  document.addEventListener("click", (e) => {
    const target = e.target instanceof Element ? e.target : null;
    if (!target) return;
    if (
      target.closest(".nav-item") ||
      target.closest(".mobile-menu") ||
      target.closest(".mobile-menu-btn")
    ) {
      return;
    }
    closeAll();
  });

  window.addEventListener(
    "resize",
    () => {
      if (!desktopMode.matches) {
        closeAll();
      } else {
        navItems.forEach((item) => {
          if (item.classList.contains("is-open")) syncDropdownPosition(item);
        });
      }

      if (mobileMenu?.classList.contains("open") && desktopMode.matches) {
        closeMobile({ restoreFocus: false });
      }
    },
    { passive: true },
  );

  desktopMode.addEventListener?.("change", () => {
    closeAll();
  });

  /* ============================================
     MOBILE MENU
  ============================================ */
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const mobClose = document.querySelector(".mob-close");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileOverlay = document.querySelector(".mobile-overlay");

  function resetMobileAccordions() {
    const mobileMenu = document.querySelector(".mobile-menu");
    if (!mobileMenu) return;
    mobileMenu.querySelectorAll(".mob-panel.open").forEach((panel) => {
      panel.classList.remove("open");
    });
    mobileMenu.querySelectorAll(".mob-sub-panel.open").forEach((panel) => {
      panel.classList.remove("open");
    });
    mobileMenu
      .querySelectorAll('.mob-toggle[aria-expanded="true"]')
      .forEach((toggle) => {
        toggle.setAttribute("aria-expanded", "false");
      });
    mobileMenu
      .querySelectorAll('.mob-sub-toggle[aria-expanded="true"]')
      .forEach((toggle) => {
        toggle.setAttribute("aria-expanded", "false");
      });
  }

  function openMobile() {
    if (!mobileMenu || !mobileOverlay || !mobileBtn) return;
    closeAll();
    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    mobileBtn.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    const firstFocusable = mobileMenu.querySelector("a, button");
    firstFocusable?.focus();
  }

  function closeMobile({ restoreFocus = true } = {}) {
    if (!mobileMenu || !mobileOverlay || !mobileBtn) return;
    mobileMenu.classList.remove("open");
    mobileOverlay.classList.remove("open");
    document.body.style.overflow = "";
    mobileBtn.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    resetMobileAccordions();
    if (restoreFocus) mobileBtn.focus();
  }

  mobileBtn?.addEventListener("click", () => {
    mobileMenu?.classList.contains("open")
      ? closeMobile({ restoreFocus: true })
      : openMobile();
  });
  mobClose?.addEventListener("click", () =>
    closeMobile({ restoreFocus: true }),
  );
  mobileOverlay?.addEventListener("click", () =>
    closeMobile({ restoreFocus: true }),
  );

  mobileMenu?.addEventListener("click", (e) => {
    const target = e.target instanceof Element ? e.target : null;
    if (target?.closest("a")) {
      closeMobile({ restoreFocus: false });
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu?.classList.contains("open")) {
      closeMobile({ restoreFocus: true });
    }
  });

  /* ============================================
     MOBILE ACCORDION - level 1 (.mob-toggle)
  ============================================ */
  document.querySelectorAll(".mob-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panelId = toggle.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      if (!panel) return;
      const isOpen = panel.classList.contains("open");
      panel.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  /* ============================================
     MOBILE ACCORDION - level 2 (.mob-sub-toggle)
  ============================================ */
  document.querySelectorAll(".mob-sub-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panelId = toggle.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      if (!panel) return;
      const isOpen = panel.classList.contains("open");
      panel.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  });
})();
