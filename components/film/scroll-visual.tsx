"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scroll } from "framer-motion";

/** The server/base CSS is the complete drawing. Only decorative geometry rewinds. */
export function ScrollVisual({ kind, caption, children, className = "" }: { kind: string; caption?: string; children: ReactNode; className?: string }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const wide = window.matchMedia("(min-width: 1051px)");
    const windowElement = element.closest<HTMLElement>("[data-scroll-window]");
    const names = ["--art-progress", "--phase-a", "--phase-b", "--phase-c", "--phase-d"];
    const clamp = (p: number) => Math.min(1, Math.max(0, p));
    let stop: (() => void) | undefined;
    const moving = Array.from(element.querySelectorAll<SVGCircleElement>("[data-route-marker]")).flatMap(marker => {
      const path = element.querySelector<SVGPathElement>(`[data-route-path="${marker.dataset.routeMarker}"]`);
      return path ? [{ marker, path, x: marker.getAttribute("cx"), y: marker.getAttribute("cy"), phase: Number(marker.dataset.routePhase ?? 1), length: path.getTotalLength() }] : [];
    });
    const reset = () => {
      element.removeAttribute("data-motion"); element.removeAttribute("data-art-beat"); element.removeAttribute("data-ridges-complete");
      names.forEach(name => element.style.removeProperty(name));
      windowElement?.removeAttribute("data-window-ready"); windowElement?.removeAttribute("data-current-beat");
      moving.forEach(({marker,x,y}) => { x === null ? marker.removeAttribute("cx") : marker.setAttribute("cx",x); y === null ? marker.removeAttribute("cy") : marker.setAttribute("cy",y); });
    };
    const setup = () => {
      stop?.(); stop = undefined; reset();
      if (!media.matches) return;
      try {
        const target = window.innerWidth < 768 ? element : windowElement ?? element.closest<HTMLElement>(".visual-passage") ?? element.closest<HTMLElement>("[data-layer]") ?? element;
        const held = !!windowElement && wide.matches;
        // Read actual scroll coordinates: native timeline progress can lag after an anchor jump.
        stop = scroll((_progress: number, info) => {
          const axis = info.y;
          const start = axis.targetOffset - (held ? 0 : axis.containerLength * .82);
          const end = axis.targetOffset + axis.targetLength - axis.containerLength * (held ? 1 : .42);
          const p = clamp((axis.current - start) / Math.max(1, end - start));
          const phases = held ? [.04,.29,.54,.79].map(at => clamp((p-at)/.19)) : [clamp(p/.3),clamp((p-.16)/.36),clamp((p-.36)/.38),clamp((p-.57)/.36)];
          [p,...phases].forEach((value,index) => element.style.setProperty(names[index],String(value)));
          const beat = String(held ? (p >= .79 ? 3 : p >= .54 ? 2 : p >= .29 ? 1 : 0) : Math.min(3,Math.floor(p*4)));
          element.dataset.artBeat = beat;
          if (kind === "human") element.dataset.ridgesComplete = String(p >= .9);
          if (held) windowElement!.dataset.currentBeat = beat;
          moving.forEach(({marker,path,phase,length}) => { const point = path.getPointAtLength(phases[phase] * length); marker.setAttribute("cx",String(point.x)); marker.setAttribute("cy",String(point.y)); });
        }, { target, offset: ["start 82%", "end 42%"] });
        element.dataset.motion = "true";
        if (held) { windowElement!.dataset.currentBeat ??= "0"; windowElement!.dataset.windowReady = "true"; }
      } catch (error) { stop?.(); reset(); console.error("Artwork stayed in its static final state", error); }
    };
    setup(); media.addEventListener("change", setup); wide.addEventListener("change",setup);
    return () => { stop?.(); reset(); media.removeEventListener("change", setup); wide.removeEventListener("change",setup); };
  }, [kind]);
  return <figure ref={root} className={`chapter-art chapter-art--${kind} ${className}`} data-artwork={kind}>
    <div className="chapter-art-canvas">{children}</div>{caption && <figcaption>{caption}</figcaption>}
  </figure>;
}
