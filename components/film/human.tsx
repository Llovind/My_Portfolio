"use client";

import { humanChapter as text } from "@/content/profile";
import type { CSSProperties } from "react";
import { ScrollVisual } from "./scroll-visual";
import { Layer } from "./balanced";

// Split ridges form a familiar fingertip silhouette, rather than nested arches.
const contours = [
  "M25 93C35 42 72 10 120 10S205 42 215 93",
  "M16 122C11 162 23 203 47 230",
  "M224 120C229 174 214 227 190 265",
  "M39 137V113C39 68 75 32 120 32S201 68 201 113C201 174 187 220 169 255",
  "M39 162C41 192 54 219 70 239",
  "M60 142V116C60 83 87 55 120 55S180 83 180 116C180 171 169 220 148 263",
  "M60 168C63 196 77 220 91 237",
  "M81 144V120C81 98 98 78 120 78S159 98 159 120C159 171 145 220 124 254",
  "M81 169C84 192 96 211 108 222",
  "M101 149V123C101 111 109 101 120 101S139 111 139 123C139 157 132 188 120 211",
  "M102 173C105 185 109 193 114 199",
  "M120 124V149C120 162 117 175 113 185",
];

function HumanArtwork() {
  return <ScrollVisual kind="human" caption={text.illustration} className="story-artwork human-artwork">
    <div className="human-weave">
      <svg viewBox="0 0 1000 600" role="img" aria-label={text.artAlt}>
        <g transform="translate(260 20) scale(2)" className="human-guides" aria-hidden="true">{contours.map((d,i) => <path key={i} d={d} />)}</g>
        <g className="human-threads">
          <path data-thread-phase="0" className="human-thread--practice art-draw art-phase-a" pathLength="1" d="M80 125H205Q265 125 315 185L298 275" />
          <path data-thread-phase="1" className="human-thread--framework art-draw art-phase-b" pathLength="1" d="M920 125H800Q740 125 680 175L704 270" />
          <path data-thread-phase="2" className="human-thread--events art-draw art-phase-c" pathLength="1" d="M65 350H205Q255 350 312 390M935 350H795Q745 350 675 390" />
          <path data-thread-phase="3" className="human-thread--business art-draw art-phase-d" pathLength="1" d="M500 550V560Q500 580 480 580H285Q270 580 270 560V520Q270 500 250 500H80" />
        </g>
        <g transform="translate(260 20) scale(2)" className="human-contours">{contours.map((d, i) => <path className="human-contour art-draw" style={{ "--ridge-start": i * .018 } as CSSProperties} key={i} d={d} pathLength="1" />)}</g>
      </svg>
      <div className="human-contexts">{text.contexts.map(item => <div className={`human-context ${item.className}`} key={item.label} data-context-phase={item.className.includes("practice") ? 0 : item.className.includes("framework") ? 1 : item.className.includes("business") ? 3 : 2}><strong>{item.label}</strong><span>{item.detail}</span></div>)}</div>
    </div>
  </ScrollVisual>;
}
export function HumanScene() {
  return <Layer number={8} title={text.headline} className="balanced-human">
    <div className="human-story-window story-window" data-scroll-window="human"><div className="human-story-stage story-window-stage"><HumanArtwork />
    <div className="human-narrative">{text.moments.map((moment, index) => <article key={index} data-human-beat={index}><p>{moment.text}</p><small>{moment.reference}</small></article>)}</div></div></div>
  </Layer>;
}
