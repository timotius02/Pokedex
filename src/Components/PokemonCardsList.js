import { forwardRef } from "react";
import Typography from "@mui/material/Typography";
import { FixedSizeGrid } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { ReactWindowScroller } from "react-window-scroller";

import PokemonCard from "./PokemonCard";
import useWindowSize from "../hooks/useWindowSize";
const GUTTER_SIZE = 20;
const ITEM_COUNT = 1118;

function renderCell({ columnIndex, rowIndex, data, style }) {
  let columnCount = 1;
  if (window.innerWidth >= 1200) columnCount = 4;
  else if (window.innerWidth >= 900) columnCount = 3;
  else if (window.innerWidth >= 600) columnCount = 2;

  const pokemon = data[rowIndex * columnCount + columnIndex];

  return (
    <PokemonCard
      style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE,
      }}
      {...pokemon}
    />
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
 * @param {*} infiniteOnItemsRendered
 * @param {*} columnCount
 * @returns
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

const mergeRefs = (...refs) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (inst) => {
    for (const ref of filteredRefs) {
      if (typeof ref === "function") {
        ref(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};

export function PokemonCardsList({ pokemons, onLoadMore }) {
  const size = useWindowSize();

  let columnCount = 1;
  if (size.width >= 1200) columnCount = 4;
  else if (size.width >= 900) columnCount = 3;
  else if (size.width >= 600) columnCount = 2;
  const isItemLoaded = (index) => !!pokemons[index * columnCount];

  return pokemons.length > 0 ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ReactWindowScroller isGrid>
        {({ ref, outerRef, style, onScroll }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={ITEM_COUNT}
            loadMoreItems={onLoadMore}
          >
            {({ onItemsRendered, loadingRef }) => (
              <FixedSizeGrid
                onItemsRendered={OnItemsRenderedGrid(
                  onItemsRendered,
                  columnCount
                )}
                ref={mergeRefs(ref, loadingRef)}
                columnCount={columnCount}
                columnWidth={292 + GUTTER_SIZE}
                height={size.height + 292 * 2}
                rowCount={Math.ceil(ITEM_COUNT / columnCount)}
                rowHeight={390 + GUTTER_SIZE}
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
