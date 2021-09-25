import { Link as RouterLink } from "@reach/router";
import { useQuery, gql } from "@apollo/client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import client from "../lib/apollo-client";
import { GET_POKEMON, GET_TYPE } from "../queries";
import { pokemonNumber } from "../utils";

export function PokemonCard({ id, name, image }) {
  const { loading, error, data } = useQuery(GET_TYPE, { variables: { name } });

  if (loading) return "loading...";
  if (error) console.log(error);

  const types = data.pokemon.types.reduce(
    (prev, curr) => [...prev, curr.type.name],
    []
  );

  return (
    <Link underline="none" component={RouterLink} to={"/pokemon/" + name}>
      <Card
        sx={{ textAlign: "center" }}
        variant="outlined"
        onMouseOver={() =>
          client.query({
            query: GET_POKEMON,
            variables: { name },
          })
        }
      >
        <CardContent>
          <Typography
            sx={{
              fontSize: 14,
              marginBottom: 2,
            }}
            color="textSecondary"
          >
            {pokemonNumber(id)}
          </Typography>
          <img alt={name} src={image} />
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography color="textSecondary">{types.join(", ")}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default PokemonCard;
