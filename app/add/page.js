"use client";

import Navbar from "@/components/navbar";
import api from "@/services/api";
import {
  Alert,
  Box,
  Button,
  debounce,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";

export function Add() {
  const [alert, setAlert] = useState({ message: "", severity: "" });

  const [payload, setPayload] = useState({
    title: "",
    content: "",
    category: "",
    status: "",
  });

  const debounceCreateArticle = useCallback(debounce(createArticle, 400), []);

  async function createArticle(payload, status) {
    var body = payload;
    body.status = status;

    try {
      const getArticle = await api.CreateArticle(body);

      const { data, error } = getArticle.data;

      if (error.msg !== "") {
        setAlert({ message: error.msg, severity: "error" });
      } else {
        setPayload({ title: "", content: "", category: "", status: "" });
        setAlert({ message: "Create Article Successful", severity: "success" });
      }
    } catch (error) {
      console.log(error);
      setAlert({ message: "An unexpected error occurred", severity: "error" });
    }
  }

  const handleChange = (event) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };

  return (
    <Box>
      <Navbar></Navbar>
      <Divider sx={{ mb: 4, borderBottomWidth: 3 }}></Divider>

      <Grid container mb={3}>
        <Grid item flex={1}></Grid>
        <Grid item flex={2} p={5} sx={{ backgroundColor: "white" }}>
          <Grid container justifyContent={"center"}>
            <Typography variant="h5">Add Article</Typography>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container mb={3}>
            <Grid item flex={1}>
              <Typography variant="h6">Title</Typography>
            </Grid>
            <Grid item flex={1}>
              <TextField
                name={"title"}
                fullWidth
                multiline
                value={payload.title}
                onChange={handleChange}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container mb={3}>
            <Grid item flex={1}>
              <Typography variant="h6">Content</Typography>
            </Grid>
            <Grid item flex={1}>
              <TextField
                name={"content"}
                fullWidth
                multiline
                value={payload.content}
                onChange={handleChange}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item flex={1}>
              <Typography variant="h6">Category</Typography>
            </Grid>
            <Grid item flex={1}>
              <TextField
                name={"category"}
                fullWidth
                multiline
                value={payload.category}
                onChange={handleChange}
              ></TextField>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item flex={1}>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                onClick={() => debounceCreateArticle(payload, "draft")}
              >
                Draft
              </Button>
            </Grid>
            <Grid item flex={1}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => debounceCreateArticle(payload, "publish")}
              >
                Publish
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item flex={1}></Grid>
        <Divider sx={{ my: 2 }} />
      </Grid>

      <Snackbar
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
    </Box>
  );
}

export default Add;
