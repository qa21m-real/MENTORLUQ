import { initApp } from "./src/app.js";

function bootstrap() {
  initApp();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
} else {
  bootstrap();
}
