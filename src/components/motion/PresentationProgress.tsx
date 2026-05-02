"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./PresentationProgress.module.css";

export function PresentationProgress() {
  const { scrollYProgress } = useScroll();
  
  // Apply a spring for a smooth, high-fidelity feel.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className={styles.progress} 
      style={{ scaleX }} 
    />
  );
}