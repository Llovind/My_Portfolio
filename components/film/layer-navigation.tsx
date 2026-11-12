"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { film } from "@/content/profile";

export function LayerNavigation() {
  const [current, setCurrent] = useState(1);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();
  const update = () => {
    const marker = window.innerHeight * 0.35;
    let active = 1;
    for (const layer of film.layers) {
      const section = document.getElementById(layer.target);
      if (section && section.getBoundingClientRect().top <= marker) active = layer.number;
    }
    setCurrent(active);
  };
  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus({ preventScroll: true }); } };
    const desktop = window.matchMedia("(min-width: 768px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("pointerdown", closeOutside); document.addEventListener("keydown", escape); desktop.addEventListener("change", resize);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", escape); desktop.removeEventListener("change", resize); };
  }, [open]);
  const chapter = film.layers.find(layer => layer.number === current) ?? film.layers[0];
  return <div ref={root} className="chapter-navigation" data-menu-open={open} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={toggle} type="button" className="mobile-chapter-toggle" aria-expanded={open} aria-controls="chapter-links" onClick={() => setOpen(value => !value)}>
      <span className="mobile-current-chapter"><span className="mobile-chapter-count">{String(current).padStart(2,"0")} / {String(film.layers.length).padStart(2,"0")}</span><span>{chapter.chapter}</span></span>
      <span className="mobile-chapter-action">{open ? film.navClose : film.navHeading}<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 10L8 6L12 10" /></svg></span>
    </button>
    <nav id="chapter-links" className="balanced-layer-rail" aria-label={film.navLabel}>
    {film.layers.map(layer => <a key={layer.number} href={`#${layer.target}`} onClick={() => setOpen(false)} aria-label={`${layer.number}: ${layer.chapter}`} aria-current={current === layer.number ? "location" : undefined}>
      <span>{String(layer.number).padStart(2, "0")}</span><span>{layer.chapter}</span>
    </a>)}
  </nav>
    <noscript><style>{`@media(max-width:767px){.mobile-chapter-toggle{display:none!important}.chapter-navigation>.balanced-layer-rail{display:grid!important;position:static!important;border:0!important;background:transparent!important}.film-hud{position:static!important;margin:12px 16px;width:auto!important}.film-main{padding-bottom:0!important}}`}</style></noscript>
  </div>;
}
