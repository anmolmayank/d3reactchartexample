import React from "react";
import NavBarCustom from "./Components/NavBar";
import Main from "./Pages";
import BarChart from "./Components/BarChart";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <NavBarCustom />
      <Main/>
    </div>
  );
}
