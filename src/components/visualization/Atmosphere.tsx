"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export function Atmosphere() {
  const { scrollYProgress } = useScroll();
  
  // Parallax: The grid drifts slightly for a 3D depth effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <>
      <motion.div className="blueprint-overlay" style={{ y }} />
      <div className="noise-layer" />
    </>
  );
}