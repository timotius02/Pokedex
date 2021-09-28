/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { GET_POKEMON } from "./queries";
import PokemonMoves from "./Components/PokemonMoves";
import PokemonStats from "./Components/PokemonStats";
import PokemonCard from "./Components/PokemonCard";
import CatchButton from "./Components/CatchButton";
import { Context } from "./store";

function Pokemon({ name }) {
  let { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name },
  });
  const [, dispatch] = useContext(Context);

  if (loading) return "loading...";
  if (error) {
    dispatch({ type: "SET_ERROR", payload: error });
    return "error...";
  }

  let { id, sprites, height, weight } = data.pokemon;

  const types = data.pokemon.types.map((curr) => curr.type.name);
  const abilities = data.pokemon.abilities.map((curr) => curr.ability.name);
  const stats = data.pokemon.stats.map((curr) => [
    curr.stat.name,
    curr.base_stat,
  ]);
  const moves = data.pokemon.moves.map((curr) => curr.move.name);

  return (
    <Container>
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <PokemonCard
                name={name}
                id={id}
                image={sprites.front_default}
                types={types}
              />
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography>{"Height: " + height / 10 + " m"}</Typography>
                <Typography>{"Weight: " + weight / 10 + " kg"}</Typography>
                <Typography>Abilities</Typography>
                <Typography>{abilities.join(", ")}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <PokemonStats stats={stats} />
              </Paper>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <PokemonMoves moves={moves} />
          </Grid>
        </Grid>
      </Box>
      <CatchButton name={name} id={id} types={types} sprites={sprites} />
    </Container>
  );
}

export default Pokemon;
