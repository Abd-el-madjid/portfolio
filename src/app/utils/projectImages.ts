const imageModules = import.meta.glob(
  '/src/app/assets/projects/**/**_1*.png',
  { eager: true }
);

export const getProjectMainImage = (id: string): string => {
  const match = Object.keys(imageModules).find(
    path => path.includes(`/${id}/${id}_1`)
  );

  return match ?? '';
};

export const getProjectImages = (id: string): string[] => {
  return Object.keys(imageModules)
    .filter(path => path.includes(`/${id}/${id}_`))
    .sort();
};
