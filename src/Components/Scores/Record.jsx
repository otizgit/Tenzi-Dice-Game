import React from "react";

export default function Record(props) {
  return (
    <div className="score-div">
      <p>Record Rolls:</p>
      <h1>{props.recordScore}</h1>
    </div>
  );
}
