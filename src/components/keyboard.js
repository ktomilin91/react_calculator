import React from "react";

// Renders the keyboard
// Receives functions clear(), decimal(), evaluate(), number(Number), operation(String)
export default function(props) {
  return (
    <div id="keyboard">
      <button id="clear" onClick={props.clear}>C</button>
      <button id="divide" onClick={() => props.operation("/")}>/</button>
      <button id="multiply" onClick={() => props.operation("*")}>x</button>
      <button id="seven" onClick={() => props.number(7)}>7</button>
      <button id="eight" onClick={() => props.number(8)}>8</button>
      <button id="nine" onClick={() => props.number(9)}>9</button>
      <button id="subtract" onClick={() => props.operation("-")}>-</button>
      <button id="four" onClick={() => props.number(4)}>4</button>
      <button id="five" onClick={() => props.number(5)}>5</button>
      <button id="six" onClick={() => props.number(6)}>6</button>
      <button id="add" onClick={() => props.operation("+")}>+</button>
      <button id="one" onClick={() => props.number(1)}>1</button>
      <button id="two" onClick={() => props.number(2)}>2</button>
      <button id="three" onClick={() => props.number(3)}>3</button>
      <button id="equals" onClick={props.evaluate}>=</button>
      <button id="zero" onClick={() => props.number(0)}>0</button>
      <button id="decimal" onClick={props.decimal}>.</button>
    </div>
  );
};