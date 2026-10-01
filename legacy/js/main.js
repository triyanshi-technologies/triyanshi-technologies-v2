(function () {
  /* =========================================
     Intersection Observer for Scroll Reveals
  ========================================= */
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-group, .timeline-item",
  );

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function prepareRollingStat(el) {
    var numberEl = el.querySelector(".stat-number[data-count-to]");
    if (!numberEl || numberEl.dataset.countPrepared === "true") return;

    var target = parseInt(numberEl.getAttribute("data-count-to"), 10);
    if (Number.isNaN(target)) return;

    var suffix = numberEl.getAttribute("data-count-suffix") || "";
    numberEl.dataset.countPrepared = "true";
    numberEl.setAttribute("aria-label", target + suffix);

    if (prefersReducedMotion) return;

    var digits = String(target).split("");
    var rollerEl = document.createElement("span");
    rollerEl.className = "stat-roller";
    rollerEl.setAttribute("aria-hidden", "true");

    digits.forEach(function (digitChar, index) {
      var digit = parseInt(digitChar, 10);
      var digitWindow = document.createElement("span");
      var digitTrack = document.createElement("span");
      var extraCycles = index + 1;
      var stepCount = 0;

      digitWindow.className = "stat-digit-window";
      digitTrack.className = "stat-digit-track";
      digitTrack.style.transitionDelay = index * 90 + "ms";

      for (var cycle = 0; cycle < extraCycles; cycle += 1) {
        for (var value = 0; value <= 9; value += 1) {
          var digitNode = document.createElement("span");
          digitNode.className = "stat-digit";
          digitNode.textContent = String(value);
          digitTrack.appendChild(digitNode);
          stepCount += 1;
        }
      }

      for (var finalValue = 0; finalValue <= digit; finalValue += 1) {
        var finalDigitNode = document.createElement("span");
        finalDigitNode.className = "stat-digit";
        finalDigitNode.textContent = String(finalValue);
        digitTrack.appendChild(finalDigitNode);
        stepCount += 1;
      }

      digitTrack.dataset.rollOffset = String(stepCount - 1);
      digitWindow.appendChild(digitTrack);
      rollerEl.appendChild(digitWindow);
    });

    if (suffix) {
      var suffixEl = document.createElement("span");
      suffixEl.className = "stat-suffix";
      suffixEl.textContent = suffix;
      suffixEl.setAttribute("aria-hidden", "true");
      rollerEl.appendChild(suffixEl);
    }

    numberEl.textContent = "";
    numberEl.appendChild(rollerEl);
  }

  /* Rolling stat animation */
  function animateStatCount(el, baseDelay) {
    var numberEl = el.querySelector(".stat-number[data-count-to]");
    if (!numberEl || numberEl.dataset.countAnimated === "true") return;

    var target = parseInt(numberEl.getAttribute("data-count-to"), 10);
    if (Number.isNaN(target)) return;

    var suffix = numberEl.getAttribute("data-count-suffix") || "";

    numberEl.dataset.countAnimated = "true";

    setTimeout(function () {
      if (prefersReducedMotion) {
        numberEl.textContent = target + suffix;
        return;
      }

      var digitTracks = numberEl.querySelectorAll(".stat-digit-track");
      numberEl.classList.add("is-rolling");

      requestAnimationFrame(function () {
        digitTracks.forEach(function (track) {
          track.style.transform =
            "translateY(-" + track.dataset.rollOffset + "em)";
        });
      });
    }, baseDelay);
  }

  function updateTimelineProgress() {
    var container = document.querySelector(".timeline-container");
    var progressBar = document.querySelector(".timeline-line-progress");
    if (!container || !progressBar) return;

    var allItems = container.querySelectorAll(".timeline-item");
    var activeItems = container.querySelectorAll(".timeline-item.active");
    if (!activeItems.length) return;

    /* Last item active → fill the entire line */
    if (activeItems.length >= allItems.length) {
      progressBar.style.height = "100%";
      return;
    }

    var lastActive = activeItems[activeItems.length - 1];
    var dot = lastActive.querySelector(".timeline-dot");
    if (!dot) return;

    /* offsetTop is scroll-independent; dot is absolutely positioned inside item */
    var dotCenterY =
      lastActive.offsetTop + dot.offsetTop + dot.offsetHeight / 2;
    var progress = Math.min(
      Math.max((dotCenterY / container.offsetHeight) * 100, 0),
      100,
    );
    progressBar.style.height = progress + "%";
  }

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("active");
      if (entry.target.classList.contains("timeline-item"))
        updateTimelineProgress();

      /* fire count-up for every stat item in this reveal region */
      entry.target.querySelectorAll("[data-roll]").forEach(function (el) {
        var baseDelay = (parseInt(el.getAttribute("data-roll"), 10) || 0) * 120;
        animateStatCount(el, baseDelay);
      });

      observer.unobserve(entry.target);
    });
  }, revealOptions);

  document.querySelectorAll("[data-roll]").forEach(function (el) {
    prepareRollingStat(el);
  });

  revealElements.forEach(function (el) {
    revealOnScroll.observe(el);
  });

  /* =========================================
     Brand Logo Marquee
  ========================================= */
  (function renderBrandMarquee() {
    var logos = window.BRAND_LOGOS;
    var trackForward = document.getElementById("brand-track-forward");
    var trackReverse = document.getElementById("brand-track-reverse");
    if (!logos || (!trackForward && !trackReverse)) return;

    function buildTrack(stripNumber) {
      var stripLogos = logos
        .filter(function (logo) {
          return logo.strip === stripNumber;
        })
        .sort(function (a, b) {
          return a.position - b.position;
        });
      if (!stripLogos.length) return "";

      var copies = [];
      for (var copyIndex = 0; copyIndex < 3; copyIndex += 1) {
        copies.push(
          stripLogos
            .map(function (logo) {
              var isFirstCopy = copyIndex === 0;
              return (
                '<div class="brand-logo' +
                (logo.compact ? " brand-logo-icon" : "") +
                (logo.wide ? " brand-logo-wide" : "") +
                '">' +
                '<img src="assets/brands/' +
                logo.file +
                '" alt="' +
                (isFirstCopy ? logo.name : "") +
                '" loading="' +
                (isFirstCopy ? "lazy" : "eager") +
                '" width="160" height="45">' +
                "</div>"
              );
            })
            .join(""),
        );
      }
      return copies.join("");
    }

    if (trackForward) trackForward.innerHTML = buildTrack(1);
    if (trackReverse) trackReverse.innerHTML = buildTrack(2);
  })();

  /* =========================================
     Featured Projects - Three-Level Navigation
  ========================================= */
  var fpData = {
    ecommerce: {
      services: [
        {
          id: "shopify",
          label: "Shopify",
          projects: [
            {
              name: "Artisan & Co.",
              desc: "Custom Shopify Plus theme with immersive 3D product viewer and one-click checkout.",
              tags: ["Shopify Plus", "Custom Theme", "Liquid"],
              metric: "200% AOV Increase",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "NordicHome Store",
              desc: "Headless Shopify storefront powered by Next.js for sub-second page loads.",
              tags: ["Shopify Headless", "Next.js", "GraphQL"],
              metric: "3x Faster Load Time",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "FitFuel Supplements",
              desc: "Subscription commerce platform with loyalty reward engine and smart reorder flows.",
              tags: ["Shopify", "ReCharge", "Klaviyo"],
              metric: "45% Repeat Purchase Rate",
              href: "portfolio-detail/portfolio-detail",
            },
          ],
        },
        {
          id: "bigcommerce",
          label: "BigCommerce",
          projects: [
            {
              name: "TechGear Pro",
              desc: "B2B BigCommerce portal with tiered pricing, net payment terms, and full ERP sync.",
              tags: ["BigCommerce", "B2B Edition", "Custom API"],
              metric: "$2M+ Annual GMV",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "HomeNest Living",
              desc: "Multi-channel inventory sync across Amazon, eBay, and flagship BigCommerce store.",
              tags: ["BigCommerce", "Feedonomics", "NetSuite"],
              metric: "99.9% Inventory Accuracy",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "EliteSports Equipment",
              desc: "Streamlined checkout experience with AI upsell engine cutting abandonment significantly.",
              tags: ["BigCommerce", "Custom Theme", "Stripe"],
              metric: "35% Less Abandonment",
              href: "portfolio-detail/portfolio-detail",
            },
          ],
        },
        {
          id: "volusion",
          label: "Volusion",
          projects: [
            {
              name: "GourmetBox",
              desc: "Curated subscription box platform with flexible delivery scheduling and gifting options.",
              tags: ["Volusion", "Subscription", "Custom API"],
              metric: "80% Customer Retention",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "StyleCraft Fashion",
              desc: "Fashion storefront with AI-powered size recommendation tool to reduce return rates.",
              tags: ["Volusion", "Custom Tool", "Analytics"],
              metric: "60% Return Rate Reduction",
              href: "portfolio-detail/portfolio-detail",
            },
          ],
        },
        {
          id: "webflow",
          label: "Webflow",
          projects: [
            {
              name: "Axiom Agency",
              desc: "Hybrid Webflow CMS + eCommerce site with cinematic scroll animations and CMS blog.",
              tags: ["Webflow", "CMS", "Custom Code"],
              metric: "96 / 100 PageSpeed",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "Luminary Jewelry",
              desc: "Luxury brand Webflow store with product configurator and AR preview integration.",
              tags: ["Webflow", "Animations", "Commerce"],
              metric: "180% Conversion Increase",
              href: "portfolio-detail/portfolio-detail",
            },
          ],
        },
      ],
    },
    custom: {
      services: [
        {
          id: "performance",
          label: "Performance Optimization",
          projects: [
            {
              name: "FinCore Dashboard",
              desc: "Full-stack performance audit and re-architecture - load time reduced from 8s to 0.8s.",
              tags: ["React", "Bundle Optimization", "CDN"],
              metric: "10x Performance Gain",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "RetailIQ Platform",
              desc: "Database query restructuring and caching layer for a high-traffic retail analytics tool.",
              tags: ["PostgreSQL", "Redis", "Node.js"],
              metric: "95% Query Time Reduction",
              href: "portfolio-detail/portfolio-detail",
            },
          ],
        },
        {
          id: "saas",
          label: "SaaS Development",
          projects: [
            {
              name: "FlowSync",
              desc: "Team workflow automation SaaS with drag-and-drop pipeline builder and Slack integration.",
              tags: ["React", "Node.js", "Stripe", "AWS"],
              metric: "500+ Enterprise Users",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "InsightHub",
              desc: "B2B analytics SaaS with white-label dashboards and multi-tenant architecture.",
              tags: ["Vue.js", "Python", "PostgreSQL"],
              metric: "99.9% Uptime SLA",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "ComplianceKey",
              desc: "Automated regulatory compliance tracking platform built for fintech startups.",
              tags: ["Next.js", "Node.js", "MongoDB"],
              metric: "300+ Rules Automated",
              href: "portfolio-detail/portfolio-detail",
            },
          ],
        },
        {
          id: "dashboards",
          label: "Smart Dashboards",
          projects: [
            {
              name: "OpsVision",
              desc: "Real-time operations monitoring dashboard pulling live data from 50+ external sources.",
              tags: ["React", "WebSockets", "D3.js"],
              metric: "50+ Live Data Sources",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "SalesMatrix",
              desc: "Executive KPI dashboard with drill-down analytics and automated PDF report exports.",
              tags: ["Next.js", "Recharts", "REST API"],
              metric: "200+ Metrics Tracked",
              href: "portfolio-detail/portfolio-detail",
            },
          ],
        },
        {
          id: "erp",
          label: "ERP/CRM Systems",
          projects: [
            {
              name: "NexusERP",
              desc: "Custom manufacturing ERP with production scheduling, inventory control, and HR modules.",
              tags: ["Node.js", "PostgreSQL", "React", "Docker"],
              metric: "40% Efficiency Gain",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "ClientFlow CRM",
              desc: "Insurance sector CRM built for 3,000+ agents with policy tracking and claims management.",
              tags: ["Django", "React", "PostgreSQL"],
              metric: "3,000+ Agent Users",
              href: "portfolio-detail/portfolio-detail",
            },
          ],
        },
        {
          id: "ai",
          label: "AI Automations",
          projects: [
            {
              name: "DocuFlow AI",
              desc: "Intelligent document processing pipeline - extracts, classifies, and routes with 99% accuracy.",
              tags: ["Python", "OpenAI", "AWS Lambda"],
              metric: "90% Manual Work Eliminated",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "SupportAI",
              desc: "Conversational AI agent trained on client docs to autonomously handle Tier-1 support tickets.",
              tags: ["LangChain", "GPT-4", "Node.js"],
              metric: "70% Ticket Deflection",
              href: "portfolio-detail/portfolio-detail",
            },
            {
              name: "LeadScore AI",
              desc: "Predictive lead scoring model integrated into existing CRM with real-time sales recommendations.",
              tags: ["Python", "scikit-learn", "FastAPI"],
              metric: "35% Sales Cycle Reduction",
              href: "portfolio-detail/portfolio-detail",
            },
          ],
        },
      ],
    },
  };

  (function buildFpDataFromPortfolioData() {
    var data = window.PORTFOLIO_DATA;
    if (!data) return;

    function buildServices(category) {
      return data.groups[category].map(function (group) {
        var projects = [];
        Object.keys(data.projects).forEach(function (slug) {
          var proj = data.projects[slug];
          if (proj.home.category === category && proj.home.group === group.id) {
            projects.push({
              name: proj.name,
              desc: proj.desc,
              tags: proj.tags,
              features: proj.features,
              metric: proj.category,
              domain: proj.domain,
              position: proj.position,
              href: proj.href,
            });
          }
        });
        return { id: group.id, label: group.label, projects: projects };
      });
    }

    fpData.ecommerce = { services: buildServices("ecommerce") };
    fpData.custom = { services: buildServices("custom") };
  })();

  var fpCatBtns = document.querySelectorAll(".fp-cat");
  var fpCatBar = document.querySelector(".fp-cat-bar");
  var fpSvcsEl = document.getElementById("fp-svcs");
  var fpGridEl = document.getElementById("fp-grid");

  if (fpCatBtns.length && fpSvcsEl && fpGridEl) {
    var fpActiveCat = "ecommerce";
    var fpActiveSvc = fpData.ecommerce.services[0].id;

    function fpMoveCatBar(btn) {
      if (!fpCatBar || !btn) return;
      var track = btn.closest(".fp-cats-inner");
      if (!track) return;
      var tRect = track.getBoundingClientRect();
      var bRect = btn.getBoundingClientRect();
      fpCatBar.style.left = bRect.left - tRect.left + "px";
      fpCatBar.style.width = bRect.width + "px";
    }

    function fpMoveSvcIndicator(btn, immediate) {
      var indicator = fpSvcsEl.querySelector(".fp-svc-indicator");
      if (!indicator || !btn) return;
      var containerRect = fpSvcsEl.getBoundingClientRect();
      var btnRect = btn.getBoundingClientRect();
      if (immediate) {
        indicator.classList.add("no-transition");
      } else {
        indicator.classList.remove("no-transition");
      }
      indicator.style.left =
        btnRect.left - containerRect.left + fpSvcsEl.scrollLeft + "px";
      indicator.style.top =
        btnRect.top - containerRect.top + fpSvcsEl.scrollTop + "px";
      indicator.style.width = btnRect.width + "px";
      indicator.style.height = btnRect.height + "px";
      if (immediate) {
        indicator.getBoundingClientRect(); // force reflow
        indicator.classList.remove("no-transition");
      }
    }

    function fpRenderServices(catId) {
      var cat = fpData[catId];
      if (!cat) return;
      var indicatorHtml = '<span class="fp-svc-indicator"></span>';
      fpSvcsEl.innerHTML =
        indicatorHtml +
        cat.services
          .map(function (svc) {
            return (
              '<button class="fp-svc' +
              (svc.id === fpActiveSvc ? " active" : "") +
              '" data-svc="' +
              svc.id +
              '">' +
              svc.label +
              "</button>"
            );
          })
          .join("");
      fpSvcsEl.querySelectorAll(".fp-svc").forEach(function (btn) {
        btn.addEventListener("click", function () {
          fpSvcsEl.querySelectorAll(".fp-svc").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          fpActiveSvc = btn.getAttribute("data-svc");
          fpMoveSvcIndicator(btn);
          fpRenderGrid(fpActiveCat, fpActiveSvc);
        });
      });
      var initBtn = fpSvcsEl.querySelector(".fp-svc.active");
      if (initBtn) {
        setTimeout(function () {
          fpMoveSvcIndicator(initBtn, true);
        }, 50);
      }
    }

    var fpArrow =
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

    function fpDomainHref(domain) {
      if (!domain) return "#";
      return /^https?:\/\//i.test(domain) ? domain : "https://" + domain;
    }

    function fpNormalizeDomain(domain, keepWww) {
      if (!domain) return "";
      var clean = domain
        .replace(/^https?:\/\//i, "")
        .replace(/^NZ\s*-\s*/i, "")
        .replace(/^US\s*-\s*/i, "")
        .split(/[/?#]/)[0]
        .replace(/\/$/, "")
        .toLowerCase();
      return keepWww ? clean : clean.replace(/^www\./, "");
    }

    function fpProjectImageAttrs(domain) {
      var normalized = fpNormalizeDomain(domain);
      var fallback = "assets/sample-image.webp";
      var primary = normalized
        ? "project-images/full website/" + normalized + ".webp"
        : fallback;

      return (
        'src="' +
        primary +
        '" data-fallback-src="' +
        fallback +
        '" onerror="this.onerror=null;this.src=this.dataset.fallbackSrc;"'
      );
    }

    function fpGetAllProjectsHref(svcId) {
      var portfolioPages = {
        shopify: "portfolio/shopify",
        bigcommerce: "portfolio/bigcommerce",
        volusion: "portfolio/volusion",
        webflow: "portfolio/webflow"
      };

      return portfolioPages[svcId] || "portfolio/index";
    }

    function fpRenderGrid(catId, svcId) {
      var cat = fpData[catId];
      if (!cat) return;
      var svc = cat.services.find(function (s) {
        return s.id === svcId;
      });
      if (!svc || !svc.projects.length) {
        fpGridEl.innerHTML =
          '<div class="fp-empty"><strong>Projects coming soon</strong><span>We\'re curating our best work for this service.</span></div>';
        return;
      }
      var orderedProjects = svc.projects.slice().sort(function (a, b) {
        return (a.position || 0) - (b.position || 0);
      });
      var visibleProjects = orderedProjects.slice(0, 3);
      var viewAllHtml =
        svc.projects.length > visibleProjects.length
          ? '<div class="fp-view-all"><a class="btn btn-primary" href="' +
          fpGetAllProjectsHref(svcId) +
          '">View All Projects ' +
          fpArrow +
          "</a></div>"
          : "";

      fpGridEl.innerHTML =
        visibleProjects
          .map(function (p, i) {
            var domain = p.domain || "";
            var liveHref = fpDomainHref(domain);
            var features = (p.features && p.features.length ? p.features : [p.desc]).slice(0, 4);
            var featuresHtml = features
              .map(function (f) {
                return (
                  '<li><span class="fp-feature-icon" aria-hidden="true">' +
                  fpArrow +
                  "</span><span>" +
                  f +
                  "</span></li>"
                );
              })
              .join("");
            return (
              '<div class="fp-card" data-live-href="' +
              liveHref +
              '" role="link" aria-label="Visit live site for ' +
              p.name +
              '" aria-expanded="false" tabindex="0" style="animation-delay:' +
              i * 90 +
              'ms">' +
              "<img " +
              fpProjectImageAttrs(domain) +
              ' alt="" class="fp-card-bg" loading="lazy" aria-hidden="true">' +
              '<div class="fp-card-label">' +
              '<div class="fp-card-top">' +
              '<strong class="fp-card-name">' +
              p.name +
              "</strong>" +
              '<a class="fp-domain" href="' +
              liveHref +
              '" target="_blank" rel="noopener noreferrer">' +
              domain +
              "</a>" +
              '<span class="fp-card-toggle" aria-hidden="true">' +
              '<span class="fp-toggle-expand"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></span>' +
              '<span class="fp-toggle-collapse"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>' +
              "</span>" +
              "</div>" +
              '<div class="fp-card-detail">' +
              '<ul class="fp-card-features">' +
              featuresHtml +
              "</ul>" +
              "</div>" +
              "</div>" +
              "</div>"
            );
          })
          .join("") + viewAllHtml;

      /* Keyboard navigation per-card (re-attached on each render) */
      fpGridEl.querySelectorAll(".fp-card").forEach(function (card) {
        card.addEventListener("keydown", function (e) {
          if (
            (e.key === "Enter" || e.key === " ") &&
            !card.classList.contains("is-expanded")
          ) {
            e.preventDefault();
            card.click();
          }
          if (e.key === "Escape" && card.classList.contains("is-expanded")) {
            card.classList.remove("is-expanded");
            card.setAttribute("aria-expanded", "false");
          }
        });
      });
    }

    fpCatBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        fpCatBtns.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        fpMoveCatBar(btn);
        fpActiveCat = btn.getAttribute("data-cat");
        fpActiveSvc = fpData[fpActiveCat].services[0].id;
        fpRenderServices(fpActiveCat);
        fpRenderGrid(fpActiveCat, fpActiveSvc);
      });
    });

    setTimeout(function () {
      var initCat = document.querySelector(".fp-cat.active");
      if (initCat) fpMoveCatBar(initCat);
    }, 100);

    window.addEventListener(
      "resize",
      function () {
        var activeCat = document.querySelector(".fp-cat.active");
        if (activeCat) fpMoveCatBar(activeCat);
        var activeSvc = fpSvcsEl.querySelector(".fp-svc.active");
        if (activeSvc) fpMoveSvcIndicator(activeSvc, true);
      },
      { passive: true },
    );

    fpRenderServices(fpActiveCat);
    fpRenderGrid(fpActiveCat, fpActiveSvc);

    /* Delegated click handler - attached ONCE to fpGridEl, works for all re-renders */
    fpGridEl.addEventListener("click", function (e) {
      var card = e.target.closest(".fp-card");
      if (!card) return;
      if (e.target.closest(".fp-domain")) return;

      if (e.target.closest(".fp-card-toggle")) {
        if (card.classList.contains("is-expanded")) {
          card.classList.remove("is-expanded");
          card.setAttribute("aria-expanded", "false");
        } else {
          fpGridEl
            .querySelectorAll(".fp-card.is-expanded")
            .forEach(function (other) {
              other.classList.remove("is-expanded");
              other.setAttribute("aria-expanded", "false");
            });
          card.classList.add("is-expanded");
          card.setAttribute("aria-expanded", "true");
        }
        return;
      }

      var href = card.getAttribute("data-live-href");
      if (href) window.open(href, "_blank", "noopener,noreferrer");
    });

    function fpCollapseAll() {
      fpGridEl
        .querySelectorAll(".fp-card.is-expanded")
        .forEach(function (card) {
          card.classList.remove("is-expanded");
          card.setAttribute("aria-expanded", "false");
        });
    }

    /* Desktop outside-click */
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".fp-card")) fpCollapseAll();
    });

    /* iOS Safari: click doesn't fire on non-interactive elements,
       so also listen for touchend (with scroll guard) */
    var fpTouchMoved = false;
    document.addEventListener(
      "touchstart",
      function () {
        fpTouchMoved = false;
      },
      { passive: true },
    );
    document.addEventListener(
      "touchmove",
      function () {
        fpTouchMoved = true;
      },
      { passive: true },
    );
    document.addEventListener(
      "touchend",
      function (e) {
        if (!fpTouchMoved && !e.target.closest(".fp-card")) fpCollapseAll();
      },
      { passive: true },
    );
  }
})();

