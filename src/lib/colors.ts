import { ColorMapping } from '@/types';

export const getCategoryColors = (color: string): ColorMapping => {
  const colorMap: Record<string, ColorMapping> = {
    cyan: {
      dark: 'rgba(6, 182, 212, 1)',
      light: 'rgba(8, 145, 178, 1)',
      shadowDark: 'rgba(6, 182, 212, 0.3)',
      shadowLight: 'rgba(6, 182, 212, 0.2)',
    },
    purple: {
      dark: 'rgba(168, 85, 247, 1)',
      light: 'rgba(147, 51, 234, 1)',
      shadowDark: 'rgba(168, 85, 247, 0.3)',
      shadowLight: 'rgba(168, 85, 247, 0.2)',
    },
    green: {
      dark: 'rgba(16, 185, 129, 1)',
      light: 'rgba(13, 148, 136, 1)',
      shadowDark: 'rgba(16, 185, 129, 0.3)',
      shadowLight: 'rgba(16, 185, 129, 0.2)',
    },
    orange: {
      dark: 'rgba(251, 146, 60, 1)',
      light: 'rgba(239, 68, 68, 1)',
      shadowDark: 'rgba(251, 146, 60, 0.3)',
      shadowLight: 'rgba(251, 146, 60, 0.2)',
    },
    blue: {
      dark: 'rgba(59, 130, 246, 1)',
      light: 'rgba(79, 70, 229, 1)',
      shadowDark: 'rgba(59, 130, 246, 0.3)',
      shadowLight: 'rgba(59, 130, 246, 0.2)',
    },
    violet: {
      dark: 'rgba(139, 92, 246, 1)',
      light: 'rgba(124, 58, 237, 1)',
      shadowDark: 'rgba(139, 92, 246, 0.3)',
      shadowLight: 'rgba(139, 92, 246, 0.2)',
    },
  };

  return colorMap[color] || colorMap.blue;
};
