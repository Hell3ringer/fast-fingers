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
  const [timer, setTime] = useState(-1);
  // const [factor, setFactor] = useState(0);
  const { word, setLevel, factor } = props;

  const calculateTime = (word, factor) => {
    if(word && factor){

      console.log('factor Timer', factor)
      let timer = Math.ceil(word.length / factor);
      if (timer < 2) timer = 2;
      
      // setTime(timer);
      
      return timer;
    }

    // return timer;
  };

  useEffect(() => {
    const interval = setInterval(() => {

      setTime((timer) => timer - 1);
      if (timer <= 0) {
        setTime(() => 0);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (word) {
      setTime(calculateTime(word, factor));
    }
  }, [word]);



  return timer;
}

export { useScore, useTimer };
