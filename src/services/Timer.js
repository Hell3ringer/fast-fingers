import { useEffect, useState } from "react";

function useScore(props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    // if (time > 10) clearInterval(interval);
    return () => clearInterval(interval);
  }, [time]);

  return time;
}

function useTimer(props) {
  const [time, setTime] = useState(1);
  const [factor, setFactor] = useState(0);
  const { word, setLevel } = props;

  const calculateTime = (word, factor) => {
    let time = Math.ceil(word.length / factor);
    if (time < 2) time = 2;

    setTime(time);

    // return time;
  };

  useEffect(() => {
    let initFlag = true;
    if (initFlag) {
      initFlag = false;
      let factor = 1;
      switch (props.level) {
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
      setFactor(() => factor);
      calculateTime(word, factor);
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
      if (time <= 0) {
        setTime(() => 0);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (word && factor) {
      // changeFactor(factor);

      calculateTime(word, factor);
    }
  }, [word]);

  const changeFactor = (factor) => {
    setFactor(() => factor + 0.1); // change to original factior by 0.1

    // change level
    if (factor >= 1 && factor < 1.5) {
      setLevel((level) => "easy");
    } else if (factor >= 1.5 && factor < 2) {
      setLevel((level) => "medium");
    } else {
      setLevel((level) => "hard");
    }
  };

  return time;
}

export { useScore, useTimer };
