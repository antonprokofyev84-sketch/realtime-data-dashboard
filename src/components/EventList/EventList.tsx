import { useDeferredValue } from 'react';
import { useEventsStore, useFilteredEvents } from '../../store/useEventsStore';
import {
  ListContainer,
  EventRow,
  Header,
  TypeBadge,
  Dot,
  Time,
  Message,
  Footer,
  Label,
  SourceValue,
} from './EventList.styles';

export function EventList() {
  const events = useFilteredEvents();
  const deferredEvents = useDeferredValue(events);
  const selectEvent = useEventsStore((state) => state.selectEvent);

  return (
    <ListContainer>
      {deferredEvents.map((event) => (
        <EventRow key={event.id} $type={event.type} onClick={() => selectEvent(event.id)}>
          <Header>
            <TypeBadge $type={event.type}>
              <Dot $type={event.type} />
              {event.type.toUpperCase()}
            </TypeBadge>
            <Time>{new Date(event.timestamp).toLocaleTimeString()}</Time>
          </Header>

          <Message>{event.message}</Message>

          <Footer>
            <Label>Source:</Label>
            <SourceValue>{event.source}</SourceValue>
          </Footer>
        </EventRow>
      ))}
    </ListContainer>
  );
}
