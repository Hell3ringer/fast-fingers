import React, { useState } from "react";

import Game from "./Game";
import Login from "./Login";
import Result from "./Result";


function Dashboard() {
  const [screen, setScreen] = useState("game");
  const [scores , setScores] = useState([]);
  return (
    <div className="dashboard">
      {screen === "login" && <Login setScreen={setScreen}></Login>}

      {screen === "game" && (
        <Game setScreen={setScreen} scores={scores} setScores={setScores}></Game>
      )}
      {screen === "result" && (
        <Result setScreen={setScreen} scores={scores}></Result>
      )}
    </div>
  );
}

export default Dashboard;
