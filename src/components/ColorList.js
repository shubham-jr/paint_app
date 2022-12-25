import { Component } from "react";
import actions from "../actions";
import { connect } from "react-redux";
class ColorList extends Component {
  onClickHandler = (event) => {
    console.log(event.target.className.split(" ")[1]);
    this.props.changeColor(event.currentTarget.className.split(" ")[1]);
  };
  render() {
    return (
      <>
        <div>
          <button
            onClick={this.onClickHandler}
            className="ui red button"
          ></button>
          <button
            onClick={this.onClickHandler}
            className="ui orange button"
          ></button>
          <button
            onClick={this.onClickHandler}
            className="ui yellow button"
          ></button>
          <button
            onClick={this.onClickHandler}
            className="ui olive button"
          ></button>
        </div>
        <div>
          <button
            onClick={this.onClickHandler}
            className="ui green button"
          ></button>
          <button
            onClick={this.onClickHandler}
            className="ui blue button"
          ></button>
          <button
            onClick={this.onClickHandler}
            className="ui violet button"
          ></button>
          <button
            onClick={this.onClickHandler}
            className="ui purple button"
          ></button>
        </div>
        <div>
          <button
            onClick={this.onClickHandler}
            className="ui pink button"
          ></button>
          <button
            onClick={this.onClickHandler}
            className="ui brown button"
          ></button>
          <button
            onClick={this.onClickHandler}
            className="ui grey button"
          ></button>
          <button
            onClick={this.onClickHandler}
            className="ui black button"
          ></button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {};
};

export default connect(mapStateToProps, {
  changeColor: actions.selectColorAction,
})(ColorList);
