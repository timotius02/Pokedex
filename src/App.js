import "./App.css";
import { Router, Link } from "@reach/router";
import Home from "./Home";
import Pokemon from "./Pokemon";
import MyPokemons from "./MyPokemons";

function App() {
  return (
    <Router>
      <Home path="/" />
      <Pokemon path="/pokemon/:name" />
      <MyPokemons path="/my-pokemons" />
    </Router>
  );
}

export default App;
