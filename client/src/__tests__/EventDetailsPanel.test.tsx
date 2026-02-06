import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { EventDetailsPanel } from '../components/EventDetails/EventDetailsPanel';
import { useEventsStore } from '../store/useEventsStore';
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

describe('EventDetailsPanel', () => {
  beforeEach(() => {
    useEventsStore.persist?.clearStorage?.();
    localStorage.clear();
    resetStore();
  });

  it('renders selected event details', () => {
    const event: Event = {
      id: 'event-1',
      type: 'info',
      message: 'hello',
      timestamp: 1700000000000,
      source: 'auth-service',
    };

    act(() => {
      useEventsStore.getState().setEvents([event]);
      useEventsStore.getState().selectEvent(event.id);
    });

    render(<EventDetailsPanel />);

    expect(screen.getByText('Event Details')).toBeInTheDocument();
    expect(screen.getByText(event.id)).toBeInTheDocument();
    expect(screen.getByText(event.type)).toBeInTheDocument();
    expect(screen.getByText(event.source)).toBeInTheDocument();
    expect(screen.getByText(event.message)).toBeInTheDocument();
  });

  it('closes when clicking the close button', async () => {
    const user = userEvent.setup();
    const event: Event = {
      id: 'event-2',
      type: 'error',
      message: 'fail',
      timestamp: 1700000000000,
      source: 'database',
    };

    act(() => {
      useEventsStore.getState().setEvents([event]);
      useEventsStore.getState().selectEvent(event.id);
    });

    render(<EventDetailsPanel />);

    await user.click(screen.getByRole('button', { name: '×' }));

    expect(useEventsStore.getState().selectedEventId).toBeNull();
  });
});
