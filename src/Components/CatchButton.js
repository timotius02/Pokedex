/** @jsxImportSource @emotion/react */
import { useState } from "react";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";

import pokeball from "../images/pokeball.png";
import useLocalStorage from "../hooks/useLocalStorage";
import { Capitalize } from "../utils/";

function CatchButton({ name, id, types, sprites }) {
  const [myPokemons, setMyPokemons] = useLocalStorage("myPokemon", []);
  const [isfirstTimeOpen, setIsFirstTimeOpen] = useLocalStorage(
    "firstTimeOpen",
    true
  );
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nickname, setNickname] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const [fab, setFab] = useState(null);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
    setIsFirstTimeOpen(false);
  };

  function handleCloseDialog() {
    setOpen(false);
    setIsError(false);
    setNickname("");
  }

  function catchPokemon() {
    let random = Math.random();
    if (random > 0.5) {
      setOpen(true);
    }
  }
  function savePokemon() {
    let uniqueName = true;
    for (let pokemon of myPokemons) {
      if (pokemon.name === nickname) {
        uniqueName = false;
      }
    }

    if (!uniqueName) {
      setIsError(true);
    } else {
      setMyPokemons((myPokemons) => [
        ...myPokemons,
        { name, id, types, nickname, image: sprites.front_default },
      ]);
      setOpen(false);
      setNickname("");
    }
  }
  return (
    <>
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
          {"Click the Pokeball to Catch " + Capitalize(name) + "!"}
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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={savePokemon}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CatchButton;
