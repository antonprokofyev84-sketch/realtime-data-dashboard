import { useEffect, useRef, useState } from 'react';
import { useEventsStore } from '../../store/useEventsStore';
import { selectEventById } from '../../store/useEventsStore';

import {
  Backdrop,
  DetailsOverlay,
  DetailsHeader,
  Title,
  CloseButton,
  DetailsContent,
  Section,
  SectionLabel,
  JsonContainer,
  JsonPre,
  CopyButton,
  DataGrid,
  DataKey,
  DataValue,
  Message,
} from './EventDetailsPanel.styles';

export function EventDetailsPanel() {
  const selectedEventId = useEventsStore((state) => state.selectedEventId);
  const selectEvent = useEventsStore((state) => state.selectEvent);

  const [localEventId, setLocalEventId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copiedResetTimeoutIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (selectedEventId) {
      setLocalEventId(selectedEventId);
      return;
    }

    if (!selectedEventId && localEventId) {
      const timer = window.setTimeout(() => {
        setLocalEventId(null);
      }, 250);

      return () => window.clearTimeout(timer);
    }
  }, [selectedEventId, localEventId]);

  const isClosing = !selectedEventId && !!localEventId;

  const event = useEventsStore(selectEventById(selectedEventId || localEventId));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(event, null, 2));

      setCopied(true);

      if (copiedResetTimeoutIdRef.current !== null) {
        window.clearTimeout(copiedResetTimeoutIdRef.current);
      }

      copiedResetTimeoutIdRef.current = window.setTimeout(() => {
        setCopied(false);
        copiedResetTimeoutIdRef.current = null;
      }, 2000);
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  useEffect(() => {
    return () => {
      if (copiedResetTimeoutIdRef.current !== null) {
        window.clearTimeout(copiedResetTimeoutIdRef.current);
      }
    };
  }, []);

  if (!localEventId || !event) return null;

  return (
    <>
      <Backdrop onClick={() => selectEvent(null)} data-state={isClosing ? 'closing' : 'open'} />

      <DetailsOverlay data-state={isClosing ? 'closing' : 'open'}>
        <DetailsHeader>
          <Title>Event Details</Title>

          <CloseButton onClick={() => selectEvent(null)}>&times;</CloseButton>
        </DetailsHeader>

        <DetailsContent>
          <Section>
            <SectionLabel>Summary</SectionLabel>

            <DataGrid>
              <DataKey>ID</DataKey>
              <DataValue>{event.id}</DataValue>

              <DataKey>Type</DataKey>
              <DataValue>{event.type}</DataValue>

              <DataKey>Source</DataKey>
              <DataValue>{event.source}</DataValue>

              <DataKey>Time</DataKey>
              <DataValue>{new Date(event.timestamp).toLocaleString()}</DataValue>
            </DataGrid>
          </Section>

          <Section>
            <SectionLabel>Message</SectionLabel>
            <Message>{event.message}</Message>
          </Section>

          <Section>
            <SectionLabel>Raw JSON</SectionLabel>

            <JsonContainer>
              <CopyButton onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</CopyButton>

              <JsonPre>{JSON.stringify(event, null, 2)}</JsonPre>
            </JsonContainer>
          </Section>
        </DetailsContent>
      </DetailsOverlay>
    </>
  );
}
