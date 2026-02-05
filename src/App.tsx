import { mockEvents } from './data/mockEvents';
import { EventList } from './components/EventList/EventList';

export function App() {
  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ marginBottom: 16 }}>Real-Time Data Dashboard</h1>
      <EventList events={mockEvents} />
    </div>
  );
}

export default App;
