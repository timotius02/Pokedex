/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import Typography from "@mui/material/Typography";
import { FixedSizeGrid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { ReactWindowScroller } from "react-window-scroller";
import { Link as RouterLink } from "@reach/router";
import Link from "@mui/material/Link";

import PokemonCard from "./PokemonCard";
import useWindowSize from "../hooks/useWindowSize";
import GetPokemonTypes from "./GetPokemonTypes";

const GUTTER_SIZE = 20;
const ITEM_COUNT = 1118;
const ROW_HEIGHT = 335;

function renderCell({ columnIndex, rowIndex, data, style }) {
  let columnCount = 1;
  if (window.innerWidth >= 1200) columnCount = 4;
  else if (window.innerWidth >= 900) columnCount = 3;
  else if (window.innerWidth >= 600) columnCount = 2;

  const pokemon = data[rowIndex * columnCount + columnIndex];

  return pokemon ? (
    <Link
      underline="none"
      component={RouterLink}
      to={"/pokemon/" + pokemon.name}
    >
      <GetPokemonTypes name={pokemon.name}>
        {({ types, loading, error }) => (
          <PokemonCard
            loading={loading}
            error={error}
            style={{
              ...style,
              left:
                style.left + (columnCount > 1 ? GUTTER_SIZE : GUTTER_SIZE / 2),
              top: style.top + GUTTER_SIZE,
              width: style.width - GUTTER_SIZE,
              height: style.height - GUTTER_SIZE,
            }}
            types={types}
            {...pokemon}
          />
        )}
      </GetPokemonTypes>
    </Link>
  ) : (
    <PokemonCard error={true} />
  );
}

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      paddingLeft: GUTTER_SIZE,
      paddingTop: GUTTER_SIZE,
    }}
    {...rest}
  />
));

/**
 * Converts OnitemsRendered function return by infiniteloader to
 * the form expeected by FixedSizeGrid
 */
const OnItemsRenderedGrid =
  (infiniteOnItemsRendered, columnCount) =>
  ({
    visibleColumnStartIndex,
    visibleColumnStopIndex,
    visibleRowStartIndex,
    visibleRowStopIndex,
  }) => {
    const visibleStartIndex =
      visibleRowStartIndex * columnCount + visibleColumnStartIndex;
    const visibleStopIndex = visibleRowStopIndex * 4 + visibleColumnStopIndex;

    infiniteOnItemsRendered({
      visibleStartIndex,
      visibleStopIndex,
    });
  };

export function PokemonCardsList({ pokemons, onLoadMore }) {
  const size = useWindowSize();

  let columnCount = 1;
  if (size.width >= 1200) columnCount = 4;
  else if (size.width >= 900) columnCount = 3;
  else if (size.width >= 600) columnCount = 2;
  const isItemLoaded = (index) => !!pokemons[index * columnCount];

  return pokemons.length > 0 ? (
    <div css={{ display: "flex", justifyContent: "center" }}>
      <ReactWindowScroller isGrid>
        {({ ref: scrollerRef, outerRef, style, onScroll }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={ITEM_COUNT}
            loadMoreItems={onLoadMore}
          >
            {({ onItemsRendered, ref: loadingRef }) => (
              <FixedSizeGrid
                onItemsRendered={OnItemsRenderedGrid(
                  onItemsRendered,
                  columnCount
                )}
                ref={(ref) => {
                  loadingRef(ref);
                  scrollerRef.current = ref;
                }}
                columnCount={columnCount}
                columnWidth={292 + GUTTER_SIZE}
                height={size.height + 292 * 2}
                rowCount={Math.ceil(ITEM_COUNT / columnCount)}
                rowHeight={ROW_HEIGHT + GUTTER_SIZE}
                width={size.width}
                itemData={pokemons}
                outerRef={outerRef}
                style={style}
                onScroll={onScroll}
                innerElementType={innerElementType}
              >
                {renderCell}
              </FixedSizeGrid>
            )}
          </InfiniteLoader>
        )}
      </ReactWindowScroller>
    </div>
  ) : (
    <div sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          color: "#FFF",
          fontSize: 24,
          textTransform: "uppercase",
        }}
      >
        No pokemon found.
      </Typography>
    </div>
  );
}

export default PokemonCardsList;
