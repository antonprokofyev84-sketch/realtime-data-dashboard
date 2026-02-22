import { EventList } from './components/EventList/EventList';
import { FiltersPanel } from './components/Filters/FiltersPanel';
import { ControlPanel } from './components/ControlPanel/ControlPanel';
import { EventDetailsPanel } from './components/EventDetails/EventDetailsPanel';
import { AppContainer, AppTitle } from './App.styles';
import { useEventsSource } from './hooks/useEventsSource';
import { TestFormComponent } from './components/TestFormComponent/TestFormComponent';

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
      {/* <Parent>
        <MemoChild someFunc={() => console.log('Hello from someFunc')} setSecondCount={() => {}} />
      </Parent> */}
      <TestFormComponent />
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

import { useState, useCallback, memo } from 'react';

interface MemoChildProps {
  someFunc: () => void;
  setSecondCount: React.Dispatch<React.SetStateAction<number>>;
}

// Дочерний компонент с React.memo
const MemoChild = function Child({ someFunc, setSecondCount }: MemoChildProps) {
  console.log('👉 [RENDER] MemoChild');

  const clickHandler = () => {
    someFunc();
    setSecondCount((prev) => prev + 1);
  };

  return (
    <div style={{ border: '1px solid red', padding: '10px', marginTop: '10px' }}>
      <p>MemoChild (Rendered only if props change)</p>
      <button onClick={clickHandler}>
        Clicking me updates Parent's state, but my props are stable
      </button>
    </div>
  );
};

export function Parent({ children }: { children?: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [secondCount, setSecondCount] = useState(0);

  console.log('🏠 [RENDER] Parent');

  const clickHandler = () => setCount((prev) => prev + 1);

  // Стабильная ссылка благодаря useCallback
  const someFunc = useCallback(() => {
    console.log('Hello from someFunc');
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Parent Component</h1>
      <p>Count (local): {count}</p>
      <p>Second Count (stored in Parent): {secondCount}</p>

      <button onClick={clickHandler}>Update Parent Count (Trigger Parent Render)</button>

      {children}
    </div>
  );
}
