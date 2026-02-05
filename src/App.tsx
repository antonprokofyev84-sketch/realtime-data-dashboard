import { useEffect } from 'react';
import { EventList } from './components/EventList/EventList';
import { FiltersPanel } from './components/Filters/FiltersPanel';
import { useEventsStore } from './store/useEventsStore';
import { mockEvents } from './data/mockEvents';
import { EventDetailsPanel } from './components/EventDetails/EventDetailsPanel';
import { EventGenerator } from './data/eventGenerator';

export function App() {
  const setEvents = useEventsStore((state) => state.setEvents);
  const addEvent = useEventsStore((s) => s.addEvent);

  useEffect(() => {
    // Simulate fetching initial data from server
    setEvents(mockEvents);
  }, [setEvents]);

  useEffect(() => {
    const generator = new EventGenerator(addEvent);
    generator.start();
    return () => generator.stop();
  }, [addEvent]);

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ marginBottom: 16 }}>Real-Time Data Dashboard</h1>
      <FiltersPanel />
      <EventList />
      <EventDetailsPanel />
    </div>
  );
}

export default App;
