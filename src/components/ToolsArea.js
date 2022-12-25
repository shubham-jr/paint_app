import { Component } from "react";
import MenuItem from "./MenuItem";
import ColorList from "./ColorList";
import { connect } from "react-redux";

class ToolsArea extends Component {
  render() {
    return (
      <div className="grey three wide column">
        <h1 style={{ textAlign: "center" }}>Paint App</h1>
        <div className="ui vertical menu">
          <MenuItem
            header="Shapes"
            items={["Rectangle ▭", "Circle ●", "Oval ⬬", "Line |", "arc ("]}
          ></MenuItem>
          <MenuItem
            header="Tools"
            items={[
              "Drag",
              "Erase",
              "Text",
              "Undo",
              "Redo",
              "pencil",
              "text",
              "Color",
            ]}
          ></MenuItem>
          {this.props.isColorMenuSelected ? <ColorList /> : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isColorMenuSelected: state.selectedTool === "color" ? true : false };
};

export default connect(mapStateToProps)(ToolsArea);
