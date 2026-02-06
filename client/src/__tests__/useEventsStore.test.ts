import { useEventsStore, selectFilteredEvents } from '../store/useEventsStore';
import { beforeEach, describe, it, expect } from 'vitest';
import { EVENT_TYPES } from '../constants/events';
import type { Event } from '../types/Event';

const resetStore = () => {
  useEventsStore.setState({
    events: [],
    eventsMeta: new Map(),
    sources: new Set(),
    selectedTypes: new Set(EVENT_TYPES),
    selectedSource: null,
    messageQuery: '',
    selectedEventId: null,
  });
};

describe('useEventsStore', () => {
  beforeEach(() => {
    useEventsStore.persist?.clearStorage?.();
    localStorage.clear();
    resetStore();
  });

  it('adds events and tracks sources', () => {
    const event: Event = {
      id: 'event-1',
      type: 'info',
      message: 'hello',
      timestamp: 10,
      source: 'test-source',
    };

    useEventsStore.getState().addEvent(event);

    const state = useEventsStore.getState();
    expect(state.events[0]).toEqual(event);
    expect(state.sources.has('test-source')).toBe(true);
    expect(state.eventsMeta.has('event-1')).toBe(true);
  });

  it('sorts events by timestamp desc on setEvents', () => {
    const events: Event[] = [
      { id: 'a', type: 'info', message: 'a', timestamp: 1, source: 's1' },
      { id: 'b', type: 'warning', message: 'b', timestamp: 3, source: 's2' },
      { id: 'c', type: 'error', message: 'c', timestamp: 2, source: 's3' },
    ];

    useEventsStore.getState().setEvents(events);

    const state = useEventsStore.getState();
    expect(state.events.map((e) => e.id)).toEqual(['b', 'c', 'a']);
  });

  it('filters by type, source, and message query', () => {
    const events: Event[] = [
      { id: 'a', type: 'info', message: 'alpha', timestamp: 1, source: 'api' },
      { id: 'b', type: 'warning', message: 'beta', timestamp: 2, source: 'db' },
      { id: 'c', type: 'error', message: 'gamma', timestamp: 3, source: 'api' },
    ];

    useEventsStore.getState().setEvents(events);
    useEventsStore.getState().setSelectedSource('api');
    useEventsStore.getState().setMessageQuery('alp');
    useEventsStore.getState().setSelectedTypes(new Set(['info', 'error']));

    const filtered = selectFilteredEvents(useEventsStore.getState());
    expect(filtered.map((event) => event.id)).toEqual(['a']);
  });
});
