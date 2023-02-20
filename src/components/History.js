function History (props){
  const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const printData = (exercise) => {
    // print for exercise of type REPETITION
    if (exercise.type === "REP") {
      return <p>Repetitions: {exercise.data}</p>;
    }
    // print for exercise of type DURATION
    else if (exercise.type === "DUR") {
      return <p>Time Elapsed: {exercise.data}</p>;
    }
    // print for exercise of type LAP
    else if (exercise.type === "LAP") {
      return exercise.data.map((data, lap) => {
        return (
          <p key={lap}>
            Lap {lap + 1}: {data}
          </p>
        );
      });
    }
  };
  const historyList =
    props.history.length === 0 ? (
      <p>No history yet, begin an exercise to see your progress.</p>
    ) : (
      props.history.slice(0, 3).map((exercise, i) => {
        return (
          <div className="exercise-history" key={i}>
            <div>
              <h3>{exercise.name}</h3>
              <p>
                {weekDay[exercise.date.getDay()]} {exercise.date.getMonth() + 1}
                /{exercise.date.getDate()}/{exercise.date.getYear() - 100}{" "}
                {exercise.date.getHours().toString().padStart(2, "0")}:
                {exercise.date.getMinutes().toString().padStart(2, "0")}
              </p>
            </div>
            {printData(exercise)}
          </div>
        );
      })
    );

  return (
    <>
      <button onClick={() => props.setCurScreen("MAIN")}>return</button>
      <h2>Exercises History</h2>
      {historyList}
    </>
  );
}
export default History