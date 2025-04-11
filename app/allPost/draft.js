import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const Draft = ({ list }) => {
  return (
    <Grid container width={"100%"} pl={4} pr={4}>
      <Paper sx={{ width: "100%", backgroundColor: "" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  variant="subtitle1"
                  sx={{ fontWeight: 600, width: "60%" }}
                >
                  Title
                </TableCell>
                <TableCell
                  variant="subtitle1"
                  sx={{ fontWeight: 600, width: "20%" }}
                >
                  Category
                </TableCell>
                <TableCell
                  variant="subtitle1"
                  sx={{ fontWeight: 600, width: "20%" }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length > 0 ? (
                list.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item flex={1}>
                          <Button
                            fullWidth
                            size="small"
                            color="warning"
                            variant="contained"
                          >
                            Edit
                          </Button>
                        </Grid>
                        <Grid item flex={1}>
                          <Button
                            fullWidth
                            size="small"
                            color="error"
                            variant="contained"
                          >
                            Thrash
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    height={"300px"}
                    align="center"
                    sx={{ fontSize: "25px" }}
                  >
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default Draft;
