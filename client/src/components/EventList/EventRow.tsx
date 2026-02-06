import { memo } from 'react';
import type { Event } from '../../types/Event';
import {
  EventRowContainer,
  Header,
  TypeBadge,
  Dot,
  Time,
  Message,
  Footer,
  Label,
  SourceValue,
} from './EventList.styles';

type EventRowProps = {
  event: Event;
  isNew: boolean;
  onClick: () => void;
};

export const EventRow = memo(function EventRow({ event, isNew, onClick }: EventRowProps) {
  return (
    <EventRowContainer $type={event.type} $isNew={isNew} onClick={onClick}>
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
    </EventRowContainer>
  );
});
