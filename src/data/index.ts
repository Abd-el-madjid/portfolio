// File Location: src/data/index.ts

import projectsJson from './projects.json';
import Content from './content.json';

import { CATEGORIES } from './categories';
import { Project } from '@/types';
import { 
  getProjectImages, 
  getProjectMainImage, 
  hasProjectImages,
  debugImagePaths 
} from '@/lib/projectImages';

// Debug image loading in development
if (import.meta.env.DEV) {
  debugImagePaths();
}
export const content = Content;
export const projects: Project[] = projectsJson.map(project => {
  const images = getProjectImages(project.id);
  const mainImage = images[0] ?? '';
  
  // Warn about missing images in development
  if (import.meta.env.DEV) {
    const hasImages = hasProjectImages(project.id);
    if (!hasImages) {
      console.warn(
        `⚠️ Project "${project.id}" has no images.\n` +
        `Expected files in: src/app/assets/projects/${project.id}/\n` +
        `Naming convention: ${project.id}_1.png, ${project.id}_2.png, etc.`
      );
    } else {
      console.log(`✅ Project "${project.id}" loaded ${images.length} image(s)`);
    }
  }

  return {
    ...project,
    image: mainImage,
    images,
  } as Project;
});

// Validate categories in development
if (import.meta.env.DEV) {
  projects.forEach(project => {
    if (!CATEGORIES[project.category as keyof typeof CATEGORIES]) {
      console.error(
        `❌ Project "${project.id}" has invalid category: "${project.category}"\n` +
        `Valid categories: ${Object.keys(CATEGORIES).join(', ')}`
      );
    }
  });
  
  console.log(`\n📦 Loaded ${projects.length} projects successfully`);
}