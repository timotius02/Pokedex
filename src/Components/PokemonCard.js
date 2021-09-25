import { Link as RouterLink } from "@reach/router";
import { useQuery, gql } from "@apollo/client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const GET_TYPE = gql`
  query getType($name: String!) {
    pokemon(name: $name) {
      name
      id
      types {
        type {
          name
        }
      }
    }
  }
`;

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
      <Card sx={{ textAlign: "center" }} variant="outlined">
        <CardContent>
          <Typography
            sx={{
              fontSize: 14,
              marginBottom: 2,
            }}
            color="textSecondary"
          >
            {"#" + id}
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
