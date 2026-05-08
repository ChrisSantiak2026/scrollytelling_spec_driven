"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { NeuralStream } from "./NeuralStream"; // Import the new agent

export function Atmosphere() {
  const { scrollYProgress } = useScroll();
  
  // Parallax: The grid drifts slightly for a 3D depth effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <>
      {/* Generative Motion Layer */}
      <NeuralStream />
      
      {/* Blueprint Infrastructure */}
      <motion.div className="blueprint-overlay" style={{ y }} />
      <div className="noise-layer" />
      
      {/* Corner Brackets for AI Vision aesthetic */}
      <div className="ui-brackets" />
    </>
  );
}