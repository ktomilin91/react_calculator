import React from "react";

// Component displays the current expression
// Receives string expression as a prop
export default function(props) {
    return (
      <div id="displayShadow">
        <div id="display">
          {props.expression ? props.expression : 0}
        </div>
        <div id="displayShadowLeft" />
        <div id="displayShadowCenter" />
        <div id="displayShadowRight" />
      </div>
    );
  };