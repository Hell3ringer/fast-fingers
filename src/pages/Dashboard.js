import React, { useRef, useState } from "react";

import Game from "./Game";
import Login from "./Login";
import Result from "./Result";

function Dashboard() {
  const [screen, setScreen] = useState("login");
  const [scores, setScores] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
const initLevel = useRef("");
  return (
    <div className="dashboard">
      {screen === "login" && (
        <Login
          setScreen={setScreen}
          name={name}
          setName={setName}
          level={level}
          setLevel={setLevel}
          initLevel={initLevel}
        ></Login>
      )}

      {screen === "game" && (
        <Game
          setScreen={setScreen}
          scores={scores}
          setScores={setScores}
          name={name}
          level={level}
          setLevel={setLevel}
          initLevel={initLevel}
        ></Game>
      )}
      {screen === "result" && (
        <Result
          setScreen={setScreen}
          scores={scores}
          setScores={setScores}
          name={name}
          setName={setName}
          level={level}
          setLevel={setLevel}
        ></Result>
      )}
    </div>
  );
}

export default Dashboard;
