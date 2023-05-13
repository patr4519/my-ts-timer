import EditingForm from './components/EditingForm';
import Timer from './components/Timer';
import { Route, Routes } from "react-router-dom";

// https://63fef788571200b7b7d2e115.mockapi.io/MyTimer lovchikov45@mail.ru

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Timer />} />
        <Route path='/editing' element={<EditingForm />} />
      </Routes>
    </div>
  );
}

export default App;
