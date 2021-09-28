import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useLocalStorage from "./hooks/useLocalStorage";
import PokemonCard from "./Components/PokemonCard";

function MyPokemons() {
  const [myPokemons, setMyPokemons] = useLocalStorage("myPokemon", []);

  const release = (index) => {
    setMyPokemons((myPokemons) => [
      ...myPokemons.slice(0, index),
      ...myPokemons.slice(index + 1),
    ]);
  };

  return (
    <div>
      <main>
        <Container sx={{ pt: 2 }}>
          <Typography variant="h4">My Pokemons</Typography>
          <Grid container spacing={2}>
            {myPokemons.map((pokemon, i) => (
              <Grid key={pokemon.nickname} item xs={12} sm={6} md={4} lg={3}>
                <PokemonCard
                  key={pokemon.name}
                  name={`${pokemon.nickname} (${pokemon.name})`}
                  id={pokemon.id}
                  image={pokemon.image}
                  types={pokemon.types}
                />
                <button onClick={() => release(i)}>Release</button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default MyPokemons;
