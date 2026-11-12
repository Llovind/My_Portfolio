"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scroll, useReducedMotion } from "framer-motion";
import { balancedProfile as copy, chapterArt } from "@/content/profile";
import { FoundationArtwork, PeopleArtwork } from "./chapter-artworks";

export function Layer({ number, title, intro, children, className = "", id }: { number: number; title: string; intro?: string; children: ReactNode; className?: string; id?: string }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const work = Array.from(element.querySelectorAll<HTMLElement>(".work-entry"));
    const workLinks = Array.from(element.querySelectorAll<HTMLAnchorElement>(".work-time-spine a"));
    let stop: (() => void) | undefined;
    const setup = () => {
      stop?.(); element.style.removeProperty("--layer-progress");
      element.removeAttribute("data-current-work"); workLinks.forEach(link => link.removeAttribute("aria-current"));
      if (media.matches) stop = scroll((_progress: number, info) => {
        const axis = info.y;
        const p = Math.max(0, Math.min(1, (axis.current - axis.targetOffset + axis.containerLength) / Math.max(1, axis.targetLength + axis.containerLength)));
        element.style.setProperty("--layer-progress", String(p));
        if (work.length) {
          let current = 0;
          work.forEach((entry,index) => { if (entry.getBoundingClientRect().top < innerHeight * .5) current = index; });
          element.dataset.currentWork = String(current);
          workLinks.forEach((link,index) => index === current ? link.setAttribute("aria-current", "step") : link.removeAttribute("aria-current"));
        }
      }, { target: element, offset: ["start end", "end start"] });
    };
    setup(); media.addEventListener("change", setup);
    return () => { stop?.(); media.removeEventListener("change", setup); element.style.removeProperty("--layer-progress"); element.removeAttribute("data-current-work"); workLinks.forEach(link => link.removeAttribute("aria-current")); };
  }, [reduced]);
  return <section ref={root} id={`layer${number}`} tabIndex={-1} aria-labelledby={`layer${number}-heading`} className={`balanced-layer balanced-layer--${number} ${className}`} data-layer={number}>
    {id && <span id={id} className="layer-anchor" />}
    {[1,3,4,5].includes(number) && <span className="chapter-watermark" aria-hidden="true">{number}</span>}
    <header className="balanced-heading"><p className="balanced-kicker"><span>{String(number).padStart(2, "0")}</span>{copy.labels[number - 1]}</p><h2 id={`layer${number}-heading`}>{title}</h2>{intro && <p className="balanced-intro">{intro}</p>}</header>
    {children}
  </section>;
}

export function FoundationLayer() {
  const t = copy.foundation;
  return <Layer number={1} title={t.title} intro={t.intro} id="foundation">
    <div className="foundation-ledger visual-passage"><div className="foundation-visual"><FoundationArtwork /></div>
      <div className="foundation-narrative">{t.facts.map((fact, index) => <article className="narrative-step" key={fact.place}><span className="narrative-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p className="balanced-meta">{fact.date}</p><h3>{fact.place}</h3><p>{fact.text}</p>{fact.detail && <details className="story-detail"><summary>{copy.technicalLabel}</summary><p>{fact.detail}</p></details>}<small>{fact.scope}</small></article>)}</div>
    </div>
  </Layer>;
}

export function AppliedLayer() {
  const t = copy.applied;
  return <Layer number={2} title={t.title} intro={t.intro}>
    <div className="applied-layout"><aside className="work-time-spine" aria-label={chapterArt.timeline.label}><span className="work-year">{chapterArt.timeline.year}</span><div className="work-spine-line" aria-hidden="true"><i /></div><ol>{t.entries.map((entry,index) => <li key={entry.id}><a href={`#${entry.id}`}><span>{chapterArt.timeline.months[index]}</span><span>{entry.place}</span></a></li>)}</ol></aside>
    <div className="work-timeline">{t.entries.map((entry, index) => <article id={entry.id} key={entry.id} className="work-entry">
      <div className="work-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
      <div><p className="balanced-meta">{entry.date}<span className={entry.completed ? "completed-tag" : ""}>{entry.status}</span></p><h3>{entry.place}</h3><p className="work-role">{entry.role}</p><p>{entry.text}</p><p>{entry.detail}</p>{entry.technical && <details className="story-detail"><summary>{copy.technicalLabel}</summary><p>{entry.technical}</p></details>}
        {entry.metrics && <div className="offline-metrics"><p>{t.offline}</p><dl>{entry.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl></div>}
      </div>
    </article>)}</div></div>
  </Layer>;
}

export function LeadershipLayer() {
  const t = copy.leadership;
  return <Layer number={3} title={t.title} intro={t.intro}>
    <div className="people-layout visual-passage"><div className="people-visual"><PeopleArtwork /></div><div className="leadership-columns">{t.entries.map(entry => <article key={entry.place}><p className="balanced-meta">{entry.date}</p><h3>{entry.place}</h3><p className="work-role">{entry.role}</p><p>{entry.text}</p></article>)}</div></div>
  </Layer>;
}

