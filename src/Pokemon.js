import { useState } from "react";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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

import useLocalStorage from "./hooks/useLocalStorage";

import tempData from "./tempData";
import { GET_POKEMON } from "./queries";
import { pokemonNumber } from "./utils";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TypePills from "./Components/TypePills";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Pokemon({ name }) {
  let { loading, error, data } = useQuery(GET_POKEMON, { variables: { name } });
  const [myPokemons, setMyPokemons] = useLocalStorage("myPokemon", []);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  if (loading) return "loading...";
  if (error) {
    data = tempData;
  }

  let { id, sprites, moves, height, weight } = data.pokemon;

  const types = data.pokemon.types.map((curr) => curr.type.name);
  const abilities = data.pokemon.abilities.map((curr) => curr.ability.name);
  const stats = data.pokemon.stats.map((curr) => [
    curr.stat.name,
    curr.base_stat,
  ]);

  const handleClose = () => {
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
  const changeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Card sx={{ marginTop: "10%" }}>
        <CardContent sx={{ display: "flex" }}>
          <Stack sx={{ flex: 1, textAlign: "center", padding: "1em 0" }}>
            <Typography>{pokemonNumber(id)}</Typography>

            <Typography variant="h6">{data.pokemon.name}</Typography>
            <img
              style={{ maxWidth: 200, width: "90%", margin: "auto" }}
              src={sprites.front_default}
              alt={data.pokemon.name}
            />

            <TypePills types={types} />
          </Stack>

          <Stack sx={{ flex: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabIndex}
                onChange={changeTab}
                aria-label="basic tabs example"
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={tabIndex} index={0}>
              <Typography>{"Height: " + height / 10 + " m"}</Typography>
              <Typography>{"Weight: " + weight / 10 + " kg"}</Typography>
              <Typography>Abilities</Typography>
              <Typography>{abilities.join(", ")}</Typography>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <Typography>Base Stats</Typography>
              <Grid container spacing={2}>
                {stats.map((stat) => {
                  return (
                    <Grid item key={stat[0]} xs={12} sm={6} md={4} lg={3}>
                      <Typography>{stat[0]}</Typography>
                      <Typography>{stat[1]}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              <Typography>Moves</Typography>
              <Grid
                container
                spacing={2}
                sx={{ maxHeight: 400, overflow: "scroll" }}
              >
                {moves.map((curr) => (
                  <Grid item key={curr.move.name} xs={12} sm={6} md={4} lg={3}>
                    <Typography>{curr.move.name}</Typography>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={savePokemon}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <Fab color="primary" aria-label="add" onClick={catchPokemon}>
        Catch
      </Fab>
    </Container>
  );
}

export default Pokemon;
