export type EventType = "info" | "warning" | "error";

export type Event = {
  id: string;
  type: EventType;
  message: string;
  timestamp: number;
  source: string;
};

export const EVENT_TYPES: readonly EventType[];
export const EVENT_MESSAGES: readonly string[];
export const EVENT_SOURCES: readonly string[];

export function createMockEvents(now?: number): Event[];
export const mockEvents: Event[];
