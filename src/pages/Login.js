import React, { useState } from "react";
import "../css/Login.css";


function Login(props) {
  const { level, setLevel, name, setName,initLevel } = props;
  const [errorText, setErrorText] = useState("");

  function handleSubmit() {
    if (!name && !level) {
      setErrorText("|x|   Please Enter Name and Level");
    } else if (!name) {
      setErrorText("|x|   Please Enter Name");
    } else if (!level) {
      setErrorText("|x|   Please Enter Level");
    } else {
      setErrorText("");
      setName(name);
      initLevel.current = level;
      props.setScreen("game");
    }
  }


  return (
    <div className="login">
      <h1>FAST FINGERS</h1>
      <div className="login-form">
        <input
          id="login_name"
          type="text"
          placeholder="TYPE YOUR NAME"
          value={name.toUpperCase()}
          onChange={(event) => setName(event.target.value)}
          // onFocus={handleFocus}
          spellCheck="false"
          autoComplete="off"
        ></input>
        {/* <span id="login_error">{errorText}</span> */}
        <select
          value={level}
          onChange={(event) => setLevel(event.target.value)}
        >
          <option value="" disabled selected hidden>
            DIFFICULTY LEVEL
          </option>
          <option value="easy">EASY</option>
          <option value="medium">MEDIUM</option>
          <option value="hard">HARD</option>
        </select>
        <span id="login_error">{errorText}</span>
      </div>
      <button className="play_btn" onClick={() => handleSubmit()}>
        Start Game
      </button>
    </div>
  );
}

export default Login;
