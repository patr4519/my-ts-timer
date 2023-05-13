import EditingForm from "./components/EditingForm";
import Timer from "./components/Timer";
import { Link, Route, Routes } from "react-router-dom";
import settings_icon from "./assets/settings_icon.svg";

// https://63fef788571200b7b7d2e115.mockapi.io/MyTimer lovchikov45@mail.ru

function App() {
  return (
    <div className="App">
      <Link to='/editing'>
        <button className="setting_button">
          <img width={30} src={settings_icon} />
        </button>
      </Link>
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/editing" element={<EditingForm />} />
      </Routes>
    </div>
  );
}

export default App;
