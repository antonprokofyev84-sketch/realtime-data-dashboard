import type { Event } from '../types/Event';

type StartOptions = {
  minDelayMs?: number;
  maxDelayMs?: number;
};

type EventListener = (event: Event) => void;

const EVENT_MESSAGES = [
  'User login successful',
  'Payment processed',
  'File uploaded',
  'API request failed',
  'Database connection lost',
  'Cache invalidated',
  'New order created',
  'Email sent to customer',
];

const EVENT_SOURCES = [
  'auth-service',
  'payments-service',
  'storage-service',
  'api-gateway',
  'database',
  'cache-layer',
];

const EVENT_TYPES: Event['type'][] = ['info', 'warning', 'error'];

export class EventGenerator {
  private isRunning = false;
  private timeoutId: number | null = null;
  private listener: EventListener;

  private minDelayMs = 500;
  private maxDelayMs = 2000;

  constructor(listener: EventListener) {
    this.listener = listener;
  }

  start(options?: StartOptions) {
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
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private scheduleNext() {
    if (!this.isRunning) return;

    const delay = this.randomBetween(this.minDelayMs, this.maxDelayMs);

    this.timeoutId = window.setTimeout(() => {
      const event = this.generateEvent();
      this.listener(event);

      this.scheduleNext();
    }, delay);
  }

  private generateEvent(): Event {
    return {
      id: crypto.randomUUID(),
      type: this.randomFrom(EVENT_TYPES),
      message: this.randomFrom(EVENT_MESSAGES),
      timestamp: Date.now(),
      source: this.randomFrom(EVENT_SOURCES),
    };
  }

  private randomFrom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private randomBetween(min: number, max: number): number {
    const safeMin = Math.max(0, Math.floor(min));
    const safeMax = Math.max(safeMin, Math.floor(max));

    return Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
  }
}
