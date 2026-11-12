"use client";

import { useRef, useState } from "react";
import { usePhotoScroll } from "./use-photo-scroll";
import { PhotoLightbox } from "./photo-lightbox";
import { photoViewer } from "@/content/profile";
import type { ResolvedPhoto } from "@/lib/photo-types";

export function PhotoFigure({ photo, sizes }: { photo: ResolvedPhoto; sizes: string }) {
  const frame = useRef<HTMLAnchorElement>(null);
  usePhotoScroll(frame, photo.id);
  const [open, setOpen] = useState(false);
  const preview = photo.id === "zte-pitch";
  return <figure className="documentary-photo" data-photo-id={photo.id}>
    <a ref={frame} className="documentary-photo-link" href={photo.src} aria-haspopup={preview ? "dialog" : undefined} title={preview ? photoViewer.open : undefined} onClick={preview ? event => { if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); setOpen(true); } } : undefined}><img src={photo.src} srcSet={photo.srcSet} sizes={sizes} alt={photo.alt} width={photo.width} height={photo.height} style={{ aspectRatio: `${photo.width} / ${photo.height}`, objectFit: "contain" }} loading="lazy" decoding="async" />{preview && <span className="photo-preview-hint">{photoViewer.open}</span>}</a>
    <figcaption><p>{photo.caption}</p><span>{photo.meta}</span></figcaption>
    {open && <PhotoLightbox photo={photo} onClose={() => setOpen(false)} returnFocus={frame} />}
  </figure>;
}
