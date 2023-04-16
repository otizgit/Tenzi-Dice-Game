import React from "react";
import { useState, useEffect } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Current from "./Scores/Current";
import Record from "./Scores/Record";

export default function Tenzies() {
  function dieObject() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  function generateDice() {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(dieObject());
    }
    return diceArr;
  }

  const [dice, setDice] = useState(generateDice());

  const [tenzies, setTenzies] = useState(false);

  const [rolls, setRolls] = useState(0);

  const [finishedGame, setFinishedGame] = useState(false);

  const [scores, setScores] = useState(
    JSON.parse(localStorage.getItem("scores")) || []
  );

  const [recordScore, setRecordScore] = useState(0);

  useEffect(() => {
    const completedDice = dice.every((die) => {
      return die.isHeld && die.value === dice[0].value;
    });

    if (completedDice) {
      setTenzies(true);
      setFinishedGame((prevFinishedGame) => !prevFinishedGame);
      setScores((prevScores) => [...prevScores, rolls]);
    }
  }, [dice]);

  function rollDice() {
    if (tenzies) {
      setDice(generateDice());
      setTenzies(false);
      setRolls(0);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : dieObject();
        })
      );
      setRolls((prevRoll) => prevRoll + 1);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  useEffect(() => {
    if (scores.length === 0) {
      setRecordScore(0);
    } else {
      localStorage.setItem("scores", JSON.stringify(scores));
      setRecordScore(Math.min(...scores));
    }
  }, [finishedGame]);

  const diceEl = dice.map((die) => (
    <Dice
      value={die.value}
      key={die.id}
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
    />
  ));

  return (
    <div className="game-container">
      {tenzies && <Confetti />}
      <div className="score-board">
        <Record recordScore={recordScore} />
        <Current rolls={rolls} />
      </div>
      <div className="game-desc">
        <h1>Tenzies</h1>
        <p>
          Roll until all the dice are the same.<br></br> Click each die to
          freeze it at its current value between rolls.
        </p>
      </div>
      <div className="dice-container">{diceEl}</div>
      <div className="btn">
        <button onClick={rollDice}>
          {tenzies ? "You Win! New Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}
