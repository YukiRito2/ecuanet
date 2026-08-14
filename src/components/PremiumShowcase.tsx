import { motion } from 'framer-motion';

const gallery = [
  {
    category: 'Corporativo',
    location: 'Andorra la Vella',
    image: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=1400&q=80',
  },
  {
    category: 'Residencial',
    location: 'La Massana',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Hospitalidad',
    location: 'Canillo',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Comercial',
    location: 'Escaldes-Engordany',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Eventos y salones',
    location: 'Ordino',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80',
  },
] as const;

export default function PremiumShowcase() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#002E7D]">Trabajos</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            Presentes en cada tipo de espacio
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Selección de proyectos recientes por categoría y ubicación: oficinas, viviendas, hoteles, comercios y salones que hemos dejado impecables en toda Andorra.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-[1.6rem] shadow-[0_18px_45px_rgba(15,23,42,0.07)] ${
                index === 0 ? 'sm:col-span-2' : ''
              }`}
            >
              <img
                src={item.image}
                alt={`${item.category} · ${item.location}`}
                className={`w-full object-cover transition duration-500 group-hover:scale-110 ${index === 0 ? 'h-72 sm:h-80' : 'h-72'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FCD116]">{item.category}</p>
                <p className="mt-1 text-lg font-bold text-white">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
