import { JSDOM } from "jsdom";

export function createDom(html) {
  return new JSDOM(html, { url: "https://example.com" });
}

export function createStorageMock(initialEntries = {}) {
  const store = new Map(
    Object.entries(initialEntries).map(([key, value]) => [key, String(value)])
  );

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    }
  };
}
