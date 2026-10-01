(function () {
  "use strict";

  /* =========================================
     Timeline Logic
  ========================================= */
  const timelineProgress = document.querySelector(".timeline-line-progress");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineContainer = document.querySelector(".timeline-container");

  function updateTimelineProgress() {
    if (!timelineProgress || !timelineContainer) return;
    const containerRect = timelineContainer.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(
        100,
        ((window.innerHeight / 2 - containerRect.top) / containerRect.height) *
          100,
      ),
    );
    timelineProgress.style.height = percentage + "%";
    timelineItems.forEach(function (item) {
      const dot = item.querySelector(".timeline-dot");
      if (dot) {
        const dotY = dot.getBoundingClientRect().top - containerRect.top;
        item.classList.toggle(
          "active",
          (percentage / 100) * containerRect.height >= dotY,
        );
      }
    });
  }

  window.addEventListener("scroll", updateTimelineProgress, { passive: true });
  updateTimelineProgress();
})();
