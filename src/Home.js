import { useQuery, gql } from "@apollo/client";
import Container from "@mui/material/Container";
import PokemonCardsList from "./Components/PokemonCardsList";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./Home.css";

const QUERY = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        name
        image
      }
    }
  }
`;

const variables = {
  limit: 100,
  offset: 0,
};

function Home() {
  const { loading, error, data } = useQuery(QUERY, { variables });

  if (error) {
    return "Error...";
  }
  return (
    <main>
      <Container>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: 24,
              textTransform: "uppercase",
            }}
          >
            <CircularProgress color="inherit" size={60} />
            <Typography>Loading</Typography>
          </Box>
        ) : (
          <>
            <img
              style={{
                maxWidth: "90%",
                width: 400,
                display: "block",
                margin: "40px auto",
              }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/404px-International_Pok%C3%A9mon_logo.svg.png"
              alt="Pokemon Logo"
            />
            <PokemonCardsList
              pokemons={data.pokemons.results}
            ></PokemonCardsList>
          </>
        )}
      </Container>
    </main>
  );
}

export default Home;
