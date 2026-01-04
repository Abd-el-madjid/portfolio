const imageModules = import.meta.glob(
  '/src/app/assets/projects/**/**_*.png',
  { eager: true }
);

export const getProjectImages = (id: string): string[] => {
  return Object.keys(imageModules)
    .filter(path => path.includes(`/${id}/${id}_`))
    .sort((a, b) => {
      const aNum = a.match(/_(\d+)\./)?.[1];
      const bNum = b.match(/_(\d+)\./)?.[1];
      return (Number(aNum) || 0) - (Number(bNum) || 0);
    });
};

export const getProjectMainImage = (id: string): string => {
  return getProjectImages(id)[0] ?? '';
};
