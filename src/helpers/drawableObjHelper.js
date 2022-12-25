import { getRadius } from "./formulaHelpers";
const rectangle = (generator, coords, color) => {
  const { x1, y1, x2, y2 } = coords;
  return generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
    fill: color,
    fillStyle: "solid",
  });
};
const line = (generator, coords, color) => {
  const { x1, y1, x2, y2 } = coords;
  return generator.line(x1, y1, x2, y2, { fill: color, fillStyle: "solid" });
};
const circle = (generator, coords, color) => {
  const { x1, y1, x2, y2 } = coords;
  const diameter = 2 * getRadius(x1, y1, x2, y2);
  return generator.circle(x1, y1, diameter, {
    fill: color,
    fillStyle: "solid",
  });
};
const ellipse = (generator, coords, color) => {
  const { x1, y1, x2, y2 } = coords;
  return generator.ellipse((x1 + x2) / 2, (y1 + y2) / 2, x2 - x1, y2 - y1, {
    fill: color,
    fillStyle: "solid",
  });
};
const arc = (generator, coords, color) => {
  const { x1, y1, x2, y2 } = coords;
  return generator.arc(
    (x1 + x2) / 2,
    (y1 + y2) / 2,
    x2 - x1,
    y2 - y1,
    Math.PI,
    Math.PI * 1.6,
    false,
    { fill: color, fillStyle: "solid" }
  );
};

const shapesDrawableObj = { rectangle, line, circle, ellipse, arc };
export default shapesDrawableObj;
