import { Link as RouterLink } from "@reach/router";
import { useQuery } from "@apollo/client";
import client from "../lib/apollo-client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";

import Image from "../Components/Image";
import { GET_POKEMON, GET_TYPE } from "../queries";
import { pokemonNumber } from "../utils";
import TypePills from "./TypePills";

export function PokemonCard({ id, name, image, style }) {
  const { loading, error, data } = useQuery(GET_TYPE, { variables: { name } });

  if (loading)
    return (
      <Card style={style} sx={{ textAlign: "center" }} variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </CardContent>
      </Card>
    );
  if (error) console.log(error);

  const types = data.pokemon.types.reduce(
    (prev, curr) => [...prev, curr.type.name],
    []
  );

  return (
    <Link underline="none" component={RouterLink} to={"/pokemon/" + name}>
      <Card
        style={style}
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
          <Image alt={name} src={image} />
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <TypePills types={types} />
        </CardContent>
      </Card>
    </Link>
  );
}

export default PokemonCard;
