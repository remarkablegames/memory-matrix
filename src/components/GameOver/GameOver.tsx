import { useEffect } from 'react';
import { useBestScore } from 'src/hooks/useBestScore';
import { playSuccess } from 'src/services/sound';
import type { GameOverReason, Mode } from 'src/types/game';

import { Confetti } from '../Confetti';

export interface GameOverProps {
  mode: Mode;
  score: number;
  reason: GameOverReason | null;
  onAgain: () => void;
  onMenu: () => void;
}

const SECONDARY_BUTTON =
  'cursor-pointer rounded-xl border-2 border-slate-300 bg-slate-50 px-6 py-3 font-semibold text-slate-700 transition hover:border-sky-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 active:translate-y-px dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-sky-400';

const PRIMARY_BUTTON = `${SECONDARY_BUTTON} border-sky-600 bg-sky-600 text-white hover:border-sky-500 hover:bg-sky-500 dark:border-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400`;

/**
 * End-of-run screen: final score, best score, record celebration, and
 * actions to replay or return to the menu.
 *
 * @param props - Finished run details and navigation callbacks.
 * @returns The rendered game-over screen.
 */
export function GameOver({
  mode,
  score,
  reason,
  onAgain,
  onMenu,
}: GameOverProps) {
  const { best, record } = useBestScore(mode, score);

  useEffect(() => {
    if (record) {
      playSuccess();
    }
  }, [record]);

  return (
    <section className="flex w-full max-w-xl flex-col items-center gap-6 px-6 text-center">
      {record && <Confetti />}

      <div>
        <p className="text-sm font-medium tracking-widest text-slate-500 uppercase dark:text-slate-400">
          {mode === 'timed' ? 'Timed run' : 'Classic run'}
        </p>
        <h1 className="mt-1 text-4xl font-bold text-slate-900 dark:text-slate-100">
          {reason === 'timeout' ? "Time's up!" : 'Game Over'}
        </h1>
      </div>

      <div>
        <p className="text-6xl font-bold text-sky-600 dark:text-sky-400">
          {score}
        </p>
        <p className="mt-1 text-sm tracking-wider text-slate-500 uppercase dark:text-slate-400">
          Rounds cleared
        </p>
      </div>

      {record && (
        <p
          role="status"
          className="text-lg font-semibold text-amber-500 dark:text-amber-400"
        >
          New record!
        </p>
      )}

      <p className="text-sm text-slate-600 dark:text-slate-400">Best: {best}</p>

      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" className={PRIMARY_BUTTON} onClick={onAgain}>
          Play again
        </button>
        <button type="button" className={SECONDARY_BUTTON} onClick={onMenu}>
          Menu
        </button>
      </div>
    </section>
  );
}
