import { createStorageAdapter } from "./storage.js";
import { EMAILJS_CONFIG, hasEmailJsConfig } from "./emailjs-config.js";
import { LANGUAGE_STORAGE_KEY, getMessages } from "./translations.js";

export function createContactForm({
  documentRef = document,
  storage,
  form = documentRef.getElementById("contactForm"),
  statusElement = documentRef.querySelector("[data-form-status]"),
  submitButton = form ? form.querySelector('[type="submit"]') : null,
  emailClient = documentRef.defaultView ? documentRef.defaultView.emailjs : null,
  emailConfig = EMAILJS_CONFIG
} = {}) {
  const storageAdapter = createStorageAdapter(storage);

  function setStatus(message) {
    if (!statusElement) {
      return;
    }

    statusElement.textContent = message;
    statusElement.hidden = !message;
  }

  function syncTemplateFields() {
    if (!form) {
      return;
    }

    const emailInput = form.querySelector('input[name="email"]');
    const replyToInput = form.querySelector('[data-emailjs-reply-to]');
    const destinationInput = form.querySelector('[data-emailjs-destination]');
    const submittedAtInput = form.querySelector('[data-emailjs-submitted-at]');
    const subjectInput = form.querySelector('[data-emailjs-subject]');

    if (replyToInput && emailInput) {
      replyToInput.value = emailInput.value.trim();
    }

    if (destinationInput) {
      destinationInput.value = emailConfig.destinationEmail;
    }

    if (submittedAtInput) {
      submittedAtInput.value = new Date().toISOString();
    }

    if (subjectInput) {
      subjectInput.value = `Yeni mentorluq muracieti - ${emailConfig.destinationEmail}`;
    }
  }

  function setSubmittingState(isSubmitting) {
    if (!submitButton) {
      return;
    }

    submitButton.disabled = isSubmitting;
    submitButton.setAttribute("aria-busy", String(isSubmitting));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form) {
      return;
    }

    const activeLanguage = storageAdapter.getItem(LANGUAGE_STORAGE_KEY);
    const messages = getMessages(activeLanguage);
    const canSend = hasEmailJsConfig(emailConfig) && emailClient && typeof emailClient.sendForm === "function";

    if (!canSend) {
      setStatus(messages.form_config_error);
      return;
    }

    syncTemplateFields();
    setSubmittingState(true);
    setStatus(messages.form_sending);

    try {
      await emailClient.sendForm(emailConfig.serviceId, emailConfig.templateId, form, {
        publicKey: emailConfig.publicKey
      });

      setStatus(messages.form_success);
      form.reset();
      syncTemplateFields();
    } catch (error) {
      const errorText =
        error && typeof error.text === "string" && error.text.trim() ? ` (${error.text.trim()})` : "";

      console.error("EmailJS send failed:", error);
      setStatus(`${messages.form_error}${errorText}`);
    } finally {
      setSubmittingState(false);
    }
  }

  function init() {
    setStatus("");

    if (!form) {
      return;
    }

    syncTemplateFields();
    form.addEventListener("input", syncTemplateFields);
    form.addEventListener("submit", handleSubmit);
  }

  return {
    init,
    handleSubmit,
    setStatus
  };
}
