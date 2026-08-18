import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

interface CompareSliderProps {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

export default function CompareSlider({ before, after, beforeLabel, afterLabel, beforeAlt, afterAlt, className }: CompareSliderProps) {
  const [position, setPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // A brief auto-nudge on mount hints that the divider is draggable.
  useEffect(() => {
    if (reduceMotion) return;
    const steps = [65, 35, 50];
    const timers = steps.map((value, i) => setTimeout(() => setPosition(value), 500 + i * 350));
    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setHasInteracted(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.buttons !== 1) return;
    updateFromClientX(event.clientX);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5));
    if (event.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={`group relative w-full touch-none select-none overflow-hidden rounded-2xl bg-slate-100 ${className ?? 'h-64'}`}
    >
      <img src={after} alt={afterAlt} draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${hasInteracted ? '' : 'transition-[clip-path] duration-300 ease-out'}`}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={before} alt={beforeAlt} draggable={false} className="h-full w-full object-cover" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-emerald-600/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
        {afterLabel}
      </span>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Comparar antes y después"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        className={`absolute inset-y-0 flex w-8 -translate-x-1/2 cursor-ew-resize items-center justify-center outline-none ${hasInteracted ? '' : 'transition-[left] duration-300 ease-out'}`}
        style={{ left: `${position}%` }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg ring-2 ring-white/50 transition-transform group-hover:scale-110">
          <MoveHorizontal size={18} />
        </div>
      </div>
    </div>
  );
}
