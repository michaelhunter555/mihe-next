"use client";
import { useState } from "react";

import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";

import FeaturedCards from "./FeatureCards";

const CoreFeaturePreview = () => {
  const [path, setPath] = useState("/magnetic-resistance.svg");

  const handleFeatureChange = (path: string) => {
    setPath(path);
  };

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      <Grid size={4}>
        <FeaturedCards onClick={handleFeatureChange} />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid size={7}>
        <Box sx={{ border: "1px solid #b1b1b1", borderRadius: 2 }}>
          <CardMedia
            component="img"
            src={path}
            alt={`core-feature-${path}`}
            sx={{
              width: "50%",
              margin: "0 auto",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CoreFeaturePreview;
