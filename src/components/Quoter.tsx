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
type StepId = 'property' | 'frequency' | 'hours' | 'products' | 'location' | 'extras' | 'summary';

interface Answers {
  name: string;
  property: PropertyType | null;
  frequency: Frequency | null;
  hours: number | null;
  products: boolean | null;
  location: string | null;
  extras: string[];
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
const EXTRAS = [
  { key: 'vaporeta', label: 'Vaporeta', price: 25 },
  { key: 'aspirador', label: 'Aspirador', price: 15 },
  { key: 'planxa', label: 'Planxa', price: 18 },
  { key: 'express', label: 'Express', price: 40 },
] as const;
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
  const extrasTotal = answers.extras.reduce((sum, key) => {
    const extra = EXTRAS.find((e) => e.key === key);
    return sum + (extra?.price ?? 0);
  }, 0);
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

function PriceTicker({ value, ready }: { value: number; ready: boolean }) {
  if (!ready) {
    return <span className="text-sm font-semibold text-slate-400">Configura tu servicio</span>;
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
      <span className="text-xs font-medium text-slate-400">por visita</span>
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

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
    >
      <ArrowLeft size={13} />
      Atrás
    </button>
  );
}

const STEP_HEADING: Record<StepId, string> = {
  property: '¿Qué tipo de espacio necesitas limpiar?',
  frequency: '¿Buscas un servicio recurrente o solo por esta vez?',
  hours: '¿Cuántas horas por visita necesitas?',
  products: '¿Quieres que llevemos los productos de limpieza?',
  location: '¿Dónde necesitas el servicio?',
  extras: '¿Algún extra? (opcional)',
  summary: 'Tu presupuesto orientativo',
};

export default function Quoter() {
  const [isOpen, setIsOpen] = useState(false);
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

  const propertyLabel = answers.property === 'empresa' ? 'Empresa' : 'Vivienda particular';
  const frequencyLabel = answers.frequency === 'recurrente' ? 'Servicio recurrente' : 'Una sola vez';
  const productsLabel = answers.products ? 'Sí, llevad los productos' : 'No hace falta, ya tengo';
  const extrasLabel = answers.extras.length
    ? answers.extras.map((k) => EXTRAS.find((e) => e.key === k)?.label).join(', ')
    : 'Sin extras';

  const submitCustomHours = () => {
    const n = Number(customHours);
    if (!n || n <= 0) return;
    setAnswers((a) => ({ ...a, hours: n }));
    setShowCustomHours(false);
    goNext();
  };

  const toggleExtra = (key: string) => {
    setAnswers((a) => ({
      ...a,
      extras: a.extras.includes(key) ? a.extras.filter((k) => k !== key) : [...a.extras, key],
    }));
  };

  const whatsappMessage = encodeURIComponent(
    [
      `Hola${answers.name ? `, soy ${answers.name}` : ''}. Quiero solicitar una limpieza:`,
      `- Tipo: ${propertyLabel}`,
      `- Frecuencia: ${frequencyLabel}`,
      `- Horas por visita: ${answers.hours}h`,
      `- Productos: ${productsLabel}`,
      `- Ubicación: ${answers.location}`,
      `- Extras: ${extrasLabel}`,
      `Presupuesto orientativo: ${formatEUR(quote.total)} € por visita.`,
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
              Calcula tu presupuesto
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#FCD116] to-[#f5b700] text-slate-900 shadow-[0_18px_40px_rgba(251,191,36,0.45)]"
          aria-label="Calcular presupuesto"
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
                  <p className="text-sm font-bold leading-tight text-slate-900">Calculadora de presupuesto</p>
                  <p className="text-xs text-slate-500">Precio estimado al instante</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between border-y border-slate-100 bg-slate-50/60 px-5 py-3">
              <PriceTicker value={quote.discounted} ready={quote.ready} />
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
                  <h3 className="text-base font-bold text-slate-900">{STEP_HEADING[step]}</h3>

                  {step === 'property' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <OptionCard
                          icon={Home}
                          label="Vivienda particular"
                          badge={`${HOURLY_RATE.vivienda}€/h`}
                          selected={answers.property === 'vivienda'}
                          onClick={() => { setAnswers((a) => ({ ...a, property: 'vivienda' })); goNext(); }}
                        />
                        <OptionCard
                          icon={Building2}
                          label="Empresa"
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
                          label="Recurrente"
                          sub="cada semana o mes"
                          badge="-10%"
                          selected={answers.frequency === 'recurrente'}
                          onClick={() => { setAnswers((a) => ({ ...a, frequency: 'recurrente' })); goNext(); }}
                        />
                        <OptionCard
                          icon={CalendarClock}
                          label="Una sola vez"
                          selected={answers.frequency === 'unica'}
                          onClick={() => { setAnswers((a) => ({ ...a, frequency: 'unica' })); goNext(); }}
                        />
                      </div>
                      <BackLink onClick={goBack} />
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
                            Otra cantidad
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
                            placeholder="Nº de horas"
                            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-[#002E7D] focus:outline-none focus:ring-2 focus:ring-[#002E7D]/20"
                          />
                          <motion.button
                            type="button"
                            onClick={submitCustomHours}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            transition={TAP}
                            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-4 text-slate-900"
                            aria-label="Continuar"
                          >
                            <ArrowRight size={18} />
                          </motion.button>
                        </div>
                      )}
                      <BackLink onClick={goBack} />
                    </div>
                  )}

                  {step === 'products' && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <OptionCard
                          icon={SprayCan}
                          label="Sí, llevadlos"
                          badge={`+${PRODUCTS_FEE}€`}
                          selected={answers.products === true}
                          onClick={() => { setAnswers((a) => ({ ...a, products: true })); goNext(); }}
                        />
                        <OptionCard
                          icon={Ban}
                          label="No hace falta"
                          sub="ya tengo"
                          selected={answers.products === false}
                          onClick={() => { setAnswers((a) => ({ ...a, products: false })); goNext(); }}
                        />
                      </div>
                      <BackLink onClick={goBack} />
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
                      <BackLink onClick={goBack} />
                    </div>
                  )}

