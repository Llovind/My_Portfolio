export type PhotoVariant = { src: string; width: number; height: number };
export type PhotoDefinition = { id: string; variants: readonly PhotoVariant[]; alt: string; caption: string; meta: string };
export type ResolvedPhoto = Omit<PhotoDefinition, "variants"> & PhotoVariant & { srcSet: string };
