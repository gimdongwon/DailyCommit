import React, { Component } from "react";
import { connect } from "react-redux";
import Counter from "../components/Counter";
import { increment, decrement, multiply } from "../store/modules/counter";

class CounterContainer extends Component {
  handleIncrement = () => {
    this.props.increment();
  };
  handleDecrement = () => {
    this.props.decrement();
  };
  handleMultiply = () => {
    this.props.multiply();
  };

  render() {
    const { color, number } = this.props;
    return (
      <Counter
        color={color}
        value={number}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
        onMultiply={this.handleMultiply}
      />
    );
  }
}

const mapStateToProps = ({ counter }) => ({
  color: counter.color,
  number: counter.number
});

// const mapDispatchToProps = dispatch => ({
// increment: () => dispatch(increment()),
// decrement: () => dispatch(decrement()),
// bindActionCreators({increment, decrement}, dispatch);
// });

const mapDispatchToProps = { increment, decrement, multiply };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterContainer);
