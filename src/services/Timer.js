import { useEffect, useState } from "react";

function useScore(props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    if (time > 10) clearInterval(interval);
    return () => clearInterval(interval);
  }, [time]);

  return time;
}

function useTimer(props) {
  const [time, setTime] = useState(0);
  const [factor, setFactor] = useState(0);
  const setLevel = props.setLevel;
  useEffect(() => {
    switch (props.level) {
      case "easy":
        setFactor(1);
        break;
      case "medium":
        setFactor(1.5);
        break;
      case "hard":
        setFactor(2);

        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    setFactor((factor) => factor + 0.1);
    if (factor >= 1 && factor < 1.5) {
      setLevel((level) => "easy");
    } else if (factor >= 1.5 && factor < 2) {
      setLevel((level) => "medium");
    } else {
      setLevel((level) => "hard");
    }
    let time = Math.ceil(props.word.length / factor);
    if (time < 2) time = 2;
    // console.log("length", props.word.length);
    // console.log("factor", factor);
    // console.log("time", time);
    // console.log("level", props.level);
    // console.log('word', props.word)
    setTime(() => time);
  }, [props.word]);


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

  return time;
}

function useLevel(props) {}

export { useScore, useTimer, useLevel };
