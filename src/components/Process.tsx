import { motion } from 'framer-motion';
import { ClipboardList, Lightbulb, Rocket, TrendingUp } from 'lucide-react';
import DotBackground from './DotBackground';

interface ProcessProps {
  lang: 'es' | 'ca' | 'fr';
  t: {
    title: string;
    subtitle: string;
    steps: readonly { title: string; description: string }[];
  };
}

const icons = [ClipboardList, Lightbulb, Rocket, TrendingUp];

export default function Process({ t }: ProcessProps) {
  const steps = t.steps.map((step, i) => ({ ...step, icon: icons[i] }));

  return (
    <section id="process" className="relative overflow-hidden bg-white py-24">
      <DotBackground />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-gradient-to-r from-[#FCD116] via-[#002E7D] to-[#CE1126] md:block" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative text-center"
              >
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FCD116] via-[#002E7D] to-[#CE1126] shadow-lg">
                  <Icon size={28} className="text-white" />
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-[#002E7D]">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
