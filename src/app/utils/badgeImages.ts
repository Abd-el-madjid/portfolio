// badgeImages.ts
/**
 * This file handles dynamic loading of badge images.
 * Works with Vite/React or other bundlers that support import.meta.glob
 */

// Dynamically import all badge images in the folder
const badgeModules = import.meta.glob('../assets/home/badge_pic_*.jpg', { eager: true });

// Convert imported modules to an array of image URLs
export const badgeImages: string[] = Object.values(badgeModules).map(
  (mod: any) => mod.default
);

/**
 * Get the total number of badge images
 */
export const totalBadgeImages = badgeImages.length;

/**
 * Load a badge image by index
 * Returns the image URL or empty string if index is invalid
 */
export async function loadImage(index: number): Promise<string> {
  if (index < 0 || index >= badgeImages.length) return '';
  return badgeImages[index];
}

/**
 * Optional: Preload the next image in memory (for smooth rotation)
 */
export function preloadNextImage(index: number): void {
  const nextIndex = index + 1;
  if (nextIndex >= badgeImages.length) return;
  const img = new Image();
  img.src = badgeImages[nextIndex];
}
