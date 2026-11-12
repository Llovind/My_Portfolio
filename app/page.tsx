import { FilmHUD } from "@/components/film/hud";
import { HeroScene } from "@/components/film/hero";
import { FoundationLayer, AppliedLayer, LeadershipLayer } from "@/components/film/balanced";
import { BuildsLayer, SecurityLayer } from "@/components/film/balanced-builds";
import { ProofLayer, StackLayer } from "@/components/film/balanced-proof";
import { HumanScene } from "@/components/film/human";
import { film, profilePhotos } from "@/content/profile";
import { resolvePhoto } from "@/lib/photos";
import { PhotoEssay } from "@/components/photo-essay";
import { FinaleScene } from "@/components/film/finale";

export default function Home() {
  return <>
    <a className="skip-link" href="#main">{film.skip}</a>
    <FilmHUD />
    <main id="main" className="film-main" tabIndex={-1}>
      <HeroScene portrait={resolvePhoto(profilePhotos.portrait)} />
      <FoundationLayer />
      <PhotoEssay photos={[profilePhotos.mentoring]} />
      <AppliedLayer />
      <LeadershipLayer />
      <BuildsLayer />
      <SecurityLayer />
      <ProofLayer />
      <StackLayer />
      <HumanScene />
      <PhotoEssay photos={[profilePhotos.openLab, profilePhotos.exhibition, profilePhotos.zteTeam]} paired />
      <FinaleScene />
    </main>
  </>;
}
