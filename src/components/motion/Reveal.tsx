"use client";
import { useRef } from "react";
import { 
  motion, 
  useInView, 
  useReducedMotion, 
  useSpring, 
  useTransform, 
  type MotionValue 
} from "framer-motion";
import { useSlideContext } from "./SlideContext";
import styles from "./Reveal.module.css"; // AUDIT FIX: Import necessary styles

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

export function Reveal(props: RevealProps) {
  const slide = useSlideContext();
  
  // Dual-mode detection: Slide Mode if context exists, otherwise Viewport Mode.
  return slide?.scrollYProgress ? (
    <SlideReveal {...props} scrollYProgress={slide.scrollYProgress} />
  ) : (
    <ViewportReveal {...props} />
  );
}

/**
 * Viewport Mode: Standard entrance for long-form essays.
 */
function ViewportReveal({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "" 
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "0px 0px -12% 0px", once: true });

  const [x, y] = getOffsets(direction, 20);

  return (
    <div ref={ref} className={`${styles.root} ${className}`}>
      <motion.div
        initial={{ opacity: 0, x, y }}
        animate={inView || reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
        {/* The Scanline: One-shot visual trigger */}
        {inView && !reduced && (
          <motion.div 
            className={styles.scanline}
            initial={{ left: "-100%" }}
            animate={{ left: "120%" }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeInOut" }}
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Slide Mode: Scroll-linked scrubbing for briefings.
 */
function SlideReveal({ 
  children, 
  delay = 0, 
  direction = "up", 
  scrollYProgress 
}: RevealProps & { scrollYProgress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [xDist, yDist] = getOffsets(direction, 30);

  const start = 0.1 + delay;
  const end = Math.min(0.6 + delay, 0.9);

  // AUDIT FIX: Map transforms for scrubbing.
  const opacity = useTransform(smooth, [start, end], [0, 1]);
  const x = useTransform(smooth, [start, end], [xDist, 0]);
  const y = useTransform(smooth, [start, end], [yDist, 0]);

  return (
    <motion.div 
      className={styles.root}
      style={{ opacity, x, y }}
    >
      {children}
      {/* The Scanline: Adds 'Technical Instrument' feel to the scrub */}
      {!reduced && (
        <motion.div 
          className={styles.scanline}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { left: "-100%" },
            visible: { left: "120%", transition: { duration: 1, delay: 0.1 } }
          }}
        />
      )}
    </motion.div>
  );
}

function getOffsets(dir: Direction, dist: number): [number, number] {
  switch (dir) {
    case "up":    return [0, dist];
    case "down":  return [0, -dist];
    case "left":  return [dist, 0];
    case "right": return [-dist, 0];
    default:      return [0, 0];
  }
}