                  {step === 'extras' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {EXTRAS.map((extra) => (
                          <OptionCard
                            key={extra.key}
                            icon={Sparkles}
                            label={extra.label}
                            badge={`+${extra.price}€`}
                            selected={answers.extras.includes(extra.key)}
                            onClick={() => toggleExtra(extra.key)}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <BackLink onClick={goBack} />
                        <motion.button
                          type="button"
                          onClick={goNext}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          transition={TAP}
                          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-5 py-2 text-sm font-semibold text-slate-900"
                        >
                          {answers.extras.length ? 'Continuar' : 'Saltar'}
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
                        <p className="mt-1 text-sm text-slate-500">Total con IGI · {answers.hours}h por visita</p>
                      </div>

                      <p className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        Precio orientativo · se confirma en el lugar
                      </p>

                      <details className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        <summary className="cursor-pointer font-semibold text-slate-700">Ver desglose</summary>
                        <div className="mt-3 space-y-1.5 border-t border-slate-200 pt-3">
                          <div className="flex justify-between"><span>{formatEUR(quote.rate)}€ × {answers.hours}h</span><span className="tabular-nums">{formatEUR(quote.base)}€</span></div>
                          {quote.productsFee > 0 && <div className="flex justify-between"><span>Productos de limpieza</span><span className="tabular-nums">+{formatEUR(quote.productsFee)}€</span></div>}
                          <div className="flex justify-between"><span>Desplazamiento · {answers.location}</span><span className="tabular-nums">+{formatEUR(quote.travelFee)}€</span></div>
                          {quote.extrasTotal > 0 && <div className="flex justify-between"><span>Extras · {extrasLabel}</span><span className="tabular-nums">+{formatEUR(quote.extrasTotal)}€</span></div>}
                          <div className="flex justify-between border-t border-slate-200 pt-1.5 font-semibold text-slate-800"><span>Subtotal por visita</span><span className="tabular-nums">{formatEUR(quote.subtotal)}€</span></div>
                          {quote.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Descuento recurrente (10%)</span><span className="tabular-nums">-{formatEUR(quote.discount)}€</span></div>}
                          <div className="flex justify-between"><span>IGI (4.5%)</span><span className="tabular-nums">+{formatEUR(quote.igi)}€</span></div>
                          <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-slate-900"><span>TOTAL por visita</span><span className="tabular-nums">{formatEUR(quote.total)}€</span></div>
                        </div>
                      </details>

                      <div>
                        <label htmlFor="quoter-name" className="text-xs font-medium text-slate-500">
                          ¿A nombre de quién? (opcional)
                        </label>
                        <input
                          id="quoter-name"
                          type="text"
                          value={answers.name}
                          onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
                          placeholder="Tu nombre"
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
                        Enviar por WhatsApp
                        <ArrowRight size={16} />
                      </motion.a>

                      <div className="flex items-center justify-between">
                        <BackLink onClick={goBack} />
                        <button
                          type="button"
                          onClick={resetAll}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-600"
                        >
                          <RotateCcw size={13} />
                          Empezar de nuevo
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
