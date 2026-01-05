import { ColorMapping } from '@/types';

export const getCategoryColors = (color: string): ColorMapping => {
  const colorMap: Record<string, ColorMapping> = {
    cyan: {
      dark: 'rgba(70, 130, 145, 1)',
      light: 'rgba(55, 110, 125, 1)',
      shadowDark: 'rgba(70, 130, 145, 0.3)',
      shadowLight: 'rgba(70, 130, 145, 0.2)'
    },
    purple: {
      dark: 'rgba(120, 95, 155, 1)',
      light: 'rgba(100, 75, 135, 1)',
      shadowDark: 'rgba(120, 95, 155, 0.3)',
      shadowLight: 'rgba(120, 95, 155, 0.2)'
    },
    green: {
      dark: 'rgba(80, 135, 115, 1)',
      light: 'rgba(65, 115, 95, 1)',
      shadowDark: 'rgba(80, 135, 115, 0.3)',
      shadowLight: 'rgba(80, 135, 115, 0.2)'
    },
    orange: {
      dark: 'rgba(165, 115, 85, 1)',
      light: 'rgba(145, 95, 70, 1)',
      shadowDark: 'rgba(165, 115, 85, 0.3)',
      shadowLight: 'rgba(165, 115, 85, 0.2)'
    },
    blue: {
      dark: 'rgba(85, 120, 165, 1)',
      light: 'rgba(70, 100, 145, 1)',
      shadowDark: 'rgba(85, 120, 165, 0.3)',
      shadowLight: 'rgba(85, 120, 165, 0.2)'
    },
    violet: {
      dark: 'rgba(110, 95, 150, 1)',
      light: 'rgba(90, 75, 130, 1)',
      shadowDark: 'rgba(110, 95, 150, 0.3)',
      shadowLight: 'rgba(110, 95, 150, 0.2)'
    },
    pink: {
      dark: 'rgba(165, 105, 130, 1)',
      light: 'rgba(145, 90, 115, 1)',
      shadowDark: 'rgba(165, 105, 130, 0.3)',
      shadowLight: 'rgba(165, 105, 130, 0.2)'
    }
  };

  return colorMap[color] || colorMap.blue;
};
