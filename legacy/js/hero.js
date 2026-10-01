(function () {
  const slider = document.querySelector("[data-hero-slider]");
  if (!slider) return;

  const slides = [...slider.querySelectorAll("[data-hero-slide]")];
  const prevButton = slider.querySelector("[data-hero-prev]");
  const nextButton = slider.querySelector("[data-hero-next]");
  const pauseButton = slider.querySelector("[data-hero-pause]");
  const autoplayMs = 10000;

  if (slides.length < 2) return;

  let activeIndex = 0;
  let isPaused = false;
  let isAnimating = false;
  let autoplayId = 0;

  function clearSlideMotionClasses() {
    slides.forEach((slide) => {
      slide.classList.remove(
        "is-enter-next",
        "is-enter-prev",
        "is-exit-next",
        "is-exit-prev",
      );
    });
  }

  function setSlide(nextIndex, direction = "next") {
    const normalizedIndex = (nextIndex + slides.length) % slides.length;
    if (normalizedIndex === activeIndex || isAnimating) return;

    const currentSlide = slides[activeIndex];
    const nextSlide = slides[normalizedIndex];
    const enterClass = direction === "prev" ? "is-enter-prev" : "is-enter-next";
    const exitClass = direction === "prev" ? "is-exit-prev" : "is-exit-next";

    isAnimating = true;
    clearSlideMotionClasses();
    nextSlide.classList.add(enterClass);
    nextSlide.setAttribute("aria-hidden", "false");

    nextSlide.getBoundingClientRect();

    currentSlide.classList.remove("is-active");
    currentSlide.classList.add(exitClass);
    currentSlide.setAttribute("aria-hidden", "true");

    nextSlide.classList.add("is-active");
    nextSlide.classList.remove(enterClass);
    activeIndex = normalizedIndex;

    window.setTimeout(() => {
      currentSlide.classList.remove(exitClass);
      isAnimating = false;
    }, 700);

    restartAutoplay();
  }

  function setInitialSlideState() {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
  }

  function restartAutoplay() {
    window.clearTimeout(autoplayId);
    if (isPaused || document.hidden) return;
    autoplayId = window.setTimeout(
      () => setSlide(activeIndex + 1, "next"),
      autoplayMs,
    );
  }

  function setPaused(nextState) {
    if (!pauseButton) return;
    isPaused = nextState;
    slider.classList.toggle("is-paused", isPaused);
    pauseButton.classList.toggle("is-paused", isPaused);
    pauseButton.setAttribute("aria-pressed", String(isPaused));
    pauseButton.setAttribute(
      "aria-label",
      isPaused ? "Resume hero slider" : "Pause hero slider",
    );
    restartAutoplay();
  }

  prevButton?.addEventListener("click", () =>
    setSlide(activeIndex - 1, "prev"),
  );
  nextButton?.addEventListener("click", () =>
    setSlide(activeIndex + 1, "next"),
  );
  pauseButton?.addEventListener("click", () => setPaused(!isPaused));

  document.addEventListener("visibilitychange", restartAutoplay);

  setInitialSlideState();
  restartAutoplay();
})();
