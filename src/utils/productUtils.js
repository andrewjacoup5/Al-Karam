/**
 * Sorts an array of image paths based on the requested priority:
 * 1.*, 2.*, 3.*, 4.*, then the rest alphabetically.
 * Handles case insensitivity.
 * 
 * @param {string[]} images - Array of image paths.
 * @returns {string[]} - Sorted array of image paths.
 */
export function getSortedGalleryImages(images) {
  if (!images || !Array.isArray(images) || images.length === 0) return [];

  const getSortScore = (img) => {
    if (!img) return 1000;
    const filename = img.split("/").pop().toLowerCase();
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf(".")) || filename;

    if (nameWithoutExt === "1") return 1;
    if (nameWithoutExt === "2") return 2;
    if (nameWithoutExt === "3") return 3;
    if (nameWithoutExt === "4") return 4;

    return 100; // Remaining images
  };

  return [...images].sort((a, b) => {
    const scoreA = getSortScore(a);
    const scoreB = getSortScore(b);

    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }

    // Alphabetical fallback for remaining files
    return a.localeCompare(b);
  });
}

/**
 * Returns the main product image (1.* if it exists, otherwise the first sorted image).
 * 
 * @param {string[]} images - Array of image paths.
 * @returns {string|null} - Main image path or null.
 */
export function getMainProductImage(images) {
  if (!images || !Array.isArray(images) || images.length === 0) return null;
  const sorted = getSortedGalleryImages(images);
  return sorted[0] || null;
}
