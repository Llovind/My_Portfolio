import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { balancedBuilds as builds, balancedSecurity as security, projectPhotos } from '@/content/projects';
import { PhotoEssay } from '@/components/photo-essay';
import { balancedProfile } from '@/content/profile';
import { Layer } from './balanced';
import { SignalArtwork, DataArtwork, IdentityArtwork, WebLoopArtwork, SocArtwork } from './chapter-artworks';

export function BuildsLayer() {
  return <Layer number={4} title={builds.title} intro={builds.intro}>
    <div className="build-editorials">{builds.projects.map((project,index) => <div key={project.name} className={`build-story build-story--${index}`}>
      <div className={`build-passage visual-passage${index === 0 ? ' story-window story-window--cta' : ''}`} {...(index === 0 ? {'data-scroll-window':'cta'} : {})}><div className="build-passage-stage story-window-stage"><article>
        <h3>{project.decision}</h3><p className="build-project-name">{project.name}</p><p>{project.text}</p>
        <p className="project-scope-copy">{project.scope}</p><details className="story-detail"><summary>{balancedProfile.technicalLabel}</summary><p>{project.detail}</p></details>
      </article><div className="build-visual">{index === 0 ? <SignalArtwork /> : <DataArtwork />}</div></div></div>
      {index === 0 && <div className="build-pitch"><PhotoEssay photos={[projectPhotos.ztePitch]} /></div>}
    </div>)}</div>
    <div className="build-evidence">{builds.evidence.map(asset => {
      const path = join(process.cwd(), 'public', asset.src);
      if (!existsSync(path)) return process.env.NODE_ENV === 'development' ? <p key={asset.src}>{builds.missing}: {asset.src}</p> : null;
      const bytes = readFileSync(path);
      if (bytes.length < 24 || !bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return null;
      return <figure key={asset.src}><img src={asset.src} alt={asset.alt} width={bytes.readUInt32BE(16)} height={bytes.readUInt32BE(20)} loading="lazy" /><figcaption>{asset.caption}</figcaption></figure>;
    })}</div>
  </Layer>;
}

export function SecurityLayer() {
  return <Layer number={5} title={security.title} intro={security.intro}>
    <div className="security-path">
      <div className="soc-feature visual-passage story-window story-window--soc" data-scroll-window="soc"><div className="soc-stage story-window-stage"><article className="soc-reprise"><h3>{security.soc.decision}</h3><p className="build-project-name">{security.soc.name}</p><p>{security.soc.text}</p><a className="security-backlink" href={security.soc.href}>{security.soc.link}<span aria-hidden="true"> ↗</span></a></article><SocArtwork /></div></div>
      <div className="security-passage security-passage--identity visual-passage"><div className="security-visual"><IdentityArtwork /></div><article><h3>{security.trust.decision}</h3><p className="build-project-name">{security.trust.name}</p><p>{security.trust.text}</p></article></div>
      <div className="security-passage security-passage--web visual-passage"><article><h3>{security.afferent.decision}</h3><p className="build-project-name">{security.afferent.name}</p><p>{security.afferent.text}</p><p className="security-scope">{security.afferent.scope}</p><details className="story-detail"><summary>{security.afferent.mappingLabel}</summary><p>{security.afferent.mapping}</p></details></article><div className="security-visual"><WebLoopArtwork /></div></div>
    </div>
  </Layer>;
}
