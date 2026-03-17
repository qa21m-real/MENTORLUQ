function getWindowRef(documentRef) {
  if (documentRef.defaultView) {
    return documentRef.defaultView;
  }

  if (typeof window !== "undefined") {
    return window;
  }

  return null;
}

function getTargetSection(documentRef, hash) {
  if (!hash || hash.charAt(0) !== "#") {
    return null;
  }

  try {
    return documentRef.querySelector(hash);
  } catch (error) {
    return null;
  }
}

function markVisible(element) {
  element.classList.add("is-visible");
}

function applyIndexVariable(elements, cssVariableName) {
  elements.forEach((element, index) => {
    element.style.setProperty(cssVariableName, String(index));
  });
}

function applyRevealOrder(revealItems) {
  const sectionCounters = new Map();

  revealItems.forEach((item) => {
    const section = item.closest("section, .hero") || item.parentElement;
    const currentIndex = sectionCounters.get(section) || 0;

    item.style.setProperty("--reveal-order", String(currentIndex));
    sectionCounters.set(section, currentIndex + 1);
  });
}

export function createSectionExperience({
  documentRef = document,
  links = documentRef.querySelectorAll("[data-scroll-link]"),
  revealItems = documentRef.querySelectorAll("[data-reveal]")
} = {}) {
  const windowRef = getWindowRef(documentRef);
  const linkList = Array.from(links);
  const revealList = Array.from(revealItems);
  let observer = null;
  let focusedSection = null;
  let focusTimeoutId = null;

  function clearSectionFocus() {
    if (focusTimeoutId !== null) {
      clearTimeout(focusTimeoutId);
      focusTimeoutId = null;
    }

    if (focusedSection) {
      focusedSection.classList.remove("section-focus");
      focusedSection = null;
    }
  }

  function markSectionVisible(section) {
    Array.from(section.querySelectorAll("[data-reveal]")).forEach(markVisible);
  }

  function spotlightSection(section) {
    clearSectionFocus();

    focusedSection = section;
    section.classList.remove("section-focus");
    void section.offsetWidth;
    section.classList.add("section-focus");

    focusTimeoutId = setTimeout(() => {
      if (focusedSection === section) {
        section.classList.remove("section-focus");
        focusedSection = null;
      }

      focusTimeoutId = null;
    }, 720);
  }

  function syncHash(hash) {
    if (!windowRef || !windowRef.history || typeof windowRef.history.replaceState !== "function") {
      return;
    }

    try {
      windowRef.history.replaceState(null, "", hash);
    } catch (error) {
      return;
    }
  }

  function handleLinkClick(event) {
    const hash = event.currentTarget.getAttribute("href");
    const targetSection = getTargetSection(documentRef, hash);

    if (!targetSection) {
      return;
    }

    event.preventDefault();
    markSectionVisible(targetSection);
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    syncHash(hash);

    if (windowRef && typeof windowRef.setTimeout === "function") {
      windowRef.setTimeout(() => {
        spotlightSection(targetSection);
      }, 90);
      return;
    }

    spotlightSection(targetSection);
  }

  function initRevealObserver() {
    if (!windowRef || typeof windowRef.IntersectionObserver !== "function") {
      revealList.forEach(markVisible);
      return;
    }

    observer = new windowRef.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          markVisible(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.24,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealList.forEach((item) => {
      observer.observe(item);
    });
  }

  function init() {
    applyIndexVariable(linkList, "--nav-item-index");
    applyRevealOrder(revealList);
    initRevealObserver();
    linkList.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });
  }

  return {
    init,
    spotlightSection,
    revealSection(section) {
      markSectionVisible(section);
      spotlightSection(section);
    }
  };
}
