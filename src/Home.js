/** @jsxImportSource @emotion/react */
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import PokemonCardsList from "./Components/PokemonCardsList";
import { GET_ALL_POKEMONS } from "./queries";
import PokemonLogo from "./images/pokemon-logo.png";
import PokemonLogoSmall from "./images/pokemon-logo-small.png";
import { Context } from "./store";
import Loader from "./Components/Loader";

const variables = {
  limit: 24,
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
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth={false}>
          <>
            <img
              css={{
                maxWidth: "90%",
                width: 400,
                height: 140,
                display: "block",
                margin: "40px auto",
              }}
              sizes="(max-width: 404px) 100vw, 404px"
              srcSet={`
              ${PokemonLogoSmall} 200w,
              ${PokemonLogo} 404w`}
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
        </Container>
      )}
    </main>
  );
}

export default Home;
