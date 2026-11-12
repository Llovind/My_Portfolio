import { chapterArt as text } from "@/content/profile";
import { projectArt as project, topologyArt } from "@/content/projects";
import { ScrollVisual } from "./scroll-visual";

export function FoundationArtwork() {
  const t = text.foundation;
  return <ScrollVisual kind="foundation" caption={text.illustration}>
    <div className="foundation-drawing">
    <svg viewBox="0 0 720 500" role="img" aria-label={t.alt}>
      <path className="art-gridline" d="M0 125H720M0 250H720M0 375H720M180 0V500M360 0V500M540 0V500" />
      <path className="art-track" d="M35 375C140 375 85 120 215 120S280 250 345 250" />
      <path className="art-draw art-phase-a foundation-cable" pathLength="1" d="M35 375C140 375 85 120 215 120S280 250 345 250" />
      <circle className="art-terminal" cx="35" cy="375" r="8" />
      <g className="foundation-switch"><rect x="315" y="200" width="150" height="100" rx="12" /><path d="M335 226h110M335 240h60" />{[0,1,2,3,4,5].map(i => <rect key={i} x={335+i*18} y="265" width="10" height="15" rx="1" />)}</g>
      {[100,200,300,400].map((y,i) => <g key={y}><path className={`art-draw art-phase-${i<2?'b':'c'} foundation-branch`} pathLength="1" d={`M465 250H495Q515 250 515 ${y<250?230:270}V${y}H520`} /><rect className="foundation-endpoint" x="520" y={y-28} width="195" height="56" rx="8" /></g>)}
    </svg>
    <span className="foundation-attached foundation-attached--origin">{t.origin}</span>
    <span className="foundation-attached foundation-attached--center">{t.center}</span>
    {t.endpoints.map((label,i) => <span key={label} className="foundation-attached foundation-attached--endpoint" style={{top:`${[20,40,60,80][i]}%`}}>{label}</span>)}
    <span className="art-corner-number" aria-hidden="true">01</span>
    </div>

  </ScrollVisual>;
}

export function PeopleArtwork() {
  const t = text.people;
  return <ScrollVisual kind="people" caption={text.illustration}>
    <svg viewBox="0 0 720 350" role="img" aria-label={t.alt}>
      <g className="people-bubble people-bubble--first"><path d="M95 75H425Q445 75 445 95V215Q445 235 425 235H225L165 285V235H95Q75 235 75 215V95Q75 75 95 75Z" /><path className="art-draw art-phase-a" pathLength="1" d="M125 125H330M125 155H270M125 185H190" /></g>
      <g className="people-bubble people-bubble--second"><path d="M340 35H620Q640 35 640 55V175Q640 195 620 195H560L610 245L510 195H340Q320 195 320 175V55Q320 35 340 35Z" /><path className="art-draw art-phase-b" pathLength="1" d="M370 85H585M370 115H525M370 145H460" /></g>
      <path className="people-connection art-draw art-phase-c" pathLength="1" d="M245 275C345 345 495 325 540 250" />
      <circle className="people-point" cx="540" cy="250" r="8" />
    </svg>
    <div className="people-art-words"><span>{t.member}</span><span>{t.teaching}</span></div>
  </ScrollVisual>;
}

export function SignalArtwork() {
  const t = topologyArt.cta;
  return <ScrollVisual kind="signal">
    <div className="network-board cta-board cta-bench">
      <svg viewBox="0 0 720 460" role="img" aria-label={t.alt}>
        <path className="bench-guide" d="M15 320H705M220 55V365M505 55V365" />
        <g className="stream-source"><rect x="24" y="157" width="135" height="82" rx="8" /><path d="M42 178H130M42 197H113M42 216H122" /></g>
        <g className="cpe-hardware"><path d="M280 224V115M435 224V115" /><circle cx="280" cy="115" r="4" /><circle cx="435" cy="115" r="4" /><rect x="250" y="224" width="215" height="90" rx="14" /><path d="M270 247H445M270 298H445" />{[0,1,2,3,4].map(i => <rect className="cpe-port" key={i} x={285+i*28} y="264" width="14" height="16" rx="2" />)}</g>
        <g className="core-hardware"><rect x="573" y="94" width="123" height="220" rx="12" />{[0,1,2].map(i => <g key={i}><path d={`M588 ${140+i*60}H681`} /><circle cx="594" cy={122+i*60} r="3" /><path d={`M610 ${122+i*60}H665`} /></g>)}</g>
        <path className="bench-wire art-draw art-phase-a" pathLength="1" data-route-path="cta-stream" d="M159 198H205Q225 198 225 218V249Q225 269 245 269H250" />
        <path className="bench-wire bench-wire--request art-draw art-phase-b" pathLength="1" data-route-path="cta-request" d="M465 269H495Q520 269 520 244V185Q520 160 545 160H573" />
        <path className="core-priority art-draw art-phase-c" pathLength="1" d="M585 94H684Q696 94 696 106V302Q696 314 684 314H585Q573 314 573 302V106Q573 94 585 94Z" />
        <g className="bench-ports" aria-hidden="true">{[[159,198],[250,269],[465,269],[573,160]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />)}</g>
        <circle className="bench-puck bench-puck--stream" data-route-marker="cta-stream" data-route-phase="0" cx="250" cy="269" r="5" /><circle className="bench-puck" data-route-marker="cta-request" data-route-phase="1" cx="573" cy="160" r="6" />
      </svg>
      {t.nodes.map((node,i) => <div className={`network-node cta-node cta-node--${i}`} key={node.name}><strong>{node.name}</strong>{node.detail && <span>{node.detail}</span>}</div>)}
      <span className="network-note">{t.note}</span><span className="network-request">{t.request}</span>
    </div>
  </ScrollVisual>;
}

