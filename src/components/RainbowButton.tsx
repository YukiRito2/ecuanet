import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const RAINBOW = 'linear-gradient(90deg, #ff4d6d, #a855f7, #3b82f6, #22d3ee, #4ade80, #facc15, #ff4d6d)';

function RainbowGlowAndBorder({ fillClassName }: { fillClassName: string }) {
  const reduceMotion = useReducedMotion();
  const animate = reduceMotion ? undefined : { backgroundPosition: ['0% 50%', '200% 50%'] };
  const transition = reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: 'linear' as const };

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-2 left-1/2 -z-10 h-1/3 w-3/5 -translate-x-1/2 rounded-full opacity-70 blur-lg [background-size:200%_100%] transition-opacity duration-300 group-hover:opacity-90"
        style={{ backgroundImage: RAINBOW }}
        animate={animate}
        transition={transition}
      />
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full p-[2px] [background-size:200%_100%]"
        style={{ backgroundImage: RAINBOW }}
        animate={animate}
        transition={transition}
      >
        <span className={`block h-full w-full rounded-full ${fillClassName}`} />
      </motion.span>
    </>
  );
}

export default function RainbowButton({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold text-slate-900 ${className}`}
    >
      <RainbowGlowAndBorder fillClassName="bg-white" />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.a>
  );
}

export function RainbowIconButton({
  onClick,
  children,
  ariaLabel,
  className = '',
}: {
  onClick: () => void;
  children: ReactNode;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative flex items-center justify-center rounded-full text-slate-900 ${className}`}
    >
      <RainbowGlowAndBorder fillClassName="bg-gradient-to-br from-[#FCD116] to-[#f5b700]" />
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </motion.button>
  );
}
