import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { ProcessString } from "../utils";

function PokemonStats({ stats }) {
  return (
    <>
      <Typography variant="h6">Base Stats</Typography>
      {stats.map((stat) => {
        return (
          <Box sx={{ mb: 2 }} key={stat[0]}>
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flex: 1 }}>{ProcessString(stat[0])}</Typography>
              <Typography sx={{ flex: 1, textAlign: "end" }}>
                {stat[1]}
              </Typography>
            </Box>

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
