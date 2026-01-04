import projectsJson from './projects.json';
import { CATEGORIES } from './categories';
import { Project } from '@/types';
import { getProjectImages, getProjectMainImage } from '@/lib/projectImages';

export const projects: Project[] = projectsJson.map(project => {
  const images = getProjectImages(project.id);

  return {
    ...project,
    image: images[0] ?? '',
    images
  };
});
