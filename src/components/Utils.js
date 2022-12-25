import { Component } from "react";
import rough from "roughjs/bundled/rough.esm";
import helper from "../helpers/drawableObjHelper";
const generator = rough.generator();
class Utils extends Component {
  draw() {
    const canvas = document.getElementById("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.height, canvas.width); // save from re-drawing
    const roughCanvas = rough.canvas(canvas);
    this.drawElelments(roughCanvas);
  }

  drawElelments(roughCanvas) {
    this.state.elements.forEach((element) => {
      roughCanvas.draw(element.drawableObj);
    });
  }

  getOffest(x1, y1, x2, y2) {
    const offsetX = 240,
      offsetY = 0;
    return {
      x1: x1 - offsetX,
      y1: y1 - offsetY,
      x2: x2 - offsetX,
      y2: y2 - offsetY,
    };
  }

  createElement = (x1, y1, x2, y2, shape, color = undefined) => {
    let coords = { x1, y1, x2, y2 };
    if (!shape) return;
    let drawableObj;
    if (!this.state.dragElelment) coords = this.getOffest(x1, y1, x2, y2);
    if (shape === "rectangle")
      drawableObj = helper.rectangle(generator, coords, color);
    else if (shape === "line")
      drawableObj = helper.line(generator, coords, color);
    else if (shape === "oval")
      drawableObj = helper.ellipse(generator, coords, color);
    else if (shape === "circle")
      drawableObj = helper.circle(generator, coords, color);
    else if (shape === "arc")
      drawableObj = helper.arc(generator, coords, color);
    return { x1, x2, y1, y2, drawableObj, shape };
  };
}

export default Utils;
