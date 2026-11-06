(function () {
  var root = document.querySelector(".appsoon");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";
  var view = root.querySelector(".appsoon-view");
  var msg = root.querySelector(".appsoon-msg");
  var btn = root.querySelector(".appsoon-pause");
  if (!view || !msg || !btn) return;
  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");

  function layout() {
    if (mq.matches) {
      root.classList.add("is-static");
      root.classList.remove("is-live");
      return;
    }
    var cs = getComputedStyle(view);
    var pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    var travel = Math.floor(view.clientWidth - pad - msg.scrollWidth);
    if (travel < 12) {
      root.classList.add("is-static");
      root.classList.remove("is-live");
      root.style.removeProperty("--travel");
      return;
    }
    root.classList.remove("is-static");
    root.classList.add("is-live");
    root.style.setProperty("--travel", travel + "px");
    root.style.setProperty("--glide", Math.max(8, Math.round(travel / 36)) + "s");
  }

  btn.addEventListener("click", function () {
    var paused = root.classList.toggle("is-paused");
    btn.setAttribute("aria-pressed", paused ? "true" : "false");
    btn.textContent = paused ? "Play" : "Pause";
    btn.setAttribute("aria-label", paused ? "Play motion" : "Pause motion");
  });

  layout();
  if (mq.addEventListener) mq.addEventListener("change", layout);
  window.addEventListener("resize", layout);
})();
