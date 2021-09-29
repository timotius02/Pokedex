/** @jsxImportSource @emotion/react */
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "@reach/router";
import Link from "@mui/material/Link";
import useLocalStorage from "./hooks/useLocalStorage";
import PokemonCard from "./Components/PokemonCard";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

function MyPokemons() {
  const [myPokemons, setMyPokemons] = useLocalStorage("myPokemon", []);
  const [releaseId, setReleaseId] = useState(0);
  const [open, setOpen] = useState(false);

  const release = (index) => {
    setMyPokemons((myPokemons) => [
      ...myPokemons.slice(0, index),
      ...myPokemons.slice(index + 1),
    ]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmRelease = () => {
    setOpen(false);
    release(releaseId);
    setReleaseId(0);
  };

  return (
    <main>
      <Container sx={{ pt: 2 }}>
        <Typography variant="h4" sx={{ pt: 2, pb: 2 }}>
          My Pokemons
        </Typography>
        <Grid container spacing={2}>
          {myPokemons.map((pokemon, i) => (
            <Grid key={pokemon.nickname} item xs={12} sm={6} md={4} lg={3}>
              <Link
                underline="none"
                component={RouterLink}
                to={"/pokemon/" + pokemon.name}
              >
                <PokemonCard
                  key={pokemon.name}
                  name={`${pokemon.nickname}`}
                  id={pokemon.id}
                  image={pokemon.image}
                  types={pokemon.types}
                  remove={true}
                  removeHandler={(e) => {
                    e.preventDefault();

                    setReleaseId(i);
                    setOpen(true);
                  }}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Release this Pokemon?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={confirmRelease} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export default MyPokemons;
