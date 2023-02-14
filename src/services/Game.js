import { useEffect, useCallback, useReducer, useRef } from "react";
import { useScore, useTimer } from "./Timer";
import generateWord from "./Dictonary";

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

const reducer = (state, action) => {
  const { type, factor, word, wordStart, wordEnd } = action;

  if (type === "factor") {
    return {
      ...state,
      factor,
    };
  } else if (type === "word") {
    return {
      ...state,
      word,
    };
  } else if (type === "wordStart") {
    return {
      ...state,
      wordStart,
    };
  } else if (type === "wordEnd") {
    return {
      ...state,
      wordEnd,
    };
  } else {
    return {
      error: "error in reducer",
    };
  }
};

export default function useGame({ setLevel, initLevel }) {
  const score = useScore();
  const [state, dispatch] = useReducer(reducer, {});
  const timer = useTimer({
    word: state.word,
    factor: state.factor,
  });
  const saveElement = useRef(null);

  let initFlag = true;
  useEffect(() => {
    if (initFlag) {
      initFlag = false;
      dispatch({ type: "factor", factor: initFactor(initLevel.current) });
      const word = generateWord(initLevel.current);
      dispatch({ type: "word", word: word });
      dispatch({ type: "wordEnd", wordEnd: word });
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
      if (inputText.length < state.word.length) {
        index = matchTwoWords(inputText, state.word);
      } else {
        index = matchTwoWords(state.word, inputText);
      }
      startingWord = state.word.substring(0, index + 1);
      endingWord = state.word.substring(index + 1, state.word.length + 1);
      dispatch({ type: "wordStart", wordStart: startingWord });
      dispatch({ type: "wordEnd", wordEnd: endingWord });
      handleWordStartChange(startingWord, state.word);
    } else {
      console.log("no event");
    }
  });

  const won = () => {
    console.log("won");

    let newFactor = Math.round((state.factor + 0.1) * 100) / 100;
    let newLevel;
    if (newFactor >= 1 && newFactor < 1.5) {
      newLevel = "easy";
    } else if (newFactor >= 1.5 && newFactor < 2) {
      newLevel = "medium";
    } else {
      newLevel = "hard";
    }
    const word = generateWord(newLevel);
    dispatch({ type: "factor", factor: newFactor });
    setLevel(newLevel);
    dispatch({ type: "word", word: word });
    document.getElementById("game_input").value = "";

    dispatch({ type: "wordStart", wordStart: "" });

    dispatch({ type: "wordEnd", wordEnd: word });
  };

  const handleWordStartChange = (wordStart, word) => {
    if (word && wordStart === word) {
      won();
    }
  };

  return {
    score,
    timer,
    wordStart: state.wordStart,
    wordEnd: state.wordEnd,
    handleTextChange,
  };
}
