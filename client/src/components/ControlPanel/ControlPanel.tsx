import { useState } from 'react';
import type { EventGenerator } from '../../../../shared/eventGenerator.js';
import {
  ControlPanelContainer,
  ControlRow,
  ControlGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
} from './ControlPanel.styles';

type ControlPanelProps = {
  isLocalRunning: boolean;
  onStartLocal: (minDelayMs: number, maxDelayMs: number) => void;
  onStopLocal: () => void;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
};

export function ControlPanel({
  isLocalRunning,
  onStartLocal,
  onStopLocal,
  isConnected,
  onConnect,
  onDisconnect,
}: ControlPanelProps) {
  const [minDelay, setMinDelay] = useState('500');
  const [maxDelay, setMaxDelay] = useState('2000');

  const handleStart = () => {
    const min = Math.max(100, parseInt(minDelay) || 500);
    const max = Math.max(min + 100, parseInt(maxDelay) || 2000);

    setMinDelay(String(min));
    setMaxDelay(String(max));

    onStartLocal(min, max);
  };

  const handleStop = () => {
    onStopLocal();
  };

  return (
    <ControlPanelContainer>
      <ControlRow>
        <ControlGroup>
          <Label>Min Delay (ms)</Label>
          <Input
            type="number"
            min="100"
            max="5000"
            value={minDelay}
            onChange={(e) => setMinDelay(e.target.value)}
            disabled={isLocalRunning}
            placeholder="500"
          />
        </ControlGroup>

        <ControlGroup>
          <Label>Max Delay (ms)</Label>
          <Input
            type="number"
            min="100"
            max="5000"
            value={maxDelay}
            onChange={(e) => setMaxDelay(e.target.value)}
            disabled={isLocalRunning}
            placeholder="2000"
          />
        </ControlGroup>

        <ButtonGroup>
          <Button $variant="primary" onClick={handleStart} disabled={isLocalRunning || isConnected}>
            Start
          </Button>
          <Button $variant="danger" onClick={handleStop} disabled={!isLocalRunning}>
            Stop
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button $variant="primary" onClick={onConnect} disabled={isConnected || isLocalRunning}>
            Connect
          </Button>
          <Button $variant="danger" onClick={onDisconnect} disabled={!isConnected}>
            Disconnect
          </Button>
        </ButtonGroup>
      </ControlRow>
    </ControlPanelContainer>
  );
}
