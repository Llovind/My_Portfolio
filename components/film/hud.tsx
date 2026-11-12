import { film } from '@/content/profile';
import { LayerNavigation } from './layer-navigation';

export function FilmHUD() {
  return <aside className="film-hud" aria-label={film.navLabel}>
    <p className="hud-heading">{film.navHeading}</p>
    <LayerNavigation />
  </aside>;
}
