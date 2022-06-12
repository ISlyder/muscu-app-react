import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import ExerciseList from "./components/exercises/exercise-list";
import Home from "./components/home/home";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/sessions" element={<Home />} />
      <Route path="/sessions/:id" element={<ExerciseList />} />
    </Routes>
  );
}

export default App;
