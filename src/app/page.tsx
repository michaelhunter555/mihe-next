"use client";
import { useContext, useState } from "react";

import BenefitsList from "@/components/FeaturedSection/BenefitsList";
import ImageList from "@/components/ImagesList/ImageList";
import ProductRatings from "@/components/Ratings/Ratings";
import StyledText from "@/components/Shared/Text/StyledText";
import ShippingMessage from "@/components/ShippingOption/ShippingMessage";
import { AuthContext } from "@/context/auth-context";
import { CartContext } from "@/context/cart/cart-context";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Content, PageContainer } from "../components/Footer/FooterStyles";

export default function Home() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(
    theme.breakpoints.down("sm") || theme.breakpoints.down("md")
  );
  const [imagePath, setImagePath] = useState<string>("/1.jpg");
  const [price, setPrice] = useState<number>(199);
  const [shipping, setShipping] = useState<boolean>(true);

  const handleImagePathChange = (path: string) => {
    setImagePath(path);
  };

  const handleShippingOptions = () => {
    setShipping((prev) => !prev);
    setPrice((prev) => {
      if (shipping === true) {
        return prev - 90;
      } else {
        return prev + 90;
      }
    });
  };

  const handleAddToCart = (quantity: number) => {
    cart.quantity = cart.quantity + quantity;
  };

  return (
    <PageContainer>
      <Content>
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Stack direction="column" spacing={3}>
              <Stack alignItems="center">
                <StyledText variant="h4">
                  Effective Fitness For{" "}
                  <span style={{ color: "#1976d2" }}>
                    Cost Effective Prices
                  </span>
                </StyledText>
              </Stack>

              <Grid container spacing={2}>
                <Grid size={7}>
                  <CardMedia
                    component="img"
                    src={imagePath}
                    alt="featured_image"
                    sx={{
                      width: { xs: "100%", md: "100%" },
                      height: { xs: "100%", md: "100%" },
                      borderRadius: 5,
                      border: "1px solid #b1b1b1",
                    }}
                  />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid size={4}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    sx={{ width: "100%" }}
                    spacing={1}
                  >
                    <StyledText variant="h4">
                      Mihe X-900 Fitness Bike
                    </StyledText>
                    <ProductRatings />
                    <BenefitsList />
                    <Stack direction="row" spacing={2}>
                      <Chip
                        component="button"
                        clickable
                        onClick={handleShippingOptions}
                        label="Store Pick up"
                        variant={!shipping ? "filled" : "outlined"}
                        color={!shipping ? "primary" : "default"}
                      />
                      <Chip
                        clickable
                        onClick={handleShippingOptions}
                        label="Fed-ex Shipping"
                        variant={shipping ? "filled" : "outlined"}
                        color={shipping ? "primary" : "default"}
                      />
                    </Stack>
                    <ShippingMessage isShipping={shipping} />

                    <StyledText variant="h4">
                      ${price}.<span style={{ fontSize: 14 }}>00</span>{" "}
                      <s style={{ color: "#b1b1b1" }}>$249.99</s>
                    </StyledText>
                    <Button variant="outlined" sx={{ borderRadius: 10 }}>
                      Add to Cart
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>

            <Stack direction="row" spacing={1}>
              <ImageList
                onImageClick={(imagePath: string) =>
                  handleImagePathChange(imagePath)
                }
              />
            </Stack>
          </Stack>
        </Container>
      </Content>
    </PageContainer>
  );
}
