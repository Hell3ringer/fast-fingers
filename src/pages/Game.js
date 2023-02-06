import React, { useEffect, useState, useReducer } from "react";
import "../css/Game.css";
import useWord from "../services/Dictonary";
import { useScore, useTimer, useLevel } from "../services/Timer";

function match(a, b) {
  //a.length <= b.length
  var i = 0;
  for (; i < a.length; i++) {
    if (a[i] !== b[i]) return i - 1;
  }
  return i - 1;
}
function Game() {
  const [name, setName] = useState("Hell3ringer");
  const [level, setLevel] = useState("easy");
  const score = useScore(0);
  const [text, setText] = useState("");
  const [wordStart, setWordStart] = useState("");
  const [wordEnd, setWordEnd] = useState("");
  const [wonCount, setWonCount] = useState(0);
  const word = useWord({ level, wonCount });
  const time = useTimer({ word, wonCount, level, setLevel }, -1);
  const [gameover, setGameover] = useState(false);

  useEffect(() => {
    setWordStart("");
    setWordEnd(word);
    // console.log("new Word ..");
    // set timer
  }, [wonCount, word]);

  useEffect(() => {
    let match1, match2, index;
    if (text.length < word.length) {
      index = match(text, word);
    } else {
      index = match(word, text);
    }
    match1 = word.substring(0, index + 1);
    match2 = word.substring(index + 1, word.length + 1);
    setWordStart(match1);
    setWordEnd(match2);
  }, [text]);

  useEffect(() => {
    // this.props.gameover = gameover;
  }, [gameover]);

  useEffect(() => {
    if (time === 0 && word !== "") {
      console.log("time is zero");
      setGameover((gameover) => true);
    }
  }, [time]);

  useEffect(() => {
    if (word !== "" && wordStart === word) {
      console.log("won");

      // get word
      setText("");
      setWonCount((wonCount) => wonCount + 1);
    }
  }, [wordStart]);

  // changeColor();
  return (
    <div className="game">
      <div className="game_nav">
        <div>
          <h1>{name}</h1>
          <h1>{level}</h1>
        </div>
        <div>
          <h1>Fast Fingers</h1>
          <h1>{score}</h1>
        </div>
      </div>
      <div className="game_play">
        <div>Score Board</div>
        <div className="game_play_div">
          <h1 className="game_time">{time}</h1>
          <div className="game_word">
            <h1>{wordStart}</h1>
            <h1>{wordEnd}</h1>
          </div>

          <input
            id="game_input"
            className="game_input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            autoFocus={true}
          ></input>
        </div>
      </div>
      <button className="game_btn" onClick={() => setGameover(true)}>
        Stop Game
      </button>
    </div>
  );
}

export default Game;
