/*
  hearts.js : Valentine's hearts for alijamil.com (same idea as snow.js)
  Runs Feb 1 to Feb 15. Add ?hearts=on to any URL to preview it outside those dates.
  Turns itself off for visitors who have "reduce motion" enabled.
  Load it on any page: <script src="assets/js/hearts.js" defer></script>
*/
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var now = new Date();
  var inSeason = now.getMonth() === 1 && now.getDate() <= 15;   // 1 = February
  var forced = /[?&]hearts=on\b/.test(window.location.search);
  if (!inSeason && !forced) return;

  // Tweak these to taste
  var CONFIG = {
    density: 34,        // higher = fewer hearts (1 heart per N px of width)
    maxHearts: 70,
    minSize: 5,
    maxSize: 11,
    minSpeed: 0.3,      // px per frame
    maxSpeed: 0.85,
    sway: 0.7,
    colors: ["#e6317e", "#ff6fa8", "#c2185b", "#ff9cc2", "#d81b3c"]
  };

  var canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:50;";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var hearts = [], w = 0, h = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function makeHeart(startAnywhere) {
    var size = rand(CONFIG.minSize, CONFIG.maxSize);
    return {
      x: rand(0, w),
      y: startAnywhere ? rand(-h, h) : rand(-40, -10),
      size: size,
      vy: rand(CONFIG.minSpeed, CONFIG.maxSpeed) * (0.6 + size / CONFIG.maxSize),
      phase: rand(0, Math.PI * 2),
      swaySpeed: rand(0.006, 0.016),
      tilt: rand(-0.35, 0.35),
      spin: rand(-0.006, 0.006),
      alpha: rand(0.6, 0.95),
      color: CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)]
    };
  }

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var target = Math.min(CONFIG.maxHearts, Math.round(w / CONFIG.density));
    while (hearts.length < target) hearts.push(makeHeart(true));
    hearts.length = target;
  }

  function drawHeart(p) {
    var s = p.size;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.tilt);
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.35);
    ctx.bezierCurveTo(-s * 1.1, -s * 0.35, -s * 0.5, -s * 1.15, 0, -s * 0.45);
    ctx.bezierCurveTo(s * 0.5, -s * 1.15, s * 1.1, -s * 0.35, 0, s * 0.35);
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < hearts.length; i++) {
      var p = hearts[i];
      p.phase += p.swaySpeed;
      p.y += p.vy;
      p.x += Math.sin(p.phase) * CONFIG.sway * 0.5;
      p.tilt += p.spin;
      if (p.y - p.size > h) hearts[i] = makeHeart(false);
      if (p.x > w + 12) p.x = -12;
      if (p.x < -12) p.x = w + 12;
      drawHeart(p);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(tick);
})();
