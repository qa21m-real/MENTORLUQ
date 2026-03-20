function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function parseLength(value, fallback) {
  const parsed = Number.parseFloat(String(value || "").replace("px", "").replace("%", "").trim());
  return Number.isFinite(parsed) ? parsed : fallback;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function buildSpacing(total) {
  const step = total > 1 ? 96 / (total - 1) : 96;
  return Array.from({ length: total }, (_, index) => 2 + index * step);
}

function setTrend(node, trend, isLatest) {
  node.classList.toggle("market-candle--bull", trend === "bull");
  node.classList.toggle("market-candle--bear", trend === "bear");
  node.classList.toggle("market-candle--latest", Boolean(isLatest));
}

function createNextCandle(previous) {
  const direction = Math.random() > 0.46 ? 1 : -1;
  const bottom = clamp(previous.bottom + direction * randomBetween(4, 9), 14, 66);
  const body = clamp(previous.body + randomBetween(-4, 6), 16, 38);
  const bodyBottom = clamp(direction > 0 ? randomBetween(8, 14) : randomBetween(12, 20), 8, 22);
  const wick = clamp(body + bodyBottom + randomBetween(18, 34), 42, 112);

  return {
    node: previous.node,
    trend: direction > 0 ? "bull" : "bear",
    bottom,
    wick,
    body,
    bodyBottom
  };
}

export function createHeroChart({
  documentRef = document,
  autoStart = true,
  intervalMs = 820
} = {}) {
  const nodes = Array.from(documentRef.querySelectorAll(".hero-market-scene__candles .market-candle"));
  let candles = [];
  let intervalId = null;
  let liveSteps = 0;
  const view = documentRef.defaultView;

  function hydrateCandles() {
    candles = nodes.map((node, index) => ({
      node,
      trend: node.classList.contains("market-candle--bear") ? "bear" : "bull",
      bottom: parseLength(node.style.getPropertyValue("--bottom"), 16 + index * 2),
      wick: parseLength(node.style.getPropertyValue("--wick"), 56),
      body: parseLength(node.style.getPropertyValue("--body"), 22),
      bodyBottom: parseLength(node.style.getPropertyValue("--body-bottom"), 12)
    }));
  }

  function render() {
    const spacing = buildSpacing(candles.length);

    candles.forEach((candle, index) => {
      const node = candle.node;
      const left = spacing[index];
      const opacity = clamp(0.3 + (index / Math.max(1, candles.length - 1)) * 0.7, 0.3, 1);
      const scale = clamp(0.9 + index / Math.max(1, candles.length - 1) * 0.12, 0.9, 1.02);

      node.style.setProperty("--left", `${left.toFixed(2)}%`);
      node.style.setProperty("--bottom", `${candle.bottom.toFixed(1)}%`);
      node.style.setProperty("--wick", `${candle.wick.toFixed(1)}px`);
      node.style.setProperty("--body", `${candle.body.toFixed(1)}px`);
      node.style.setProperty("--body-bottom", `${candle.bodyBottom.toFixed(1)}px`);
      node.style.setProperty("--candle-opacity", opacity.toFixed(2));
      node.style.setProperty("--candle-scale", scale.toFixed(3));
      node.style.setProperty("--candle-depth", String(candles.length - index - 1));

      setTrend(node, candle.trend, index === candles.length - 1);
    });
  }

  function moveLiveCandle() {
    const latest = candles[candles.length - 1];
    if (!latest) {
      return;
    }

    const direction = Math.random() > 0.48 ? 1 : -1;
    const bottomShift = randomBetween(3, 8) * direction;
    const bodyShift = randomBetween(1.5, 5);
    const nextBottom = clamp(latest.bottom + bottomShift, 14, 68);
    const nextBody = clamp(latest.body + (direction > 0 ? bodyShift : -bodyShift * 0.6), 16, 40);
    const nextBodyBottom = clamp(
      latest.bodyBottom + (direction > 0 ? randomBetween(-2, 2) : randomBetween(0, 4)),
      8,
      22
    );

    latest.bottom = nextBottom;
    latest.body = nextBody;
    latest.bodyBottom = nextBodyBottom;
    latest.wick = clamp(nextBody + nextBodyBottom + randomBetween(18, 32), 40, 116);
    latest.trend = direction > 0 ? "bull" : "bear";
    liveSteps += 1;
  }

  function rollToNextCandle() {
    if (candles.length < 2) {
      return;
    }

    const latest = candles[candles.length - 1];
    const recycled = candles.shift();
    const nextCandle = createNextCandle(latest);

    recycled.trend = nextCandle.trend;
    recycled.bottom = nextCandle.bottom;
    recycled.wick = nextCandle.wick;
    recycled.body = nextCandle.body;
    recycled.bodyBottom = nextCandle.bodyBottom;
    candles.push(recycled);
    liveSteps = 0;
  }

  function tick() {
    if (!candles.length) {
      return;
    }

    moveLiveCandle();

    if (liveSteps >= 4) {
      rollToNextCandle();
    }

    render();
  }

  function init() {
    if (!nodes.length) {
      return;
    }

    destroy();

    hydrateCandles();
    render();

    if (!autoStart) {
      return;
    }

    if (!view || typeof view.setInterval !== "function") {
      return;
    }

    intervalId = view.setInterval(tick, intervalMs);
  }

  function destroy() {
    if (intervalId !== null && view && typeof view.clearInterval === "function") {
      view.clearInterval(intervalId);
      intervalId = null;
    }
  }

  return {
    init,
    tick,
    destroy
  };
}
