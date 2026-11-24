/*
  snow.js : gentle trickling snowfall for alijamil.com
  Drop <script src="snow.js" defer></script> before </body> on any page.
  Only runs Nov 1 to Jan 31. Turns itself off for visitors who have "reduce motion" enabled.
*/
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Snow season: Nov 1 through Jan 31 every year.
  // Add ?snow=on to any URL to preview it outside the season.
  var month = new Date().getMonth(); // 0 = Jan, 11 = Dec
  var forced = /[?&]snow=on\b/.test(window.location.search);
  if (!forced && month !== 10 && month !== 11 && month !== 0) return;

  // Tweak these to taste
  var CONFIG = {
    density: 28,        // higher = fewer flakes (1 flake per N px of width)
    maxFlakes: 90,
    minSize: 1.6,
    maxSize: 4.2,
    minSpeed: 0.25,     // px per frame
    maxSpeed: 0.9,
    sway: 0.6,          // side-to-side drift
    opacity: [1, 0.85, 0.7],   // flakes are always white; this just varies how solid they look
    edge: "rgba(150,160,175,0.45)" // faint cool rim so white shows on the off-white background
  };

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:50;";
  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  var flakes = [];
  var w = 0, h = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function makeFlake(startAnywhere) {
    var size = rand(CONFIG.minSize, CONFIG.maxSize);
    return {
      x: rand(0, w),
      y: startAnywhere ? rand(-h, h) : rand(-40, -10),
      r: size,
      // bigger flakes fall a bit faster, which reads as depth
      vy: rand(CONFIG.minSpeed, CONFIG.maxSpeed) * (0.6 + size / CONFIG.maxSize),
      phase: rand(0, Math.PI * 2),
      swaySpeed: rand(0.005, 0.015),
      alpha: CONFIG.opacity[Math.floor(Math.random() * CONFIG.opacity.length)]
    };
  }

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var target = Math.min(CONFIG.maxFlakes, Math.round(w / CONFIG.density));
    while (flakes.length < target) flakes.push(makeFlake(true));
    flakes.length = target;
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 1;
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.phase += f.swaySpeed;
      f.y += f.vy;
      f.x += Math.sin(f.phase) * CONFIG.sway * 0.5;

      if (f.y - f.r > h) flakes[i] = makeFlake(false);
      if (f.x > w + 10) f.x = -10;
      if (f.x < -10) f.x = w + 10;

      // soft white flake: solid white core fading out, with a faint cool rim
      ctx.globalAlpha = f.alpha;
      var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 1.6);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.55, "#ffffff");
      g.addColorStop(0.8, CONFIG.edge);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(tick);
})();
