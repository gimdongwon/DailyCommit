import React from "react";
import "./Counter";

const Counter = ({ value, color, onIncrement, onDecrement, onMultiply }) => {
  return (
    <div className="Counter">
      <h1 style={{ color }}>{value}</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onMultiply}>*2</button>
    </div>
  );
};

export default Counter;
