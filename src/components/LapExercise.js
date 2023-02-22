import React from "react";
import { useState, useEffect, useCallback } from "react";
import backIcon from "../assets/arrow-left.svg"; //royalty free SVG icon from feathericons.com

let timeInterval = null;
export default function LapExercise(props) {
  let [laps, setLaps] = useState(0);
  let [time, setTime] = useState(0);
  let [running, setRunning] = useState(false);
  let [exerciseData] = useState([]);
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

  // buttons usecallbacks
  const stopStart = useCallback(() => {
    setRunning(!running);
    clearInterval(timeInterval);
  }, [running]);

  const reset = useCallback(() => {
    setTime(0);
    clearInterval(timeInterval);
    setRunning(false);
  }, [setRunning]);

  const completeLap = useCallback(() => {
    if (time > 0) {
      clearInterval(timeInterval);
      setRunning(false);
      exerciseData.push(`${min}m ${sec}s ${mil}`);
      setLaps((laps) => laps + 1);
      setTime(0);
    }
    // console.log(exerciseData);
  }, [time, setRunning, exerciseData, mil, min, sec]);

  const goBack = useCallback(() => {
    if (laps > 0) {
      const historyJson = {
        name: props.name,
        date: new Date(),
        type: "LAP",
        data: exerciseData,
      };
      props.setHistory([historyJson, ...props.history]);
    }
    props.setCurScreen("MAIN");
  }, [laps, exerciseData, props]);

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
      <p>total laps: {laps}</p>
      {/* Reset Button */}
      <button className="blue-btn round" onClick={reset}>
        reset
      </button>
      {/* Stop/Start Button */}
      <button
        className={running ? "red-btn round" : "green-btn round"}
        onClick={stopStart}
      >
        {running ? "pause" : "start"}
      </button>
      {/* Complete Lap Button */}
      <button className="green-btn round" onClick={completeLap}>
        Complete Lap
      </button>
    </div>
  );
}
