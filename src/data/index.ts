import projectsJson from './projects.json';
import { CATEGORIES } from './categories';
import { Project } from '@/types';
import { getProjectImages, getProjectMainImage } from '@/lib/projectImages';

export const projects: Project[] = projectsJson.map(project => {
  const images = getProjectImages(project.id); // all images (hashed)
  const mainImage = images[0] ?? '';           // main image (first one)

  return {
    ...project,
    image: mainImage,
    images, // array of all images
  };
});
