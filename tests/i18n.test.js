import { describe, expect, it } from "vitest";

import { applyTranslations, createI18nController } from "../src/i18n.js";
import { createDom, createStorageMock } from "./helpers.js";

function createI18nDocument() {
  return createDom(`<!doctype html>
  <html lang="az">
    <head>
      <title data-i18n="page_title">Placeholder</title>
      <meta name="description" content="" data-i18n-attr="content:page_description" />
    </head>
    <body>
      <button id="languageMenuBtn" aria-expanded="false">AZ</button>
      <div id="languageMenu" hidden>
        <button class="lang-menu-item" data-lang="az" role="menuitemradio">Azərbaycan</button>
        <button class="lang-menu-item" data-lang="en" role="menuitemradio">English</button>
      </div>
      <h1 data-i18n="hero_title">Placeholder</h1>
      <input data-i18n-placeholder="name_placeholder" />
      <button id="themeToggleBtn" data-i18n-attr="aria-label:theme_toggle_label"></button>
    </body>
  </html>`);
}

describe("i18n", () => {
  it("applies translations and falls back to the default language", () => {
    const dom = createI18nDocument();
    const documentRef = dom.window.document;
    const storage = createStorageMock();

    const selectedLanguage = applyTranslations({
      documentRef,
      storage,
      language: "en",
      languageMenuButton: documentRef.getElementById("languageMenuBtn"),
      languageItems: documentRef.querySelectorAll(".lang-menu-item")
    });

    expect(selectedLanguage).toBe("en");
    expect(documentRef.documentElement.lang).toBe("en");
    expect(documentRef.querySelector("h1").textContent).toContain("Learn systematic trading");
    expect(documentRef.querySelector("input").getAttribute("placeholder")).toBe("Your name");
    expect(documentRef.getElementById("languageMenuBtn").textContent).toBe("EN");
    expect(documentRef.title).toBe("ApexExecution | Trading Mentorship");
    expect(documentRef.querySelector('meta[name="description"]').getAttribute("content")).toContain(
      "trading mentorship"
    );
    expect(storage.getItem("language")).toBe("en");

    const fallbackLanguage = applyTranslations({
      documentRef,
      storage,
      language: "de",
      languageMenuButton: documentRef.getElementById("languageMenuBtn"),
      languageItems: documentRef.querySelectorAll(".lang-menu-item")
    });

    expect(fallbackLanguage).toBe("az");
    expect(documentRef.documentElement.lang).toBe("az");
    expect(documentRef.getElementById("languageMenuBtn").textContent).toBe("AZ");
  });

  it("opens the language menu, switches language, and closes again", () => {
    const dom = createI18nDocument();
    const documentRef = dom.window.document;
    const storage = createStorageMock({ language: "en" });

    const controller = createI18nController({
      documentRef,
      storage,
      languageMenuButton: documentRef.getElementById("languageMenuBtn"),
      languageMenu: documentRef.getElementById("languageMenu"),
      languageItems: documentRef.querySelectorAll(".lang-menu-item")
    });

    controller.init();

    const menu = documentRef.getElementById("languageMenu");
    const button = documentRef.getElementById("languageMenuBtn");
    const englishButton = documentRef.querySelector('[data-lang="en"]');
    const azerbaijaniButton = documentRef.querySelector('[data-lang="az"]');

    expect(button.textContent).toBe("EN");
    expect(englishButton.getAttribute("aria-checked")).toBe("true");
    expect(menu.hidden).toBe(true);

    button.click();
    expect(menu.hidden).toBe(false);
    expect(button.getAttribute("aria-expanded")).toBe("true");

    azerbaijaniButton.click();
    expect(menu.hidden).toBe(true);
    expect(button.textContent).toBe("AZ");
    expect(storage.getItem("language")).toBe("az");
    expect(azerbaijaniButton.getAttribute("aria-checked")).toBe("true");
  });
});
