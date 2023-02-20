import React from "react";
import { useState, useEffect, useCallback } from "react";
let timeInterval = null;
export default function DurationExercise (props) {
  let [time, setTime] = useState(0)
  let [running, setRunning] = useState(false)
  // stop watch from instructor video with permission
  let updateTime = useCallback(()=>{
    if (running) {
      setTime((time)=>time + 11);
    }
  }, [running])

  useEffect(() => {
      timeInterval = setTimeout(updateTime, 100);
      return () => clearInterval(timeInterval);
  });

  const stopStart = useCallback(()=>{
    setRunning(!running);
    clearInterval(timeInterval);
  }, [running])

  const reset = useCallback(() => {
    setTime(0);
    clearInterval(timeInterval);
    setRunning(false);
  },[setRunning]);

  const goBack = useCallback(() => {
    // should not return an exercise with a value of 0
    // should reset appends to history? or add to the total time elapsed
    updateHistory();
    props.setCurScreen("MAIN");
  });

  const updateHistory = () => {
    if (time > 0) {
      const historyJson = {
        name: props.name,
        date: new Date(),
        type: "DUR",
        data: `${min}m ${sec}s ${mil}`,
      };
      props.setHistory([historyJson, ...props.history]);
    }
  };

  // each part of the timer
  let min = Math.floor((time / (100*60)) % 60)
    .toString()
    .padStart(2, "0");
  let sec = Math.floor((time / 100) % 60)
    .toString()
    .padStart(2, "0");
  let mil = (time % 100).toString().padStart(2, "0")

  return (
    <div className="exercise">
      {/* EXERCISE INFO */}
      <h2>{props.name}</h2>
      <h3>
        {min}:{sec}:{mil}
      </h3>
      {/* RESET BUTTON */}
      <button className="reset-btn round" onClick={reset}>
        reset
      </button>
      {/* STOP/START BUTTON */}
      <button
        className={running ? "stop-btn round" : "start-btn round"}
        onClick={stopStart}
      >
        {running ? "stop" : "start"}
      </button>
      {/* RETURN BUTTON */}
      <button className="reset-btn round" onClick={goBack}>
        return
      </button>
    </div>
  );
}