(function () {
  "use strict";

  var moneyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  var numberFormatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  });

  var BENCHMARK_AOV_LIFT = 1.1;
  var CVR_UPLIFT_FACTORS = { conservative: 1.15, expected: 1.25, strong: 1.4 };
  var SCENARIO_FACTORS = { conservative: 0.6, expected: 1.0, optimistic: 1.4 };
  var TARGET_CVR_CEILING_MULTIPLIER = 2;
  var TARGET_AOV_CEILING_MULTIPLIER = 1.5;
  var CHIP_MATCH_TOLERANCE = { cvr: 0.01, aov: 1 };

  var CURRENCY_CONFIG = {
    INR: {
      symbol: "₹",
      locale: "en-IN",
      code: "INR",
      aovMin: 100,
      aovMax: 500000,
      aovStep: 1,
      investMin: 10000,
      investMax: 10000000,
      investStep: 10000,
      defaultCurrentAov: 1500,
      defaultTargetAov: 1650,
      defaultInvestment: 500000,
    },
    USD: {
      symbol: "$",
      locale: "en-US",
      code: "USD",
      aovMin: 5,
      aovMax: 10000,
      aovStep: 1,
      investMin: 500,
      investMax: 200000,
      investStep: 500,
      defaultCurrentAov: 60,
      defaultTargetAov: 66,
      defaultInvestment: 6000,
    },
  };

  var currentCurrency = "INR";

  // Tracks which quick-benchmark chip (if any) is "stuck" active, so that
  // dragging a Baseline Metric re-applies the same uplift instead of leaving
  // the target behind (which would silently deselect the chip).
  var activeCvrChip = null;
  var aovLiftActive = false;

  var industry = document.getElementById("roi-industry");
  var timeframeInput = document.getElementById("roi-timeframe-input");
  var currencyButtons = document.querySelectorAll(".roi-currency-option");
  var currencySymbolEls = document.querySelectorAll(".roi-currency-symbol");

  var controls = [
    {
      key: "visitors",
      decimals: 0,
      range: document.getElementById("roi-visitors"),
      input: document.getElementById("roi-visitors-input"),
    },
    {
      key: "currentCvr",
      decimals: 2,
      range: document.getElementById("roi-current-cvr"),
      input: document.getElementById("roi-current-cvr-input"),
    },
    {
      key: "currentAov",
      decimals: 0,
      range: document.getElementById("roi-current-aov"),
      input: document.getElementById("roi-current-aov-input"),
    },
    {
      key: "marginPercent",
      decimals: 0,
      range: document.getElementById("roi-margin"),
      input: document.getElementById("roi-margin-input"),
    },
    {
      key: "targetCvr",
      decimals: 2,
      range: document.getElementById("roi-target-cvr"),
      input: document.getElementById("roi-target-cvr-input"),
    },
    {
      key: "targetAov",
      decimals: 0,
      range: document.getElementById("roi-target-aov"),
      input: document.getElementById("roi-target-aov-input"),
    },
    {
      key: "investment",
      decimals: 0,
      range: document.getElementById("roi-investment"),
      input: document.getElementById("roi-investment-input"),
    },
  ];

  var resultEls = {
    paybackMonths: document.getElementById("roi-payback-months"),
    paybackUnit: document.getElementById("roi-payback-unit"),
    paybackCopy: document.getElementById("roi-payback-copy"),
    paybackFill: document.getElementById("roi-payback-fill"),
    paybackMarker: document.getElementById("roi-payback-marker"),
    timeframeLabel: document.getElementById("roi-payback-timeframe-label"),
  };

  var leadSummary = document.getElementById("roi-summary");

  if (
    !industry ||
    !timeframeInput ||
    controls.some(function (control) {
      return !control.range || !control.input;
    }) ||
    Object.keys(resultEls).some(function (key) {
      return !resultEls[key];
    })
  ) {
    return;
  }

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  var values = controls.reduce(function (acc, control) {
    acc[control.key] = getNumber(control.input, parseFloat(control.input.min) || 0);
    return acc;
  }, {});
  values.timeframe = getNumber(timeframeInput, 12);

  var lastResults = {
    currentRevenue: 0,
    netGain: 0,
    roiPercent: 0,
    paybackMonths: 0,
  };

  var tweens = {};

  function formatMoney(n) {
    return moneyFormatter.format(Math.round(n));
  }

  function formatSignedMoney(n) {
    if (n < 0) return "-" + formatMoney(Math.abs(n));
    return formatMoney(n);
  }

  function formatNumber(n) {
    return numberFormatter.format(Math.round(n));
  }

  function getNumber(input, fallback) {
    var value = parseFloat(input.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function getMin(input) {
    var min = parseFloat(input.min);
    return Number.isFinite(min) ? min : 0;
  }

  function getMax(input) {
    var max = parseFloat(input.max);
    return Number.isFinite(max) ? max : Number.MAX_SAFE_INTEGER;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function formatInputValue(value, decimals) {
    if (decimals > 0) return Number(value).toFixed(decimals);
    return String(Math.round(value));
  }

  function setTone(el, value) {
    el.classList.remove("roi-positive", "roi-warning");
    el.classList.add(value >= 0 ? "roi-positive" : "roi-warning");
  }

  function updateFill(range) {
    var min = parseFloat(range.min);
    var max = parseFloat(range.max);
    var value = clamp(parseFloat(range.value), min, max);
    var pct = ((value - min) / (max - min)) * 100;
    range.style.setProperty("--roi-fill", pct + "%");
  }

  function syncRange(control) {
    var raw = getNumber(control.input, values[control.key]);
    var rangeMin = parseFloat(control.range.min);
    var rangeMax = parseFloat(control.range.max);
    control.range.value = clamp(raw, rangeMin, rangeMax);
    updateFill(control.range);
  }

  function setControlValue(control, value) {
    var clamped = clamp(value, getMin(control.input), getMax(control.input));
    control.input.value = formatInputValue(clamped, control.decimals);
    values[control.key] = clamped;
    syncRange(control);
  }

  function normalizeControl(control) {
    var fallback = values[control.key];
    var normalized = clamp(getNumber(control.input, fallback), getMin(control.input), getMax(control.input));
    setControlValue(control, normalized);
  }

  function normalizeTimeframe() {
    var value = clamp(getNumber(timeframeInput, values.timeframe), getMin(timeframeInput), getMax(timeframeInput));
    values.timeframe = Math.round(value);
    timeframeInput.value = values.timeframe;
  }

  function getControl(key) {
    return controls.find(function (control) {
      return control.key === key;
    });
  }

  var targetCvrHardMax = getMax(getControl("targetCvr").input);
  var targetAovHardMax = getMax(getControl("targetAov").input);

  function valuesMatch(a, b, tolerance) {
    return Math.abs(a - b) <= tolerance;
  }

  function updateTargetCeilings() {
    var targetCvrControl = getControl("targetCvr");
    var targetAovControl = getControl("targetAov");
    var cvrCeiling = Math.min(values.currentCvr * TARGET_CVR_CEILING_MULTIPLIER, targetCvrHardMax);
    var aovCeiling = Math.min(values.currentAov * TARGET_AOV_CEILING_MULTIPLIER, targetAovHardMax);

    [targetCvrControl.input, targetCvrControl.range].forEach(function (el) {
      el.max = cvrCeiling;
    });
    [targetAovControl.input, targetAovControl.range].forEach(function (el) {
      el.max = aovCeiling;
    });

    normalizeControl(targetCvrControl);
    normalizeControl(targetAovControl);
  }

  function updateChipStates() {
    document.querySelectorAll("[data-action]").forEach(function (button) {
      var action = button.getAttribute("data-action");
      var isActive = false;
      if (action === "uplift-conservative") {
        isActive = valuesMatch(values.targetCvr, values.currentCvr * CVR_UPLIFT_FACTORS.conservative, CHIP_MATCH_TOLERANCE.cvr);
      } else if (action === "uplift-expected") {
        isActive = valuesMatch(values.targetCvr, values.currentCvr * CVR_UPLIFT_FACTORS.expected, CHIP_MATCH_TOLERANCE.cvr);
      } else if (action === "uplift-strong") {
        isActive = valuesMatch(values.targetCvr, values.currentCvr * CVR_UPLIFT_FACTORS.strong, CHIP_MATCH_TOLERANCE.cvr);
      } else if (action === "aov-lift") {
        isActive = valuesMatch(values.targetAov, values.currentAov * BENCHMARK_AOV_LIFT, CHIP_MATCH_TOLERANCE.aov);
      }
      button.classList.toggle("is-active", isActive);
    });
  }

  function applyCurrencyFormatters() {
    var config = CURRENCY_CONFIG[currentCurrency];
    moneyFormatter = new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.code,
      maximumFractionDigits: 0,
    });
  }

  function updateIndustryOptionLabels() {
    Array.prototype.forEach.call(industry.options, function (option) {
      option.textContent = option.dataset.label;
    });
  }

  function setCurrency(code) {
    if (!CURRENCY_CONFIG[code] || code === currentCurrency) return;
    currentCurrency = code;
    var config = CURRENCY_CONFIG[code];

    // Switching currency resets AOV to a fresh default pair, so any chip
    // stuck to the previous currency's baseline no longer applies.
    aovLiftActive = false;

    applyCurrencyFormatters();
    updateIndustryOptionLabels();

    currencySymbolEls.forEach(function (el) {
      el.textContent = config.symbol;
    });

    currencyButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-currency") === code;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    [getControl("currentAov"), getControl("targetAov")].forEach(function (control) {
      [control.input, control.range].forEach(function (el) {
        el.min = config.aovMin;
        el.max = config.aovMax;
        el.step = config.aovStep;
      });
    });
    var investmentControl = getControl("investment");
    [investmentControl.input, investmentControl.range].forEach(function (el) {
      el.min = config.investMin;
      el.max = config.investMax;
      el.step = config.investStep;
    });

    setControlValue(getControl("currentAov"), config.defaultCurrentAov);
    setControlValue(getControl("targetAov"), config.defaultTargetAov);
    setControlValue(getControl("investment"), config.defaultInvestment);

    recalc();
  }

  function tweenText(el, from, to, formatFn, duration) {
    if (prefersReducedMotion) {
      el.textContent = formatFn(to);
      return;
    }
    if (tweens[el.id]) cancelAnimationFrame(tweens[el.id]);
    var start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatFn(from + (to - from) * eased);
      if (progress < 1) {
        tweens[el.id] = requestAnimationFrame(step);
      }
    }
    tweens[el.id] = requestAnimationFrame(step);
  }

  function renderResult(key, value, formatFn, duration) {
    tweenText(resultEls[key], lastResults[key], value, formatFn, duration || 220);
  }

  function formatPaybackText(months) {
    return Number.isFinite(months)
      ? "~" + Math.round(months) + " months"
      : "No payback";
  }

  function computeScenario(factor, currentRevenue, visitors, investment, timeframe) {
    var scenarioCvr = values.currentCvr + (values.targetCvr - values.currentCvr) * factor;
    var scenarioAov = values.currentAov + (values.targetAov - values.currentAov) * factor;
    var scenarioOrders = visitors * (scenarioCvr / 100);
    var scenarioRevenue = scenarioOrders * scenarioAov;
    var monthlyRevenueLift = scenarioRevenue - currentRevenue;
    var monthlyProfitLift = monthlyRevenueLift * (values.marginPercent / 100);
    var totalProfitLift = monthlyProfitLift * timeframe;
    var netGain = totalProfitLift - investment;
    var roiPercent = (netGain / investment) * 100;
    var paybackMonths = monthlyProfitLift > 0 ? investment / monthlyProfitLift : Infinity;

    return {
      scenarioOrders: scenarioOrders,
      scenarioRevenue: scenarioRevenue,
      monthlyRevenueLift: monthlyRevenueLift,
      monthlyProfitLift: monthlyProfitLift,
      totalProfitLift: totalProfitLift,
      netGain: netGain,
      roiPercent: roiPercent,
      paybackMonths: paybackMonths,
    };
  }

  function recalc() {
    updateTargetCeilings();

    var visitors = values.visitors;
    var currentCvr = values.currentCvr / 100;
    var currentAov = values.currentAov;
    var investment = Math.max(values.investment, 1);
    var timeframe = Math.max(values.timeframe, 1);

    var currentOrders = visitors * currentCvr;
    var currentRevenue = currentOrders * currentAov;

    var expected = computeScenario(SCENARIO_FACTORS.expected, currentRevenue, visitors, investment, timeframe);
    var conservative = computeScenario(SCENARIO_FACTORS.conservative, currentRevenue, visitors, investment, timeframe);
    var optimistic = computeScenario(SCENARIO_FACTORS.optimistic, currentRevenue, visitors, investment, timeframe);

    var netGain = expected.netGain;
    var roiPercent = expected.roiPercent;
    var paybackMonths = expected.paybackMonths;
    var achievable = Number.isFinite(paybackMonths);

    renderResult(
      "paybackMonths",
      achievable ? paybackMonths : timeframe,
      function (n) {
        return achievable ? "~" + Math.round(n) : "-";
      },
      280,
    );

    resultEls.paybackUnit.hidden = !achievable;
    resultEls.paybackCopy.innerHTML = achievable
      ? "to recover your <span class=\"roi-payback-investment\">" + formatMoney(investment) + "</span> investment"
      : "doesn't break even within " + timeframe + " months at these inputs";

    var pct = achievable ? clamp((paybackMonths / timeframe) * 100, 0, 100) : 100;
    resultEls.paybackFill.style.width = pct + "%";
    resultEls.paybackMarker.style.left = pct + "%";
    resultEls.paybackMarker.classList.toggle("roi-warning", !achievable);
    resultEls.paybackFill.classList.toggle("roi-warning", !achievable);

    resultEls.timeframeLabel.textContent = "Month " + timeframe;

    lastResults = {
      currentRevenue: currentRevenue,
      netGain: netGain,
      roiPercent: roiPercent,
      paybackMonths: achievable ? paybackMonths : timeframe,
      investment: investment,
      timeframe: timeframe,
      scenarios: { conservative: conservative, expected: expected, optimistic: optimistic },
    };

    updateChipStates();
    updateLeadMessage();
  }

  function updateLeadMessage() {
    if (!leadSummary) return;
    leadSummary.value = [
      "Monthly visitors: " + formatNumber(values.visitors),
      "Current CVR: " + values.currentCvr + "% -> Target CVR: " + values.targetCvr + "%",
      "Current AOV: " + formatMoney(values.currentAov) + " -> Target AOV: " + formatMoney(values.targetAov),
      "Gross margin: " + values.marginPercent + "%",
      "Investment: " + formatMoney(lastResults.investment) + " over " + lastResults.timeframe + " months",
      "Expected ROI: " + Math.round(lastResults.roiPercent) + "% (payback " + formatPaybackText(lastResults.paybackMonths) + ")",
      "Range: " + Math.round(lastResults.scenarios.conservative.roiPercent) + "% conservative to " + Math.round(lastResults.scenarios.optimistic.roiPercent) + "% optimistic",
    ].join("\n");
  }

  function reapplyStickyChips(control) {
    if (control.key === "currentCvr" && activeCvrChip) {
      setControlValue(getControl("targetCvr"), values.currentCvr * CVR_UPLIFT_FACTORS[activeCvrChip]);
    }
    if (control.key === "currentAov" && aovLiftActive) {
      setControlValue(getControl("targetAov"), values.currentAov * BENCHMARK_AOV_LIFT);
    }
    // Manually touching a target directly overrides (un-sticks) any chip
    // that was driving it.
    if (control.key === "targetCvr") {
      activeCvrChip = null;
    }
    if (control.key === "targetAov") {
      aovLiftActive = false;
    }
  }

  controls.forEach(function (control) {
    normalizeControl(control);

    control.range.addEventListener("input", function () {
      setControlValue(control, parseFloat(control.range.value));
      reapplyStickyChips(control);
      recalc();
    });

    control.input.addEventListener("input", function () {
      var value = parseFloat(control.input.value);
      if (!Number.isFinite(value)) return;
      values[control.key] = value;
      syncRange(control);
      reapplyStickyChips(control);
      recalc();
    });

    control.input.addEventListener("change", function () {
      normalizeControl(control);
      reapplyStickyChips(control);
      recalc();
    });
  });

  timeframeInput.addEventListener("input", function () {
    var value = parseFloat(timeframeInput.value);
    if (!Number.isFinite(value)) return;
    values.timeframe = value;
    recalc();
  });

  timeframeInput.addEventListener("change", function () {
    normalizeTimeframe();
    recalc();
  });

  industry.addEventListener("change", function () {
    var selected = industry.options[industry.selectedIndex];
    var aov = parseFloat(currentCurrency === "USD" ? selected.dataset.aovUsd : selected.dataset.aovInr);
    var presetCurrentCvr = parseFloat(selected.dataset.currentCvr);
    var presetTargetCvr = parseFloat(selected.dataset.targetCvr);

    // The preset sets its own current+target pair, so any chip that was
    // "stuck" to the previous baseline no longer applies.
    activeCvrChip = null;
    aovLiftActive = false;

    setControlValue(getControl("currentAov"), aov);
    if (Number.isFinite(presetCurrentCvr)) {
      setControlValue(getControl("currentCvr"), presetCurrentCvr);
    }

    // Refresh the target ceilings against the new baseline before assigning
    // target values, otherwise they'd get clamped against the previous
    // preset's (now stale) ceiling.
    updateTargetCeilings();

    setControlValue(getControl("targetAov"), aov * BENCHMARK_AOV_LIFT);
    if (Number.isFinite(presetTargetCvr)) {
      setControlValue(getControl("targetCvr"), presetTargetCvr);
    }

    recalc();
  });

  document.querySelectorAll("[data-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      var action = button.getAttribute("data-action");
      if (action === "uplift-conservative" || action === "uplift-expected" || action === "uplift-strong") {
        var chipKey = action.replace("uplift-", "");
        var wasActive = button.classList.contains("is-active");
        activeCvrChip = wasActive ? null : chipKey;
        setControlValue(
          getControl("targetCvr"),
          wasActive ? values.currentCvr : values.currentCvr * CVR_UPLIFT_FACTORS[chipKey]
        );
      }
      if (action === "aov-lift") {
        var isActive = button.classList.contains("is-active");
        aovLiftActive = !isActive;
        setControlValue(getControl("targetAov"), aovLiftActive ? values.currentAov * BENCHMARK_AOV_LIFT : values.currentAov);
      }
      recalc();
    });
  });

  currencyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setCurrency(button.getAttribute("data-currency"));
    });
  });

  updateIndustryOptionLabels();
  normalizeTimeframe();
  recalc();

  var form = document.getElementById("roi-lead-form");
  var success = document.getElementById("roi-lead-success");
  var successNote = document.getElementById("roi-lead-success-note");
  var leadErrorBox = document.getElementById("roi-lead-error");

  if (form && success) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!window.TTApi || !window.TTApi.validateRequired(form)) return;

      var submitBtn = form.querySelector(".roi-lead-submit");
      if (leadErrorBox) leadErrorBox.hidden = true;
      if (window.TTApi.setButtonLoading) {
        window.TTApi.setButtonLoading(submitBtn, true, "Submitting Request...");
      } else if (submitBtn) {
        submitBtn.disabled = true;
      }

      window.TTApi.submitLead(form, "roi-calculator")
        .then(function () {
          var email = String(form.email.value || "").trim();
          if (successNote && email) successNote.textContent = "We'll send it to " + email + ".";
          form.hidden = true;
          success.hidden = false;
          success.focus();
        })
        .catch(function (error) {
          if (leadErrorBox) {
            leadErrorBox.textContent = error.message;
            leadErrorBox.hidden = false;
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
})();
