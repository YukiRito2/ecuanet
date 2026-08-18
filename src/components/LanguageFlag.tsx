import type { Lang } from '../translations';

function FlagES({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <rect width="20" height="14" fill="#AA151B" />
      <rect y="3.5" width="20" height="7" fill="#F1BF00" />
    </svg>
  );
}

function FlagCAT({ className }: { className?: string }) {
  const stripeHeight = 14 / 9;
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <rect width="20" height="14" fill="#FCDD09" />
      {[1, 3, 5, 7].map((stripe) => (
        <rect key={stripe} y={stripe * stripeHeight} width="20" height={stripeHeight} fill="#DA121A" />
      ))}
    </svg>
  );
}

function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <rect width="20" height="14" fill="#fff" />
      <rect width="6.67" height="14" fill="#0055A4" />
      <rect x="13.33" width="6.67" height="14" fill="#EF4135" />
    </svg>
  );
}

const FLAGS: Record<Lang, typeof FlagES> = { es: FlagES, ca: FlagCAT, fr: FlagFR };

export default function LanguageFlag({ lang, className }: { lang: Lang; className?: string }) {
  const Flag = FLAGS[lang];
  return (
    <span className={`inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] border border-slate-200 ${className ?? ''}`}>
      <Flag className="h-full w-full" />
    </span>
  );
}
