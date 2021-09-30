/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import { css, keyframes } from "@emotion/react";

/*
 Custom Pokeball Loading Animation
 */
const roll = keyframes`
  0 { transform: translate(0, 0) rotate(0); }
  80% { transform: translate(0, 0) rotate(360deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
`;

function Loader() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 56px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F44336",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        css={css`
          position: absolute;
          margin: auto;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          animation: ${roll} 0.75s ease-in-out infinite;
        `}
      >
        <div
          css={css`
            border-radius: 50%;
            width: 100px;
            height: 100px;
            border: 6px solid #1d1d1b;
            z-index: 100;
            display: block;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            position: absolute;
          `}
        ></div>
        <div
          css={css`
            margin: auto;
            left: 0;
            right: 0;
            top: 50px;
            bottom: 0;
            z-index: 0;
            position: absolute;
            background-color: white;
            border-radius: 0 0 50px 50px;
            width: 100px;
            height: 50px;
          `}
        ></div>
        <div
          css={css`
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin-top: auto;
            border-radius: 0px;
            width: 95px;
            height: 13px;
            background-color: #1d1d1b;
            z-index: 3;
          `}
        ></div>
        <div
          css={css`
            z-index: 4;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: 50%;
            border: 5px solid #1d1d1b;
            position: absolute;
            height: 30px;
            width: 30px;
            background-color: white;
          `}
        ></div>
        <div
          css={css`
            z-index: 5;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            border-radius: 50%;
            border: 3px solid #1d1d1b;
            position: absolute;
            height: 17px;
            width: 17px;
            background-color: white;
          `}
        ></div>
      </div>
    </Box>
  );
}

export default Loader;
