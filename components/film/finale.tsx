import { finale as text } from "@/content/profile";
import { heroMono } from "@/app/fonts/hero-fonts";

export function FinaleScene() {
  return <section id="finale" tabIndex={-1} aria-labelledby="finale-heading" data-film-scene="" className={`${heroMono.variable} finale-scene`}>
    <div className="finale-main">
      <div className="finale-copy"><h2 id="finale-heading">{text.headline}</h2><p>{text.availability}</p>
        {text.email && <a className="finale-email" href={`mailto:${text.email}`}><span className="finale-link-label">{text.emailLabel}</span><span className="finale-email-address">{text.email}<span aria-hidden="true">{text.arrow}</span></span></a>}
        {text.links.length > 0 && <nav className="finale-links" aria-label={text.linksLabel}>{text.links.map(link => <a key={link.label} href={link.href} className={link.href.startsWith("/cv/") ? "finale-cv" : undefined} download={link.href.startsWith("/cv/") || undefined}>{link.label}<span aria-hidden="true">{text.arrow}</span></a>)}</nav>}
      </div>
    </div>
    <footer className="finale-bottom"><div className="finale-identity"><span>{text.name}</span>{text.location && <span className="finale-location">{text.location}</span>}</div><a className="finale-back" href="#intro"><span className="finale-back-label">{text.back}</span><span aria-hidden="true">{text.arrow}</span></a></footer>
  </section>;
}
