import React, { useEffect } from "react";
import "../css/Game.css";
import useGame from "../services/Game";


function Game(props) {
  const { name, level, setLevel, setScreen, scores, setScores , initLevel } = props;

  const {timer , score , wordStart , wordEnd } = useGame({level,setLevel,initLevel})


  useEffect(() => {

    if (!timer) {
      gameover();
    }
  }, [timer]);

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
          <h1 className="game_time">{timer}</h1>
          <div className="game_word">
            <h1>{wordStart}</h1>
            <h1>{wordEnd}</h1>
          </div>

          <input
            id="game_input"
            className="game_input"
            type="text"
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
