// src/lib/projectImages.ts
const imageModules = import.meta.glob(
  '/src/app/assets/projects/*/*.png',
  { eager: true }
);

export const getProjectImages = (id: string): string[] => {
  return Object.values(imageModules)
    .map((module: any) => (module as any).default ?? module) // get real URL
    .filter((url: string) => url.includes(`/${id}/${id}_`))
    .sort((a: string, b: string) => {
      const aNum = a.match(/_(\d+)\./)?.[1];
      const bNum = b.match(/_(\d+)\./)?.[1];
      return (Number(aNum) || 0) - (Number(bNum) || 0);
    });
};

export const getProjectMainImage = (id: string): string => {
  return getProjectImages(id)[0] ?? '';
};
