/** @jsxImportSource @emotion/react */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";

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
  extraString,
  remove = false,
  removeHandler,
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

  let header;
  if (remove === true) {
    header = (
      <div
        css={{
          display: "flex",
          fontSize: 14,
          marginBottom: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography color="textSecondary">{pokemonNumber(id)}</Typography>
        <IconButton aria-label="release pokemon" onClick={removeHandler}>
          <CloseIcon sx={{ color: grey[500] }} />
        </IconButton>
      </div>
    );
  } else if (extraString) {
    header = (
      <div
        css={{
          display: "flex",
          fontSize: 14,
          marginBottom: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography color="textSecondary">{pokemonNumber(id)}</Typography>
        <Typography
          sx={{
            textAlign: "right",
          }}
          color="textSecondary"
        >
          {extraString}
        </Typography>
      </div>
    );
  } else {
    header = <Typography color="textSecondary">{pokemonNumber(id)}</Typography>;
  }
  return (
    <Card
      style={style}
      sx={{ textAlign: "center" }}
      variant="outlined"
      {...props}
    >
      <CardContent>
        {header}

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
