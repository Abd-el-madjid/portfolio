// File Location: src/hooks/useImagePreloader.ts

import { useState, useEffect } from 'react';

interface PreloaderOptions {
  minLoadTime?: number; // Minimum time to show loading (ms)
  onProgress?: (progress: number) => void;
}

interface PreloaderResult {
  isLoading: boolean;
  progress: number;
  loadedCount: number;
  totalCount: number;
  errors: string[];
}

/**
 * Preloads images and tracks real loading progress
 * @param imageUrls - Array of image URLs to preload
 * @param options - Configuration options
 */
export function useImagePreloader(
  imageUrls: string[],
  options: PreloaderOptions = {}
): PreloaderResult {
  const { minLoadTime = 1000, onProgress } = options;
  
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  
  const totalCount = imageUrls.length;

  useEffect(() => {
    if (totalCount === 0) {
      setIsLoading(false);
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    let completed = 0;
    const imagePromises: Promise<void>[] = [];

    // Preload each image
    imageUrls.forEach((url, index) => {
      // Skip data URIs (like placeholders)
      if (url.startsWith('data:')) {
        completed++;
        const newProgress = Math.round((completed / totalCount) * 100);
        setProgress(newProgress);
        setLoadedCount(completed);
        onProgress?.(newProgress);
        return;
      }

      const promise = new Promise<void>((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          completed++;
          const newProgress = Math.round((completed / totalCount) * 100);
          setProgress(newProgress);
          setLoadedCount(completed);
          onProgress?.(newProgress);
          resolve();
        };
        
        img.onerror = () => {
          completed++;
          setErrors(prev => [...prev, url]);
          const newProgress = Math.round((completed / totalCount) * 100);
          setProgress(newProgress);
          setLoadedCount(completed);
          onProgress?.(newProgress);
          console.warn(`Failed to load image: ${url}`);
          resolve();
        };
        
        img.src = url;
      });

      imagePromises.push(promise);
    });

    // Wait for all images to load
    Promise.all(imagePromises).then(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      // Ensure minimum load time for smooth UX
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    });

  }, [imageUrls, totalCount, minLoadTime, onProgress]);

  return {
    isLoading,
    progress,
    loadedCount,
    totalCount,
    errors,
  };
}

/**
 * Get critical images that should be preloaded
 * (Main project images, hero images, etc.)
 */
export function getCriticalImages(): string[] {
  const images: string[] = [];
  
  // Import all project main images dynamically
  const imageModules = import.meta.glob(
    '/src/app/assets/projects/**/*_1.{png,jpg,jpeg,webp}',
    { eager: true }
  );

  Object.values(imageModules).forEach((module: any) => {
    const url = module.default ?? module;
    if (url && !url.startsWith('data:')) {
      images.push(url);
    }
  });

  return images;
}

/**
 * Get all images for comprehensive preloading
 */
export function getAllProjectImages(): string[] {
  const images: string[] = [];
  
  const imageModules = import.meta.glob(
    '/src/app/assets/projects/**/*.{png,jpg,jpeg,webp}',
    { eager: true }
  );

  Object.values(imageModules).forEach((module: any) => {
    const url = module.default ?? module;
    if (url && !url.startsWith('data:')) {
      images.push(url);
    }
  });

  return images;
}