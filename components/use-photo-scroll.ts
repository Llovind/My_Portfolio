"use client";

import { useEffect, type RefObject } from "react";
import { scroll } from "framer-motion";

type PhotoMoment = "portrait" | "mentoring" | "zte-pitch" | "open-lab" | "exhibition" | "zte-team";

/** Enhance static photographs after hydration; media/focus changes restore the original styles. */
export function usePhotoScroll(ref: RefObject<HTMLElement | null>, moment: string) {
  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let revert = () => {};
    const setup = () => {
      revert();
      if (!media.matches || frame.contains(document.activeElement)) return;
      const image = frame.querySelector("img");
      if (!image) return;
      const originals = [frame, image].map(element => [element, element.getAttribute("style")] as const);
      const cleanups: Array<() => void> = [];
      revert = () => {
        cleanups.splice(0).reverse().forEach(cleanup => cleanup());
        originals.forEach(([element, style]) => style === null ? element.removeAttribute("style") : element.setAttribute("style", style));
      };
      try {
        const kind = moment as PhotoMoment;
        const portrait = kind === "portrait";
        const sideways = kind === "zte-pitch";
        const target = portrait ? frame.closest<HTMLElement>("#intro") ?? frame : frame;
        const options: NonNullable<Parameters<typeof scroll>[1]> = {
          target, offset: ["start end", "end start"],
        };
        const enterEnd = kind === "exhibition" ? 0.24 : kind === "zte-team" ? 0.28 : 0.2;
        const holdEnd = portrait ? 0.53 : 0.68;
        const clamp = (value: number) => Math.max(0, Math.min(1, value));
        // Explicit progress keeps photo motion independent of native timeline support.
        cleanups.push(scroll((_progress: number, info) => {
          const axis = info.y;
          const start = axis.targetOffset - axis.containerLength;
          const end = Math.min(axis.targetOffset + axis.targetLength, axis.scrollLength);
          const progress = clamp((axis.current - start) / Math.max(1, end - start));
          const entering = portrait ? 0 : 1 - clamp(progress / enterEnd);
          const leaving = portrait
            ? clamp((axis.current - axis.targetOffset - axis.targetLength * .12) / Math.max(1, axis.targetLength * .88))
            : clamp((progress - holdEnd) / (1 - holdEnd));
          const mobile = window.innerWidth < 768;
          const y = (mobile ? .45 : 1) * (entering * (portrait ? 24 : 36) - leaving * (portrait ? 48 : 32));
          frame.style.opacity = String((1 - 0.6 * entering) * (1 - leaving));
          frame.style.transform = `translateY(${y}px)${portrait ? ` scale(${1 - 0.02 * Math.max(entering, leaving)})` : ""}`;
          if (!portrait) {
            frame.style.clipPath = sideways
              ? `inset(0 ${(mobile ? 24 : 72) * entering}% 0 ${16 * leaving}%)`
              : `inset(${(mobile ? 18 : 42) * entering + 16 * leaving}% 0 0 0)`;
          }
          if (kind === "mentoring") image.style.transform = `scale(${1 + 0.04 * entering})`;
        }, options));
      } catch (error) {
        revert();
        if (process.env.NODE_ENV !== "production") console.error("Photo scroll setup failed", moment, error);
      }
    };
    const showForFocus = () => revert();
    const afterFocus = (event: FocusEvent) => { if (!frame.contains(event.relatedTarget as Node | null)) setup(); };
    media.addEventListener("change", setup);
    frame.addEventListener("focusin", showForFocus);
    frame.addEventListener("focusout", afterFocus);
    setup();
    return () => {
      media.removeEventListener("change", setup);
      frame.removeEventListener("focusin", showForFocus);
      frame.removeEventListener("focusout", afterFocus);
      revert();
    };
  }, [ref, moment]);
}
