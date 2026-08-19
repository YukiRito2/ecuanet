import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const FadeIn = ({ children, delay = 0, y = 28, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

export const MaskedLines = ({ lines, delay = 0, className = "", lineClassName = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: "115%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.13 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const Kicker = ({ children, light = false }) => (
  <div className="flex items-center gap-3">
    <span className="h-px w-10 bg-gold" />
    <span className={`font-mono text-xs uppercase tracking-[0.3em] ${light ? "text-gold-dark" : "text-gold"}`}>
      {children}
    </span>
  </div>
);
