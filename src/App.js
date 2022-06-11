import "./styles/App.scss";
import SessionList from "./components/sessions/session-list";
import { Route, Routes } from "react-router-dom";
import ExerciceList from "./components/exercises/exercise-list";

function App() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Routes>
        <Route exact path="/" element={<SessionList />}></Route>
        <Route path="/sessions" element={<SessionList />}></Route>
        <Route path="/sessions/:id" element={<ExerciceList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
