import projectsJson from './projects.json';
import categoriesJson from './categories.json';

import { Project, CategoryData } from '@/types';

// Typed exports
export const projects = projectsJson as Project[];

export const CATEGORIES = categoriesJson as Record<string, CategoryData>;
