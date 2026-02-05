import type { EVENT_TYPES } from '../constants/events';

export type EventType = (typeof EVENT_TYPES)[number];

export type Event = {
  id: string;
  type: EventType;
  message: string;
  timestamp: number;
  source: string;
};
