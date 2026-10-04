import {
  configure,
  deselect,
  error,
  notification,
  select,
  success,
  warning,
} from 'websfx';

/**
 * Sets the master volume for all game sounds.
 *
 * @param volume - Volume between 0 and 1; 0 mutes.
 */
export function setVolume(volume: number): void {
  configure({ volume });
}

/** Plays the cue that tells the player to memorize the pattern. */
export function playReveal(): void {
  notification();
}

/** Plays the cue for picking a cell. */
export function playSelect(): void {
  select();
}

/** Plays the cue for unpicking a cell. */
export function playDeselect(): void {
  deselect();
}

/** Plays the success cue for a cleared round. */
export function playSuccess(): void {
  success();
}

/** Plays the failure cue for a wrong pattern. */
export function playError(): void {
  error();
}

/** Plays the low-time warning cue. */
export function playWarning(): void {
  warning();
}
