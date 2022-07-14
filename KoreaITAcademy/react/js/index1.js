"use strict";

var C = React.createClass({
  displayName: "C",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        null,
        this.props.color
      ),
      React.createElement(
        "p",
        null,
        this.props.name
      ),
      React.createElement(
        "p",
        null,
        this.props.size
      )
    );
  }
});

var B = React.createClass({
  displayName: "B",

  render: function render() {
    return React.createElement(C, this.props);
  }
});

var A = React.createClass({
  displayName: "A",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(B, this.props)
    );
  }
});

ReactDOM.render(React.createElement(
  "div",
  null,
  React.createElement(A, { color: "red", name: "빨강", size: "small" })
), document.querySelector("#container"));