/* =========================================
   eCommerce App Ecosystem
   Edit APPS to add or remove cards. Cards render in ascending `index` order (lower = first).
   logo: filename in assets/app-logo/
========================================= */
(function () {
  var APPS = [
    { index: 4, name: "Reverto", cat: "Returns & Exchanges", logo: "Reverto.webp", desc: "Handle returns, exchanges and cancellations from one portal, with automated refunds and updates." },
    { index: 5, name: "Spur", cat: "AI Chat & Helpdesk", logo: "spur.webp", desc: "Automate Instagram and WhatsApp chats, recover carts and reply from one shared inbox." },
    { index: 6, name: "Shipturtle", cat: "Multi-Vendor Marketplace", logo: "ship turtle.webp", desc: "Turn your store into a multi-vendor marketplace with vendor payouts and order routing." },
    { index: 1, name: "Judge.me", cat: "Reviews", logo: "Judgeme.webp", desc: "Collect photo and video reviews and show star ratings that build shopper trust." },
    { index: 7, name: "BotSpace", cat: "AI Chat & Helpdesk", logo: "Botspace.webp", desc: "AI agent that answers questions and recovers carts across chat, email and WhatsApp." },
    { index: 8, name: "SelfServe", cat: "Order Editing & Upsell", logo: "SelfServe.webp", desc: "Let customers edit orders, fix addresses and cancel, while post-purchase upsells lift AOV." },
    { index: 9, name: "Parcelous", cat: "Order Tracking", logo: "Parcelous.webp", desc: "A tracking page with live shipment updates that cuts “where is my order” tickets." },
    { index: 10, name: "Parcelis", cat: "Shipping Protection", logo: "Parcelis.webp", desc: "Shipping protection at checkout that covers lost, damaged or stolen packages." },
    { index: 11, name: "Dynamic Pricing AI", cat: "Pricing Optimization", logo: "DynamicPricingAi.webp", desc: "Run price tests and demand-based AI pricing to grow your profit margins." },
    { index: 12, name: "Ai Trillion ", cat: "Loyalty, WhatsApp & Reviews", logo: "AiT.webp", desc: "Loyalty points, reviews, WhatsApp and email marketing together in a single app." },
    { index: 13, name: "Adflipr", cat: "Email Marketing", logo: "Adflipr.webp", desc: "Email automations for abandoned carts, welcome series and win-back campaigns." },
    { index: 14, name: "BundleSuite", cat: "Bundle Builder", logo: "BundleSuite.webp", desc: "Build mix-and-match, box and volume-discount bundles without writing code." },
    { index: 15, name: "TryPoint", cat: "AI Virtual Try-On", logo: "TryPoint.webp", desc: "AI virtual try-on that helps fashion shoppers decide faster and cuts returns." },
    { index: 16, name: "WishlistSuite", cat: "Wishlist", logo: "WishlistSuite.webp", desc: "Guest wishlists, save for later, and price-drop or back-in-stock alerts." },
    { index: 2, name: "Razorpay", cat: "Payments & Checkout", logo: "Razorpay.webp", desc: "Faster checkout with pre-filled addresses and UPI or card payments, plus COD controls." },
    { index: 3, name: "Recurpay", cat: "Subscriptions", logo: "Recurpay.webp", desc: "Subscriptions and prepaid plans with a self-serve portal and failed-payment recovery." },
  ];

  var grid = document.getElementById("apps-grid");
  var nav = document.getElementById("apps-nav");
  if (!grid) return;

  grid.innerHTML = APPS.slice()
    .sort(function (a, b) { return a.index - b.index; })
    .map(function (a) {
    return (
      '<div class="apps-card reveal-item">' +
      '<div class="apps-card-head">' +
      '<img class="apps-logo" src="assets/app-logo/' + encodeURI(a.logo) + '" alt="" width="56" height="56" loading="lazy" decoding="async">' +
      '<div class="apps-card-title"><strong class="apps-name">' + a.name + '</strong><span class="apps-cat">' + a.cat + "</span></div>" +
      "</div>" +
      '<p class="apps-desc">' + a.desc + "</p>" +
      "</div>"
    );
  }).join("");

  /* Carousel controls (buttons only show below 1025px via CSS) */
  if (!nav) return;
  var btns = nav.querySelectorAll(".apps-nav-btn");
  function sync() {
    var max = grid.scrollWidth - grid.clientWidth - 2;
    btns[0].disabled = grid.scrollLeft <= 2;
    btns[1].disabled = grid.scrollLeft >= max;
  }
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var card = grid.querySelector(".apps-card");
      var step = card.getBoundingClientRect().width + 16;
      grid.scrollBy({ left: step * Number(b.dataset.dir), behavior: "smooth" });
    });
  });
  grid.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  sync();
})();
