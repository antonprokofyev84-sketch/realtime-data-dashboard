import { EVENT_MESSAGES, EVENT_SOURCES, EVENT_TYPES } from "./events.js";

const DEFAULT_MIN_DELAY = 500;
const DEFAULT_MAX_DELAY = 2000;

export class EventGenerator {
  isRunning = false;
  timeoutId = null;
  listener;

  minDelayMs = DEFAULT_MIN_DELAY;
  maxDelayMs = DEFAULT_MAX_DELAY;

  constructor(listener) {
    this.listener = listener;
  }

  start(options) {
    if (this.isRunning) return;

    const nextMinDelayMs = options?.minDelayMs ?? this.minDelayMs;
    const nextMaxDelayMs = options?.maxDelayMs ?? this.maxDelayMs;

    this.minDelayMs = nextMinDelayMs;
    this.maxDelayMs = nextMaxDelayMs;

    this.isRunning = true;
    this.scheduleNext();
  }

  stop() {
    this.isRunning = false;

    if (this.timeoutId !== null) {
      globalThis.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  scheduleNext() {
    if (!this.isRunning) return;

    const delay = this.randomBetween(this.minDelayMs, this.maxDelayMs);

    this.timeoutId = globalThis.setTimeout(() => {
      const event = this.generateEvent();
      this.listener(event);
      this.scheduleNext();
    }, delay);
  }

  generateEvent() {
    return {
      id: getRandomUUID(),
      type: this.randomFrom(EVENT_TYPES),
      message: this.randomFrom(EVENT_MESSAGES),
      timestamp: Date.now(),
      source: this.randomFrom(EVENT_SOURCES),
    };
  }

  randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  randomBetween(min, max) {
    const safeMin = Math.max(0, Math.floor(min));
    const safeMax = Math.max(safeMin, Math.floor(max));

    return Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
  }
}

const getRandomUUID = () => {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `event-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};
