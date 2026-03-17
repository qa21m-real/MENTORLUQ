import {
  DEFAULT_LANGUAGE,
  LANGUAGE_LABELS,
  LANGUAGE_STORAGE_KEY,
  getMessages,
  resolveLanguage
} from "./translations.js";
import { createStorageAdapter } from "./storage.js";

function parseAttributeMappings(attributeValue = "") {
  return attributeValue
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => entry.split(":").map((part) => part.trim()))
    .filter(([attributeName, translationKey]) => attributeName && translationKey);
}

function setTranslatedText(documentRef, messages) {
  documentRef.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const value = messages[key];

    if (typeof value === "string") {
      element.textContent = value;
    }
  });
}

function setTranslatedPlaceholders(documentRef, messages) {
  documentRef.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    const value = messages[key];

    if (typeof value === "string") {
      element.setAttribute("placeholder", value);
    }
  });
}

function setTranslatedAttributes(documentRef, messages) {
  documentRef.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const mappings = parseAttributeMappings(element.getAttribute("data-i18n-attr"));

    mappings.forEach(([attributeName, translationKey]) => {
      const value = messages[translationKey];

      if (typeof value === "string") {
        element.setAttribute(attributeName, value);
      }
    });
  });
}

function syncLanguageButton(button, language) {
  if (!button) {
    return;
  }

  button.textContent = LANGUAGE_LABELS[language] || LANGUAGE_LABELS[DEFAULT_LANGUAGE];
}

function syncLanguageItems(languageItems, language) {
  languageItems.forEach((item) => {
    const isActive = item.getAttribute("data-lang") === language;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-checked", String(isActive));
  });
}

export function applyTranslations({
  documentRef = document,
  storage,
  language,
  languageMenuButton = null,
  languageItems = []
} = {}) {
  const storageAdapter = createStorageAdapter(storage);
  const currentLanguage = resolveLanguage(language);
  const messages = getMessages(currentLanguage);

  documentRef.documentElement.lang = currentLanguage;
  setTranslatedText(documentRef, messages);
  setTranslatedPlaceholders(documentRef, messages);
  setTranslatedAttributes(documentRef, messages);
  syncLanguageButton(languageMenuButton, currentLanguage);
  syncLanguageItems(Array.from(languageItems), currentLanguage);

  storageAdapter.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);

  return currentLanguage;
}

export function createI18nController({
  documentRef = document,
  storage,
  languageMenuButton = null,
  languageMenu = null,
  languageItems = []
} = {}) {
  const storageAdapter = createStorageAdapter(storage);
  const languageButtons = Array.from(languageItems);
  let currentLanguage = DEFAULT_LANGUAGE;

  function setMenuOpen(isOpen) {
    if (!languageMenu || !languageMenuButton) {
      return;
    }

    languageMenu.hidden = !isOpen;
    languageMenu.classList.toggle("show", isOpen);
    languageMenuButton.setAttribute("aria-expanded", String(isOpen));
  }

  function setLanguage(language) {
    currentLanguage = applyTranslations({
      documentRef,
      storage: storageAdapter,
      language,
      languageMenuButton,
      languageItems: languageButtons
    });

    setMenuOpen(false);

    return currentLanguage;
  }

  function handleDocumentClick(event) {
    const target = event.target instanceof Element ? event.target : null;

    if (!target || !target.closest(".lang-dropdown")) {
      setMenuOpen(false);
    }
  }

  function handleDocumentKeydown(event) {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  }

  function init() {
    setLanguage(storageAdapter.getItem(LANGUAGE_STORAGE_KEY));

    if (languageMenuButton && languageMenu) {
      languageMenuButton.addEventListener("click", (event) => {
        event.stopPropagation();
        setMenuOpen(languageMenu.hidden);
      });
    }

    languageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        setLanguage(button.getAttribute("data-lang"));
      });
    });

    documentRef.addEventListener("click", handleDocumentClick);
    documentRef.addEventListener("keydown", handleDocumentKeydown);
  }

  return {
    init,
    setLanguage,
    getLanguage() {
      return currentLanguage;
    },
    openMenu() {
      setMenuOpen(true);
    },
    closeMenu() {
      setMenuOpen(false);
    }
  };
}
