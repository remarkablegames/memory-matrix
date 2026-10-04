import type { KeyboardEvent } from 'react';
import { useRef } from 'react';
import type { Phase, Result } from 'src/types/game';

export interface GridProps {
  gridSize: number;
  pattern: number[];
  selection: number[];
  phase: Phase;
  result: Result | null;
  onToggle: (index: number) => void;
}

type CellState =
  'neutral' | 'lit' | 'selected' | 'correct' | 'missed' | 'wrong';

const BASE_CELL =
  'flex select-none items-center justify-center rounded-lg border-2 text-lg font-bold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-default';

const INPUT_HOVER =
  'hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md dark:hover:border-sky-500';

const CELL_CLASSES: Record<CellState, string> = {
  neutral:
    'border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800',
  lit: 'border-sky-400 bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.7)] motion-safe:animate-pop dark:border-sky-300 dark:bg-sky-300',
  selected: 'border-sky-600 bg-sky-500 dark:border-sky-400 dark:bg-sky-600',
  correct:
    'border-green-500 bg-green-500 dark:border-green-400 dark:bg-green-500',
  missed:
    'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/40',
  wrong: 'border-red-500 bg-red-500 dark:border-red-400 dark:bg-red-600',
};

/**
 * Derives how a cell should render for the current phase.
 *
 * @param index - Cell index in row-major order.
 * @param phase - Current game phase.
 * @param pattern - Lit cell indices from the reveal.
 * @param selection - Indices the player has picked.
 * @returns The visual state for the cell.
 */
function getCellState(
  index: number,
  phase: Phase,
  pattern: number[],
  selection: number[],
): CellState {
  const inPattern = pattern.includes(index);
  const inSelection = selection.includes(index);

  switch (phase) {
    case 'showing':
      return inPattern ? 'lit' : 'neutral';
    case 'input':
      return inSelection ? 'selected' : 'neutral';
    case 'feedback':
      if (inPattern && inSelection) {
        return 'correct';
      }
      if (inPattern) {
        return 'missed';
      }
      return inSelection ? 'wrong' : 'neutral';
    default:
      return 'neutral';
  }
}

/**
 * The playfield: a responsive grid of toggleable memory cells with
 * reveal, feedback, and keyboard navigation support.
 *
 * @param props - Grid configuration and interaction callbacks.
 * @returns The rendered grid.
 */
export function Grid({
  gridSize,
  pattern,
  selection,
  phase,
  result,
  onToggle,
}: GridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cells = Array.from({ length: gridSize ** 2 }, (_, index) => index);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    const deltas: Record<string, number | undefined> = {
      ArrowUp: -gridSize,
      ArrowDown: gridSize,
      ArrowLeft: -1,
      ArrowRight: 1,
    };
    const delta = deltas[event.key];
    if (delta === undefined) {
      return;
    }

    const target = event.target as HTMLElement;
    const raw = target.dataset.index;
    if (raw === undefined) {
      return;
    }

    event.preventDefault();
    const index = Number(raw);
    const next = index + delta;
    const crossedRow =
      (delta === 1 || delta === -1) &&
      Math.floor(next / gridSize) !== Math.floor(index / gridSize);

    if (next < 0 || next >= cells.length || crossedRow) {
      return;
    }

    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-index="${String(next)}"]`)
      ?.focus();
  }

  const shakeClass = result === 'wrong' ? ' motion-safe:animate-shake' : '';
  const inputClass = phase === 'input' ? ` ${INPUT_HOVER}` : '';
  const track = `repeat(${String(gridSize)}, minmax(0, 1fr))`;

  return (
    <div
      ref={gridRef}
      role="group"
      aria-label="Memory matrix"
      onKeyDown={handleKeyDown}
      className={`mx-auto grid aspect-[4/5] w-[min(100%,56vh)] gap-1.5 rounded-xl bg-slate-200/60 p-2 select-none sm:gap-2 md:aspect-square dark:bg-slate-800/60 md:w-[min(100%,560px,70vh)]${shakeClass}`}
      style={{
        gridTemplateColumns: track,
        gridTemplateRows: track,
      }}
    >
      {cells.map((index) => {
        const state = getCellState(index, phase, pattern, selection);
        const row = Math.floor(index / gridSize) + 1;
        const column = (index % gridSize) + 1;
        const order = Math.min(pattern.indexOf(index), 7);

        return (
          <button
            key={index}
            type="button"
            data-index={index}
            data-state={state}
            aria-label={`Row ${String(row)}, column ${String(column)}`}
            aria-pressed={selection.includes(index)}
            disabled={phase !== 'input'}
            className={`${BASE_CELL} ${CELL_CLASSES[state]}${inputClass}`}
            style={
              state === 'lit'
                ? { animationDelay: `${String(order * 40)}ms` }
                : undefined
            }
            onClick={() => {
              onToggle(index);
            }}
          >
            {state === 'wrong' ? '✗' : null}
          </button>
        );
      })}
    </div>
  );
}
