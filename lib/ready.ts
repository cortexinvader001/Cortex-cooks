// Tiny shared flag so the hero entrance starts the moment the preloader leaves.
let isReady = false;
const listeners = new Set<() => void>();

export function markReady() {
  if (isReady) return;
  isReady = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function whenReady(fn: () => void) {
  if (isReady) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
