"use client";

import { useEffect, type ReactNode } from 'react';
import { useMotionValueEvent, useScroll, useReducedMotion } from 'framer-motion';

// Scroll remains native; this observer only updates the palette and orientation.
export function FilmRuntime({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const update = (progress: number) => {
    const root = document.documentElement;
    const value = Math.max(0, Math.min(1, progress));
    root.style.setProperty('--film-progress', String(value));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mix = (from: number[], to: number[]) => `rgb(${from.map((v,i) => Math.round(v+(to[i]-v)*value)).join(' ')})`;
    root.style.setProperty('--color-bg', mix([11,13,18],[27,16,20]));
    root.style.setProperty('--color-primary', mix([166,203,255],[255,176,140]));
  };
  useMotionValueEvent(scrollYProgress, 'change', update);
  useEffect(() => {
    update(scrollYProgress.get());
    if (reduced) {
      document.documentElement.style.removeProperty('--color-bg');
      document.documentElement.style.removeProperty('--color-primary');
    }
    return () => ['--film-progress', '--color-bg', '--color-primary'].forEach(name => document.documentElement.style.removeProperty(name));
  }, [reduced]);
  return <div className="film-root">{children}</div>;
}
