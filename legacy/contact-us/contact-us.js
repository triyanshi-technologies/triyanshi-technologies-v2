(function () {
  "use strict";

  var form = document.querySelector(".contact-form");
  var success = document.getElementById("contact-form-success");
  var successNote = document.getElementById("contact-form-success-note");
  var errorBox = document.getElementById("contact-form-error");
  var submitButton = form ? form.querySelector(".contact-submit") : null;

  if (!form || !success || !window.TTApi) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!window.TTApi.validateRequired(form)) return;

    if (errorBox) errorBox.hidden = true;
    if (window.TTApi.setButtonLoading) {
      window.TTApi.setButtonLoading(submitButton, true, "Sending Message...");
    } else if (submitButton) {
      submitButton.disabled = true;
    }

    window.TTApi.submitContact(form)
      .then(function () {
        var email = String(form.email.value || "").trim();
        if (successNote && email) {
          successNote.textContent = "We'll reply to " + email + ".";
        }
        form.hidden = true;
        success.hidden = false;
        success.focus();
      })
      .catch(function (error) {
        if (errorBox) {
          errorBox.textContent = error.message;
          errorBox.hidden = false;
        }
      })
      .then(function () {
        if (window.TTApi.setButtonLoading) {
          window.TTApi.setButtonLoading(submitButton, false);
        } else if (submitButton) {
          submitButton.disabled = false;
        }
      });
  });
})();
