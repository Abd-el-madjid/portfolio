// File Location: src/utils/pageAssets.ts

/**
 * Smart Asset Loading System
 * - Pages load their folder assets automatically
 * - Projects page loads ONLY main images from JSON
 * - Project details load ALL images from that project folder
 * - Cache clears when leaving project details
 */

// Import all assets dynamically using Vite's glob
// Match all images in any folder
const allAssets = import.meta.glob(
  '../assets/**/*.png',
  {
    eager: true,
    import: 'default',
  }
) as Record<string, string>;



// Import projects data to get main images
import projectsData from '../../data/projects.json';

/**
 * Get assets for regular pages (home, about, services)
 * Loads ALL images from that page's folder
 */
export function getPageAssets(pageName: string): string[] {
  const folderPath = `../assets/${pageName}/`;
  const pageAssets: string[] = [];

  Object.entries(allAssets).forEach(([path, url]) => {
    if (path.startsWith(folderPath)) {
      pageAssets.push(url);
    }
  });

  return pageAssets;
}

/**
 * Get assets for PROJECTS PAGE
 * Only loads the MAIN images listed in projects.json (not all project images)
 */
export function getProjectsPageAssets(): string[] {
  const mainImages: string[] = [];

  projectsData.forEach(project => {
    // Only load images that start with 'src/app/assets' (local images)
    if (project.image && project.image.startsWith('src/app/assets')) {
      // Convert path to import format
      const imagePath = project.image.replace('src/app/assets', '../assets');
      
      // Find matching asset
      Object.entries(allAssets).forEach(([path, url]) => {
        if (path === imagePath) {
          mainImages.push(url);
        }
      });
    }
  });

  return mainImages;
}

/**
 * Get ALL assets for a specific project (for detail page)
 * Loads ALL images from that project's folder
 */
export function getProjectAssets(projectId: string): string[] {
  const folderPath = `../assets/projects/${projectId}/`;
  const projectAssets: string[] = [];

  Object.entries(allAssets).forEach(([path, url]) => {
    if (path.startsWith(folderPath)) {
      projectAssets.push(url);
    }
  });

  return projectAssets;
}

/**
 * Get all assets from entire assets directory (for debugging)
 */
export function getAllAssets(): string[] {
  return Object.values(allAssets);
}

/**
 * Export badge images for backward compatibility
 */
export const badgeImages = getPageAssets('home').filter(url => 
  url.includes('badge_pic')
);