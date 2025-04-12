"use client"

import { Button, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Navbar = () => {
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
          <Link href="/" passHref>
            <Button
              variant="outlined"
              color="black"
              sx={{
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              <Typography variant="body1">All Post</Typography>
            </Button>
          </Link>
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
          >
            <Typography variant="body1">Preview</Typography>
          </Button>
        </Grid>
        <Grid item>
          <Link href="/add" passHref>
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
            >
              <Typography variant="body1">Add Article</Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Navbar;
