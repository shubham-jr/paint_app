import { Component } from "react";
import ToolsArea from "./ToolsArea";
import DrawingArea from "./DrawingArea";
class App extends Component {
  render() {
    return (
      <div className="ui grid">
        <ToolsArea></ToolsArea>
        <DrawingArea></DrawingArea>
      </div>
    );
  }
}
export default App;
