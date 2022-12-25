import { getRadius } from "./formulaHelpers";
let X1, X2, Y1, Y2, ClientX, ClientY;
const getCoords = (height, width) => {
  return {
    x1: ClientX,
    y1: ClientY,
    x2: ClientX + width,
    y2: ClientY + height,
  };
};
const prepareForCoords = () => {
  let height = Y2 - Y1,
    width = X2 - X1;
  const coords = getCoords(height, width);
  return coords;
};
const circle = () => {
  const radius = getRadius(X1, Y1, X2, Y2);
  const coords = getCoords(radius, 0);
  return coords;
};

const setCordsAfterDrag = (x1, y1, x2, y2, clientX, clientY, shape) => {
  console.log({ x1, y1, x2, y2, clientX, clientY });
  let final_drag_coords;
  X1 = x1;
  Y1 = y1;
  X2 = x2;
  Y2 = y2;
  ClientX = clientX;
  ClientY = clientY;
  if (shape === "rectangle") final_drag_coords = prepareForCoords();
  else if (shape === "circle") final_drag_coords = circle();
  else if (shape === "oval") final_drag_coords = prepareForCoords();
  else if (shape === "line") final_drag_coords = prepareForCoords();
  else if (shape === "arc") final_drag_coords = prepareForCoords();
  return final_drag_coords;
};

export default setCordsAfterDrag;
