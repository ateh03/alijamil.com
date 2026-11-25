/*
  drip.js : seasonal blood drip for alijamil.com
  Runs Oct 1 to Oct 31. Add ?drip=on to any URL to preview it outside October.
  Turns itself off for visitors who have "reduce motion" enabled.

  Two ways to use it (pick one or both):
    1. Whole page: <script src="assets/js/drip.js" data-mode="page" defer></script>
       Drips run along the top edge of the browser window.
    2. Graphics only: add data-drip to any element, e.g. <article class="gallery-left" data-drip>
       and load <script src="assets/js/drip.js" defer></script>
       Drips run along the top edge of each tagged element.
*/
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var forced = /[?&]drip=on\b/.test(window.location.search);
  if (!forced && new Date().getMonth() !== 9) return;   // 9 = October

  // Tweak these to taste
  var CONFIG = {
    dripsPer100px: 1.1,     // how many drips per 100px of width
    minLength: 18,          // shortest a drip grows (px)
    maxLength: 150,         // longest a drip grows before a drop falls (px)
    growSpeed: [0.06, 0.32],// px per frame, picked at random per drip
    poolHeight: 10,         // the wavy band along the top edge (px)
    dark: "#4a0006",
    mid: "#8c0c14",
    light: "#c41a24"
  };

  var script = document.currentScript;
  var mode = script && script.getAttribute("data-mode");

  function rand(a, b) { return a + Math.random() * (b - a); }

  function makeLayer(host, fixed) {
    var c = document.createElement("canvas");
    c.setAttribute("aria-hidden", "true");
    c.style.cssText = (fixed ? "position:fixed;top:0;left:0;width:100%;height:100%;" :
      "position:absolute;inset:0;width:100%;height:100%;") +
      "pointer-events:none;z-index:" + (fixed ? 1100 : 1) + ";";
    if (!fixed && getComputedStyle(host).position === "static") host.style.position = "relative";
    host.appendChild(c);

    var ctx = c.getContext("2d");
    var w = 0, h = 0, drips = [], drops = [], wave = [];

    function newDrip(x) {
      return {
        x: x,
        width: rand(5, 12),
        len: rand(0, CONFIG.minLength),
        max: rand(CONFIG.minLength * 2, CONFIG.maxLength),
        speed: rand(CONFIG.growSpeed[0], CONFIG.growSpeed[1]),
        wobble: rand(0, Math.PI * 2)
      };
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var r = fixed ? { width: window.innerWidth, height: window.innerHeight } : host.getBoundingClientRect();
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(3, Math.round(w / 100 * CONFIG.dripsPer100px));
      drips = [];
      for (var i = 0; i < count; i++) drips.push(newDrip(rand(8, w - 8)));
      wave = [];
      for (var x = 0; x <= w + 20; x += 20) wave.push(rand(CONFIG.poolHeight * 0.4, CONFIG.poolHeight));
    }

    function bloodFill(top, bottom) {
      var g = ctx.createLinearGradient(0, top, 0, bottom);
      g.addColorStop(0, CONFIG.dark);
      g.addColorStop(0.55, CONFIG.mid);
      g.addColorStop(1, CONFIG.dark);
      return g;
    }

    function drawPool() {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (var i = 0; i < wave.length; i++) {
        var x = i * 20, y = wave[i];
        var nx = (i + 1) * 20, ny = wave[i + 1] || y;
        ctx.quadraticCurveTo(x, y, (x + nx) / 2, (y + ny) / 2);
      }
      ctx.lineTo(w, 0);
      ctx.closePath();
      ctx.fillStyle = bloodFill(0, CONFIG.poolHeight);
      ctx.fill();
    }

    function drawDrip(d) {
      var half = d.width / 2, tip = CONFIG.poolHeight * 0.6 + d.len;
      var sway = Math.sin(d.wobble) * 0.6;
      ctx.beginPath();
      ctx.moveTo(d.x - half - 3, 0);
      ctx.bezierCurveTo(d.x - half, CONFIG.poolHeight, d.x - half * 0.7 + sway, tip * 0.6, d.x - half * 0.8 + sway, tip);
      ctx.arc(d.x + sway, tip, half * 0.95, Math.PI, 0, true);             // round bulb at the tip
      ctx.bezierCurveTo(d.x + half * 0.7 + sway, tip * 0.6, d.x + half, CONFIG.poolHeight, d.x + half + 3, 0);
      ctx.closePath();
      ctx.fillStyle = bloodFill(0, tip + half);
      ctx.fill();
      // wet highlight
      ctx.beginPath();
      ctx.moveTo(d.x - half * 0.35 + sway, CONFIG.poolHeight + 2);
      ctx.lineTo(d.x - half * 0.3 + sway, tip - half * 0.5);
      ctx.strokeStyle = "rgba(255,120,120,0.35)";
      ctx.lineWidth = Math.max(1, d.width * 0.14);
      ctx.lineCap = "round";
      ctx.stroke();
    }

    function drawDrop(p) {
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.r * 0.8, p.r * 1.25, 0, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.mid;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      drawPool();
      for (var i = 0; i < drips.length; i++) {
        var d = drips[i];
        d.wobble += 0.02;
        // grow fast at first, then ooze slowly
        d.len += d.speed * (1.2 - d.len / d.max);
        if (d.len >= d.max * 0.98) {
          // a drop breaks off and the drip pulls back up a bit
          drops.push({ x: d.x, y: CONFIG.poolHeight + d.len + d.width, r: d.width * 0.55, vy: 0.6, alpha: 1 });
          d.len = d.max * rand(0.35, 0.6);
          d.max = rand(CONFIG.minLength * 2, CONFIG.maxLength);
        }
        drawDrip(d);
      }
      for (var j = drops.length - 1; j >= 0; j--) {
        var p = drops[j];
        p.vy += 0.18; p.y += p.vy;
        if (p.y > h * 0.85) p.alpha -= 0.04;
        if (p.y > h + 20 || p.alpha <= 0) { drops.splice(j, 1); continue; }
        drawDrop(p);
      }
      requestAnimationFrame(tick);
    }

    if (fixed) window.addEventListener("resize", resize);
    else if (window.ResizeObserver) new ResizeObserver(resize).observe(host);
    resize();
    requestAnimationFrame(tick);
  }

  function start() {
    if (mode === "page") makeLayer(document.body, true);
    document.querySelectorAll("[data-drip]").forEach(function (el) { makeLayer(el, false); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
