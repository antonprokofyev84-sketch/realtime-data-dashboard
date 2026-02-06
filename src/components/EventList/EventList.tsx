import { useDeferredValue, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useEventsStore, useFilteredEvents } from '../../store/useEventsStore';
import { EventRow } from './EventRow';
import { ListContainer, VirtualizerInner, VirtualizerItem } from './EventList.styles';

const NEW_ITEM_DURATION = 5000;

export function EventList() {
  const parentRef = useRef<HTMLDivElement | null>(null);

  const events = useFilteredEvents();
  const deferredEvents = useDeferredValue(events);

  const selectEvent = useEventsStore((state) => state.selectEvent);
  const eventsMeta = useEventsStore((state) => state.eventsMeta);

  const virtualizer = useVirtualizer({
    count: deferredEvents?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 104,
    overscan: 30,
  });

  return (
    <ListContainer ref={parentRef}>
      <VirtualizerInner style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const event = deferredEvents[virtualRow.index];
          if (!event) return null;

          const meta = eventsMeta.get(event.id);
          const isNew = meta && Date.now() - meta.addedDate < NEW_ITEM_DURATION;

          return (
            <VirtualizerItem
              key={event.id}
              ref={virtualizer.measureElement}
              data-index={virtualRow.index}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <EventRow event={event} isNew={!!isNew} onClick={() => selectEvent(event.id)} />
            </VirtualizerItem>
          );
        })}
      </VirtualizerInner>
    </ListContainer>
  );
}