export function DataArtwork() {
  const t = project.data;
  return <ScrollVisual kind="data" caption={project.illustration}>
    <svg viewBox="0 0 720 460" role="img" aria-label={t.alt}>
      <g className="data-paper data-paper--back"><path d="M70 100H265L305 140V350H70Z" /><path d="M265 100V140H305M100 170H265M100 205H225M100 240H245M100 275H195" /></g>
      <g className="data-paper data-paper--middle"><path d="M115 70H310L350 110V320H115Z" /><path d="M310 70V110H350M145 140H305M145 175H265M145 210H285M145 245H245" /></g>
      <g className="data-paper data-paper--front"><path d="M160 40H355L395 80V290H160Z" /><path d="M355 40V80H395M190 110H350M190 145H310M190 180H330M190 215H290" /></g>
      <path className="data-route art-draw art-phase-b" pathLength="1" d="M395 180H430Q456 180 456 210V260H476" />
      <circle className="data-evidence art-draw art-phase-c" pathLength="1" cx="570" cy="260" r="94" />
      <text className="data-rca" x="570" y="278" textAnchor="middle">{t.rca}</text>
    </svg>
    <span className="art-label data-input">{t.input}</span><span className="art-label data-output">{t.output}</span>
  </ScrollVisual>;
}

export function IdentityArtwork() {
  const t = topologyArt.trust;
  return <ScrollVisual kind="identity" caption={project.illustration}>
    <div className="network-board trust-board">
      <svg viewBox="0 0 720 490" role="img" aria-label={t.alt}>
        <defs><marker id="trust-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L9 5L1 9" /></marker></defs>
        {[95,215,335].map((y,i) => <g key={y}><circle className="trust-person" cx="55" cy={y} r="13" /><path className={`network-wire art-draw art-phase-${i===0?'a':i===1?'b':'c'}`} pathLength="1" d={`M68 ${y}H125V190H200`} /></g>)}
        <rect className="network-device" x="200" y="135" width="170" height="110" rx="10" /><rect className="network-device" x="460" y="135" width="215" height="110" rx="10" />
        <path className="network-wire network-wire--decision art-draw art-phase-b" pathLength="1" markerEnd="url(#trust-arrow)" d="M370 190H460" />
        <path className="network-wire art-draw art-phase-c" pathLength="1" d="M568 245V335H290V360M568 335H640V360M405 335V360M523 335V360" />
        {[255,370,488,605].map(x => <g key={x}><rect className="trust-host" x={x} y="360" width="70" height="50" rx="5" /><path className="trust-host-light" d={`M${x+12} 377h25M${x+12} 390h45`} /></g>)}
      </svg>
      <div className="trust-personas"><strong>{t.personas}</strong><span>{t.mfa}</span></div>
      <div className="network-node trust-node trust-node--identity"><strong>{t.identity}</strong><span>{t.identityDetail}</span></div>
      <div className="network-node trust-node trust-node--network"><strong>{t.network}</strong><span>{t.networkDetail}</span></div>
      <span className="trust-lab-label">{t.lab}</span>
    </div>
  </ScrollVisual>;
}

