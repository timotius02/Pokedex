import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PokemonCard from "./PokemonCard";
import { FixedSizeGrid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import useWindowSize from "../hooks/useWindowSize";

let itemCount = 150;
export function PokemonCardsList({ pokemons }) {
  // const size = useWindowSize();

  // let columnCount = 1;
  // if (size.width >= 1200) columnCount = 4;
  // else if (size.width >= 900) columnCount = 3;
  // else if (size.width >= 600) columnCount = 2;

  return pokemons.length > 0 ? (
    <Grid container spacing={2}>
      {/* <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeGrid
            onItemsRendered={onItemsRendered}
            ref={ref}
            
            columnCount={columnCount}
            columnWidth={}
            height={size.height}
            rowCount={}
            rowHeight={}
            width={}
          />
        )}
      </InfiniteLoader> */}

      {pokemons.map((pokemon) => (
        <Grid key={pokemon.name} item xs={12} sm={6} md={4} lg={3}>
          <PokemonCard {...pokemon} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <div sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          color: "#FFF",
          fontSize: 24,
          textTransform: "uppercase",
        }}
      >
        No results. Please try a different filter value.
      </Typography>
    </div>
  );
}

export default PokemonCardsList;
