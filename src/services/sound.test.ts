import {
  configure,
  deselect,
  error,
  notification,
  select,
  success,
  warning,
} from 'websfx';

import {
  playDeselect,
  playError,
  playReveal,
  playSelect,
  playSuccess,
  playWarning,
  setVolume,
} from './sound';

vi.mock('websfx', () => ({
  configure: vi.fn(),
  deselect: vi.fn(),
  error: vi.fn(),
  notification: vi.fn(),
  select: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
}));

describe('sound service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('configures websfx volume', () => {
    setVolume(1);

    expect(configure).toHaveBeenCalledWith({ volume: 1 });
  });

  it('maps game events to websfx sounds', () => {
    playReveal();
    expect(notification).toHaveBeenCalledOnce();

    playSelect();
    expect(select).toHaveBeenCalledOnce();

    playDeselect();
    expect(deselect).toHaveBeenCalledOnce();

    playSuccess();
    expect(success).toHaveBeenCalledOnce();

    playError();
    expect(error).toHaveBeenCalledOnce();

    playWarning();
    expect(warning).toHaveBeenCalledOnce();
  });
});
