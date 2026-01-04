// File Location: src/lib/projectImages.ts

const imageModules = import.meta.glob(
  '/src/app/assets/projects/**/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

// Fallback placeholder image (SVG data URI)
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e2e8f0" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="24"%3ENo Image Available%3C/text%3E%3C/svg%3E';

/**
 * Get all images for a specific project
 * Images must follow naming convention: {projectId}_1.png, {projectId}_2.png, etc.
 */
export const getProjectImages = (id: string): string[] => {
    const lowerId = id.toLowerCase();

  const images = Object.entries(imageModules)
    .filter(([path]) => path.includes(`/projects/${lowerId}/`))
    .map(([_, module]: [string, any]) => module.default ?? module)
    .filter((url: string) => {
      // Match files like: projectId_1.png, projectId_2.png
      const filename = url.split('/').pop() || '';
      return filename.startsWith(`${lowerId}_`);
    })
    .sort((a: string, b: string) => {
      const aNum = a.match(/_(\d+)\./)?.[1];
      const bNum = b.match(/_(\d+)\./)?.[1];
      return (Number(aNum) || 0) - (Number(bNum) || 0);
    });

  // Return placeholder if no images found
  return images.length > 0 ? images : [PLACEHOLDER_IMAGE];
};

/**
 * Get the main image (first image) for a project
 */
export const getProjectMainImage = (id: string): string => {
    const lowerId = id.toLowerCase();

  return getProjectImages(lowerId)[0];
};

/**
 * Check if a project has actual images (not just placeholder)
 */
export const hasProjectImages = (id: string): boolean => {
    const lowerId = id.toLowerCase();

  return Object.keys(imageModules).some(path => 
    path.includes(`/projects/${lowerId}/`)
  );
};

/**
 * Get all project IDs that have images
 */
export const getProjectsWithImages = (): string[] => {
  const projectIds = new Set<string>();
  
  Object.keys(imageModules).forEach(path => {
    const match = path.match(/\/projects\/([^\/]+)\//);
    if (match) {
      projectIds.add(match[1]);
    }
  });
  
  return Array.from(projectIds);
};

/**
 * Debug helper - logs all available image paths
 * Only runs in development mode
 */
export const debugImagePaths = (): void => {
  if (import.meta.env.DEV) {
    console.group('📸 Image Debug Info');
    console.log('Total images loaded:', Object.keys(imageModules).length);
    
    const projectMap = new Map<string, string[]>();
    
    Object.keys(imageModules).forEach(path => {
      const match = path.match(/\/projects\/([^\/]+)\//);
      if (match) {
        const projectId = match[1];
        if (!projectMap.has(projectId)) {
          projectMap.set(projectId, []);
        }
        projectMap.get(projectId)!.push(path);
      }
    });
    
    projectMap.forEach((paths, projectId) => {
      console.log(`\n${projectId}:`, paths.length, 'image(s)');
      paths.forEach(path => console.log('  -', path));
    });
    
    console.groupEnd();
  }
};