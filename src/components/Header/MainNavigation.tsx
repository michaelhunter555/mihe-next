"use client";

import React, { useContext } from "react";

import { AuthContext } from "@/context/auth-context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useMediaQuery, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import StyledNextLink from "../Shared/Links/StyledNextLink";
import Header from "./Header";

const MainNavigation = () => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(
    theme.breakpoints.down("sm") || theme.breakpoints.down("md")
  );
  return (
    <Grid2
      container
      sx={{
        flexDirection: { xs: "none", md: "row" },
        justifyContent: { xs: "normal", md: "space-between" },
        alignItems: "center",
        borderBottom: "1px solid #f1f1f1",
      }}
    >
      <Grid2>
        <Stack
          direction="row"
          alignItems="center"
          spacing={5}
          sx={{ width: "100%", marginLeft: 5 }}
        >
          <Typography color="text.secondary" fontWeight={800}>
            MiheFitness
          </Typography>
          <Header />
        </Stack>
      </Grid2>

      <Grid2 size={4}>
        <Stack direction="row" alignItems="center" spacing={3}>
          {auth.isLoggedIn ? (
            <StyledNextLink route="/login">Login</StyledNextLink>
          ) : (
            <StyledNextLink route="/signup">create account</StyledNextLink>
          )}
          <Divider orientation="vertical" flexItem />
          <ShoppingCartIcon />
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default MainNavigation;
