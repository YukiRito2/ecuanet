import { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { FadeIn, Kicker, MaskedLines } from "./shared";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const RATES = { residencial: 0.95, oficina: 0.75, chalet: 1.4, findeobra: 3.2 };
const FACTORS = { puntual: 1.15, semanal: 1, bisemanal: 1.05, mensual: 1.1 };

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  property_type: "residencial",
  surface: 120,
  frequency: "semanal",
  message: "",
};

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors duration-300 focus:border-gold/60";

const INFO = [
  { icon: Phone, label: "+376 800 123", sub: "Llamadas y WhatsApp", testid: "contact-info-phone" },
  { icon: Mail, label: "hola@ecuanet.ad", sub: "Respuesta en 24h", testid: "contact-info-email" },
  { icon: MapPin, label: "Andorra la Vella", sub: "Cobertura en las 7 parroquias", testid: "contact-info-location" },
  { icon: Clock, label: "Lun – Sáb · 8:00 – 19:00", sub: "Servicios fuera de horario bajo petición", testid: "contact-info-hours" },
];

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [sending, setSending] = useState(false);

  const estimate = useMemo(() => {
    const surface = Number(form.surface) || 0;
    if (surface <= 0) return null;
    return Math.max(49, Math.round(surface * RATES[form.property_type] * FACTORS[form.frequency]));
  }, [form.surface, form.property_type, form.frequency]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/quotes`, {
        ...form,
        surface: Number(form.surface) || 0,
        estimate,
      });
      toast.success("Solicitud enviada. Te contactaremos en menos de 24 horas.");
      setForm(INITIAL);
    } catch (err) {
      toast.error("No se pudo enviar la solicitud. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" data-testid="contact-section" className="relative overflow-hidden bg-navy-deep py-20 lg:py-32">
      <div className="absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <FadeIn>
            <Kicker>Contacto</Kicker>
          </FadeIn>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            <MaskedLines
              lines={[
                <>Solicita tu</>,
                <>
                  <span className="font-serif font-medium italic text-gold">presupuesto</span> hoy.
                </>,
              ]}
            />
          </h2>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#A3B8CC]">
              Cuéntanos qué necesitas y recibirás una propuesta a medida tras la visita
              técnica gratuita. Sin compromiso.
            </p>
          </FadeIn>
          <div className="mt-10 flex flex-col gap-5">
            {INFO.map((item, i) => (
              <FadeIn key={item.testid} delay={0.25 + i * 0.08}>
                <div data-testid={item.testid} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                    <item.icon size={17} className="text-gold" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs text-[#A3B8CC]">{item.sub}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.15}>
          <form
            data-testid="budget-calculator-form"
            onSubmit={submit}
            className="rounded-3xl border border-white/10 bg-navy-surface/50 p-7 backdrop-blur-sm sm:p-9"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="contact-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Nombre</label>
                <input id="contact-name" data-testid="contact-form-name" required value={form.name} onChange={set("name")} placeholder="Tu nombre" className={inputCls} />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="contact-phone" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Teléfono</label>
                <input id="contact-phone" data-testid="contact-form-phone" value={form.phone} onChange={set("phone")} placeholder="+376 ..." className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Email</label>
                <input id="contact-email" data-testid="contact-form-email" required type="email" value={form.email} onChange={set("email")} placeholder="tu@email.com" className={inputCls} />
              </div>
              <div>
                <label htmlFor="contact-type" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Tipo de propiedad</label>
                <select id="contact-type" data-testid="contact-form-property-type" value={form.property_type} onChange={set("property_type")} className={`${inputCls} appearance-none [&>option]:bg-navy-deep`}>
                  <option value="residencial">Residencial</option>
                  <option value="oficina">Oficina / Corporativo</option>
                  <option value="chalet">Chalet de lujo</option>
                  <option value="findeobra">Fin de obra</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-surface" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Superficie (m²)</label>
                <input id="contact-surface" data-testid="contact-form-surface" type="number" min="10" value={form.surface} onChange={set("surface")} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-frequency" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Frecuencia</label>
                <select id="contact-frequency" data-testid="contact-form-frequency" value={form.frequency} onChange={set("frequency")} className={`${inputCls} appearance-none [&>option]:bg-navy-deep`}>
                  <option value="puntual">Puntual</option>
                  <option value="semanal">Semanal</option>
                  <option value="bisemanal">Bisemanal</option>
                  <option value="mensual">Mensual</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Mensaje</label>
                <textarea id="contact-message" data-testid="contact-form-message" rows={3} value={form.message} onChange={set("message")} placeholder="Cuéntanos qué necesitas..." className={`${inputCls} resize-none`} />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-gold/25 bg-gold/[0.06] px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">Estimación orientativa</span>
              <span data-testid="budget-estimate" className="font-mono text-xl font-bold text-gold">
                {estimate ? `desde €${estimate} / visita` : "—"}
              </span>
            </div>

            <button
              data-testid="contact-form-submit"
              type="submit"
              disabled={sending}
              className="group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-bold text-navy-deep shadow-[0_12px_40px_-8px_rgba(252,209,22,0.4)] transition-[background-color,transform,opacity] duration-300 hover:-translate-y-0.5 hover:bg-gold-dark disabled:opacity-60"
            >
              {sending ? <Loader2 size={17} className="animate-spin" /> : <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />}
              {sending ? "Enviando..." : "Enviar solicitud"}
            </button>
            <p className="mt-4 text-center text-xs text-white/40">
              Visita técnica gratuita · Respuesta en menos de 24h
            </p>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
