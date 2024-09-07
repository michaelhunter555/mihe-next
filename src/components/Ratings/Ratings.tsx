"use client";
import { useContext, useState } from "react";

import { AuthContext } from "@/context/auth-context";
import Fade from "@mui/material/Fade";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import StyledText from "../Shared/Text/StyledText";

const ProductRatings = () => {
  const auth = useContext(AuthContext);
  const [rating, setRating] = useState(3.5);
  return (
    <Fade in={true} timeout={500}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Rating readOnly={Boolean(!auth?.isLoggedIn) ?? true} value={rating} />
        <StyledText variant="subtitle2">23 reviews</StyledText>
      </Stack>
    </Fade>
  );
};

export default ProductRatings;
