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
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, x, y }}
        animate={inView || reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function SlideReveal({ 
  children, 
  delay = 0, 
  direction = "up", 
  scrollYProgress 
}: RevealProps & { scrollYProgress: MotionValue<number> }) {
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [xDist, yDist] = getOffsets(direction, 30);

  const start = 0.1 + delay;
  const end = Math.min(0.6 + delay, 0.9);

  const opacity = useTransform(smooth, [start, end], [0, 1]);
  const x = useTransform(smooth, [start, end], [xDist, 0]);
  const y = useTransform(smooth, [start, end], [yDist, 0]);

  return (
    <motion.div style={{ opacity, x, y }}>
      {children}
    </motion.div>
  );
}

/**
 * Helper to calculate coordinate offsets.
 * FIX: default now returns to satisfy the [number, number] return type.
 */
function getOffsets(dir: Direction, dist: number): [number, number] {
  switch (dir) {
    case "up":    return [0, dist];
    case "down":  return [0, -dist];
    case "left":  return [dist, 0];
    case "right": return [-dist, 0];
    default:      return [0, 0];
  }
}