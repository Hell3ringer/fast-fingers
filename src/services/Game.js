import { useEffect, useState, useRef, useCallback } from "react";
import { useScore, useTimer } from "./Timer";
import generateWord from "./Dictonary";
import useEventhandler from "./EventHandler";

const initFactor = (level) => {
  let factor = 1;
  switch (level) {
    case "easy":
      factor = 1;
      break;
    case "medium":
      factor = 1.5;
      break;
    case "hard":
      factor = 2;

      break;

    default:
      break;
  }
  // calculateTime(word, factor);
  //   setFactor(() => factor);
  return factor;
};
export default function useGame({ level, setLevel , initLevel}) {
  const score = useScore();
  const [factor, setFactor] = useState(0);
  const [word, setWord] = useState();
  const timer = useTimer({ word, factor });
  const [wordStart, setWordStart] = useState("");
  const [wordEnd, setWordEnd] = useState("");
  

  let initFlag = true;
  useEffect(() => {
    if (initFlag) {
      initFlag = false;
      setFactor(initFactor(initLevel.current));
      const word = generateWord(initLevel.current);
      setWord(word);    
      setWordEnd(word);
      setLevel(initLevel.current)
    }
  }, []);

  const changeFactor = () => {
    setFactor((factor) => Math.round((factor + 0.1) * 100) / 100); // change to original factior by 0.1
    console.log("factor", factor);
    // change level
    if (factor >= 1 && factor < 1.5) {
      setLevel((level) => "easy");
    } else if (factor >= 1.5 && factor < 2) {
      setLevel((level) => "medium");
    } else {
      setLevel((level) => "hard");
    }
  };

  const match = (word1, word2) => {
    //word1.length <= word2.length

    var i = 0;
    for (; i < word1.length; i++) {
      if (word1[i] !== word2[i]) return i - 1;
    }
    return i - 1;
  };

  const handleTextChange = useCallback((event) => {
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
      setWordStart(match1);
      setWordEnd(match2);
      //   console.log("match1", match1);
      //   console.log("match2", match2);
      handleWordStartChange(match1, word);
    } else {
      console.log("no event");
    }
  });
  useEventhandler("keyup", handleTextChange);
  const won = () => {
    console.log("won");

    let newFactor = Math.round((factor + 0.1) * 100) / 100;
    let newLevel;
    // change level
    if (newFactor >= 1 && newFactor < 1.5) {
      //   setLevel((level) => "easy");
      newLevel = "easy";
    } else if (newFactor >= 1.5 && newFactor < 2) {
      //   setLevel((level) => "medium");
      newLevel = "medium";
    } else {
      //   setLevel((level) => "hard");
      newLevel = "hard";
    }
    const word = generateWord(newLevel);
    setFactor(newFactor);
    setLevel(newLevel);
    setWord(word);
    document.getElementById("game_input").value = "";
    setWordStart("");
    setWordEnd(word);

    //get timer
  };

  const handleWordStartChange = (wordStart, word) => {
    if (word && wordStart === word) {
      won();
    }
  };

  return { score, word, timer, wordStart, wordEnd };
}
