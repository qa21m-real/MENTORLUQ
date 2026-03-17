export function createLightbox({
  documentRef = document,
  lightbox = documentRef.querySelector("[data-lightbox]"),
  lightboxImage = documentRef.querySelector("[data-lightbox-image]"),
  closeButton = documentRef.querySelector("[data-lightbox-close]"),
  triggers = documentRef.querySelectorAll("[data-lightbox-trigger]")
} = {}) {
  const lightboxTriggers = Array.from(triggers);

  function setOpenState(isOpen) {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightbox.hidden = !isOpen;
    lightbox.classList.toggle("active", isOpen);
    lightbox.setAttribute("aria-hidden", String(!isOpen));
    documentRef.body.style.overflow = isOpen ? "hidden" : "";

    if (!isOpen) {
      lightboxImage.src = "";
      lightboxImage.alt = "";
    }
  }

  function open(imageSrc, imageAlt = "") {
    if (!lightbox || !lightboxImage || !imageSrc) {
      return;
    }

    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    setOpenState(true);

    if (closeButton) {
      closeButton.focus();
    }
  }

  function close() {
    setOpenState(false);
  }

  function init() {
    setOpenState(false);

    lightboxTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const imageSrc = trigger.getAttribute("src");
        const imageAlt = trigger.getAttribute("alt") || "";
        open(imageSrc, imageAlt);
      });
    });

    if (closeButton) {
      closeButton.addEventListener("click", close);
    }

    if (lightbox) {
      lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
          close();
        }
      });
    }

    documentRef.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        close();
      }
    });
  }

  return {
    init,
    open,
    close,
    isOpen() {
      return Boolean(lightbox) && !lightbox.hidden;
    }
  };
}
