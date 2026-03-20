import { describe, expect, it } from "vitest";

import { createContactForm } from "../src/contact-form.js";
import { createLightbox } from "../src/lightbox.js";
import { createNavMenu } from "../src/nav-menu.js";
import { createThemeController } from "../src/theme.js";
import { createDom, createStorageMock } from "./helpers.js";

describe("ui modules", () => {
  it("toggles theme and persists the current selection", () => {
    const dom = createDom(`<!doctype html>
      <html>
        <body>
          <button id="themeToggleBtn" type="button">☀</button>
        </body>
      </html>`);
    const documentRef = dom.window.document;
    const storage = createStorageMock({ theme: "light" });

    const controller = createThemeController({
      documentRef,
      storage,
      button: documentRef.getElementById("themeToggleBtn")
    });

    controller.init();

    const button = documentRef.getElementById("themeToggleBtn");
    expect(documentRef.body.classList.contains("light-mode")).toBe(true);
    expect(button.textContent).toBe("☾");
    expect(storage.getItem("theme")).toBe("light");

    button.click();

    expect(documentRef.body.classList.contains("light-mode")).toBe(false);
    expect(button.textContent).toBe("☀");
    expect(storage.getItem("theme")).toBe("dark");
  });

  it("opens and closes the lightbox from image triggers and escape", () => {
    const dom = createDom(`<!doctype html>
      <html>
        <body>
          <img src="images/1.png" alt="Certificate 1" data-lightbox-trigger />
          <div data-lightbox hidden aria-hidden="true">
            <button type="button" data-lightbox-close>×</button>
            <img data-lightbox-image src="" alt="" />
          </div>
        </body>
      </html>`);
    const documentRef = dom.window.document;

    const controller = createLightbox({ documentRef });
    controller.init();

    const trigger = documentRef.querySelector("[data-lightbox-trigger]");
    const lightbox = documentRef.querySelector("[data-lightbox]");
    const lightboxImage = documentRef.querySelector("[data-lightbox-image]");

    trigger.click();

    expect(lightbox.hidden).toBe(false);
    expect(lightboxImage.getAttribute("src")).toContain("images/1.png");
    expect(documentRef.body.style.overflow).toBe("hidden");

    documentRef.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape" }));

    expect(lightbox.hidden).toBe(true);
    expect(lightboxImage.getAttribute("src")).toBe("");
    expect(documentRef.body.style.overflow).toBe("");
  });

  it("shows a localized success message after the contact form is submitted", () => {
    const dom = createDom(`<!doctype html>
      <html>
        <body>
          <form id="contactForm">
            <input name="name" />
            <input name="email" />
            <textarea name="message"></textarea>
          </form>
          <p data-form-status></p>
        </body>
      </html>`);
    const documentRef = dom.window.document;
    const storage = createStorageMock({ language: "en" });
    const form = documentRef.getElementById("contactForm");
    const inputs = form.querySelectorAll("input, textarea");

    inputs[0].value = "Ali";
    inputs[1].value = "ali@example.com";
    inputs[2].value = "Need help";

    const controller = createContactForm({ documentRef, storage });
    controller.init();

    form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));

    expect(documentRef.querySelector("[data-form-status]").textContent).toContain("received");
    expect(inputs[0].value).toBe("");
    expect(inputs[1].value).toBe("");
    expect(inputs[2].value).toBe("");
  });

  it("toggles the mobile nav menu and closes it after a link selection", () => {
    const dom = createDom(`<!doctype html>
      <html>
        <body>
          <button type="button" data-mobile-nav-toggle aria-expanded="false">Menu</button>
          <div data-mobile-nav>
            <nav>
              <a href="#about" data-mobile-nav-close>About</a>
              <a href="#contact" data-mobile-nav-close>Contact</a>
            </nav>
            <button type="button" id="themeInside">Theme</button>
          </div>
        </body>
      </html>`);
    const documentRef = dom.window.document;

    const controller = createNavMenu({ documentRef });
    controller.init();

    const toggleButton = documentRef.querySelector("[data-mobile-nav-toggle]");
    const navPanel = documentRef.querySelector("[data-mobile-nav]");
    const navLink = documentRef.querySelector('[href="#about"]');
    const themeButton = documentRef.getElementById("themeInside");

    expect(navPanel.classList.contains("is-open")).toBe(false);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(documentRef.body.classList.contains("mobile-nav-open")).toBe(false);

    toggleButton.click();

    expect(navPanel.classList.contains("is-open")).toBe(true);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");
    expect(documentRef.body.classList.contains("mobile-nav-open")).toBe(true);

    themeButton.click();

    expect(navPanel.classList.contains("is-open")).toBe(true);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");

    navLink.click();

    expect(navPanel.classList.contains("is-open")).toBe(false);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(documentRef.body.classList.contains("mobile-nav-open")).toBe(false);
  });
});
