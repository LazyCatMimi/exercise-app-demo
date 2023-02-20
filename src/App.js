import "./App.css";
import { useState } from "react";
import DurationExercise from "./components/DurationExercise";
import RepetitionExercise from "./components/RepetitionExercise"
import LapExercise from "./components/LapExercise"
import Main from "./components/Main";
import History from "./components/History"

function App() {
  let curComponent;
  let [curScreen, setCurScreen] = useState("MAIN");
  let [exerciseName, setExerciseName] = useState("");
  let [history, setHistory] = useState([]);

  if (curScreen === "MAIN") {
    curComponent = (
      <Main
        setCurScreen={setCurScreen}
        setExerciseName={setExerciseName}
        history={[...history]}
        setHistory={setHistory}
      ></Main>
    );
  } else if (curScreen === "REP") {
    curComponent = (
      <RepetitionExercise
        setCurScreen={setCurScreen}
        name={exerciseName}
        history={[...history]}
        setHistory={setHistory}
      ></RepetitionExercise>
    );
  } else if (curScreen === "DUR") {
    curComponent = (
      <DurationExercise
        setCurScreen={setCurScreen}
        name={exerciseName}
        history={[...history]}
        setHistory={setHistory}
      ></DurationExercise>
    );
  } else if (curScreen === "LAP") {
    curComponent = (
      <LapExercise
        setCurScreen={setCurScreen}
        name={exerciseName}
        history={[...history]}
        setHistory={setHistory}
      ></LapExercise>
    );
  } else if (curScreen === "HIST") {
    curComponent = (
      <History setCurScreen={setCurScreen} history={[...history]}></History>
    );
  }
  return (
    <>
      {curComponent}
    </>
  );
}
export default App;

