import React, { useState, useEffect } from "react";
import { TypeUser } from "../types/data";
import Skeleton from "./Skeleton";
import axios from "axios";

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    const fetchTime = async () => {
      const { data } = await axios.get<TypeUser>(
        "https://63fef788571200b7b7d2e115.mockapi.io/MyTimer/1"
      );
      setSeconds(data.seconds);
      setMinutes(data.minutes);
      setHours(data.hours);
      setInitLoading(false);
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

  const start_pause = () => {
    setIsRunning(!isRunning);
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
    <>
      {initLoading ? (
        <Skeleton />
      ) : (
        <div className="timer-wrapper">
          <h1 className="title">Working timer</h1>
          <div className="timer">
            <h2 className="time">{`${formatTime(hours)}:${formatTime(
              minutes
            )}:${formatTime(seconds)}`}</h2>
            <div className="button-container">
              <button className="start-button" onClick={start_pause}>
                {isRunning ? "Pause" : "Start"}
              </button>
              <button className="reset-button" onClick={reset}>
                Reset
              </button>
            </div>
            <button className="save-button" onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Timer;
