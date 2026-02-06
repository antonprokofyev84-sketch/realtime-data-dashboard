import { EventList } from './components/EventList/EventList';
import { FiltersPanel } from './components/Filters/FiltersPanel';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { EventDetailsPanel } from './components/EventDetails/EventDetailsPanel';
import { AppContainer, AppTitle } from './App.styles';
import { useEventsSource } from './hooks/useEventsSource';

export function App() {
  const {
    isConnected,
    isLocalRunning,
    connectToServer,
    disconnectFromServer,
    startLocalGenerator,
    stopLocalGenerator,
  } = useEventsSource();

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
