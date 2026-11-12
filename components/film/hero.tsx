"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { animate, LazyMotion, domAnimation, m, useMotionValue, useTransform } from "framer-motion";
import { confirmed, film, profile, heroPresentation as copy } from "@/content/profile";
import type { ResolvedPhoto } from "@/lib/photo-types";
import { heroMono } from "@/app/fonts/hero-fonts";
import { alignHeroDot } from "./hero-metrics";
import { usePhotoScroll } from "../use-photo-scroll";

function beginFoundation(event: MouseEvent<HTMLAnchorElement>) {
  const heading = document.getElementById("layer1"), section = document.getElementById("foundation");
  if (!heading || !section) return;
  event.preventDefault();
  if (location.hash !== "#layer1") history.pushState(null, "", "#layer1");
  heading.focus({ preventScroll: true });
  section.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

export function HeroScene({ portrait = null }: { portrait?: ResolvedPhoto | null }) {
  const word = useRef<HTMLSpanElement>(null);
  const photoFrame = useRef<HTMLDivElement>(null);
  const photoEntrance = useRef<HTMLDivElement>(null);
  usePhotoScroll(photoFrame, "portrait");
  const [dotReady, setDotReady] = useState(false);
  const dotPulsed = useRef(false);
  const [desktopMotion, setDesktopMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setDesktopMotion(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const typing = useMotionValue(1), dotScale = useMotionValue(1), dotOpacity = useMotionValue(1);
  const typedRole = useTransform(typing, value => copy.role.slice(0, Math.floor(value * copy.role.length)));

  useEffect(() => {
    const entrance = photoEntrance.current;
    if (!entrance || !portrait || !desktopMotion) return;
    const control = animate(entrance, {
      clipPath: ["inset(92% 0 0 0)", "inset(0% 0% 0% 0%)"],
      y: [28, 0],
      opacity: [0.5, 1],
    }, { duration: 0.95, ease: [0.22, 1, 0.36, 1] });
    return () => { control.stop(); entrance.removeAttribute("style"); };
  }, [portrait?.src, desktopMotion]);


  useEffect(() => {
    const element = word.current;
    if (!element) return;
    let cancelled = false, frame = 0;
    const measure = () => {
      if (cancelled) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { if (!cancelled) setDotReady(alignHeroDot(element)); });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element); measure();
    document.fonts.ready.then(measure);
    document.fonts.addEventListener("loadingdone", measure);
    return () => { cancelled = true; cancelAnimationFrame(frame); observer.disconnect(); document.fonts.removeEventListener("loadingdone", measure); };
  }, []);

  useEffect(() => {
    typing.set(1);
    if (!copy.role || !desktopMotion) return;
    typing.set(0);
    const control = animate(typing, 1, { duration: Math.min(4, copy.role.length * 0.045), ease: "linear" });
    return () => { control.stop(); typing.set(1); };
  }, [desktopMotion, typing]);

  useEffect(() => {
    dotScale.set(1); dotOpacity.set(1);
    if (!dotReady || !desktopMotion) return;
    let cancelled = false;
    let pulse: ReturnType<typeof animate> | undefined, idle: ReturnType<typeof animate> | undefined, opacity: ReturnType<typeof animate> | undefined;
    const startIdle = () => {
      if (cancelled) return;
      idle = animate(dotScale, [1, 1.08, 1], { duration: 4.5, repeat: Infinity, ease: "easeInOut" });
      opacity = animate(dotOpacity, [1, 0.68, 1], { duration: 4.5, repeat: Infinity, ease: "easeInOut" });
    };
    if (dotPulsed.current) startIdle();
    else {
      dotPulsed.current = true;
      pulse = animate(dotScale, [1, 1.35, 1], { duration: 0.7, ease: "easeInOut" });
      pulse.then(startIdle);
    }
    return () => { cancelled = true; pulse?.stop(); idle?.stop(); opacity?.stop(); dotScale.set(1); dotOpacity.set(1); };
  }, [dotReady, desktopMotion, dotScale, dotOpacity]);

  return <LazyMotion features={domAnimation} strict><section id="intro" tabIndex={-1} aria-labelledby="intro-heading" data-film-scene="" className={`${heroMono.variable} scene-track hero-scene hero-scene--standalone`}>
    <div className="scene-stage"><div className="hero-composition">
      <div className="film-topline hero-topbar"><div className="hero-top-right">{confirmed(profile.location) && <p>{profile.location}</p>}<nav className="hero-shortcuts" aria-label={copy.shortcutsLabel}>{copy.shortcuts.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}</nav></div></div>
      <div className={`hero-layout${portrait ? "" : " hero-layout--text-only"}`}>
        <div className="hero-copy">
          {copy.role && <p className="hero-intro"><span>{copy.intro}</span><span className="hero-type-text"><span className="hero-type-reserve" aria-hidden="true">{copy.role}</span><m.span className="hero-type-active" aria-hidden="true">{typedRole}</m.span><span className="sr-only">{copy.role}</span></span><span className="hero-cursor" aria-hidden="true">_</span></p>}
          <h1 id="intro-heading" className="hero-name"><span className="sr-only">{profile.fullDisplayName}</span><span ref={word} className="hero-word" aria-hidden="true" data-dot-ready={dotReady}><span className="hero-native-name" data-hero-name-run="">{film.hero.name}</span><span className="hero-baseline" data-hero-baseline="" /><m.span className="hero-dot" style={{ scale: dotScale, opacity: dotOpacity }} /></span></h1>
          {copy.tagline && <p className="hero-tagline">{copy.tagline}</p>}
        </div>
        {portrait && <div ref={photoFrame} className="hero-photo-wrap">
          <div ref={photoEntrance} className="hero-photo-reveal"><img className="hero-portrait" data-photo-id={portrait.id} src={portrait.src} srcSet={portrait.srcSet} sizes="(max-width: 767px) clamp(220px, 60vw, 280px), clamp(300px, 25vw, 360px)" alt={portrait.alt} width={portrait.width} height={portrait.height} loading="eager" fetchPriority="high" decoding="async" /></div>
        </div>}
      </div>
      <div className="hero-bottom"><a className="film-scroll-link" href="#layer1" onClick={beginFoundation}>{film.hero.next}</a><span>{film.scroll}</span></div>
    </div></div>
  </section></LazyMotion>;
}
