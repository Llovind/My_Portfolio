"use client";

import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { ResolvedPhoto } from "@/lib/photo-types";
import { photoViewer as text } from "@/content/profile";

export function PhotoLightbox({ photo, onClose, returnFocus }: { photo: ResolvedPhoto; onClose: () => void; returnFocus: RefObject<HTMLAnchorElement | null> }) {
  const modal = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = modal.current;
    if (!dialog) return;
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.documentElement.style.overflow = overflow;
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [returnFocus]);
  return createPortal(<dialog ref={modal} className="photo-dialog" aria-labelledby="photo-dialog-caption" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="photo-dialog-panel"><button type="button" autoFocus onClick={onClose}>{text.close}</button><figure><img src={photo.src} srcSet={photo.srcSet} sizes="90vw" alt={photo.alt} width={photo.width} height={photo.height} decoding="async" /><figcaption id="photo-dialog-caption"><p>{photo.caption}</p><span>{photo.meta}</span></figcaption></figure></div>
  </dialog>, document.body);
}
