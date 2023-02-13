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

  return factor;
};
export default function useGame({ setLevel, initLevel }) {
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
      setLevel(initLevel.current);
    }
  }, []);

  const matchTwoWords = (smallerWord, largerWord) => {
    var i = 0;
    for (; i < smallerWord.length; i++) {
      if (smallerWord[i] !== largerWord[i]) return i - 1;
    }
    return i - 1;
  };

  const handleTextChange = useCallback((event) => {
    if (event) {
      const inputText = event.target.value.toUpperCase();
      let startingWord, endingWord, index;
      if (inputText.length < word.length) {
        index = matchTwoWords(inputText, word);
      } else {
        index = matchTwoWords(word, inputText);
      }
      startingWord = word.substring(0, index + 1);
      endingWord = word.substring(index + 1, word.length + 1);
      setWordStart(startingWord);
      setWordEnd(endingWord);
      //   console.log("startingWord", startingWord);
      //   console.log("endingWord", endingWord);
      handleWordStartChange(startingWord, word);
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
