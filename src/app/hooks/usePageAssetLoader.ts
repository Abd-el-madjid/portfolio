// File Location: src/hooks/usePageAssetLoader.ts

import { useState, useEffect, useRef } from 'react';

interface AssetLoaderResult {
  isLoading: boolean;
  progress: number;
  error: Error | null;
  clearCache: () => void;
}

// Global cache shared across all hook instances
const globalCache = new Set<string>();

export function usePageAssetLoader(
  assets: string[], 
  enabled: boolean = true,
  cacheKey?: string // Used to identify project detail caches to clear
): AssetLoaderResult {
  const [isLoading, setIsLoading] = useState(enabled);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const currentCacheKey = useRef<string | undefined>(cacheKey);

  // Clear cache function
  const clearCache = () => {
    if (currentCacheKey.current) {
      // Remove only assets with this cache key (project assets)
      assets.forEach(asset => globalCache.delete(asset));
    }
  };

  useEffect(() => {
    currentCacheKey.current = cacheKey;

    if (!enabled || !assets.length) {
      setIsLoading(false);
      setProgress(100);
      return;
    }

    // Filter out already loaded assets from global cache
    const assetsToLoad = assets.filter(asset => !globalCache.has(asset));
    
    if (!assetsToLoad.length) {
      // All assets already in cache
      setIsLoading(false);
      setProgress(100);
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setError(null);

    const loadAssets = async () => {
      try {
        const total = assetsToLoad.length;
        let loaded = 0;

        const promises = assetsToLoad.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            
            img.onload = () => {
              loaded++;
              globalCache.add(src); // Add to global cache
              setProgress((loaded / total) * 100);
              resolve();
            };

            img.onerror = () => {
              loaded++;
              globalCache.add(src); // Still mark as "loaded" to avoid retry
              setProgress((loaded / total) * 100);
              resolve();
            };

            img.src = src;
          });
        });

        await Promise.all(promises);
        
        // Minimum display time for smooth UX
        await new Promise(resolve => setTimeout(resolve, 600));
        
        setProgress(100);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    loadAssets();
  }, [assets, enabled, cacheKey]);

  return { isLoading, progress, error, clearCache };
}