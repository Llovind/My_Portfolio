"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, inView } from "framer-motion";

export function ProofMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const stamps = Array.from(element.querySelectorAll<HTMLElement>(".proof-stamp"));
    const played = new WeakSet<HTMLElement>();
    let stops: Array<() => void> = [];
    const reset = () => {
      stops.splice(0).forEach(stop => stop());
      stamps.forEach(stamp => { stamp.style.removeProperty("transform"); stamp.removeAttribute("data-stamp-played"); });
      element.removeAttribute("data-proof-motion");
    };
    const setup = () => {
      reset();
      if (!media.matches) return;
      try {
        stamps.forEach(stamp => stops.push(inView(stamp, () => {
          if (!media.matches || root.current !== element || played.has(stamp)) return;
          played.add(stamp);
          stamp.dataset.stampPlayed = "true";
          const control = animate(stamp, {
            scale: [1.12, .97, 1], rotate: [-9, -1, -3], y: [-8, 1, 0],
          }, { duration: .55, times: [0, .7, 1], ease: "easeOut" });
          stops.push(() => control.stop());
        }, { amount: .7 })));
        element.dataset.proofMotion = "true";
      } catch (error) { reset(); console.error("Proof remains in its final readable state", error); }
    };
    setup(); media.addEventListener("change", setup);
    return () => { reset(); media.removeEventListener("change", setup); };
  }, []);
  return <div ref={root} className="proof-columns proof-editorial">{children}</div>;
}
