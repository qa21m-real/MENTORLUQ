import { createContactForm } from "./contact-form.js";
import { createI18nController } from "./i18n.js";
import { createLightbox } from "./lightbox.js";
import { createNavMenu } from "./nav-menu.js";
import { createSectionExperience } from "./section-experience.js";
import { createThemeController } from "./theme.js";

export function initApp({ documentRef = document, storage } = {}) {
  const themeController = createThemeController({
    documentRef,
    storage,
    button: documentRef.getElementById("themeToggleBtn")
  });

  const i18nController = createI18nController({
    documentRef,
    storage,
    languageMenuButton: documentRef.getElementById("languageMenuBtn"),
    languageMenu: documentRef.getElementById("languageMenu"),
    languageItems: documentRef.querySelectorAll(".lang-menu-item")
  });

  const lightboxController = createLightbox({ documentRef });
  const navMenuController = createNavMenu({ documentRef });
  const sectionExperienceController = createSectionExperience({ documentRef });
  const contactFormController = createContactForm({ documentRef, storage });

  themeController.init();
  i18nController.init();
  lightboxController.init();
  navMenuController.init();
  sectionExperienceController.init();
  contactFormController.init();

  return {
    themeController,
    i18nController,
    lightboxController,
    navMenuController,
    sectionExperienceController,
    contactFormController
  };
}
