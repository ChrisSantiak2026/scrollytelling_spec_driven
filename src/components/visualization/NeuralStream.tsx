"use client";
import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";

export function NeuralStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Use a spring to make the particle reaction feel 'High Fidelity'
  const scrollSpeed = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number; y: number; size: number; speedY: number;
      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = 2; // Data-bit sizing
        this.speedY = Math.random() * 0.5 + 0.2;
      }
      update(w: number, h: number, speedBoost: number) {
        // Boost speed based on scroll momentum
        this.y += this.speedY + (speedBoost * 5);
        if (this.y > h) this.y = -10;
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(34, 211, 238, 0.4)"; // Calm Cyan
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 60 }, () => new Particle(canvas.width, canvas.height));
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const boost = scrollSpeed.get();
      
      particles.forEach(p => {
        p.update(canvas.width, canvas.height, boost);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollSpeed]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: "fixed", 
        inset: 0, 
        pointerEvents: "none", 
        zIndex: 4, // Behind the grid blueprint
        opacity: 0.5 
      }} 
    />
  );
}