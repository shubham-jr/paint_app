import { Component } from "react";
import actions from "../actions";
import { connect } from "react-redux";
class MenuItem extends Component {
  changeSelectedToolHandler = (event) => {
    const currentActiveElement = document.getElementsByClassName("active");
    if (currentActiveElement.length) {
      currentActiveElement[0].className = "item";
    }
    this.props.selectToolAction(
      event.target.innerHTML.split(" ")[0].toLowerCase()
    );
    event.currentTarget.className += " active";
  };
  allItems = () => {
    const items = this.props.items.map((item, id) => {
      return (
        <a className="item" key={id} onClick={this.changeSelectedToolHandler}>
          {item}
        </a>
      );
    });
    return items;
  };
  render() {
    return (
      <div className="item ">
        <div className="header">{this.props.header}</div>
        <div className="menu">{this.allItems()}</div>
      </div>
    );
  }
}

export default connect(null, {
  selectToolAction: actions.selectToolAction,
})(MenuItem);
