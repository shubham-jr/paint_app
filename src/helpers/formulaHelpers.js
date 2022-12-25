export const getRadius = (x1, y1, x2, y2) => {
  return parseInt(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
};
