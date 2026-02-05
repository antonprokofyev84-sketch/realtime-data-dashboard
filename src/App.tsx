import { mockEvents } from './data/mockEvents';
import { EventList } from './components/EventList/EventList';
import { FiltersPanel } from './components/Filters/FiltersPanel';

export function App() {
  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ marginBottom: 16 }}>Real-Time Data Dashboard</h1>
      <FiltersPanel sources={Array.from(new Set(mockEvents.map((event) => event.source)))} />
      <EventList events={mockEvents} />
    </div>
  );
}

export default App;
