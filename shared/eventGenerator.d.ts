import type { Event } from "./events.js";

type StartOptions = {
  minDelayMs?: number;
  maxDelayMs?: number;
};

type EventListener = (event: Event) => void;

export class EventGenerator {
  constructor(listener: EventListener);
  start(options?: StartOptions): void;
  stop(): void;
}

export type { StartOptions, EventListener };
