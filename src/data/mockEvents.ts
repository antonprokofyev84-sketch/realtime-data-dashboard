import type { Event } from '../types/Event';

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    type: 'info',
    message: 'info message example',
    timestamp: Date.now() - 30000,
    source: 'test-source-0',
  },
  {
    id: 'event-2',
    type: 'warning',
    message: 'warning message example',
    timestamp: Date.now() - 25000,
    source: 'test-source-1',
  },
  {
    id: 'event-3',
    type: 'error',
    message: 'error message example',
    timestamp: Date.now() - 20000,
    source: 'test-source-2',
  },
  {
    id: 'event-4',
    type: 'info',
    message: 'info message example',
    timestamp: Date.now() - 15000,
    source: 'test-source-0',
  },
  {
    id: 'event-5',
    type: 'warning',
    message: 'warning message example',
    timestamp: Date.now() - 10000,
    source: 'test-source-3',
  },
  {
    id: 'event-6',
    type: 'error',
    message: 'error message example',
    timestamp: Date.now() - 5000,
    source: 'test-source-1',
  },
];
