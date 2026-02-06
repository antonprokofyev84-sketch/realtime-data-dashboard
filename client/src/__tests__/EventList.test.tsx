import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventList } from '../components/EventList/EventList';
import { useEventsStore } from '../store/useEventsStore';
import { EVENT_TYPES } from '../constants/events';
import type { Event } from '../types/Event';

vi.mock('@tanstack/react-virtual', () => {
  return {
    useVirtualizer: ({ count }: { count: number }) => ({
      getTotalSize: () => 0,
      getVirtualItems: () =>
        Array.from({ length: count }, (_, index) => ({ index, start: index * 100 })),
      measureElement: () => undefined,
    }),
  };
});

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

describe('EventList', () => {
  beforeEach(() => {
    useEventsStore.persist?.clearStorage?.();
    localStorage.clear();
    resetStore();
  });

  it('renders events and selects on click', async () => {
    const user = userEvent.setup();
    const events: Event[] = [
      { id: 'a', type: 'info', message: 'alpha', timestamp: 1, source: 'api' },
      { id: 'b', type: 'warning', message: 'beta', timestamp: 2, source: 'db' },
    ];

    useEventsStore.getState().setEvents(events);

    render(<EventList />);

    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('beta')).toBeInTheDocument();

    await user.click(screen.getByText('beta'));

    expect(useEventsStore.getState().selectedEventId).toBe('b');
  });
});
