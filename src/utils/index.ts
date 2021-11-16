export const computeSize = (size: number) => {
  if (size < 1024) {
    return size + 'B';
  }
  size = parseInt(size / 1024 + '', 10);
  if (size < 1024) {
    return size + 'K';
  }
  size = parseInt(size / 1024 + '', 10);
  if (size < 1024) {
    return size + 'M';
  }

  size = Number((size / 1024).toFixed(2));
  return size + 'G';
};
