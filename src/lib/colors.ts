import { ColorMapping } from '@/types';

export const getCategoryColors = (color: string): ColorMapping => {
  const colorMap: Record<string, ColorMapping> = {
    cyan: {
      dark: 'rgba(103, 183, 196, 1)',
      light: 'rgba(89, 161, 173, 1)',
      shadowDark: 'rgba(103, 183, 196, 0.3)',
      shadowLight: 'rgba(103, 183, 196, 0.2)'
    },
    purple: {
      dark: 'rgba(167, 139, 198, 1)',
      light: 'rgba(147, 119, 178, 1)',
      shadowDark: 'rgba(167, 139, 198, 0.3)',
      shadowLight: 'rgba(167, 139, 198, 0.2)'
    },
    green: {
      dark: 'rgba(115, 171, 153, 1)',
      light: 'rgba(99, 151, 133, 1)',
      shadowDark: 'rgba(115, 171, 153, 0.3)',
      shadowLight: 'rgba(115, 171, 153, 0.2)'
    },
    orange: {
      dark: 'rgba(217, 155, 124, 1)',
      light: 'rgba(197, 135, 104, 1)',
      shadowDark: 'rgba(217, 155, 124, 0.3)',
      shadowLight: 'rgba(217, 155, 124, 0.2)'
    },
    blue: {
      dark: 'rgba(119, 158, 203, 1)',
      light: 'rgba(103, 142, 187, 1)',
      shadowDark: 'rgba(119, 158, 203, 0.3)',
      shadowLight: 'rgba(119, 158, 203, 0.2)'
    },
    violet: {
      dark: 'rgba(155, 143, 194, 1)',
      light: 'rgba(135, 123, 174, 1)',
      shadowDark: 'rgba(155, 143, 194, 0.3)',
      shadowLight: 'rgba(155, 143, 194, 0.2)'
    },
    pink: {
      dark: 'rgba(213, 143, 169, 1)',
      light: 'rgba(203, 153, 179, 1)',
      shadowDark: 'rgba(213, 143, 169, 0.3)',
      shadowLight: 'rgba(213, 143, 169, 0.2)'
    }
  };

  return colorMap[color] || colorMap.blue;
};