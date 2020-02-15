function save<T>(key: string, state: T): void {
  localStorage.setItem(key, JSON.stringify(state));
}

function load<T>(key: string, fallback: T): T {
  const state = localStorage.getItem(key);
  if (state != null) {
    return JSON.parse(state);
  } else {
    return fallback;
  }
}

export default {
  save,
  load
};
