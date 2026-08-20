import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

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
    <span className={`h-px w-10 ${light ? "bg-gold-dark" : "bg-gold"}`} />
    <span className={`font-mono text-xs uppercase tracking-[0.3em] ${light ? "text-gold-dark" : "text-gold"}`}>
      {children}
    </span>
  </div>
);

export const TiltCard = ({ children, className = "", ...rest }) => {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [4.5, -4.5]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5.5, 5.5]), { stiffness: 160, damping: 20 });
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px);
    my.set(py);
    setGlare({ x: px * 100, y: py * 100, o: 1 });
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setGlare((g) => ({ ...g, o: 0 }));
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
      {...rest}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: glare.o,
          background: `radial-gradient(420px circle at ${glare.x}% ${glare.y}%, rgba(252, 209, 22, 0.14), transparent 65%)`,
        }}
      />
    </motion.div>
  );
};
