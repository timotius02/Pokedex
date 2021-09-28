/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import PokemonCardsList from "./Components/PokemonCardsList";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { GET_ALL_POKEMONS } from "./queries";
import PokemonLogo from "./images/pokemon-logo.png";
import { Context } from "./store";

const variables = {
  limit: 20,
  offset: 0,
};

function Home() {
  const { loading, error, data, fetchMore } = useQuery(GET_ALL_POKEMONS, {
    variables,
  });
  const [, dispatch] = useContext(Context);

  if (error) {
    dispatch({ type: "SET_ERROR", payload: error });
    return <main></main>;
  }

  return (
    <main>
      <Container maxWidth={false}>
        {loading ? (
          <Box
            sx={{
              color: "white",
              textTransform: "uppercase",
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            <CircularProgress color="inherit" size={60} />
            <Typography variant="h5">Loading</Typography>
          </Box>
        ) : (
          <>
            <img
              css={{
                maxWidth: "90%",
                width: 400,
                height: 140,
                display: "block",
                margin: "40px auto",
              }}
              src={PokemonLogo}
              alt="Pokemon Logo"
            />
            {data ? (
              <PokemonCardsList
                pokemons={data.pokemons.results || []}
                loading={loading}
                onLoadMore={() => {
                  fetchMore({
                    variables: {
                      offset: data.pokemons.results.length,
                    },
                  });
                }}
              />
            ) : null}
          </>
        )}
      </Container>
    </main>
  );
}

export default Home;
