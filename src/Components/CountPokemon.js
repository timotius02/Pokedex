import useLocalStorage from "../hooks/useLocalStorage";

/* 
  HOC that counts the number of a pokemon the user has caught
*/
export function CountPokemon({ children, name, ...props }) {
  const [myPokemons] = useLocalStorage("myPokemon", []);

  const count = myPokemons.reduce(
    (prev, curr) => (curr.name === name ? prev + 1 : prev),
    0
  );

  return children({
    ...props,
    count,
  });
}

export default CountPokemon;
