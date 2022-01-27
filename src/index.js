import "./main.scss"

import React, {Component} from "react";
import ReactDOM from "react-dom";
import Display from "./components/display";
import Keyboard from "./components/keyboard";
import Footer from "./components/footer";

// Regular Expressions used by App class
const twoOpsRegex = /\s[\+-\/\*]\s-\s$/;
const lastOpRegex = /\s[\+-\/\*]\s$/;
const decimalNumberRegex = /[0-9]+\.[0-9]*$/;
const incompleteDecimalRegex = /\.$/;
const infinityRegex = /Infinity$/i;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: ""
    };
    this.clear = this.clear.bind(this);
    this.evaluate = this.evaluate.bind(this);
    this.decimal = this.decimal.bind(this);
    this.number = this.number.bind(this);
    this.operation = this.operation.bind(this);
  }

  // The "C" button of the calculator
  // Resets the input
  clear() {
    this.setState({
      expression: ""
    });
  }

  // Evaluates the current expression
  evaluate() {
    let expression = this.state.expression;
    if (!expression) return;
    // Checking for an operation sign(s) or "." at the end of the expression and removing them 
    if (twoOpsRegex.test(expression)) expression = expression.replace(twoOpsRegex, "");
    if (lastOpRegex.test(expression)) expression = expression.replace(lastOpRegex, "");
    if (incompleteDecimalRegex.test(expression)) expression = expression + "0";
    // Evaluating the expression string
    expression = Function("'use strict'; return " + expression)();
    // Updating the State
    this.setState({
      expression: "" + expression
    });
  }

  // Adds a decimal separator
  decimal() {
    let expression = this.state.expression;
    // Exiting if the current number is already a decimal or expression is Infinity
    if (infinityRegex.test(expression)) return;
    if (decimalNumberRegex.test(expression)) return;
    // Adding "0" before the separator if there's no preceding digit
    if (!expression) expression = "0";
    if (twoOpsRegex.test(expression) || expression === " - ") expression = expression.trim() + "0";
    if (lastOpRegex.test(expression)) expression = expression + "0";
    // Appending the decimal separator and updating the State
    expression = expression + ".";
    this.setState({
      expression: expression
    });
  }

  // Appends a new digit to the end of the expression
  number(n) {
    let expression = this.state.expression;
    // Exiting if the input is "0" and the expression is empty or there's already a single "0" at the end of it
    if (infinityRegex.test(expression)) return;
    if (n === 0 && (!expression || /\s0$/.test(expression))) return;
    // Removing extra spaces at the end if there's the negative symbol
    if (twoOpsRegex.test(expression) || expression === " - ") expression = expression.trim();
    // Appending the new number to the end of the expression and updating the State
    expression = expression + n;
    this.setState({
      expression: expression
    });
  }

  // Appends new operation sign
  operation(op) {
    let expression = this.state.expression;
    // Adding a zero before the op sign if the expression is empty, except if the sign is "-"
    if (!expression && op !== "-") expression = "0";
    // If there's an op sign already, replacing it with the new one
    if (twoOpsRegex.test(expression)) expression = expression.replace(twoOpsRegex, "");
    if (lastOpRegex.test(expression) && op !== "-") expression = expression.replace(lastOpRegex, "");
    // Adding a zero if there's an incomplete decimal
    if (incompleteDecimalRegex.test(expression)) expression = expression + "0";
    // Adding the op sign and updating the expression in the App's State
    expression = expression.trim() + " " + op + " ";
    this.setState({
      expression: expression
    });
  }

  render() {
    return (
      <div id="container">
        <div id="calculator">
          <Display expression={this.state.expression} />
          <Keyboard 
            clear={this.clear} 
            evaluate={this.evaluate}
            decimal={this.decimal}
            number={this.number}
            operation={this.operation}
            />
        </div>
        <Footer />
      </div>
    );
  }
}

// Rendering App to the DOM
ReactDOM.render(<App />, document.getElementById("root"));