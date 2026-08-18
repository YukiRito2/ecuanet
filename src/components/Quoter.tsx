import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  X,
  Phone,
  Calculator,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Home,
  Building2,
  Repeat,
  CalendarClock,
  SprayCan,
  Ban,
  MapPin,
  Sparkles,
  Check,
} from 'lucide-react';

type PropertyType = 'vivienda' | 'empresa';
type Frequency = 'recurrente' | 'unica';
type ExtraKey = 'vaporeta' | 'aspirador' | 'planxa' | 'express';
type StepId = 'property' | 'frequency' | 'hours' | 'products' | 'location' | 'extras' | 'summary';

interface Answers {
  name: string;
  property: PropertyType | null;
  frequency: Frequency | null;
  hours: number | null;
  products: boolean | null;
  location: string | null;
  extras: ExtraKey[];
}

interface QuoterProps {
  lang: 'es' | 'ca' | 'fr';
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  t: {
    launcherLabel: string;
    launcherAria: string;
    panelTitle: string;
    panelSubtitle: string;
    closeAria: string;
    perVisit: string;
    configureHint: string;
    back: string;
    steps: Record<StepId, string>;
    property: { home: string; business: string };
    frequency: { recurring: string; recurringSub: string; once: string };
    hours: { customButton: string; customPlaceholder: string; continueAria: string };
    products: { yes: string; no: string; noSub: string };
    extras: Record<ExtraKey, string> & { continueBtn: string; skipBtn: string };
    summary: {
      totalWithIgi: string;
      perVisitUnit: string;
      approxPrice: string;
      viewBreakdown: string;
      productsLine: string;
      travelLine: string;
      extrasLine: string;
      subtotal: string;
      recurringDiscount: string;
      igi: string;
      total: string;
      nameLabel: string;
      namePlaceholder: string;
      sendWhatsapp: string;
      restart: string;
    };
    whatsappMessage: {
      greeting: string;
      greetingWithName: string;
      intro: string;
      type: string;
      frequency: string;
      hours: string;
      products: string;
      location: string;
      extras: string;
      noExtras: string;
      estimate: string;
      perVisit: string;
    };
  };
}

const EMPTY_ANSWERS: Answers = {
  name: '',
  property: null,
  frequency: null,
  hours: null,
  products: null,
  location: null,
  extras: [],
};

const STEPS: StepId[] = ['property', 'frequency', 'hours', 'products', 'location', 'extras', 'summary'];
const EASE = [0.23, 1, 0.32, 1] as const;
const SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const;
const SPRING_POP = { type: 'spring', stiffness: 380, damping: 22 } as const;
const TAP = { duration: 0.16, ease: EASE };

// Precios orientativos de ejemplo: ajústalos a las tarifas reales del negocio.
const HOURLY_RATE: Record<PropertyType, number> = { vivienda: 20, empresa: 25 };
const PRODUCTS_FEE = 5;
const TRAVEL_FEE: Record<string, number> = {
  'Andorra la Vella': 5,
  'Escaldes-Engordany': 5,
  Encamp: 8,
  'La Massana': 10,
  Ordino: 10,
  'Sant Julià de Lòria': 10,
  Canillo: 12,
  'El Pas de la Casa': 15,
};
const LOCATIONS = Object.keys(TRAVEL_FEE);
const EXTRA_PRICES: Record<ExtraKey, number> = { vaporeta: 25, aspirador: 15, planxa: 18, express: 40 };
const EXTRA_KEYS: ExtraKey[] = ['vaporeta', 'aspirador', 'planxa', 'express'];
const RECURRING_DISCOUNT = 0.1;
const IGI_RATE = 0.045;
const HOUR_OPTIONS = [2, 3, 4, 5];

