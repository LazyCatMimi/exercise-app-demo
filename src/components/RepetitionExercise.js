import React, { useCallback } from "react";
import { useState } from "react";
import backIcon from "../assets/arrow-left.svg"; //royalty free SVG icon from feathericons.com

export default function RepetitionExercise(props) {
let [rep, setRep] = useState(0);
const reset = useCallback(()=>{
  setRep(0);
}, [setRep])
const add = useCallback(()=>{
  setRep(rep=>rep + 1);
}, [setRep])

const goBack = useCallback(() => {
    if (rep > 0) {
      const historyJson = {
        name: props.name,
        date: new Date(),
        type: "REP",
        data: rep,
      };
      props.setHistory([historyJson, ...props.history]);
    }
  props.setCurScreen("MAIN");
}, [props, rep]);

  return (
    <div className="exercise">
      <div className="align-back">
        {/* Return Button */}
        <img src={backIcon} alt="back" onClick={goBack} />
        {/* Exercise Info */}
        <h2>{props.name}</h2>
      </div>
      <h3 className="exercise-info">{rep}</h3>
      {/* Reset Button */}
      <button className="blue-btn round" onClick={reset}>
        reset
      </button>
      {/* Increment Button */}
      <button className="green-btn round" onClick={add}>
        +
      </button>
    </div>
  );

}
