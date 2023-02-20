import React from "react";
import { useState, useEffect, useCallback } from "react";
let timeInterval = null;
export default function LapExercise(props) {
  let [laps, setLaps] = useState(0);
  let [time, setTime] = useState(0);
  let [running, setRunning] = useState(false);
  let [exerciseData] = useState([])
  // stop watch from instructor video with permission
  let updateTime = useCallback(() => {
    if (running) {
      setTime((time) => time + 11);
    }
  }, [running]);

  useEffect(() => {
    timeInterval = setTimeout(updateTime, 100);
    return () => clearInterval(timeInterval);
  });

  const stopStart = useCallback(() => {
    setRunning(!running);
    clearInterval(timeInterval);
  }, [running]);

  const reset = useCallback(() => {
    setTime(0);
    clearInterval(timeInterval);
    setRunning(false);
  }, [setRunning]);

  const completeLap = useCallback(()=>{
    if (time > 0){
      clearInterval(timeInterval);
      setRunning(false);
      exerciseData.push(`${min}m ${sec}s ${mil}`);
      setLaps(laps + 1);
      setTime(0);
    }
    // console.log(exerciseData);
  })

  const goBack = useCallback(() => {
    updateHistory();
    props.setCurScreen("MAIN");
  });

  const updateHistory = () => {
      const historyJson = {
        name: props.name,
        date: new Date(),
        type: "LAP",
        data: exerciseData,
      };
      props.setHistory([historyJson, ...props.history]);

  };

  // each part of the timer
  let min = Math.floor((time / (100 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  let sec = Math.floor((time / 100) % 60)
    .toString()
    .padStart(2, "0");
  let mil = (time % 100).toString().padStart(2, "0");

  return (
    <div className="exercise">
      {/* EXERCISE INFO */}
      <h2>{props.name}</h2>
      <h3>
        {min}:{sec}:{mil}
      </h3>
      <p>total laps: {laps}</p>
      {/* RESET BUTTON */}
      <button className="reset-btn round" onClick={reset}>
        reset
      </button>
      {/* STOP/START BUTTON */}
      <button
        className={running ? "stop-btn round" : "start-btn round"}
        onClick={stopStart}
      >
        {running ? "pause" : "start"}
      </button>
      {/* COMPLETE LAP BUTTON */}
      <button className="start-btn round" onClick={completeLap}>
        Complete Lap
      </button>
      {/* RETURN BUTTON */}
      <button className="reset-btn round" onClick={goBack}>
        return
      </button>
    </div>
  );
}
