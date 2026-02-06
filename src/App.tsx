import { useEffect, useRef } from 'react';
import { EventList } from './components/EventList/EventList';
import { FiltersPanel } from './components/Filters/FiltersPanel';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { useEventsStore } from './store/useEventsStore';
import { mockEvents } from './data/mockEvents';
import { EventDetailsPanel } from './components/EventDetails/EventDetailsPanel';
import { EventGenerator } from './data/eventGenerator';
import { AppContainer, AppTitle } from './App.styles';

export function App() {
  const setEvents = useEventsStore((state) => state.setEvents);
  const addEvent = useEventsStore((s) => s.addEvent);
  const generatorRef = useRef(new EventGenerator(addEvent));

  useEffect(() => {
    // Simulate fetching initial data from server
    setEvents(mockEvents);
  }, [setEvents]);

  useEffect(() => {
    return () => {
      generatorRef.current.stop();
    };
  }, []);

  return (
    <AppContainer>
      <AppTitle>Real-Time Data Dashboard</AppTitle>
      <ControlPanel generator={generatorRef.current} />
      <FiltersPanel />
      <EventList />
      <EventDetailsPanel />
    </AppContainer>
  );
}

export default App;
