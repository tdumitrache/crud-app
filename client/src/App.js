import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tabel from "./pages/Tabel";
import Modify from "./pages/Modify";
import Add from "./pages/Add";

function App() {
  
  return (
    <Routes>
      <Route path="/" index element={<Home />}/>
      <Route path="/vizualizeaza/:tabelaId" element={<Tabel />}/>
      <Route path="/modifica/:tabelaId" element={<Modify />}/>
      <Route path="/adauga/:tabelaId" element={<Add />}/>
    </Routes>
  );
}

// Routes

export default App;
