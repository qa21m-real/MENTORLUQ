import { createStorageAdapter } from "./storage.js";
import { LANGUAGE_STORAGE_KEY, getMessages } from "./translations.js";

export function createContactForm({
  documentRef = document,
  storage,
  form = documentRef.getElementById("contactForm"),
  statusElement = documentRef.querySelector("[data-form-status]")
} = {}) {
  const storageAdapter = createStorageAdapter(storage);

  function setStatus(message) {
    if (!statusElement) {
      return;
    }

    statusElement.textContent = message;
    statusElement.hidden = !message;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form) {
      return;
    }

    const activeLanguage = storageAdapter.getItem(LANGUAGE_STORAGE_KEY);
    const messages = getMessages(activeLanguage);

    setStatus(messages.form_success);
    form.reset();
  }

  function init() {
    setStatus("");

    if (!form) {
      return;
    }

    form.addEventListener("submit", handleSubmit);
  }

  return {
    init,
    handleSubmit,
    setStatus
  };
}
