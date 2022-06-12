import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import ExerciseList from "./components/exercises/exercise-list";
import Home from "./components/home/home";
import Header from "./components/shared/header";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/sessions" element={<Home />}></Route>
        <Route path="/sessions/:id" element={<ExerciseList />}></Route>
      </Routes>
    </div>
  );
}

export default App;
