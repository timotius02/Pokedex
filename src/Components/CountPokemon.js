import useLocalStorage from "../hooks/useLocalStorage";

/* 
  Counts the number of a type the user has caught
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
