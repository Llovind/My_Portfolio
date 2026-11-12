import { resolvePhoto } from "@/lib/photos";
import type { PhotoDefinition } from "@/lib/photo-types";
import { PhotoFigure } from "./photo-figure";

export function PhotoEssay({ photos, paired = false }: { photos: readonly PhotoDefinition[]; paired?: boolean }) {
  const existing = photos.flatMap(photo => { const asset = resolvePhoto(photo); return asset ? [asset] : []; });
  if (!existing.length) return null;
  return <div className={`photo-essay${paired ? " photo-essay--people" : ""}`}>
    {existing.map((photo, index) => <PhotoFigure key={photo.id} photo={photo} sizes={paired && index > 0 ? "(max-width: 767px) calc(100vw - 48px), (max-width: 1904px) calc(45.8vw - 96px), calc(50vw - 176px)" : "(max-width: 767px) calc(100vw - 48px), (max-width: 1904px) calc(91.6vw - 164px), calc(100vw - 324px)"} />)}
  </div>;
}
