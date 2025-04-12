"use client";

import { Button, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <Grid container p={4} position={"sticky"}>
      <Grid container item flex={1} alignItems={"center"}>
        <Typography variant="h5" fontWeight={"bold"}>
          Article
        </Typography>
      </Grid>
      <Grid
        container
        item
        flex={2}
        spacing={4}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <Grid item>
          <Button
            variant="outlined"
            color="black"
            sx={{
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => router.push(`/`)}
          >
            <Typography variant="body1">All Post</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="black"
            sx={{
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => router.push(`/preview`)}
          >
            <Typography variant="body1">Preview</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            id="static-id"
            variant="outlined"
            sx={{
              borderColor: "black",
              color: "black",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => router.push(`/add`)}
          >
            <Typography variant="body1">Add Article</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Navbar;
