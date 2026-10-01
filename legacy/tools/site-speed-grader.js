(function () {
  "use strict";

  var CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];
  var METRIC_IDS = [
    { id: "first-contentful-paint", label: "FCP" },
    { id: "largest-contentful-paint", label: "LCP" },
    { id: "total-blocking-time", label: "TBT" },
    { id: "cumulative-layout-shift", label: "CLS" },
    { id: "speed-index", label: "Speed Index" },
  ];
  var PRIORITY_AUDITS = [
    "render-blocking-resources",
    "largest-contentful-paint-element",
    "lcp-lazy-loaded",
    "lcp-discovery",
    "server-response-time",
    "uses-responsive-images",
    "uses-optimized-images",
    "modern-image-formats",
    "offscreen-images",
    "unused-javascript",
    "legacy-javascript",
    "unminified-javascript",
    "unused-css-rules",
    "unminified-css",
    "total-byte-weight",
    "third-party-summary",
    "mainthread-work-breakdown",
    "bootup-time",
    "dom-size",
    "redirects",
  ];

  var LOADING_STEPS = [
    { delay: 0, text: "Connecting to your website...", pct: 12 },
    { delay: 3000, text: "Fetching desktop & mobile  data...", pct: 30 },
    { delay: 9000, text: "Running Core Web Vitals audit...", pct: 50 },
    { delay: 18000, text: "Analyzing render-blocking resources & JS payload...", pct: 68 },
    { delay: 28000, text: "Compiling prioritized fix list...", pct: 80 },
    { delay: 40000, text: "This page is heavier than most - still auditing...", pct: 88 },
    { delay: 55000, text: "Almost there, finishing final checks...", pct: 94 },
  ];
  var LOADING_TRAIL_STEP_MS = 10000;
  var LOADING_TRAIL_MAX_PCT = 97;

  var form = document.getElementById("speed-grade-form");
  var urlInput = document.getElementById("speed-url");
  var submitButton = document.getElementById("speed-submit");
  var errorBox = document.getElementById("speed-error");
  var loadingBox = document.getElementById("speed-loading");
  var loadingTitle = document.getElementById("speed-loading-title");
  var loadingCopy = document.getElementById("speed-loading-copy");
  var loadingBar = document.getElementById("speed-loading-bar");
  var emptyBox = document.getElementById("speed-empty");
  var resultsBox = document.getElementById("speed-results");
  var finalUrlEl = document.getElementById("speed-final-url");
  var strategyToggle = document.getElementById("speed-strategy-toggle");
  var metricGrid = document.getElementById("speed-metric-grid");
  var suggestionList = document.getElementById("speed-suggestion-list");
  var fixCard = document.getElementById("speed-fix-card");
  var fixCopy = document.getElementById("speed-fix-copy");
  var fixForm = document.getElementById("speed-fix-form");
  var fixSuccess = document.getElementById("speed-fix-success");
  var fixUrl = document.getElementById("fix-url");
  var fixConcern = document.getElementById("fix-concern");
  var fixReportSummary = document.getElementById("fix-report-summary");

  if (!form || !urlInput || !submitButton || !errorBox || !loadingBox || !emptyBox || !resultsBox) {
    return;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeUrl(rawValue) {
    var value = String(rawValue || "").trim();
    if (!value) {
      throw new Error("Enter a website URL to grade.");
    }

    if (!/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value)) {
      value = "https://" + value;
    }

    var parsed;
    try {
      parsed = new URL(value);
    } catch (e) {
      throw new Error("Enter a valid website URL, for example https://yourstore.com.");
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("Only public HTTP and HTTPS URLs can be graded.");
    }

    if (parsed.username || parsed.password) {
      throw new Error("Remove the username or password from the URL before grading it.");
    }

    if (isPrivateHost(parsed.hostname)) {
      throw new Error("Use a public website URL. Localhost and private network URLs cannot be graded.");
    }

    parsed.hash = "";
    return parsed.href;
  }

  function isPrivateHost(hostname) {
    var host = String(hostname || "").toLowerCase().replace(/^\[|\]$/g, "");
    if (!host || host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) {
      return true;
    }
    if (host.indexOf(":") !== -1) {
      return host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80:");
    }

    var match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
    if (!match) return false;

    var parts = match.slice(1).map(function (part) {
      return parseInt(part, 10);
    });
    if (parts.some(function (part) { return part < 0 || part > 255; })) return true;

    var a = parts[0];
    var b = parts[1];
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a === 169 && b === 254 ||
      a === 172 && b >= 16 && b <= 31 ||
      a === 192 && b === 168
    );
  }

  function getScoreInfo(score) {
    if (score === null || score === undefined || Number.isNaN(score)) {
      return { label: "Not available", className: "" };
    }
    if (score < 50) return { label: "Poor", className: "speed-score-poor" };
    if (score < 90) return { label: "Needs Improvement", className: "speed-score-average" };
    return { label: "Good", className: "speed-score-good" };
  }

  function scoreToNumber(category) {
    if (!category || typeof category.score !== "number") return null;
    return Math.round(category.score * 100);
  }

  function getAuditSavings(audit) {
    if (!audit || !audit.details) return 0;
    return audit.details.overallSavingsMs || audit.details.overallSavingsBytes || 0;
  }

  function cleanDescription(text) {
    return String(text || "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/`/g, "")
      .trim();
  }

  function parsePageSpeedResult(data, requestedUrl, strategy) {
    var lighthouse = data && data.lighthouseResult ? data.lighthouseResult : null;
    if (!lighthouse) {
      throw new Error("Unable to retrieve a speed report for this URL.");
    }
    if (lighthouse.runtimeError && lighthouse.runtimeError.message) {
      throw new Error(lighthouse.runtimeError.message);
    }

    var categories = lighthouse.categories || {};
    var audits = lighthouse.audits || {};
    var scores = {
      performance: scoreToNumber(categories.performance),
      accessibility: scoreToNumber(categories.accessibility),
      "best-practices": scoreToNumber(categories["best-practices"]),
      seo: scoreToNumber(categories.seo),
    };

    var metrics = METRIC_IDS.map(function (metric) {
      var audit = audits[metric.id];
      return {
        id: metric.id,
        label: metric.label,
        title: audit && audit.title ? audit.title : metric.label,
        value: audit && audit.displayValue ? audit.displayValue : "Not available",
        score: audit && typeof audit.score === "number" ? Math.round(audit.score * 100) : null,
      };
    });

    var suggestions = collectSuggestions(audits);

    return {
      requestedUrl: requestedUrl,
      finalUrl: lighthouse.finalUrl || lighthouse.requestedUrl || data.id || requestedUrl,
      strategy: strategy,
      scores: scores,
      metrics: metrics,
      suggestions: suggestions,
      fetchTime: lighthouse.fetchTime || data.analysisUTCTimestamp || "",
    };
  }

  function collectSuggestions(audits) {
    var suggestions = Object.keys(audits || {})
      .map(function (id) {
        var audit = audits[id];
        var score = typeof audit.score === "number" ? audit.score : null;
        var hasSavings = getAuditSavings(audit) > 0;
        var isPriority = PRIORITY_AUDITS.indexOf(id) !== -1;
        var isOpportunity = audit.details && audit.details.type === "opportunity";
        var isActionable = audit.title && score !== null && score < 0.9 && (isOpportunity || hasSavings || isPriority);
        if (!isActionable) return null;
        return {
          id: id,
          title: audit.title,
          description: cleanDescription(audit.description || audit.explanation || "Review this performance audit and apply the recommended fix."),
          displayValue: audit.displayValue || "",
          score: score,
          savings: getAuditSavings(audit),
          priority: isPriority ? 1 : 0,
        };
      })
      .filter(Boolean)
      .sort(function (a, b) {
        if (b.priority !== a.priority) return b.priority - a.priority;
        if (b.savings !== a.savings) return b.savings - a.savings;
        return a.score - b.score;
      })
      .slice(0, 3);

    return suggestions;
  }

  function strategyLabel(strategy) {
    return strategy === "desktop" ? "Desktop" : "Mobile";
  }

  async function attemptPageSpeed(url, strategy) {
    try {
      return await window.TTApi.getPageSpeed(url, strategy);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(strategyLabel(strategy) + " request failed - check the site is publicly reachable and try again.");
      }
      throw error;
    }
  }

  async function runPageSpeed(url, strategy) {
    if (!window.TTApi) {
      throw new Error("Speed audit service is unavailable right now. Please try again.");
    }
    try {
      return await attemptPageSpeed(url, strategy);
    } catch (error) {
      return attemptPageSpeed(url, strategy);
    }
  }

  var loadingTimers = [];
  var loadingTrailId = null;

  function clearLoadingTimers() {
    loadingTimers.forEach(clearTimeout);
    loadingTimers = [];
    if (loadingTrailId) {
      clearInterval(loadingTrailId);
      loadingTrailId = null;
    }
  }

  function runLoadingTimeline() {
    LOADING_STEPS.forEach(function (step) {
      loadingTimers.push(
        setTimeout(function () {
          if (loadingCopy) loadingCopy.textContent = step.text;
          if (loadingBar) loadingBar.style.width = step.pct + "%";
        }, step.delay)
      );
    });

    var lastStep = LOADING_STEPS[LOADING_STEPS.length - 1];
    loadingTimers.push(
      setTimeout(function () {
        var trailPct = lastStep.pct;
        loadingTrailId = setInterval(function () {
          trailPct = Math.min(trailPct + 1, LOADING_TRAIL_MAX_PCT);
          if (loadingBar) loadingBar.style.width = trailPct + "%";
        }, LOADING_TRAIL_STEP_MS);
      }, lastStep.delay + LOADING_TRAIL_STEP_MS)
    );
  }

  function setLoading(isLoading) {
    form.setAttribute("aria-busy", isLoading ? "true" : "false");
    loadingBox.hidden = !isLoading;
    if (window.TTApi && window.TTApi.setButtonLoading) {
      window.TTApi.setButtonLoading(submitButton, isLoading, "Grading Speed...");
    } else {
      submitButton.disabled = isLoading;
      submitButton.textContent = isLoading ? "Grading..." : "Grade Speed";
    }

    clearLoadingTimers();
    loadingBox.classList.remove("speed-loading--compact");
    if (loadingTitle) loadingTitle.textContent = "Running full performance audit";
    if (isLoading) {
      if (loadingBar) {
        loadingBar.style.transition = "none";
        loadingBar.style.width = "0%";
        loadingBar.getBoundingClientRect();
        loadingBar.style.transition = "";
      }
      if (loadingCopy) loadingCopy.textContent = LOADING_STEPS[0].text;
      runLoadingTimeline();
    } else if (loadingBar) {
      loadingBar.style.width = "100%";
    }
  }

  /* Lightweight loading state for switching to a device tab whose
     report hasn't arrived yet (no fake progress timeline - the
     request is already in flight, remaining time is unknown). */
  function showTabPendingState(strategy) {
    clearLoadingTimers();
    resultsBox.hidden = true;
    emptyBox.hidden = true;
    clearError();
    loadingBox.classList.add("speed-loading--compact");
    if (loadingTitle) loadingTitle.textContent = "Waiting for this report";
    if (loadingCopy) loadingCopy.textContent = "Fetching the " + strategyLabel(strategy) + " report...";
    loadingBox.hidden = false;
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function clearError() {
    errorBox.textContent = "";
    errorBox.hidden = true;
  }

  function renderScores(scores) {
    CATEGORIES.forEach(function (category) {
      var score = scores[category];
      var scoreEl = document.getElementById("score-" + category);
      var labelEl = document.getElementById("label-" + category);
      var card = document.querySelector('[data-score-card="' + category + '"]');
      var info = getScoreInfo(score);
      if (!scoreEl || !labelEl || !card) return;

      card.classList.remove("speed-score-good", "speed-score-average", "speed-score-poor");
      if (info.className) card.classList.add(info.className);
      scoreEl.textContent = score === null ? "-" : String(score);
      labelEl.textContent = info.label;

      if (category === "performance") {
        var gaugeFill = document.getElementById("gauge-performance");
        if (gaugeFill) {
          var pct = score === null ? 0 : Math.min(Math.max(score, 0), 100);
          gaugeFill.style.strokeDashoffset = 264 - (264 * pct) / 100;
        }
      } else {
        var barFill = document.getElementById("bar-" + category);
        if (barFill) {
          var barPct = score === null ? 0 : Math.min(Math.max(score, 0), 100);
          barFill.style.width = barPct + "%";
        }
      }
    });
  }

  function renderMetrics(metrics) {
    var metricThresholds = {
      "first-contentful-paint": "< 1.8s optimal",
      "largest-contentful-paint": "< 2.5s optimal",
      "total-blocking-time": "< 200ms optimal",
      "cumulative-layout-shift": "< 0.1 optimal",
      "speed-index": "< 3.4s optimal"
    };

    metricGrid.innerHTML = metrics.map(function (metric) {
      var info = getScoreInfo(metric.score);
      var threshold = metricThresholds[metric.id] || "Lab Benchmark";
      return [
        '<div class="speed-metric-card ' + escapeHtml(info.className) + '">',
        '  <div class="speed-metric-top">',
        '    <span class="speed-metric-acronym">' + escapeHtml(metric.label) + '</span>',
        '    <span class="speed-metric-badge">' + escapeHtml(info.label) + '</span>',
        '  </div>',
        '  <strong class="speed-metric-value">' + escapeHtml(metric.value) + '</strong>',
        '  <span class="speed-metric-guide">' + escapeHtml(threshold) + '</span>',
        '</div>',
      ].join("");
    }).join("");
  }

  function renderSuggestions(suggestions) {
    if (!suggestions.length) {
      suggestionList.innerHTML = [
        '<div class="speed-suggestion-item speed-suggestion-item--empty">',
        '  <div class="speed-suggestion-badge">Status: Optimal</div>',
        '  <h4>No Critical Bottlenecks Detected</h4>',
        '  <p>Your site passed major performance checks. Continue monitoring regularly after core code deployments.</p>',
        '</div>',
      ].join("");
      return;
    }

    suggestionList.innerHTML = suggestions.map(function (item, index) {
      var displayValue = item.displayValue ? '<span class="speed-suggestion-savings">⚡ ' + escapeHtml(item.displayValue) + '</span>' : "";
      var impactLabel = index === 0 ? "High Impact" : (index === 1 ? "Medium Impact" : "Opportunity");
      return [
        '<article class="speed-suggestion-item">',
        '  <div class="speed-suggestion-head">',
        '    <span class="speed-impact-tag speed-impact-tag--' + (index + 1) + '">' + impactLabel + '</span>',
        '    ' + displayValue,
        '  </div>',
        '  <h4 class="speed-suggestion-title">' + escapeHtml(item.title) + '</h4>',
        '  <p class="speed-suggestion-desc">' + escapeHtml(item.description) + '</p>',
        '  <div class="speed-suggestion-footer">',
        '    <span class="speed-audit-tag">Technical Fix Required</span>',
        '  </div>',
        '</article>',
      ].join("");
    }).join("");
  }

  function renderResults(result) {
    emptyBox.hidden = true;
    resultsBox.hidden = false;
    finalUrlEl.textContent = result.finalUrl;
    setActiveToggle(result.strategy);
    renderScores(result.scores);
    renderMetrics(result.metrics);
    renderSuggestions(result.suggestions);
    updateFixForm(result);
  }

  function setActiveToggle(strategy) {
    if (!strategyToggle) return;
    Array.prototype.forEach.call(strategyToggle.querySelectorAll(".speed-toggle-btn"), function (btn) {
      var isActive = btn.getAttribute("data-strategy") === strategy;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function updateFixForm(result) {
    var performanceScore = result ? result.scores.performance : null;
    var lowScore = typeof performanceScore === "number" && performanceScore < 90;
    var topIssues = result && result.suggestions ? result.suggestions.map(function (item) { return item.title; }).slice(0, 3) : [];
    var targetUrl = (result && (result.finalUrl || result.requestedUrl)) || urlInput.value.trim() || "";

    fixCard.classList.toggle("is-priority", lowScore);
    fixCopy.textContent = lowScore
      ? "Your performance score is below optimal range. Share this report and we will help prioritize the fastest fixes."
      : "Your performance score is in good shape. You can still request a review if you want help protecting the score during future changes.";

    if (fixUrl) fixUrl.value = targetUrl;
    if (fixConcern && topIssues.length) {
      fixConcern.value = inferConcern(topIssues);
    }
    if (fixReportSummary) {
      fixReportSummary.value = [
        "URL: " + (targetUrl || "N/A"),
        "Strategy: " + (result && result.strategy === "desktop" ? "Desktop" : "Mobile"),
        "Performance score: " + (performanceScore === null || performanceScore === undefined ? "Not available" : performanceScore),
        "Top issues: " + (topIssues.length ? topIssues.join("; ") : "No major performance bottlenecks found"),
      ].join("\n");
    }
  }

  function inferConcern(titles) {
    var text = titles.join(" ").toLowerCase();
    if (/image|picture|webp|avif|offscreen/.test(text)) return "Image optimization";
    if (/javascript|main-thread|third-party|boot-up|script/.test(text)) return "Heavy JavaScript";
    if (/largest contentful paint|layout shift|blocking time|core web vital/.test(text)) return "Poor Core Web Vitals";
    return "Slow speed score";
  }

  urlInput.addEventListener("input", function () {
    var currentUrl = urlInput.value.trim();
    if (fixUrl) {
      fixUrl.value = currentUrl;
    }
    if (fixReportSummary) {
      fixReportSummary.value = [
        "URL: " + (currentUrl || "N/A"),
        "Strategy: Desktop & Mobile",
        "Performance score: Pending Grade",
        "Top issues: Run a grade to analyze bottlenecks.",
      ].join("\n");
    }
  });

  var reportsByStrategy = { desktop: null, mobile: null };
  var errorsByStrategy = { desktop: null, mobile: null };
  var pendingByStrategy = { desktop: false, mobile: false };
  var activeStrategy = "desktop";
  var userPickedStrategy = false;

  function otherStrategy(strategy) {
    return strategy === "desktop" ? "mobile" : "desktop";
  }

  if (strategyToggle) {
    strategyToggle.addEventListener("click", function (event) {
      var btn = event.target.closest(".speed-toggle-btn");
      if (!btn || btn.disabled) return;
      var strategy = btn.getAttribute("data-strategy");
      if (strategy === activeStrategy) return;
      activeStrategy = strategy;
      userPickedStrategy = true;
      setActiveToggle(strategy);
      showActiveStrategy();
    });
  }

  /* A tab is disabled only once its request has finished with no
     report to show - a still-pending tab stays clickable so the
     user can switch to it and see the loading state. */
  function setToggleAvailability() {
    if (!strategyToggle) return;
    Array.prototype.forEach.call(strategyToggle.querySelectorAll(".speed-toggle-btn"), function (btn) {
      var strategy = btn.getAttribute("data-strategy");
      var failed = !pendingByStrategy[strategy] && !reportsByStrategy[strategy] && !!errorsByStrategy[strategy];
      btn.disabled = failed;
      btn.title = failed ? errorsByStrategy[strategy].message : "";
    });
  }

  function buildFailureMessage(errorsByStrategy) {
    var desktopMsg = errorsByStrategy.desktop && errorsByStrategy.desktop.message;
    var mobileMsg = errorsByStrategy.mobile && errorsByStrategy.mobile.message;
    if (desktopMsg && mobileMsg && desktopMsg !== mobileMsg) {
      return desktopMsg + " " + mobileMsg;
    }
    return desktopMsg || mobileMsg || "Unable to grade this URL right now.";
  }

  /* Renders whatever state the currently selected tab is in: the
     report if it already arrived, a loading state if it's still in
     flight, or the error if it finished without a report. */
  function showActiveStrategy() {
    var strategy = activeStrategy;
    if (reportsByStrategy[strategy]) {
      clearLoadingTimers();
      loadingBox.hidden = true;
      loadingBox.classList.remove("speed-loading--compact");
      clearError();
      emptyBox.hidden = true;
      resultsBox.hidden = false;
      renderResults(reportsByStrategy[strategy]);
    } else if (pendingByStrategy[strategy]) {
      showTabPendingState(strategy);
    } else {
      clearLoadingTimers();
      loadingBox.hidden = true;
      loadingBox.classList.remove("speed-loading--compact");
      resultsBox.hidden = true;
      emptyBox.hidden = false;
      showError((errorsByStrategy[strategy] && errorsByStrategy[strategy].message) || "Unable to grade this URL right now.");
    }
  }

  function handleStrategySettled(strategy) {
    pendingByStrategy[strategy] = false;
    setToggleAvailability();

    if (strategy === activeStrategy) {
      showActiveStrategy();
    }

    if (!pendingByStrategy.desktop && !pendingByStrategy.mobile) {
      finalizeGrading();
    }
  }

  function finalizeGrading() {
    setLoading(false);

    /* If the tab shown by default never got a report but the other
       one did, and the user never explicitly picked a tab, fall
       back to showing the one that succeeded. */
    if (!userPickedStrategy && !reportsByStrategy[activeStrategy] && reportsByStrategy[otherStrategy(activeStrategy)]) {
      activeStrategy = otherStrategy(activeStrategy);
      setActiveToggle(activeStrategy);
    }
    showActiveStrategy();

    if (reportsByStrategy[activeStrategy]) {
      var failedStrategy = otherStrategy(activeStrategy);
      if (errorsByStrategy[failedStrategy]) {
        showError(
          errorsByStrategy[failedStrategy].message + " Showing " + strategyLabel(activeStrategy) + " results only."
        );
      }
    } else {
      showError(buildFailureMessage(errorsByStrategy));
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearError();

    var normalizedUrl;
    try {
      normalizedUrl = normalizeUrl(urlInput.value);
    } catch (error) {
      showError(error.message);
      urlInput.focus();
      return;
    }

    urlInput.value = normalizedUrl;
    reportsByStrategy = { desktop: null, mobile: null };
    errorsByStrategy = { desktop: null, mobile: null };
    pendingByStrategy = { desktop: true, mobile: true };
    activeStrategy = "desktop";
    userPickedStrategy = false;

    setLoading(true);
    resultsBox.hidden = true;
    emptyBox.hidden = true;
    resetFixForm();
    setActiveToggle(activeStrategy);
    setToggleAvailability();

    ["desktop", "mobile"].forEach(function (strategy) {
      runPageSpeed(normalizedUrl, strategy)
        .then(function (raw) {
          reportsByStrategy[strategy] = parsePageSpeedResult(raw, normalizedUrl, strategy);
        })
        .catch(function (error) {
          errorsByStrategy[strategy] = error;
        })
        .then(function () {
          handleStrategySettled(strategy);
        });
    });
  });

  function resetFixForm() {
    if (!fixForm || !fixSuccess) return;
    fixForm.reset();
    fixForm.hidden = false;
    fixSuccess.hidden = true;
  }

  var fixErrorBox = document.getElementById("speed-fix-error");

  if (fixForm && fixSuccess) {
    fixForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!fixForm.checkValidity()) {
        fixForm.reportValidity();
        return;
      }
      if (!window.TTApi) return;

      var submitBtn = fixForm.querySelector(".speed-fix-submit");
      if (fixErrorBox) fixErrorBox.hidden = true;
      if (window.TTApi.setButtonLoading) {
        window.TTApi.setButtonLoading(submitBtn, true, "Submitting Request...");
      } else if (submitBtn) {
        submitBtn.disabled = true;
      }

      window.TTApi.submitLead(fixForm, "site-speed-grader")
        .then(function () {
          var noteEl = document.getElementById("speed-fix-success-note");
          var email = String(fixForm.elements.email.value || "").trim();
          if (noteEl && email) noteEl.textContent = "We'll reply to " + email + ".";
          fixForm.hidden = true;
          fixSuccess.hidden = false;
          fixSuccess.focus();
        })
        .catch(function (error) {
          if (fixErrorBox) {
            fixErrorBox.textContent = error.message;
            fixErrorBox.hidden = false;
          }
        })
        .then(function () {
          if (window.TTApi.setButtonLoading) {
            window.TTApi.setButtonLoading(submitBtn, false);
          } else if (submitBtn) {
            submitBtn.disabled = false;
          }
        });
    });
  }

  window.SiteSpeedGrader = {
    normalizeUrl: normalizeUrl,
    parsePageSpeedResult: parsePageSpeedResult,
    collectSuggestions: collectSuggestions,
    getScoreInfo: getScoreInfo,
  };
})();
