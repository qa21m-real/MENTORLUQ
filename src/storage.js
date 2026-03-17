function hasStorageApi(storage) {
  return storage && typeof storage.getItem === "function" && typeof storage.setItem === "function";
}

function getDefaultStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }

  if (typeof localStorage !== "undefined") {
    return localStorage;
  }

  return undefined;
}

export function createStorageAdapter(storage) {
  const activeStorage = typeof storage === "undefined" ? getDefaultStorage() : storage;

  if (hasStorageApi(activeStorage)) {
    return {
      getItem(key) {
        try {
          return activeStorage.getItem(key);
        } catch (error) {
          return null;
        }
      },
      setItem(key, value) {
        try {
          activeStorage.setItem(key, String(value));
        } catch (error) {
          // Ignore storage write errors so the UI keeps working.
        }
      }
    };
  }

  const memoryStore = new Map();

  return {
    getItem(key) {
      return memoryStore.has(key) ? memoryStore.get(key) : null;
    },
    setItem(key, value) {
      memoryStore.set(key, String(value));
    }
  };
}
