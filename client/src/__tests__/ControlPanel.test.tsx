import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { ControlPanel } from '../components/ControlPanel/ControlPanel';

describe('ControlPanel', () => {
  it('disables local and server actions based on state', () => {
    const onStartLocal = vi.fn();
    const onStopLocal = vi.fn();
    const onConnect = vi.fn();
    const onDisconnect = vi.fn();

    const { rerender } = render(
      <ControlPanel
        isLocalRunning={false}
        onStartLocal={onStartLocal}
        onStopLocal={onStopLocal}
        isConnected={false}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />,
    );

    expect(screen.getByRole('button', { name: 'Start' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Stop' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Connect' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Disconnect' })).toBeDisabled();

    rerender(
      <ControlPanel
        isLocalRunning={true}
        onStartLocal={onStartLocal}
        onStopLocal={onStopLocal}
        isConnected={false}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />,
    );

    expect(screen.getByRole('button', { name: 'Start' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Stop' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Connect' })).toBeDisabled();

    rerender(
      <ControlPanel
        isLocalRunning={false}
        onStartLocal={onStartLocal}
        onStopLocal={onStopLocal}
        isConnected={true}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />,
    );

    expect(screen.getByRole('button', { name: 'Start' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Connect' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Disconnect' })).toBeEnabled();
  });

  it('clamps min/max delay before starting', async () => {
    const user = userEvent.setup();
    const onStartLocal = vi.fn();

    render(
      <ControlPanel
        isLocalRunning={false}
        onStartLocal={onStartLocal}
        onStopLocal={vi.fn()}
        isConnected={false}
        onConnect={vi.fn()}
        onDisconnect={vi.fn()}
      />,
    );

    const [minInput, maxInput] = screen.getAllByRole('spinbutton');

    await user.clear(minInput);
    await user.type(minInput, '50');
    await user.clear(maxInput);
    await user.type(maxInput, '80');

    await user.click(screen.getByRole('button', { name: 'Start' }));

    expect(onStartLocal).toHaveBeenCalledWith(100, 200);
  });
});
