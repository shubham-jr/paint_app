import Operation from "./Operation";
import { connect } from "react-redux";
class DrawingArea extends Operation {
  state = {
    operation: null,
    elements: [],
    dragElement: null,
    undoAndRedoElements: null,
  };

  componentDidUpdate() {
    console.log(this.state);
    this.draw();
  }

  onMouseDownHandler = (event) => {
    const { clientX, clientY } = event;
    const shapes = ["rectangle", "oval", "circle", "line", "arc"];
    const selectedTool = this.props.selectedShape;
    if (selectedTool === "drag") this.setDragElement(clientX, clientY);
    else if (selectedTool === "undo") this.operationUndo();
    else if (selectedTool === "redo") this.operationRedo();
    else if (selectedTool === "erase") this.operationErase(clientX, clientY);
    else if (selectedTool === "color") this.operationColor(clientX, clientY);
    else if (shapes.includes(selectedTool))
      this.setCordsOnMouseDown(clientX, clientY);
    this.setOperation();
  };
  onMouseMoveHandler = (event) => {
    if (this.state.operation === "draw") {
      this.operationDraw(event);
    } else if (this.state.operation === "drag" && this.state.dragElement) {
      this.operationDrag(event);
    }
  };
  onMouseUpHandler = (event) => {
    this.setState({ operation: null, dragElement: null });
  };
  render() {
    return (
      <div className="thirteen wide column">
        <canvas
          id="canvas"
          onMouseDown={this.onMouseDownHandler}
          onMouseMove={this.onMouseMoveHandler}
          onMouseUp={this.onMouseUpHandler}
        ></canvas>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedShape: state.selectedTool,
    selectedColor: state.selectedColor,
  };
};

export default connect(mapStateToProps)(DrawingArea);
