import { useState } from 'react';
import type { EventGenerator } from '../../data/eventGenerator';
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
  generator: EventGenerator | null;
};

export function ControlPanel({ generator }: ControlPanelProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [minDelay, setMinDelay] = useState('500');
  const [maxDelay, setMaxDelay] = useState('2000');

  const handleStart = () => {
    console.log(generator);
    if (!generator) return;

    const min = Math.max(100, parseInt(minDelay) || 500);
    const max = Math.max(min + 100, parseInt(maxDelay) || 2000);

    setMinDelay(String(min));
    setMaxDelay(String(max));

    generator.start({ minDelayMs: min, maxDelayMs: max });
    setIsRunning(true);
  };

  const handleStop = () => {
    if (!generator) return;
    generator.stop();
    setIsRunning(false);
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
            disabled={isRunning}
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
            disabled={isRunning}
            placeholder="2000"
          />
        </ControlGroup>

        <ButtonGroup>
          <Button $variant="primary" onClick={handleStart} disabled={isRunning}>
            Start
          </Button>
          <Button $variant="danger" onClick={handleStop} disabled={!isRunning}>
            Stop
          </Button>
        </ButtonGroup>
      </ControlRow>
    </ControlPanelContainer>
  );
}