export function SocArtwork() {
  const t = topologyArt.soc;
  return <ScrollVisual kind="soc">
    <div className="soc-flow soc-flow--wide">
      <svg viewBox="0 0 1000 560" role="img" aria-label={t.alt}>
        {[30,280,530,780].map(x => <rect key={x} className="soc-component" x={x} y="100" width="190" height="100" rx="10" />)}
        <path className="bench-wire art-draw art-phase-a" pathLength="1" data-route-path="soc-ingress" d="M220 150H280" />
        <path className="bench-wire art-draw art-phase-a" pathLength="1" data-route-path="soc-alerts" d="M470 150H530" />
        <path className="bench-wire bench-wire--request art-draw art-phase-b" pathLength="1" data-route-path="soc-call" d="M720 150H780" />
        <path className="bench-wire bench-wire--prediction art-draw art-phase-c" pathLength="1" data-route-path="soc-return" d="M875 200V300Q875 320 855 320H645Q625 320 625 300V200" />
        <path className="bench-wire bench-wire--request art-draw art-phase-d" pathLength="1" data-route-path="soc-response" d="M580 200V410Q580 430 560 430H470" />
        <rect className="soc-response-device" x="250" y="390" width="220" height="80" rx="10" />
        <g className="bench-ports" aria-hidden="true">{[[220,150],[280,150],[470,150],[530,150],[720,150],[780,150],[875,200],[625,200],[580,200],[470,430]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />)}</g>
        {[['soc-ingress',0,280,150],['soc-alerts',0,530,150],['soc-call',1,780,150],['soc-return',2,625,200],['soc-response',3,470,430]].map(([id,phase,x,y]) => <circle key={id} className={`bench-puck${phase===2?' bench-puck--prediction':''}`} data-route-marker={id} data-route-phase={phase} cx={x} cy={y} r="5" />)}
      </svg>
      {t.nodes.map((name,i) => <div className="soc-component-label" style={{left:`${3+i*25}%`}} key={name}><strong>{name}</strong></div>)}
      <span className="soc-return-label">{t.prediction}</span><div className="soc-block-label"><strong>{t.response}</strong></div>
    </div>
    <div className="soc-flow soc-flow--narrow">
      <svg viewBox="0 0 400 650" role="img" aria-label={t.alt}>
        {[30,170,310,450].map(y => <rect key={y} className="soc-component" x="70" y={y} width="260" height="86" rx="10" />)}
        <path className="bench-wire art-draw art-phase-a" pathLength="1" data-route-path="soc-mobile-ingress" d="M200 116V170" />
        <path className="bench-wire art-draw art-phase-a" pathLength="1" data-route-path="soc-mobile-alerts" d="M200 256V310" />
        <path className="bench-wire bench-wire--request art-draw art-phase-b" pathLength="1" data-route-path="soc-mobile-call" d="M200 396V450" />
        <path className="bench-wire bench-wire--prediction art-draw art-phase-c" pathLength="1" data-route-path="soc-mobile-return" d="M330 493H355Q375 493 375 473V373Q375 353 355 353H330" />
        <path className="bench-wire bench-wire--request art-draw art-phase-d" pathLength="1" data-route-path="soc-mobile-response" d="M70 353H35Q15 353 15 373V580Q15 600 35 600H100" />
        <rect className="soc-response-device" x="100" y="560" width="200" height="80" rx="10" />
        <g className="bench-ports" aria-hidden="true">{[[200,116],[200,170],[200,256],[200,310],[200,396],[200,450],[330,493],[330,353],[70,353],[100,600]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" />)}</g>
        {[['soc-mobile-ingress',0,200,170],['soc-mobile-alerts',0,200,310],['soc-mobile-call',1,200,450],['soc-mobile-return',2,330,353],['soc-mobile-response',3,100,600]].map(([id,phase,x,y]) => <circle key={id} className={`bench-puck${phase===2?' bench-puck--prediction':''}`} data-route-marker={id} data-route-phase={phase} cx={x} cy={y} r="5" />)}
      </svg>
      {t.nodes.map((name,i) => <div className="soc-component-label" style={{top:`${(30+i*140)/650*100}%`}} key={name}><strong>{name}</strong></div>)}
      <span className="soc-return-label">{t.prediction}</span><div className="soc-block-label"><strong>{t.response}</strong></div>
    </div>
  </ScrollVisual>;
}

export function WebLoopArtwork() {
  const t = project.web;
  return <ScrollVisual kind="web" caption={project.illustration}>
    <svg viewBox="0 0 720 490" role="img" aria-label={t.alt}>
      <circle className="web-boundary" cx="360" cy="245" r="180" />
      <path className="web-loop art-draw art-phase-b" pathLength="1" d="M360 65A180 180 0 0 1 360 425A180 180 0 0 1 360 65Z" />
      <path className="web-arrow" d="M531 234L540 245L549 234" />
      {[[-155.8845727,90],[155.8845727,90],[0,-180]].map(([x,y],i) => <circle className={`web-role web-role--${i}`} key={i} cx={360+x} cy={245+y} r="12" />)}
    </svg>
    <span className="web-center">{t.center}</span><span className="art-label web-role-label web-role-label--0">{t.roles[0]}</span><span className="art-label web-role-label web-role-label--1">{t.roles[1]}</span><span className="art-label web-role-label web-role-label--2">{t.roles[2]}</span>
  </ScrollVisual>;
}
