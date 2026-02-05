import { useDeferredValue } from 'react';
import { useEventsStore, useFilteredEvents } from '../../store/useEventsStore';
import { EventRow } from './EventRow';
import { ListContainer } from './EventList.styles';

const NEW_ITEM_DURATION = 5000;

export function EventList() {
  const events = useFilteredEvents();
  const deferredEvents = useDeferredValue(events);
  const selectEvent = useEventsStore((state) => state.selectEvent);
  const eventsMeta = useEventsStore((state) => state.eventsMeta);

  return (
    <ListContainer>
      {deferredEvents.map((event) => {
        const meta = eventsMeta.get(event.id);
        const isNew = meta ? Date.now() - meta.addedDate < NEW_ITEM_DURATION : false;

        return (
          <EventRow
            key={event.id}
            event={event}
            isNew={isNew}
            onClick={() => selectEvent(event.id)}
          />
        );
      })}
    </ListContainer>
  );
}
