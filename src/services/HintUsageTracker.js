export class HintUsageTracker {
  #threshold; #onThreshold; #usedByPlayer = new Set(); #triggered = false;

  constructor(threshold, onThreshold) {
    this.#threshold = threshold;
    this.#onThreshold = onThreshold;
  }

  record(playerId) {
    if (!playerId || this.#triggered) return;
    this.#usedByPlayer.add(String(playerId));
    if (this.#usedByPlayer.size < this.#threshold) return;
    this.#triggered = true;
    if (this.#onThreshold) this.#onThreshold();
  }
}
