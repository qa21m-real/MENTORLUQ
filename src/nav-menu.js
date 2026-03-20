function getElementConstructor(documentRef) {
  if (documentRef.defaultView && documentRef.defaultView.Element) {
    return documentRef.defaultView.Element;
  }

  return Element;
}

export function createNavMenu({
  documentRef = document,
  toggleButton = documentRef.querySelector("[data-mobile-nav-toggle]"),
  panel = documentRef.querySelector("[data-mobile-nav]")
} = {}) {
  const ElementConstructor = getElementConstructor(documentRef);
  const panelCloseItems = panel ? Array.from(panel.querySelectorAll("[data-mobile-nav-close]")) : [];
  let openState = false;

  function syncState() {
    if (!toggleButton || !panel) {
      return;
    }

    panel.classList.toggle("is-open", openState);
    toggleButton.classList.toggle("is-active", openState);
    toggleButton.setAttribute("aria-expanded", String(openState));

    if (documentRef.body) {
      documentRef.body.classList.toggle("mobile-nav-open", openState);
    }
  }

  function setOpenState(nextState) {
    openState = Boolean(nextState);
    syncState();
  }

  function handleDocumentClick(event) {
    const target = event.target instanceof ElementConstructor ? event.target : null;

    if (!target) {
      return;
    }

    if (toggleButton && target.closest("[data-mobile-nav-toggle]")) {
      return;
    }

    if (panel && target.closest("[data-mobile-nav]")) {
      return;
    }

    setOpenState(false);
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      setOpenState(false);
    }
  }

  function init() {
    setOpenState(false);

    if (toggleButton && panel) {
      toggleButton.addEventListener("click", function () {
        setOpenState(!openState);
      });
    }

    panelCloseItems.forEach((item) => {
      item.addEventListener("click", function () {
        setOpenState(false);
      });
    });

    documentRef.addEventListener("click", handleDocumentClick);
    documentRef.addEventListener("keydown", handleKeydown);
  }

  return {
    init,
    open() {
      setOpenState(true);
    },
    close() {
      setOpenState(false);
    },
    toggle() {
      setOpenState(!openState);
    },
    isOpen() {
      return openState;
    }
  };
}
