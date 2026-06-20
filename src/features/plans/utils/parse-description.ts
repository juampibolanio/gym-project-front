export const parseDescription = (description?: string | null): string[] => {
  if (!description) return ['Sin beneficios especificados'];
  return description.split('\n').filter((item) => item.trim() !== '');
};
