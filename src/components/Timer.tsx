import React, { useState, useEffect } from "react";
import axios from "axios";
import { TypeUser } from "../types/data";

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTime = async () => {
      const { data } = await axios.get<TypeUser>(
        "https://63fef788571200b7b7d2e115.mockapi.io/MyTimer/1"
      );
      setSeconds(data.seconds)
      setMinutes(data.minutes)
      setHours(data.hours)
    };

    fetchTime();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);

        if (seconds >= 59) {
          setSeconds(0);
          setMinutes((prevMinutes) => prevMinutes + 1);
        }

        if (minutes >= 59) {
          setMinutes(0);
          setHours((prevHours) => prevHours + 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds, minutes, hours, isRunning]);

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsRunning(false);
  };

  const save = async () => {
    setIsRunning(false);
    setSaving(true);
    try {
      await axios.put<TypeUser>(
        "https://63fef788571200b7b7d2e115.mockapi.io/MyTimer/1",
        {
          seconds: seconds,
          minutes: minutes,
          hours: hours,
        }
      );
    } catch (error) {
      alert(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>{`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
        seconds
      )}`}</h1>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <button onClick={reset}>Reset</button>
      <br />
      <button onClick={save} disabled={saving}>
        {saving ? "saving..." : "save"}
      </button>
    </div>
  );
};

export default Timer;
