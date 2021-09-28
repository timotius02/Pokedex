/** @jsxImportSource @emotion/react */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import Image from "../Components/Image";
import { pokemonNumber } from "../utils";
import TypePills from "./TypePills";
import { Capitalize } from "../utils";

function PokemonCard({
  name,
  id,
  image,
  types,
  loading = false,
  error = null,
  style,
  ...props
}) {
  if (loading || error)
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
  return (
    <Card
      style={style}
      sx={{ textAlign: "center" }}
      variant="outlined"
      {...props}
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

        <div
          css={{
            margin: "auto",
            width: "100%",
            maxWidth: 200,
          }}
        >
          <Image src={image} alt={name} />
        </div>

        <Typography variant="h5" component="h2">
          {Capitalize(name)}
        </Typography>
        <TypePills types={types} />
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
