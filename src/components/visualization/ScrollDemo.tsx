"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./ScrollDemo.module.css";

export function ScrollDemo({ source }: { source: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // AUDIT FIX: Corrected range mapping
  // Maps 0-1 scroll progress to 0-360 degrees rotation
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  // Maps 0-1 scroll progress to a fade-in/out opacity curve
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className={styles.track}>
      <div className={styles.sticky}>
        <motion.div 
          className={styles.box} 
          style={{ rotate, opacity }}
        >
          <span className={styles.label}>ENGINE_LIVE</span>
        </motion.div>
        <p className={styles.caption}>{source || "Scroll to observe transformation."}</p>
      </div>
    </div>
  );
}