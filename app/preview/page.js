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

export function Preview() {
  return (
    <Box>
      <Navbar></Navbar>
      <Divider sx={{ mb: 4, borderBottomWidth: 3 }}></Divider>

      <Grid container pl={4} pr={4}>
        <Grid container p={2} width={"100%"} sx={{ backgroundColor: "white" }}>
          <Grid item flex={1}></Grid>
          <Grid container item flex={1}>
            <Grid container item flex={1} justifyContent={"flex-end"}>
              <IconButton
                disabled={params.page === 1}
                onClick={() => handlePageChange(params.page - 1)}
              >
                <NavigateBefore></NavigateBefore>
              </IconButton>
            </Grid>
            <Grid container item flex={1} justifyContent={"center"}>
              <Button variant="outlined" disableRipple disableFocusRipple>
                {params.page}
              </Button>
            </Grid>
            <Grid container item flex={1} justifyContent={"flex-start"}>
              <IconButton
                disabled={tab === 1 && articlePublished.length < params.length}
                onClick={() => handlePageChange(params.page + 1)}
              >
                <NavigateNext></NavigateNext>
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            item
            flex={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <FormControl>
              <InputLabel id="baris">Baris</InputLabel>
              <Select
                size="small"
                id="baris"
                value={params.length}
                label="Baris"
                onChange={handleRowsPerPageChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Preview;
