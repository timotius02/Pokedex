import { Router, Link as RouterLink } from "@reach/router";
import Link from "@mui/material/Link";
import Home from "./Home";
import Pokemon from "./Pokemon";
import MyPokemons from "./MyPokemons";
import NotFound from "./NotFound";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import { Global, css } from "@emotion/react";

function App() {
  return (
    <>
      <CssBaseline />
      <Global
        styles={css`
          body {
            background-color: #f1f1f1;
          }
        `}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Link
            underline="none"
            variant="h5"
            sx={{ color: "white " }}
            component={RouterLink}
            to={"/"}
          >
            Pokedex
          </Link>
        </Toolbar>
      </AppBar>
      <Router primary={false}>
        <Home path="/" />
        <Pokemon path="/pokemon/:name" />
        <MyPokemons path="/my-pokemons" />
        <NotFound default />
      </Router>
    </>
  );
}

export default App;
