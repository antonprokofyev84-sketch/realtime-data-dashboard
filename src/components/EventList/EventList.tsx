import type { Event } from '../../types/Event';
import {
  ListContainer,
  EventRow,
  Header,
  TypeBadge,
  Dot,
  Time,
  Message,
  Footer,
  SourceWrapper,
  Label,
  SourceValue,
} from './EventList.styles';

type EventListProps = {
  events: Event[];
};

export function EventList({ events }: EventListProps) {
  return (
    <ListContainer>
      {events.map((event) => (
        <EventRow key={event.id} $type={event.type}>
          <Header>
            <TypeBadge $type={event.type}>
              <Dot $type={event.type} />
              {event.type.toUpperCase()}
            </TypeBadge>
            <Time>{new Date(event.timestamp).toLocaleTimeString()}</Time>
          </Header>

          <Message>{event.message}</Message>

          <Footer>
            <SourceWrapper>
              <Label>Source:</Label>
              <SourceValue>{event.source}</SourceValue>
            </SourceWrapper>
          </Footer>
        </EventRow>
      ))}
    </ListContainer>
  );
}
