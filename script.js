import { initApp } from "./src/app.js";

function bootstrap() {
  document.documentElement.classList.add("js-ready");
  initApp();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
} else {
  bootstrap();
}
