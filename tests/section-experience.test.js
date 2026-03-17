import { describe, expect, it, vi } from "vitest";

import { createSectionExperience } from "../src/section-experience.js";
import { createDom } from "./helpers.js";

describe("section experience", () => {
  it("smooth-scrolls to the target section and replays the spotlight animation", () => {
    vi.useFakeTimers();

    const dom = createDom(`<!doctype html>
      <html>
        <body>
          <a href="#about" data-scroll-link>About</a>
          <section id="home">
            <h1 data-reveal="left">Home</h1>
          </section>
          <section id="about">
            <h2 data-reveal="right">About</h2>
            <p data-reveal="up">Info</p>
          </section>
        </body>
      </html>`);
    const documentRef = dom.window.document;
    const aboutSection = documentRef.getElementById("about");
    const link = documentRef.querySelector("[data-scroll-link]");

    aboutSection.scrollIntoView = vi.fn();

    const controller = createSectionExperience({ documentRef });
    controller.init();

    expect(aboutSection.querySelector("[data-reveal]").classList.contains("is-visible")).toBe(true);
    expect(link.style.getPropertyValue("--nav-item-index")).toBe("0");
    expect(aboutSection.querySelector("h2").style.getPropertyValue("--reveal-order")).toBe("0");
    expect(aboutSection.querySelector("p").style.getPropertyValue("--reveal-order")).toBe("1");

    link.click();

    expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(dom.window.location.hash).toBe("#about");

    vi.advanceTimersByTime(100);
    expect(aboutSection.classList.contains("section-focus")).toBe(true);

    vi.advanceTimersByTime(800);
    expect(aboutSection.classList.contains("section-focus")).toBe(false);

    vi.useRealTimers();
  });
});
