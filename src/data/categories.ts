
import {  CategoryData } from '@/types';

export const CATEGORIES: Record<string, CategoryData> = {
  'AI & Telecom': {
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600', // Tailwind classes directly
  },
  'AI & NLP': {
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
  },
  'AI & Healthcare': {
    color: 'green',
    gradient: 'from-green-500 to-teal-600',
  },
  'Web & FinTech': {
    color: 'orange',
    gradient: 'from-orange-500 to-red-600',
  },
  'Data & AI': {
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
  },
  'Web & Education': {
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
  },
  'Mobile Apps': {
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
  },
};
