import { useState } from "react";

export function useImageLoader() {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  function handleImageLoad(url: string) {
    setLoadedImages((prev) => new Set(prev).add(url));
  }

  function resetLoadedImages() {
    setLoadedImages(new Set());
  }

  function isImageLoaded(url: string): boolean {
    return loadedImages.has(url);
  }

  return {
    loadedImages,
    handleImageLoad,
    resetLoadedImages,
    isImageLoaded,
  };
}
