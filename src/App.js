import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import "./App.css";
import StartGame from "./features/test/components/StartGame";
import AddPlayer from "./features/test/components/AddPlayer";
import ListPlayer from "./features/test/components/ListPlayer";
import GameScreen from "./features/test/components/GameScreen";
import Answer from "./features/test/components/Answer";
import Result from "./features/test/components/Result";
function App() {
  return (
    <div className="App">
      <Container maxWidth="lg" className="App container">
        <Router>
          <Routes>
            <Route path="/" element={<StartGame />} />
            <Route path="/addPlayer" element={<AddPlayer />} />
            <Route path="/listPlayer" element={<ListPlayer />} />
            <Route path="/gameScreen" element={<GameScreen />} />
            <Route path="/answer" element={<Answer />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
