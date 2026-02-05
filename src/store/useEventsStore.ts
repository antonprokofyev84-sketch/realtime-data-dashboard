import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/shallow';

import type { Event } from '../types/Event';
import { EVENT_TYPES } from '../constants/events';
import { mockEvents } from '../data/mockEvents';

type EventType = Event['type'];

type EventsState = {
  // Data
  events: Event[];
  sources: Set<string>;

  // Filters
  selectedTypes: Set<EventType>;
  selectedSource: string | null;
  messageQuery: string;

  // Selection
  selectedEventId: string | null;

  // Actions
  addEvent: (event: Event) => void;
  setEvents: (events: Event[]) => void;
  clearEvents: () => void;

  setSelectedTypes: (types: Set<EventType>) => void;
  toggleEventType: (type: EventType) => void;
  setSelectedSource: (source: string | null) => void;
  setMessageQuery: (query: string) => void;

  selectEvent: (id: string | null) => void;
};

const MAX_EVENTS = 10_000;

type PersistedState = {
  selectedTypes: Set<EventType>;
  selectedSource: string | null;
  messageQuery: string;
};

const storage = createJSONStorage<PersistedState>(() => localStorage, {
  replacer: (_key, value) => {
    if (value instanceof Set) return Array.from(value);
    return value;
  },
  reviver: (key, value) => {
    if (key === 'selectedTypes') return new Set(value as EventType[]);
    return value;
  },
});

export const useEventsStore = create<EventsState>()(
  persist(
    immer((set) => ({
      // Initial state
      events: mockEvents, //[],
      sources: new Set<string>(),

      selectedTypes: new Set(EVENT_TYPES),
      selectedSource: null,
      messageQuery: '',

      selectedEventId: null,

      // Events
      addEvent: (event) =>
        set((draft) => {
          draft.events.unshift(event);

          if (draft.events.length > MAX_EVENTS) {
            draft.events.pop();
          }

          draft.sources.add(event.source);
        }),

      setEvents: (events) =>
        set((draft) => {
          const sortedEvents = [...events]
            .sort((left, right) => right.timestamp - left.timestamp)
            .slice(0, MAX_EVENTS);

          draft.events = sortedEvents;
          draft.sources = new Set(sortedEvents.map((event) => event.source));
        }),

      clearEvents: () =>
        set((draft) => {
          draft.events = [];
          draft.sources.clear();
          draft.selectedEventId = null;
        }),

      // Filters
      setSelectedTypes: (types) =>
        set((draft) => {
          draft.selectedTypes = types;
        }),

      toggleEventType: (type) =>
        set((draft) => {
          if (draft.selectedTypes.has(type)) {
            draft.selectedTypes.delete(type);
          } else {
            draft.selectedTypes.add(type);
          }
        }),

      setSelectedSource: (source) =>
        set((draft) => {
          draft.selectedSource = source;
        }),

      setMessageQuery: (query) =>
        set((draft) => {
          draft.messageQuery = query;
        }),

      // Selection
      selectEvent: (id) =>
        set((draft) => {
          draft.selectedEventId = id;
        }),
    })),
    {
      name: 'events-dashboard-storage',

      storage,

      partialize: (state) => ({
        selectedTypes: state.selectedTypes,
        selectedSource: state.selectedSource,
        messageQuery: state.messageQuery,
      }),
    },
  ),
);

export const selectFilteredEvents = (state: EventsState): Event[] => {
  const { events, selectedTypes, selectedSource, messageQuery } = state;

  const normalizedQuery = messageQuery.trim().toLowerCase();

  return events.filter((event) => {
    const matchesType = selectedTypes.has(event.type);

    const matchesSource = !selectedSource || event.source === selectedSource;

    const matchesSearch = !normalizedQuery || event.message.toLowerCase().includes(normalizedQuery);

    return matchesType && matchesSource && matchesSearch;
  });
};

export const useFilteredEvents = () => useEventsStore(useShallow(selectFilteredEvents));
