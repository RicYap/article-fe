"use client";

import { Edit } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const Trashed = ({ list, loading }) => {
  const router = useRouter();

  return (
    <Grid container width={"100%"} pl={4} pr={4} mb={4}>
      <Paper sx={{ width: "100%" }}>
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
                  sx={{ fontWeight: 600, width: "25%" }}
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
                            size="small"
                            color="warning"
                            variant="contained"
                            sx={{ minWidth: 0.7 }}
                            onClick={() => router.push(`edit/${item.id}`)}
                          >
                            <Edit />
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))
              ) : loading ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    height={"300px"}
                    align="center"
                    sx={{ fontSize: "25px" }}
                  >
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <CircularProgress></CircularProgress>
                      <Typography variant="h5">Fetching Data</Typography>
                    </Grid>
                  </TableCell>
                </TableRow>
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

export default Trashed;
