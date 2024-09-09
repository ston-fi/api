export const normalizeDate = (date: Date) => {
  return date.toISOString().split(".")[0];
};
