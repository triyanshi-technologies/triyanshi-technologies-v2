(function () {
  "use strict";

  var REQUIRED_FIELDS = [
    "businessGoal",
    "commercePain",
    "dataQuality",
    "toolStack",
    "aiLiteracy",
    "automationMaturity",
    "governance",
    "implementationCapacity",
  ];

  var FIELD_LABELS = {
    businessGoal: "Business goal / AI use case clarity",
    commercePain: "Commerce operations pain point",
    dataQuality: "Data quality and accessibility",
    toolStack: "Tool stack / integration readiness",
    aiLiteracy: "Team AI literacy",
    automationMaturity: "Workflow automation maturity",
    governance: "Governance, privacy, and security controls",
    implementationCapacity: "Budget / implementation capacity",
  };

  var LABELS = {
    businessGoal: {
      vague: "No clear AI use case yet",
      ideas: "A few ideas, no priority",
      clear: "One clear workflow to improve",
      measured: "Clear use case with success metrics",
    },
    commercePain: {
      "not-sure": "Not sure where AI should help",
      "support-content": "Support, FAQs, content, or product copy",
      "marketing-merchandising": "Marketing, merchandising, or personalization",
      "inventory-ops": "Inventory, reporting, catalog, or operations",
      "multiple-priority": "Multiple high-priority workflows",
    },
    dataQuality: {
      scattered: "Scattered or hard to trust",
      spreadsheets: "Mostly spreadsheets/manual exports",
      analytics: "Analytics and store data are usable",
      "clean-crm": "Clean customer/product/order data",
      unified: "Unified, governed, and reusable data",
    },
    toolStack: {
      manual: "Mostly manual tools",
      basic: "Storefront plus basic apps",
      connected: "Core tools are connected",
      "api-ready": "APIs or automation tools are available",
      modern: "Modern stack with reliable integrations",
    },
    aiLiteracy: {
      "no-literacy": "No shared AI understanding",
      curious: "Team is curious but untrained",
      "trained-users": "Some trained AI tool users",
      owner: "Clear internal AI owner",
      champions: "AI champions across functions",
    },
    automationMaturity: {
      manual: "Mostly manual workflows",
      templates: "Templates or checklists only",
      simple: "Simple automations in place",
      integrated: "Integrated workflow automations",
      measured: "Measured automations with ownership",
    },
    governance: {
      none: "No AI or data usage rules",
      informal: "Informal rules only",
      privacy: "Privacy/security basics exist",
      documented: "Documented AI usage and approval process",
      monitored: "Monitored controls and risk reviews",
    },
    implementationCapacity: {
      none: "No budget or owner yet",
      explore: "Small exploration budget",
      pilot: "Pilot budget and part-time owner",
      roadmap: "Roadmap budget and implementation support",
      scale: "Dedicated budget and delivery team",
    },
  };

  var QUESTION_TEXT = {
    businessGoal: "How clear is your AI use case?",
    commercePain: "What's your main commerce operations pain point?",
    dataQuality: "How would you rate your data quality and accessibility?",
    toolStack: "How integrated is your tool stack?",
    aiLiteracy: "How would you describe your team's AI literacy?",
    automationMaturity: "How mature are your workflow automations?",
    governance: "What governance, privacy, and security controls do you have?",
    implementationCapacity: "What's your budget and implementation capacity?",
  };

  var QUESTIONS = REQUIRED_FIELDS.map(function (name) {
    var optionSource = LABELS[name];
    var options = Object.keys(optionSource).map(function (value) {
      return { value: value, label: optionSource[value] };
    });
    return {
      name: name,
      question: QUESTION_TEXT[name],
      optional: false,
      options: options,
    };
  });

  var VALUE_SCORES = {
    businessGoal: { vague: 1, ideas: 2, clear: 4, measured: 5 },
    commercePain: { "not-sure": 1, "support-content": 3, "marketing-merchandising": 4, "inventory-ops": 4, "multiple-priority": 3 },
    dataQuality: { scattered: 1, spreadsheets: 2, analytics: 3, "clean-crm": 4, unified: 5 },
    toolStack: { manual: 1, basic: 2, connected: 3, "api-ready": 4, modern: 5 },
    aiLiteracy: { "no-literacy": 1, curious: 2, "trained-users": 3, owner: 4, champions: 5 },
    automationMaturity: { manual: 1, templates: 2, simple: 3, integrated: 4, measured: 5 },
    governance: { none: 1, informal: 2, privacy: 3, documented: 4, monitored: 5 },
    implementationCapacity: { none: 1, explore: 2, pilot: 3, roadmap: 4, scale: 5 },
  };

  var DIMENSIONS = [
    {
      id: "strategy",
      label: "Use Case",
      weight: 16,
      fields: ["businessGoal", "commercePain"],
      gap: "Prioritize one AI use case with a clear owner, workflow boundary, and success metric.",
      action: "Choose one commerce workflow, define the before/after process, and set a measurable target.",
    },
    {
      id: "data",
      label: "Data",
      weight: 18,
      fields: ["dataQuality"],
      gap: "Improve data quality, access, and trust before expecting reliable AI output.",
      action: "Clean product, order, customer, and analytics data; document where each source lives and who owns it.",
    },
    {
      id: "integrations",
      label: "Tools",
      weight: 13,
      fields: ["toolStack"],
      gap: "Connect the tools AI needs to read from or write back into your commerce workflow.",
      action: "Map storefront, CRM, email, support, analytics, and ERP connections before picking AI tooling.",
    },
    {
      id: "people",
      label: "Team",
      weight: 13,
      fields: ["aiLiteracy"],
      gap: "Build basic AI literacy and assign an internal owner for experimentation and rollout.",
      action: "Train the team on safe AI usage, prompt quality, data privacy, and workflow-specific review steps.",
    },
    {
      id: "automation",
      label: "Workflow",
      weight: 14,
      fields: ["automationMaturity"],
      gap: "Stabilize the workflow before adding AI, especially if the current process is mostly manual.",
      action: "Document the workflow, remove avoidable manual handoffs, then automate the repeatable parts first.",
    },
    {
      id: "governance",
      label: "Governance",
      weight: 16,
      fields: ["governance"],
      gap: "Create clear rules for AI usage, privacy, approvals, and human review.",
      action: "Define an AI usage policy, sensitive-data rules, approval checkpoints, and escalation paths.",
    },
    {
      id: "capacity",
      label: "Capacity",
      weight: 10,
      fields: ["implementationCapacity"],
      gap: "Assign enough budget, ownership, and implementation time to move beyond experiments.",
      action: "Set a pilot budget, appoint a business owner, and commit to a 30-60 day implementation window.",
    },
  ];

  function collectAnswers(form) {
    return REQUIRED_FIELDS.reduce(function (answers, name) {
      var field = form.elements[name];
      answers[name] = field ? String(field.value || "").trim() : "";
      return answers;
    }, {});
  }

  function validateAnswers(answers) {
    var missing = REQUIRED_FIELDS.filter(function (name) {
      return !answers[name];
    });
    return {
      valid: missing.length === 0,
      missing: missing,
      message: missing.length
        ? "Please complete: " + missing.map(function (name) { return FIELD_LABELS[name]; }).join(", ") + "."
        : "",
    };
  }

  function getFieldScore(field, value) {
    return VALUE_SCORES[field] && VALUE_SCORES[field][value] ? VALUE_SCORES[field][value] : 0;
  }

  function average(values) {
    if (!values.length) return 0;
    var total = values.reduce(function (sum, value) {
      return sum + value;
    }, 0);
    return total / values.length;
  }

  function getDimensionScores(answers) {
    return DIMENSIONS.map(function (dimension) {
      var raw = average(dimension.fields.map(function (field) {
        return getFieldScore(field, answers[field]);
      }));
      return {
        id: dimension.id,
        label: dimension.label,
        score: Math.round(raw / 5 * 100),
        raw: raw,
        weight: dimension.weight,
        gap: dimension.gap,
        action: dimension.action,
      };
    });
  }

  function getOverallScore(dimensions, answers) {
    var weightTotal = dimensions.reduce(function (sum, dimension) {
      return sum + dimension.weight;
    }, 0);
    var weighted = dimensions.reduce(function (sum, dimension) {
      return sum + dimension.score * dimension.weight;
    }, 0);
    var score = Math.round(weighted / weightTotal);

    if (answers.businessGoal === "vague") score = Math.min(score, 49);
    if (answers.dataQuality === "scattered") score = Math.min(score, 55);
    if (answers.governance === "none") score = Math.min(score, 59);
    if (answers.implementationCapacity === "none") score = Math.min(score, 58);
    if (answers.dataQuality === "unified" && answers.governance === "monitored" && answers.aiLiteracy === "champions") {
      score = Math.max(score, 82);
    }

    return Math.max(0, Math.min(100, score));
  }

  function getMaturity(score) {
    if (score < 40) {
      return {
        band: "Not Ready",
        label: "Poor foundation",
        summary: "AI would likely create noise before value. Focus first on use case clarity, data cleanup, and basic controls.",
      };
    }
    if (score < 60) {
      return {
        band: "Foundation Needed",
        label: "Needs foundation work",
        summary: "There is real opportunity, but the business needs stronger data, workflow, governance, or ownership before a reliable pilot.",
      };
    }
    if (score < 80) {
      return {
        band: "Pilot Ready",
        label: "Pilot ready",
        summary: "You can likely run a focused AI pilot if scope is tight, success metrics are clear, and human review stays in the loop.",
      };
    }
    return {
      band: "Scale Ready",
      label: "Scale ready",
      summary: "Your foundation can support a more structured AI roadmap across multiple commerce workflows.",
    };
  }

  function getTopGaps(dimensions) {
    return dimensions
      .slice()
      .sort(function (a, b) {
        if (a.score !== b.score) return a.score - b.score;
        return b.weight - a.weight;
      })
      .slice(0, 3);
  }

  function getStartingPath(topGap, maturity) {
    if (!topGap) return "Start with a short discovery sprint to confirm your AI opportunity, data readiness, and implementation constraints.";
    if (topGap.id === "data") return "Start with a data cleanup sprint before building the AI pilot.";
    if (topGap.id === "governance") return "Start with an AI governance and safe-use setup before exposing customer or business data to AI tools.";
    if (topGap.id === "strategy") return "Start with an AI opportunity workshop and pick one measurable commerce workflow.";
    if (topGap.id === "automation") return "Start with a workflow automation roadmap, then layer AI into the highest-volume steps.";
    if (maturity.band === "Scale Ready") return "Start with a 90-day AI roadmap that prioritizes the highest-ROI commerce workflows.";
    return "Start with a focused pilot workflow and keep the scope narrow enough to measure within 30-60 days.";
  }

  function assessReadiness(answers) {
    var dimensions = getDimensionScores(answers);
    var score = getOverallScore(dimensions, answers);
    var maturity = getMaturity(score);
    var topGaps = getTopGaps(dimensions);
    var nextActions = topGaps.slice(0, 3).map(function (gap) {
      return gap.action;
    });
    return {
      score: score,
      maturity: maturity,
      gaps: topGaps.map(function (gap) {
        return gap.gap;
      }),
      nextActions: nextActions,
      startingPath: getStartingPath(topGaps[0], maturity),
      dimensions: dimensions,
    };
  }

  function getLabel(group, value) {
    return LABELS[group] && LABELS[group][value] ? LABELS[group][value] : value || "Not specified";
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function createListHtml(items, tagName) {
    var tag = tagName || "li";
    return items.map(function (item) {
      return "<" + tag + ">" + escapeHtml(item) + "</" + tag + ">";
    }).join("");
  }

  function buildReviewMessage(result, answers) {
    return [
      "AI readiness score: " + result.score + "/100",
      "Maturity level: " + result.maturity.band + " - " + result.maturity.label,
      "Business goal: " + getLabel("businessGoal", answers.businessGoal),
      "Main commerce pain point: " + getLabel("commercePain", answers.commercePain),
      "Top gap: " + (result.gaps[0] || "No major gap captured."),
      "Recommended next step: " + (result.nextActions[0] || result.startingPath),
      "",
      "Please review our AI readiness and recommend a practical implementation roadmap.",
    ].join("\n");
  }

  function inferReviewInterest(answers, result) {
    var firstGap = result.dimensions.slice().sort(function (a, b) { return a.score - b.score; })[0];
    if (firstGap && firstGap.id === "data") return "Data cleanup and reporting";
    if (firstGap && firstGap.id === "governance") return "AI governance and policy";
    if (answers.commercePain === "support-content") return "Customer support AI";
    if (answers.commercePain === "marketing-merchandising") return "Marketing and personalization";
    if (answers.commercePain === "not-sure") return "Not sure";
    return "Commerce workflow automation";
  }

  function setHidden(element, hidden) {
    if (!element) return;
    element.hidden = !!hidden;
    element.style.display = hidden ? "none" : "";
  }

  function initDom() {
    var wizard = document.getElementById("ai-wizard");
    var stepMount = document.getElementById("ai-step");
    var progressFill = document.getElementById("ai-progress-fill");
    var progressLabel = document.getElementById("ai-progress-label");
    var progressBar = wizard ? wizard.querySelector(".ai-progress") : null;
    var resultsTemplate = document.getElementById("ai-results-template");
    var resultsMount = document.getElementById("ai-results-mount");

    if (!wizard || !stepMount || !resultsTemplate || !resultsMount) {
      return;
    }

    var answers = {};
    var stepIndex = 0;

    function renderStep() {
      var question = QUESTIONS[stepIndex];
      var total = QUESTIONS.length;

      if (progressBar) progressBar.setAttribute("aria-valuenow", String(stepIndex + 1));
      if (progressBar) progressBar.setAttribute("aria-valuemax", String(total));
      if (progressFill) progressFill.style.width = ((stepIndex + (answers[question.name] !== undefined ? 1 : 0)) / total * 100) + "%";
      if (progressLabel) progressLabel.textContent = "Question " + (stepIndex + 1) + " of " + total;

      var optionsHtml = question.options.map(function (option) {
        var selected = answers[question.name] === option.value;
        return (
          "<button type=\"button\" class=\"ai-option" + (selected ? " is-selected" : "") + "\" data-value=\"" +
          escapeHtml(option.value) + "\" aria-pressed=\"" + selected + "\">" + escapeHtml(option.label) + "</button>"
        );
      }).join("");

      stepMount.innerHTML = [
        "<h3 class=\"ai-question\" tabindex=\"-1\">" + escapeHtml(question.question) + "</h3>",
        "<div class=\"ai-options\" role=\"group\">" + optionsHtml + "</div>",
        "<div class=\"ai-step-actions\">",
        stepIndex > 0 ? "<button type=\"button\" class=\"btn btn-primary ai-step-back\" id=\"ai-step-back\">Back</button>" : "<span></span>",
        "</div>",
      ].join("");

      stepMount.classList.remove("ai-step-anim");
      void stepMount.offsetWidth;
      stepMount.classList.add("ai-step-anim");

      var heading = stepMount.querySelector(".ai-question");
      if (heading && heading.focus) heading.focus();

      stepMount.querySelectorAll(".ai-option").forEach(function (button) {
        button.addEventListener("click", function () {
          answers[question.name] = button.getAttribute("data-value");
          goNext();
        });
      });

      var backButton = document.getElementById("ai-step-back");
      if (backButton) {
        backButton.addEventListener("click", function () {
          stepIndex -= 1;
          renderStep();
        });
      }
    }

    function goNext() {
      if (stepIndex >= QUESTIONS.length - 1) {
        finish();
        return;
      }
      stepIndex += 1;
      renderStep();
    }

    function finish() {
      var result = assessReadiness(answers);
      resultsMount.appendChild(resultsTemplate.content.cloneNode(true));
      wireResults(result, answers);
      setHidden(wizard, true);
      var resultsBox = document.getElementById("ai-results");
      if (resultsBox && resultsBox.focus) resultsBox.focus();
    }

    function wireResults(result, resultAnswers) {
      var scoreEl = document.getElementById("ai-score");
      var scoreLabel = document.getElementById("ai-score-label");
      var maturityBand = document.getElementById("ai-maturity-band");
      var maturitySummary = document.getElementById("ai-maturity-summary");
      var gapList = document.getElementById("ai-gap-list");
      var actionList = document.getElementById("ai-action-list");
      var startingPath = document.getElementById("ai-starting-path");
      var dimensionStrip = document.getElementById("ai-dimension-strip");
      var reviewCopy = document.getElementById("ai-review-copy");
      var reviewForm = document.getElementById("ai-review-form");
      var reviewSuccess = document.getElementById("ai-review-success");
      var reviewInterest = document.getElementById("ai-review-interest");
      var reviewSummary = document.getElementById("ai-review-summary");
      var startOverButton = document.getElementById("ai-start-over");

      setHidden(reviewSuccess, true);
      setHidden(reviewForm, false);

      scoreEl.textContent = result.score + "/100";
      scoreLabel.textContent = result.maturity.label;
      maturityBand.textContent = result.maturity.band;
      maturitySummary.textContent = result.maturity.summary;
      gapList.innerHTML = createListHtml(result.gaps);
      actionList.innerHTML = createListHtml(result.nextActions);
      startingPath.textContent = result.startingPath;
      dimensionStrip.innerHTML = result.dimensions.map(function (dimension) {
        return (
          "<tr><td>" + escapeHtml(dimension.label) + "</td>" +
          "<td><span class=\"ai-score-pill\">" + dimension.score + "%</span></td></tr>"
        );
      }).join("");

      if (reviewInterest) {
        reviewInterest.value = inferReviewInterest(resultAnswers, result);
      }
      if (reviewSummary) {
        reviewSummary.value = buildReviewMessage(result, resultAnswers);
      }
      if (reviewCopy) {
        reviewCopy.textContent = "Your AI readiness score is " + result.score + "/100 (" + result.maturity.band + "). Send it for a practical roadmap review.";
      }

      if (startOverButton) {
        startOverButton.addEventListener("click", startOver);
      }

      var reviewErrorBox = document.getElementById("ai-review-error");

      reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var invalidField = Array.prototype.slice.call(reviewForm.querySelectorAll("[required]")).find(function (field) {
          return !String(field.value || "").trim() || (field.type === "email" && !field.validity.valid);
        });
        Array.prototype.slice.call(reviewForm.querySelectorAll(".ai-review-field")).forEach(function (field) {
          field.classList.remove("is-invalid");
        });
        if (invalidField) {
          var wrap = invalidField.closest(".ai-review-field");
          if (wrap) wrap.classList.add("is-invalid");
          invalidField.focus();
          return;
        }
        if (!window.TTApi) return;

        var submitBtn = reviewForm.querySelector(".ai-review-submit");
        if (reviewErrorBox) reviewErrorBox.hidden = true;
        if (window.TTApi.setButtonLoading) {
          window.TTApi.setButtonLoading(submitBtn, true, "Submitting Request...");
        } else if (submitBtn) {
          submitBtn.disabled = true;
        }

        window.TTApi.submitLead(reviewForm, "ai-readiness-assessment")
          .then(function () {
            var noteEl = document.getElementById("ai-review-success-note");
            var email = String(reviewForm.elements.email.value || "").trim();
            if (noteEl && email) noteEl.textContent = "We'll reply to " + email + ".";
            setHidden(reviewForm, true);
            setHidden(reviewSuccess, false);
            if (reviewSuccess && reviewSuccess.focus) reviewSuccess.focus();
          })
          .catch(function (error) {
            if (reviewErrorBox) {
              reviewErrorBox.textContent = error.message;
              reviewErrorBox.hidden = false;
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

    function startOver() {
      answers = {};
      stepIndex = 0;
      resultsMount.innerHTML = "";
      setHidden(wizard, false);
      renderStep();
      if (wizard.focus) wizard.focus();
    }

    renderStep();
  }

  var api = {
    REQUIRED_FIELDS: REQUIRED_FIELDS,
    DIMENSIONS: DIMENSIONS,
    collectAnswers: collectAnswers,
    validateAnswers: validateAnswers,
    getDimensionScores: getDimensionScores,
    assessReadiness: assessReadiness,
    buildReviewMessage: buildReviewMessage,
  };

  if (typeof window !== "undefined") {
    window.AIReadinessAssessment = api;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initDom);
    } else {
      initDom();
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})();
