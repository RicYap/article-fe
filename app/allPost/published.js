import {
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const Published = () => {
  return (
    <Grid container width={"100%"} pl={4} pr={4}>
      <Paper sx={{ width: "100%", backgroundColor:"" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  variant="subtitle1"
                  sx={{ fontWeight: 600, width: "25%" }}
                >
                  Title
                </TableCell>
                <TableCell
                  variant="subtitle1"
                  sx={{ fontWeight: 600, width: "60%" }}
                >
                  Category
                </TableCell>
                <TableCell
                  variant="subtitle1"
                  sx={{ fontWeight: 600, width: "15%" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default Published;
