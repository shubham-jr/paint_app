import Utils from "./Utils";
import { getRadius } from "../helpers/formulaHelpers";
import setCordsAfterDrag from "../helpers/setShapeCoordsAfterDrag";
class Operation extends Utils {
  setOperation() {
    const operatorList1 = ["rectangle", "line", "oval", "circle", "arc"];
    const operatorList2 = [
      "drag",
      "undo",
      "redo",
      "color",
      "text",
      "freehand",
      "erase",
    ];
    const operator = this.props.selectedShape;
    let operation = null;
    if (operatorList1.includes(operator)) {
      operation = "draw";
    } else if (operatorList2.includes(operator)) operation = operator;
    console.log(operation);
    this.setState({ operation });
  }
  operationDraw(event) {
    const { clientX, clientY } = event;
    const index = this.state.elements.length - 1;
    let shallowElement = [...this.state.elements];
    const { x1, y1 } = shallowElement[index];
    const updatedDrawableObj = this.createElement(
      x1,
      y1,
      clientX,
      clientY,
      this.props.selectedShape
    );
    shallowElement[index] = updatedDrawableObj;
    this.setState({ elements: shallowElement });
  }
  operationDrag(event) {
    const { clientX, clientY } = event;
    const index = this.state.dragElement.index;
    let shallowElement = [...this.state.elements];
    const { x1, y1, x2, y2, shape, drawableObj } = shallowElement[index];
    const color = drawableObj.options.fill;
    const {
      x1: X1,
      y1: Y1,
      x2: X2,
      y2: Y2,
    } = setCordsAfterDrag(x1, y1, x2, y2, clientX, clientY, shape);
    console.log(X1, Y1, X2, Y2);
    const updatedDrawableObj = this.createElement(X1, Y1, X2, Y2, shape, color);
    shallowElement[index] = updatedDrawableObj;
    this.setState({ elements: shallowElement });
  }

  operationRedoAndUndoHelper(state) {
    const copyElements = [...state.elements];
    if (!copyElements.length) return null;
    const index = copyElements.length - 1;
    const updatedElements = copyElements.slice(0, index);
    const copyUndoElements = state.undoAndRedoElements
      ? [...state.undoAndRedoElements]
      : null;
    console.log("previous element", copyUndoElements);

    const setUndoElements = copyUndoElements
      ? [...copyUndoElements, copyElements[index]]
      : [copyElements[index]];
    console.log("updated undo", setUndoElements);
    return { setUndoElements, updatedElements };
  }

  operationUndo() {
    if (!this.state.elements.length) return;
    const { setUndoElements, updatedElements } =
      this.operationRedoAndUndoHelper(this.state);
    this.setState({
      elements: updatedElements,
      undoAndRedoElements: setUndoElements,
    });
  }
  operationRedo() {
    if (
      !this.state.undoAndRedoElements ||
      !this.state.undoAndRedoElements.length
    )
      return;
    const state = this.state;
    const copyElements = [...state.undoAndRedoElements];
    const index = copyElements.length - 1;
    const updatedElements = copyElements.slice(0, index);
    const copyUndoElements = state.elements ? [...state.elements] : null;
    console.log("previous element", copyUndoElements);
    const setUndoElements = copyUndoElements
      ? [...copyUndoElements, copyElements[index]]
      : [copyElements[index]];
    this.setState({
      elements: setUndoElements,
      undoAndRedoElements: updatedElements,
    });
  }
  deleteElementByIndex(index) {
    const elementsAfterDeletion = this.state.elements.splice(index, 1);
    return elementsAfterDeletion;
  }
  operationErase(clientX, clientY) {
    const index = this.isCursorInsideThenGetIndex(clientX, clientY);
    console.log(index, clientX, clientY);

    if (index > -1) {
      this.deleteElementByIndex(index);
    }
  }
  operationColor(clientX, clientY) {
    const index = this.isCursorInsideThenGetIndex(clientX, clientY);
    console.log(index);
    if (index === -1) return;
    const copyElements = [...this.state.elements];
    const { x1, y1, x2, y2, shape } = copyElements[index];
    const color = this.props.selectedColor;
    const updatedColoredElement = this.createElement(
      x1,
      y1,
      x2,
      y2,
      shape,
      color
    );
    console.log(updatedColoredElement);
    copyElements[index] = updatedColoredElement;
    this.setState({ elements: copyElements });
  }
  setCordsOnMouseDown(clientX, clientY) {
    const drawableObj = this.createElement(
      clientX,
      clientY,
      clientX,
      clientY,
      this.props.selectedShape
    );
    this.setState((prevState, props) => ({
      elements: [...prevState.elements, drawableObj],
    }));
  }
  isPointsInsideCircle(x1, y1, x2, y2, clientX, clientY) {
    const radius = getRadius(x1, y1, x2, y2);

    const Xmin = x1 - radius,
      Xmax = x1 + radius,
      Ymin = y1 - radius,
      Ymax = y1 + radius;
    return clientX > Xmin && clientX < Xmax && clientY > Ymin && clientY < Ymax
      ? true
      : false;
  }
  isCursorInsideThenGetIndex(clientX, clientY) {
    let found_first = false,
      Index = -1;

    this.state.elements.forEach((element, index) => {
      if (found_first) return;
      const { x1, y1, x2, y2, shape } = element;
      const X1 = Math.min(x1, x2),
        X2 = Math.max(x1, x2),
        Y1 = Math.min(y1, y2),
        Y2 = Math.max(y1, y2);
      if (
        (X1 < clientX && X2 > clientX && Y1 < clientY && Y2 > clientY) ||
        (shape === "circle" &&
          this.isPointsInsideCircle(x1, y1, x2, y2, clientX, clientY))
      ) {
        found_first = true;
        Index = index;
      }
    });
    return Index;
  }
  setDragElement(clientX, clientY) {
    const index = this.isCursorInsideThenGetIndex(clientX, clientY);
    if (index > -1)
      this.setState({ dragElement: { x: clientX, y: clientY, index } });
  }
}

export default Operation;
