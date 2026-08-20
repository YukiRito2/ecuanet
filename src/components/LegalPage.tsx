import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DotBackground from './DotBackground';

interface LegalPageProps {
  title: string;
  updated: string;
  backHome: string;
  sections: readonly { heading: string; body: string }[];
}

export default function LegalPage({ title, updated, backHome, sections }: LegalPageProps) {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#f4f7fb] pb-16 pt-32 sm:pt-36">
        <DotBackground />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#002E7D] hover:underline">
              <ArrowLeft size={16} />
              {backHome}
            </Link>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl">{title}</h1>
            <p className="mt-3 text-sm text-slate-500">{updated}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold text-slate-900">{section.heading}</h2>
              <p className="mt-2 text-base leading-7 text-slate-600">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
