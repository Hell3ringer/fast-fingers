import React, { useEffect, useState } from "react";
import "../css/Game.css";
import generateWord from "../services/Dictonary";
import { useScore, useTimer } from "../services/Timer";

function match(a, b) {
  //a.length <= b.length

  var i = 0;
  for (; i < a.length; i++) {
    if (a[i] !== b[i]) return i - 1;
  }
  return i - 1;
}
function Game(props) {
  const { name, level, setLevel, setScreen, scores, setScores } = props;
  const score = useScore(0);
  const [wordStart, setWordStart] = useState("");
  const [wordEnd, setWordEnd] = useState("");
  const [word, setWord] = useState("");
  const time = useTimer({ word, level, setLevel }, -1);

  let initFlag = true;
  useEffect(() => {
    if (initFlag) {
      initFlag = false;
      const word = generateWord(level);
      setWord(word);
      setWordStart("");
      setWordEnd(word);
    }
  }, []);

  useEffect(() => {
    if (!time) {
      gameover();
    }
  }, [time]);

  const gameover = () => {
    setScores([
      ...scores,
      {
        gameNo: scores.length + 1,
        score: score,
      },
    ]);

    setScreen("result");
  };

  const handleTextChange = (event) => {
    if (event) {
      const text = event.target.value.toUpperCase();
      let match1, match2, index;
      if (text.length < word.length) {
        index = match(text, word);
      } else {
        index = match(word, text);
      }
      match1 = word.substring(0, index + 1);
      match2 = word.substring(index + 1, word.length + 1);
      setWordStart(() => match1);
      setWordEnd(() => match2);

      handleWordStartChange(match1, word);
    }
  };

  const won = (word) => {
    console.log("won");
    // change factor

    // change level

    // generate word
    const newWord = generateWord(level);
    setWord(newWord);
    document.getElementById("game_input").value = "";

    setWordStart("");
    setWordEnd(newWord);

    //get timer
  };

  const handleWordStartChange = (wordStart, word) => {
    if (word && wordStart === word) {
      won(word);
    }
  };


  return (
    <div className="game">
      <div className="game_nav">
        <div>
          <h1>{name.toUpperCase()}</h1>
          <h1>LEVEL : {level.toUpperCase()}</h1>
        </div>
        <div>
          <h1>FAST FINGERS</h1>
          <h1>
            SCORE - {Math.floor(score / 60)}:{score % 60}
          </h1>
        </div>
      </div>
      <div className="game_play">
        {
          <div className="game_scoreboard">
            <h1>Scoreboard</h1>
            {scores.map((score) => {
              return (
                <h2 key={score.gameNo}>
                  Game {score.gameNo} : {Math.floor(score.score / 60)}:
                  {score.score % 60}
                </h2>
              );
            })}
          </div>
        }
        <div className="game_play_area">
          <h1 className="game_time">{time}</h1>
          <div className="game_word">
            <h1>{wordStart}</h1>
            <h1>{wordEnd}</h1>
          </div>

          <input
            id="game_input"
            className="game_input"
            type="text"
            onChange={handleTextChange}
            autoFocus={true}
            autoComplete="off"
            spellCheck="false"
          ></input>
        </div>
      </div>
      <button className="game_btn" onClick={() => gameover()}>
        Stop Game
      </button>
    </div>
  );
}

export default Game;
