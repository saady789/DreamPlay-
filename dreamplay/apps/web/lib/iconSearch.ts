import Fuse from "fuse.js";

let fuse: Fuse<string> | null = null;
let iconList: string[] = [];

export function initializeIconSearch(icons: string[]) {
  iconList = icons;
  fuse = new Fuse(icons, {
    includeScore: true,
    threshold: 0.35, // good balance
  });
}

export function getClosestIcon(query: string): string | null {
  if (!fuse) {
    console.warn("Fuse not initialized");
    return null;
  }

  const results = fuse.search(query);

  // TS understands "results[0]" is defined inside this block
  const first = results[0];
  if (!first) return null;

  return first.item;
}

export function getIconUrl(iconName: string | null): string | null {
  if (!iconName) return null;
  return `https://api.iconify.design/fluent-emoji-flat/${iconName}.svg`;
}
//1st-place-medal.svg

//https://api.iconify.design/collection?prefix=fluent-emoji-flat
