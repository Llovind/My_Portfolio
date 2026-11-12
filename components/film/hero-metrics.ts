/** Rasterize the complete native text run so kerning and tracking match the DOM. */
export function alignHeroDot(word: HTMLElement): boolean {
  word.dataset.dotMaskReady = "false";
  try {
    const run = word.querySelector<HTMLElement>("[data-hero-name-run]");
    const node = run?.firstChild;
    if (!run || !node || node.nodeType !== Node.TEXT_NODE) return false;
    const name = node.textContent ?? "", index = name.indexOf("i");
    if (index < 0) return false;
    const range = document.createRange();
    range.setStart(node, index); range.setEnd(node, index + 1);
    const cell = range.getBoundingClientRect(), bounds = word.getBoundingClientRect();
    const origin = run.getBoundingClientRect();
    const style = getComputedStyle(run), size = parseFloat(style.fontSize);
    if (cell.width <= 0 || size <= 0) return false;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx || !("letterSpacing" in ctx)) return false;
    const pad = Math.ceil(size * 0.5);
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    ctx.fontKerning = "normal";
    ctx.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
    const advance = ctx.measureText(name).width;
    if (Math.abs(advance - origin.width) > Math.max(2, size * 0.02)) return false;
    canvas.width = Math.ceil(advance + pad * 2);
    canvas.height = Math.ceil(size * 2.2);
    // Resizing a canvas resets its typography state.
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    ctx.fontKerning = "normal";
    ctx.letterSpacing = style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
    const baseline = Math.ceil(size * 1.5);
    ctx.fillText(name, pad, baseline);
    const x0 = Math.max(0, Math.floor(cell.left - origin.left + pad));
    const width = Math.max(1, Math.ceil(cell.width));
    const data = ctx.getImageData(x0, 0, width, canvas.height).data;
    const ink = (x: number, y: number) => data[(y * width + x) * 4 + 3];
    let top = -1, bottom = -1, left = width, right = -1;
    for (let y = 0; y < baseline; y++) {
      let found = false;
      for (let x = 0; x < width; x++) if (ink(x, y) > 100) {
        found = true; left = Math.min(left, x); right = Math.max(right, x);
      }
      if (found) { if (top < 0) top = y; bottom = y; }
      else if (top >= 0) break;
    }
    if (top < 0 || bottom - top > size * 0.26 || right <= left) return false;
    const histogram = Array.from({length:width},(_,x) => {
      let sum = 0;
      for (let y = Math.floor(baseline - size * 0.28); y < baseline - size * 0.06; y++) sum += ink(x,y);
      return sum;
    });
    const peak = Math.max(...histogram);
    if (peak <= 0) return false;
    const stemColumns = histogram.map((value,x)=>value >= peak * 0.85 ? x : -1).filter(x=>x>=0);
    const stemCenter = (stemColumns[0] + stemColumns[stemColumns.length - 1] + 1) / 2;
    const marker = word.querySelector<HTMLElement>("[data-hero-baseline]");
    if (!marker) return false;
    const baselineY = marker.getBoundingClientRect().top - bounds.top;
    const diameter = Math.max(right - left + 1, bottom - top + 1);
    const centerX = origin.left - bounds.left + x0 + stemCenter - pad;
    const centerY = baselineY + (top + bottom + 1) / 2 - baseline;
    if (centerX < 0 || centerX > bounds.width || centerY < 0 || centerY > bounds.height) return false;
    const holeLeft = x0 + left - pad - 1, holeRight = x0 + right - pad + 2;
    const runBaseline = marker.getBoundingClientRect().top - origin.top;
    const holeTop = runBaseline + top - baseline - 1, holeBottom = runBaseline + bottom - baseline + 2;
    word.style.setProperty("--hero-dot-left", `${centerX - diameter / 2}px`);
    word.style.setProperty("--hero-dot-top", `${centerY - diameter / 2}px`);
    word.style.setProperty("--hero-dot-size", `${diameter}px`);
    word.style.setProperty("--hero-dot-hole-left", `${holeLeft}px`);
    word.style.setProperty("--hero-dot-hole-right", `${holeRight}px`);
    word.style.setProperty("--hero-dot-hole-top", `${holeTop}px`);
    word.style.setProperty("--hero-dot-hole-bottom", `${holeBottom}px`);
    word.dataset.dotMaskReady = "true";
    return true;
  } catch {
    // Without trustworthy geometry, retain the complete white native i.
    return false;
  }
}
