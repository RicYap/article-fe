"use client";

import api from "@/services/api";
import { Delete, Edit } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  debounce,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const Draft = ({ list, loading, onSubmit }) => {
  const router = useRouter();

  const [alert, setAlert] = useState({ message: "", severity: "" });

  const debounceTrashArticle = useCallback(debounce(ThrashArticle, 400), []);

  async function ThrashArticle(payload) {
    var body = payload;

    body.status = "Thrash";

    try {
      const getArticle = await api.EditArticle(body.id, body);

      const { error } = getArticle.data;

      if (error.msg !== "") {
        setAlert({ message: error.msg, severity: "error" });
      } else {
        setAlert({ message: "Trash Successful", severity: "success" });
      }

      onSubmit();
    } catch (error) {
      console.log(error);
      setAlert({ message: "An unexpected error occurred", severity: "error" });
    }
  }

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
                        <Grid item flex={1}>
                          <Button
                            size="small"
                            color="error"
                            variant="contained"
                            sx={{ minWidth: 0.7 }}
                            onClick={() => debounceTrashArticle(item)}
                          >
                            <Delete />
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

      <Snackbar
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert.message !== ""}
        onClose={() => {
          setAlert({ message: "", severity: "" });
        }}
      >
        <Alert variant="filled" severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Draft;
