import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setVolume } from 'src/services/sound';
import { STORAGE_KEY } from 'src/utils/storage';

import { Menu } from './Menu';

vi.mock('src/services/sound');

function seedSettings(best: { classic: number; timed: number }, volume = 0.5) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ best, volume }));
}

describe('Menu', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders the title and instructions', () => {
    render(<Menu onStart={vi.fn()} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Memory Matrix' }),
    ).toBeInTheDocument();
    expect(screen.getByText('How to play')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('shows the best score for each mode', () => {
    seedSettings({ classic: 12, timed: 9 });

    render(<Menu onStart={vi.fn()} />);

    expect(screen.getByText('Best: 12')).toBeInTheDocument();
    expect(screen.getByText('Best: 9')).toBeInTheDocument();
  });

  it('starts classic mode', async () => {
    const user = userEvent.setup();
    const onStart = vi.fn();

    render(<Menu onStart={onStart} />);
    await user.click(screen.getByRole('button', { name: /classic/i }));

    expect(onStart).toHaveBeenCalledWith('classic');
  });

  it('starts timed mode', async () => {
    const user = userEvent.setup();
    const onStart = vi.fn();

    render(<Menu onStart={onStart} />);
    await user.click(screen.getByRole('button', { name: /timed/i }));

    expect(onStart).toHaveBeenCalledWith('timed');
  });

  it('shows the sound switch as on by default', () => {
    render(<Menu onStart={vi.fn()} />);

    expect(screen.getByRole('switch', { name: 'Sound' })).toBeChecked();
  });

  it('reflects a muted preference', () => {
    seedSettings({ classic: 0, timed: 0 }, 0);

    render(<Menu onStart={vi.fn()} />);

    expect(screen.getByRole('switch', { name: 'Sound' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('mutes and restores sound from the switch', async () => {
    const user = userEvent.setup();
    render(<Menu onStart={vi.fn()} />);

    const toggle = screen.getByRole('switch', { name: 'Sound' });

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(setVolume).toHaveBeenLastCalledWith(0);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')).toMatchObject(
      { volume: 0 },
    );

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(setVolume).toHaveBeenLastCalledWith(1);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')).toMatchObject(
      { volume: 1 },
    );
  });

  it('keeps best scores when toggling sound', async () => {
    const user = userEvent.setup();
    seedSettings({ classic: 7, timed: 2 });

    render(<Menu onStart={vi.fn()} />);
    await user.click(screen.getByRole('switch', { name: 'Sound' }));

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')).toMatchObject(
      { best: { classic: 7, timed: 2 }, volume: 0 },
    );
  });
});
