import useLocalStorage from "./hooks/useLocalStorage";

function MyPokemons() {
  const [myPokemons, setMyPokemons] = useLocalStorage("myPokemon", []);

  const addSquirtle = () => {
    setMyPokemons((myPokemons) => [
      ...myPokemons,
      { name: "chad Squirtle", species: "squirtle" },
    ]);
  };

  const removeSquirtle = () => {
    setMyPokemons((myPokemons) => myPokemons.slice(0, myPokemons.length - 1));
  };

  return (
    <div>
      <main>
        <h1>My Pokemons</h1>

        <div>
          {myPokemons.map((pokemon, i) => (
            <div key={pokemon.name + i}>
              <h3>{pokemon.name} </h3>
              <p>{pokemon.species}</p>
            </div>
          ))}
        </div>
        <button onClick={addSquirtle}>Add Squirtle</button>
        <button onClick={removeSquirtle}>Subtract Squirtle</button>
      </main>
    </div>
  );
}

export default MyPokemons;
