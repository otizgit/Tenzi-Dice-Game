import React from "react";

export default function Dice(props) {
  function randomDice() {
    switch (props.value) {
      case 1:
        return "dice1.png";
      case 2:
        return "dice2.png";
      case 3:
        return "dice3.png";
      case 4:
        return "dice4.png";
      case 5:
        return "dice5.png";
      case 6:
        return "dice6.png";
    }
  }
  return (
    <div
      onClick={props.holdDice}
      className={`dice ${props.isHeld ? "held-dice" : ""}`}
    >
      <img src={`/src/assets/Dice/${randomDice()}`} alt={randomDice()} />
    </div>
  );
}
