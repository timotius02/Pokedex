import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { GET_MOVE } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

function MoveAccordion({ move }) {
  const [expandedOnce, setExpandedOnce] = useState(false);

  const { loading, error, data } = useQuery(GET_MOVE, {
    skip: !expandedOnce,
    variables: { name: move },
  });

  function handleChange() {
    if (!expandedOnce) setExpandedOnce(true);
  }
  return (
    <Accordion onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={move + "-content"}
        id={move + "panel1a-header"}
      >
        <Typography>{move}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {!expandedOnce || loading
            ? "loading..."
            : `
            ${data.move.response.flavor_text_entries[0].flavor_text}`}
        </Typography>
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Power</TableCell>
                <TableCell>Accuracy</TableCell>
                <TableCell>PP</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {!expandedOnce || loading
                    ? "loading..."
                    : data.move.response.power}
                </TableCell>
                <TableCell>
                  {!expandedOnce || loading
                    ? "loading..."
                    : data.move.response.accuracy}
                </TableCell>
                <TableCell>
                  {!expandedOnce || loading
                    ? "loading..."
                    : data.move.response.pp}
                </TableCell>
                <TableCell>
                  {!expandedOnce || loading
                    ? "loading..."
                    : data.move.response.damage_class.name}
                </TableCell>
                <TableCell>
                  {!expandedOnce || loading
                    ? "loading..."
                    : data.move.response.meta.category.name}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}

export default function MoveAccordions({ moves }) {
  return (
    <>
      {moves.map((move) => (
        <MoveAccordion key={move} move={move} />
      ))}
    </>
  );
}
