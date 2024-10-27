import { useEffect } from "react";
import { useCallback, useRef, useState } from "react";

function useStopWatchCounter(initialCount = 0, incrementBy = 1) {
  const [count, setCount] = useState(initialCount);
  const counterIntervalRef = useRef(null);

  const startCounter = () => {
    counterIntervalRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + incrementBy);
    }, 1000);
  };

  const stopCounter = () => {
    clearInterval(counterIntervalRef.current);
  };

  const resetCounter = () => {
    setCount(initialCount);
    stopCounter();
  };

  return [count, stopCounter, startCounter, resetCounter];
}

export default function StopWatch() {
  const [count, stopCounter, startCounter, resetCounter] =
    useStopWatchCounter();

  const [timer, setTimer] = useState({
    hours: "00",
    mins: "00",
    seconds: "00",
  });

  useEffect(() => {
    let hours = count / 3600;
    let remainingHours = count % 3600;
    let mins = remainingHours / 60;
    let seconds = remainingHours % 60;

    setTimer({
      hours: `${hours % 9 === 0 ? '0': ''}${Math.floor(hours)}`,
      mins: Math.floor(mins),
      seconds: `${Math.floor(seconds / 10) === 0 ? '0': ''}${Math.floor(seconds)}`,
    });
  }, [count]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div>{`${timer.hours}:${timer.mins}:${timer.seconds}`}</div>
      <button onClick={() => startCounter()}>Start</button>
      <button onClick={() => stopCounter()}>Stop</button>
      <button onClick={() => resetCounter()}>Reset</button>
    </div>
  );
}
