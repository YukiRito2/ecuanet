import { motion, useReducedMotion } from 'framer-motion';

export default function DotBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_65%_at_50%_40%,black_30%,transparent_85%)]"
    >
      <motion.div
        className="absolute inset-0 [background-image:radial-gradient(rgba(0,46,125,0.18)_1px,transparent_1.6px)] [background-size:22px_22px]"
        animate={reduceMotion ? undefined : { backgroundPosition: ['0px 0px', '22px 22px'] }}
        transition={reduceMotion ? undefined : { duration: 36, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}
