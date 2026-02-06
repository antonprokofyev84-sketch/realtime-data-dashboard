import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EventRow } from '../components/EventList/EventRow';
import type { Event } from '../types/Event';

describe('EventRow', () => {
  it('renders event content', () => {
    const event: Event = {
      id: 'event-1',
      type: 'warning',
      message: 'Something happened',
      timestamp: 1700000000000,
      source: 'api-gateway',
    };

    render(<EventRow event={event} isNew={false} onClick={() => undefined} />);

    expect(screen.getByText('WARNING')).toBeInTheDocument();
    expect(screen.getByText('Something happened')).toBeInTheDocument();
    expect(screen.getByText('api-gateway')).toBeInTheDocument();
  });
});
