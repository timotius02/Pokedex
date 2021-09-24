import { Router } from "@reach/router";
import Home from "./Home";
import Pokemon from "./Pokemon";
import MyPokemons from "./MyPokemons";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <Home path="/" />
      <Pokemon path="/pokemon/:name" />
      <MyPokemons path="/my-pokemons" />
      <NotFound default />
    </Router>
  );
}

export default App;
