import React, { useState, useEffect } from "react";
import "./style.css";

function App() {
  // Declare state variables for hours, minutes, seconds, and status
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("stopped");

  // Declare a variable to store the interval ID
  let interval = null;

  // Define a function to increment the time
  const tick = () => {
    // If seconds reach 59, reset to 0 and increment minutes
    if (seconds === 59) {
      setSeconds(0);
      // If minutes reach 59, reset to 0 and increment hours
      if (minutes === 59) {
        setMinutes(0);
        setHours(hours + 1);
      } else {
        setMinutes(minutes + 1);
      }
    } else {
      setSeconds(seconds + 1);
    }
  };

  // Use useEffect hook to update the interval based on the status
  useEffect(() => {
    // If status is running, start the interval
    if (status === "running") {
      interval = setInterval(tick, 1000);
    } else {
      // If status is not running, clear the interval
      clearInterval(interval);
    }
    // Return a function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [status, seconds]);

  // Define a function to handle the start button click
  const handleStart = () => {
    // Set the status to running
    setStatus("running");
  };

  // Define a function to handle the stop button click
  const handleStop = () => {
    // Set the status to stopped
    setStatus("stopped");
  };

  // Define a function to handle the reset button click
  const handleReset = () => {
    // Set the status to stopped
    setStatus("stopped");
    // Reset the hours, minutes, and seconds to 0
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // Format the time to display with two digits
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  // Return the JSX elements to render
  return (
    <div className="App">
      <h1>Simple Stopwatch</h1>
      <div className="time">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className="buttons">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;