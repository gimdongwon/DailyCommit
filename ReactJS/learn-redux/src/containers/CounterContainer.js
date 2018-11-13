import React, { Component } from "react";
import { connect } from "react-redux";
import Counter from "../components/Counter";
import { increment, decrement } from "../store/modules/counter";

class CounterContainer extends Component {
  handleIncrement = () => {
    this.props.increment();
  };
  handleDecrement = () => {
    this.props.decrement();
  };

  render() {
    const { color, number } = this.props;
    return (
      <Counter
        color={color}
        value={number}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
      />
    );
  }
}

const mapStateToProps = ({ counter }) => ({
  color: counter.get("color"),
  number: counter.get("number")
});

// const mapDispatchToProps = dispatch => ({
// increment: () => dispatch(increment()),
// decrement: () => dispatch(decrement()),
// bindActionCreators({increment, decrement}, dispatch);
// });

const mapDispatchToProps = { increment, decrement };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);
