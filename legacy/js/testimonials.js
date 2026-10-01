(function () {
  var testimonials = [
    {
      quote:
        "Triyanshi Technologies completely transformed our digital presence. Their attention to detail and approach helped us increase user retention by 40%.",
      author: "Sarah Jenkins",
      role: "CTO, Finova Corp",
      avatar:
        "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=96&auto=format&fit=crop",
    },
    {
      quote:
        "We needed a highly complex enterprise solution, and they delivered it flawlessly and on time. The performance optimizations were truly outstanding.",
      author: "David Chen",
      role: "Founder, RetailScale",
      avatar:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=96&auto=format&fit=crop",
    },
    {
      quote:
        "The attention to detail and quality of work is unmatched. Our platform feels faster and more intuitive than ever before.",
      author: "Elena Rodriguez",
      role: "Product Lead, LaunchPad",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=96&auto=format&fit=crop",
    },
  ];

  var activeIndex = 0;
  var isAnimating = false;

  var quoteEl = document.getElementById("tmt-quote");
  var roleEl = document.getElementById("tmt-role");
  var authorsEl = document.getElementById("tmt-authors");

  if (!quoteEl || !roleEl || !authorsEl) return;

  function setContent(index) {
    quoteEl.textContent = testimonials[index].quote;
    roleEl.textContent = testimonials[index].role;
  }

  function handleSelect(index) {
    if (index === activeIndex || isAnimating) return;
    isAnimating = true;

    var btns = authorsEl.querySelectorAll(".tmt-author-btn");

    // Collapse old button immediately at click - zero overlap at t=0
    btns[activeIndex].classList.remove("active");
    btns[activeIndex].setAttribute("aria-pressed", "false");

    quoteEl.classList.add("tmt-animating");
    roleEl.classList.add("tmt-animating");

    setTimeout(function () {
      // t=200ms: swap content while quote is invisible
      setContent(index);
      activeIndex = index;
      quoteEl.classList.remove("tmt-animating");
      roleEl.classList.remove("tmt-animating");

      // t=350ms: old button has been collapsing for 350ms (~70% done), now expand new
      setTimeout(function () {
        btns[index].classList.add("active");
        btns[index].setAttribute("aria-pressed", "true");
        setTimeout(function () {
          isAnimating = false;
        }, 500);
      }, 150);
    }, 200);
  }

  function buildAuthorBtn(t, i) {
    var btn = document.createElement("button");
    btn.className = "tmt-author-btn" + (i === activeIndex ? " active" : "");
    btn.setAttribute("aria-pressed", i === activeIndex ? "true" : "false");
    btn.setAttribute("aria-label", t.author);
    btn.setAttribute("type", "button");

    var img = document.createElement("img");
    img.className = "tmt-avatar";
    img.src = t.avatar;
    img.alt = t.author;
    img.width = 32;
    img.height = 32;
    img.loading = "lazy";

    var nameWrap = document.createElement("div");
    nameWrap.className = "tmt-name-wrap";

    var nameInner = document.createElement("div");
    nameInner.className = "tmt-name-inner";

    var nameSpan = document.createElement("span");
    nameSpan.className = "tmt-author-name";
    nameSpan.textContent = t.author;

    nameInner.appendChild(nameSpan);
    nameWrap.appendChild(nameInner);
    btn.appendChild(img);
    btn.appendChild(nameWrap);

    btn.addEventListener("click", function () {
      handleSelect(i);
    });
    return btn;
  }

  function init() {
    setContent(activeIndex);
    testimonials.forEach(function (t, i) {
      authorsEl.appendChild(buildAuthorBtn(t, i));
    });
  }

  init();
})();
