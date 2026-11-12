import { existsSync } from "node:fs";
import { join } from "node:path";
import type { PhotoDefinition, ResolvedPhoto } from "./photo-types";

export function resolvePhoto(photo: PhotoDefinition): ResolvedPhoto | null {
  const variants = photo.variants.filter(item => existsSync(join(process.cwd(), "public", item.src.slice(1))));
  if (!variants.length) return null;
  const largest = variants[variants.length - 1];
  return { id: photo.id, alt: photo.alt, caption: photo.caption, meta: photo.meta, ...largest, srcSet: variants.map(item => `${item.src} ${item.width}w`).join(", ") };
}
