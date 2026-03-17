import { createStorageAdapter } from "./storage.js";

export const THEME_STORAGE_KEY = "theme";

function resolveTheme(theme) {
  return theme === "light" ? "light" : "dark";
}

function syncThemeButton(button, theme) {
  if (!button) {
    return;
  }

  button.textContent = theme === "light" ? "☾" : "☀";
  button.setAttribute("aria-pressed", String(theme === "light"));
}

export function applyTheme({ documentRef = document, storage, button = null, theme } = {}) {
  const storageAdapter = createStorageAdapter(storage);
  const currentTheme = resolveTheme(theme);

  documentRef.body.classList.toggle("light-mode", currentTheme === "light");
  syncThemeButton(button, currentTheme);
  storageAdapter.setItem(THEME_STORAGE_KEY, currentTheme);

  return currentTheme;
}

export function createThemeController({ documentRef = document, storage, button = null } = {}) {
  const storageAdapter = createStorageAdapter(storage);
  let currentTheme = "dark";

  function setTheme(theme) {
    currentTheme = applyTheme({
      documentRef,
      storage: storageAdapter,
      button,
      theme
    });

    return currentTheme;
  }

  function toggleTheme() {
    return setTheme(currentTheme === "light" ? "dark" : "light");
  }

  function init() {
    setTheme(storageAdapter.getItem(THEME_STORAGE_KEY));

    if (button) {
      button.addEventListener("click", toggleTheme);
    }
  }

  return {
    init,
    setTheme,
    toggleTheme,
    getTheme() {
      return currentTheme;
    }
  };
}
