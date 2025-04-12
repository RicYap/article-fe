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
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export function Edit() {
  const { id } = useParams();

  const [alert, setAlert] = useState({ message: "", severity: "" });

  const [payload, setPayload] = useState({
    title: "",
    content: "",
    category: "",
    status: "",
  });

  const debounceMountArticleById = useCallback(
    debounce(mountArticleById, 400),
    []
  );

  async function mountArticleById(id) {
    try {
      const getArticle = await api.GetArticleById(id);

      const { data } = getArticle.data;

      setPayload(data);
    } catch (error) {
      console.log(error);
    }
  }

  const debounceEditArticle = useCallback(debounce(editArticle, 400), []);

  async function editArticle(id, payload, status) {
    var body = payload;
    body.status = status;

    try {
      const getArticle = await api.EditArticle(id, body);

      const { error } = getArticle.data;

      if (error.msg !== "") {
        setAlert({ message: error.msg, severity: "error" });
      } else {
        setAlert({ message: "Edit Article Successful", severity: "success" });
      }
    } catch (error) {
      console.log(error);
      setAlert({ message: "An unexpected error occurred", severity: "error" });
    }
  }

  const handleChange = (event) => {
    setPayload({ ...payload, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (id !== "") {
      debounceMountArticleById(id);
    }
  }, [id]);

  return (
    <Box>
      <Navbar></Navbar>
      <Divider sx={{ mb: 4, borderBottomWidth: 3 }}></Divider>

      <Grid container mb={3}>
        <Grid item flex={1}></Grid>
        <Grid item flex={2} p={5} sx={{ backgroundColor: "white" }}>
          <Grid container justifyContent={"center"}>
            <Typography variant="h5">Edit Article</Typography>
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
                onClick={() => debounceEditArticle(id, payload, "draft")}
              >
                Draft
              </Button>
            </Grid>
            <Grid item flex={1}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => debounceEditArticle(id, payload, "publish")}
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

export default Edit;
