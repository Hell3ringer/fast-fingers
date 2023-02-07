import React, { useState } from "react";
import "../css/Result.css";

function Result(props) {
  const [name, setName] = useState("Hell3ringer");
  const [level, setLevel] = useState("easy");
  const scores  = props.scores
  const setScreen = props.setScreen;
  //   const score = useScore(0);

  return (
    <div className="result">
      <div className="game_nav">
        <div>
          <h1>{name.toUpperCase()}</h1>
          <h1>LEVEL : {level.toUpperCase()}</h1>
        </div>
        <div>
          <h1>Fast Fingers</h1>
        </div>
      </div>
      <div className="game_play_div">
        {/* <h1>{scores.length}</h1> */}
        <h1>Score : Game {scores[scores.length-1].gameNo}</h1>
        <h1 className="game_time">{Math.floor(scores[scores.length-1].score/60)}:{scores[scores.length-1].score%60}</h1>
        {<span>High Score</span>}
        <button className="play_btn" onClick={() => setScreen("game")}>Play Again</button>
      </div>
      <button className="game_btn">Quit</button>
    </div>
  );
}

export default Result;
