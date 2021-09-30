/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import PokemonCardsList from "./Components/PokemonCardsList";
import { GET_ALL_POKEMONS } from "./queries";
import PokemonLogo from "./images/pokemon-logo.png";
import PokemonLogoSmall from "./images/pokemon-logo-small.png";
import { Context } from "./store";
import Loader from "./Components/Loader";
import useWindowSize from "./hooks/useWindowSize";

function Home() {
  const size = useWindowSize();

  let columnCount = 1;
  if (size.width >= 1200) columnCount = 4;
  else if (size.width >= 900) columnCount = 3;
  else if (size.width >= 600) columnCount = 2;

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_POKEMONS, {
    variables: {
      limit: columnCount * 4,
      offset: 0,
    },
  });
  const [, dispatch] = useContext(Context);

  useEffect(() => {
    if (error) {
      dispatch({ type: "SET_ERROR", payload: error });
    }
  }, [error, dispatch]);

  if (error) return <main></main>;

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
              sizes="(max-width: 600px) 20vw, 404px"
              srcSet={`${PokemonLogoSmall} 200w, ${PokemonLogo} 404w`}
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
