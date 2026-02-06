import { useEffect, useRef, useState } from 'react';
import { EventList } from './components/EventList/EventList';
import { FiltersPanel } from './components/Filters/FiltersPanel';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { useEventsStore } from './store/useEventsStore';
import { mockEvents } from '../../shared/events.js';
import { EventDetailsPanel } from './components/EventDetails/EventDetailsPanel';
import { EventGenerator } from '../../shared/eventGenerator.js';
import { AppContainer, AppTitle } from './App.styles';
import type { Event } from './types/Event';

const SERVER_HTTP_URL = 'http://localhost:4000/events';
const SERVER_WS_URL = 'ws://localhost:4000/ws';

export function App() {
  const setEvents = useEventsStore((state) => state.setEvents);
  const addEvent = useEventsStore((s) => s.addEvent);
  const generatorRef = useRef(new EventGenerator(addEvent));
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLocalRunning, setIsLocalRunning] = useState(false);

  useEffect(() => {
    const loadInitialEvents = async () => {
      try {
        const response = await fetch(SERVER_HTTP_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }
        const data = (await response.json()) as Event[];
        setEvents(data);
      } catch {
        setEvents(mockEvents);
      }
    };

    loadInitialEvents();
  }, [setEvents]);

  useEffect(() => {
    return () => {
      generatorRef.current.stop();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  const connectToServer = () => {
    if (wsRef.current) return;

    if (isLocalRunning) {
      generatorRef.current.stop();
      setIsLocalRunning(false);
    }

    const socket = new WebSocket(SERVER_WS_URL);
    wsRef.current = socket;

    socket.addEventListener('open', () => {
      setIsConnected(true);
    });

    socket.addEventListener('message', (event) => {
      try {
        const parsed = JSON.parse(event.data as string) as Event;
        addEvent(parsed);
      } catch {
        // Ignore invalid payloads.
      }
    });

    const handleDisconnect = () => {
      setIsConnected(false);
      if (wsRef.current === socket) {
        wsRef.current = null;
      }
    };

    socket.addEventListener('close', handleDisconnect);
    socket.addEventListener('error', handleDisconnect);
  };

  const disconnectFromServer = () => {
    if (!wsRef.current) return;
    wsRef.current.close();
  };

  const startLocalGenerator = (minDelayMs: number, maxDelayMs: number) => {
    if (isConnected) {
      disconnectFromServer();
    }

    generatorRef.current.start({ minDelayMs, maxDelayMs });
    setIsLocalRunning(true);
  };

  const stopLocalGenerator = () => {
    generatorRef.current.stop();
    setIsLocalRunning(false);
  };

  return (
    <AppContainer>
      <AppTitle>Real-Time Data Dashboard</AppTitle>
      <ControlPanel
        isLocalRunning={isLocalRunning}
        onStartLocal={startLocalGenerator}
        onStopLocal={stopLocalGenerator}
        isConnected={isConnected}
        onConnect={connectToServer}
        onDisconnect={disconnectFromServer}
      />
      <FiltersPanel />
      <EventList />
      <EventDetailsPanel />
    </AppContainer>
  );
}

export default App;
