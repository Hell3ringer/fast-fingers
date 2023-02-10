import React from 'react'

function Scoreboard(props) {
    const scores = props.score;
  return (
    <div>
        {scores.map((score) => {
          <>
          <h1>Game {score.gameNo} : {score.score}</h1>
          </>
        })}
    </div>
  )
}

export default Scoreboard