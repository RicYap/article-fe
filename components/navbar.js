import { Button, Grid, IconButton, Typography } from "@mui/material";
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
      </Grid>
    </Grid>
  );
};

export default Navbar;
