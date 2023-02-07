import React, { useEffect, useState } from "react";
import "../css/Result.css";

function Result(props) {
  const {name, setName} = props
  const {level, setLevel} = props
  const {scores , setScores} = props;
  const {setScreen} = props;
  const [highscore, setHighscore] = useState(0);
  //   const score = useScore(0);

  useEffect(() => {
    scores.forEach((score , index) => {
      if (score.score > highscore) {

        setHighscore(() => score.score);

    }
    });
  }, [highscore]);

function handleQuit(){
  setName("");
  setLevel("");
  setScores([]);
  setScreen("login")
}

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
      <div className="game_play_area">
        {/* <h1>{scores.length}</h1> */}
        <h1>Score : Game {scores[scores.length - 1].gameNo}</h1>
        <h1 className="game_time">
          {Math.floor(scores[scores.length - 1].score / 60)}:
          {scores[scores.length - 1].score % 60}
        </h1>
        {scores[scores.length - 1].score === highscore && (
          <span className="high_score">High Score</span>
        )}
        <button className="play_btn" onClick={() => setScreen("game")}>
          Play Again
        </button>
      </div>
      <button className="game_btn" onClick={() => handleQuit()}>Quit</button>
    </div>
  );
}

export default Result;
