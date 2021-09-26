import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

function PokemonStats({ stats }) {
  return (
    <>
      <Typography>Base Stats</Typography>
      {stats.map((stat) => {
        return (
          <Box key={stat[0]}>
            <Typography>{stat[0]}</Typography>
            <Typography>{stat[1]}</Typography>
            <LinearProgress
              sx={{
                backgroundColor: "#e1e1e1",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: stat[1] < 100 ? "#f50057" : "green",
                },
              }}
              variant="determinate"
              value={stat[1] / 2}
            />
          </Box>
        );
      })}
    </>
  );
}

export default PokemonStats;
