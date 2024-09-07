"use client";
import type { SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";

type StyledTextProps = {
  children: React.ReactNode;
  sx?: SxProps;
  align?: "right" | "left" | "center" | "inherit" | "justify" | undefined;
  variant:
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "caption";
};

const StyledText = ({ children, variant, sx, align }: StyledTextProps) => {
  return (
    <Typography sx={sx} color="text.secondary" align={align} variant={variant}>
      {children}
    </Typography>
  );
};

export default StyledText;
