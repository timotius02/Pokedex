import { useContext } from "react";
import { Router, Link as RouterLink } from "@reach/router";
import Link from "@mui/material/Link";
import Home from "./Home";
import Pokemon from "./Pokemon";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { Global, css } from "@emotion/react";

import MyPokemons from "./MyPokemons";
import NotFound from "./NotFound";
import { ScrollToTop } from "./utils";
import { Context } from "./store";

export const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#F44336",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  const [state] = useContext(Context);
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
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Link
              underline="none"
              variant="h5"
              sx={{ color: "white", fontWeight: "bold", flex: "1" }}
              component={RouterLink}
              to={"/"}
            >
              Pokédex
            </Link>
            <Link
              underline="none"
              sx={{ color: "white" }}
              component={RouterLink}
              to={"/my-pokemons"}
            >
              My Pokemons
            </Link>
          </Toolbar>
        </AppBar>
        {state.error ? (
          <Alert severity="error">
            {state.error.graphQLErrors
              ? state.error.graphQLErrors.join("")
              : state.error}
          </Alert>
        ) : null}

        <Router primary={false}>
          <ScrollToTop path="/">
            <Home path="/" />
            <Pokemon path="/pokemon/:name" />
            <MyPokemons path="/my-pokemons" />
            <NotFound default />
          </ScrollToTop>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
