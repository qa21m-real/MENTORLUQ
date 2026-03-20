import { describe, expect, it, vi } from "vitest";

import { createHeroChart } from "../src/hero-chart.js";
import { createDom } from "./helpers.js";

describe("hero chart", () => {
  it("updates the live candle and rotates the stream forward", () => {
    const values = [0.9, 0.6, 0.4, 0.7, 0.6, 0.2, 0.8, 0.4, 0.55, 0.65];
    let randomIndex = 0;
    const randomSpy = vi
      .spyOn(Math, "random")
      .mockImplementation(() => values[randomIndex++ % values.length]);

    const dom = createDom(`<!doctype html>
      <html>
        <body>
          <div class="hero-market-scene__candles">
            <span class="market-candle market-candle--bull" style="--left: 2%; --bottom: 20%; --wick: 56px; --body: 20px; --body-bottom: 12px;"></span>
            <span class="market-candle market-candle--bear" style="--left: 50%; --bottom: 34%; --wick: 70px; --body: 24px; --body-bottom: 16px;"></span>
            <span class="market-candle market-candle--latest market-candle--bull" style="--left: 98%; --bottom: 48%; --wick: 78px; --body: 28px; --body-bottom: 14px;"></span>
          </div>
        </body>
      </html>`);
    const documentRef = dom.window.document;
    const controller = createHeroChart({
      documentRef,
      autoStart: false
    });

    controller.init();

    const candles = documentRef.querySelectorAll(".market-candle");
    const latest = candles[2];
    const originalBottom = latest.style.getPropertyValue("--bottom");

    controller.tick();

    expect(latest.classList.contains("market-candle--latest")).toBe(true);
    expect(latest.style.getPropertyValue("--bottom")).not.toBe(originalBottom);

    controller.tick();
    controller.tick();
    controller.tick();

    const liveCandle = documentRef.querySelector(".market-candle--latest");
    expect(liveCandle).not.toBeNull();
    expect(liveCandle.style.getPropertyValue("--left")).toBe("98.00%");
    expect(liveCandle.style.getPropertyValue("--bottom")).not.toBe("");
    randomSpy.mockRestore();
  });
});
