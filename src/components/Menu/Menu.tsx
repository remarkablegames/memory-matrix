import { useState } from 'react';
import type { Mode } from 'src/types/game';
import { loadSettings, saveSettings } from 'src/utils/storage';
import { configure } from 'websfx';

export interface MenuProps {
  onStart: (mode: Mode) => void;
}

const STEPS = [
  'Watch the tiles light up.',
  'Recreate the pattern from memory.',
  'Clear each round to climb higher.',
];

const MODES: { mode: Mode; title: string; blurb: string }[] = [
  { mode: 'classic', title: 'Classic', blurb: 'One mistake ends the run.' },
  { mode: 'timed', title: 'Timed', blurb: 'Beat the clock.' },
];

const MODE_CLASSES =
  'w-full cursor-pointer rounded-xl border-2 border-slate-300 bg-slate-50 p-4 text-center transition hover:border-sky-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 active:translate-y-px dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-400';

const SWITCH_TRACK =
  'relative h-6 w-11 shrink-0 rounded-full transition-colors';
const SWITCH_KNOB =
  'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform';

/**
 * Title screen: how to play, mode select with best scores, and the
 * sound switch.
 *
 * @param props - `onStart` receives the chosen mode.
 * @returns The rendered menu.
 */
export function Menu({ onStart }: MenuProps) {
  const [settings, setSettings] = useState(loadSettings);
  const soundOn = settings.volume > 0;

  function toggleSound(): void {
    const volume = soundOn ? 0 : 1;
    saveSettings({ volume });
    configure({ volume });
    setSettings((previous) => ({ ...previous, volume }));
  }

  return (
    <section className="flex w-full max-w-xl flex-col gap-8 px-6 text-center">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl dark:text-slate-100">
          Memory Matrix
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Study the pattern. Then recreate it.
        </p>
      </div>

      <div className="rounded-xl bg-slate-100 p-4 text-left dark:bg-slate-800/60">
        <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
          How to play
        </h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {MODES.map(({ mode, title, blurb }) => (
          <button
            key={mode}
            type="button"
            className={MODE_CLASSES}
            onClick={() => {
              onStart(mode);
            }}
          >
            <span className="block text-lg font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </span>
            <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
              {blurb}
            </span>
            <span className="mt-2 block text-sm font-medium text-sky-600 dark:text-sky-400">
              Best: {settings.best[mode]}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={soundOn}
        className="mx-auto flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:text-slate-300"
        onClick={toggleSound}
      >
        <span>Sound</span>
        <span
          aria-hidden="true"
          className={`${SWITCH_TRACK} ${soundOn ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-600'}`}
        >
          <span
            className={`${SWITCH_KNOB} ${soundOn ? 'translate-x-5' : ''}`}
          />
        </span>
      </button>
    </section>
  );
}
