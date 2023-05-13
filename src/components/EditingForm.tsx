import React from "react";
import axios from "axios";
import { TypeUser } from "../types/data";

const EditingForm: React.FC = () => {
  const [title, setTitle] = React.useState("Working timer");
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [saving, setSaving] = React.useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put<TypeUser>(
        "https://63fef788571200b7b7d2e115.mockapi.io/MyTimer/1",
        {
          title: title,
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
    <form className="editing-form">
      <label htmlFor="title">{title}</label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Working timer"
        type="text"
        id="title"
        name="title"
      ></input>

      <div className="time-container">
        <label htmlFor="hours">H:</label>
        <input
          onChange={(e) => setHours(Number(e.target.value))}
          placeholder="0"
          type="number"
          id="hours"
          name="hours"
          min="0"
          max="60"
        />

        <label htmlFor="minutes">M:</label>
        <input
          onChange={(e) => setMinutes(Number(e.target.value))}
          placeholder="0"
          type="number"
          id="minutes"
          name="minutes"
          min="0"
          max="59"
        />

        <label htmlFor="seconds">S:</label>
        <input
          onChange={(e) => setSeconds(Number(e.target.value))}
          placeholder="0"
          type="number"
          id="seconds"
          name="seconds"
          min="0"
          max="59"
        />
      </div>

      <button onClick={submit} type="submit">
        {saving ? "Saving..." : "Ok"}
      </button>
    </form>
  );
};

export default EditingForm;
