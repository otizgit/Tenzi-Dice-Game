import React from "react";

export default function Current(props) {
  return (
    <div className="score-div">
      <p>Rolls:</p>
      <h1>{props.rolls}</h1>
    </div>
  );
}
