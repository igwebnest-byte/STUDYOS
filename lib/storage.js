export function getData(key) {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }

    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setData(key, value) {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return false;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function updateData(key, updaterFn) {
  try {
    if (typeof updaterFn !== "function") {
      return null;
    }

    const currentValue = getData(key);
    const updatedValue = updaterFn(currentValue);
    const stored = setData(key, updatedValue);

    return stored ? updatedValue : null;
  } catch {
    return null;
  }
}
