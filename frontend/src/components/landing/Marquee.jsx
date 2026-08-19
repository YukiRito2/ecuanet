const ITEMS = [
  "Ecuanet Premium Cleaning",
  "Andorra la Vella",
  "Escaldes-Engordany",
  "Sant Julià de Lòria",
  "Encamp",
  "La Massana",
  "Ordino",
  "Canillo",
  "Servicios residenciales & corporativos de lujo",
];

const Row = ({ hidden }) => (
  <div aria-hidden={hidden} className="flex shrink-0 items-center">
    {ITEMS.map((item, i) => (
      <span key={i} className="flex items-center">
        <span className="whitespace-nowrap px-8 font-mono text-xs uppercase tracking-[0.35em] text-white/40">
          {item}
        </span>
        <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <div data-testid="editorial-marquee" className="relative overflow-hidden border-y border-white/10 bg-navy-deep py-5">
      <div className="animate-marquee-slow flex w-max">
        <Row hidden={false} />
        <Row hidden={true} />
      </div>
    </div>
  );
}