function formatEUR(value: number) {
  return value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function computeQuote(answers: Answers) {
  const ready = answers.property !== null && answers.hours !== null;
  const property = answers.property ?? 'vivienda';
  const hours = answers.hours ?? 0;
  const rate = HOURLY_RATE[property];
  const base = rate * hours;
  const productsFee = answers.products ? PRODUCTS_FEE : 0;
  const travelFee = answers.location ? (TRAVEL_FEE[answers.location] ?? 10) : 0;
  const extrasTotal = answers.extras.reduce((sum, key) => sum + EXTRA_PRICES[key], 0);
  const subtotal = base + productsFee + travelFee + extrasTotal;
  const discount = answers.frequency === 'recurrente' ? subtotal * RECURRING_DISCOUNT : 0;
  const discounted = subtotal - discount;
  const igi = discounted * IGI_RATE;
  const total = discounted + igi;

  return { ready, rate, base, productsFee, travelFee, extrasTotal, subtotal, discount, discounted, igi, total };
}

function StepRail({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {STEPS.map((s, i) => (
        <motion.span
          key={s}
          animate={{ width: i === index ? 22 : 6, backgroundColor: i <= index ? '#002E7D' : '#e2e8f0' }}
          transition={SPRING}
          className="h-1.5 rounded-full"
        />
      ))}
    </div>
  );
}

function PriceTicker({ value, ready, unit, hint }: { value: number; ready: boolean; unit: string; hint: string }) {
  if (!ready) {
    return <span className="text-sm font-semibold text-slate-400">{hint}</span>;
  }
  return (
    <span className="flex items-baseline gap-1">
      <motion.span
        key={value.toFixed(2)}
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={SPRING_POP}
        className="text-xl font-black tabular-nums text-slate-900"
      >
        {formatEUR(value)} €
      </motion.span>
      <span className="text-xs font-medium text-slate-400">{unit}</span>
    </span>
  );
}

function OptionCard({
  icon: Icon,
  label,
  sub,
  badge,
  selected,
  onClick,
}: {
  icon: typeof Home;
  label: string;
  sub?: string;
  badge?: string;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={TAP}
      className={`group relative flex flex-1 flex-col items-start gap-2 rounded-2xl border p-3.5 text-left transition-colors ${
        selected ? 'border-[#002E7D] bg-blue-50' : 'border-slate-200 bg-white hover:border-[#002E7D]/40 hover:bg-blue-50/30'
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
          selected ? 'bg-[#002E7D] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-[#002E7D]'
        }`}
      >
        <Icon size={16} />
      </span>
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      {sub && <span className="text-xs text-slate-500">{sub}</span>}
      {badge && (
        <span className="absolute right-3 top-3 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-slate-600 group-hover:bg-blue-100">
          {badge}
        </span>
      )}
      {selected && (
        <motion.span
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING_POP}
          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#002E7D] text-white"
        >
          <Check size={11} />
        </motion.span>
      )}
    </motion.button>
  );
}

function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
    >
      <ArrowLeft size={13} />
      {label}
    </button>
  );
}

