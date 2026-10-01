(function () {
  "use strict";

  var API_BASE = window.TT_API_BASE || "https://triyanshi-technologies-server.vercel.app";
  var REQUEST_TIMEOUT_MS = 20000;

  function parseJsonSafe(res) {
    return res.json().catch(function () {
      return {};
    });
  }

  function withTimeout(signal) {
    var timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
    return signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
  }

  function timeoutError(err) {
    if (err && err.name === "TimeoutError") {
      return new Error("Request timed out. Please try again.");
    }
    return err;
  }

  function postJson(path, payload) {
    return fetch(API_BASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: withTimeout(),
    })
      .catch(function (err) {
        throw timeoutError(err);
      })
      .then(function (res) {
        return parseJsonSafe(res).then(function (data) {
          if (!res.ok) {
            throw new Error((data && data.error) || "Something went wrong. Please try again.");
          }
          return data;
        });
      });
  }

  function getJson(path, signal) {
    return fetch(API_BASE + path, { signal: signal })
      .catch(function (err) {
        throw timeoutError(err);
      })
      .then(function (res) {
        return parseJsonSafe(res).then(function (data) {
          if (!res.ok) {
            throw new Error((data && data.error) || "Request failed. Please try again.");
          }
          return data;
        });
      });
  }

  function serializeForm(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = value;
    });
    return data;
  }

  // Catches what bare `required` misses (whitespace-only values) and reuses
  // native checkValidity() for format checks (email/url/etc). Flags the
  // first bad field with .field-invalid so it can be styled, then focuses it.
  function validateRequired(form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll("[required]"));
    var firstInvalid = null;

    fields.forEach(function (field) {
      var isBlank = !String(field.value || "").trim();
      var isBad = isBlank || !field.checkValidity();
      field.classList.toggle("field-invalid", isBad);
      if (isBad && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      if (firstInvalid.reportValidity) firstInvalid.reportValidity();
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  document.addEventListener("input", function (event) {
    var target = event.target;
    if (target && target.classList && target.classList.contains("field-invalid")) {
      target.classList.remove("field-invalid");
    }
  });

  function setButtonLoading(button, isLoading, loadingText) {
    if (!button) return;
    if (isLoading) {
      if (!button.hasAttribute("data-original-html")) {
        button.setAttribute("data-original-html", button.innerHTML);
      }
      button.disabled = true;
      button.classList.add("is-loading");
      button.innerHTML =
        '<span class="btn-spinner" aria-hidden="true"></span> ' +
        (loadingText || "Submitting...");
    } else {
      button.disabled = false;
      button.classList.remove("is-loading");
      if (button.hasAttribute("data-original-html")) {
        button.innerHTML = button.getAttribute("data-original-html");
        button.removeAttribute("data-original-html");
      }
    }
  }

  window.TTApi = {
    submitContact: function (form) {
      return postJson("/api/contact", serializeForm(form));
    },
    submitLead: function (form, source) {
      var data = serializeForm(form);
      data.source = source;
      return postJson("/api/leads", data);
    },
    getPageSpeed: function (url, strategy, signal) {
      var qs = "?url=" + encodeURIComponent(url) + "&strategy=" + encodeURIComponent(strategy);
      return getJson("/api/pagespeed" + qs, signal);
    },
    validateRequired: validateRequired,
    setButtonLoading: setButtonLoading,
  };
})();
