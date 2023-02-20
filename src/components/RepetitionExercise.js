import React, { useCallback } from "react";
import { useState } from "react";

export default function RepetitionExercise(props) {
let [rep, setRep] = useState(0);
const reset = useCallback(()=>{
  setRep(0);
})
const add = useCallback(()=>{
  setRep(rep + 1);
})
const goBack = useCallback(() => {
  updateHistory()
  props.setCurScreen("MAIN");
});

const updateHistory = () =>{
  if (rep >0){
  const historyJson = {
    name: props.name,
    date: new Date(),
    type: "REP",
    data: rep,
  };
  props.setHistory([historyJson, ...props.history]);
  }
}
  return (
    <div className="exercise">
      <h2>{props.name}</h2>
      <h3>{rep}</h3>
      <button className="reset-btn round" onClick={reset}>
        reset
      </button>
      <button className="start-btn round" onClick={add}>
        +
      </button>
      <button className="reset-btn round" onClick={goBack}>
        return
      </button>
    </div>
  );

}
