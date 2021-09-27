/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import pokeball from "./images/pokeball.png";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Popper from "@mui/material/Popper";

import useLocalStorage from "./hooks/useLocalStorage";

import tempData from "./tempData";
import { GET_POKEMON } from "./queries";
import { pokemonNumber } from "./utils";
import TypePills from "./Components/TypePills";
import Image from "./Components/Image";
import MoveAccordions from "./Components/MoveAccordions";
import PokemonStats from "./Components/PokemonStats";
import Capitalize from "@mui/utils/capitalize";

function Pokemon({ name }) {
  let { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name },
  });

  const [myPokemons, setMyPokemons] = useLocalStorage("myPokemon", []);
  const [isfirstTimeOpen, setIsFirstTimeOpen] = useLocalStorage(
    "firstTimeOpen",
    true
  );
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pokemonName, setPokemonName] = useState("");

  const [openBackdrop, setOpenBackdrop] = useState(true);
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
    setIsFirstTimeOpen(false);
  };
  const [fab, setFab] = useState(null);

  if (loading) return "loading...";
  if (error) {
    data = tempData;
  }

  let { id, sprites, height, weight } = data.pokemon;

  const types = data.pokemon.types.map((curr) => curr.type.name);
  const abilities = data.pokemon.abilities.map((curr) => curr.ability.name);
  const stats = data.pokemon.stats.map((curr) => [
    curr.stat.name,
    curr.base_stat,
  ]);
  const moves = data.pokemon.moves.map((curr) => curr.move.name);

  const handleCloseDialog = () => {
    setOpen(false);
    setIsError(false);
    setPokemonName("");
  };

  function catchPokemon() {
    let random = Math.random();
    if (random > 0.5) {
      setOpen(true);
    }
  }
  function savePokemon() {
    let uniqueName = true;
    for (let pokemon of myPokemons) {
      if (pokemon.name === pokemonName) {
        uniqueName = false;
      }
    }

    if (!uniqueName) {
      setIsError(true);
    } else {
      setMyPokemons((myPokemons) => [
        ...myPokemons,
        { name: pokemonName, species: name },
      ]);
      setOpen(false);
      setPokemonName("");
    }
  }
  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Paper variant="outlined">
                <Stack
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    padding: "1em 0",
                  }}
                >
                  <Typography>{pokemonNumber(id)}</Typography>

                  <Typography variant="h5">
                    {Capitalize(data.pokemon.name)}
                  </Typography>

                  <div
                    css={{
                      margin: "auto",
                      width: "100%",
                      maxWidth: 200,
                    }}
                  >
                    <Image
                      src={sprites.front_default}
                      alt={data.pokemon.name}
                    />
                  </div>

                  <TypePills types={types} />
                </Stack>
              </Paper>
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
            <Paper variant="outlined">
              <Typography variant="h6" sx={{ pt: 1.5, pl: 1.5 }}>
                Moves
              </Typography>
            </Paper>
            <MoveAccordions moves={moves} />
          </Grid>
        </Grid>
      </Box>

      <Fab
        ref={setFab}
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 100,
        }}
        onClick={catchPokemon}
        className="mui-fixed"
      >
        <img
          css={{
            width: "100%",
            margin: "auto",
          }}
          src={pokeball}
          alt="pokeball"
        />
      </Fab>
      <Popper
        sx={{ zIndex: 150 }}
        open={fab !== null && isfirstTimeOpen && openBackdrop}
        anchorEl={fab}
        placement="left-start"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ]}
      >
        <Paper variant="outlines" sx={{ p: 2 }}>
          {"Click Here to Catch " + Capitalize(name) + "!"}
        </Paper>
      </Popper>

      <Backdrop
        sx={{ color: "#fff" }}
        open={isfirstTimeOpen && openBackdrop}
        onClick={handleCloseBackdrop}
      ></Backdrop>

      <Dialog
        open={open}
        onClose={handleCloseBackdrop}
        disableScrollLock={true}
      >
        <DialogTitle>{`Gotcha! ${name} was caught.`}</DialogTitle>
        <DialogContent>
          <DialogContentText>Give your new friend a name:</DialogContentText>
          <TextField
            error={isError}
            helperText={
              isError ? "Another pokemon has this nickname already." : ""
            }
            autoFocus
            margin="dense"
            id="name"
            label="Pokemon Name"
            fullWidth
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={savePokemon}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Pokemon;
