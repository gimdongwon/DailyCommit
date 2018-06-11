import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0,
    message: ""
  };

  handleInc = () => {
    this.setState({
      count: this.state.count + 1,
      message: "덧셈성공"
    });
  };

  handleDec = () => {
    this.setState({
      count: this.state.count - 1,
      message: "밸셈성공"
    });
  };
  render() {
    return (
      <div className="App">
        <h1>react 아이스크림</h1>
        <div>{this.state.count}</div>
        <div>{this.state.message}</div>
        <button onClick={this.handleInc}>+</button>
        <button onClick={this.handleDec}>-</button>
        {console.log(this.state)}
      </div>
    );
  }
}

export default App;
