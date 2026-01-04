import projectsJson from './projects.json';
import { CATEGORIES } from './categories';
import { Project } from '@/types';
import { getProjectMainImage } from '@/lib/projectImages';

export const projects: Project[] = projectsJson.map((project) => ({
  ...project,
  image: getProjectMainImage(project.id),
}));