export default function Quoter({ t, isOpen, setIsOpen }: QuoterProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [showCustomHours, setShowCustomHours] = useState(false);
  const [customHours, setCustomHours] = useState('');
  const reduceMotion = useReducedMotion();

  const step = STEPS[stepIndex];
  const quote = computeQuote(answers);

  const goNext = () => {
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };
  const goBack = () => {
    setDirection(-1);
    setShowCustomHours(false);
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const resetAll = () => {
    setAnswers(EMPTY_ANSWERS);
    setCustomHours('');
    setShowCustomHours(false);
    setDirection(1);
    setStepIndex(0);
  };

  const propertyLabel = answers.property === 'empresa' ? t.property.business : t.property.home;
  const frequencyLabel = answers.frequency === 'recurrente' ? t.frequency.recurring : t.frequency.once;
  const productsLabel = answers.products ? t.products.yes : `${t.products.no}, ${t.products.noSub}`;
  const extrasLabel = answers.extras.length
    ? answers.extras.map((k) => t.extras[k]).join(', ')
    : t.whatsappMessage.noExtras;

  const submitCustomHours = () => {
    const n = Number(customHours);
    if (!n || n <= 0) return;
    setAnswers((a) => ({ ...a, hours: n }));
    setShowCustomHours(false);
    goNext();
  };

  const toggleExtra = (key: ExtraKey) => {
    setAnswers((a) => ({
      ...a,
      extras: a.extras.includes(key) ? a.extras.filter((k) => k !== key) : [...a.extras, key],
    }));
  };

  const whatsappMessage = encodeURIComponent(
    [
      answers.name ? t.whatsappMessage.greetingWithName.replace('{name}', answers.name) : t.whatsappMessage.greeting,
      t.whatsappMessage.intro,
      `- ${t.whatsappMessage.type}: ${propertyLabel}`,
      `- ${t.whatsappMessage.frequency}: ${frequencyLabel}`,
      `- ${t.whatsappMessage.hours}: ${answers.hours}h`,
      `- ${t.whatsappMessage.products}: ${productsLabel}`,
      `- ${t.whatsappMessage.location}: ${answers.location}`,
      `- ${t.whatsappMessage.extras}: ${extrasLabel}`,
      `${t.whatsappMessage.estimate} ${formatEUR(quote.total)} ${t.whatsappMessage.perVisit}`,
    ].join('\n'),
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <motion.a
          href="https://wa.me/593999999999"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.45)]"
          aria-label="WhatsApp"
        >
          <Phone size={28} />
        </motion.a>

        <AnimatePresence>
          {!isOpen && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.3, ease: EASE, delay: 0.6 }}
              className="hidden whitespace-nowrap rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 shadow-lg sm:block"
            >
              {t.launcherLabel}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FCD116] to-[#f5b700] text-slate-900 shadow-[0_18px_40px_rgba(251,191,36,0.45)]"
          aria-label={t.launcherAria}
        >
          <AnimatePresence>{!isOpen && <Calculator size={28} />}</AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-24 right-6 z-40 flex h-[min(600px,85vh)] w-[calc(100vw-3rem)] max-w-[400px] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 pb-3 pt-5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FCD116] via-[#002E7D] to-[#CE1126]">
                  <Calculator size={17} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-slate-900">{t.panelTitle}</p>
                  <p className="text-xs text-slate-500">{t.panelSubtitle}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" aria-label={t.closeAria}>
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between border-y border-slate-100 bg-slate-50/60 px-5 py-3">
              <PriceTicker value={quote.discounted} ready={quote.ready} unit={t.perVisit} hint={t.configureHint} />
              <StepRail index={stepIndex} />
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : direction > 0 ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduceMotion ? 0 : direction > 0 ? -20 : 20 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="space-y-4"
                >
                  <h3 className="text-base font-bold text-slate-900">{t.steps[step]}</h3>

                  {step === 'property' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <OptionCard
                          icon={Home}
                          label={t.property.home}
                          badge={`${HOURLY_RATE.vivienda}€/h`}
                          selected={answers.property === 'vivienda'}
                          onClick={() => { setAnswers((a) => ({ ...a, property: 'vivienda' })); goNext(); }}
                        />
                        <OptionCard
                          icon={Building2}
                          label={t.property.business}
                          badge={`${HOURLY_RATE.empresa}€/h`}
                          selected={answers.property === 'empresa'}
                          onClick={() => { setAnswers((a) => ({ ...a, property: 'empresa' })); goNext(); }}
                        />
                      </div>
                    </div>
                  )}

                  {step === 'frequency' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <OptionCard
                          icon={Repeat}
                          label={t.frequency.recurring}
                          sub={t.frequency.recurringSub}
                          badge="-10%"
                          selected={answers.frequency === 'recurrente'}
                          onClick={() => { setAnswers((a) => ({ ...a, frequency: 'recurrente' })); goNext(); }}
                        />
                        <OptionCard
                          icon={CalendarClock}
                          label={t.frequency.once}
                          selected={answers.frequency === 'unica'}
                          onClick={() => { setAnswers((a) => ({ ...a, frequency: 'unica' })); goNext(); }}
                        />
                      </div>
                      <BackLink label={t.back} onClick={goBack} />
                    </div>
                  )}

                  {step === 'hours' && (
                    <div className="space-y-3">
                      {!showCustomHours ? (
                        <div className="grid grid-cols-3 gap-2">
                          {HOUR_OPTIONS.map((h) => (
                            <motion.button
                              key={h}
                              type="button"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              transition={TAP}
                              onClick={() => { setAnswers((a) => ({ ...a, hours: h })); goNext(); }}
                              className={`flex flex-col items-center gap-0.5 rounded-2xl border py-3 text-sm font-semibold transition-colors ${
                                answers.hours === h ? 'border-[#002E7D] bg-blue-50 text-[#002E7D]' : 'border-slate-200 bg-white text-slate-700 hover:border-[#002E7D]/40 hover:bg-blue-50/30'
                              }`}
                            >
                              {h}h
                              {answers.property && <span className="text-[11px] font-medium text-slate-400 tabular-nums">{HOURLY_RATE[answers.property] * h}€</span>}
                            </motion.button>
                          ))}
                          <motion.button
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={TAP}
                            onClick={() => setShowCustomHours(true)}
                            className="col-span-3 rounded-2xl border border-dashed border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-500 hover:border-[#002E7D]/40"
                          >
                            {t.hours.customButton}
                          </motion.button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            autoFocus
                            type="number"
                            min={1}
                            value={customHours}
                            onChange={(e) => setCustomHours(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && submitCustomHours()}
                            placeholder={t.hours.customPlaceholder}
                            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-[#002E7D] focus:outline-none focus:ring-2 focus:ring-[#002E7D]/20"
                          />
                          <motion.button
                            type="button"
                            onClick={submitCustomHours}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            transition={TAP}
                            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-4 text-slate-900"
                            aria-label={t.hours.continueAria}
                          >
                            <ArrowRight size={18} />
                          </motion.button>
                        </div>
                      )}
                      <BackLink label={t.back} onClick={goBack} />
                    </div>
                  )}

                  {step === 'products' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <OptionCard
                          icon={SprayCan}
                          label={t.products.yes}
                          badge={`+${PRODUCTS_FEE}€`}
                          selected={answers.products === true}
                          onClick={() => { setAnswers((a) => ({ ...a, products: true })); goNext(); }}
                        />
                        <OptionCard
                          icon={Ban}
                          label={t.products.no}
                          sub={t.products.noSub}
                          selected={answers.products === false}
                          onClick={() => { setAnswers((a) => ({ ...a, products: false })); goNext(); }}
                        />
                      </div>
                      <BackLink label={t.back} onClick={goBack} />
                    </div>
                  )}

                  {step === 'location' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {LOCATIONS.map((loc) => (
                          <motion.button
                            key={loc}
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={TAP}
                            onClick={() => { setAnswers((a) => ({ ...a, location: loc })); goNext(); }}
                            className={`flex items-center justify-between gap-1.5 rounded-2xl border px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                              answers.location === loc ? 'border-[#002E7D] bg-blue-50 text-[#002E7D]' : 'border-slate-200 bg-white text-slate-700 hover:border-[#002E7D]/40 hover:bg-blue-50/30'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <MapPin size={13} className="shrink-0 text-[#CE1126]" />
                              {loc}
                            </span>
                            <span className="shrink-0 text-[10px] tabular-nums text-slate-400">+{TRAVEL_FEE[loc]}€</span>
                          </motion.button>
                        ))}
                      </div>
                      <BackLink label={t.back} onClick={goBack} />
                    </div>
                  )}

                  {step === 'extras' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {EXTRA_KEYS.map((key) => (
                          <OptionCard
                            key={key}
                            icon={Sparkles}
                            label={t.extras[key]}
                            badge={`+${EXTRA_PRICES[key]}€`}
                            selected={answers.extras.includes(key)}
                            onClick={() => toggleExtra(key)}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <BackLink label={t.back} onClick={goBack} />
                        <motion.button
                          type="button"
                          onClick={goNext}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          transition={TAP}
                          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-5 py-2 text-sm font-semibold text-slate-900"
                        >
                          {answers.extras.length ? t.extras.continueBtn : t.extras.skipBtn}
                          <ArrowRight size={15} />
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {step === 'summary' && (
                    <div className="space-y-4">
                      <div>
                        <motion.p
                          key={quote.total.toFixed(2)}
                          initial={{ scale: 1.08 }}
                          animate={{ scale: 1 }}
                          transition={SPRING_POP}
                          className="text-4xl font-black tracking-[-0.03em] tabular-nums text-slate-900"
                        >
                          {formatEUR(quote.total)} <span className="text-lg font-semibold text-slate-500">€</span>
                        </motion.p>
                        <p className="mt-1 text-sm text-slate-500">{t.summary.totalWithIgi} · {answers.hours}{t.summary.perVisitUnit}</p>
                      </div>

                      <p className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        {t.summary.approxPrice}
                      </p>

                      <details className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        <summary className="cursor-pointer font-semibold text-slate-700">{t.summary.viewBreakdown}</summary>
                        <div className="mt-3 space-y-1.5 border-t border-slate-200 pt-3">
                          <div className="flex justify-between"><span>{formatEUR(quote.rate)}€ × {answers.hours}h</span><span className="tabular-nums">{formatEUR(quote.base)}€</span></div>
                          {quote.productsFee > 0 && <div className="flex justify-between"><span>{t.summary.productsLine}</span><span className="tabular-nums">+{formatEUR(quote.productsFee)}€</span></div>}
                          <div className="flex justify-between"><span>{t.summary.travelLine} · {answers.location}</span><span className="tabular-nums">+{formatEUR(quote.travelFee)}€</span></div>
                          {quote.extrasTotal > 0 && <div className="flex justify-between"><span>{t.summary.extrasLine} · {extrasLabel}</span><span className="tabular-nums">+{formatEUR(quote.extrasTotal)}€</span></div>}
                          <div className="flex justify-between border-t border-slate-100 pt-1.5 font-semibold text-slate-800"><span>{t.summary.subtotal}</span><span className="tabular-nums">{formatEUR(quote.subtotal)}€</span></div>
                          {quote.discount > 0 && <div className="flex justify-between text-emerald-600"><span>{t.summary.recurringDiscount}</span><span className="tabular-nums">-{formatEUR(quote.discount)}€</span></div>}
                          <div className="flex justify-between"><span>{t.summary.igi}</span><span className="tabular-nums">+{formatEUR(quote.igi)}€</span></div>
                          <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-slate-900"><span>{t.summary.total}</span><span className="tabular-nums">{formatEUR(quote.total)}€</span></div>
                        </div>
                      </details>

                      <div>
                        <label htmlFor="quoter-name" className="text-xs font-medium text-slate-500">
                          {t.summary.nameLabel}
                        </label>
                        <input
                          id="quoter-name"
                          type="text"
                          value={answers.name}
                          onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
                          placeholder={t.summary.namePlaceholder}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-[#002E7D] focus:outline-none focus:ring-2 focus:ring-[#002E7D]/20"
                        />
                      </div>

                      <motion.a
                        href={`https://wa.me/593999999999?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={TAP}
                        className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_14px_30px_rgba(252,209,22,0.35)]"
                      >
                        {t.summary.sendWhatsapp}
                        <ArrowRight size={16} />
                      </motion.a>

                      <div className="flex items-center justify-between">
                        <BackLink label={t.back} onClick={goBack} />
                        <button
                          type="button"
                          onClick={resetAll}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
                        >
                          <RotateCcw size={13} />
                          {t.summary.restart}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
