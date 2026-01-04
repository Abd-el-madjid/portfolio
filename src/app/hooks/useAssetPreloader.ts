import { useState, useEffect } from 'react';
import { badgeImages } from '../utils/badgeImages';

interface PreloadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export function useAssetPreloader() {
  const [progress, setProgress] = useState<PreloadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const preloadAssets = async () => {
      const assets = [
        // Badge images
        ...badgeImages,
        // Add other critical assets here
      ];

      const total = assets.length;
      let loaded = 0;

      setProgress({ loaded, total, percentage: 0 });

      // Preload images
      const imagePromises = assets.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          
          img.onload = () => {
            loaded++;
            const percentage = (loaded / total) * 100;
            setProgress({ loaded, total, percentage });
            resolve();
          };

          img.onerror = () => {
            // Still count as loaded to prevent hanging
            loaded++;
            const percentage = (loaded / total) * 100;
            setProgress({ loaded, total, percentage });
            resolve();
          };

          img.src = src;
        });
      });

      try {
        // Wait for all assets
        await Promise.all(imagePromises);

        // Ensure minimum loading time for smooth UX (optional)
        if (Date.now() - startTime < 1000) {
          await new Promise(resolve => 
            setTimeout(resolve, 1000 - (Date.now() - startTime))
          );
        }

        setProgress({ loaded: total, total, percentage: 100 });
        
        // Small delay before marking complete
        setTimeout(() => {
          setIsComplete(true);
        }, 300);

      } catch (error) {
        console.error('Error preloading assets:', error);
        setIsComplete(true);
      }
    };

    const startTime = Date.now();
    preloadAssets();
  }, []);

  return { progress, isComplete };
}