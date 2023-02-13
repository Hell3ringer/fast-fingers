import  { useEffect, useRef } from "react";

function useEventhandler(eventname, handler, element = document.getElementById("game_input")) {
  const saveReference = useRef();

  useEffect(() => {
    saveReference.current =  handler;
  }, [handler]);

  useEffect(() => {
     const isSupported = element && element.addEventListener;
     if (!isSupported) return;
    //  else console.log({element});
     
    element.addEventListener(eventname , (event) => {
        saveReference.current(event);
    })

    return () => element.removeEventListener(eventname , (event) => saveReference.current(event))
  } , [eventname , element]);
}

export default useEventhandler;
