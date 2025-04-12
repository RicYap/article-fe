"use client";

import Navbar from "@/components/navbar";
import api from "@/services/api";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  debounce,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import React, { useCallback, useEffect, useState } from "react";

export function Preview() {
  const [loading, setLoading] = useState(true);
  const [articlePublished, setArticlePublished] = useState([]);

  const [params, setParams] = useState({
    page: 1,
    length: 10,
  });

  const debounceMountArticlePagination = useCallback(
    debounce(mountArticlePagination, 400),
    []
  );

  async function mountArticlePagination(limit, offset) {
    try {
      const getArticle = await api.GetArticlePaginationByStatus(
        limit,
        offset,
        "publish"
      );

      const { data } = getArticle.data;

      if (data !== undefined && data !== null) {
        setArticlePublished(data);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (newPage) => {
    if (params.page === newPage) {
      return;
    }

    const newParams = {
      ...params,
      page: newPage,
      length: params.length,
    };
    setParams(newParams);
    debounceMountArticlePagination(newParams.length, newParams.page);
  };

  const handleRowsPerPageChange = async (event, newRows) => {
    if (params.length === newRows) {
      return;
    }
    const newParams = {
      ...params,
      page: 1,
      length: event.target.value,
    };
    setParams(newParams);
    debounceMountArticlePagination(newParams.length, newParams.page);
  };

  useEffect(() => {
    debounceMountArticlePagination(params.length, params.page);
  }, []);

  return (
    <Box>
      <Navbar></Navbar>
      <Divider sx={{ mb: 4, borderBottomWidth: 3 }}></Divider>

      <Grid container pl={4} pr={4} mb={4}>
        <Grid container mb={2} justifyContent={"center"} sx={{ width: "100%" }}>
          <Typography textAlign={"center"} variant="h4">
            Preview
          </Typography>
        </Grid>

        {articlePublished.length > 0 ? (
          articlePublished.map((item, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5">{item.title}</Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 1 }}
                  color="text.secondary"
                >
                  Category: {item.category}
                </Typography>
                <Typography>{item.content}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ backgroundColor: "white", height: "200px", width: "100%" }}
          >
            {loading ? (
              <Grid container alignItems={"center"}>
                <CircularProgress></CircularProgress>
                <Typography variant="h5">Fetching Data</Typography>
              </Grid>
            ) : (
              <Typography variant="h5">No Published Article</Typography>
            )}
          </Grid>
        )}

        {articlePublished.length > 0 && (
          <Grid
            container
            p={2}
            width={"100%"}
            sx={{ backgroundColor: "white" }}
          >
            <Grid item flex={1}></Grid>
            <Grid container item flex={1}>
              <Grid container item flex={1} justifyContent={"flex-end"}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "50%",
                    minWidth: "48px",
                    width: "48px",
                    height: "48px",
                    padding: 0,
                  }}
                  disabled={params.page === 1}
                  onClick={() => handlePageChange(params.page - 1)}
                >
                  <NavigateBefore></NavigateBefore>
                </Button>
              </Grid>
              <Grid container item flex={1} justifyContent={"center"}>
                <Button variant="outlined" disableRipple disableFocusRipple>
                  {params.page}
                </Button>
              </Grid>
              <Grid container item flex={1} justifyContent={"flex-start"}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "50%",
                    minWidth: "48px",
                    width: "48px",
                    height: "48px",
                    padding: 0,
                  }}
                  disabled={articlePublished.length < params.length}
                  onClick={() => handlePageChange(params.page + 1)}
                >
                  <NavigateNext></NavigateNext>
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              flex={1}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <FormControl>
                <InputLabel>Row</InputLabel>
                <Select
                  size="small"
                  value={params.length}
                  label="Row"
                  onChange={handleRowsPerPageChange}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Preview;
