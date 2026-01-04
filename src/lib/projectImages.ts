// src/lib/projectImages.ts
const imageModules = import.meta.glob(
  '/src/app/assets/projects/**/**_*.png',
  { eager: true } // eager ensures we get the real URLs immediately
);

export const getProjectImages = (id: string): string[] => {
  return Object.values(imageModules) // values are the hashed URLs
    .filter((url: any) => (url as string).includes(`/${id}/${id}_`))
    .sort((a: any, b: any) => {
      const aNum = (a as string).match(/_(\d+)\./)?.[1];
      const bNum = (b as string).match(/_(\d+)\./)?.[1];
      return (Number(aNum) || 0) - (Number(bNum) || 0);
    }) as string[];
};

export const getProjectMainImage = (id: string): string => {
  return getProjectImages(id)[0] ?? '';
};
