import projectsJson from './projects.json';
import { CATEGORIES } from './categories'; // correct import
import { Project, CategoryData } from '@/types';

// Typed exports
export const projects = projectsJson as Project[];
