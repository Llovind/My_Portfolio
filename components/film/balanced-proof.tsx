import { balancedProfile as copy } from "@/content/profile";
import { Layer } from "./balanced";
import { ProofMotion } from "./proof-motion";

const categoryPaths = [
  "M12 3L21 7V13C21 18 17 21 12 23C7 21 3 18 3 13V7ZM8 12L11 15L17 9",
  "M5 20H19A5 5 0 0 0 19 10A7 7 0 0 0 5 8A6 6 0 0 0 5 20Z",
  "M8 5L2 12L8 19M16 5L22 12L16 19M14 3L10 21",
  "M12 3V12M3 21V12H21V21M9 1H15V6H9ZM1 19H5V23H1ZM19 19H23V23H19Z",
  "M4 6L12 12L20 4M12 12L5 21M12 12L21 20M2 4H6V8H2ZM18 2H22V6H18ZM3 19H7V23H3ZM19 18H23V22H19Z",
];

export function ProofLayer() {
  const t = copy.proof;
  return <Layer number={6} title={t.title} className="proof-layer">
    <ProofMotion><div><h3>{t.competitionsLabel}</h3><ol className="competition-record">{t.competitions.map(item => <li key={item.event} data-proof-entry="competition"><h4>{item.event}</h4><p>{item.project}</p>{item.detail && <small>{item.detail}</small>}<div className="proof-stamp"><span className="finalist-label">{t.finalist}</span></div></li>)}</ol></div>
      <div><h3>{t.heldLabel}</h3><ul className="certification-record">{t.held.map(item => <li key={item.name} data-proof-entry="credential"><svg className="proof-check" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path pathLength="1" d="M7 12L10.5 15.5L17 9" /></svg><div><span>{item.name}</span>{item.issuer && <small>{item.issuer}</small>}</div></li>)}</ul><div className="certification-progress" data-proof-entry="progress"><span>{t.progressLabel}</span><p>{t.progress}</p></div></div>
    </ProofMotion>
  </Layer>;
}

export function StackLayer() {
  const t = copy.stack;
  return <Layer number={7} title={t.title} className="stack-layer">
    <dl className="stack-record">{t.groups.map((group,index) => <div key={group.name} id={`stack-${index + 1}`}><dt><a href={`#stack-${index + 1}`}><svg viewBox="0 0 26 26" aria-hidden="true"><path d={categoryPaths[index]} /></svg><span>{group.name}</span></a></dt><dd><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></dd></div>)}</dl>
    <p className="stack-direction"><span>{t.directionLabel}</span>{t.direction}</p>
  </Layer>;
}
