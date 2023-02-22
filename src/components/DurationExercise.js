import React from "react";
import { useState, useEffect, useCallback } from "react";
import backIcon from "../assets/arrow-left.svg"; //royalty free SVG icon from feathericons.com

let timeInterval = null;
export default function DurationExercise (props) {
  let [time, setTime] = useState(0);
  let [running, setRunning] = useState(false);
  // stop watch from instructor video with permission
  // each part of the timer
  let min = Math.floor((time / (100 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  let sec = Math.floor((time / 100) % 60)
    .toString()
    .padStart(2, "0");
  let mil = (time % 100).toString().padStart(2, "0");

  // update time
  let updateTime = useCallback(() => {
    if (running) {
      setTime((time) => time + 11);
    }
  }, [running]);

  useEffect(() => {
    timeInterval = setTimeout(updateTime, 100);
    return () => clearInterval(timeInterval);
  });

  // button usecallbacks
  const stopStart = useCallback(() => {
    setRunning(!running);
    clearInterval(timeInterval);
  }, [running]);

  const reset = useCallback(() => {
    setTime(0);
    clearInterval(timeInterval);
    setRunning(false);
  }, [setRunning]);

  const goBack = useCallback(() => {
    if (time > 0) {
      const historyJson = {
        name: props.name,
        date: new Date(),
        type: "DUR",
        data: `${min}m ${sec}s ${mil}`,
      };
      props.setHistory([historyJson, ...props.history]);
    }
    props.setCurScreen("MAIN");
  }, [min, sec, mil, props, time]);


  return (
    <div className="exercise">
      <div className="align-back">
        {/* Return Button */}
        <img src={backIcon} alt="back" onClick={goBack} />
        {/* Exercise Info */}
        <h2>{props.name}</h2>
      </div>
      <h3 className="exercise-info">
        {min}:{sec}:{mil}
      </h3>
      {/* Reset Button */}
      <button className="blue-btn round" onClick={reset}>
        reset
      </button>
      {/* Stop/Start Button */}
      <button
        className={running ? "red-btn round" : "green-btn round"}
        onClick={stopStart}
      >
        {running ? "stop" : "start"}
      </button>
    </div>
  );
}